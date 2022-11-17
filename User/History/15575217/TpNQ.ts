import R from 'ramda';

import { withOrganizationId, withUserId } from '@hox/telemetry-shared/context';

import {
  isSCIMRequest,
  isUserScimProvisioned,
} from '@server/domains/admin/scim/lib/common.lib';
import { IPatchPayload } from '@server/domains/collection/user/lib/models';
import { withTaskRunnerRole } from '@server/domains/lib/contextWith';
import { IMetaContext, THandlerContext } from '@server/domains/lib/models';
import { errorPermissionDenied } from '@server/util/error';

import { EUserGameMode } from '../../../../lib/typedSchemas/User/models';
import { EUserRole } from '../../../lib/auth/roles';

import { validateUserEmails } from './lib/shared.lib';

export const SCIM_FIELDS = [
  'profile.firstName',
  'profile.lastName',
  'profile.department',
  'profile.site',
  'profile.country',
  'emails',
] as const;

/**
 * Check that only SCIM requests modify SCIM provisioned fields
 * Super admins are allowed to change these values
 */
export const validateScimProvisioning = async (
  ctx: THandlerContext & IMetaContext,
  payload: IPatchPayload
) => {
  if (isSCIMRequest(ctx)) {
    return;
  }

  if (ctx.identity.hasRole(EUserRole.SUPER_ADMIN)) {
    return;
  }

  const existingUser = await ctx.handlers.collection.user.get(
    withTaskRunnerRole(ctx),
    {
      id: payload.id,
      params: {
        options: {
          fields: {
            _id: 1,
            organizationId: 1,
            scim: 1,
          },
        },
        selector: {},
      },
    }
  );

  if (!isUserScimProvisioned(existingUser)) {
    return;
  }

  SCIM_FIELDS.forEach(field => {
    const pathArray = field.split('.');

    if (R.hasPath(pathArray, payload.data)) {
      throw errorPermissionDenied(
        ctx,
        `Editing of field ${field} is not allowed for SCIM provisioned user`,
        withUserId(existingUser._id),
        withOrganizationId(existingUser.organizationId)
      );
    }
  });
};

export const validatePayloadEmails = (payload: IPatchPayload) => {
  if (payload.data.emails) {
    getD;
    validateUserEmails(ctx, payload);
  }
};

export const getPayloadWithUpdatedGameActive = (payload: IPatchPayload) => {
  if (payload.data.game?.mode === EUserGameMode.REPORT_ONLY) {
    return R.assocPath(['data', 'game', 'active'], false, payload);
  }

  return payload;
};
