/* eslint-disable */
import * as Types from '@hox/frontend-utils/types/graphql.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetQuizTemplateIdsQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type GetQuizTemplateIdsQuery = {
  __typename?: 'Query';
  quizModules: Array<{
    __typename?: 'QuizModule';
    quizTemplateIds: Array<string | null>;
    _id: string;
    name: { __typename?: 'IcuMessage'; defaultMessage: string };
  }>;
};

export type GetQuizTemplatesQueryVariables = Types.Exact<{
  quizTemplateIds:
    | Array<Types.InputMaybe<Types.Scalars['ID']>>
    | Types.InputMaybe<Types.Scalars['ID']>;
}>;

export type GetQuizTemplatesQuery = {
  __typename?: 'Query';
  quizTemplates: Array<{
    __typename?: 'QuizTemplate';
    tag: string;
    _id: string;
  }>;
};

export const GetQuizTemplateIdsDocument = gql`
  query GetQuizTemplateIds {
    quizModules {
      name {
        defaultMessage
      }
      quizTemplateIds
      _id
    }
  }
`;

/**
 * __useGetQuizTemplateIdsQuery__
 *
 * To run a query within a React component, call `useGetQuizTemplateIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuizTemplateIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuizTemplateIdsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetQuizTemplateIdsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetQuizTemplateIdsQuery,
    GetQuizTemplateIdsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetQuizTemplateIdsQuery,
    GetQuizTemplateIdsQueryVariables
  >(GetQuizTemplateIdsDocument, options);
}
export function useGetQuizTemplateIdsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetQuizTemplateIdsQuery,
    GetQuizTemplateIdsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetQuizTemplateIdsQuery,
    GetQuizTemplateIdsQueryVariables
  >(GetQuizTemplateIdsDocument, options);
}
export type GetQuizTemplateIdsQueryHookResult = ReturnType<
  typeof useGetQuizTemplateIdsQuery
>;
export type GetQuizTemplateIdsLazyQueryHookResult = ReturnType<
  typeof useGetQuizTemplateIdsLazyQuery
>;
export type GetQuizTemplateIdsQueryResult = Apollo.QueryResult<
  GetQuizTemplateIdsQuery,
  GetQuizTemplateIdsQueryVariables
>;
export const GetQuizTemplatesDocument = gql`
  query GetQuizTemplates($quizTemplateIds: [ID]!) {
    quizTemplates(filter: { _id_in: $quizTemplateIds }) {
      tag
      _id
    }
  }
`;

/**
 * __useGetQuizTemplatesQuery__
 *
 * To run a query within a React component, call `useGetQuizTemplatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuizTemplatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuizTemplatesQuery({
 *   variables: {
 *      quizTemplateIds: // value for 'quizTemplateIds'
 *   },
 * });
 */
export function useGetQuizTemplatesQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetQuizTemplatesQuery,
    GetQuizTemplatesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetQuizTemplatesQuery, GetQuizTemplatesQueryVariables>(
    GetQuizTemplatesDocument,
    options
  );
}
export function useGetQuizTemplatesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetQuizTemplatesQuery,
    GetQuizTemplatesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetQuizTemplatesQuery,
    GetQuizTemplatesQueryVariables
  >(GetQuizTemplatesDocument, options);
}
export type GetQuizTemplatesQueryHookResult = ReturnType<
  typeof useGetQuizTemplatesQuery
>;
export type GetQuizTemplatesLazyQueryHookResult = ReturnType<
  typeof useGetQuizTemplatesLazyQuery
>;
export type GetQuizTemplatesQueryResult = Apollo.QueryResult<
  GetQuizTemplatesQuery,
  GetQuizTemplatesQueryVariables
>;
