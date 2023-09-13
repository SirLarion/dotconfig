import React, { FC } from 'react';

import { USER_GAME_MODE } from '@hox/frontend-utils/types/graphql.generated';

import { UserActions } from '../../../../components/UserActions';
import { userActions } from '../../../../components/UserActions/actions';
import { IUserListProps } from '../../../../views/UserManagement/types';
import { getDefaultFilters } from '../../components/filters/lib';
import { UserListPage } from '../../components/UserListPage';
import { useUserList } from '../../hooks/useUserList';

export const filter = {
  ['game__mode_eq']: USER_GAME_MODE.REPORT_ONLY,
  ['softDeletedAt_eq']: null,
};

export const ReportOnlyUsersList: FC<IUserListProps> = ({ scimEnabled }) => {
  const { users, loading, pagination } = useUserList(filter);
  const allowedUserActions = [
    userActions.exportCsv,
    userActions.setUserProperties,
    userActions.deactivateUsers,
  ];

  return (
    <UserListPage
      filters={getDefaultFilters(scimEnabled)}
      Actions={UserActions}
      users={users}
      loading={loading}
      pagination={pagination}
      scimEnabled={scimEnabled}
      allowedUserActions={allowedUserActions}
    />
  );
};
