import { useCallback, useState } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import { User_sort } from '@hox/frontend-utils/types/graphql.generated';

import {
  getNextColumnSortState,
  TColumnSortStates,
  TSortDirection,
} from '../../../components/GridList';
import { AVAILABLE_COLUMN_IDS } from '../columnCustomization/constants/columns';
import { userListState } from '../recoil';

type TAvailableColumns = typeof AVAILABLE_COLUMN_IDS[number];
export type TSortableUserListColumn = keyof Pick<
  Record<TAvailableColumns, never>,
  | 'stars'
  | 'failRate'
  | 'missRate'
  | 'successRate'
  | 'scimProvisioned'
  | 'country'
  | 'department'
  | 'site'
  | 'city'
  | 'isAnonymous'
  | 'spicyMode'
>;

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
  scimProvisioned: {
    ASC: User_sort.scim__lastProvisionedAt_ASC,
    DESC: User_sort.scim__lastProvisionedAt_DESC,
  },
  country: {
    ASC: User_sort.profile__country_ASC,
    DESC: User_sort.profile__country_DESC,
  },
  department: {
    ASC: User_sort.profile__department_ASC,
    DESC: User_sort.profile__department_DESC,
  },
  site: {
    ASC: User_sort.profile__site_ASC,
    DESC: User_sort.profile__site_DESC,
  },
  city: {
    ASC: User_sort.profile__city_ASC,
    DESC: User_sort.profile__city_DESC,
  },
  isAnonymous: {
    ASC: User_sort.profile__isAnonymous_ASC,
    DESC: User_sort.profile__isAnonymous_DESC,
  },
  spicyMode: {
    ASC: User_sort.profile__spicyModeEnabled_ASC,
    DESC: User_sort.profile__spicyModeEnabled_DESC,
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
