/* eslint-disable */
import * as Types from '@hox/frontend-utils/types/graphql.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetIndustryAnalyticsQueryVariables = Types.Exact<{
  startDate?: Types.InputMaybe<Types.Scalars['Timestamp']>;
}>;

export type GetIndustryAnalyticsQuery = {
  __typename?: 'Query';
  currentUser?: {
    __typename?: 'User';
    organization: {
      __typename?: 'Organization';
      _id: string;
      analytics?: {
        __typename?: 'OrganizationAnalytics';
        analyticsCubesBeta?: {
          __typename?: 'AnalyticsCubesBeta';
          dataSet: {
            __typename?: 'AnalyticsCubesBetaDailyIndustryComparisonRatesSnapshotConnection';
            nodes: Array<{
              __typename?: 'AnalyticsCubesBetaDailyIndustryComparisonRatesSnapshot';
              onboardingRate?: number | null;
              activityRate?: number | null;
              x: any;
              successRate?: number | null;
              failRate?: number | null;
              missRate?: number | null;
              reportingTime?: number | null;
            }>;
          };
        } | null;
      } | null;
    };
  } | null;
};

export const GetIndustryAnalyticsDocument = gql`
  query GetIndustryAnalytics($startDate: Timestamp) {
    currentUser {
      organization {
        _id
        analytics {
          analyticsCubesBeta {
            dataSet: dailyIndustryComparisonRatesSnapshot(
              filter: { timestamp_gt: $startDate }
              orderBy: timestamp_asc
            ) {
              nodes {
                x: timestamp
                successRate: obSimSuccessRate30D
                failRate: obSimFailRate30D
                missRate: obSimMissRate30D
                onboardingRate
                activityRate
                reportingTime: avgOrgSuccessSpeedSec30D
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetIndustryAnalyticsQuery__
 *
 * To run a query within a React component, call `useGetIndustryAnalyticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIndustryAnalyticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIndustryAnalyticsQuery({
 *   variables: {
 *      startDate: // value for 'startDate'
 *   },
 * });
 */
export function useGetIndustryAnalyticsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetIndustryAnalyticsQuery,
    GetIndustryAnalyticsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetIndustryAnalyticsQuery,
    GetIndustryAnalyticsQueryVariables
  >(GetIndustryAnalyticsDocument, options);
}
export function useGetIndustryAnalyticsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetIndustryAnalyticsQuery,
    GetIndustryAnalyticsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetIndustryAnalyticsQuery,
    GetIndustryAnalyticsQueryVariables
  >(GetIndustryAnalyticsDocument, options);
}
export type GetIndustryAnalyticsQueryHookResult = ReturnType<
  typeof useGetIndustryAnalyticsQuery
>;
export type GetIndustryAnalyticsLazyQueryHookResult = ReturnType<
  typeof useGetIndustryAnalyticsLazyQuery
>;
export type GetIndustryAnalyticsQueryResult = Apollo.QueryResult<
  GetIndustryAnalyticsQuery,
  GetIndustryAnalyticsQueryVariables
>;
