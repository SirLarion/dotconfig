import React, { FC } from 'react';
import styled from 'styled-components';
import { Serie } from '@nivo/line';
import { formatISO9075 } from 'date-fns';
import { pathOr } from 'ramda';

import { getOr } from '@hox/frontend-utils/ramda';
import { LineGraph } from '@hox/ui/LineGraph';

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
        x: formatISO9075(new Date(getX(node)), { representation: 'date' }),
        y: getYSubset(node) / getYTotal(node),
      })),
    } as Serie,
  ];
};

export interface ITimeseriesGraphProps {
  queryResult?: TTimeseriesQueryResult;
}

const StyledTimeseriesGraph = styled.div`
  width: 100%;
  height: 100%;
`;

export const TimeseriesGraph: FC<ITimeseriesGraphProps> = ({
  queryResult,
  ...restProps
}) => {
  const data = extractTimeseriesData(queryResult);

  return (
    <StyledTimeseriesGraph {...restProps}>
      <LineGraph data={data} />
    </StyledTimeseriesGraph>
  );
};
