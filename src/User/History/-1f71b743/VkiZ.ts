import { LineSvgProps } from '@nivo/line';

import { TSerieIdStyle, TSerieProps } from './types';

export const getSerieSpecificOverrides = (
  series: TSerieProps[]
): { styleBySerieId: TSerieIdStyle; overrides: Partial<LineSvgProps> } => {
  const styleBySerieId: TSerieIdStyle = {};
  let colors: string[] | undefined = undefined;

  series.forEach(({ id, color, style }) => {
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

    if (color) {
      colors = (colors || []).concat([color]);
    }
  });

  return {
    styleBySerieId,
    overrides: {
      colors,
    },
  };
};

export const rightOrLeft = (l?: unknown, r?: unknown) => {
  console.log('right', r);
  console.log('left', l);

  return r || l;
};
