import { Datum, Serie } from '@nivo/line';
import { flatten, map, maxBy, pathOr, pipe, prop, reduce } from 'ramda';

import { palette, theme, TTheme } from '@hox/ui/styles/theme';
import { TValueOptions } from './types';

export type TPaletteAccentColor = keyof TTheme['palette']['accent'];

const PALETTE_ACCENT_KEYS = Object.keys(theme.palette.accent);

const isAccentColor = (color: string): color is TPaletteAccentColor =>
  PALETTE_ACCENT_KEYS.includes(color);

export const ANALYTICS_QUERY_BASE_PATH = [
  'currentUser',
  'organization',
  'analytics',
  'analytics',
];

export const getDisplayNumber = (
  value?: number,
  {
    displayType = 'percent',
    fractionDigits = 1,
  }: TValueOptions | undefined = {}
): string => {
  const isPercent = displayType === 'percent';

  if (!value) {
    return `—${isPercent && '%'}`;
  }

  if (isPercent) {
    return `${(value * 100).toFixed(fractionDigits)}%`;
  }

  return value.toFixed(fractionDigits);
};

const ensureArray = <T>(item: T | T[]): T[] =>
  Array.isArray(item) ? item : [item];

export const graphMax = (series: Serie[] | Serie) =>
  pipe(
    map<Serie, Datum>(prop('data')),
    flatten,
    reduce(maxBy(pathOr(0, ['y'])), 0),
    pathOr(0, ['y'])
  )(ensureArray(series));

export const decimateArray = <T>(data: T[], maxLength = 30) => {
  const fidelity = Math.ceil(data.length / maxLength);

  return data.filter((_, index) => index % fidelity === 0);
};

export const getGraphColor: (
  color?: string | TPaletteAccentColor
) => string | undefined = color => {
  if (!color) {
    return undefined;
  }

  if (!isAccentColor(color)) {
    return color;
  }

  return palette(p => p.accent[color], theme);
};
