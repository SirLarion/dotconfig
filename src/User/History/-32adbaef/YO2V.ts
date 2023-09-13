import {
  matchOrganizationId,
  policyAuthorizer,
} from '@server/domains/lib/auth/policy';
import { ADMIN, SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import { withTaskRunnerRole } from '@server/domains/lib/contextWith';

import {
  IRunLargeUserListCSVCreationFlowPayload,
  TRunLargeUserListCSVCreationFlowContext,
  TRunLargeUserListCSVCreationFlowHandlerConfig,
} from './lib/runLargeUserListCSVCreationFlow.models';

/**
 * Umbrella handler to run CSV creation and sending an email with the resulting link
 */
const runLargeUserListCSVCreationFlow: TRunLargeUserListCSVCreationFlowHandlerConfig =
  {
    roles: [ADMIN, SUPER_ADMIN],
    inputAuthorizer: policyAuthorizer<
      TRunLargeUserListCSVCreationFlowContext,
      IRunLargeUserListCSVCreationFlowPayload
    >(
      matchOrganizationId({
        inputField: 'organizationId',
        exempt: [SUPER_ADMIN],
      })
    ),
    async handler(ctx, { userId, ...payload }) {
      const { signedUrl } =
        await ctx.handlers.admin.userManagement.createUserListCsvFile(
          ctx,
          payload
        );
      return ctx.handlers.admin.userManagement.sendUserListCsvEmail(
        withTaskRunnerRole(ctx),
        {
          signedUrl,
          userId,
        }
      );
    },
  };

export default runLargeUserListCSVCreationFlow;
