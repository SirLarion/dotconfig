import React, { FC } from 'react';
import { FormControlLabel, FormGroup, Switch } from '@material-ui/core';

import { PanelForm } from '../../../../components/ui/PanelForm/PanelForm';
import { FormSection } from '../../../../components/ui/Form/FormSection';
import { Field } from '../../../../components/ui/Form/Field';

import { useSetIsOrgOnboardingMutation } from './__generated__/SetIsOrgOnboarding.generated';
import { useGetOrgOnboardingSettingsQuery } from './__generated__/GetOrgOnboardingSettings.generated';

interface IOrganizationSettingsProps {
  match: { params: { organizationId: string } };
}

const OnboardingSettings: FC<IOrganizationSettingsProps> = ({
  match: {
    params: { organizationId },
  },
}) => {
  const { data } = useGetOrgOnboardingSettingsQuery({
    variables: { organizationId },
  });

  const [mutate] = useSetIsOrgOnboardingMutation();

  const handleSubmit = (values: { isOnboarding: boolean }) => {
    console.log(isOnboarding);
    mutate({
      variables: { organizationId, onboarding: values.isOnboarding },
    });
  };

  return (
    <PanelForm
      title="Organization Onboarding"
      description="This setting can be used to toggle whether the organization is currently onboarding or not."
      onSubmit={handleSubmit}
      renderFields={() => (
        <FormSection>
          <FormGroup>
            <Field
              name="isOnboarding"
              type="checkbox"
              render={({ input }) => (
                <FormControlLabel
                  control={
                    <Switch
                      {...input}
                      defaultChecked={
                        !!data?.organizations[0].onboardingStartedAt
                      }
                      value="isOnboarding"
                    />
                  }
                  label="Enable Organization Onboarding"
                />
              )}
            />
          </FormGroup>
        </FormSection>
      )}
    />
  );
};

export default OnboardingSettings;
