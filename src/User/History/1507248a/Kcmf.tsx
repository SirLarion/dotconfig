import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

import { DualMetric } from '@hox/ui/AnalyticsCard';
import { SkeletonLoader } from '@hox/ui/SkeletonLoader';
import { Heading2 } from '@hox/ui/Text';

import { CardGroup } from './components/CardGroup';
import { useAnalyticsQuery } from './hooks/useAnalyticsQuery';
import { ANALYTICS_INTL } from './intl';
import { TAnalyticsCard, TAnalyticsTimeframe } from './types';

const CARD_GROUPS: Array<{ heading: ReactNode; cards: TAnalyticsCard[] }> = [
  {
    heading: 'Engagement',
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
    heading: 'Training overview',
    cards: [
      {
        title: 'Success rate',
        metric: 'successRate',
        vertical: true,
      },
      {
        title: 'Fail rate',
        metric: 'failRate',
        vertical: true,
      },
      {
        title: 'Miss rate',
        metric: 'missRate',
        vertical: true,
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
  const { analytics, loading } = useAnalyticsQuery(timeframe);

  if (loading) {
    return <StyledLoader rows={2} />;
  }

  return (
    <StyledAnalyticsSection {...restProps}>
      {analytics ? (
        CARD_GROUPS.map(({ heading, cards }, groupIndex) => (
          <CardGroup key={groupIndex} heading={heading}>
            {cards.map(({ title, metric, vertical }) => (
              <DualMetric
                key={metric}
                title={title}
                secondaryValueLabel={ANALYTICS_INTL.yourIndustry}
                vertical={vertical}
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
