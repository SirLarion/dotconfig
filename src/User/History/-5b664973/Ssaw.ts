export type TQueryNode = {
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
export type TTimeseriesQueryResult = {
  currentUser?: {
    organization: {
      _id: string;
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

export interface ITimeseriesQueryVariables
  extends IAnalyticsQueryBaseVariables {
  start?: string;
  end?: string;
}

export interface ITimeseriesCardProps {
  query: TAnalyticsQuery<TTimeseriesQueryResult, ITimeseriesQueryVariables>;
  variables: ITimeseriesQueryVariables;
}
