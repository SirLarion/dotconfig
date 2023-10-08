import { palette, TTheme } from '@hox/ui/styles/theme';

import { TGraphColor } from '../../types';

export const colorLiteralToPalette = (
  color: TGraphColor | undefined,
  theme: TTheme
) => {
  switch (color) {
    case 'red':
      return palette(p => p.accent.danger, theme);
    case 'green':
      return palette(p => p.accent.positive, theme);
    case 'blue':
      return palette(p => p.accent.info, theme);
    case 'gray':
      return palette(p => p.accent.boring, theme);
  }
};