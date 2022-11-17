import React from 'react';

import { FormattedMessage } from '@hox/frontend-utils/src/MockFormattedMessage';

import { TAnalyticsTimeframe } from './types';

export const getDeltaLabelText = (timeframe: TAnalyticsTimeframe) => (
  <FormattedMessage
    id="app.admin.dashboard.analytics.deltaLabel"
    defaultMessage="in the last {timeframe}"
    description="Label for an indicator that displays change in data within the time indicated by 'timeframe'"
  />
);

export const ANALYTICS_INTL = {
  yourIndustry: (
    <FormattedMessage
      id="app.admin.dashboard.analytics.yourIndustry"
      defaultMessage="Your industry"
      description="Label for a legend in analytics visualization that refers to the industry of the user's organization"
    />
  ),
};
