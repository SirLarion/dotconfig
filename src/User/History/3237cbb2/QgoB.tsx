import React from 'react';

import {
  UserDetailsFragment,
  UserDetailsOrganizationInfoFragment,
} from '../../views/UserDetails/graphql/__generated__/FetchUserDetails.generated';
import { USER_GAME_MODE } from '../../types/graphql.generated';

import { AutoStartUserButton } from './AutoStartUser';
import { InviteUserButton } from './InviteUser';
import { UndoSoftDeleteButton } from './UndoSoftDelete';

export const TOAST_TIMEOUT_MS = 8000;

export const getAvailableSingleUserActions = (
  user: Pick<UserDetailsFragment, '_id' | 'willBeHardDeletedAt' | 'game'>,
  organization: Pick<UserDetailsOrganizationInfoFragment, '_id'>
) => {
  if (user.willBeHardDeletedAt) {
    return [
      <UndoSoftDeleteButton
        key="undoSoftDelete"
        userId={user._id}
        organizationId={organization._id}
        disabled={false}
      />,
    ];
  }

  if (user.game.mode === USER_GAME_MODE.INTENSIVE && !user.game.active) {
    return [
      <AutoStartUserButton
        key="autoStartUser"
        userId={user._id}
        organizationId={organization._id}
        disabled={false}
        trainingActiveBefore={!!user.game.activatedAt}
      />,
      <InviteUserButton
        key="inviteUser"
        userId={user._id}
        organizationId={organization._id}
        disabled={false}
      />,
    ];
  }

  return [];
};
