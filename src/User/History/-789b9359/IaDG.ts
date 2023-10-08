import { ReactNode } from 'react';

import { TSerieProps } from '@hox/ui/LineGraph/types';
import { IDualMetricAnalyticsCardProps } from '@hox/ui/src/AnalyticsCard/components/DualMetricAnalyticsCard';

import { ANALYTICS_METRICS } from './constants';

export type TAnalyticsTimeframe = 'month' | 'quarter' | 'year';
export type TAnalyticsMetric = typeof ANALYTICS_METRICS[number];

export type TGraphColor = 'red' | 'green' | 'blue' | 'gray';

export interface IAnalyticsQueryVariables {
  startDate?: string;
  endDate?: string;
  [key: string]: string | number | Date | undefined;
}

export type TGroupedAnalytics = Record<
  TAnalyticsMetric,
  Pick<IDualMetricAnalyticsCardProps, 'series' | 'latestValue' | 'delta'>
>;

export type TAnalyticsCard = {
  title: ReactNode;
  metric: TAnalyticsMetric;
};

export type TQueryNode = Partial<
  Record<TAnalyticsMetric, number | null | undefined>
> & {
  x?: string | null | undefined;
};

export type TAnalyticsQueryResult = {
  currentUser?: {
    organization: {
      _id: string;
      analytics?: {
        analyticsCubesBeta?: {
          dataSet: {
            nodes: TQueryNode[];
          };
        } | null;
      } | null;
    };
  } | null;
};