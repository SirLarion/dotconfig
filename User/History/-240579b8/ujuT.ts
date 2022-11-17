import { patch as patchHandler } from '@server/domains/collection/lib/mongo';
import { SUPER_ADMIN, TASK_RUNNER } from '@server/domains/lib/auth/roles';
import { EServerEvent } from '@server/lib/analyticEvents';

import { TPatchHandlerConfig } from './lib/patch.models';

/**
 * Update the data of an industry
 */
const patch: TPatchHandlerConfig = {
  roles: [SUPER_ADMIN, TASK_RUNNER],
  analyticsEventBuilder: (ctx, _, industry) =>
    ctx.getGlobal('analytics').buildEvent({
      event: EServerEvent.INDUSTRY_DELETED,
      userId: ctx.identity.getId(),
      timestamp: industry.createdAt,
      properties: {
        industryId: industry._id,
        name: industry.name,
      },
    }),
  handler: patchHandler,
};

export default patch;
