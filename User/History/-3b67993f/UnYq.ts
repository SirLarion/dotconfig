import { ADMIN, SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import { errorFailedPrecondition } from '@server/util/error';

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
      throw errorFailedPrecondition(ctx);
    }

    const user = await ctx.handlers.collection.user.get(ctx, {
      id: userId,
      params: { selector: { organizationId: org._id } },
    });

    return {};
  },
};

export default updateEmailAddress;
