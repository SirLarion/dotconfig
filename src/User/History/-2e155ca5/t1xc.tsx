import React from 'react';

import { FormattedMessage } from '@hox/frontend-utils/MockFormattedMessage';

import { TAnalyticsTimeframe } from './types';

export const getDeltaLabelText = (timeframe: TAnalyticsTimeframe) => (
  <FormattedMessage
    id="app.admin.dashboard.analytics.deltaLabel"
    defaultMessage="in the last {timeframe}"
    description="Label for an indicator that displays change in data within the time indicated by 'timeframe'"
    values={{ timeframe }}
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
  heading: {
    engagement: (
      <FormattedMessage
        id="app.admin.dashboard.analytics.engagement"
        defaultMessage="Engagement"
        description="Heading for a group of cards that display metrics relating to users' engagement"
      />
    ),
    training: (
      <FormattedMessage
        id="app.admin.dashboard.analytics.training"
        defaultMessage="Training overview"
        description="Heading for a group of cards that display metrics relating to users' training"
      />
    ),
  },
  card: {
    activityRate: (
      <FormattedMessage
        id="app.admin.dashboard.analytics.card.activityRate"
        defaultMessage="Activity rate"
        description="Title for a card that displays the rate of activity of users in an organization"
      />
    ),
    onboardingRate: (
      <FormattedMessage
        id="app.admin.dashboard.analytics.card.onboardingRate"
        defaultMessage="Onboarding rate"
        description="Title for a card that displays metrics relating to users' training"
      />
    ),
    successRate: (
      <FormattedMessage
        id="app.admin.dashboard.analytics.card.successRate"
        defaultMessage="Success rate"
        description="Title for a card that displays metrics relating to users' training"
      />
    ),
    failRate: (
      <FormattedMessage
        id="app.admin.dashboard.analytics.card.failRate"
        defaultMessage="Fail rate"
        description="Title for a card that displays metrics relating to users' training"
      />
    ),
    missRate: (
      <FormattedMessage
        id="app.admin.dashboard.analytics.card.missRate"
        defaultMessage="Miss rate"
        description="Title for a card that displays metrics relating to users' training"
      />
    ),
  },
};
