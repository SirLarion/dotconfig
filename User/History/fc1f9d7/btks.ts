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
import { withTaskRunnerRole } from '@server/domains/lib/contextWith';
import { errorFailedPrecondition } from '@server/util/error';

import { getDomainOrThrow } from './lib/lib';
import {
  IRemovePayload,
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
    const organization = await ctx.handlers.collection.organization.get(ctx, {
      id: organizationId,
    });

    const domain = getDomainOrThrow(ctx, organization, domainInput.name);

    const domainUserCount = await ctx.handlers.collection.user
      // user.find whitelist only allows selector.organizationId,
      // not selector.$and.0.organizationId
      .find(withTaskRunnerRole(ctx), {
        params: {
          selector: {
            $and: [
              { organizationId },
              { 'emails.address': new RegExp(`@${domainInput.name}$`) },
            ],
          },
        },
      })
      .then(c => c.count());

    if (domainUserCount > 0) {
      throw errorFailedPrecondition(
        ctx,
        `Removing domain: ${domain.name} failed. User email addresses exist under the domain.`,
        withUserEmailDomain(domain.name),
        withUserId(ctx.identity.getId()),
        withOrganizationId(organizationId)
      );
    }

    const remainingDomains = organization.domains.filter(
      d => d.name !== domain.name
    );

    await ctx.handlers.collection.organization.patch(withTaskRunnerRole(ctx), {
      id: organization._id,
      data: { domains: remainingDomains },
    });

    return domain;
  },
};

export default remove;
