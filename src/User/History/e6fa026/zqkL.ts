import {
  withCount,
  withUserId,
} from '@hox/telemetry-shared/gen_attribute_setters';

import { remove as removeHandler } from '@server/domains/collection/lib/mongo';
import { SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import { EServerEvent } from '@server/lib/analyticEvents';
import { errorFailedPrecondition } from '@server/util/error';

import { TRemoveHandlerConfig } from './lib/remove.models';

/**
 * Remove an industry
 */
const remove: TRemoveHandlerConfig = {
  roles: [SUPER_ADMIN],
  analyticsEventBuilder: (ctx, _, industry) =>
    ctx.getGlobal('analytics').buildEvent({
      event: EServerEvent.INDUSTRY_DELETED,
      userId: ctx.identity.getId(),
      timestamp: industry.softDeletedAt,
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
        `Cannot remove industry with ID: ${id}. Organizations exist under this industry.`,
        withUserId(ctx.identity.getId()),
        withCount(industryOrgCount)
      );
    }

    return removeHandler(ctx, { id });
  },
};

export default remove;
