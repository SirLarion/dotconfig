import { SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import { EServerEvent } from '@server/lib/analyticEvents';

import { setOnboardingStartedAt } from './lib/start.lib';
import { TStartHandlerConfig } from './lib/start.models';

/**
 * Starts onboarding for the given organization
 */
const start: TStartHandlerConfig = {
  roles: [SUPER_ADMIN],
  analyticsEventBuilder: (ctx, input, updatedOrg) =>
    ctx.getGlobal('analytics').buildEvent({
      event: EServerEvent.ADMIN_ORGANIZATION_ONBOARDING_STARTED,
      userId: ctx.identity.getEffectiveId(),
      timestamp: updatedOrg.onboardingStartedAt,
      properties: {
        organizationId: input.organizationId,
      },
    }),
  async handler(ctx, { organizationId }) {
    const organization = await ctx.handlers.collection.organization.get(ctx, {
      id: organizationId,
    });

    return setOnboardingStartedAt(ctx, organization._id);
  },
};

export default start;
