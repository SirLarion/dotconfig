import { LineSvgProps } from '@nivo/line';

import { TSerieIdStyle, TSerieProps } from './types';

export const getSerieSpecificOverrides = (series: TSerieProps[]) => {
  const lineStyleBySerieId: TSerieIdStyle = {};
  const overrides: Partial<LineSvgProps> = {};

  series.forEach(({ id, color, lineStyle, fillStyle, css }) => {
    // if (style) {

    if (lineStyle === 'dashed') {
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
    if (fillStyle && fillStyle !== 'translucent') {
      overrides['fill'] = (overrides['fill'] || []).concat([
        { id: fillStyle, match: { id } },
      ]);
    }

    if (color) {
      overrides['colors'] = ((overrides['colors'] as string[]) || []).concat([
        color,
      ]);
    }
  });

  return {
    lineStyleBySerieId,
    overrides,
  };
};

export const rightOrLeft = (l?: unknown, r?: unknown) => r || l;
