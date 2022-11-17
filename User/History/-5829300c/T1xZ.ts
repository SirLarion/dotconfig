import { withOrganizationId } from '@hox/telemetry-shared/context';

import { SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import { errorFailedPrecondition } from '@server/util/error';

import {
  NO_ADMINS_ERROR,
  sendInvitationEmails,
} from './lib/sendOnboardingInvitationToAdmins.lib';
import { TOnboardingInvitationHandlerConfig } from './lib/sendOnboardingInvitationToAdmins.models';

/**
 * Send emails to all admins in an organization inviting them to start self-service onboarding the organization
 */
const sendOnboardingInvitationToAdmins: TOnboardingInvitationHandlerConfig = {
  roles: [SUPER_ADMIN],
  async handler(ctx, { organizationId }) {
    const admins =
      await ctx.handlers.collection.user.findAdminsByOrganizationId(ctx, {
        organizationId,
      });

    if (admins.length === 0) {
      throw errorFailedPrecondition(
        ctx,
        NO_ADMINS_ERROR,
        withOrganizationId(organizationId)
      );
    }
    return sendInvitationEmails(ctx, admins);
  },
};

export default sendOnboardingInvitationToAdmins;
