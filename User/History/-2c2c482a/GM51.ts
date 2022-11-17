import { gql } from '@apollo/client';
import { UserLocaleFragmentDoc } from '../../../../graphql/fragments/user/__generated__/user.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetCurrentUserLocaleQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetCurrentUserLocaleQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', _id: string, profile: { __typename?: 'UserProfile', locale: { __typename?: 'Locale', ui?: string | null } } } | null };


export const GetCurrentUserLocaleDocument = gql`
    query GetCurrentUserLocale {
  currentUser {
    _id
    ...UserLocale
  }
}
    ${UserLocaleFragmentDoc}`;

/**
 * __useGetCurrentUserLocaleQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserLocaleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserLocaleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserLocaleQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserLocaleQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserLocaleQuery, GetCurrentUserLocaleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserLocaleQuery, GetCurrentUserLocaleQueryVariables>(GetCurrentUserLocaleDocument, options);
      }
export function useGetCurrentUserLocaleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserLocaleQuery, GetCurrentUserLocaleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserLocaleQuery, GetCurrentUserLocaleQueryVariables>(GetCurrentUserLocaleDocument, options);
        }
export type GetCurrentUserLocaleQueryHookResult = ReturnType<typeof useGetCurrentUserLocaleQuery>;
export type GetCurrentUserLocaleLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLocaleLazyQuery>;
export type GetCurrentUserLocaleQueryResult = Apollo.QueryResult<GetCurrentUserLocaleQuery, GetCurrentUserLocaleQueryVariables>;