import React, { FC, PropsWithChildren, ReactNode } from 'react';
import { pathOr } from 'ramda';
import styled from 'styled-components';
import { MessageDescriptor } from 'react-intl';

import { Exact } from '@hox/frontend-utils/types/graphql.generated';

export interface ITimeseriesQueryVariables {
  start: string;
  end: string;
  [key: string]: string | number | Date;
}

type TQueryNode = {
  group: {
    key: string;
    x: string;
  };
  aggregate: {
    ySubset: number;
    yTotal: number;
  };
};

type TTimeseriesQueryResult = {
  currentUser: {
    organization: {
      analytics: {
        analyticsCubesBeta: {
          data: {
            nodes: TQueryNode[];
          };
        };
      };
    };
  };
};

const getNodes = pathOr<TQueryNode[]>(
  [],
  [
    'currentUser',
    'organization',
    'analytics',
    'analyticsCubesBeta',
    'data',
    'nodes',
  ]
);
const getX = pathOr<string[]>([], ['group', 'x']);
const getYSubset = pathOr<number[]>([], ['aggregate', 'ySubset']);
const getYTotal = pathOr<number[]>([], ['aggregate', 'yTotal']);

export interface ITimeseriesGraphProps<T, X extends ITimeseriesQueryVariables> {
  title: ReactNode;
  comparisonText: MessageDescriptor;
  variables: X;
  hideDelta?: boolean;
  calculateValue: (data: T) => number;
  calculateComparisonValue: (data: T) => number;
  queryResult: TimeseriesQueryResult;
}
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
