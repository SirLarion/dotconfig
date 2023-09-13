import { format, formatISO9075, subDays } from 'date-fns';
import * as R from 'ramda';

import { TTagType } from '@hox/ui/DeltaTag';
import { TDisplayFormatFunction } from '@hox/ui/src/AnalyticsCard/types';
import { palette, TTheme } from '@hox/ui/styles/theme';

import {
  TAnalyticsMetric,
  TAnalyticsQueryResult,
  TAnalyticsTimeframe,
  TQueryNode,
} from './types';

const MIN_IN_SEC = 60;
const HOUR_IN_SEC = 60 * MIN_IN_SEC;

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

export const getDeltas =
  (nodeA?: TQueryNode, nodeB?: TQueryNode) => (metric: TAnalyticsMetric) => {
    const a = nodeA?.[metric];
    const b = nodeB?.[metric];

    if (!b) {
      return undefined;
    }

    if (!a) {
      return 1.0;
    }

    return ((b - a) / a) * 100;
  };

const getISODate = (x: string | null | undefined) =>
  x ? formatISO9075(new Date(x), { representation: 'date' }) : x;

export const durationToDisplayValue: TDisplayFormatFunction = (
  seconds?: number
) => {
  if (seconds === undefined || seconds < 0) {
    return '---';
  }

  const hours = Math.floor(seconds / HOUR_IN_SEC);
  const minutes = Math.floor((seconds - hours * HOUR_IN_SEC) / MIN_IN_SEC);

  return `${hours}h ${minutes}m`;
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

  return {
    id,
    nodes,
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
  reportingTime: undefined,
  activityRate: undefined,
});

export const isMetricVisualized = (metric: TAnalyticsMetric) =>
  metric !== 'onboardingRate' &&
  metric !== 'activityRate' &&
  metric !== 'reportingTime';

export const getDeltaSentimentByMetric = (): Record<
  TAnalyticsMetric,
  TTagType
> => ({
  failRate: 'negative',
  successRate: 'positive',
  missRate: 'negative',
  onboardingRate: 'positive',
  reportingTime: 'negative',
  activityRate: 'positive',
});
