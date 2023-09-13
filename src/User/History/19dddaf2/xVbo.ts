import { createConnection } from '@server/api/graphql/connection';
import { ADMIN, SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import { withTaskRunnerRole } from '@server/domains/lib/contextWith';

import { clampSelectorToTestTemplates } from './lib/findTestTemplates.lib';
import { TFindTestTemplatesHandlerConfig } from './lib/findTestTemplates.models';

/**
 * Find quest templates which are used only for technical testing purposes
 */
const findTestTemplates: TFindTestTemplatesHandlerConfig = {
  roles: [ADMIN, SUPER_ADMIN],
  handler: (ctx, payload) => {
    const { grapqhQLResolveInfo, params } = payload;

    return createConnection(
      withTaskRunnerRole(ctx),
      ctx.handlers.collection.questTemplate,
      clampSelectorToTestTemplates(params),
      grapqhQLResolveInfo
    );
  },
};

export default findTestTemplates;
