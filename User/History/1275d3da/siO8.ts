import { isNil } from 'ramda';

export const toPercentage = (
  number?: number | null,
  total?: number | null
): number => {
  if (number === 0 || isNil(number) || total === 0 || isNil(total)) {
    return 0;
  }

  return Math.round((number / total) * 100);
};
export const toDisplayPercentage = (
  number?: number | null,
  total?: number | null
): string => `${toPercentage(number, total)}%`;
