import { CustomLayer, LineSvgProps } from '@nivo/line';
import { CSSProperties } from 'react';

import { TSerieIdStyle, TSerieProps } from './types';

export const getSerieSpecificOverrides = (series: TSerieProps[]) => {
  const lineStyleBySerieId: TSerieIdStyle = {};
  const overrides: Partial<LineSvgProps> = {};

  series.forEach(({ id, style }) => {
    if (style) {
      const { color, line, fill, css } = style;

      if (line === 'dashed') {
        lineStyleBySerieId[id] = {
          strokeDasharray: '12, 6',
          strokeWidth: 2,
          ...(css || {}),
        };
      } else {
        lineStyleBySerieId[id] = {
          strokeWidth: 2,
          ...(css || {}),
        };
      }

      // The fill is translucent by default => no custom fill required
      if (fill && fill !== 'translucent') {
        overrides['fill'] = (overrides['fill'] || []).concat([
          { id: fill, match: { id } },
        ]);
      }

      if (color) {
        overrides['colors'] = ((overrides['colors'] as string[]) || []).concat([
          color,
        ]);
      }
    }
  });

  return {
    lineStyleBySerieId,
    overrides,
  };
};

const getLineStylingLayer =
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

export const rightOrLeft = (l?: unknown, r?: unknown) => r || l;
