import React from 'react';

import {
  OrganizationSettingsQuery,
  OrganizationSettingsMutation,
} from './OrganizationSettingsQuery';

import { OrganizationSettingsForm } from './OrganizationSettingsForm';
import { IQueryOrg } from './models';
import { submitFormMutation } from '../../../../utils/formHelpers';

interface IOrganizationSettingsProps {
  match: { params: { organizationId: string } };
}

const mapOrgToMutationVars =
  (id: string) => (organization: Partial<IQueryOrg>) => ({
    id,
    organization,
  });

export const OrganizationSettings: React.FC<IOrganizationSettingsProps> = ({
  match: {
    params: { organizationId },
  },
}) => {
  return (
    <OrganizationSettingsQuery
      query={GetOrganizationSettings}
      variables={{ organizationId }}
    >
      {({ data: { organizations } }) => (
        <OrganizationSettingsMutation
          mutation={SaveOrganizationSettings}
          ignoreResults
        >
          {mutate => (
            <OrganizationSettingsForm
              organization={organizations[0]}
              onSubmit={submitFormMutation(mutate)(
                mapOrgToMutationVars(organizationId)
              )}
            />
          )}
        </OrganizationSettingsMutation>
      )}
    </OrganizationSettingsQuery>
  );
};

// For route
export default OrganizationSettings;
