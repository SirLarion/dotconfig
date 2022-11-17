import { connectCollection } from '@server/domains/collection/lib/mongo/collection/mongoState';
import {
  EQuestOrigin,
  EQuestState,
} from '@server/lib/typedSchemas/Quest/models';
import { userIds } from '@server/startup/migrations/v262-data';

import { createMigration } from './utils';

/**
 * There are some users that should be onboarded because they have compleded a bootcamp sent as BULK_USER_ACTIONS. We can't just activate all users like this as most of them are benchmarks.
 * This finds those users, changes the origin to be correct, and adds a flag to our backfiller to check them for backfilling
 */
export default createMigration({
  version: 262,
  up: async (_, ctx) => {
    const logger = ctx.getContextLogger();

    const Quests = await connectCollection(
      ctx.getGlobal('getCollection')('quest')
    );

    const Users = await connectCollection(
      ctx.getGlobal('getCollection')('user')
    );

    logger.info(ctx, '1. Updating quest origins');

    const questResult = await Quests.updateMany(
      {
        userId: { $in: userIds },
        origin: EQuestOrigin.BULK_USER_ACTION,
        state: EQuestState.QUEST_STATE_SUCCESS,
        tag: /hox.quest.bootcamp.0.*/,
      },
      { $set: { origin: EQuestOrigin.MANUAL_TRAINING_SIMULATION } }
    );

    logger.info(ctx, `${questResult.modifiedCount} quests updated`);

    logger.info(ctx, '2. Changing user onboarding backfill state.');

    const userResult = await Users.updateMany(
      { _id: { $in: userIds } },
      { $set: { 'game.newOnboardedBackfilled': false } }
    );

    logger.info(ctx, `${userResult.modifiedCount} users updated`);

    logger.info(
      ctx,
      `
      3. Done
    `
    );
  },
});
