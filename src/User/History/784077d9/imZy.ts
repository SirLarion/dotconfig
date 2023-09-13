import { CSSProperties } from 'react';
import { LineSvgProps } from '@nivo/line';
import { TSerieIdStyle, TSerieProps } from './types';

export const getSerieSpecificOverrides = (
  series: TSerieProps[]
): { styleBySerieId: TSerieIdStyle; overrides: Partial<LineSvgProps> } => {
  const styleBySerieId: Record<string, CSSProperties> = {};
  let colors: string[] | undefined = undefined;

  series.forEach(({ id, color, style, fill }) => {
    if (style === 'dashed') {
      styleBySerieId[id] = {
        strokeDasharray: '12, 6',
        strokeWidth: 2,
      };
    }
    if (color) {
      colors = (colors || []).concat([color]);
    }
    if
  });

  return {
    styleBySerieId,
    overrides: {
      colors
    }
  };
};
