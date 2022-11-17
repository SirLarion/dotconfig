/* eslint-disable */
import * as Types from '@hox/frontend-utils/types/graphql.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetOrgAndIndustryAnalyticsQueryVariables = Types.Exact<{
  startDate?: Types.InputMaybe<Types.Scalars['Timestamp']>;
}>;

export type GetOrgAndIndustryAnalyticsQuery = {
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
            __typename?: 'AnalyticsCubesBetaDailyOrganizationPerformanceRatesSnapshotConnection';
            nodes: Array<{
              __typename?: 'AnalyticsCubesBetaDailyOrganizationPerformanceRatesSnapshot';
              x: any;
              successRate?: number | null;
              failRate?: number | null;
              missRate?: number | null;
              onboardingRate?: number | null;
              activityRate?: number | null;
            }>;
          };
          comparisonDataSet: {
            __typename?: 'AnalyticsCubesBetaDailyIndustryComparisonRatesSnapshotConnection';
            nodes: Array<{
              __typename?: 'AnalyticsCubesBetaDailyIndustryComparisonRatesSnapshot';
              onboardingRate?: number | null;
              activityRate?: number | null;
              x: any;
              successRate?: number | null;
              failRate?: number | null;
              missRate?: number | null;
            }>;
          };
        } | null;
      } | null;
    };
  } | null;
};

export const GetOrgAndIndustryAnalyticsDocument = gql`
  query GetOrgAndIndustryAnalytics($startDate: Timestamp) {
    currentUser {
      organization {
        _id
        analytics {
          analyticsCubesBeta {
            dataSet: dailyOrganizationPerformanceRatesSnapshot(
              filter: { timestamp_gt: $startDate }
              orderBy: timestamp_asc
            ) {
              nodes {
                x: timestamp
                successRate: obSimSuccessRate30D
                failRate: obSimFailRate30D
                missRate: obSimMissRate30D
                onboardingRate: obSimSuccessRate30D
                activityRate: obSimSuccessRate30D
              }
            }
            comparisonDataSet: dailyIndustryComparisonRatesSnapshot(
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
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetOrgAndIndustryAnalyticsQuery__
 *
 * To run a query within a React component, call `useGetOrgAndIndustryAnalyticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrgAndIndustryAnalyticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrgAndIndustryAnalyticsQuery({
 *   variables: {
 *      startDate: // value for 'startDate'
 *   },
 * });
 */
export function useGetOrgAndIndustryAnalyticsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetOrgAndIndustryAnalyticsQuery,
    GetOrgAndIndustryAnalyticsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetOrgAndIndustryAnalyticsQuery,
    GetOrgAndIndustryAnalyticsQueryVariables
  >(GetOrgAndIndustryAnalyticsDocument, options);
}
export function useGetOrgAndIndustryAnalyticsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetOrgAndIndustryAnalyticsQuery,
    GetOrgAndIndustryAnalyticsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetOrgAndIndustryAnalyticsQuery,
    GetOrgAndIndustryAnalyticsQueryVariables
  >(GetOrgAndIndustryAnalyticsDocument, options);
}
export type GetOrgAndIndustryAnalyticsQueryHookResult = ReturnType<
  typeof useGetOrgAndIndustryAnalyticsQuery
>;
export type GetOrgAndIndustryAnalyticsLazyQueryHookResult = ReturnType<
  typeof useGetOrgAndIndustryAnalyticsLazyQuery
>;
export type GetOrgAndIndustryAnalyticsQueryResult = Apollo.QueryResult<
  GetOrgAndIndustryAnalyticsQuery,
  GetOrgAndIndustryAnalyticsQueryVariables
>;
