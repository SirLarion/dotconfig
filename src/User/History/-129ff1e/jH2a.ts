import { palette } from '@hox/ui/styles/theme';

import { TGraphColor } from '.';

export const colorLiteralToPalette = (color: TGraphColor) => {
  switch (color) {
    case 'red':
      return palette(p => p.accent.danger);
    case 'green':
      return palette(p => p.accent.positive);
    case 'blue':
      return palette(p => p.accent.info);
    case 'gray':
      return palette(p => p.accent.boring);
  }
};
