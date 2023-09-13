import React, { FC, ReactNode, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { QueryHookOptions, QueryResult } from '@apollo/client';
import { MessageDescriptor } from 'react-intl';

import {
  AnalyticsCubesBeta,
  Exact,
} from '@hox/frontend-utils/types/graphql.generated';

export interface ITimeseriesQueryVariables {
  start: string;
  end: string;
  [key: string]: string | number | Date;
}

export interface ITimeseriesGraphProps<T, X extends ITimeseriesQueryVariables> {
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

type TimeseriesQueryResult = {
  currentUser: {
    organization: {
      analytics: {
        analyticsCubesBeta: {
          data: {
            nodes: {
              group: {
                key: string;
                x: string;
              };
              sum: {
                yPartial: number;
                yTotal: number;
              };
            };
          };
        };
      };
    };
  };
};

const flattenObj = (
  obj: AnalyticsCubesBeta[keyof AnalyticsCubesBeta],
  res = {}
) => {};

const StyledTimeseriesGraph = styled.div``;

export const TimeseriesGraph = <T, X extends ITimeseriesQueryVariables>({
  variables,
  comparisonText,
  hideDelta,
  query,
  calculateValue,
  calculateComparisonValue,
  ...restProps
}: PropsWithChildren<ITimeseriesGraphProps<T, X>>) => {
  return <StyledTimeseriesGraph {...restProps}>heloo</StyledTimeseriesGraph>;
};
