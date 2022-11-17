import React from 'react';
import { FormSection } from '../../../../components/ui/Form/FormSection';
import { FormTextField } from '../../../../components/ui/Form/FormTextField';
import {
  IncidentPolicySettingsForm,
  DefaultIncidentPolicySettingFields,
} from '../../../../modules/CreateEditOrganization/components/IncidentSettings/IncidentPolicySettingsForm';
import {
  IIncidentPolicySettingsFormProps,
  IQueryThresholdPolicySettings,
} from '../../../../modules/CreateEditOrganization/components/IncidentSettings/models';
import { FormattedMessage } from 'react-intl';
import { submitFormMutation } from '../../../../utils/formHelpers';
import { OrgThresholdPolicySettingsMutation } from './ThresholdPolicySettingsMutation';

type TThresholdPolicySettingsFormProps = Omit<
  IIncidentPolicySettingsFormProps,
  'renderFields'
>;

const mapFormValuesToMutationVars =
  organizationId => (policySettings: IQueryThresholdPolicySettings) => ({
    organizationId,
    policySettings,
  });

export const ThresholdPolicySettingsForm: React.SFC<
  TThresholdPolicySettingsFormProps
> = props => (
  <OrgThresholdPolicySettingsMutation
    mutation={SaveOrgThresholdIncidentPolicySettings}
  >
    {mutate => (
      <IncidentPolicySettingsForm
        {...props}
        onSubmit={submitFormMutation(mutate)(
          mapFormValuesToMutationVars(props.organizationId)
        )}
        renderFields={renderProps => (
          <React.Fragment>
            <DefaultIncidentPolicySettingFields {...renderProps} />
            <FormSection>
              <FormTextField
                parse={value => parseInt(value, 10)}
                type="number"
                inputProps={{
                  min: 1,
                }}
                name="policySettings.creationThreshold"
                label={
                  <FormattedMessage
                    id="app.incidents.settings.escalationThreshold.label"
                    defaultMessage="Escalation threshold"
                    description="Text field label for a field that lets you decide how many reports are required before escalating an incident"
                  />
                }
                helperText={
                  <FormattedMessage
                    id="app.incidents.settings.escalationThreshold.helperText"
                    defaultMessage="Required report count for escalating the incident (Defaults to {defaultCount} if left empty)"
                    description="Helper text for a field that lets you decide how many reports are required before escalating an incident"
                    values={{
                      defaultCount: 5,
                    }}
                  />
                }
              />
            </FormSection>
          </React.Fragment>
        )}
      />
    )}
  </OrgThresholdPolicySettingsMutation>
);
