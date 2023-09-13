import {
  ADMIN,
  SUPER_ADMIN,
  TASK_RUNNER,
} from '@server/domains/lib/auth/roles';

import { TGetHandlerConfig } from './lib/get.models';

/**
 * Get an industry by ID
 */
const get: TGetHandlerConfig = {
  roles: [ADMIN, SUPER_ADMIN, TASK_RUNNER],
  async handler(ctx, payload) {
    return {};
  },
};

export default get;
