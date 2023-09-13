import { withOrganizationId } from '@hox/telemetry-shared/gen_attribute_setters';

import {
  matchOrganizationId,
  policyAuthorizer,
} from '@server/domains/lib/auth/policy';
import { ADMIN, SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import { countCursor } from '@server/domains/lib/collectionFp';
import { EServerEvent } from '@server/lib/analyticEvents';
import { withTaskRunnerIdentity } from '@server/startup/fixtures/taskRunnerUser';
import { errorFailedPrecondition } from '@server/util/error';

import {
  ILaunchOrganizationPayload,
  TLaunchOrganizationContext,
  TLaunchOrganizationHandlerConfig,
} from './lib/launchOrganization.models';

/**
 * Launches Hoxhunt for the given organization
 */
const launchOrganization: TLaunchOrganizationHandlerConfig = {
  roles: [ADMIN, SUPER_ADMIN],
  inputAuthorizer: policyAuthorizer<
    TLaunchOrganizationContext,
    ILaunchOrganizationPayload
  >(
    matchOrganizationId({
      inputField: 'organizationId',
      exempt: [SUPER_ADMIN],
    })
  ),
  analyticsEventBuilder: (ctx, input, updatedOrg) =>
    ctx.getGlobal('analytics').buildEvent({
      event: EServerEvent.ADMIN_ORGANIZATION_ONBOARDING_COMPLETED,
      userId: ctx.identity.getEffectiveId(),
      timestamp: updatedOrg.onboardingCompletedAt,
      properties: {
        organizationId: input.organizationId,
      },
    }),
  async handler(ctx, { organizationId }) {
    const onboardingTasksCount =
      await ctx.handlers.collection.organizationOnboardingTask
        .find(ctx, {
          params: {
            selector: {
              organizationId,
              required: true,
              completedAt: null,
            },
          },
        })
        .then(countCursor);

    if (onboardingTasksCount > 0) {
      throw errorFailedPrecondition(
        ctx,
        'Failed to launch organization. Organization has incomplete onboarding tasks that are required.',
        withOrganizationId(organizationId)
      );
    }

    await ctx.handlers.admin.technicalTesting.removeTechnicalTestingQuests(
      ctx,
      { organizationId }
    );

    const elevatedCtx = await withTaskRunnerIdentity(ctx);

    return elevatedCtx.handlers.collection.organization.patch(elevatedCtx, {
      id: organizationId,
      data: {
        onboardingCompletedAt: ctx.getGlobal('newDate')(),
      },
    });
  },
};

export default launchOrganization;
