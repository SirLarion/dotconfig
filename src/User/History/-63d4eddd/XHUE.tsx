import React, { FC, ReactNode } from 'react';
import styled, { useTheme } from 'styled-components';
import { Datum, Serie } from '@nivo/line';

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
  latestData: Datum;
}

const StyledAnalyticsGraphCard = styled(Card)`
  padding: 1rem;
  width: 20rem;
  height: 12rem;
`;

export const AnalyticsGraphCard: FC<IAnalyticsGraphCardProps> = ({
  title,
  graphColor,
  timeseries,
  latestData,
  ...restProps
}) => {
  const theme = useTheme() as TTheme;

  return (
    <StyledAnalyticsGraphCard {...restProps}>
      <Body>{title}</Body>
      <Heading3>{latestData.y}</Heading3>
      <LineGraph
        data={timeseries}
        graphSettingOverrides={{
          colors: [colorLiteralToPalette(graphColor, theme)],
          enableGridY: false,
          axisLeft: null,
          legends: [],
          margin: { top: 0, right: 0, bottom: 0, left: 0 },
        }}
      />
    </StyledAnalyticsGraphCard>
  );
};
