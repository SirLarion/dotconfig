import { LineSvgProps } from '@nivo/line';

import { TSerieIdStyle, TSerieProps } from './types';

export const getSerieSpecificOverrides = (series: TSerieProps[]) => {
  const styleBySerieId: TSerieIdStyle = {};
  const overrides: Partial<LineSvgProps> = {};

  series.forEach(({ id, color, style, fill }) => {
    if (style === 'dashed') {
      styleBySerieId[id] = {
        strokeDasharray: '12, 6',
        strokeWidth: 2,
      };
    } else {
      styleBySerieId[id] = {
        strokeWidth: 2,
      };
    }

    if (fill === 'gradient') {
      overrides['fill'] = (overrides['fill'] || []).concat([
        { id: 'gradient', match: '*' },
      ]);
    } else if (fill === 'none') {
      overrides[''];
    }

    if (color) {
      overrides['colors'] = ((overrides['colors'] as string[]) || []).concat([
        color,
      ]);
    }
  });

  return {
    styleBySerieId,
    overrides,
  };
};

export const rightOrLeft = (l?: unknown, r?: unknown) => {
  console.log('right', r);
  console.log('left', l);

  return r || l;
};
