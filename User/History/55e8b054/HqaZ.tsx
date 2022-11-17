import React, { FC, ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

import { DeltaTag, TTagType } from '../../../DeltaTag';
import { SmallText } from '../../../Text';

export interface IAnalyticsDeltaTagProps {
  value?: number;
  text?: ReactNode;
  sentiment?: TTagType;
}

export const AnalyticsDeltaTag: FC<IAnalyticsDeltaTagProps> = ({
  value,
  text,
  sentiment,
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
      deltaUnavailableTooltipChildren={
        <SmallText>
          <FormattedMessage
            id="ui.analytics.card.delta.undefined"
            defaultMessage="No comparison data"
            description="Text shown on a delta tag when there is no comparison (delta) data available"
          />
        </SmallText>
      }
      type={sentiment || defaultDeltaTagType}
      timeSpan={text}
    />
  );
};
