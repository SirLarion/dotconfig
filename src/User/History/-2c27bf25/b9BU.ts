import { distinct } from '@server/domains/collection/lib/mongo';
import {
  matchOrganizationId,
  policyAuthorizer,
  whitelistInputValues,
} from '@server/domains/lib/auth/policy';
import {
  ADMIN,
  SUPER_ADMIN,
  TASK_RUNNER,
} from '@server/domains/lib/auth/roles';

import {
  IDistinctPayload,
  TDistinctContext,
  TDistinctHandlerConfig,
} from './lib/distinct.models';

const handler: TDistinctHandlerConfig = {
  roles: [SUPER_ADMIN, ADMIN, TASK_RUNNER],
  inputAuthorizer: policyAuthorizer<TDistinctContext, IDistinctPayload>(
    matchOrganizationId({
      inputField: 'selector.organizationId',
      exempt: [SUPER_ADMIN, TASK_RUNNER],
    }),
    whitelistInputValues({
      allowedValues: [
        'profile.department',
        'profile.country',
        'profile.site',
        'profile.city',
      ],
      inputField: 'key',
      exempt: [],
    })
  ),

  handler: distinct,
};

export default handler;
