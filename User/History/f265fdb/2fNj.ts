import { format, formatDuration, formatISO9075, subDays } from 'date-fns';
import * as R from 'ramda';

import { TTagType } from '@hox/ui/DeltaTag';
import { palette, TTheme } from '@hox/ui/styles/theme';

import {
  TAnalyticsMetric,
  TAnalyticsQueryResult,
  TAnalyticsTimeframe,
  TQueryNode,
} from './types';

const MIN_IN_SEC = 60;
const HOUR_IN_SEC = 60 * MIN_IN_SEC;
const DAY_IN_SEC = 24 * HOUR_IN_SEC;

const getOrgId = R.pathOr<string>('', ['currentUser', 'organization', '_id']);

const getNodes = R.pathOr<TQueryNode[]>(
  [],
  [
    'currentUser',
    'organization',
    'analytics',
    'analyticsCubesBeta',
    'dataSet',
    'nodes',
  ]
);

export const getDelta = (a: number, b: number) => {
  return a === 0 ? 1.0 : ((b - a) / a) * 100;
};

const getISODate = (x: string | null | undefined) =>
  x ? formatISO9075(new Date(x), { representation: 'date' }) : x;

export const durationToDisplayValue = (seconds?: number) => {
  if (!seconds) {
    return '---';
  }

  console.log(
    'böbbe',
    formatDuration({ seconds }, { format: ['days', 'hours', 'minutes'] })
  );
  return '---';

  // let first = '';
  // let second = '';

  // if (seconds / DAY_IN_SEC > 1) {
  //   first = (seconds / DAY_IN_SEC).toFixed(0);
  //   second = (seconds / HOUR_IN_SEC).toFixed(0);

  //   return `${first}d${second}h`;
  // }

  // if (seconds / HOUR_IN_SEC > 1) {
  //   first = (seconds / HOUR_IN_SEC).toFixed(0);
  //   second = (seconds / MIN_IN_SEC).toFixed(0);

  //   return `${first}h${second}m`;
  // }

  // return `${(seconds / MIN_IN_SEC).toFixed(0)}m`;
};

export const nodeToDatapoint =
  (metric: TAnalyticsMetric) =>
  ({ x, ...metrics }: TQueryNode) => ({
    x: getISODate(x),
    y: metrics[metric] || 0,
  });

export const extractIdAndNodes = (data: TAnalyticsQueryResult | undefined) => {
  const nodes = getNodes(data);
  const id = getOrgId(data);

  const firstNode = R.head(nodes) || ({} as TQueryNode);
  const lastNode = R.last(nodes) || ({} as TQueryNode);

  return {
    id,
    org: {
      nodes,
      firstNode,
      lastNode,
    },
  };
};

export const mapTimeframeToGqlVariables = (
  timeframe: TAnalyticsTimeframe
): { startDate: string } => {
  let startDate = new Date();
  switch (timeframe) {
    case 'month':
      startDate = subDays(new Date(), 30);
      break;
    case 'quarter':
      startDate = subDays(new Date(), 90);
      break;
    case 'year':
      startDate = subDays(new Date(), 365);
      break;
  }

  return {
    startDate: format(startDate, 'yyyy-MM-dd'),
  };
};

export const getGraphColorsByMetric = (
  theme: TTheme
): Record<TAnalyticsMetric, { base: string; dimmed: string } | undefined> => ({
  failRate: {
    base: palette(p => p.accent.danger, theme),
    dimmed: palette(p => p.cta.danger, theme),
  },
  successRate: {
    base: palette(p => p.accent.positive, theme),
    dimmed: palette(p => p.accent.positive.dimmed, theme),
  },
  missRate: {
    base: palette(p => p.accent.boring, theme),
    dimmed: palette(p => p.accent.boring.dimmed, theme),
  },
  onboardingRate: undefined,
  activityRate: undefined,
});

export const isMetricVisualized = (metric: TAnalyticsMetric) =>
  metric !== 'onboardingRate' && metric !== 'activityRate';

export const getDeltaSentimentByMetric = (): Record<
  TAnalyticsMetric,
  TTagType
> => ({
  failRate: 'negative',
  successRate: 'positive',
  missRate: 'negative',
  onboardingRate: 'positive',
  activityRate: 'positive',
});
