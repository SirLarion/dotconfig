import { autostartUsers } from './autostartUsers';
import { deactivateUsers } from './deactivateUsers';
import { exportCsv } from './exportCsv';
import { inviteUsers } from './inviteUsers';
import { reactivateUsers } from './reactivateUsers';
import { setUserProperties } from './setUserProperties';

export const userActions = {
  autostartUsers,
  deactivateUsers,
  inviteUsers,
  reactivateUsers,
  setUserProperties,
  exportCsv,
};
