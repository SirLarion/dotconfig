import { withUserId } from '@hox/telemetry-shared/gen_attribute_setters';
import { remove as removeHandler } from '@server/domains/collection/lib/mongo';
import { SUPER_ADMIN, TASK_RUNNER } from '@server/domains/lib/auth/roles';
import { EServerEvent } from '@server/lib/analyticEvents';
import { errorFailedPrecondition } from '@server/util/error';

import { TRemoveHandlerConfig } from './lib/remove.models';

/**
 * Remove an industry
 */
const remove: TRemoveHandlerConfig = {
  roles: [SUPER_ADMIN, TASK_RUNNER],
  analyticsEventBuilder: (ctx, _, industry) =>
    ctx.getGlobal('analytics').buildEvent({
      event: EServerEvent.INDUSTRY_INFO_UPDATED,
      userId: ctx.identity.getId(),
      timestamp: industry.createdAt,
      properties: {
        industryId: industry._id,
        name: industry.name,
      },
    }),
  async handler(ctx, { id }) {
    const industryOrgCount = await ctx.handlers.collection.organization
      .find(ctx, { params: { selector: { industryId: id } } })
      .then(c => c.count());
    if (industryOrgCount > 0) {
      throw errorFailedPrecondition(
        ctx,
        `Cannot remove industry. Organizations with this industry exist.`,
        withUserId(ctx.identity.getId())
      );
    }
    return removeHandler(ctx, { id });
  },
};

export default remove;
