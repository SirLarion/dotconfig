/* eslint-disable */
import * as Types from '@hox/frontend-utils/types/graphql.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetOrganizationListQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type GetOrganizationListQuery = {
  __typename?: 'Query';
  organizations: Array<{
    __typename?: 'Organization';
    _id: string;
    name: string;
  }>;
};

export const GetOrganizationListDocument = gql`
  query GetOrganizationList {
    organizations {
      _id
      name
    }
  }
`;

/**
 * __useGetOrganizationListQuery__
 *
 * To run a query within a React component, call `useGetOrganizationListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrganizationListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrganizationListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOrganizationListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetOrganizationListQuery,
    GetOrganizationListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetOrganizationListQuery,
    GetOrganizationListQueryVariables
  >(GetOrganizationListDocument, options);
}
export function useGetOrganizationListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetOrganizationListQuery,
    GetOrganizationListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetOrganizationListQuery,
    GetOrganizationListQueryVariables
  >(GetOrganizationListDocument, options);
}
export type GetOrganizationListQueryHookResult = ReturnType<
  typeof useGetOrganizationListQuery
>;
export type GetOrganizationListLazyQueryHookResult = ReturnType<
  typeof useGetOrganizationListLazyQuery
>;
export type GetOrganizationListQueryResult = Apollo.QueryResult<
  GetOrganizationListQuery,
  GetOrganizationListQueryVariables
>;
