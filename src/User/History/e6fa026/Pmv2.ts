import { remove as removeHandler } from '@server/domains/collection/lib/mongo';
import { SUPER_ADMIN, TASK_RUNNER } from '@server/domains/lib/auth/roles';

import { TRemoveHandlerConfig } from './lib/remove.models';

/**
 * Remove an industry
 */
const remove: TRemoveHandlerConfig = {
  roles: [SUPER_ADMIN, TASK_RUNNER],
  async handler (ctx, { id }) => {

  },
};

export default remove;
