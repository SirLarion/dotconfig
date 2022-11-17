import { expect } from 'chai';
import moment from 'moment';
import R from 'ramda';
import Sinon from 'sinon';

import { getQuestEventProps } from '@server/domains/game/quest/lib/questAnalytics';
import { TASK_RUNNER } from '@server/domains/lib/auth/roles';
import { withTaskRunnerRole } from '@server/domains/lib/contextWith';
import { THandlerContext } from '@server/domains/lib/models';
import {
  insertMockQuest,
  withQuestOverrides,
  withResult,
  withStartedQuest,
  withState,
  withTags,
  withUser,
  withVectorId,
} from '@server/domains/lib/testMockCreators/mockQuest';
import {
  insertMockUser,
  withUserOverrides,
} from '@server/domains/lib/testMockCreators/mockUser';
import { testACL, verifyAnalytics } from '@server/domains/lib/testShared';
import {
  createIntegrationCtx,
  withGlobals,
  withReqContext,
  withUserIdentity,
} from '@server/domains/lib/testUtilIntegration';
import { EServerEvent } from '@server/lib/analyticEvents';
import { STARS_FOR_REPORTING } from '@server/lib/gameHelper';
import { resetDatabase } from '@server/lib/serverTestUtils/serverTestUtils';
import { IUser } from '@server/lib/typedSchemas';
import { EStarRewardType } from '@server/lib/typedSchemas/Analytics/AnalyticsEvent';
import { EQuestState, IQuest } from '@server/lib/typedSchemas/Quest/models';
import {
  EOnboardingState,
  EUserEvents,
} from '@server/lib/typedSchemas/User/models';

import report from '../report';

const getQuest = (ctx: THandlerContext, questId: string) =>
  ctx.handlers.collection.quest.get(ctx, { id: questId });

const FROZEN_DATE = new Date();

interface ISetupProps {
  userOverrides?: DeepPartial<IUser>;
  questOverrides?: DeepPartial<IQuest>;
}

const setup = async ({ userOverrides, questOverrides }: ISetupProps = {}) => {
  const user = await insertMockUser(withUserOverrides(userOverrides));

  const quest = await insertMockQuest(
    withUser(user),
    withStartedQuest(FROZEN_DATE),
    withQuestOverrides(questOverrides)
  );

  const ctx = await R.pipe(
    withUserIdentity(user, [TASK_RUNNER]),
    withReqContext({ net: { ip: '123.123.123.123' } }),
    withGlobals({ newDate: () => FROZEN_DATE }),

    createIntegrationCtx
  )(null);

  const analyticsSpy = Sinon.spy(ctx.handlers.analytics.sink, 'track');

  return {
    ctx,
    user,
    quest,
    analyticsSpy,
  };
};

