/* eslint-disable */
import * as Types from '@hox/frontend-utils/types/graphql.generated';

import { gql } from '@apollo/client';
import { TestQuestFieldsFragmentFragmentDoc } from '../../graphql/__generated__/fragments.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TestQuestFieldsFragment = {
  __typename?: 'Quest';
  _id: string;
  tag: string;
  state: Types.QuestState;
  startsAt?: any | null;
  user?: {
    __typename?: 'User';
    _id: string;
    emails: Array<{ __typename?: 'EmailAddress'; address: string }>;
    profile: {
      __typename?: 'UserProfile';
      firstName: string;
      lastName?: string | null;
    };
  } | null;
  result?: { __typename?: 'QuestResult'; completedAt: any } | null;
  email?: { __typename?: 'QuestEmail'; subject: string } | null;
  objectives: {
    __typename?: 'QuestObjectives';
    secondary: Array<
      | { __typename?: 'QuestObjectiveMarkers'; completedAt?: any | null }
      | { __typename?: 'QuestObjectiveQuiz'; completedAt?: any | null }
    >;
  };
};

export type FetchOrganizationActiveTestQuestsQueryVariables = Types.Exact<{
  filter?: Types.InputMaybe<Types.Quest_filter>;
}>;

export type FetchOrganizationActiveTestQuestsQuery = {
  __typename?: 'Query';
  currentUser?: {
    __typename?: 'User';
    _id: string;
    organization: {
      __typename?: 'Organization';
      _id: string;
      questsConnection: {
        __typename?: 'QuestConnection';
        totalCount: number;
        nodes: Array<{
          __typename?: 'Quest';
          _id: string;
          tag: string;
          state: Types.QuestState;
          startsAt?: any | null;
          user?: {
            __typename?: 'User';
            _id: string;
            emails: Array<{ __typename?: 'EmailAddress'; address: string }>;
            profile: {
              __typename?: 'UserProfile';
              firstName: string;
              lastName?: string | null;
            };
          } | null;
          result?: { __typename?: 'QuestResult'; completedAt: any } | null;
          email?: { __typename?: 'QuestEmail'; subject: string } | null;
          objectives: {
            __typename?: 'QuestObjectives';
            secondary: Array<
              | {
                  __typename?: 'QuestObjectiveMarkers';
                  completedAt?: any | null;
                }
              | { __typename?: 'QuestObjectiveQuiz'; completedAt?: any | null }
            >;
          };
        }>;
      };
    };
  } | null;
};

export const TestQuestFieldsFragmentDoc = gql`
  fragment TestQuestFields on Quest {
    _id
    ...TestQuestFieldsFragment
  }
  ${TestQuestFieldsFragmentFragmentDoc}
`;
export const FetchOrganizationActiveTestQuestsDocument = gql`
  query FetchOrganizationActiveTestQuests($filter: Quest_filter) {
    currentUser {
      _id
      organization {
        _id
        questsConnection(filter: $filter) {
          totalCount
          nodes {
            ...TestQuestFields
          }
        }
      }
    }
  }
  ${TestQuestFieldsFragmentDoc}
`;

/**
 * __useFetchOrganizationActiveTestQuestsQuery__
 *
 * To run a query within a React component, call `useFetchOrganizationActiveTestQuestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchOrganizationActiveTestQuestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchOrganizationActiveTestQuestsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useFetchOrganizationActiveTestQuestsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FetchOrganizationActiveTestQuestsQuery,
    FetchOrganizationActiveTestQuestsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FetchOrganizationActiveTestQuestsQuery,
    FetchOrganizationActiveTestQuestsQueryVariables
  >(FetchOrganizationActiveTestQuestsDocument, options);
}
export function useFetchOrganizationActiveTestQuestsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchOrganizationActiveTestQuestsQuery,
    FetchOrganizationActiveTestQuestsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FetchOrganizationActiveTestQuestsQuery,
    FetchOrganizationActiveTestQuestsQueryVariables
  >(FetchOrganizationActiveTestQuestsDocument, options);
}
export type FetchOrganizationActiveTestQuestsQueryHookResult = ReturnType<
  typeof useFetchOrganizationActiveTestQuestsQuery
>;
export type FetchOrganizationActiveTestQuestsLazyQueryHookResult = ReturnType<
  typeof useFetchOrganizationActiveTestQuestsLazyQuery
>;
export type FetchOrganizationActiveTestQuestsQueryResult = Apollo.QueryResult<
  FetchOrganizationActiveTestQuestsQuery,
  FetchOrganizationActiveTestQuestsQueryVariables
>;
