import { FC, ReactNode } from 'react';

import { User_filter } from '../../../../types/graphql.generated';
import { USER_MANAGEMENT_INTL as INTL } from '../../intl';
import {
  AllUsersList,
  filter as allUsersFilter,
} from '../../pages/AllUsersList';
import {
  filter as notOnboardedFilter,
  NotOnboardedUsersList,
} from '../../pages/NotOnboardedUsersList';
import {
  filter as onboardedFilter,
  OnboardedUsersList,
} from '../../pages/OnboardedUsersList';
import {
  filter as removedFilter,
  RemovedUsersList,
} from '../../pages/RemovedUsersList';
import {
  filter as reportOnlyFilter,
  ReportOnlyUsersList,
} from '../../pages/ReportOnlyUsersList';

export const createAndFilter = (filterArray: User_filter[]) => {
  return {
    ...(filterArray.length > 0 && { AND: filterArray }),
  };
};

export type TUserListTabId =
  | 'all'
  | 'onboarded'
  | 'notOnboarded'
  | 'reportOnly'
  | 'removed';

type TUserListTabPage = FC;

export type TUserListTab = {
  name: ReactNode;
  id: TUserListTabId;
  filter: User_filter | null;
  pageComponent: TUserListTabPage;
};

export const userListTabs: TUserListTab[] = [
  {
    name: INTL.filter.allUsers,
    id: 'all',
    filter: allUsersFilter,
    pageComponent: AllUsersList,
  },
  {
    name: INTL.filter.onboarded,
    id: 'onboarded',
    filter: onboardedFilter,
    pageComponent: OnboardedUsersList,
  },
  {
    name: INTL.filter.notOnboarded,
    id: 'notOnboarded',
    filter: notOnboardedFilter,
    pageComponent: NotOnboardedUsersList,
  },
  {
    name: INTL.filter.reportOnly,
    id: 'reportOnly',
    filter: reportOnlyFilter,
    pageComponent: ReportOnlyUsersList,
  },
  {
    name: INTL.filter.removed,
    id: 'removed',
    filter: removedFilter,
    pageComponent: RemovedUsersList,
  },
];

export const getActiveUserListTabIndex = (tabId: string) =>
  userListTabs.findIndex(({ id }) => id === tabId);
