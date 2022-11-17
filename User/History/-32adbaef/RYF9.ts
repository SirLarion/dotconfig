import { ADMIN, SUPER_ADMIN } from '@server/domains/lib/auth/roles';

import { TRunLargeUserListCSVCreationFlowHandlerConfig } from './lib/runLargeUserListCSVCreationFlow.models';

/**
 * Umbrella handler to run CSV creation and sending an email with the resulting link
 */
const runLargeUserListCSVCreationFlow: TRunLargeUserListCSVCreationFlowHandlerConfig =
  {
    roles: [ADMIN, SUPER_ADMIN],
    async handler(ctx, payload) {
      return {};
    },
  };

export default runLargeUserListCSVCreationFlow;
