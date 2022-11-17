import { pathOr } from 'ramda';

import { getOr } from '@hox/frontend-utils/ramda';

const getOrgId = pathOr<string>('', ['currentUser', 'organization', '_id']);

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
  const id = getOrgId(data);

  return [
    {
      id,
      data: nodes.map(node => ({
        x: getX(node),
        y: getYSubset(node) / getYTotal(node),
      })),
    } as Serie,
  ];
};
