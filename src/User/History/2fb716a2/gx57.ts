import { connectCollection } from '@server/domains/collection/lib/mongo/collection/mongoState';
import { industryData } from '@server/startup/migrations/v271-data';
import { ObjectId } from 'mongodb';

import { createMigration } from './utils';

export default createMigration({
  version: 271,
  up: async (_, ctx) => {
    const logger = ctx.getContextLogger();

    logger.info(ctx, '1 Getting all organizations.');

    const Organizations = await connectCollection(
      ctx.getGlobal('getCollection')('organization')
    );

    await Promise.all(
      industryData.map(async ({ orgs, ...industry }) => {
        const newIndustry = await ctx.handlers.collection.industry.create(ctx, {
          data: industry,
        });

        await Promise.all(
          orgs.map(async ({ _id }) => {
            await Organizations.updateOne(
              { _id, industryId: undefined },
              { $set: { industryId: newIndustry._id } }
            );
          })
        );
      })
    );
  },
});
