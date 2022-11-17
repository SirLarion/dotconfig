import { SUPER_ADMIN } from '@server/domains/lib/auth/roles';

import { TOnboardingInvitationHandlerConfig } from './lib/sendOnboardingInvitationToAdmins.models';

/**
 * Send emails to all admins in an organization inviting them to start self-service onboarding the organization
 */
const sendOnboardingInvitationToAdmins: TSendOnboardingInvitationToAdminsHandlerConfig =
  {
    roles: [SUPER_ADMIN],
    async handler(ctx, payload) {
      return {};
    },
  };

export default sendOnboardingInvitationToAdmins;
