import { expect } from 'chai';
import { addSeconds, startOfDay, subMonths } from 'date-fns';
import R from 'ramda';

import { createTester } from '@server/domains/lib/auth/policyNext/testUtils';
import { withTaskRunnerRole } from '@server/domains/lib/contextWith';
import { EIdentityAuthenticationLevel } from '@server/domains/lib/identity';
import { createMockOrganization } from '@server/domains/lib/testMockCreators/mockOrganization';
import { createMockQuest } from '@server/domains/lib/testMockCreators/mockQuest';
import { createMockUser } from '@server/domains/lib/testMockCreators/mockUser';
import {
  createIntegrationCtx,
  withMockUserIdentity,
} from '@server/domains/lib/testUtilIntegration';
import { resetDatabase } from '@server/lib/serverTestUtils/serverTestUtils';
import { IQuest } from '@server/lib/typedSchemas/Quest/Quest';

import { getCurrentSeason } from '../../quest/lib/stats.lib';
import { recalculateAndUpdatePlayer } from '../../user/lib/recalculateStats.lib';
import getSimpleUserStarsLeaderboard from '../getSimpleUserStarsLeaderboard';
import {
  IGetSimpleUserStarsLeaderboardPayload as TPayload,
  TGetSimpleUserStarsLeaderboardResult as TResult,
} from '../lib/getSimpleUserStarsLeaderboard.models';
import { EBoardType } from '../lib/leaderboard.models';
import {
  anonymiseRows,
  getBoardId,
  getRowId,
  getValidSeasonsWithin,
} from '../lib/shared.lib';

