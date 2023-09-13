import React, { FC, useMemo } from 'react';
import { useTheme } from 'styled-components';
import { LineSvgProps, ResponsiveLine } from '@nivo/line';
import { mergeDeepWith, pipe } from 'ramda';

import { palette, TTheme } from '../styles/theme';

import {
  getLineStylingLayer,
  getSerieSpecificOverrides,
  rightOrLeft,
} from './lib';
import { MiniGraph as MiniGraphComponent } from './MiniGraph';
import { TSerieProps } from './types';

export interface ILineGraphProps {
  series: TSerieProps[];
  showTooltip?: boolean;
  overrides?: Partial<LineSvgProps>;
}

export const LineGraph: FC<ILineGraphProps> = ({
  series,
  showTooltip = true,
  overrides = {},
}) => {
  const theme = useTheme() as TTheme;

  const { lineStyleBySerieId, overrides: seriesOverrides } =
    getSerieSpecificOverrides(series);

  const DEFAULT_GRAPH_SETTINGS: Omit<LineSvgProps, 'data'> = useMemo(
    () => ({
      // Graph
      margin: { top: 40, bottom: 45, left: 50 },
      // Line
      lineWidth: 2,
      curve: 'natural',
      colors: [
        palette(p => p.accent.bubbleGum, theme),
        palette(p => p.accent.danger, theme),
        palette(p => p.accent.positive, theme),
        palette(p => p.accent.golden, theme),
        palette(p => p.accent.info, theme),
      ],
      // Line area,
      enableArea: true,
      // Y-axis
      axisLeft: {
        tickSize: 1,
        tickPadding: 5,
        tickRotation: 0,
        tickValues: 5,
        legendOffset: -40,
        legendPosition: 'middle',
      },
      yScale: {
        type: 'linear',
        max: 1,
        reverse: false,
        min: 0,
      },
      gridYValues: 5,
      // X-axis
      xScale: { type: 'time', format: '%Y-%m-%d' },
      xFormat: 'time:%Y-%m-%d',
      axisBottom: {
        format: '%b',
        tickValues: 'every 2 months',
        legendOffset: 35,
        legendPosition: 'middle',
      },
      // Crosshair
      crosshairType: 'x',
      // Grid
      enableGridX: false,
      // Points
      enablePoints: false,
      pointBorderWidth: 2,
      pointBorderColor: { from: 'serieColor' },
      pointLabelYOffset: -12,
      pointSize: 2,
      pointColor: { theme: 'background' },
      // Layers
      layers: [
        'grid',
        'markers',
        'areas',
        getLineStylingLayer(lineStyleBySerieId),
        'slices',
        'mesh',
        'axes',
        'points',
        'legends',
      ],
      defs: [
        {
          id: 'none',
          type: 'linearGradient',
          colors: [{ color: 'inherit', opacity: 0 }],
        },
        {
          id: 'gradient',
          type: 'linearGradient',
          colors: [
            { offset: 0, color: 'inherit' },
            { offset: 100, color: 'inherit', opacity: 0 },
          ],
        },
      ],
      // Tooltip
      // Mesh
      useMesh: true,
      // Legends
      legends: [
        {
          anchor: 'top-right',
          direction: 'row',
          justify: false,
          translateX: 37,
          translateY: -42,
          itemWidth: 100,
          itemHeight: 20,
          itemsSpacing: 4,
          symbolSize: 9,
          symbolShape: 'circle',
          itemDirection: 'left-to-right',
          itemTextColor: palette(p => p.foreground.primary, theme),
          effects: [],
        },
      ],
      // Theme
      theme: {
        textColor: palette(p => p.foreground.primary, theme),
        axis: {
          ticks: {
            line: {
              strokeWidth: 0,
            },
          },
        },
        tooltip: {
          container: {
            background: palette(p => p.background.primary, theme),
          },
        },
      },
    }),
    [theme, lineStyleBySerieId]
  );

  const props = pipe(
    mergeDeepWith(rightOrLeft, overrides),
    mergeDeepWith(rightOrLeft, DEFAULT_GRAPH_SETTINGS)
  )(seriesOverrides) as Omit<LineSvgProps, 'data'>;

  return (
    <ResponsiveLine data={series} {...props} isInteractive={showTooltip} />
  );
};

export const MiniGraph = MiniGraphComponent;
