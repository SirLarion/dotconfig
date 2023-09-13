import { find, propEq } from 'ramda';

import { errorNotFound } from '@hox/telemetry-shared/error';
import { withOrganizationId } from '@hox/telemetry-shared/gen_attribute_setters';

import { IOrganization } from '@server/collections/organizations';
import { IMetaContext } from '@server/domains/lib/models';

export const getDomainOrThrow = (
  ctx: IMetaContext,
  organization: IOrganization,
  domainName: string
) => {
  const domain = find(propEq('name', domainName), organization.domains);

  if (!domain) {
    throw errorNotFound(
      ctx,
      `Failed to update domain. Domain: ${domainName} not found.`,
      withOrganizationId(organization._id)
    );
  }

  return domain;
};
