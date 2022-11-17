import { create as createHandler } from '@server/domains/collection/lib/mongo';
import { SUPER_ADMIN, TASK_RUNNER } from '@server/domains/lib/auth/roles';

import { TCreateHandlerConfig } from './lib/create.models';

/**
 * Create an industry
 */
const create: TCreateHandlerConfig = {
  roles: [SUPER_ADMIN, TASK_RUNNER],
  analyticsEventBuilder: (ctx, input, industry) =>
    ctx.getGlobal('analytics').buildEvent({
      event: EServerEvent.ADMIN_ORGANIZATION_ONBOARDING_TASK_CREATED,
      userId: ctx.identity.getEffectiveId(),
      timestamp: newTask.createdAt,
      properties: {
        organizationId: newTask.organizationId,
        organizationOnboardingTaskId: newTask._id,
      },
    }),
  handler: createHandler,
};

export default create;
