import { ADMIN, SUPER_ADMIN } from '@server/domains/lib/auth/roles';

import { TUpdateEmailAddressHandlerConfig } from './lib/updateEmailAddress.models';

/**
 * Update the email address of a user.
 */
const updateEmailAddress: TUpdateEmailAddressHandlerConfig = {
  roles: [ADMIN, SUPER_ADMIN],
  async handler(ctx, { userId, organizationId, emailAddress }) {
    const user = await ctx.handlers.collection.user.get(ctx, {
      id: userId,
      params: { selector: { organizationId } },
    });
    return {};
  },
};

export default updateEmailAddress;
