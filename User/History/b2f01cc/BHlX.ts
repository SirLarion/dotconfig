import { SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import { EServerEvent } from '@server/lib/analyticEvents';

import { TUpdateHandlerConfig } from './lib/update.models';

/**
 * Update the industry that an organization operates in
 */
const update: TUpdateHandlerConfig = {
  roles: [SUPER_ADMIN],
  analyticsEventBuilder: (ctx, organizationId, industryId) =>
    ctx.getGlobal('analytics').buildEvent({
      event: EServerEvent.ORGANIZATION_INDUSTRY_UPDATED,
      userId: ctx.identity.getId(),
      timestamp: ctx.getGlobal('newDate')(),
      properties: {
        industryId,
        organizationId,
      },
    }),
  async handler(ctx, { organizationId, industryId }) {
    return ctx.handlers.collection.organization.patch(ctx, {
      id: organizationId,
      data: { industryId },
    });
  },
};

export default update;
