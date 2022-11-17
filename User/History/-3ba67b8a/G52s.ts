import { gql, useQuery } from '@apollo/client';

import { User_filter } from '../../../graphql/__generated__/globalTypes';
import { TUserListTabId } from '../components/UserManagementHeader/lib';

import { GetTabUserCount } from './__generated__/GetTabUserCount';

const GET_TAB_USER_COUNT = gql`
  query GetTabUserCount($filter: User_filter) {
    currentUser {
      _id
      organization {
        _id
        usersConnection(filter: $filter) {
          totalCount
        }
      }
    }
  }
`;

export type TUserCountsPerTab = {
  allUsers?: number;
  onboarded?: number;
  notOnboarded?: number;
  reportOnly?: number;
  removed?: number;
};

export type TTabUsersCountMap = {
  [K in TUserListTabId]: number | undefined;
};

export const useTabUserCount = (filter: User_filter | null) => {
  const { loading, data } = useQuery<GetTabUserCount>(GET_TAB_USER_COUNT, {
    variables: {
      ...(filter && { filter }),
    },
  });

  const userCount = data?.currentUser?.organization.usersConnection.totalCount;

  return {
    loading,
    userCount,
  };
};
