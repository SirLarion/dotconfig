import { createMigration } from './utils';

/**
 * Describe in short what the migration is doing, and why
 */
export default createMigration({
  version: 272,
  up: async (_, ctx) => {
    const logger = ctx.getContextLogger();

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
import { connectCollection } from '@server/domains/collection/lib/mongo/collection/mongoState';
import { industryData } from '@server/startup/migrations/v271-data';

import { createMigration } from './utils';

/*
 * Creates Industry objects corresponding to current customers' industries. Adds
 * corresponding industryIds to the orgs in those industries.
 */
export default createMigration({
  version: 271,
  up: async (_, ctx) => {
    const logger = ctx.getContextLogger();

    logger.info(ctx, '1. Connecting to mongo collection.');

    const Organizations = await connectCollection(
      ctx.getGlobal('getCollection')('organization')
    );

    logger.info(ctx, '2. Creating Industries.');
    await Promise.all(
      industryData.map(async ({ orgs, ...industry }) => {
        logger.info(ctx, `Creating industry: ${industry.name}`);

        const newIndustry = await ctx.handlers.collection.industry.create(ctx, {
          data: industry,
        });

        logger.info(ctx, `Adding industryId to orgs under ${industry.name}`);
        await Promise.all(
          orgs.map(async orgId => {
            const org = await ctx.handlers.collection.organization.get(ctx, {
              id: orgId,
            });
            await Organizations.updateOne(
              { _id: org?._id },
              { $set: { industryId: newIndustry._id } }
            );
          })
        );
      })
    );

    logger.info(
      ctx,
      `
      3. All done! Most of the existing organizations should now have an industryId for their respective industry.
    `
    );
  },
});
