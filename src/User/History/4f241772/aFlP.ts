import * as R from 'ramda';

import {
  withOrganizationDomains,
  withOrganizationId,
} from '@hox/telemetry-shared/context';

import {
  matchOrganizationId,
  policyAuthorizer,
} from '@server/domains/lib/auth/policy';
import { ADMIN, SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import { withTaskRunnerRole } from '@server/domains/lib/contextWith';

import { getDomainOrThrow } from './lib/lib';

import {
  IUpdatePayload,
  TUpdateContext,
  TUpdateHandlerConfig,
} from './lib/update.models';

const update: TUpdateHandlerConfig = {
  roles: [ADMIN, SUPER_ADMIN],
  inputAuthorizer: policyAuthorizer<TUpdateContext, IUpdatePayload>(
    matchOrganizationId({
      inputField: 'organizationId',
      exempt: [SUPER_ADMIN],
    })
  ),
  async handler(ctx, { organizationId, domainInput }) {
    const organization = await ctx.handlers.collection.organization.get(ctx, {
      id: organizationId,
    });

    const domain = getDomainOrThrow(organization, domainInput.name);

    const updatedDomain = R.mergeDeepRight(domain, domainInput);

    // replace old domain with updated
    const domains = organization.domains.map(domain =>
      domain.name !== updatedDomain.name ? domain : updatedDomain
    );

    const updatedOrg = await ctx.handlers.collection.organization.patch(
      withTaskRunnerRole(ctx),
      {
        id: organizationId,
        data: {
          domains,
        },
      }
    );

    return getDomainOrThrow(updatedOrg, domain.name);
  },
};
export default update;
