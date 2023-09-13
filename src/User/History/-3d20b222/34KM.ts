import { USER_ACTION_INTL } from '../../components/UserActions/intl';

import { deactivateUsers } from './actions/deactivateUsers';
import { USER_ACTION_INTL as INTL } from './intl';
import { IUserAction, TUserActionName } from './types';

const userActionNameIntlMapping: Record<TUserActionName, React.ReactNode> = {
  automatically_start: USER_ACTION_INTL.automaticStart.displayName,
  invite_user: USER_ACTION_INTL.invite.displayName,
  reactivate_user: USER_ACTION_INTL.reactivate.displayName,
  set_user_properties: USER_ACTION_INTL.setProperties.displayName,
  soft_delete_user: USER_ACTION_INTL.softDelete.displayName,
  export_user_csv: USER_ACTION_INTL.exportCsv.displayName,
};

export const getUserActionNameIntl = (userActionName: TUserActionName) =>
  userActionNameIntlMapping[userActionName];

export const getScimAdjustedUserActions = (
  scimEnabled: boolean,
  userActions: IUserAction[]
): IUserAction[] => {
  if (scimEnabled) {
    return userActions.filter(action => action.name !== deactivateUsers.name);
  }

  return userActions;
};

export const getUserActionCopies = (
  taskCount: number,
  actionName?: TUserActionName
) => {
  switch (actionName) {
    case 'automatically_start':
      return {
        title: INTL.automaticStart.title(taskCount),
        description: INTL.automaticStart.description,
      };
    case 'invite_user':
      return {
        title: INTL.invite.title(taskCount),
        description: INTL.invite.description,
        tip: INTL.invite.tip,
      };
    case 'reactivate_user':
      return {
        title: INTL.reactivate.title(taskCount),
        description: INTL.reactivate.description,
      };
    case 'soft_delete_user':
      return {
        title: INTL.softDelete.title(taskCount),
        description: INTL.softDelete.description,
      };
    default:
      throw new Error(`No confimation copies for action named ${actionName}`);
  }
};
