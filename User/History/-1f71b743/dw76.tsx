import React, { CSSProperties } from 'react';
import { Defs } from '@nivo/core';
import {
  ComputedDatum,
  ComputedSerie,
  CustomLayer,
  LineSvgProps,
} from '@nivo/line';
import { area, curveNatural } from 'd3-shape';
import { v4 as uuidv4 } from 'uuid';

import { palette, TTheme } from '../styles/theme';

import { TLineFill, TSerieIdStyle, TSerieProps } from './types';

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
  (fillById: Record<string, TLineFill>): CustomLayer =>
  // eslint-disable-next-line react/display-name
  ({ series, xScale, yScale, innerHeight }) => {
    // Tell Nivo how to render an area corresponding to the datapoints
    // of a serie. ts-ignores are required because xScale & yScale functions
    // are poorly typed in Nivo's end
    const areaGenerator = area<ComputedDatum>()
      // @ts-ignore
      .x(d => xScale(d.data.x))
      .y0(_ => innerHeight)
      // @ts-ignore
      .y1(d => yScale(d.data.y))
      .curve(curveNatural);

    const getFillProperties = ({ id, color }: ComputedSerie) => {
      const fillId = fillById[id];
      const uuid = uuidv4();
      const baseColor = color || '';

      const getFillString = () => {
        if (fillId === 'gradient') {
          return `url(#${uuid})`;
        }

        if (fillId === 'translucent') {
          return baseColor;
        }

        return 'none';
      };

      return {
        fillId,
        fill: getFillString(),
        uuid,
        baseColor,
      };
    };

    return series.map(serie => {
      const { fillId, fill, uuid, baseColor } = getFillProperties(serie);

      const defs =
        fillId === 'gradient' ? (
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
  (styleById: Record<string, CSSProperties>): CustomLayer =>
  // eslint-disable-next-line react/display-name
  ({ series, lineGenerator, xScale, yScale }) => {
    return (
      <>
        {series.map(({ id, data, color }) => (
          <path
            key={id}
            d={
              // The lineGenerator function is weirdly typed in Nivo's end
              // Consequently it doesn't work if used with those types
              lineGenerator(
                // @ts-ignore
                data.map(d => ({
                  // @ts-ignore
                  x: xScale(d.data.x || 0),
                  // @ts-ignore
                  y: yScale(d.data.y || 0),
                }))
              ) || undefined
            }
            fill="none"
            stroke={color}
            style={styleById[id]}
          />
        ))}
      </>
    );
  };
