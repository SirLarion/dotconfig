import { ADMIN, SUPER_ADMIN } from '@server/domains/lib/auth/roles';

import { TAddHandlerConfig } from './lib/add.models';

/**
 * Add a new domain to an organization
 */
const add: TAddHandlerConfig = {
  roles: [ADMIN, SUPER_ADMIN],
  async handler(ctx, payload) {
    return {};
  },
};

export default add;
