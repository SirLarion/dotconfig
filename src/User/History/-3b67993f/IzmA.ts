import { any } from 'ramda';

import {
  withOrganizationId,
  withUserId,
} from '@hox/telemetry-shared/gen_attribute_setters';
import { ADMIN, SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import {
  errorFailedPrecondition,
  errorInvalidArgument,
} from '@server/util/error';

import { TUpdateEmailAddressHandlerConfig } from './lib/updateEmailAddress.models';

const ERROR_ORG_SCIM_ENABLED =
  'Could not update email address: the organization has enabled SCIM.';

/**
 * Update the email address of a user.
 */
const updateEmailAddress: TUpdateEmailAddressHandlerConfig = {
  roles: [ADMIN, SUPER_ADMIN],
  async handler(ctx, { userId, organizationId, emailAddress }) {
    const org = await ctx.handlers.collection.organization.get(ctx, {
      id: organizationId,
    });

    if (org.scim?.authToken) {
      throw errorFailedPrecondition(
        ctx,
        ERROR_ORG_SCIM_ENABLED,
        withUserId(ctx.identity.getId()),
        withOrganizationId(org._id)
      );
    }

    if (!any(domain => emailAddress.endsWith(domain.name), org.domains)) {
      throw errorInvalidArgument(
        ctx,
        `Could not update email address: the domain for ${emailAddress} does not exist.`,
        withUserId(ctx.identity.getId()),
        withOrganizationId(org._id)
      );
    }

    return await ctx.handlers.collection.user.patch(ctx, {
      id: userId,
      data: { emails: [{ address: emailAddress }] },
      params: { selector: { organizationId: org._id } },
    });
  },
};

export default updateEmailAddress;
