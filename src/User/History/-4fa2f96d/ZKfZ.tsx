import React from 'react';

import { MessageDescriptor } from 'react-intl';
import { submitFormMutation } from '../../../../utils/formHelpers';
import { Intl } from '../intl';
import { IQueryIncidentSettings, TQueryPolicySettings } from './models';
import { IncidentPolicySettingsForms } from './IncidentPolicySettingsForms';
import { IncidentSettingsForms } from './IncidentSettingsForms';

import { OrgIncidentSettingsQuery } from './IncidentSettingsQuery';
import { OrgIncidentSettingsMutation } from './IncidentSettingsMutation';
import { OrgIncidentPolicySettingsMutation } from './IncidentPolicySettingsMutation';
import { GetOrgIncidentSettingsDocument } from './__generated__/GetOrgIncidentSettings.generated';
import { SaveOrgIncidentSettingsDocument } from './__generated__/SaveOrgIncidentSettings.generated';
import { SaveOrgIncidentPolicySettingsDocument } from './__generated__/SaveOrgIncidentPolicySettings.generated';

interface IIncidentSettingFormProps {
  match: { params: { organizationId: string } };
  intl: Record<string, MessageDescriptor>;
}

const mapIncidentPolicySettingsToMutationVars =
  (organizationId: string) => (policySettings: TQueryPolicySettings) => {
    return {
      organizationId,
      policySettings,
    };
  };

const mapIncidentSettingsToMutationVars =
  (organizationId: string) => (incidentSettings: IQueryIncidentSettings) => ({
    organizationId,
    incidentSettings,
  });

export const IncidentSettings: React.SFC<IIncidentSettingFormProps> = ({
  match: {
    params: { organizationId },
  },
}) => (
  <OrgIncidentSettingsQuery
    query={GetOrganizationIncidentSettings}
    variables={{ organizationId }}
  >
    {({ data: { organizations } }) => (
      <>
        <OrgIncidentSettingsMutation
          mutation={SaveOrganizationIncidentSettings}
          ignoreResults
        >
          {mutate => (
            <IncidentSettingsForms
              organizationId={organizationId}
              incidentSettings={organizations[0].incidentSettings}
              onSubmit={submitFormMutation(mutate)(
                mapIncidentSettingsToMutationVars(organizationId)
              )}
              intl={Intl}
            />
          )}
        </OrgIncidentSettingsMutation>
        <OrgIncidentPolicySettingsMutation
          mutation={SaveOrganizationIncidentPolicySettings}
          ignoreResults
        >
          {mutate => (
            <IncidentPolicySettingsForms
              organizationId={organizationId}
              incidentSettings={organizations[0].incidentSettings}
              onSubmit={submitFormMutation(mutate)(
                mapIncidentPolicySettingsToMutationVars(organizationId)
              )}
              intl={Intl}
            />
          )}
        </OrgIncidentPolicySettingsMutation>
      </>
    )}
  </OrgIncidentSettingsQuery>
);

export default IncidentSettings;
