import { any } from 'ramda';

import {
  withOrganizationId,
  withUserId,
} from '@hox/telemetry-shared/gen_attribute_setters';

import {
  matchOrganizationId,
  policyAuthorizer,
} from '@server/domains/lib/auth/policy';
import { ADMIN, SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import { withTaskRunnerRole } from '@server/domains/lib/contextWith';
import { EServerEvent } from '@server/lib/analyticEvents';
import { IDomain } from '@server/lib/typedSchemas/Organization/models';
import {
  errorFailedPrecondition,
  errorInvalidArgument,
  errorNotFound,
} from '@server/util/error';

import {
  IUpdateEmailAddressPayload,
  TUpdateEmailAddressContext,
  TUpdateEmailAddressHandlerConfig,
} from './lib/updateEmailAddress.models';

export const ERROR_ORG_SCIM_ENABLED =
  'Could not update email address: the organization has enabled SCIM.';

/**
 * Update the email address of a user.
 */
const updateEmailAddress: TUpdateEmailAddressHandlerConfig = {
  roles: [ADMIN, SUPER_ADMIN],
  inputAuthorizer: policyAuthorizer<
    TUpdateEmailAddressContext,
    IUpdateEmailAddressPayload
  >(
    matchOrganizationId({
      inputField: 'organizationId',
      exempt: [SUPER_ADMIN],
    })
  ),
  // analyticsEventBuilder: (ctx, _, user) =>
  //   ctx.getGlobal('analytics').buildEvent({
  //     event: EServerEvent.USER_INFO_UPDATED,
  //     userId: user._id,
  //     timestamp: ctx.getGlobal('newDate')(),
  //     properties: {
  //       emailAddress: user.emails[0].address,
  //       organizationId: user.organizationId,
  //     },
  //   }),
  async handler(ctx, { userId, organizationId, emailAddress }) {
    const org = await ctx.handlers.collection.organization.get(ctx, {
      id: organizationId,
    });

    if (!org) {
      throw errorNotFound(
        ctx,
        `Could not update email address: organization with ID ${organizationId} not found.`
      );
    }

    if (org.scim?.authToken?.createdAt) {
      throw errorFailedPrecondition(
        ctx,
        ERROR_ORG_SCIM_ENABLED,
        withUserId(ctx.identity.getId()),
        withOrganizationId(org._id)
      );
    }

    if (
      !any((domain: IDomain) => emailAddress.endsWith(`@${domain.name}`))(
        org.domains
      )
    ) {
      throw errorInvalidArgument(
        ctx,
        `Could not update email address: ${emailAddress} has an invalid domain or it does not exist.`,
        withUserId(ctx.identity.getId()),
        withOrganizationId(org._id)
      );
    }

    return await ctx.handlers.collection.user.patch(withTaskRunnerRole(ctx), {
      id: userId,
      data: { emails: [{ address: emailAddress }] },
      params: { selector: { organizationId: org._id } },
    });
  },
};

export default updateEmailAddress;
