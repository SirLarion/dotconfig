import { connectCollection } from '@server/domains/collection/lib/mongo/collection/mongoState';
import { industryData } from '@server/startup/migrations/v271-data';

import { createMigration } from './utils';

/*
 * Adds industry data to all existing organizations
 */
export default createMigration({
  version: 271,
  up: async (_, ctx) => {
    const logger = ctx.getContextLogger();

    logger.info(ctx, '1. Connecting to mongo collection.');

    const Organizations = await connectCollection(
      ctx.getGlobal('getCollection')('organization')
    );

    await Promise.all(
      industryData.map(async ({ orgs, ...industry }) => {
        const newIndustry = await ctx.handlers.collection.industry.create(ctx, {
          data: industry,
        });

        await Promise.all(
          orgs.map(async orgId => {
            const { _id } = await ctx.handlers.collection.organization.get(
              ctx,
              {
                id: orgId,
              }
            );
            await Organizations.updateOne(
              { _id },
              { $set: { industryId: newIndustry._id } }
            );
          })
        );
      })
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
