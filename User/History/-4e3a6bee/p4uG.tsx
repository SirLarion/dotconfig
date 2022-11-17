import React from 'react';
import styled from 'styled-components';
import {
  ComputedDatum,
  CustomLayerProps,
  LineSvgProps,
  Serie,
} from '@nivo/line';
import * as R from 'ramda';

import { LoadingIndicator } from '../../LoadingIndicator';
import { palette } from '../../styles/theme';
import { LineGraph } from '../index';

const GRAPH_MAX_COEFFICIENT = 1.5;
const BLUR_INTENSITY = 2.5;
const BLUR_OFFSET = 2;

export interface IMiniGraphProps {
  data: Serie[];
  color?: string;
  loading?: boolean;
  graphSettingOverrides?: Partial<LineSvgProps>;
}

const StyledMiniGraph = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 3rem;
  border: 1px solid ${palette(p => p.foreground.primary.ghosted)};
`;

const getGraphMaxScore = (data: Serie[]) =>
  R.pipe<Serie[], number[][], number[], number>(
    R.map(s => s.data.map(d => d?.y || 0) as number[]),
    R.reduce(R.concat as (x0: number[], x1: number[]) => number[], []),
    R.reduce(R.max, 0) as (x: number[]) => number
  )(data);

const BlurredLine: React.FC<CustomLayerProps> = ({
  series,
  lineGenerator,
  xScale,
  yScale,
}) => {
  return (
    <>
      {series.map(({ id, data, color }) => (
        <g key={id}>
          <defs>
            <filter id="epicBlur" x="0" y="0">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation={BLUR_INTENSITY}
              />
            </filter>
          </defs>
          <path
            d={
              lineGenerator([
                data.map((d: ComputedDatum) => ({
                  // nivo typing issue, not worth fixing
                  // @ts-ignore
                  x: xScale(d.data.x || 0),
                  // @ts-ignore
                  y: yScale(d.data.y || 0) + BLUR_OFFSET,
                })),
              ]) || undefined
            }
            fill="none"
            stroke={color as string}
            filter="url(#epicBlur)"
          />
        </g>
      ))}
    </>
  );
};

export const MiniGraph: React.FC<IMiniGraphProps> = ({
  data,
  color,
  loading,
  graphSettingOverrides = {},
  ...restProps
}) => {
  const graphMax = getGraphMaxScore(data) * GRAPH_MAX_COEFFICIENT;

  return (
    <StyledMiniGraph {...restProps}>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <LineGraph
          series={data}
          options={
            R.mergeDeepRight(
              {
                layers: ['lines', BlurredLine],
                margin: { top: 0, bottom: 0, left: 0, right: 0 },
                ...(color && { colors: [color] }),
                yScale: {
                  type: 'linear',
                  min: 0,
                  max: graphMax,
                },
              },
              graphSettingOverrides
            ) as Omit<LineSvgProps, 'data'>
          }
        />
      )}
    </StyledMiniGraph>
  );
};
