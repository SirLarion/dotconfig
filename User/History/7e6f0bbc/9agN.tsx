import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';

import { IntervalTrend } from '@hox/ui/AnalyticsCard';

import {
  TAnalyticsComponent,
  TAnalyticsQueryResult,
  TAnalyticsQueryVariables,
} from '../../types';

const StyledSingleMetricCard = styled.div``;

export const SingleMetricCard: TAnalyticsComponent = ({
  label,
  gqlDocument,
  ...restProps
}) => {
  const { data } = useQuery<TAnalyticsQueryResult, TAnalyticsQueryVariables>(
    gqlDocument,
    { variables }
  );

  return (
    <StyledSingleMetricCard {...restProps}>
      <IntervalTrend />
    </StyledSingleMetricCard>
  );
};
