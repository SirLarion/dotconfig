import React, { FC, useMemo } from 'react';
import { useTheme } from 'styled-components';
import { Layer, LineSvgProps, ResponsiveLine } from '@nivo/line';
import { difference, mergeWith, pipe } from 'ramda';

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
  plain?: boolean;
  overrides?: Partial<LineSvgProps>;
}

export const LineGraph: FC<ILineGraphProps> = ({
  series,
  showTooltip = true,
  plain = false,
  overrides = {},
}) => {
  const theme = useTheme() as TTheme;

  const { lineStyleBySerieId, overrides: seriesOverrides } = useMemo(
    () => getSerieSpecificOverrides(series, theme),
    [series, theme]
  );

  const allLayers = useMemo(
    () =>
      [
        'grid',
        'markers',
        'areas',
        getLineStylingLayer(lineStyleBySerieId),
        'slices',
        'mesh',
        'axes',
        'points',
        'legends',
      ] as Layer[],
    [lineStyleBySerieId]
  );

  const DEFAULT_GRAPH_SETTINGS: Omit<LineSvgProps, 'data'> = useMemo(
    () => ({
      // Graph
      margin: plain
        ? { top: 2, bottom: 2, left: 2, right: 2 }
        : { top: 40, bottom: 45, left: 50, right: 2 },
      // Line
      lineWidth: 2,
      curve: 'natural',

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
      layers: plain
        ? difference(allLayers, ['grid', 'axes', 'legends'])
        : allLayers,

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
    [theme, plain, allLayers]
  );

  const props = pipe(
    mergeWith(rightOrLeft, overrides),
    mergeWith(rightOrLeft, DEFAULT_GRAPH_SETTINGS)
  )(seriesOverrides) as Omit<LineSvgProps, 'data'>;

  console.log(props);

  return (
    <ResponsiveLine data={series} {...props} isInteractive={showTooltip} />
  );
};

export const MiniGraph = MiniGraphComponent;
