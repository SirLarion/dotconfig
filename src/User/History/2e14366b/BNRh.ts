import { ReactNode } from 'react';

export type TDisplayFormatFunction = (value: number) => ReactNode;

export type TValueOptions = {
  displayFormat?: 'percent' | 'decimal';
  fractionDigits?: number;
};
