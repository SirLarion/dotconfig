import { EOnboardingState } from '@server/lib/typedSchemas/User/models';

import { createMigration } from './utils';

/**
 * Update users that have onboardedAt set incorrectly by checking onboardingState. onboardingState correctness verified with production db.
 */
export default createMigration({
  version: 272,
  up: async (_, ctx) => {
    const logger = ctx.getContextLogger();
    const users = ctx.getGlobal('getCollection')('user');

    logger.info(
      ctx,
      '1. Updating onboardedAt to null for users that are not onboarded according to new onboarding definitions.'
    );

    const updatedAmount = await users.updateMany(
      {
        'game.onboardedAt': { $exists: true },
        'game.onboardingState': { $ne: EOnboardingState.ONBOARDED },
      },
      { $unset: { 'game.onboardedAt': '' } }
    );
    logger.info(
      ctx,
      `2. Unset onboardedAt for ${updatedAmount.modifiedCount} users.`
    );
  },
});
