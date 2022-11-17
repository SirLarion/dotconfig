/* eslint-disable */
import * as Types from '@hox/frontend-utils/types/graphql.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateUserEmailAddressMutationVariables = Types.Exact<{
  userId: Types.Scalars['ID'];
  organizationId: Types.Scalars['ID'];
  emailAddress: Types.Scalars['String'];
}>;


export type UpdateUserEmailAddressMutation = { __typename?: 'Mutation', updated?: { __typename?: 'User', _id: string, emails: Array<{ __typename?: 'EmailAddress', address: string }> } | null };


export const UpdateUserEmailAddressDocument = gql`
    mutation UpdateUserEmailAddress($userId: ID!, $organizationId: ID!, $emailAddress: String!) {
  updated: updateUserEmailAddress(
    userId: $userId
    organizationId: $organizationId
    emailAddress: $emailAddress
  ) {
    _id
    emails {
      address
    }
  }
}
    `;
export type UpdateUserEmailAddressMutationFn = Apollo.MutationFunction<UpdateUserEmailAddressMutation, UpdateUserEmailAddressMutationVariables>;

/**
 * __useUpdateUserEmailAddressMutation__
 *
 * To run a mutation, you first call `useUpdateUserEmailAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserEmailAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserEmailAddressMutation, { data, loading, error }] = useUpdateUserEmailAddressMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      organizationId: // value for 'organizationId'
 *      emailAddress: // value for 'emailAddress'
 *   },
 * });
 */
export function useUpdateUserEmailAddressMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserEmailAddressMutation, UpdateUserEmailAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserEmailAddressMutation, UpdateUserEmailAddressMutationVariables>(UpdateUserEmailAddressDocument, options);
      }
export type UpdateUserEmailAddressMutationHookResult = ReturnType<typeof useUpdateUserEmailAddressMutation>;
export type UpdateUserEmailAddressMutationResult = Apollo.MutationResult<UpdateUserEmailAddressMutation>;
export type UpdateUserEmailAddressMutationOptions = Apollo.BaseMutationOptions<UpdateUserEmailAddressMutation, UpdateUserEmailAddressMutationVariables>;