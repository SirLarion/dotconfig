/* eslint-disable */
import * as Types from '../../../../../../../types/graphql.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type QuestTemplateQueryVariables = Types.Exact<{
  questId: Types.Scalars['ID'];
}>;

export type QuestTemplateQuery = {
  __typename?: 'Query';
  questTemplates: Array<{
    __typename?: 'QuestTemplate';
    _id: string;
    tag: string;
    attributes?: {
      __typename?: 'QuestTemplateAttributes';
      difficultyEstimate: number;
      language?: string | null;
    } | null;
    tags?: Array<{
      __typename?: 'QuestTemplateTag';
      name: string;
      categoryName: string;
      value: string;
    } | null> | null;
  }>;
};

export type QuestTemplatePreviewQueryVariables = Types.Exact<{
  questId: Types.Scalars['ID'];
  language?: Types.InputMaybe<Types.SUPPORTED_LOCALE>;
}>;

export type QuestTemplatePreviewQuery = {
  __typename?: 'Query';
  questTemplates: Array<{
    __typename?: 'QuestTemplate';
    _id: string;
    preview?: {
      __typename?: 'QuestTemplatePreview';
      subject?: string | null;
      html?: string | null;
      from?: Array<{
        __typename?: 'EmailName';
        address?: string | null;
      } | null> | null;
    } | null;
  }>;
};

export const QuestTemplateDocument = gql`
  query QuestTemplate($questId: ID!) {
    questTemplates(filter: { _id_eq: $questId }) {
      _id
      tag
      attributes {
        difficultyEstimate
        language
      }
      tags {
        name
        categoryName
        value
      }
    }
  }
`;

/**
 * __useQuestTemplateQuery__
 *
 * To run a query within a React component, call `useQuestTemplateQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuestTemplateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuestTemplateQuery({
 *   variables: {
 *      questId: // value for 'questId'
 *   },
 * });
 */
export function useQuestTemplateQuery(
  baseOptions: Apollo.QueryHookOptions<
    QuestTemplateQuery,
    QuestTemplateQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<QuestTemplateQuery, QuestTemplateQueryVariables>(
    QuestTemplateDocument,
    options
  );
}
export function useQuestTemplateLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    QuestTemplateQuery,
    QuestTemplateQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<QuestTemplateQuery, QuestTemplateQueryVariables>(
    QuestTemplateDocument,
    options
  );
}
export type QuestTemplateQueryHookResult = ReturnType<
  typeof useQuestTemplateQuery
>;
export type QuestTemplateLazyQueryHookResult = ReturnType<
  typeof useQuestTemplateLazyQuery
>;
export type QuestTemplateQueryResult = Apollo.QueryResult<
  QuestTemplateQuery,
  QuestTemplateQueryVariables
>;
export const QuestTemplatePreviewDocument = gql`
  query QuestTemplatePreview($questId: ID!, $language: SUPPORTED_LOCALE) {
    questTemplates(filter: { _id_eq: $questId }) {
      _id
      preview(language: $language) {
        subject
        from {
          address
        }
        html
      }
    }
  }
`;

/**
 * __useQuestTemplatePreviewQuery__
 *
 * To run a query within a React component, call `useQuestTemplatePreviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuestTemplatePreviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuestTemplatePreviewQuery({
 *   variables: {
 *      questId: // value for 'questId'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useQuestTemplatePreviewQuery(
  baseOptions: Apollo.QueryHookOptions<
    QuestTemplatePreviewQuery,
    QuestTemplatePreviewQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    QuestTemplatePreviewQuery,
    QuestTemplatePreviewQueryVariables
  >(QuestTemplatePreviewDocument, options);
}
export function useQuestTemplatePreviewLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    QuestTemplatePreviewQuery,
    QuestTemplatePreviewQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    QuestTemplatePreviewQuery,
    QuestTemplatePreviewQueryVariables
  >(QuestTemplatePreviewDocument, options);
}
export type QuestTemplatePreviewQueryHookResult = ReturnType<
  typeof useQuestTemplatePreviewQuery
>;
export type QuestTemplatePreviewLazyQueryHookResult = ReturnType<
  typeof useQuestTemplatePreviewLazyQuery
>;
export type QuestTemplatePreviewQueryResult = Apollo.QueryResult<
  QuestTemplatePreviewQuery,
  QuestTemplatePreviewQueryVariables
>;
