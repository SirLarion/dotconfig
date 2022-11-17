import { Datum } from '@nivo/line';
import { isLastDayOfMonth } from 'date-fns';
import { pathOr, pipe, sortBy } from 'ramda';

import { getOr } from '@hox/frontend-utils/ramda';
import { palette, theme, TTheme } from '@hox/ui/styles/theme';

import { TSerieProps } from '../LineGraph/types';

import { TValueOptions } from './types';

const ONE_MONTH_IN_DAYS = 30;
const SIX_MONTHS_IN_DAYS = 180;

interface IDecimatorAcc {
  decimatedArray: Datum[];
  cumulativeCount: number;
}

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
    displayFormat = 'percent',
    fractionDigits = 1,
  }: TValueOptions | undefined = {}
): string => {
  const isPercent = displayFormat === 'percent';
  const isDecimal = displayFormat === 'decimal';

  if (!value) {
    return `—${isPercent ? '%' : ''}`;
  }

  if (isPercent) {
    return `${(value * 100).toFixed(fractionDigits)}%`;
  }

  if (isDecimal) {
    return value.toFixed(fractionDigits);
  }

  return displayFormat(value);
};

export const extractGraphColorFromSeries = (series: TSerieProps[]) => ({
  primary: getOr(
    [0, 'style', 'color'],
    palette(p => p.cta.primary),
    series
  ),
  secondary: getOr(
    [1, 'style', 'color'],
    palette(p => p.accent.info.dimmed),
    series
  ),
});

const isSameWeekday = (x: Date, y: Date) => x.getDay() === y.getDay();

const isSameDayOfMonth = (x: Date, y: Date) => x.getDate() === y.getDate();

export const byDate = pipe(pathOr(new Date().toISOString(), ['x']), x =>
  new Date(x).getTime()
);

const getSerieLastDay = (data: Datum[]) => {
  if (data.length === 0) {
    return new Date();
  }

  const dataSortedByDate = sortBy(byDate, data);

  const lastDay = dataSortedByDate[dataSortedByDate.length - 1].x;

  return new Date(lastDay as string);
};

const datapointNotAddedForMonth = (currentDay: Date, lastDay: Date) =>
  currentDay.getDate() < lastDay.getDate();

const isDatapointForMonth = (currentDay: Date, lastDay: Date) => {
  if (isSameDayOfMonth(currentDay, lastDay)) {
    return true;
  }

  if (
    isLastDayOfMonth(currentDay) &&
    datapointNotAddedForMonth(currentDay, lastDay)
  ) {
    return true;
  }

  return false;
};

const dataToDateIntervalChecker = (
  data: Datum[]
): ((currentDay: string) => boolean) => {
  const lastDay = getSerieLastDay(data);

  if (data.length < ONE_MONTH_IN_DAYS) {
    return () => true;
  } else if (data.length < SIX_MONTHS_IN_DAYS) {
    return currentDay => isSameWeekday(new Date(currentDay), lastDay);
  } else {
    return currentDay => isDatapointForMonth(new Date(currentDay), lastDay);
  }
};

const addDataPointToArray = (
  { decimatedArray, cumulativeCount }: IDecimatorAcc,
  curr: Datum
) => {
  const newDataPoint = {
    ...curr,
    y: (curr.y as number) + cumulativeCount,
  };

  return [...decimatedArray, newDataPoint];
};

const decimator =
  (showDataPoint: ReturnType<typeof dataToDateIntervalChecker>) =>
  (acc: IDecimatorAcc, curr: Datum) => {
    if (showDataPoint(curr.x as string)) {
      return {
        decimatedArray: addDataPointToArray(acc, curr),
        cumulativeCount: 0,
      };
    }

    return {
      ...acc,
      cumulativeCount: acc.cumulativeCount + (curr.y as number),
    };
  };

export const decimateArray = (data: Datum[]) => {
  // always traverse the data from oldest date to newest
  const dataSorted = sortBy(byDate, data);

  const showDataPoint = dataToDateIntervalChecker(dataSorted);

  const { decimatedArray } = dataSorted.reduce(decimator(showDataPoint), {
    decimatedArray: [],
    cumulativeCount: 0,
  });

  return decimatedArray;
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
