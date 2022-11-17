import { useEffect, useState } from 'react';

// import { GetOnboardingRateTimeseriesDataQuery } from './__generated__/GetOnboardingRateTimeseries.generated';
import mockData from './mock.json';

export type GetOnboardingRateTimeseriesDataQuery = {
  __typename?: 'Query';
  currentUser?: {
    __typename?: 'User';
    _id: string;
    organization: {
      __typename?: 'Organization';
      _id: string;
      analytics?: {
        __typename?: 'OrganizationAnalytics';
        analyticsCubesBeta?: {
          __typename?: 'AnalyticsCubesBeta';
          data: {
            __typename?: 'AnalyticsCubesBetaDailyUserTypeCountsSnapshotAggregateConnection';
            nodes: Array<{
              __typename?: 'AnalyticsCubesBetaDailyUserTypeCountsSnapshotAggregate';
              group: Array<{
                __typename?: 'KeyValue';
                key?: string | null;
                x?: string | null;
              }>;
              aggregate?: {
                __typename?: 'AnalyticsCubesBetaDailyUserTypeCountsSnapshotAggregateSum';
                ySubset?: number | null;
                yTotal?: number | null;
              } | null;
            }>;
          };
        } | null;
      } | null;
    };
  } | null;
};

export const useMockData = () => {
  const [data, setData] = useState<
    GetOnboardingRateTimeseriesDataQuery | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData(mockData.data);
      setLoading(false);
    }, 500);
  }, []);

  return {
    data,
    loading,
  };
};
