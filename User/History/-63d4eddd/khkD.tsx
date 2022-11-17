import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { Serie } from '@nivo/line';

import { LineGraph } from '@hox/ui/LineGraph';
import { Body } from '@hox/ui/Text';

export type TGraphColor = 'red' | 'green' | 'blue' | 'gray';

export interface IAnalyticsGraphCardProps {
  title: ReactNode;
  graphColor: TGraphColor;
  timeseries: Serie[];
}

const StyledAnalyticsGraphCard = styled.div``;

export const AnalyticsGraphCard: FC<IAnalyticsGraphCardProps> = ({
  title,
  graphColor,
  timeseries,
  ...restProps
}) => {
  return (
    <StyledAnalyticsGraphCard {...restProps}>
      <Body>{title}</Body>
      <LineGraph
        data={timeseries}
        graphSettingOverrides={{ colors: [graphColor] }}
      />
    </StyledAnalyticsGraphCard>
  );
};
