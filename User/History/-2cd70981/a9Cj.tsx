import React, {
  FC,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import { debounce } from '@hox/frontend-utils/ramda';
import { LoadingIndicator } from '@hox/ui/LoadingIndicator';

import { IFiltersContainer } from '../../../../components/FiltersContainer';
import { Layout } from '../../../../components/Layout';
import { SearchBar } from '../../../../components/SearchBar';
import { IUserActionsProps } from '../../../../components/UserActions';
import { IUserAction } from '../../../../components/UserActions/types';
import { useUserListFilters } from '../../../../views/UserManagement/hooks/useUserListFilters';
import { USER_MANAGEMENT_INTL } from '../../../../views/UserManagement/intl';
import { userListState } from '../../../../views/UserManagement/recoil';
import { ColumnCustomizationOverlay } from '../../columnCustomization';
import { TQueryUser, TPagination } from '../../types';
import { ColumnCustomizationButtonOpen } from '../ColumnCustomizationButtonOpen';
import { FilterCheckbox } from '../FilterCheckbox';
import { FilterDropdown } from '../FilterDropdown';
import { RoleDropdown } from '../RoleDropdown';
import UserList from '../UserList';

export const Content = styled(Layout.Content)`
  > :first-child {
    margin: 1rem 0 2rem 0;
  }
`;

export interface IUserListPageProps {
  Filters: FC<IFiltersContainer>;
  Actions: FC<IUserActionsProps>;
  users: TQueryUser[];
  loading: boolean;
  pagination: TPagination;
  scimEnabled: boolean;
  allowedUserActions: IUserAction[];
  showCheckboxFilters?: boolean;
}

const DEBOUNCE_TIME_MS = 500;

export const UserListPage: FC<IUserListPageProps> = ({
  Actions,
  users,
  loading,
  pagination,
  scimEnabled,
  allowedUserActions,
  Filters,
  showCheckboxFilters,
}) => {
  const intl = useIntl();
  const searchString = useRecoilValue(userListState.filterSelectors.search);

  const filter = useRecoilValue(userListState.filter);
  const resetSelection = useResetRecoilState(userListState.resetSelection);

  // Reset selected users if filtration parameters change
  useEffect(() => resetSelection(), [searchString, filter, resetSelection]);

  const [nameEmailSearch, setNameEmailSearch] = useRecoilState(
    userListState.filterSelectors.search
  );
  const {
    appliedFilters,
    resetFilters,
    removeFilter,
    departmentItems,
    siteItems,
    countryItems,
  } = useUserListFilters();

  const setDebouncedSearch = useMemo(
    () =>
      debounce((value: string) => setNameEmailSearch(value), DEBOUNCE_TIME_MS),
    [setNameEmailSearch]
  );

  const handleSearchChange = useCallback(
    (event: SyntheticEvent) => {
      setDebouncedSearch((event.target as HTMLInputElement).value);
    },
    [setDebouncedSearch]
  );

  const [columnCustomizationOpen, setColumnCustomizationOpen] = useState(false);

  return (
    <>
      <Filters
        appliedFilters={appliedFilters}
        clearAllFilters={resetFilters}
        onRemoveFilter={removeFilter}
      >
        <>
          <FilterDropdown
            items={departmentItems}
            title={intl.formatMessage(
              USER_MANAGEMENT_INTL.filter.dropdownFilters.department
            )}
            filterType="department"
          />
          <FilterDropdown
            items={siteItems}
            title={intl.formatMessage(
              USER_MANAGEMENT_INTL.filter.dropdownFilters.site
            )}
            filterType="site"
          />
          <FilterDropdown
            items={countryItems}
            title={intl.formatMessage(
              USER_MANAGEMENT_INTL.filter.dropdownFilters.country
            )}
            filterType="country"
          />
          <RoleDropdown />
        </>
        {showCheckboxFilters && (
          <>
            <FilterCheckbox
              title={intl.formatMessage(
                USER_MANAGEMENT_INTL.filter.toggleFilters.notActivated
              )}
              filterKey="notActivated"
              tooltip={
                USER_MANAGEMENT_INTL.filter.toggleFilters.tooltips.notActivated
              }
            />
            <FilterCheckbox
              title={intl.formatMessage(
                USER_MANAGEMENT_INTL.filter.toggleFilters.notReacted
              )}
              filterKey="notReacted"
              tooltip={
                USER_MANAGEMENT_INTL.filter.toggleFilters.tooltips.notReacted
              }
            />
          </>
        )}
      </Filters>
      <Content>
        <UserList.Toolbar>
          <UserList.Pagination
            pagination={pagination}
            pageUserCount={users.length}
          />
          <SearchBar
            defaultValue={nameEmailSearch}
            onChange={handleSearchChange}
            placeholder={intl.formatMessage(
              USER_MANAGEMENT_INTL.searchPlaceholder
            )}
          />
          <Actions
            scimEnabled={scimEnabled}
            totalUserCount={pagination.totalItemCount}
            actions={allowedUserActions}
          />
          <>
            <ColumnCustomizationButtonOpen
              onClick={() => setColumnCustomizationOpen(true)}
            />

            <ColumnCustomizationOverlay
              open={columnCustomizationOpen}
              setOpen={setColumnCustomizationOpen}
            />
          </>
        </UserList.Toolbar>

        <UserList
          users={users}
          loading={loading}
          loadingIndicator={<LoadingIndicator />}
        />
        {!loading && (
          <UserList.Pagination
            pagination={pagination}
            pageUserCount={users.length}
          />
        )}
      </Content>
    </>
  );
};
