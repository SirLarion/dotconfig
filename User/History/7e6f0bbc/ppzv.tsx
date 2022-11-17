import React from 'react';
import styled from 'styled-components';

import { Card } from '@hox/ui/Card';
import { palette } from '@hox/ui/styles/theme';
import { ButtonText, Heading2 } from '@hox/ui/Text';

import { TAnalyticsComponent } from '../../types';

// TODO: Use the generic UI component after its refactoring is done
// import { IntervalTrend } from '@hox/ui/AnalyticsCard';

const StyledSingleMetricCard = styled(Card)`
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${palette(p => p.outline.secondary.dimmed)};
`;

const MetricWrapper = styled.div`
  margin-top: 0.75rem;
`;

export const SingleMetricCard: TAnalyticsComponent = ({
  label,
  latestValue,
  ...restProps
}) => {
  return (
    <StyledSingleMetricCard {...restProps}>
      <ButtonText>{label}</ButtonText>
      <MetricWrapper>
        <Heading2>{latestValue}</Heading2>
      </MetricWrapper>
    </StyledSingleMetricCard>
  );
};
