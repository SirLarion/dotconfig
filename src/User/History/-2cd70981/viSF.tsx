import React, {
  FC,
  ReactChild,
  SyntheticEvent,
  useCallback,
  useMemo,
  useState,
} from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import { debounce } from '@hox/frontend-utils/ramda';
import { LoadingIndicator } from '@hox/ui/LoadingIndicator';

import { FiltersContainer } from '../../../../components/FiltersContainer';
import { Layout } from '../../../../components/Layout';
import { SearchBar } from '../../../../components/SearchBar';
import { IUserActionsProps } from '../../../../components/UserActions';
import { IUserAction } from '../../../../components/UserActions/types';
import { USER_MANAGEMENT_INTL } from '../../../../views/UserManagement/intl';
import { ColumnCustomizationOverlay } from '../../columnCustomization';
import { appliedFilters, searchStringFilter } from '../../recoil/filters';
import { TPagination, TQueryUser } from '../../types';
import { ColumnCustomizationButtonOpen } from '../ColumnCustomizationButtonOpen';
import { LinkBasedOnboardingBanner } from '../LinkBasedOnboardingBanner';
import UserList from '../UserList';

export const Content = styled(Layout.Content)`
  > :first-child {
    margin: 1rem 0 2rem 0;
  }
`;

export interface IUserListPageProps {
  filters?: ReactChild[];
  Actions: FC<IUserActionsProps>;
  users: TQueryUser[];
  loading: boolean;
  pagination: TPagination;
  scimEnabled: boolean;
  allowedUserActions: IUserAction[];
  showCheckboxFilters?: boolean;
  showLinkBasedOnboardingBanner?: boolean;
}

const DEBOUNCE_TIME_MS = 500;

export const UserListPage: FC<IUserListPageProps> = ({
  Actions,
  users,
  loading,
  pagination,
  scimEnabled,
  allowedUserActions,
  filters,
  showLinkBasedOnboardingBanner,
}) => {
  const intl = useIntl();

  const [nameEmailSearch, setNameEmailSearch] =
    useRecoilState(searchStringFilter);

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

  const currentFilters = useRecoilValue(appliedFilters);
  const clearAllFilters = useResetRecoilState(appliedFilters);

  return (
    <>
      <FiltersContainer
        filters={filters}
        currentFilters={currentFilters}
        clearAllFilters={clearAllFilters}
      ></FiltersContainer>
      <Content>
        {showLinkBasedOnboardingBanner && <LinkBasedOnboardingBanner />}
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
