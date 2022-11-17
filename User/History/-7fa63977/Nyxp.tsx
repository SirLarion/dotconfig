import React, { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

import { DeactivationReason } from '../../../../../types/graphql.generated';

export const QUEST_TEMPLATE_ACTIVITY_LOG_INTL = {
  activated: (
    <FormattedMessage
      id="app.admin.questTemplate.activityLog.entry.title.activated"
      defaultMessage="Simulation was activated"
      description="Text for quest template Activity log entry, when quest template has been activated"
    />
  ),
  deactivated: (
    <FormattedMessage
      id="app.admin.questTemplate.activityLog.entry.title.deactivated"
      defaultMessage="Simulation was deactivated"
      description="Text for quest template Activity log entry, when quest template has been deactivated"
    />
  ),
  showMore: (
    <FormattedMessage
      id="app.admin.questTemplate.activityLog.button.showMore"
      defaultMessage="Show more"
      description="Button text for displaying all entries in quest template Activity log"
    />
  ),
  showLess: (
    <FormattedMessage
      id="app.admin.questTemplate.activityLog.button.showLess"
      defaultMessage="Show less"
      description="Button text for hiding all entries except the latest entry in quest template Activity log"
    />
  ),
};

const {
  OTHER,
  COMPANY_POLICY,
  OUTDATED_COMPANY_INFORMATION,
  SENSITIVE_INFORMATION,
} = DeactivationReason;

export const QUEST_TEMPLATE_DEACTIVATION_REASON_INTL: {
  [key in DeactivationReason]: ReactNode;
} = {
  [COMPANY_POLICY]: (
    <FormattedMessage
      id="app.admin.questTemplate.activityLog.entry.deactivationReason.companyPolicy"
      defaultMessage="Doesn’t match with our company policy"
      description="Message in activity log entry when quest template has been deactivated due to company policy"
    />
  ),
  [OUTDATED_COMPANY_INFORMATION]: (
    <FormattedMessage
      id="app.admin.questTemplate.activityLog.entry.deactivationReason.outdatedCompanyInformation"
      defaultMessage="Outdated company information"
      description="Message in activity log entry when quest template has been deactivated due to outdated company information"
    />
  ),
  [SENSITIVE_INFORMATION]: (
    <FormattedMessage
      id="app.admin.questTemplate.activityLog.entry.deactivationReason.sensitiveInformation"
      defaultMessage="Too sensitive information"
      description="Message in activity log entry when quest template has been deactivated due to template containing sensitive information"
    />
  ),
  [OTHER]: (
    <FormattedMessage
      id="app.admin.questTemplate.deactivationFlow.addReason"
      defaultMessage="Add different reason"
      description="A call to action for the user to specify a custom (not predefined) reason for deactivating the selected quest template."
    />
  ),
};
