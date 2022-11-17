import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

import { DualMetric } from '@hox/ui/AnalyticsCard';
import { SkeletonLoader } from '@hox/ui/SkeletonLoader';
import { Heading2 } from '@hox/ui/Text';

import { CardGroup } from './components/CardGroup';
import { useAnalyticsQuery } from './hooks/useAnalyticsQuery';
import { mapTimeframeToGqlVariables } from './lib';
import { TAnalyticsCard, TAnalyticsTimeframe } from './types';

const CARD_GROUPS: Array<{ title: ReactNode; cards: TAnalyticsCard[] }> = [
  {
    title: 'Engagement',
    cards: [
      {
        title: 'Onboarding rate',
        metric: 'onboardingRate',
      },
      {
        title: 'Activity rate',
        metric: 'activityRate',
      },
    ],
  },
  {
    title: 'Training overview',
    cards: [
      {
        title: 'Success rate',
        metric: 'successRate',
      },
      {
        title: 'Fail rate',
        metric: 'failRate',
      },
      {
        title: 'Miss rate',
        metric: 'missRate',
      },
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
            {cards.map(({ label, metric }, cardIndex) => (
              <DualMetric
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
