import React from 'react';

import { ThreatSettingsForm } from './ThreatSettingsForm';
import { TQueryThreatSettings } from './models';
import { submitFormMutation } from '../../../../utils/formHelpers';

import {
  OrgThreatSettingsQuery,
  OrgThreatSettingsMutation,
} from './ThreatSettingsQuery';
import {
  GetOrgThreatSettingsDocument,
  SaveOrgThreatSettingsDocument,
} from './__generated__/ThreatSettings.generated';

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
    query={GetOrgThreatSettingsDocument}
    variables={{ organizationId }}
  >
    {({ data: { organizations } }) => (
      <OrgThreatSettingsMutation
        mutation={SaveOrgThreatSettingsDocument}
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
