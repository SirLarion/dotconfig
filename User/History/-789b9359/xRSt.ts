import { FC, ReactNode } from 'react';

import { TSerieProps } from '@hox/ui/LineGraph/types';

import { ANALYTICS_METRICS } from './constants';

export type TAnalyticsTimeframe = 'month' | 'quarter' | 'year';
export type TAnalyticsMetric = typeof ANALYTICS_METRICS[number];

export type TGraphColor = 'red' | 'green' | 'blue' | 'gray';

export interface IAnalyticsQueryVariables {
  startDate?: string;
  endDate?: string;
  [key: string]: string | number | Date | undefined;
}

export interface IAnalyticsComponentProps {
  metric: TAnalyticsMetric;
  label: ReactNode;
  latestValue: number;
  series: TSerieProps[];
  delta: number;
  deltaSentiment: number;
  graphColor: { base: string; dimmed: string };
  latestComparison?: number;
}

export type TGroupedAnalytics = Record<
  TAnalyticsMetric,
  Omit<IAnalyticsComponentProps, 'label'>
>;

export type TAnalyticsComponent = FC<IAnalyticsComponentProps>;

export type TAnalyticsCard = {
  label: ReactNode;
  metric: TAnalyticsMetric;
  AnalyticsComponent: TAnalyticsComponent;
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
