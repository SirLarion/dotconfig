import { get as getHandler } from '@server/domains/collection/lib/mongo';
import { ADMIN, SUPER_ADMIN } from '@server/domains/lib/auth/roles';

import { TGetHandlerConfig } from './lib/get.models';

/**
 * Get an industry by ID
 */
const get: TGetHandlerConfig = {
  roles: [ADMIN, SUPER_ADMIN],
  handler: (ctx, { industryId }) => getHandler(ctx, { id: industryId }),
};

export default get;
