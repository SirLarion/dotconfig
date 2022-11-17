import React, { FC, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { without } from 'ramda';
import { FormattedMessage } from 'react-intl';
import { useRecoilState, useRecoilValue } from 'recoil';

import { GridList, IGridListProps } from '../../../../components/GridList';
import {
  NoResultsFound,
  NoResultsFoundIntl,
} from '../../../../components/NoResultsFound';
import { useUserListLayout } from '../../hooks/useUserListLayout';
import { userListState } from '../../recoil';
import { TQueryUser } from '../../types';

import { UserListHeader } from './UserListHeader';
import {
  IUserListPaginationProps,
  UserListPagination,
} from './UserListPagination';
import { UserListRow } from './UserListRow';
import { IUserListToolbarProps, UserListToolbar } from './UserListToolbar';

const UserListSearchTips = {
  searchWith: (
    <FormattedMessage
      id="app.admin.userList.searchTips.searchWithNameOrEmail"
      defaultMessage="Try searching user name or email"
      description="Text for tip suggesting the user to search with name or email"
    />
  ),
};

const StyledNoResultsFound = styled(NoResultsFound)`
  margin-top: 2rem;
`;

type TColumnWidthCSS = {
  $columnWidths: ReturnType<typeof css>;
};

const StyledListHeader = styled(UserListHeader)<TColumnWidthCSS>`
  ${p => p.$columnWidths};
`;
const StyledListRow = styled(UserListRow)<TColumnWidthCSS>`
  ${p => p.$columnWidths};
`;

const isAlreadySelected = (userId: string, selectedIds: string[]) =>
  selectedIds.includes(userId);
export interface IUserListProps extends IGridListProps {
  users: TQueryUser[];
}

const UserList: FC<IUserListProps> & {
  Pagination: FC<IUserListPaginationProps>;
  Toolbar: FC<IUserListToolbarProps>;
} = ({ users, loading, loadingIndicator, ...restProps }) => {
  const [allSelected, setAllSelected] = useRecoilState(
    userListState.allSelected
  );
  const [selectedIds, setSelectedIds] = useRecoilState(
    userListState.selectedIds
  );
  const { rows, columns, columnWidths } = useUserListLayout(users);

  const handleToggleRowSelect = useCallback(
    (userId: string) => {
      if (!allSelected) {
        if (isAlreadySelected(userId, selectedIds)) {
          setSelectedIds(userIds => without([userId], userIds));
        } else {
          setSelectedIds(userIds => [...userIds, userId]);
        }
      } else {
        setSelectedIds(
          without(
            [userId],
            users.map(user => user._id)
          )
        );
      }
      setAllSelected(false);
    },
    [allSelected, selectedIds, setAllSelected, setSelectedIds, users]
  );

  const searchFilter = useRecoilValue(userListState.filterSelectors.search);

  const noResultsFound =
    !loading && searchFilter.length > 0 && users.length === 0;

  return (
    <GridList
      loading={loading}
      loadingIndicator={loadingIndicator}
      header={
        <StyledListHeader columns={columns} $columnWidths={columnWidths} />
      }
      {...restProps}
    >
      {users.length > 0 && !loading
        ? rows.map(row => (
            <StyledListRow
              key={row.userId}
              handleToggleRowSelect={handleToggleRowSelect}
              $columnWidths={columnWidths}
              {...row}
            />
          ))
        : noResultsFound && (
            <StyledNoResultsFound
              search={searchFilter}
              searchTips={[
                UserListSearchTips.searchWith,
                NoResultsFoundIntl.searchTips.checkSpelling,
              ]}
            />
          )}
    </GridList>
  );
};

UserList.Pagination = UserListPagination;
UserList.Toolbar = UserListToolbar;
export default UserList;
