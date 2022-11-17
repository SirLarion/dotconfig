import { withUserId } from '@hox/telemetry-shared/context';

import { Users } from '@server/collections/users/collection';
import { patch } from '@server/domains/collection/lib/mongo';
import {
  IPatchPayload,
  IUser,
  TPatchContext,
} from '@server/domains/collection/user/lib/models';
import {
  blacklistInput,
  forceProjectionForWeakAuthenticated,
  matchId,
  matchOrganizationId,
  policyAuthorizer,
  whitelistInput,
} from '@server/domains/lib/auth/policy';
import { ACL } from '@server/domains/lib/auth/roles';
import { IHandlerConfig } from '@server/domains/lib/models';
import {
  userAttributes,
  userSelectorAttributes,
} from '@server/domains/lib/telemetry';

import {
  buildUserInfoUpdatedEvent,
  buildUserRoleChangedEvent,
} from './lib/patch.analytics.lib';
import {
  getPayloadWithUpdatedGameActive,
  validateScimProvisioning,
} from './lib/patch.validation.lib';

const handler: IHandlerConfig<TPatchContext, IPatchPayload, IUser> = {
  roles: [
    ACL.Roles.TASK_RUNNER,
    ACL.Roles.SUPER_ADMIN,
    ACL.Roles.ADMIN,
    ACL.Roles.USER,
  ],
  telemetry: {
    inputToLogMessageAttributes: payload => [
      ...userSelectorAttributes(payload.params),
      withUserId(payload.id),
    ],
    outputToLogMessageAttributes: userAttributes,
  },
  inputAuthorizer: policyAuthorizer<TPatchContext, IPatchPayload>(
    matchId({
      exempt: [ACL.Roles.SUPER_ADMIN, ACL.Roles.TASK_RUNNER, ACL.Roles.ADMIN],
    }),
    matchOrganizationId({
      inputField: 'params.selector.organizationId',
      exempt: [ACL.Roles.SUPER_ADMIN, ACL.Roles.TASK_RUNNER, ACL.Roles.USER],
    }),
    blacklistInput({
      fields: ['data.jwtPayloads', 'data.profile.hasEnforcedAnonymity'],
      exempt: [ACL.Roles.SUPER_ADMIN, ACL.Roles.TASK_RUNNER, ACL.Roles.ADMIN],
    }),
    whitelistInput({
      fields: [
        'id',
        'emails.address',
        'data.profile',
        'data.tags',
        'data.events',
        'data.jwtPayloads',
        'data.labs',
        'data.game',
        'data.softDeletedAt',
        'data.softDeleteRestorationValues.gameActive',
        'params',
      ],
      exempt: [ACL.Roles.SUPER_ADMIN, ACL.Roles.TASK_RUNNER],
    }),
    forceProjectionForWeakAuthenticated(Users.fields.weakAuthentication.query)
  ),
  analyticsEventBuilder: [buildUserInfoUpdatedEvent, buildUserRoleChangedEvent],
  handler: async (ctx, payload) => {
    await validateScimProvisioning(ctx, payload);

    const payloadWithUpdatedGameActive =
      getPayloadWithUpdatedGameActive(payload);

    return patch<IUser, TPatchContext>(ctx, payloadWithUpdatedGameActive);
  },
};
export default handler;
