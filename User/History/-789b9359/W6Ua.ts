import { TSerieProps } from '@hox/ui/LineGraph/types';
import { FC, ReactNode } from 'react';

import { ANALYTICS_METRICS } from './constants';

export type TAnalyticsTimeframe = 'month' | 'quarter' | 'year';
export type TAnalyticsMetric = typeof ANALYTICS_METRICS[number];

export type TGraphColor = 'red' | 'green' | 'blue' | 'gray';

export interface IAnalyticsQueryVariables {
  startDate?: string;
  endDate?: string;
  [key: string]: string | number | Date | undefined;
}

export interface IAnalyticsCardProps {
  label: ReactNode;
  metric: TAnalyticsMetric;
  queryVariables?: IAnalyticsQueryVariables;
  graphColor?: TGraphColor;
}

export interface IAnalyticsComponentProps {
  label: ReactNode;
  latestValue: ReactNode;
  lastestComparison?: ReactNode;
  series?: TSerieProps[];
}

export type TAnalyticsByMetric = Record<
  TAnalyticsMetric,
  IAnalyticsComponentProps
>;

export type TAnalyticsComponent = FC<IAnalyticsComponentProps>;

export type TQueryNode = Record<TAnalyticsMetric, number> & {
  x: string;
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
          comparisonDataSet?: {
            nodes: TQueryNode[];
          };
        } | null;
      } | null;
    };
  } | null;
};
