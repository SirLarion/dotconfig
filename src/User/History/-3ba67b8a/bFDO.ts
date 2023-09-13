import { User_filter } from '../../../graphql/__generated__/globalTypes';
import { TUserListTabId } from '../components/UserManagementHeader/lib';

import { useGetTabUserCountQuery } from './graphql/__generated__/GetTabUserCount.generated';

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
  const { loading, data } = useGetTabUserCountQuery({
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
