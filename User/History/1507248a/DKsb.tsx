import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

import { DualMetric } from '@hox/ui/AnalyticsCard';
import { SkeletonLoader } from '@hox/ui/SkeletonLoader';
import { Heading2 } from '@hox/ui/Text';

import { CardGroup } from './components/CardGroup';
import { useAnalyticsQuery } from './hooks/useAnalyticsQuery';
import { ANALYTICS_INTL as INTL } from './intl';
import { TAnalyticsCard, TAnalyticsTimeframe } from './types';

const CARD_GROUPS: Array<{ heading: ReactNode; cards: TAnalyticsCard[] }> = [
  {
    heading: INTL.heading.engagement,
    cards: [
      {
        title: INTL.card.onboardingRate,
        metric: 'onboardingRate',
      },
      {
        title: INTL.card.activityRate,
        metric: 'activityRate',
      },
    ],
  },
  {
    heading: INTL.heading.training,
    cards: [
      {
        title: INTL.card.successRate,
        metric: 'successRate',
        vertical: true,
      },
      {
        title: INTL.card.failRate,
        metric: 'failRate',
        vertical: true,
      },
      {
        title: INTL.card.missRate,
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
                secondaryValueLabel={INTL.yourIndustry}
                vertical={vertical}
                {...analytics[metric]}
              />
            ))}
            {groupIndex === 0 && (
              <DualMetric
                key="eoihroi"
                title="Average reporting time"
                latestValue={{ primary: 9300, secondary: 7100 }}
                valueOptions={{ displayFormat: value => `${value}` }}
                secondaryValueLabel={INTL.yourIndustry}
                delta={{
                  value: 5,
                  sentiment: 'negative',
                  text: 'in the last month',
                }}
              />
            )}
          </CardGroup>
        ))
      ) : (
        <Heading2>No analytics were found :(</Heading2>
      )}
    </StyledAnalyticsSection>
  );
};
