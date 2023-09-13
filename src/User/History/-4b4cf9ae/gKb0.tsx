import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { FormattedMessage, FormattedNumber } from 'react-intl';

import { DeltaTag } from '../../../DeltaTag';
import { Heading2, SmallText } from '../../../Text';
import { SkeletonLoader } from '../..';
import { BaseAnalyticsCard } from '../BaseAnalyticsCard';

interface IIntervalTrendCardValues {
  value: number;
  text?: ReactNode;
}

export interface IAnalyticsIntervalTrendCardProps {
  title: ReactNode;
  main: IIntervalTrendCardValues;
  delta?: IIntervalTrendCardValues;
  error?: boolean;
  loading?: boolean;
}

const BaseAnalyticsCardStyled = styled(BaseAnalyticsCard)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Heading2Styled = styled(Heading2)`
  display: flex;
  align-items: center;
  > :first-child {
    margin-left: 0.5rem;
  }
`;

export const AnalyticsIntervalTrendCard: FC<
  IAnalyticsIntervalTrendCardProps
> = ({ main, delta, loading, error, ...restProps }) => {
  if (loading) {
    return <SkeletonLoader {...restProps} />;
  }

  if (error) {
    return (
      <BaseAnalyticsCardStyled {...restProps}>
        <SmallText>
          <FormattedMessage
            id="ui.analytics.card.error"
            defaultMessage="Failed to fetch data"
            description="Error message shown when data cannot be fetched"
          />
        </SmallText>
      </BaseAnalyticsCardStyled>
    );
  }

  return (
    <BaseAnalyticsCardStyled {...restProps}>
      <Heading2Styled>
        <FormattedNumber value={main.value} />
        {main.text && <SmallText dimmed>{main.text}</SmallText>}
      </Heading2Styled>
      {delta && (
        <DeltaTag
          small
          renderAsPill
          delta={delta.value}
          type={delta.value || 0 > 0 ? 'positive' : 'negative'}
          unitMark="%"
          timeSpan={delta.text}
        />
      )}
    </BaseAnalyticsCardStyled>
  );
};
