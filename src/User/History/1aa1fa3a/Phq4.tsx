import React, { FC } from 'react';
import styled from 'styled-components';
import { Serie } from '@nivo/line';
import { pathOr } from 'ramda';

import { getOr } from '@hox/frontend-utils/ramda';

import { LineGraph } from '../LineGraph';
import { formatISO9075 } from 'date-fns';

export interface ITimeseriesQueryVariables {
  start: string;
  end: string;
  [key: string]: string | number | Date;
}

type TQueryNode = {
  group: Array<{
    key?: string | null;
    x?: string | null;
  }>;
  aggregate?: {
    ySubset?: number | null;
    yTotal?: number | null;
  } | null;
};

type TTimeseriesQueryResult = {
  currentUser?: {
    organization: {
      analytics?: {
        analyticsCubesBeta?: {
          data: {
            nodes: TQueryNode[];
          };
        } | null;
      } | null;
    };
  } | null;
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
const getX = getOr<string>('', ['group', 0, 'x']);
const getYSubset = pathOr<number>(0, ['aggregate', 'ySubset']);
const getYTotal = pathOr<number>(0, ['aggregate', 'yTotal']);

const extractTimeseriesData = (data?: TTimeseriesQueryResult) => {
  const nodes = getNodes(data);

  console.log(getX(nodes[0]));

  return [
    {
      id: 'jokuID',
      data: nodes.map(node => ({
        x: formatISO9075(new Date(getX(node)), { representation: 'date' }),
        y: Math.round((getYSubset(node) / getYTotal(node)) * 100),
      })),
    } as Serie,
  ];
};

export interface ITimeseriesGraphProps {
  queryResult?: TTimeseriesQueryResult;
}
const StyledTimeseriesGraph = styled.div``;

export const TimeseriesGraph: FC<ITimeseriesGraphProps> = ({
  queryResult,
  ...restProps
}) => {
  return (
    <StyledTimeseriesGraph {...restProps}>
      <LineGraph data={extractTimeseriesData(queryResult)} />
    </StyledTimeseriesGraph>
  );
};
