import { SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import { errorFailedPrecondition } from '@server/util/error';

import { TRemoveDomainHandlerConfig } from './lib/removeDomain.models';

/**
 * Explicit removal of an org's domain. Only removes the domain if no user emails are under it
 */
const removeDomain: TRemoveDomainHandlerConfig = {
  roles: [SUPER_ADMIN],
  async handler(ctx, { domainName }) {
    const organization = await ctx.handlers.collection.organization.getByDomain(
      ctx,
      { domain: domainName }
    );
    const domainUserCount = await ctx.handlers.collection.user.find(ctx, {
      params: {
        selector: {
          $and: [
            { 'organization._id': organization._id },
            { 'emails.address': new RegExp(`${domainName}$`) },
          ],
        },
      },
    });

    if (domainUserCount > 0) {
      throw errorFailedPrecondition(ctx, '');
    }

    return {};
  },
};

export default removeDomain;
