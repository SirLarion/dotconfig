/**
 * Utility module to augment ramda with anything it's missing.
 */
// eslint-disable-next-line no-restricted-imports
import {
  capitalize as lodashCapitalize,
  debounce as lodashDebounce,
  LoDashStatic,
  random as lodashRandom,
  throttle as lodashThrottle,
  uniqueId as lodashUniqueId,
} from 'lodash';
import {
  allPass,
  complement,
  is,
  isEmpty,
  Path,
  path,
  pathSatisfies,
} from 'ramda';

export const capitalize = lodashCapitalize;

export const isNotNil = <T>(v: T | undefined | null): v is T =>
  v !== undefined && v !== null;

export const getOr = <T>(
  p: Path,
  defaultVal: T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: Record<string, any> | null | void
) => path<T>(p, obj) || defaultVal;

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const noop = (...args: any[]): void => undefined;

export const throttle: LoDashStatic['throttle'] = lodashThrottle;
export const debounce: LoDashStatic['debounce'] = lodashDebounce;
export const random: LoDashStatic['random'] = lodashRandom;

export const isNumber = <T>(val: T | number): val is number => is(Number)(val);

export const isNumberBetween: (
  start: number,
  end: number
) => (number: number) => boolean = (start, end) => number =>
  start <= number && number < end;

export const isNumberAndBetween: (
  start: number,
  end: number
) => (number?: number) => boolean = (start, end) =>
  allPass([complement(isNaN), isNumber, isNumberBetween(start, end)]);

export const isString = <T>(val: T | string): val is string => is(String)(val);

export const isNonEmptyString: (str?: string) => boolean = allPass([
  isString,
  complement(isEmpty),
]);

export const pathIsNotNil = (path: Path) => pathSatisfies(isNotNil, path);

export const mapIndexed =
  <TVal, TOut>(iter: (val: TVal, index: number) => TOut) =>
  (list: TVal[]): TOut[] =>
    list.map(iter);
