import React from 'react';
import styled from 'styled-components';

import { Heading2 } from '@hox/ui/Text';

import { useAnalyticsQuery } from '../../hooks/useAnalyticsQuery';
import { extractLatestDayData } from '../../lib';
// import { IntervalTrend } from '@hox/ui/AnalyticsCard';

const StyledSingleMetricCard = styled.div``;

export const SingleMetricCard: TAnalyticsComponent = ({
  label,
  queryDocument,
  queryVariables,
  ...restProps
}) => {
  const { data } = useAnalyticsQuery(queryDocument, queryVariables);

  return (
    <StyledSingleMetricCard {...restProps}>
      <Heading2>{extractLatestDayData(data)}</Heading2>
    </StyledSingleMetricCard>
  );
};
