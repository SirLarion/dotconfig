import React, { CSSProperties } from 'react';
import { CustomLayer, LineSvgProps } from '@nivo/line';
import { v4 as uuidv4 } from 'uuid';

import { palette, TTheme } from '../styles/theme';

import { TSerieIdStyle, TSerieProps } from './types';

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

      overrides['colors'] = ((overrides['colors'] as string[]) || []).concat([
        color || defaultColors.pop() || '#000000',
      ]);

      // The fill is translucent by default => no custom fill required
      if (fill && fill !== 'translucent') {
        const baseColor = overrides['colors'][i];
        const uuid = uuidv4();

        const colors =
          fill === 'none'
            ? [{ color: baseColor, opacity: 0 }]
            : [
                { offset: 0, color: baseColor },
                { offset: 100, color: baseColor, opacity: 0 },
              ];

        overrides['defs'] = (overrides['defs'] || []).concat([
          { id: uuid, type: 'linearGradient', colors },
        ]);

        overrides['fill'] = (overrides['fill'] || []).concat([
          { id: uuid, match: { id } },
        ]);
      }
    }
  });

  return {
    lineStyleBySerieId,
    overrides,
  };
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

export const rightOrLeft = (l?: unknown, r?: unknown) => {
  console.log('right', r);
  console.log('left', l);
  return r || l;
};