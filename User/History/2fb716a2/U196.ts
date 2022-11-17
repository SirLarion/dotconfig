import { fetchCursor } from '@server/domains/lib/collectionFp';
import { createMigration } from './utils';

export default createMigration({
  version: 271,
  up: async (_, ctx) => {
    const logger = ctx.getContextLogger();

    logger.info(ctx, '1 Getting all organizations.');

    const allOrganizations = await ctx.handlers.collection.organization
      .find(ctx, {
        params: {
          selector: {},
        },
      })
      .then(fetchCursor);
  },
});
