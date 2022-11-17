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
  label: ReactNode;
  latestValue: ReactNode;
  delta: number;
  color: { base: string; dimmed: string };
  latestComparison?: ReactNode;
  series?: TSerieProps[];
}

export type TAnalyticsByMetric = Record<
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
          comparisonDataSet: {
            nodes: TQueryNode[];
          };
        } | null;
      } | null;
    };
  } | null;
};
