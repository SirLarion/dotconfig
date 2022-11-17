import React, { FC, PropsWithChildren, ReactNode } from 'react';
import { pathOr } from 'ramda';
import styled from 'styled-components';
import { MessageDescriptor } from 'react-intl';

import { Exact } from '@hox/frontend-utils/types/graphql.generated';
import { Serie } from '@nivo/line';
import { LineGraph } from '../LineGraph';

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
const getX = pathOr<string>('', ['group', 'x']);
const getYSubset = pathOr<number>(0, ['aggregate', 'ySubset']);
const getYTotal = pathOr<number>(0, ['aggregate', 'yTotal']);

const extractTimeseriesData = (data: TTimeseriesQueryResult) => {
  const nodes = getNodes(data);

  return [
    {
      id: 'jokuID',
      data: nodes.map(node => ({
        x: getX(node),
        y: Math.round((getYSubset(node) / getYTotal(node)) * 100),
      })),
    } as Serie,
  ];
};

export interface ITimeseriesGraphProps {
  title: ReactNode;
  comparisonText: MessageDescriptor;
  variables: X;
  hideDelta?: boolean;
  calculateValue: (data: T) => number;
  calculateComparisonValue: (data: T) => number;
  queryResult: TTimeseriesQueryResult;
}
const StyledTimeseriesGraph = styled.div``;

export const TimeseriesGraph: FC = ({ queryResult, ...restProps }) => {
  return (
    <StyledTimeseriesGraph {...restProps}>
      <LineGraph data={extractTimeseriesData(queryResult)} />
    </StyledTimeseriesGraph>
  );
};
