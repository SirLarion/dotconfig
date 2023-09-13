import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';

import { IntervalTrend } from '@hox/ui/AnalyticsCard';

import { TAnalyticsComponent } from '../../types';

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
