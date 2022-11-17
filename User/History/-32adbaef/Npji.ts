import { ADMIN, SUPER_ADMIN } from '@server/domains/lib/auth/roles';

import { TRunLargeUserListCSVCreationFlowHandlerConfig } from './lib/runLargeUserListCSVCreationFlow.models';

/**
 * Umbrella handler to run CSV creation and sending an email with the resulting link
 */
const runLargeUserListCSVCreationFlow: TRunLargeUserListCSVCreationFlowHandlerConfig =
  {
    roles: [ADMIN, SUPER_ADMIN],
    async handler(ctx, payload) {
      const { signedUrl } =
        await ctx.handlers.admin.userManagement.createUserListCsvFile(
          ctx,
          payload
        );
      return await ctx.handlers.admin.userManagement.sendUserListCsvEmail(ctx, {
        signedUrl,
      });
    },
  };

export default runLargeUserListCSVCreationFlow;
