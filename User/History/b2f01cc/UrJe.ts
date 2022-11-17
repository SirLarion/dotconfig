import { SUPER_ADMIN } from '@server/domains/lib/auth/roles';

import { TUpdateHandlerConfig } from './lib/update.models';

/**
 * Update the industry that an organization operates in
 */
const update: TUpdateHandlerConfig = {
  roles: [SUPER_ADMIN],
  async handler(ctx, { organizationId, industryId }) {
    return ctx.handlers.collection.organization.patch(ctx, {
      id: organizationId,
      data: { industryId },
    });
  },
};

export default update;
