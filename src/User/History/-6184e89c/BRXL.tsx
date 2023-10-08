import React, { FC } from 'react';
import styled from 'styled-components';
import { Serie } from '@nivo/line';
import { pathOr } from 'ramda';

import { getOr } from '@hox/frontend-utils/ramda';
import { LineGraph } from '@hox/ui/LineGraph';
import { QueryResult } from '@apollo/client';
import { IAnalyticsQueryBaseVariables, TAnalyticsQuery } from '../../types';

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

/*
 * The data interface for this component is based on using GraphQL aliases.
 * This is to get data out of the GQL Analytics API in a predictable form.
 * Thus, the format of GQL query results accepted by the component follow
 * this pattern:

query GetSomeData {
  currentUser {
    organization {
      analytics {
        analyticsCubesBeta {
          data: <Insert aggregate dataset name, e.g. dailyUserTypeCountsSnapshotAggregate> {
            nodes: {
              group: {
                key
                x: value
              }
              aggregate: <Insert chosen aggregate function> {
                ySubset: <Insert chosen y-axis metric name, e.g. onboardedUsers>
                yTotal: <Insert corresponding name for total amount, e.g. totalUsers>
              }
            }
          }
        }
      }
    }
  }
}

 */
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

interface ITimeseriesQueryVariables extends IAnalyticsQueryBaseVariables {
  start: string;
  end: string;
}

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
const getX = (node: TQueryNode) => getOr<string>(['group', 0, 'x'], '', node);
const getYSubset = pathOr<number>(0, ['aggregate', 'ySubset']);
const getYTotal = pathOr<number>(0, ['aggregate', 'yTotal']);

const extractTimeseriesData = (data?: TTimeseriesQueryResult) => {
  const nodes = getNodes(data);

  return [
    {
      id: 'jokuID',
      data: nodes.map(node => ({
        x: getX(node),
        y: getYSubset(node) / getYTotal(node),
      })),
    } as Serie,
  ];
};

export interface ITimeseriesCardProps {
  query: TAnalyticsQuery<TTimeseriesQueryResult, ITimeseriesQueryVariables>;
}

const StyledTimeseriesCard = styled.div`
  width: 100%;
  height: 100%;
`;

export const TimeseriesCard: FC<ITimeseriesCardProps> = ({
  queryResult,
  ...restProps
}) => {
  const data = extractTimeseriesData(queryResult);

  return (
    <StyledTimeseriesCard {...restProps}>
      <LineGraph data={data} />
    </StyledTimeseriesCard>
  );
};