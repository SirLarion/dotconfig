import { remove as removeHandler } from '@server/domains/collection/lib/mongo';
import { SUPER_ADMIN, TASK_RUNNER } from '@server/domains/lib/auth/roles';
import { errorFailedPrecondition } from '@server/util/error';

import { TRemoveHandlerConfig } from './lib/remove.models';

/**
 * Remove an industry
 */
const remove: TRemoveHandlerConfig = {
  roles: [SUPER_ADMIN, TASK_RUNNER],
  async handler (ctx, { id }) {
    const industryOrgCount = await ctx.handlers.collection.organization.find(ctx, {}).then(c => c.count())
    if(industryOrgCount > 0) {
      throw errorFailedPrecondition(ctx, `Cannot remove industry. Organizations with this industry exist.`)
    }
    return await 
  },
};

export default remove;
