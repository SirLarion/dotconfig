/* eslint-disable */
import * as Types from '../../../../../types/graphql.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OrganizationUserFragment = {
  __typename?: 'User';
  _id: string;
  roles: Array<string>;
  status: Types.USER_STATUS;
  willBeHardDeletedAt?: any | null;
  profile: {
    __typename?: 'UserProfile';
    firstName: string;
    lastName?: string | null;
    city?: string | null;
    country?: string | null;
    site?: string | null;
    department?: string | null;
    isAnonymous: boolean;
    spicyModeEnabled: boolean;
    locale: {
      __typename?: 'Locale';
      quests: Array<string>;
      ui?: string | null;
    };
  };
  emails: Array<{ __typename?: 'EmailAddress'; address: string }>;
  game: { __typename?: 'Game'; mode: Types.USER_GAME_MODE; active: boolean };
  player: {
    __typename?: 'Player';
    stars?: number | null;
    stats: {
      __typename?: 'Stats';
      total: number;
      success: number;
      missed: number;
      failed: number;
      failureRate: number;
      last10Quests: Array<string | null>;
    };
  };
};

export type GetOrganizationUsersQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  sort?: Types.InputMaybe<
    Array<Types.InputMaybe<Types.User_sort>> | Types.InputMaybe<Types.User_sort>
  >;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  filter?: Types.InputMaybe<Types.User_filter>;
}>;

export type GetOrganizationUsersQuery = {
  __typename?: 'Query';
  currentUser?: {
    __typename?: 'User';
    _id: string;
    organization: {
      __typename?: 'Organization';
      _id: string;
      scim?: {
        __typename?: 'OrgScimSettings';
        authToken?: {
          __typename?: 'OrgScimAuthToken';
          createdAt?: any | null;
        } | null;
      } | null;
      usersConnection: {
        __typename?: 'UserConnection';
        totalCount: number;
        nodes: Array<{
          __typename?: 'User';
          _id: string;
          roles: Array<string>;
          status: Types.USER_STATUS;
          willBeHardDeletedAt?: any | null;
          profile: {
            __typename?: 'UserProfile';
            firstName: string;
            lastName?: string | null;
            city?: string | null;
            country?: string | null;
            site?: string | null;
            department?: string | null;
            isAnonymous: boolean;
            spicyModeEnabled: boolean;
            locale: {
              __typename?: 'Locale';
              quests: Array<string>;
              ui?: string | null;
            };
          };
          emails: Array<{ __typename?: 'EmailAddress'; address: string }>;
          game: {
            __typename?: 'Game';
            mode: Types.USER_GAME_MODE;
            active: boolean;
          };
          player: {
            __typename?: 'Player';
            stars?: number | null;
            stats: {
              __typename?: 'Stats';
              total: number;
              success: number;
              missed: number;
              failed: number;
              failureRate: number;
              last10Quests: Array<string | null>;
            };
          };
        }>;
      };
    };
  } | null;
};

export const OrganizationUserFragmentDoc = gql`
  fragment OrganizationUser on User {
    _id
    roles
    profile {
      firstName
      lastName
      city
      country
      site
      department
      isAnonymous
      spicyModeEnabled
      locale {
        quests
        ui
      }
    }
    emails {
      address
    }
    status
    willBeHardDeletedAt
    game {
      mode
      active
    }
    player {
      stars
      stats {
        total
        success
        missed
        failed
        failureRate
        last10Quests
      }
    }
  }
`;
export const GetOrganizationUsersDocument = gql`
  query GetOrganizationUsers(
    $first: Int
    $skip: Int
    $sort: [User_sort]
    $search: String
    $filter: User_filter
  ) {
    currentUser {
      _id
      organization {
        _id
        scim {
          authToken {
            createdAt
          }
        }
        usersConnection(
          first: $first
          skip: $skip
          sort: $sort
          search: $search
          filter: $filter
        ) {
          totalCount
          nodes {
            ...OrganizationUser
          }
        }
      }
    }
  }
  ${OrganizationUserFragmentDoc}
`;

/**
 * __useGetOrganizationUsersQuery__
 *
 * To run a query within a React component, call `useGetOrganizationUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrganizationUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrganizationUsersQuery({
 *   variables: {
 *      first: // value for 'first'
 *      skip: // value for 'skip'
 *      sort: // value for 'sort'
 *      search: // value for 'search'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetOrganizationUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetOrganizationUsersQuery,
    GetOrganizationUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetOrganizationUsersQuery,
    GetOrganizationUsersQueryVariables
  >(GetOrganizationUsersDocument, options);
}
export function useGetOrganizationUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetOrganizationUsersQuery,
    GetOrganizationUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetOrganizationUsersQuery,
    GetOrganizationUsersQueryVariables
  >(GetOrganizationUsersDocument, options);
}
export type GetOrganizationUsersQueryHookResult = ReturnType<
  typeof useGetOrganizationUsersQuery
>;
export type GetOrganizationUsersLazyQueryHookResult = ReturnType<
  typeof useGetOrganizationUsersLazyQuery
>;
export type GetOrganizationUsersQueryResult = Apollo.QueryResult<
  GetOrganizationUsersQuery,
  GetOrganizationUsersQueryVariables
>;
