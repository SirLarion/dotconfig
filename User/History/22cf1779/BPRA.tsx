import React, { FC } from 'react';

import { FiltersContainer } from '../../../../components/FiltersContainer';
import { UserActions } from '../../../../components/UserActions';
import { userActions } from '../../../../components/UserActions/actions';
import { USER_GAME_MODE } from '../../../../types/graphql.generated';
import { UserListPage } from '../../components/UserListPage';
import { useUserList } from '../../hooks/useUserList';

export interface IProps {}

export const filter = {
  ['game__onboardedAt_exists']: true,
  ['game__mode_eq']: USER_GAME_MODE.INTENSIVE,
  ['softDeletedAt_eq']: null,
};

export const OnboardedUsersList: FC<IProps> = () => {
  const { users, loading, pagination, scimEnabled } = useUserList(filter);
  const allowedUserActions = [
    userActions.setUserProperties,
    userActions.deactivateUsers,
  ];

  return (
    <UserListPage
      Filters={FiltersContainer}
      Actions={UserActions}
      users={users}
      loading={loading}
      pagination={pagination}
      scimEnabled={scimEnabled}
      allowedUserActions={allowedUserActions}
    />
  );
};
