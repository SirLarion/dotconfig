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

    await ctx.handlers.collection.industry.create(superAdminCtx, {
      data: { _id: 'global', name: 'Global' },
    });

    logger.info(
      ctx,
      '1. Logging during migration improves observability, do not hesitate.'
    );

    logger.info(
      ctx,
      '2. Consider effects to external systems, we cannot control them.'
    );

    logger.info(
      ctx,
      `
      3. Consider the fact that during migration the old version of the code will be still run.
      MongoDB has no database level schema, so if you still have old pods inserting data with old schema, 
      they might stay in the system even after the migration.
    `
    );
  },
});
