import React, { CSSProperties } from 'react';
import { Defs } from '@nivo/core';
import { ComputedDatum, CustomLayer, LineSvgProps } from '@nivo/line';
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

  series.forEach(({ id, style }, i) => {
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

      // The fill is translucent by default => no custom fill required
      // if (fill && fill !== 'translucent') {
      //   const baseColor = overrides['colors'][i];
      //   const uuid = uuidv4();

      //   const colors =
      //     fill === 'none'
      //       ? [
      //           { color: baseColor, opacity: 0 },
      //           { color: baseColor, opacity: 0 },
      //         ]
      //       : [
      //           { offset: 0, color: baseColor },
      //           { offset: 100, color: baseColor, opacity: 0 },
      //         ];

      //   overrides['defs'] = (overrides['defs'] || []).concat([
      //     { id: uuid, type: 'linearGradient', colors },
      //   ]);

      //   overrides['fill'] = (overrides['fill'] || []).concat([
      //     { id: uuid, match: { id } },
      //   ]);
      // }
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
    const areaGenerator = area<ComputedDatum>()
      // @ts-ignore
      .x(d => xScale(d.data.x))
      // @ts-ignore
      .y0(_ => innerHeight)
      // @ts-ignore
      .y1(d => yScale(d.data.y))
      .curve(curveNatural);

    return (
      <>
        {series.map(({ id, data, color }) => {
          const serieFill = fillById[id];
          const uuid = uuidv4();
          const baseColor = color || '';

          const fillString =
            serieFill === 'gradient' ? `url(#${uuid})` : 'none';

          const defs =
            serieFill === 'gradient' ? (
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
                key={id}
                d={areaGenerator(data) || undefined}
                fill={fillString}
                fillOpacity={0.2}
              />
            </>
          );
        })}
      </>
    );
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