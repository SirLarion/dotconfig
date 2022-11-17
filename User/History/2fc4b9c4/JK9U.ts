import { withSuperAdminRole } from '@server/domains/lib/contextWith';

import { createMigration } from './utils';

/**
 * Create global industry that is used as a placeholder for industries where we have
 * 5 or less client organizations
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
