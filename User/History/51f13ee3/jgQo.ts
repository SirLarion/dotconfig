import { palette, TTheme } from '@hox/ui/styles/theme';

import { TGraphColor } from '.';

export const colorLiteralToPalette = (
  color: TGraphColor | undefined,
  theme: TTheme
) => {
  switch (color) {
    case 'red':
      return {
        base: palette(p => p.accent.danger, theme),
        dimmed: palette(p => p.cta.danger, theme),
      };
    case 'green':
      return {
        base: palette(p => p.accent.positive, theme) as string,
        dimmed: palette(p => p.accent.positive.dimmed, theme) as string,
      };
    case 'blue':
      return {
        base: palette(p => p.accent.info, theme),
        dimmed: palette(p => p.accent.info.dimmed, theme),
      };
    case 'gray':
      return {
        base: palette(p => p.accent.boring, theme),
        dimmed: palette(p => p.accent.boring.dimmed, theme),
      };
    default:
      return {
        base: palette(p => p.accent.bubbleGum, theme),
        dimmed: palette(p => p.accent.bubbleGum.dimmed, theme),
      };
  }
};
