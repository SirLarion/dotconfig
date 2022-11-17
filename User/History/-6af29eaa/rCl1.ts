/* eslint-disable */
import * as Types from '@hox/frontend-utils/types/graphql.generated';

import { gql } from '@apollo/client';
export type IcuFieldsFragment = {
  __typename?: 'IcuMessage';
  id: string;
  defaultMessage: string;
  description: string;
};

export type EmailAddressFieldsFragment = {
  __typename?: 'EmailName';
  address?: string | null;
  name?: string | null;
};

export const IcuFieldsFragmentDoc = gql`
  fragment IcuFields on IcuMessage {
    id
    defaultMessage
    description
  }
`;
export const EmailAddressFieldsFragmentDoc = gql`
  fragment EmailAddressFields on EmailName {
    address
    name
  }
`;
