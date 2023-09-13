import { find as findHandler } from '@server/domains/collection/lib/mongo';
import { SUPER_ADMIN, TASK_RUNNER } from '@server/domains/lib/auth/roles';

import { TFindHandlerConfig } from './lib/find.models';

/**
 * Find an industry
 */
const find: TFindHandlerConfig = {
  roles: [SUPER_ADMIN, TASK_RUNNER],
  handler: findHandler,
};

export default find;
