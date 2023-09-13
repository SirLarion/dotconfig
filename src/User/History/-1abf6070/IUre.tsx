import { isEmpty } from 'ramda';
import { atom, DefaultValue, RecoilState, selector } from 'recoil';

import { FREE_FORM_TOKEN } from '@hox/ui/Search';

import { User_filter, User_sort } from '../../../types/graphql.generated';

import {
  FILTER_TO_GQL_KEY_MAPPINGS,
  TFilter,
  TFilterKey,
  TFilterValue,
  TGqlConvertibleFilterKey,
} from './lib';

const allSelected = atom<boolean>({
  key: 'user-list-all-users-selected',
  default: false,
});

const selectedIds = atom<string[]>({
  key: 'user-list-selected-user-ids',
  default: [],
});

const totalCount = atom<number>({
  key: 'user-list-user-count',
  default: 0,
});

const sort = atom<User_sort[]>({
  key: 'user-list-sort',
  default: [User_sort.profile__firstName_ASC, User_sort.profile__lastName_ASC],
});

const activeTabIndex = atom<number>({
  key: 'user-list-active-tab-index',
  default: 0,
});

const currentPageIndex = atom<number>({
  key: 'user-list-current-page-index',
  default: 0,
});

const filterDefaults: TFilter = {
  department: [],
  country: [],
  site: [],
  notActivated: undefined,
  notReacted: undefined,
  role: undefined,
  search: '',
};

const filter = atom<TFilter>({
  key: 'user-list-filter',
  default: filterDefaults,
});

type TFilterSelectors = {
  [key in keyof typeof filterDefaults]: RecoilState<typeof filterDefaults[key]>;
};

const filterSelectors: TFilterSelectors = Object.keys(filterDefaults).reduce(
  (prev, key) => {
    const newSelector = selector<TFilterValue>({
      key: `user-list-filter-${key}`,
      get: ({ get }) => get(filter)[key as TFilterKey],
      set: ({ set, reset }, newValue) => {
        reset(currentPageIndex);
        set(filter, oldValues => ({
          ...oldValues,
          [key]:
            newValue instanceof DefaultValue
              ? filterDefaults[key as TFilterKey]
              : newValue,
        }));
      },
    });
    return { ...prev, [key]: newSelector };
  },
  {} as TFilterSelectors
);

const gqlFilters = selector<User_filter>({
  key: 'user-list-filter-gql-filters',
  get: ({ get }) =>
    Object.entries(get(filter)).reduce(
      (prev, [key, val]) => ({
        ...prev,
        ...(!isEmpty(val) &&
          Object.keys(FILTER_TO_GQL_KEY_MAPPINGS).includes(key) && {
            [FILTER_TO_GQL_KEY_MAPPINGS[key as TGqlConvertibleFilterKey]]: val,
          }),
      }),
      {}
    ),
  set: () => {
    throw new Error('Do not use gqlFilters selector to set filters');
  },
});

const searchString = selector<string>({
  key: 'user-list-filter-search-string',
  get: ({ get }) => {
    const currentFilters = get(filter);
    const searchStringComponents: string[] = [];
    if (currentFilters.role) {
      searchStringComponents.push(`role:${currentFilters.role}`);
    }
    if (currentFilters.search) {
      searchStringComponents.push(
        `${FREE_FORM_TOKEN}:${currentFilters.search}`
      );
    }
    return searchStringComponents.join(' ').trim();
  },
  set: () => {
    throw new Error('Do not use searchString selector to set filters');
  },
});

const switchTab = selector<number>({
  key: 'user-list-switch-tab',
  get: () => {
    throw new Error('Do not use switchTab selector to read data');
  },
  set: ({ set, reset }, tabIndex) => {
    set(activeTabIndex, tabIndex);
    reset(currentPageIndex);
    reset(filter);
    reset(sort);
    reset(allSelected);
    reset(selectedIds);
  },
});

const resetSelection = selector<{ args: never }>({
  key: 'user-list-reset-selection',
  get: () => {
    throw new Error('Do not use resetSelection selector to read data');
  },
  set: ({ reset }) => {
    reset(allSelected);
    reset(selectedIds);
  },
});

export const userListState = {
  allSelected,
  selectedIds,
  totalCount,
  sort,
  resetSelection,
  activeTabIndex,
  currentPageIndex,
  switchTab,
  filter,
  gqlFilters,
  searchString,
  filterDefaults,
  filterSelectors,
};
