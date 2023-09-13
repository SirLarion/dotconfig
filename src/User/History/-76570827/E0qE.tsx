import React from 'react';
import { Mutation } from '../../../../utils/apollo';

import { MessageDescriptor } from 'react-intl';
import { submitFormMutation } from '../../../../utils/formHelpers';
import { OrgDomainQuery } from './DomainsQuery';
import {
  OrgDomainsDocument,
  SaveOrgDomainsDocument,
} from './__generated__/OrganizationDomains.generated';
import { Intl } from '../intl';
import { DomainsForm } from './DomainsForm';
import { IDomainQueryOrg } from './models';

interface IDomainContextFormProps {
  match: { params: { organizationId: string } };
  intl: Record<string, MessageDescriptor>;
}

const mapDomainsToMutationVars =
  (id: string) => (domains: IDomainQueryOrg['domains']) => ({
    id,
    organization: {
      domains,
    },
  });

export const DomainSettings: React.SFC<IDomainContextFormProps> = ({
  match: {
    params: { organizationId },
  },
}) => (
  <OrgDomainQuery query={GetOrganizationDomains} variables={{ organizationId }}>
    {({ data: { organizations } }) => (
      <Mutation mutation={SaveOrganizationDomains} ignoreResults>
        {mutate => (
          <DomainsForm
            organizationId={organizationId}
            domains={organizations[0].domains}
            onSubmit={submitFormMutation(mutate)(
              mapDomainsToMutationVars(organizationId)
            )}
            intl={Intl}
          />
        )}
      </Mutation>
    )}
  </OrgDomainQuery>
);

export default DomainSettings;
