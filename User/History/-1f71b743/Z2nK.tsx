import React, { CSSProperties } from 'react';
import { DatumValue, Defs } from '@nivo/core';
import {
  ComputedDatum,
  ComputedSerie,
  CustomLayerProps,
  LineProps,
  LineSvgProps,
} from '@nivo/line';
import { area, curveNatural } from 'd3-shape';
import { v4 as uuidv4 } from 'uuid';

import { palette, TTheme } from '../styles/theme';

import { TLineFill, TSerieIdStyle, TSerieProps } from './types';

type TScaleFunction = (value: DatumValue | null | undefined) => number;

type TCustomLayer = (
  props: Omit<CustomLayerProps, 'xScale' | 'yScale'> & {
    xScale: TScaleFunction;
    yScale: TScaleFunction;
  }
) => React.ReactNode;

export const getSerieSpecificOverrides = (
  series: TSerieProps[],
  theme: TTheme
) => {
  const defaultColors = [
    palette(p => p.accent.bubbleGum, theme),
    palette(p => p.accent.danger, theme),
    palette(p => p.accent.positive, theme),
    palette(p => p.accent.golden, theme),
    palette(p => p.accent.info, theme),
  ];
  const lineStyleBySerieId: TSerieIdStyle = {};
  const areaFillBySerieId: Record<string, TLineFill> = {};
  const overrides: Partial<LineSvgProps> = {};

  series.forEach(({ id, style }) => {
    if (style) {
      const { color, line, fill, css } = style;

      if (line === 'dashed') {
        lineStyleBySerieId[id] = {
          strokeDasharray: '6',
          strokeLinecap: 'round',
          strokeWidth: 2,
          ...(css || {}),
        };
      } else {
        lineStyleBySerieId[id] = {
          strokeLinecap: 'round',
          strokeWidth: 2,
          ...(css || {}),
        };
      }

      areaFillBySerieId[id] = fill || 'none';

      overrides['colors'] = ((overrides['colors'] as string[]) || []).concat([
        color || defaultColors.pop() || '#000000',
      ]);
    }
  });

  return {
    lineStyleBySerieId,
    areaFillBySerieId,
    overrides,
  };
};

export const getAreaStylingLayer =
  (fillById: Record<string, TLineFill>): TCustomLayer =>
  ({ series, xScale, yScale, innerHeight }) => {
    // Tell Nivo how to render an area corresponding to the datapoints
    // of a serie.
    const areaGenerator = area<ComputedDatum>()
      .x(d => xScale(d.data.x))
      .y0(_ => innerHeight)
      .y1(d => yScale(d.data.y))
      .curve(curveNatural);

    const getFillProperties = ({ id, color }: ComputedSerie) => {
      let fill: string = fillById[id];
      const uuid = uuidv4();
      const baseColor = color || '';

      if (fill === 'gradient') {
        fill = `url(#${uuid})`;
      }

      if (fill === 'translucent') {
        fill = baseColor;
      }

      return {
        fill,
        uuid,
        baseColor,
      };
    };

    return series.map(serie => {
      const { fill, uuid, baseColor } = getFillProperties(serie);

      const defs =
        fillById[serie.id] === 'gradient' ? (
          <Defs
            defs={[
              {
                id: uuid,
                type: 'linearGradient',
                colors: [
                  { offset: 0, color: baseColor },
                  { offset: 100, color: baseColor, opacity: 0 },
                ],
              },
            ]}
          />
        ) : null;

      return (
        <>
          {defs}
          <path
            key={serie.id}
            d={areaGenerator(serie.data) || undefined}
            fill={fill}
            fillOpacity={0.2}
          />
        </>
      );
    });
  };

export const getLineStylingLayer =
  (styleById: Record<string, CSSProperties>): TCustomLayer =>
  ({ series, lineGenerator, xScale, yScale }) => {
    return series.map(({ id, data, color }) => (
      <path
        key={id}
        d={
          lineGenerator(
            data.map(d => ({
              x: xScale(d.data.x || 0),
              y: yScale(d.data.y || 0),
            }))
          ) || undefined
        }
        fill="none"
        stroke={color}
        style={styleById[id]}
      />
    ));
  };
