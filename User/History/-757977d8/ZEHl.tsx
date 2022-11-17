import React, { FC, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Input from '@hox/ui/Input';
import { Body, Heading4 } from '@hox/ui/Text';
import { Toggle } from '@hox/ui/Toggle';

import { CopyIconButton } from '../../../../../../../components/CopyIconButton';
import { Blocks } from '../../../../../components/Blocks';
import {
  useSettingsToasts,
  useWithSettingsToasts,
} from '../../../../../hooks/useSettingsToasts';
import { OrgEmailDeliverySettingsFragment } from '../../graphql/__generated__/GetCurrentUserOrgEmailDeliverySettings.generated';

import { useSetOrgGmailIntegrationMutation } from './graphql/__generated__/SetOrgGmailIntegration.generated';

export interface IGmailApiIntegrationProps {
  organization: OrgEmailDeliverySettingsFragment;
  gmailIntegration: { clientId: string; requiredScopes: string[] };
}

const INTL = {
  gmailApiIntegration: (
    <FormattedMessage
      id="app.admin.settings.subPage.gmailApiIntegration.heading"
      defaultMessage="Gmail API Integration"
      description="Text for Gmail API Integration setting heading"
    />
  ),
};

export const GmailApiIntegrationForm: FC<IGmailApiIntegrationProps> = ({
  organization,
  gmailIntegration,
}) => {
  const toasts = useSettingsToasts();
  const [toggled, setToggled] = useState(false);

  const [updateGmailIntegration] = useSetOrgGmailIntegrationMutation();

  useEffect(
    () => setToggled(!!organization.delivery.email?.useGmailDeliveryApi),
    [organization.delivery.email.useGmailDeliveryApi]
  );

  const handleIntegrationToggle = (value: boolean) =>
    updateGmailIntegration({
      variables: {
        useGmailDeliveryApi: value,
      },
    })
      .then(() => toasts.showSuccessToast())
      .catch(err => toasts.showErrorToast(err.message));

  return (
    <Blocks.Card>
      <Blocks.Column>
        <Blocks.TitleAndBody>
          <Heading4>{INTL.gmailApiIntegration}</Heading4>
          <Body dimmed>
            <FormattedMessage
              id="app.admin.settings.subPage.gmailApiIntegration.description"
              defaultMessage="{gmailApiIntegration} is used to directly upload emails to users' inboxes instead of sending them as normal emails. This will ensure that the users will receive all communications from Hoxhunt."
              description="Text for Gmail API Integration heading"
              values={{ gmailApiIntegration: INTL.gmailApiIntegration }}
            />
          </Body>
        </Blocks.TitleAndBody>
        <Blocks.Row>
          <Toggle selected={toggled} onChange={handleIntegrationToggle} />
          <Heading4>
            <FormattedMessage
              id="app.admin.settings.toggleDescription"
              defaultMessage="Use {featureName}"
              description="Text next to a toggle on/off button that toggles {featureName} on and off"
              values={{ featureName: INTL.gmailApiIntegration }}
            />
          </Heading4>
        </Blocks.Row>
        <Body dimmed>
          <FormattedMessage
            id="app.admin.settings.subPage.gmailApiIntegration.domainKeysDescription"
            defaultMessage="Create an API client in your {linkToDomainDelegationSettings} in {googleAdmin} portal with the settings below."
            description="Details of Google API client settings. Google Admin portal: "
            values={{
              linkToDomainDelegationSettings: (
                <Blocks.Link href="https://admin.google.com/u/2/ac/owl/domainwidedelegation">
                  <FormattedMessage
                    id="app.admin.settings.subPage.gmailApiIntegration.domainDelegationSettings"
                    defaultMessage="Domain Delegation Settings"
                    description="Settings that control API access to a domain in Google Admin"
                  />
                </Blocks.Link>
              ),
              googleAdmin: (
                <FormattedMessage
                  id="app.admin.settings.subPage.gmailApiIntegration.googleAdmin"
                  defaultMessage="Google Admin"
                  description="Google Admin: the Google portal at https://admin.google.com"
                />
              ),
            }}
          />
        </Body>
        <Blocks.Row>
          <Blocks.FullWidthLabelBox>
            <Input.Label>
              <FormattedMessage
                id="app.admin.settings.subPage.gmailApiIntegration.clientIdLabel"
                defaultMessage="Client Id"
                description="Client Id (a string of characters) identifying a Gmail API client"
              />
            </Input.Label>
            <div>
              <Input
                fullWidth
                disabled
                value={gmailIntegration.clientId}
                name="gmailApiClientId"
                type="text"
              />
              <CopyIconButton stringToCopy={gmailIntegration.clientId} />
            </div>
          </Blocks.FullWidthLabelBox>
        </Blocks.Row>
        <Blocks.Row>
          <Blocks.FullWidthLabelBox>
            <Input.Label>
              <FormattedMessage
                id="app.admin.settings.subPage.gmailApiIntegration.scopesLabel"
                defaultMessage="Required scopes"
                description="List of required scopes added to a Gmail API client"
              />
            </Input.Label>
            <div>
              <Input
                fullWidth
                disabled
                value={gmailIntegration.requiredScopes.join(',')}
                name="gmailClientRequiredScopes"
                type="text"
              />
              <CopyIconButton
                stringToCopy={gmailIntegration.requiredScopes.join(',')}
              />
            </div>
          </Blocks.FullWidthLabelBox>
        </Blocks.Row>
      </Blocks.Column>
    </Blocks.Card>
  );
};
