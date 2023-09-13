import {
  withOrganizationId,
  withUserEmailDomain,
  withUserId,
} from '@hox/telemetry-shared/gen_attribute_setters';

import { SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import { errorFailedPrecondition, errorNotFound } from '@server/util/error';

import { TRemoveDomainHandlerConfig } from './lib/removeDomain.models';

/**
 * Explicit removal of an org's domain. Only removes the domain if no user emails are under it
 */
const removeDomain: TRemoveDomainHandlerConfig = {
  roles: [SUPER_ADMIN],
  async handler(ctx, { domainName }) {
    const { organization } =
      await ctx.handlers.collection.organization.getByDomain(ctx, {
        domain: domainName,
      });
    if (!organization) {
      throw errorNotFound(
        ctx,
        `No organization with domain: ${domainName} exists`,

        withUserId(ctx.identity.getId()),
        withOrganizationId(ctx.identity.getOrganizationId())
      );
    }

    const domainUserCount = await ctx.handlers.collection.user
      .find(ctx, {
        params: {
          selector: {
            $and: [
              { organizationId: organization._id },
              { 'emails.address': new RegExp(`@${domainName}$`) },
            ],
          },
        },
      })
      .then(c => c.count());

    console.log('user count', domainUserCount);

    if (domainUserCount > 0) {
      throw errorFailedPrecondition(
        ctx,
        `Removing domain: ${domainName} failed. User email addresses exist under the domain.`,
        withUserEmailDomain(domainName),
        withUserId(ctx.identity.getId()),
        withOrganizationId(ctx.identity.getOrganizationId())
      );
    }

    const remainingDomains = organization.domains.filter(
      d => d.name !== domainName
    );

    return ctx.handlers.collection.organization.patch(ctx, {
      id: organization._id,
      data: { domains: remainingDomains },
    });
  },
};

export default removeDomain;
