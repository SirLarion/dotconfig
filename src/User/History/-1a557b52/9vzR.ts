import { create as createHandler } from '@server/domains/collection/lib/mongo';
import { SUPER_ADMIN } from '@server/domains/lib/auth/roles';

import { TCreateHandlerConfig } from './lib/create.models';

/**
 * Create an industry
 */
const create: TCreateHandlerConfig = {
  roles: [SUPER_ADMIN],
  handler: createHandler,
};

export default create;
