import {
  matchOrganizationId,
  policyAuthorizer,
} from '@server/domains/lib/auth/policy';
import { ADMIN, SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import { withTaskRunnerRole } from '@server/domains/lib/contextWith';
import { errorAlreadyExists } from '@server/util/error';

import { IAddPayload, TAddContext, TAddHandlerConfig } from './lib/add.models';
import { getDomainOrThrow } from './lib/lib';

/**
 * Add a new domain to an organization
 */
const add: TAddHandlerConfig = {
  roles: [ADMIN, SUPER_ADMIN],
  inputAuthorizer: policyAuthorizer<TAddContext, IAddPayload>(
    matchOrganizationId({
      inputField: 'organizationId',
      exempt: [SUPER_ADMIN],
    })
  ),
  async handler(ctx, { organizationId, domainInput }) {
    const organization = await ctx.handlers.collection.organization.get(ctx, {
      id: organizationId,
    });
    try {
      getDomainOrThrow(ctx, organization, domainInput.name);
    } catch {
      const domains = organization.domains.concat([domainInput]);

      const updatedOrg = await ctx.handlers.collection.organization.patch(
        withTaskRunnerRole(ctx),
        {
          id: organizationId,
          data: {
            domains,
          },
        }
      );

      return getDomainOrThrow(ctx, updatedOrg, domainInput.name);
    }
    throw errorAlreadyExists(
      ctx,
      `Adding domain failed. Domain: ${domainInput.name} already exists.`
    );
  },
};

export default add;
