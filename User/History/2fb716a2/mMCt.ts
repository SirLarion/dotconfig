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

    const Industries = await connectCollection(
      ctx.getGlobal('getCollection')('industry')
    );

    await Industries.insertMany(
      industryData.map(({ orgs, ...industry }) => ({
        _id: industry._id as ObjectId,
        name: industry.name,
      }))
    );

    await Promise.all(
      industryData.map(async ({ orgs, ...industry }) => {
        const newIndustry = await ctx.handlers.collection.industry.create(ctx, {
          data: industry,
        });
      })
    );
  },
});
