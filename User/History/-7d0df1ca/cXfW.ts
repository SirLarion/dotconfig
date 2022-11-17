import R from 'ramda';

import {
  IPatchPayload,
  IUser,
} from '@server/domains/collection/user/lib/models';
import { getMostRelevantRoleForUser } from '@server/domains/lib/auth/roles';
import { THandlerAnalyticsEventBuilderFunc } from '@server/domains/lib/models';
import { EServerEvent } from '@server/lib/analyticEvents';

import { getUpdatedAnalyticsTrackedFields } from './shared.lib';

//#region user_info_updated
const isNotEmpty = <T>(value: T) => R.not(R.isEmpty(value));

export const buildUserInfoUpdatedEvent: THandlerAnalyticsEventBuilderFunc<
  IPatchPayload,
  IUser
> = (ctx, payload) => {
  const { id, data } = payload;
  const updatedFields = getUpdatedAnalyticsTrackedFields(data);
  console.log('updated fields', updatedFields);

  if (isNotEmpty(updatedFields)) {
    return ctx.getGlobal('analytics').buildEvent({
      event: EServerEvent.USER_INFO_UPDATED,
      userId: id,
      properties: updatedFields,
    });
  }

  return null;
};

//#endregion User Update

//#region user_role_changed

export const buildUserRoleChangedEvent: THandlerAnalyticsEventBuilderFunc<
  IPatchPayload,
  IUser
> = async (ctx, payload, output) => {
  const { id, data } = payload;

  if (data.roles !== undefined) {
    const { enableSuperAdminAccess } = await ctx.getConfig('auth');

    return ctx.getGlobal('analytics').buildEvent({
      event: EServerEvent.ADMIN_USER_ROLE_CHANGED,
      userId: id,
      properties: {
        organizationId: output.organizationId,
        userRole: getMostRelevantRoleForUser(!enableSuperAdminAccess, output),
      },
    });
  }

  return null;
};

//#endregion user_role_changed
