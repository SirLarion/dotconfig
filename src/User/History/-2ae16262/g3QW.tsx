import React from 'react';
import { FormattedMessage } from 'react-intl';

import { KnowledgeBaseLink } from '../../../../../../../components/KnowledgeBaseLink';
import { KnowledgeBaseLinkIntl } from '../../../../../../../intl/generic';
import { KB_DASHBOARDS_PATH } from '../../../../../../../layouts/paths';

export const INTL = {
  title: (
    <FormattedMessage
      id="app.admin.settings.emailDelivery.customEmailHeaders.title"
      defaultMessage="Custom email header"
      description="Title for a setting that let's the user add custom email headers"
    />
  ),
  description: (
    <FormattedMessage
      id="app.admin.settings.emailDelivery.customEmailHeaders.description"
      defaultMessage="Add a custom email header to all Hoxhunt training emails for example when you cannot use IP allowlisting and need to create mail flow rules based on another attribute. Read more in our {knowledgeBaseLink}."
      description="Description for a setting that let's the user add custom email headers"
      values={{
        knowledgeBaseLink: (
          <KnowledgeBaseLink
            kbUrl={KB_DASHBOARDS_PATH}
            linkId="admin-settings-email-delivery-custom-email-headers"
          >
            <KnowledgeBaseLinkIntl />
          </KnowledgeBaseLink>
        ),
      }}
    />
  ),
};
