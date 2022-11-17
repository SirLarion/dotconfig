import React, { FC, useEffect, useState } from 'react';
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
  const [isOnboarding, setIsOnboarding] = useState(false);

  const { data, loading } = useGetOrgOnboardingSettingsQuery({
    variables: { organizationId },
  });

  const [mutate] = useSetIsOrgOnboardingMutation();

  const handleSubmit = () => {
    mutate({ variables: { organizationId, onboarding: isOnboarding } });
  };

  useEffect(() => {
    if (data && !loading) {
      setIsOnboarding(!!data.organizations[0].onboardingStartedAt);
    }
  }, [data, loading]);

  return (
    <PanelForm
      title="Organization Onboarding"
      description="This setting can be used to toggle whether the organization is currently onboarding or not."
      onSubmit={handleSubmit}
      renderFields={() => (
        <FormSection>
          <FormGroup>
            <Field
              name="orgOnboardingEnabled"
              type="checkbox"
              render={({ input }) => (
                <FormControlLabel
                  control={<Switch {...input} value="orgOnboardingEnabled" />}
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
