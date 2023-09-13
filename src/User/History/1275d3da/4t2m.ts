import { isNil } from 'ramda';

function toDisplayPercentage(percentage?: number | null): string;
function toDisplayPercentage(
  number?: number | null,
  total?: number | null
): string;

export const toDisplayPercentage = (
  percentage?: number | null,
  number?: number | null,
  total?: number | null
) => {};

export const toPercentage = (
  number?: number | null,
  total?: number | null
): number => {
  if (number === 0 || isNil(number) || total === 0 || isNil(total)) {
    return 0;
  }

  return Math.round((number / total) * 100);
};
