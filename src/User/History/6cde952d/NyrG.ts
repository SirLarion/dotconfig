/* eslint-disable */
import * as Types from '../../../../../../types/graphql.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CurrentUserOrganizationDefaultSettingsQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type CurrentUserOrganizationDefaultSettingsQuery = {
  __typename?: 'Query';
  currentUser?: {
    __typename?: 'User';
    _id: string;
    organization: {
      __typename?: 'Organization';
      _id: string;
      game: {
        __typename?: 'OrgGameSettings';
        defaultGameMode?: Types.USER_GAME_MODE | null;
        usersAreAnonymousByDefault: boolean;
      };
      domains: Array<{
        __typename?: 'Domain';
        name: string;
        defaultUiLanguage?: string | null;
        defaultSimulationLanguages?: Array<string> | null;
        allowedSimulationLanguages?: Array<string> | null;
      }>;
    };
  } | null;
};

export const CurrentUserOrganizationDefaultSettingsDocument = gql`
  query CurrentUserOrganizationDefaultSettings {
    currentUser {
      _id
      organization {
        _id
        game {
          defaultGameMode
          usersAreAnonymousByDefault
        }
        domains {
          name
          defaultUiLanguage
          defaultSimulationLanguages
          allowedSimulationLanguages
        }
      }
    }
  }
`;

/**
 * __useCurrentUserOrganizationDefaultSettingsQuery__
 *
 * To run a query within a React component, call `useCurrentUserOrganizationDefaultSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserOrganizationDefaultSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserOrganizationDefaultSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserOrganizationDefaultSettingsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    CurrentUserOrganizationDefaultSettingsQuery,
    CurrentUserOrganizationDefaultSettingsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    CurrentUserOrganizationDefaultSettingsQuery,
    CurrentUserOrganizationDefaultSettingsQueryVariables
  >(CurrentUserOrganizationDefaultSettingsDocument, options);
}
export function useCurrentUserOrganizationDefaultSettingsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CurrentUserOrganizationDefaultSettingsQuery,
    CurrentUserOrganizationDefaultSettingsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    CurrentUserOrganizationDefaultSettingsQuery,
    CurrentUserOrganizationDefaultSettingsQueryVariables
  >(CurrentUserOrganizationDefaultSettingsDocument, options);
}
export type CurrentUserOrganizationDefaultSettingsQueryHookResult = ReturnType<
  typeof useCurrentUserOrganizationDefaultSettingsQuery
>;
export type CurrentUserOrganizationDefaultSettingsLazyQueryHookResult =
  ReturnType<typeof useCurrentUserOrganizationDefaultSettingsLazyQuery>;
export type CurrentUserOrganizationDefaultSettingsQueryResult =
  Apollo.QueryResult<
    CurrentUserOrganizationDefaultSettingsQuery,
    CurrentUserOrganizationDefaultSettingsQueryVariables
  >;
