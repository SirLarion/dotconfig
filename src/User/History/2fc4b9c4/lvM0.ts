import { withSuperAdminRole } from '@server/domains/lib/contextWith';

import { createMigration } from './utils';

/**
 * Describe in short what the migration is doing, and why
 */
export default createMigration({
  version: 280,
  up: async (_, ctx) => {
    const logger = ctx.getContextLogger();
    const superAdminCtx = withSuperAdminRole(ctx);

    logger.info(ctx, '1. Creating global industry.');

    await ctx.handlers.collection.industry.create(superAdminCtx, {
      data: { _id: 'global', name: 'Global' },
    });

    logger.info(ctx, '2. All done!');
  },
});