describe('game.leaderboard.getSimpleUserStarsLeaderboard', () => {
  describe('Authorization', () => {
    const input: TPayload = {
      boardType: EBoardType.SIMPLE_USER_STARS,
      organizationId: 'orgId',
      limit: 1,
    };

    const output: TResult = [
      {
        rows: R.times(
          i => ({
            _id: String(i),
            user: {
              _id: String(i),
              profile: {
                isAnonymous: false,
                firstName: 'Asd',
                lastName: 'Das',
              },
            },
            starCount: 0,
            position: i,
          }),
          2
        ),
        // Meta is of no interest to authz tests atm
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        meta: {} as any,
        boardType: EBoardType.SIMPLE_USER_STARS,
      },
    ];

    const {
      test,
      assertions: {
        inputAllowedForAll,
        inputDeniedForAll,
        outputAllowedAndEqlForAll,
      },
      identities: {
        User,
        Admin,
        SuperAdmin,
        Anonymous,
        TaskRunner,
        SocOperator,
      },
    } = createTester(
      'game.leaderboard.getSimpleUserStarsLeaderboard',
      getSimpleUserStarsLeaderboard
    );

    test(
      inputAllowedForAll(input, [
        User({ organizationId: input.organizationId }),
        Admin({ organizationId: input.organizationId }),
        SuperAdmin(),
      ]),
      inputDeniedForAll(input, [Anonymous(), TaskRunner(), SocOperator()]),
      outputAllowedAndEqlForAll(output, [
        {
          identity: User(),
          expectedOutput: output,
        },
        {
          identity: User({
            authenticationLevel: EIdentityAuthenticationLevel.WEAK,
          }),
          expectedOutput: output.map(anonymiseRows),
        },
      ])
    );
  });

  beforeEach(() => resetDatabase());
  after(() => resetDatabase());

  const createUserWithQuests = async ({
    userIndex = 0,
    isAnonymous = false,
    isSoftDeleted = false,
    hasEnforcedAnonymity = false,
    organizationId = '',
  } = {}) => {
    const userId = `user-${userIndex}`;
    const currentDateFloored = startOfDay(new Date());

    const questCount = Math.round((userIndex + 1) / 2);

    await Promise.all(
      R.range(0, questCount).map(async questIndex => {
        return createMockQuest(
          {
            organizationId: organizationId,
            userId,
            result: {
              completedAt: addSeconds(
                subMonths(currentDateFloored, (questIndex + userIndex) * 2),
                120
              ),
              stars: 3,
            },
          },
          { persist: true }
        );
      })
    );

    return createMockUser(
      {
        _id: userId,
        organizationId,
        profile: {
          isAnonymous,
          hasEnforcedAnonymity,
        },
        ...(isSoftDeleted && { softDeletedAt: new Date() }),
      },
      { persist: true }
    );
  };

  const setup = async ({
    isAnonymous = false,
    isSoftDeleted = false,
    hasEnforcedAnonymity = false,
  } = {}) => {
    const organization = await createMockOrganization({}, { persist: true });

    const ctx = await R.pipe(
      withMockUserIdentity({ organizationId: organization._id }),
      createIntegrationCtx
    )(null);

    const currentDateFloored = startOfDay(new Date());

    const users = await Promise.all(
      R.range(0, 10).map(async userIndex => {
        return createUserWithQuests({
          userIndex,
          organizationId: organization._id,
          isAnonymous,
          isSoftDeleted,
          hasEnforcedAnonymity,
        });
      })
    );

    await Promise.all(
      users.map(({ _id: userId, organizationId }) =>
        recalculateAndUpdatePlayer(withTaskRunnerRole(ctx), {
          userId,
          organizationId,
        })
      )
    );

    return {
      ctx,
      users,
      organization,
      currentDateFloored,
    };
  };

  it('should return top users in org sorted by stars', async () => {
    const { ctx, organization } = await setup();

    const options = {
      boardType: EBoardType.SIMPLE_USER_STARS as const,
      organizationId: organization._id,
      limit: 10,
    };

    const [result] =
      await ctx.handlers.game.leaderboard.getSimpleUserStarsLeaderboard(
        ctx,
        options
      );

    const { rowCount, selectedUserPosition } = result.meta;

    expect({ rowCount, selectedUserPosition }).eql({
      rowCount: 10,
      selectedUserPosition: -1,
    });

    {
      const { _id, position, starCount, user } = R.head(result.rows);

      expect({ _id, position, starCount, user }).eql({
        _id: getRowId(getBoardId(options), user._id),
        position: 1,
        starCount: 15,
        user,
      });
    }

    {
      const { _id, position, starCount, user } = R.last(result.rows);

      expect({ _id, position, starCount, user }).eql({
        _id: getRowId(getBoardId(options), user._id),
        position: 10,
        starCount: 3,
        user,
      });
    }
  });

  it('should use given date filters', async () => {
    const { ctx, organization, currentDateFloored } = await setup();

    const startDate = subMonths(currentDateFloored, 3);
    const endDate = subMonths(currentDateFloored, 1);

    const [withStartDate] =
      await ctx.handlers.game.leaderboard.getSimpleUserStarsLeaderboard(ctx, {
        boardType: EBoardType.SIMPLE_USER_STARS as const,
        organizationId: organization._id,
        limit: 10,
        startDate,
      });

    const [withEndDate] =
      await ctx.handlers.game.leaderboard.getSimpleUserStarsLeaderboard(ctx, {
        boardType: EBoardType.SIMPLE_USER_STARS as const,
        organizationId: organization._id,
        limit: 10,
        endDate,
      });

    const [withBothDates] =
      await ctx.handlers.game.leaderboard.getSimpleUserStarsLeaderboard(ctx, {
        boardType: EBoardType.SIMPLE_USER_STARS as const,
        organizationId: organization._id,
        limit: 10,
        endDate,
        startDate,
      });

    const quests = await ctx.handlers.collection.quest
      .find(withTaskRunnerRole(ctx), {
        params: {
          selector: {},
          options: { sort: { 'result.completedAt': 1 } },
        },
      })
      .then(c => c.fetch());
    const uniqueSeasons = R.pipe(
      R.map((q: IQuest) => getCurrentSeason(q.result.completedAt)),
      R.uniq
    )(quests);

    const getSeasons = (start?: Date, end?: Date) =>
      R.pipe(
        (seasons: string[]) => R.map(R.objOf('season'), seasons),
        getValidSeasonsWithin({ startDate: start, endDate: end }),
        R.map(R.prop('season'))
      )(uniqueSeasons);

    const getUniqueUserCount = R.pipe(
      R.map(R.prop('userId')),
      R.uniq,
      R.length
    );

    const seasonsAfterStartDate = getSeasons(startDate);
    const seasonsBeforeStartDate = getSeasons(undefined, endDate);
    const seasonsBetween = getSeasons(startDate, endDate);

    const questsAfterStartDate = quests.filter(quest =>
      seasonsAfterStartDate.includes(getCurrentSeason(quest.result.completedAt))
    );
    const questsBeforeEndDate = quests.filter(quest =>
      seasonsBeforeStartDate.includes(
        getCurrentSeason(quest.result.completedAt)
      )
    );
    const questsBetweenDates = questsAfterStartDate.filter(quest =>
      seasonsBetween.includes(getCurrentSeason(quest.result.completedAt))
    );

    expect(withStartDate.meta.rowCount).eql(
      getUniqueUserCount(questsAfterStartDate),
      'startDate'
    );
    expect(withEndDate.meta.rowCount).eql(
      getUniqueUserCount(questsBeforeEndDate),
      'endDate'
    );
    expect(withBothDates.meta.rowCount).eql(
      getUniqueUserCount(questsBetweenDates),
      'combined date filters'
    );
  });

  it('should hide anonymous users if requested, except user fetching the leaderboard themself', async () => {
    const { ctx, organization } = await setup({ isAnonymous: true });

    const options = {
      boardType: EBoardType.SIMPLE_USER_STARS as const,
      organizationId: organization._id,
      limit: 10,
      hideAnonymousUsers: true,
    };

    const [result] =
      await ctx.handlers.game.leaderboard.getSimpleUserStarsLeaderboard(
        ctx,
        options
      );

    const { rowCount, selectedUserPosition } = result.meta;

    expect({ rowCount, selectedUserPosition }).eql({
      rowCount: 0, // 0 anonymous users + not calling with userId
      selectedUserPosition: -1,
    });

    {
      const { _id: userId, organizationId } = await createUserWithQuests({
        userIndex: 11,
        organizationId: organization._id,
        isAnonymous: false,
      });

      await recalculateAndUpdatePlayer(withTaskRunnerRole(ctx), {
        userId,
        organizationId,
      });

      const [result] =
        await ctx.handlers.game.leaderboard.getSimpleUserStarsLeaderboard(
          ctx,
          options
        );
      const { rowCount, selectedUserPosition } = result.meta;

      expect({ rowCount, selectedUserPosition }).eql({
        rowCount: 1, // 1 not anonymous users + not calling with userId
        selectedUserPosition: -1,
      });
    }

    {
      const { _id: userId, organizationId } = await createUserWithQuests({
        userIndex: 12,
        organizationId: organization._id,
        isAnonymous: true,
      });

      await recalculateAndUpdatePlayer(withTaskRunnerRole(ctx), {
        userId,
        organizationId,
      });

      const [result] =
        await ctx.handlers.game.leaderboard.getSimpleUserStarsLeaderboard(ctx, {
          userId,
          ...options,
        });
      const { rowCount, selectedUserPosition } = result.meta;

      expect({ rowCount, selectedUserPosition }).eql({
        rowCount: 2, // 1 not anonymous users + calling this with current user id
        selectedUserPosition: 1,
      });
    }
  });

  it('should hide soft deleted users', async () => {
    const { ctx, organization } = await setup({ isSoftDeleted: true });

    const options = {
      boardType: EBoardType.SIMPLE_USER_STARS as const,
      organizationId: organization._id,
      limit: 10,
    };

    const [result] =
      await ctx.handlers.game.leaderboard.getSimpleUserStarsLeaderboard(
        ctx,
        options
      );

    const { rowCount, selectedUserPosition } = result.meta;

    expect({ rowCount, selectedUserPosition }).eql({
      rowCount: 0, // 0 anonymous users + not calling with userId
      selectedUserPosition: -1,
    });
  });

  it('should not hide anonymous users if not requested', async () => {
    const { ctx, organization } = await setup({ isAnonymous: true });

    const options = {
      boardType: EBoardType.SIMPLE_USER_STARS as const,
      organizationId: organization._id,
      limit: 10,
      hideAnonymousUsers: false,
    };

    const [result] =
      await ctx.handlers.game.leaderboard.getSimpleUserStarsLeaderboard(
        ctx,
        options
      );

    const { rowCount, selectedUserPosition } = result.meta;

    expect({ rowCount, selectedUserPosition }).eql({
      rowCount: 10, // 0 anonymous users + not calling with userId
      selectedUserPosition: -1,
    });

    {
      const { _id: userId, organizationId } = await createUserWithQuests({
        userIndex: 11,
        organizationId: organization._id,
        isAnonymous: true,
      });

      await recalculateAndUpdatePlayer(withTaskRunnerRole(ctx), {
        userId,
        organizationId,
      });

      const [result] =
        await ctx.handlers.game.leaderboard.getSimpleUserStarsLeaderboard(ctx, {
          userId,
          ...options,
        });
      const { rowCount, selectedUserPosition } = result.meta;

      expect({ rowCount, selectedUserPosition }).eql({
        rowCount: 10, // 1 not anonymous users + calling this with current user id
        selectedUserPosition: 1,
      });
    }
  });

  it('should exclude enforced anonymous users from leaderboards', async () => {
    const { ctx, organization } = await setup({ hasEnforcedAnonymity: true });

    const options = {
      boardType: EBoardType.SIMPLE_USER_STARS as const,
      organizationId: organization._id,
      limit: 10,
      hideAnonymousUsers: false,
    };

    const [result] =
      await ctx.handlers.game.leaderboard.getSimpleUserStarsLeaderboard(
        ctx,
        options
      );

    const { rowCount, selectedUserPosition } = result.meta;

    expect({ rowCount, selectedUserPosition }).eql({
      rowCount: 0, // should include 0 users, as all have enforced anonymity
      selectedUserPosition: -1,
    });

    {
      const { _id: userId, organizationId } = await createUserWithQuests({
        userIndex: 11,
        organizationId: organization._id,
        hasEnforcedAnonymity: false,
      });

      await recalculateAndUpdatePlayer(withTaskRunnerRole(ctx), {
        userId,
        organizationId,
      });

      const [result] =
        await ctx.handlers.game.leaderboard.getSimpleUserStarsLeaderboard(ctx, {
          userId,
          ...options,
        });
      const { rowCount, selectedUserPosition } = result.meta;

      expect({ rowCount, selectedUserPosition }).eql({
        rowCount: 1, // should include 1 user from 11, where only 1 has not enforced anonymity
        selectedUserPosition: 1,
      });
    }
  });

  describe('lib functions', () => {
    describe('getValidSeasonsWithin', () => {
      it('should return correct seasons', () => {
        const seasons = ['1/2020', '2/2020', '3/2020', '4/2020', '1/2021'].map(
          R.objOf('season')
        );

        // eslint-disable-next-line @typescript-eslint/naming-convention
        const [q1_2020, q2_2020, q3_2020, q4_2020, q1_2021] = seasons;

        expect(
          getValidSeasonsWithin({
            startDate: new Date('8-23-2020'),
            endDate: new Date('12-31-2020'),
          })(seasons)
        ).eql([q3_2020, q4_2020]);

        expect(
          getValidSeasonsWithin({
            startDate: new Date('8-23-2020'),
            endDate: new Date('8-23-2020'),
          })(seasons)
        ).eql([q3_2020]);

        expect(
          getValidSeasonsWithin({
            startDate: new Date('8-23-2020'),
          })(seasons)
        ).eql([q3_2020, q4_2020, q1_2021]);

        expect(
          getValidSeasonsWithin({
            endDate: new Date('8-23-2020'),
          })(seasons)
        ).eql([q1_2020, q2_2020, q3_2020]);

        expect(getValidSeasonsWithin({})(seasons)).eql(seasons);
      });
    });
  });
});
