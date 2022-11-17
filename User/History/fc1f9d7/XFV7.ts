import {
  withOrganizationId,
  withUserEmailDomain,
  withUserId,
} from '@hox/telemetry-shared/gen_attribute_setters';

import {
  matchOrganizationId,
  policyAuthorizer,
} from '@server/domains/lib/auth/policy';
import { ADMIN, SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import { errorFailedPrecondition, errorNotFound } from '@server/util/error';

import {
  IRemovePaylod,
  TRemoveContext,
  TRemoveHandlerConfig,
} from './lib/remove.models';

/**
 * Explicit removal of an org's domain. Only removes the domain if no user emails are under it
 */
const remove: TRemoveHandlerConfig = {
  roles: [ADMIN, SUPER_ADMIN],
  inputAuthorizer: policyAuthorizer<TRemoveContext, IRemovePayload>(
    matchOrganizationId({
      inputField: 'organizationId',
      exempt: [SUPER_ADMIN],
    })
  ),
  async handler(ctx, { organizationId, domainInput }) {
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

export default remove;
