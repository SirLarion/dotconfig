import { withOrganizationId } from '@hox/telemetry-shared/gen_attribute_setters';

import { SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import { errorFailedPrecondition } from '@server/util/error';

import {
  createOrganizationOnboardingTasks,
  setOnboardingStartedAt,
  sendOnboardingInvitationToOrgAdmins,
} from './lib/start.lib';

import { TStartHandlerConfig } from './lib/start.models';

/**
 * Starts onboarding for the given organization
 */
const start: TStartHandlerConfig = {
  roles: [SUPER_ADMIN],
  async handler(ctx, { organizationId }) {
    const organization = await ctx.handlers.collection.organization.get(ctx, {
      id: organizationId,
    });
    const admins =
      await ctx.handlers.collection.user.findAdminsByOrganizationId(ctx, {
        organizationId,
      });

    if (admins.length === 0) {
      throw errorFailedPrecondition(
        ctx,
        'No admin users exist in organization',
        withOrganizationId(organizationId)
      );
    }

    if (organization.onboardingCompletedAt) {
      throw errorFailedPrecondition(
        ctx,
        'Onboarding is already completed for organization',
        withOrganizationId(organizationId)
      );
    }

    if (organization.onboardingStartedAt) {
      throw errorFailedPrecondition(
        ctx,
        'Onboarding is already started for organization',
        withOrganizationId(organizationId)
      );
    }

    await createOrganizationOnboardingTasks(ctx, organizationId);
    return setOnboardingStartedAt(ctx, organizationId);
  },
};

export default start;
