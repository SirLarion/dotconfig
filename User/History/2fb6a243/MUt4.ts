import { connectCollection } from '@server/domains/collection/lib/mongo/collection/mongoState';
import { industryData } from '@server/startup/migrations/v270-data';

import { createMigration } from './utils';

export default createMigration({
  version: 270,
  up: async (_, ctx) => {
    const logger = ctx.getContextLogger();

    logger.info(ctx, '');

    const Organizations = await connectCollection(
      ctx.getGlobal('getCollection')('organization')
    );
  },
});
