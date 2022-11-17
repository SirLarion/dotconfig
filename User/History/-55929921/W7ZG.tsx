import React, { FC } from 'react';

import { UserActions } from '../../../../components/UserActions';
import { userActions } from '../../../../components/UserActions/actions';
import { IUserListProps } from '../../../../views/UserManagement/types';
import { getDefaultFilters } from '../../components/filters/lib';
import { UserListPage } from '../../components/UserListPage';
import { useUserList } from '../../hooks/useUserList';

export const filter = {
  ['softDeletedAt_ne']: null,
};

export const RemovedUsersList: FC<IUserListProps> = ({ scimEnabled }) => {
  const { users, loading, pagination } = useUserList(filter);
  const allowedUserActions = [
    userActions.exportCsv,
    userActions.reactivateUsers,
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
