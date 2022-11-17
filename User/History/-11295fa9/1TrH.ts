import { SUPER_ADMIN } from '@server/domains/lib/auth/roles';

import { TRemoveDomainHandlerConfig } from './lib/removeDomain.models';

/**
 * Explicit removal of a domain an org has. Only removes the domain if no user emails are under it
 */
const removeDomain: TRemoveDomainHandlerConfig = {
  roles: [SUPER_ADMIN],
  async handler(ctx, { organizationId, domainName }) {
    return {};
  },
};

export default removeDomain;
