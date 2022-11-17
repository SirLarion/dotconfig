/* eslint-disable */
import * as Types from '@hox/frontend-utils/types/graphql.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type VectorTagsQueryQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type VectorTagsQueryQuery = {
  __typename?: 'Query';
  vectorTags?: Array<{
    __typename?: 'Tag';
    categoryName: string;
    name: string;
  } | null> | null;
};

export const VectorTagsQueryDocument = gql`
  query VectorTagsQuery {
    vectorTags {
      categoryName
      name
    }
  }
`;

/**
 * __useVectorTagsQueryQuery__
 *
 * To run a query within a React component, call `useVectorTagsQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useVectorTagsQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVectorTagsQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useVectorTagsQueryQuery(
  baseOptions?: Apollo.QueryHookOptions<
    VectorTagsQueryQuery,
    VectorTagsQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<VectorTagsQueryQuery, VectorTagsQueryQueryVariables>(
    VectorTagsQueryDocument,
    options
  );
}
export function useVectorTagsQueryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    VectorTagsQueryQuery,
    VectorTagsQueryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    VectorTagsQueryQuery,
    VectorTagsQueryQueryVariables
  >(VectorTagsQueryDocument, options);
}
export type VectorTagsQueryQueryHookResult = ReturnType<
  typeof useVectorTagsQueryQuery
>;
export type VectorTagsQueryLazyQueryHookResult = ReturnType<
  typeof useVectorTagsQueryLazyQuery
>;
export type VectorTagsQueryQueryResult = Apollo.QueryResult<
  VectorTagsQueryQuery,
  VectorTagsQueryQueryVariables
>;
