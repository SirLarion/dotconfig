import React, { FC, ReactNode } from 'react';
import styled, { useTheme } from 'styled-components';
import { Serie } from '@nivo/line';

import { Card } from '@hox/ui/Card';
import { LineGraph } from '@hox/ui/LineGraph';
import { TTheme } from '@hox/ui/styles/theme';
import { Body } from '@hox/ui/Text';

import { colorLiteralToPalette } from './lib';

export type TGraphColor = 'red' | 'green' | 'blue' | 'gray';

export interface IAnalyticsGraphCardProps {
  title: ReactNode;
  graphColor: TGraphColor;
  timeseries: Serie[];
}

const StyledAnalyticsGraphCard = styled(Card)`
  padding: 1rem;
  width: 20rem;
  height: 20rem;
`;

export const AnalyticsGraphCard: FC<IAnalyticsGraphCardProps> = ({
  title,
  graphColor,
  timeseries,
  ...restProps
}) => {
  const theme = useTheme() as TTheme;

  return (
    <StyledAnalyticsGraphCard {...restProps}>
      <Body>{title}</Body>
      <LineGraph
        data={timeseries}
        graphSettingOverrides={{
          colors: [colorLiteralToPalette(graphColor, theme)],
          enableGridY: false,
          axisLeft: null,
          legends: [],
          margin: null,
        }}
      />
    </StyledAnalyticsGraphCard>
  );
};
