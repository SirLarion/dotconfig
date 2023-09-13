import { industryData } from '@server/startup/migrations/v270-data';

import { createMigration } from './utils';

export default createMigration({
  version: 270,
  up: async (_, ctx) => {
    const logger = ctx.getContextLogger();

    logger.info(ctx, '');
  },
});
