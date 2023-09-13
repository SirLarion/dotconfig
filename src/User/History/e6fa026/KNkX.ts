import { remove as removeHandler } from '@server/domains/collection/lib/mongo';
import { SUPER_ADMIN } from '@server/domains/lib/auth/roles';

import { TRemoveHandlerConfig } from './lib/remove.models';

/**
 * Remove an industry
 */
const remove: TRemoveHandlerConfig = {
  roles: [SUPER_ADMIN],
  handler: removeHandler,
};

export default remove;
