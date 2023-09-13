import React, { PropsWithChildren, ReactNode } from 'react';
import styled from 'styled-components';
import { QueryHookOptions, QueryResult } from '@apollo/client';
import {
  FormattedMessage,
  FormattedNumber,
  MessageDescriptor,
  useIntl,
} from 'react-intl';

import { Exact } from '@hox/frontend-utils/types/graphql.generated';

import { DeltaTag } from '../../../DeltaTag';
import { Heading2, SmallText } from '../../../Text';
import { BaseAnalyticsCard } from '../BaseAnalyticsCard';

import { calculateDeltaDates, differenceInDays } from './lib';

export interface IAnalyticsIntervalTrendCardQueryVariables {
  start: string;
  end: string;
  [key: string]: string | number | Date;
}

export interface IAnalyticsIntervalTrendCardProps<
  T,
  X extends IAnalyticsIntervalTrendCardQueryVariables
> {
  title: ReactNode;
  comparisonText: MessageDescriptor;
  variables: X;
  hideDelta?: boolean;
  calculateValue: (data: T) => number;
  calculateComparisonValue: (data: T) => number;
  query: (
    baseOptions: QueryHookOptions<T, Exact<X>>
  ) => QueryResult<T, Exact<X>>;
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

export const AnalyticsIntervalTrendCard = <
  T,
  X extends IAnalyticsIntervalTrendCardQueryVariables
>({
  variables,
  comparisonText,
  hideDelta,
  query,
  calculateValue,
  calculateComparisonValue,
  ...restProps
}: PropsWithChildren<IAnalyticsIntervalTrendCardProps<T, X>>) => {
  const intl = useIntl();

  const { data, loading, error } = query({ variables });

  const {
    data: comparisonData,
    loading: loadingComparison,
    error: errorComparison,
  } = query({
    variables: { ...variables, ...calculateDeltaDates(variables) },
  });

  if (loading || loadingComparison) {
    return (
      <BaseAnalyticsCardStyled {...restProps}>
        {/* TODO: implement skeleton loader */}
        ...
      </BaseAnalyticsCardStyled>
    );
  }

  if (!data || !comparisonData || error || errorComparison) {
    return (
      <BaseAnalyticsCardStyled {...restProps}>
        <FormattedMessage
          id="ui.analytics.card.error"
          defaultMessage="Failed to fetch data"
          description="Error message shown when data cannot be fetched"
        />
      </BaseAnalyticsCardStyled>
    );
  }

  const mainValue = calculateValue(data);

  const comparisonValue = calculateComparisonValue(data);

  const timespanInDays = differenceInDays(variables);

  const deltaMainValue = calculateValue(comparisonData);

  const deltaInt = mainValue - deltaMainValue;

  const deltaPercentage = (deltaInt / deltaMainValue) * 100;

  return (
    <BaseAnalyticsCardStyled {...restProps}>
      <Heading2Styled>
        <FormattedNumber value={mainValue} />
        <SmallText dimmed>
          {intl.formatMessage(comparisonText, {
            value: comparisonValue,
          })}
        </SmallText>
      </Heading2Styled>
      {!hideDelta && (
        <DeltaTag
          small
          delta={deltaPercentage}
          changeTotal={<FormattedNumber value={deltaInt} />}
          type={deltaInt > 0 ? 'positive' : 'negative'}
          unitMark="%"
          timeSpan={
            <FormattedMessage
              id="ui.analytics.card.delta"
              defaultMessage="since last {value} days"
              description="Shows the difference between two numbers since some date ago"
              values={{ value: timespanInDays }}
            />
          }
        />
      )}
    </BaseAnalyticsCardStyled>
  );
};
