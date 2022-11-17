import React, { useMemo, FC, CSSProperties } from 'react';
import { useTheme } from 'styled-components';
import { CustomLayer, LineSvgProps, ResponsiveLine, Serie } from '@nivo/line';
import { mergeDeepRight } from 'ramda';

import { palette, TTheme } from '../styles/theme';

import { MiniGraph as MiniGraphComponent } from './MiniGraph';
import { getSerieSpecificOverrides } from './lib';

export type TSerieProps = Serie & {
  style?: 'solid' | 'dashed';
  fill?: 'none' | 'translucent' | 'gradient';
};

export interface ILineGraphProps {
  series: TSerieProps[];
  overrides?: Partial<LineSvgProps>;
}

const CustomStylingResponsiveLine: FC<LineSvgProps> = {};

const getLineStylingLayer =
  (styleBySerieId: Record<string, CSSProperties>): CustomLayer =>
  ({ series, lineGenerator, xScale, yScale }) => {
    return series.map(({ id, data, color, style }) => (
      <path
        key={id}
        d={lineGenerator([
          data.map(d => ({
            x: xScale(d.data.x),
            y: yScale(d.data.y),
          })),
        ])}
        fill="none"
        stroke={color}
        style={styleBySerieId[id]}
      />
    ));
  };

export const LineGraph: React.FC<ILineGraphProps> = ({
  series,
  overrides = {},
}) => {
  const theme = useTheme() as TTheme;
  const seriesOverrides = getSerieSpecificOverrides(series);
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
      areaOpacity: 0.1,
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
    [theme]
  );

  const props = mergeDeepRight(DEFAULT_GRAPH_SETTINGS, overrides) as Omit<
    LineSvgProps,
    'data'
  >;
  return <ResponsiveLine data={series} {...props} />;
};

export const MiniGraph = MiniGraphComponent;
