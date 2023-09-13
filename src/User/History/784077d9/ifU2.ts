import { LineSvgProps } from '@nivo/line';
import { TSerieProps } from '.';

export const getSerieSpecificOverrides = (
  series: TSerieProps[]
): Partial<LineSvgProps> => {
  return {};
};
