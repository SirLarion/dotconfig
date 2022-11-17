import { create as createHandler } from '@server/domains/collection/lib/mongo';
import { SUPER_ADMIN, TASK_RUNNER } from '@server/domains/lib/auth/roles';
import { EServerEvent } from '@server/lib/analyticEvents';

import { TCreateHandlerConfig } from './lib/create.models';

/**
 * Create an industry
 */
const create: TCreateHandlerConfig = {
  roles: [SUPER_ADMIN, TASK_RUNNER],
  analyticsEventBuilder: (ctx, input, industry) =>
    ctx.getGlobal('analytics').buildEvent({
      event: EServerEvent.INDUSTRY_CREATED,
      userId: ctx.identity.getEffectiveId(),
      timestamp: industry.createdAt,
      properties: {
        name: industry.name,
      },
    }),
  handler: createHandler,
};

export default create;
