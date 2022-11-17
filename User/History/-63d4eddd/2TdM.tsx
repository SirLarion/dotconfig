import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { Serie } from '@nivo/line';

import { LineGraph } from '@hox/ui/LineGraph';

export interface IAnalyticsGraphCardProps {
  title: ReactNode;
  timeseries: Serie[];
}

const StyledAnalyticsGraphCard = styled.div``;

export const AnalyticsGraphCard: FC<IAnalyticsGraphCardProps> = ({
  timeseries,
  ...restProps
}) => {
  return (
    <StyledAnalyticsGraphCard {...restProps}>
      <LineGraph data={timeseries} />
    </StyledAnalyticsGraphCard>
  );
};
