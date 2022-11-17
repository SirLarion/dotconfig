import React from 'react';
import styled from 'styled-components';

import { IntervalTrend } from '@hox/ui/AnalyticsCard';

import { TAnalyticsComponent } from '../../types';
import { useQuery } from '@apollo/client';

const StyledSingleMetricCard = styled.div``;

export const SingleMetricCard: TAnalyticsComponent = ({
  label,
  gqlDocument,
  ...restProps
}) => {
  const { data } = useQuery(gqlDocument);
  return (
    <StyledSingleMetricCard {...restProps}>
      <IntervalTrend />
    </StyledSingleMetricCard>
  );
};
