/* eslint-disable */
import * as Types from '../../../../types/graphql.generated';

import { gql } from '@apollo/client';
export type UserLocaleFragment = { __typename?: 'User', _id: string, profile: { __typename?: 'UserProfile', locale: { __typename?: 'Locale', ui?: string | null } } };

export type UserRoleFragment = { __typename?: 'User', _id: string, isAdmin: boolean, isSuperAdmin: boolean };

export const UserLocaleFragmentDoc = gql`
    fragment UserLocale on User {
  _id
  profile {
    locale {
      ui
    }
  }
}
    `;
export const UserRoleFragmentDoc = gql`
    fragment UserRole on User {
  _id
  isAdmin
  isSuperAdmin
}
    `;