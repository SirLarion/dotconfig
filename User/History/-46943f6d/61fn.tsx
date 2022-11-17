import React from 'react';

import { ThreatSettingsForm } from './ThreatSettingsForm';
import { TQueryThreatSettings } from './models';
import { submitFormMutation } from '../../../../utils/formHelpers';
import {
  OrgThreatSettingsQuery,
  OrgThreatSettingsMutation,
} from './ThreatSettingsQuery';

interface IOrganizationSettingsProps {
  match: { params: { organizationId: string } };
}

const mapOrgToMutationVars =
  (id: string) => (organization: Partial<TQueryThreatSettings>) => ({
    id,
    organization,
  });

export const ThreatSettings: React.SFC<IOrganizationSettingsProps> = ({
  match: {
    params: { organizationId },
  },
}) => (
  <OrgThreatSettingsQuery
    query={GetOrganizationThreatSettings}
    variables={{ organizationId }}
  >
    {({ data: { organizations } }) => (
      <OrgThreatSettingsMutation
        mutation={SaveOrganizationThreatSettings}
        ignoreResults
      >
        {mutate => (
          <ThreatSettingsForm
            organization={organizations[0]}
            onSubmit={submitFormMutation(mutate)(
              mapOrgToMutationVars(organizationId)
            )}
          />
        )}
      </OrgThreatSettingsMutation>
    )}
  </OrgThreatSettingsQuery>
);

// For route
export default ThreatSettings;
