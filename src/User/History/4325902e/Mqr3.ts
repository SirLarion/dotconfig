/* eslint-disable */
import * as Types from '@hox/frontend-utils/types/graphql.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OrgEmailDeliverySettingsFragment = {
  __typename?: 'Organization';
  _id: string;
  emailEnvironment?: Types.EmailEnvironment | null;
  delivery: {
    __typename?: 'OrgDeliverySettings';
    email?: {
      __typename?: 'EmailDeliverySettings';
      useDkim?: boolean | null;
      useGmailDeliveryApi?: boolean | null;
    } | null;
  };
};

export type GetCurrentUserOrgEmailDeliverySettingsQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type GetCurrentUserOrgEmailDeliverySettingsQuery = {
  __typename?: 'Query';
  app: {
    __typename?: 'App';
    publicSettings?: {
      __typename?: 'PublicSettings';
      gmailApi: {
        __typename?: 'GmailApiSettings';
        clientId: string;
        requiredScopes: Array<string>;
      };
    } | null;
  };
  currentUser?: {
    __typename?: 'User';
    _id: string;
    organization: {
      __typename?: 'Organization';
      _id: string;
      emailEnvironment?: Types.EmailEnvironment | null;
      delivery: {
        __typename?: 'OrgDeliverySettings';
        email?: {
          __typename?: 'EmailDeliverySettings';
          useDkim?: boolean | null;
          useGmailDeliveryApi?: boolean | null;
        } | null;
      };
    };
  } | null;
};

export const OrgEmailDeliverySettingsFragmentDoc = gql`
  fragment OrgEmailDeliverySettings on Organization {
    _id
    emailEnvironment
    delivery {
      email {
        useDkim
        useGmailDeliveryApi
      }
    }
  }
`;
export const GetCurrentUserOrgEmailDeliverySettingsDocument = gql`
  query GetCurrentUserOrgEmailDeliverySettings {
    app {
      publicSettings {
        gmailApi {
          clientId
          requiredScopes
        }
      }
    }
    currentUser {
      _id
      organization {
        ...OrgEmailDeliverySettings
      }
    }
  }
  ${OrgEmailDeliverySettingsFragmentDoc}
`;

/**
 * __useGetCurrentUserOrgEmailDeliverySettingsQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserOrgEmailDeliverySettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserOrgEmailDeliverySettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserOrgEmailDeliverySettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserOrgEmailDeliverySettingsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCurrentUserOrgEmailDeliverySettingsQuery,
    GetCurrentUserOrgEmailDeliverySettingsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetCurrentUserOrgEmailDeliverySettingsQuery,
    GetCurrentUserOrgEmailDeliverySettingsQueryVariables
  >(GetCurrentUserOrgEmailDeliverySettingsDocument, options);
}
export function useGetCurrentUserOrgEmailDeliverySettingsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCurrentUserOrgEmailDeliverySettingsQuery,
    GetCurrentUserOrgEmailDeliverySettingsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetCurrentUserOrgEmailDeliverySettingsQuery,
    GetCurrentUserOrgEmailDeliverySettingsQueryVariables
  >(GetCurrentUserOrgEmailDeliverySettingsDocument, options);
}
export type GetCurrentUserOrgEmailDeliverySettingsQueryHookResult = ReturnType<
  typeof useGetCurrentUserOrgEmailDeliverySettingsQuery
>;
export type GetCurrentUserOrgEmailDeliverySettingsLazyQueryHookResult =
  ReturnType<typeof useGetCurrentUserOrgEmailDeliverySettingsLazyQuery>;
export type GetCurrentUserOrgEmailDeliverySettingsQueryResult =
  Apollo.QueryResult<
    GetCurrentUserOrgEmailDeliverySettingsQuery,
    GetCurrentUserOrgEmailDeliverySettingsQueryVariables
  >;
