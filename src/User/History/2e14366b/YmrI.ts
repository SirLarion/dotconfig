export type TDisplayFormatFunction = (value?: number) => string;

export type TValueOptions = {
  displayFormat?: 'percent' | 'decimal';
  fractionDigits?: number;
};
