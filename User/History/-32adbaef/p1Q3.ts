import {
  matchOrganizationId,
  policyAuthorizer,
} from '@server/domains/lib/auth/policy';
import { ADMIN, SUPER_ADMIN } from '@server/domains/lib/auth/roles';

import {
  ICreateUserListCSVFilePayload,
  TCreateUserListCSVFileContext,
} from './lib/createUserListCSVFile.models';
import { TRunLargeUserListCSVCreationFlowHandlerConfig } from './lib/runLargeUserListCSVCreationFlow.models';

/**
 * Umbrella handler to run CSV creation and sending an email with the resulting link
 */
const runLargeUserListCSVCreationFlow: TRunLargeUserListCSVCreationFlowHandlerConfig =
  {
    roles: [ADMIN, SUPER_ADMIN],
    inputAuthorizer: policyAuthorizer<
      TCreateUserListCSVFileContext,
      ICreateUserListCSVFilePayload
    >(
      matchOrganizationId({
        inputField: 'organizationId',
        exempt: [SUPER_ADMIN],
      })
    ),
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