describe('game.quest.report', () => {
  testACL(report, [TASK_RUNNER]);

  beforeEach(() => resetDatabase());
  after(() => resetDatabase());

  it('should update quest result correctly', async () => {
    const { ctx, quest, user } = await setup();

    await report.handler(ctx, {
      vectorId: quest.vectorId,
      userId: user._id,
      headers: {},
    });

    const { simulationResult, state } = await getQuest(ctx, quest._id);

    expect(simulationResult).to.eql({
      stars: STARS_FOR_REPORTING,
      reportingSpeed: 0,
      completedAt: FROZEN_DATE,
    });

    expect(state).to.equal(EQuestState.QUEST_STATE_SUCCESS);
  });

  it('should throw correct error when vector does not exist', async () => {
    const { ctx, user } = await setup();

    await expect(
      report.handler(ctx, {
        vectorId: 'non-existing-vectorId',
        userId: user._id,
        headers: {},
      })
    ).rejectedWith('Could not find matching quest! Vector does not exist.');
  });

  it('should call analytics.sink with correct events', async () => {
    const { ctx, quest, user, analyticsSpy } = await setup();

    await report.handler(ctx, {
      vectorId: quest.vectorId,
      userId: user._id,
      headers: {},
    });

    verifyAnalytics(ctx, analyticsSpy, [
      {
        event: EServerEvent.ENGINE_QUEST_SUCCEEDED,
        userId: quest.userId,
        properties: {
          organizationId: quest.organizationId,
          questId: quest._id,
          questLanguage: 'en',
          questOrigin: quest.origin,
          questTag: 'hox.quest.mock.quest.template.tag',
          questTags: 'main theme:espionage',
          questType: 'QUEST_TYPE_EMAIL',
          userId: quest.userId,
          reportingSpeed: 0,
          userAgent: undefined,
          questDifficulty: quest.attributes.difficultyEstimate,
        },
      },
      {
        event: EServerEvent.STARS_REWARDED,
        userId: quest.userId,
        properties: {
          organizationId: quest.organizationId,
          questId: quest._id,
          starCount: 2,
          starsRewardedTime: FROZEN_DATE,
          maxStarCount: 2,
          starRewardType: EStarRewardType.QUEST_SUCCESS,
          sourceEventForReward: 'training_engine_quest_succeeded',
        },
      },
    ]);
  });

  it('persists job function to user when reporting a JOB_FUNCTION quest', async () => {
    const { ctx, user } = await setup();

    const quest = await insertMockQuest(
      withUser(user),
      withStartedQuest(),
      withTags([{ name: 'cow tipper', categoryName: 'job function' }]),
      withVectorId('test')
    );

    await report.handler(ctx, {
      vectorId: quest.vectorId,
      userId: user._id,
      headers: {},
    });

    const updatedUser = await ctx.handlers.collection.user.get(ctx, {
      id: user._id,
    });

    expect(updatedUser.events[0].eventName).eql(
      EUserEvents.JOB_FUNCTION_QUEST_REPORTED
    );
  });

  it('updates user onboarding state to READY_TO_ONBOARD if user is not onboarded', async () => {
    const { ctx, user } = await setup({
      userOverrides: {
        game: {
          onboardingState: EOnboardingState.NOT_ONBOARDED,
          newOnboardedAt: null,
        },
      },
    });

    const quest = await insertMockQuest(withUser(user), withStartedQuest());

    await report.handler(ctx, {
      vectorId: quest.vectorId,
      userId: user._id,
      headers: {},
    });

    const updatedUser = await ctx.handlers.collection.user.get(ctx, {
      id: user._id,
    });

    expect(updatedUser.game.onboardingState).eql(
      EOnboardingState.READY_TO_ONBOARD
    );
  });

  it('should allow a user to onboard when reporting an already missed quest', async () => {
    const { ctx, user } = await setup({
      userOverrides: {
        game: {
          onboardingState: EOnboardingState.NOT_ONBOARDED,
          newOnboardedAt: null,
        },
      },
    });

    const quest = await insertMockQuest(
      withUser(user),
      withState(EQuestState.QUEST_STATE_MISSED),
      withResult({ completedAt: new Date(2020, 0, 0), stars: 1 })
    );

    await report.handler(ctx, {
      vectorId: quest.vectorId,
      userId: user._id,
      headers: {},
    });

    const updatedUser = await ctx.handlers.collection.user.get(ctx, {
      id: user._id,
    });

    expect(updatedUser.game.onboardingState).eql(
      EOnboardingState.READY_TO_ONBOARD
    );
  });

  it('should persist and track reporting speed', async () => {
    const startedAt = moment(FROZEN_DATE).subtract({ hours: 1 }).toDate();
    const ONE_HOUR_IN_MS = 3_600_000;

    const { ctx, user, quest, analyticsSpy } = await setup({
      questOverrides: {
        startedAt,
      },
    });

    await report.handler(ctx, {
      vectorId: quest.vectorId,
      userId: user._id,
      headers: {},
    });

    const updatedQuest = await ctx.handlers.collection.quest.get(
      withTaskRunnerRole(ctx),
      { id: quest._id }
    );

    expect(updatedQuest.simulationResult.reportingSpeed).eq(ONE_HOUR_IN_MS);

    verifyAnalytics(ctx, analyticsSpy, [
      {
        event: EServerEvent.ENGINE_QUEST_SUCCEEDED,
        userId: user._id,
        properties: {
          ...getQuestEventProps(quest),
          userAgent: undefined,
          reportingSpeed: ONE_HOUR_IN_MS,
        },
      },
    ]);
  });
});
