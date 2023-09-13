import { User_filter } from '../../../graphql/__generated__/globalTypes';
import { TUserListTabId } from '../components/UserManagementHeader/lib';

import { GetTabUserCount } from './__generated__/GetTabUserCount';

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
