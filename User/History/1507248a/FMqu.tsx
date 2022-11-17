import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

import { DualMetric } from '@hox/ui/AnalyticsCard';
import { SkeletonLoader } from '@hox/ui/SkeletonLoader';
import { Heading2 } from '@hox/ui/Text';

import { CardGroup } from './components/CardGroup';
import { SingleMetricCard } from './components/SingleMetricCard';
// import { TimeseriesGraphCard } from './components/TimeseriesGraphCard';
import { useAnalyticsQuery } from './hooks/useAnalyticsQuery';
import { mapTimeframeToGqlVariables } from './lib';
import {
  TAnalyticsCard,
  TAnalyticsComponent,
  TAnalyticsTimeframe,
} from './types';

const TimeseriesGraphCard: TAnalyticsComponent = ({
  series,
  label,
  delta,
  latestValue,
  latestComparison,
}) => (
  <DualMetric
    series={series}
    // vertical
    latestValue={{ primary: latestValue, secondary: 0.5 }}
    title={label}
    delta={{ value: delta, text: 'in the last 7 days', sentiment: 'positive' }}
    secondaryValueLabel={'Your industry'}
  />
);

const CARD_GROUPS: Array<{ title: ReactNode; cards: TAnalyticsCard[] }> = [
  {
    title: 'Engagement',
    cards: [
      {
        label: 'Onboarding rate',
        metric: 'onboardingRate',
        AnalyticsComponent: SingleMetricCard,
      },
      {
        label: 'Activity rate',
        metric: 'activityRate',
        AnalyticsComponent: SingleMetricCard,
      },
    ],
  },
  {
    title: 'Training overview',
    cards: [
      {
        label: 'Success rate',
        metric: 'successRate',
        AnalyticsComponent: TimeseriesGraphCard,
      },
      // {
      //   label: 'Fail rate',
      //   metric: 'failRate',
      //   AnalyticsComponent: TimeseriesGraphCard,
      // },
      // {
      //   label: 'Miss rate',
      //   metric: 'missRate',
      //   AnalyticsComponent: TimeseriesGraphCard,
      // },
    ],
  },
];

const StyledAnalyticsSection = styled.section`
  > :not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

const StyledLoader = styled(SkeletonLoader)`
  > div {
    margin-bottom: 1.5rem;
  }
  *::after {
    height: 10rem;
  }
`;

export interface IAnalyticsSectionProps {
  timeframe: TAnalyticsTimeframe;
}

export const AnalyticsSection: FC<IAnalyticsSectionProps> = ({
  timeframe,
  ...restProps
}) => {
  const gqlTimeframe = mapTimeframeToGqlVariables(timeframe);
  const { analytics, loading } = useAnalyticsQuery(gqlTimeframe);

  if (loading) {
    return <StyledLoader rows={2} />;
  }

  return (
    <StyledAnalyticsSection {...restProps}>
      {analytics ? (
        CARD_GROUPS.map(({ title, cards }, groupIndex) => (
          <CardGroup key={groupIndex} title={title}>
            {cards.map(({ label, metric, AnalyticsComponent }, cardIndex) => (
              <AnalyticsComponent
                key={cardIndex}
                label={label}
                {...analytics[metric]}
              />
            ))}
          </CardGroup>
        ))
      ) : (
        <Heading2>No analytics were found :(</Heading2>
      )}
    </StyledAnalyticsSection>
  );
};
