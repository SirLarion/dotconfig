import React from 'react';
import styled from 'styled-components';

import { Card } from '@hox/ui/Card';
import { Heading2 } from '@hox/ui/Text';

import { useAnalyticsQuery } from '../../hooks/useAnalyticsQuery';
import { extractLatestDayData } from '../../lib';
import { TAnalyticsComponent } from '../../types';
// import { IntervalTrend } from '@hox/ui/AnalyticsCard';

const StyledSingleMetricCard = styled(Card)``;

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
