import { find, propEq } from 'ramda';

import { withOrganizationId } from '@hox/telemetry-shared/gen_attribute_setters';

import { IOrganization } from '@server/collections/organizations';
import { errorNotFound } from '@server/util/error';

import { TUpdateContext } from './update.models';

export const getDomainOrThrow = (
  ctx: TUpdateContext,
  organization: IOrganization,
  domainName: string
) => {
  const domain = find(propEq('name', domainName), organization.domains);

  if (!domain) {
    throw errorNotFound(
      ctx,
      `Accessing domain failed. Domain: ${domainName} not found.`,
      withOrganizationId(organization._id)
    );
  }

  return domain;
};

export const throwIfUsersUnderDomain = (organizationId: string) => {
  // user.find whitelist only allows selector.organizationId,
  // not selector.$and.0.organizationId => withTaskRunnerRole
  const domainUserCount = await ctx.handlers.collection.user
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
};
