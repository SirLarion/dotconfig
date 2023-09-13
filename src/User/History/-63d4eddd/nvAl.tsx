import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { Serie } from '@nivo/line';

import { LineGraph } from '@hox/ui/LineGraph';
import { Body } from '@hox/ui/Text';
import { Card } from '@hox/ui/Card';

export type TGraphColor = 'red' | 'green' | 'blue' | 'gray';

export interface IAnalyticsGraphCardProps {
  title: ReactNode;
  graphColor: TGraphColor;
  timeseries: Serie[];
}

const StyledAnalyticsGraphCard = styled(Card)`
  width: 12rem;
  height: 6rem;
`;

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
