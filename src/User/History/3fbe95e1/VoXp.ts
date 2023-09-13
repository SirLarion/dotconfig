import { expect } from 'chai';
import R from 'ramda';
import Sinon from 'sinon';

import { getQuestEventProps } from '@server/domains/game/quest/lib/questAnalytics';
import { SUPER_ADMIN, TASK_RUNNER } from '@server/domains/lib/auth/roles';
import {
  insertMockQuest,
  withState,
  withUser,
  withVectorId,
} from '@server/domains/lib/testMockCreators/mockQuest';
import { createMockUser } from '@server/domains/lib/testMockCreators/mockUser';
import {
  insertMockVector,
  withStateRecords,
} from '@server/domains/lib/testMockCreators/mockVector';
import { testACL, verifyAnalytics } from '@server/domains/lib/testShared';
import {
  createIntegrationCtx,
  withAnonymousIdentity,
  withGlobals,
  withTaskRunnerUserRole,
} from '@server/domains/lib/testUtilIntegration';
import { EServerEvent } from '@server/lib/analyticEvents';
import { resetDatabase } from '@server/lib/serverTestUtils/serverTestUtils';
import { EStarRewardType } from '@server/lib/typedSchemas/Analytics/AnalyticsEvent';
import {
  EQuestOrigin,
  EQuestState,
} from '@server/lib/typedSchemas/Quest/models';
import { EVectorState, IVector } from '@server/lib/typedSchemas/Vector/models';

import expire from '../expire';
import { getVectorStateRecord } from '../lib/shared.lib';

import { IQuest } from './../../../../lib/typedSchemas/Quest/Quest';

interface ISetupProps {
  vector?: IVector;
  quest?: Partial<IQuest>;
}

const FROZEN_DATE = new Date();

const setup = async ({ vector, quest }: ISetupProps) => {
  const ctx = await R.pipe(
    withTaskRunnerUserRole,
    withGlobals({ newDate: () => FROZEN_DATE }),
    createIntegrationCtx
  )(null);

  const analyticsSpies = {
    ingest: { track: Sinon.spy(ctx.handlers.analytics.ingest, 'track') },
    sink: { track: Sinon.spy(ctx.handlers.analytics.sink, 'track') },
  };

  const user = await createMockUser(null, { persist: true });

  const { _id: vectorId } =
    vector ||
    (await insertMockVector(
      withStateRecords([
        getVectorStateRecord(
          EVectorState.VECTOR_EMAIL_DELIVERED,
          'trackingApi'
        ),
      ])
    ));

  const { _id: questId } = await insertMockQuest(
    withUser(user),
    withVectorId(vectorId),
    withState(EQuestState.QUEST_STATE_STARTED),
    R.mergeLeft(quest)
  );

  const getQuest = (id: string) =>
    ctx.handlers.collection.quest.get(ctx, { id });

  return {
    ctx,
    userId: user._id,
    questId,
    getQuest,
    analyticsSpies,
  };
};

describe('game.quest.expire', () => {
  testACL(expire, [TASK_RUNNER, SUPER_ADMIN]);

  beforeEach(() => resetDatabase());
  after(() => resetDatabase());

  it('should expire quest', async () => {
    const { ctx, questId, getQuest, analyticsSpies } = await setup({});

    const { _id } = await expire.handler(ctx, { questId });

    const quest = await getQuest(_id);
    const { state, simulationResult } = quest;
    expect(state).eql(EQuestState.QUEST_STATE_MISSED);
    expect(simulationResult).eql({ stars: 1, completedAt: FROZEN_DATE });

    await verifyAnalytics(
      ctx,
      analyticsSpies,
      [
        {
          event: EServerEvent.ENGINE_QUEST_MISSED,
          userId: quest.userId,
          properties: getQuestEventProps(quest),
        },
        {
          event: EServerEvent.STARS_REWARDED,
          userId: quest.userId,
          properties: {
            organizationId: quest.organizationId,
            questId: quest._id,
            starCount: 1,
            maxStarCount: 2,
            starsRewardedTime: quest.simulationResult.completedAt,
            starRewardType: EStarRewardType.QUEST_MISSED,
            sourceEventForReward: 'training_engine_quest_missed',
          },
        },
      ],
      { verifyAllEvents: false }
    );
  });

  it('should set quest to error state if it has not been delivered', async () => {
    const vector = await insertMockVector(
      withStateRecords([
        getVectorStateRecord(
          EVectorState.VECTOR_EMAIL_DELIVERED,
          'trackingApi'
        ),
        getVectorStateRecord(
          EVectorState.VECTOR_DELIVERY_FAILURE,
          'trackingApi'
        ),
      ])
    );
    const { ctx, questId, getQuest } = await setup({ vector });

    const { _id } = await expire.handler(ctx, { questId });

    const { state } = await getQuest(_id);

    expect(state).eql(EQuestState.QUEST_STATE_ERROR);
  });

  it('should temporarily allow expiring with empty vector state array', async () => {
    const vector = await insertMockVector(withStateRecords([]));
    const { ctx, questId, getQuest } = await setup({ vector });

    const { _id } = await expire.handler(ctx, { questId });

    const { state } = await getQuest(_id);

    expect(state).eql(EQuestState.QUEST_STATE_MISSED);
  });

  it('should set quest to error state if it was an automatic activation reminder email', async () => {
    const { ctx, questId, getQuest } = await setup({
      quest: { origin: EQuestOrigin.AUTOMATIC_ACTIVATION_REMINDER },
    });

    const { _id } = await expire.handler(ctx, { questId });

    const { state } = await getQuest(_id);

    expect(state).eql(EQuestState.QUEST_STATE_ERROR);
  });

  const sadCaseTests: Array<{
    description: string;
    insertQuest?: boolean;
    expectedError: string;
  }> = [
    {
      description: `should throw if quest is not found`,
      expectedError: 'Error while expiring quest.: Quest does not exist.',
    },
    {
      description: `should throw if quest is not in started state`,
      insertQuest: true,
      expectedError:
        'Error while expiring quest.: Can only expire quests whose state is QUEST_STATE_STARTED.',
    },
  ];

  for (const test of sadCaseTests) {
    it(test.description, async () => {
      const ctx = await R.pipe(
        withAnonymousIdentity([TASK_RUNNER]),
        createIntegrationCtx
      )(null);

      let questId;

      if (test.insertQuest) {
        const { _id } = await insertMockQuest(
          withState(EQuestState.QUEST_STATE_NOT_STARTED)
        );

        questId = _id;
      }

      try {
        await expire.handler(ctx, { questId });
        expect.fail(`expected expire handler to throw but it didn't`);
      } catch (err) {
        expect(err.message).eql(test.expectedError);
      }
    });
  }
});
