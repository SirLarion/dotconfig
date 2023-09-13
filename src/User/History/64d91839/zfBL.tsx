import React, { FC } from 'react';
import styled from 'styled-components';

import { HoxIcon } from '@hox/ui/HoxIcon';
import { ButtonText } from '@hox/ui/Text';

import { AdminIcon } from '../../../AdminIcon';
import { USER_ACTION_INTL as INTL } from '../../intl';
import { IUserAction, TUserActionName } from '../../types';

const StyledActionMenuItem = styled.div`
  display: flex;
  align-items: center;

  > :first-child {
    flex-shrink: 0;
    margin-right: 1rem;
  }
`;

export interface IActionMenuItemProps {}

export const getUserActionMenuItem = (actionName: TUserActionName) => {
  switch (actionName) {
    case 'automatically_start':
      return {
        icon: <HoxIcon.Shield faded />,
        displayName: INTL.automaticStart.displayName,
      };
    case 'invite_user':
      return {
        icon: <HoxIcon.Mail faded />,
        displayName: INTL.invite.displayName,
      };
    case 'reactivate_user':
      return {
        icon: <AdminIcon.Undo faded />,
        displayName: INTL.reactivate.displayName,
      };
    case 'set_user_properties':
      return {
        icon: <HoxIcon.Configure faded />,
        displayName: INTL.setProperties.displayName,
      };
    case 'soft_delete_user':
      return {
        icon: <HoxIcon.Delete faded />,
        displayName: INTL.softDelete.displayName,
      };
    default:
      throw new Error(`Unknown action ${actionName}`);
  }
};

export const ActionMenuItem: FC<{
  action: IUserAction;
}> = ({ action, ...restProps }) => {
  const { icon, displayName } = getUserActionMenuItem(action.name);

  return (
    <StyledActionMenuItem {...restProps}>
      {icon}
      <ButtonText>{displayName}</ButtonText>
    </StyledActionMenuItem>
  );
};
