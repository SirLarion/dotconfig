import { find as findHandler } from '@server/domains/collection/lib/mongo';
import { SUPER_ADMIN } from '@server/domains/lib/auth/roles';

import { TFindHandlerConfig } from './lib/find.models';

/**
 * Find an industry
 */
const find: TFindHandlerConfig = {
  roles: [SUPER_ADMIN],
  handler: findHandler,
};

export default find;
