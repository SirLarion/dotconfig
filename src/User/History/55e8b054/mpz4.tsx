import React, { FC, ReactNode } from 'react';

import { DeltaTag, TTagType } from '../../../DeltaTag';

export interface IAnalyticsDeltaTagProps {
  value?: number;
  text?: ReactNode;
  sentiment?: TTagType;
}

export const AnalyticsDeltaTag: FC<IAnalyticsDeltaTagProps> = ({
  value,
  text,
  type,
  ...restProps
}) => {
  const defaultDeltaTagType = (value || 0) > 0 ? 'positive' : 'negative';

  return (
    <DeltaTag
      {...restProps}
      small
      renderAsPill
      unitMark="%"
      delta={value}
      type={type || defaultDeltaTagType}
      timeSpan={text}
    />
  );
};
