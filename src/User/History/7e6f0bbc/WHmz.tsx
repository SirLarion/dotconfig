import React from 'react';
import styled from 'styled-components';

import { IntervalTrend } from '@hox/ui/AnalyticsCard';

import { TAnalyticsComponent } from '../../types';

export interface ISingleMetricCardProps {}

const StyledSingleMetricCard = styled.div``;

export const SingleMetricCard: TAnalyticsComponent = ({ ...restProps }) => {
  return (
    <StyledSingleMetricCard {...restProps}>
      <IntervalTrend />
    </StyledSingleMetricCard>
  );
};
