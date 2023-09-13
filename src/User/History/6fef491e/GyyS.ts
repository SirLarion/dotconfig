import { useCallback, useState } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import {
  getNextColumnSortState,
  TColumnSortStates,
  TSortDirection,
} from '../../../components/GridList';
import { User_sort } from '../../../types/graphql.generated';
import { userListState } from '../recoil';

export type TSortableUserListColumn =
  | 'stars'
  | 'failRate'
  | 'missRate'
  | 'successRate';

const userListSortMap: Record<
  TSortableUserListColumn,
  Record<'ASC' | 'DESC', User_sort>
> = {
  stars: {
    ASC: User_sort.player__stars_ASC,
    DESC: User_sort.player__stars_DESC,
  },
  failRate: {
    ASC: User_sort.player__stats__failureRate_ASC,
    DESC: User_sort.player__stats__failureRate_DESC,
  },
  missRate: {
    ASC: User_sort.player__stats__missed_ASC,
    DESC: User_sort.player__stats__missed_DESC,
  },
  successRate: {
    ASC: User_sort.player__stats__success_ASC,
    DESC: User_sort.player__stats__success_DESC,
  },
};

const getUserListSortMap = (
  column: TSortableUserListColumn,
  direction: TSortDirection
) => (direction === 'NONE' ? undefined : userListSortMap[column][direction]);

export const useUserListSort = () => {
  const setSort = useSetRecoilState(userListState.sort);
  const resetSort = useResetRecoilState(userListState.sort);
  const [sortState, setSortState] = useState<TColumnSortStates>({});

  const toggleSort = useCallback(
    (column: TSortableUserListColumn) => {
      const sortDirection = getNextColumnSortState(sortState[column]);
      setSortState({ [column]: sortDirection });

      const sortArg = getUserListSortMap(column, sortDirection);
      sortArg ? setSort([sortArg]) : resetSort();
    },
    [setSort, sortState, setSortState, resetSort]
  );

  return { toggleSort, sortState };
};
