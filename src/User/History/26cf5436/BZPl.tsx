import React, { FC } from 'react';

import { useHasFeature } from '@hox/frontend-utils/hooks/useHasFeature';
import { USER_GAME_MODE } from '@hox/frontend-utils/types/graphql.generated';

import { UserActions } from '../../../../components/UserActions';
import { userActions } from '../../../../components/UserActions/actions';
import { IUserAction } from '../../../../components/UserActions/types';
import { IUserListProps } from '../../../../views/UserManagement/types';
import { getDefaultFilters } from '../../components/filters/lib';
import { UserListPage } from '../../components/UserListPage';
import { useUserList } from '../../hooks/useUserList';

export const onboardingOverhaulFilter = {
  ['game__newOnboardedAt_exists']: false,
  ['game__mode_eq']: USER_GAME_MODE.INTENSIVE,
  ['softDeletedAt_eq']: null,
};

export const filter = {
  ['game__onboardedAt_exists']: false,
  ['game__mode_eq']: USER_GAME_MODE.INTENSIVE,
  ['softDeletedAt_eq']: null,
};

export const NotOnboardedUsersList: FC<IUserListProps> = ({ scimEnabled }) => {
  const { features: showInviteUsersAction } = useHasFeature(
    'admin show invite user action'
  );

  // TODO: Always show showLinkBasedOnboardingBanner after rollout is done
  const { features: adminLboRollout } = useHasFeature('admin lbo rollout');

  // TODO: Remove overhaul code when feature flag is no longer needed
  const { features: hasOnboardingOverhaulActive } = useHasFeature(
    'onboarding overhaul'
  );
  const { users, loading, pagination } = useUserList(
    hasOnboardingOverhaulActive ? onboardingOverhaulFilter : filter
  );
  const allowedUserActions = [
    userActions.autostartUsers,
    showInviteUsersAction && userActions.inviteUsers,
    userActions.exportCsv,
    userActions.setUserProperties,
    userActions.deactivateUsers,
  ].filter(Boolean) as IUserAction[];

  return (
    <UserListPage
      filters={getDefaultFilters(scimEnabled)}
      Actions={UserActions}
      users={users}
      loading={loading}
      pagination={pagination}
      scimEnabled={scimEnabled}
      allowedUserActions={allowedUserActions}
      showCheckboxFilters
      showLinkBasedOnboardingBanner={adminLboRollout}
    />
  );
};
