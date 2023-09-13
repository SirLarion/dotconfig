import React from 'react';
import { head, path, prop } from 'ramda';

import { ScimSettingsForm } from './ScimSettingsForm';
import { OrgScimSettingsQuery } from './ScimSettingsQuery';
import { OrgScimSettingsMutation } from './ScimSettingsMutation';
import { GetOrgScimSettingsDocument } from './__generated__/GetOrgScimSettings.generated';
import { CreateOrgScimTokenDocument } from './__generated__/CreateOrgScimToken.generated';

interface IOrganizationSettingsProps {
  match: { params: { organizationId: string } };
}

export const ScimSettings: React.SFC<IOrganizationSettingsProps> = ({
  match: {
    params: { organizationId },
  },
}) => (
  <OrgScimSettingsQuery
    query={GetOrgScimSettingsDocument}
    variables={{ organizationId }}
    fetchPolicy="network-only"
  >
    {({ data: { organizations, app } }) => (
      <OrgScimSettingsMutation mutation={CreateOrgScimTokenDocument}>
        {(mutate, result) => (
          <ScimSettingsForm
            scim={prop('scim', head(organizations))}
            scimEndpoint={path<string>(['publicSettings', 'scimEndpoint'], app)}
            createScimToken={() =>
              mutate({
                variables: { id: organizationId },
              })
            }
            scimTokenResult={result}
          />
        )}
      </OrgScimSettingsMutation>
    )}
  </OrgScimSettingsQuery>
);

// For route
export default ScimSettings;
