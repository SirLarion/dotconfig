import { create as createHandler } from '@server/domains/collection/lib/mongo';
import { SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import { EServerEvent } from '@server/lib/analyticEvents';

import { TCreateHandlerConfig } from './lib/create.models';

/**
 * Create an industry
 */
const create: TCreateHandlerConfig = {
  roles: [SUPER_ADMIN],
  analyticsEventBuilder: (ctx, _, industry) =>
    ctx.getGlobal('analytics').buildEvent({
      event: EServerEvent.INDUSTRY_CREATED,
      userId: ctx.identity.getId(),
      timestamp: industry.createdAt,
      properties: {
        industryId: industry._id,
        name: industry.name,
      },
    }),
  handler: createHandler,
};

export default create;
