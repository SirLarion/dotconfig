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
    mutate({ variables: { organizationId, onboarding: isOnboarding } }).then(res => { if});
  };

  useEffect(() => {
    if (data && !loading) {
      setIsOnboarding(!!data.organizations[0].onboardingStartedAt);
    }
  }, [data, loading]);

  return (
    <PanelForm
      title="Organization Onboarding"
      description="Turning this setting on enables this organization to set up Feedback Rules."
      onSubmit={handleSubmit}
      renderFields={() => (
        <FormSection>
          <FormGroup>
            <Field
              name="feedbackRulesEnabled"
              type="checkbox"
              render={({ input }) => (
                <FormControlLabel
                  control={<Switch {...input} value="feedbackRulesEnabled" />}
                  label="Enable Feedback Rules"
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