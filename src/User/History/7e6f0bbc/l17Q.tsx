import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';

import { Heading2 } from '@hox/ui/Text';

import { extractLatestDayData } from '../../lib';
// import { IntervalTrend } from '@hox/ui/AnalyticsCard';
import {
  IAnalyticsQueryVariables,
  TAnalyticsComponent,
  TAnalyticsQueryResult,
} from '../../types';

const StyledSingleMetricCard = styled.div``;

export const SingleMetricCard: TAnalyticsComponent = ({
  label,
  queryDocument,
  queryVariables,
  ...restProps
}) => {
  const { data } = useQuery<TAnalyticsQueryResult, IAnalyticsQueryVariables>(
    queryDocument,
    { variables: queryVariables }
  );

  return (
    <StyledSingleMetricCard {...restProps}>
      <Heading2>{extractLatestDayData(data)}</Heading2>
    </StyledSingleMetricCard>
  );
};
