import { SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import { create as createHandler } from '@server/domains/collection/lib/mongo';

import { TFindHandlerConfig } from './lib/find.models';

/**
 * Find an industry
 */
const find: TFindHandlerConfig = {
  roles: [SUPER_ADMIN],
  async handler(ctx, payload) {
    return {};
  },
};

export default find;
