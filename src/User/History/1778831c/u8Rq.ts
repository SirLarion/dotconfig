import { useEffect, useMemo } from 'react';
import { isNil, mergeRight } from 'ramda';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { User_filter } from '../../../types/graphql.generated';
import { userListState } from '../recoil';
import { TQueryUser, TPagination } from '../types';

import { useGetOrganizationUsersQuery } from './graphql/__generated__/GetOrganizationUsers.generated';

const ITEMS_PER_PAGE = 100;

export const useUserList = (tabFilter: User_filter | null) => {
  const filter = useRecoilValue(userListState.gqlFilters);
  const activeFilter = useMemo(
    () => mergeRight(tabFilter ?? {}, filter ?? {}),
    [tabFilter, filter]
  );

  const sort = useRecoilValue(userListState.sort);
  const setTotalCount = useSetRecoilState(userListState.totalCount);

  const [currentPageIndex, setCurrentPageIndex] = useRecoilState(
    userListState.currentPageIndex
  );

  const search = useRecoilValue(userListState.searchString);

  const { loading, data } = useGetOrganizationUsersQuery({
    variables: {
      skip: ITEMS_PER_PAGE * currentPageIndex,
      first: ITEMS_PER_PAGE,
      search: search,
      sort: sort,
      filter: activeFilter,
    },
    fetchPolicy: 'cache-and-network',
  });

  const { nodes: users, totalCount: usersTotalCount } = useMemo(
    () =>
      data?.currentUser?.organization.usersConnection || {
        nodes: [] as TQueryUser[],
        totalCount: 0,
      },
    [data]
  );

  useEffect(() => {
    setTotalCount(usersTotalCount);
  }, [usersTotalCount, setTotalCount]);
  const scimEnabled = !isNil(data?.currentUser?.organization.scim);

  const pagination: TPagination = useMemo(() => {
    return {
      pageSize: ITEMS_PER_PAGE,
      totalItemCount: usersTotalCount,
      currentPageIndex,
      nextPage: () => setCurrentPageIndex(current => current + 1),
      previousPage: () => setCurrentPageIndex(current => current - 1),
      reset: () => setCurrentPageIndex(0),
    };
  }, [currentPageIndex, setCurrentPageIndex, usersTotalCount]);

  return {
    loading,
    users,
    pagination,
    scimEnabled,
  };
};
