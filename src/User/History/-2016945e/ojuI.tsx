import React, { FC } from 'react';

import { PageNotFoundView } from '../../../../PageNotFoundView';
import { Blocks } from '../../../components/Blocks';
import { TSettingRouteProps } from '../../../types';

import { CustomEmailBodyIdentifier } from './components/CustomEmailBodyIdentifier';
import { CustomEmailHeaders } from './components/CustomEmailHeaders';
import { DKIMSettingsForm } from './components/DKIM';
import { GmailApiIntegrationForm } from './components/GmailApiIntegration';
import { SendingIPAddressesForm } from './components/SendingIpAddresses';
import { useGetCurrentUserOrgEmailDeliverySettingsQuery } from './graphql/__generated__/GetCurrentUserOrgEmailDeliverySettings.generated';

export * from './intl';

export const EmailDeliverySettingsPage: FC<TSettingRouteProps> = () => {
  const { data } = useGetCurrentUserOrgEmailDeliverySettingsQuery();

  const organization = data?.currentUser?.organization;

  if (!organization) {
    return <PageNotFoundView />;
  }

  const emailEnvironment = organization.emailEnvironment;
  const publicSettings = data?.app?.publicSettings;

  const showGmailIntegrationSettings =
    publicSettings && emailEnvironment === 'google';

  return (
    <Blocks.CardGroup>
      <DKIMSettingsForm organization={organization} />
      <SendingIPAddressesForm />
      {showGmailIntegrationSettings && (
        <GmailApiIntegrationForm
          organization={organization}
          gmailIntegration={publicSettings.gmailApi}
        />
      )}
      <CustomEmailBodyIdentifier />
      <CustomEmailHeaders />
    </Blocks.CardGroup>
  );
};
