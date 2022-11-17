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
        layout: 'horizontal',
      },
      {
        title: 'Activity rate',
        metric: 'activityRate',
        layout: 'horizontal',
      },
    ],
  },
  {
    heading: 'Training overview',
    cards: [
      {
        title: 'Success rate',
        metric: 'successRate',
        layout: 'vertical',
      },
      {
        title: 'Fail rate',
        metric: 'failRate',
        layout: 'vertical',
      },
      {
        title: 'Miss rate',
        metric: 'missRate',
        layout: 'vertical',
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
            {cards.map(({ title, metric, layout }, cardIndex) => (
              <DualMetric
                key={metric}
                title={title}
                secondaryValueLabel={ANALYTICS_INTL.yourIndustry}
                vertical={layout === 'vertical'}
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
