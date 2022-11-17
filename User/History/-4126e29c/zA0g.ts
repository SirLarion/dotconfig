import { find, propEq } from 'ramda';

import { withOrganizationId } from '@hox/telemetry-shared/gen_attribute_setters';

import { IOrganization } from '@server/collections/organizations';
import { IMetaContext } from '@server/domains/lib/models';
import { errorNotFound } from '@server/util/error';

export const getDomainOrThrow = (
  ctx: IMetaContext,
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
