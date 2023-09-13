import { SUPER_ADMIN } from '@server/domains/lib/auth/roles';

import { sendInvitationEmails } from './lib/sendOnboardingInvitationToAdmins.lib';
import { TOnboardingInvitationHandlerConfig } from './lib/sendOnboardingInvitationToAdmins.models';

/**
 * Send emails to all admins in an organization inviting them to start self-service onboarding the organization
 */
const sendOnboardingInvitationToAdmins: TOnboardingInvitationHandlerConfig = {
  roles: [SUPER_ADMIN],
  async handler(ctx, { organizationId }) {
    return {};
  },
};

export default sendOnboardingInvitationToAdmins;
