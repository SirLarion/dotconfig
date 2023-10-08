import { CSSProperties } from 'react';
import { LineSvgProps } from '@nivo/line';
import { TSerieProps } from './types';

export const getSerieSpecificOverrides = (
  series: TSerieProps[]
): Partial<LineSvgProps> => {
  const styleBySerieId: Record<string, CSSProperties> = {};
  series.forEach(({ id, color, style, fill }) => {
    styleBySerieId[id] =
      style === 'dashed'
        ? {
            strokeDasharray: '12, 6',
            strokeWidth: 2,
          }
        : undefined;
  });
  return {};
};