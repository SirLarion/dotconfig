import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { Serie } from '@nivo/line';

import { LineGraph } from '@hox/ui/LineGraph';

export type TGraphColor = 'red' | 'green' | 'blue' | 'gray';

export interface IAnalyticsGraphCardProps {
  title: ReactNode;
  graphColor: TGraphColor;
  timeseries: Serie[];
}

const StyledAnalyticsGraphCard = styled.div``;

export const AnalyticsGraphCard: FC<IAnalyticsGraphCardProps> = ({
  title,
  timeseries,
  ...restProps
}) => {
  return (
    <StyledAnalyticsGraphCard {...restProps}>
      {title}
      <LineGraph data={timeseries} />
    </StyledAnalyticsGraphCard>
  );
};
