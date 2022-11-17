import moment from 'moment';

import {
  ESignedUrlAction,
  EUploadContentDisposition,
} from '@server/domains/integration/googleCloudStorage/lib/models';
import {
  matchOrganizationId,
  policyAuthorizer,
} from '@server/domains/lib/auth/policy';
import { ADMIN, SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import { withTaskRunnerRole } from '@server/domains/lib/contextWith';

import { getFileWithFilePath } from './lib/createUserListCSVFile.lib';
import {
  ICreateUserListCSVFilePayload,
  TCreateUserListCSVFileContext,
  TCreateUserListCSVFileHandlerConfig,
} from './lib/createUserListCSVFile.models';

export const EXPORT_DENIED_ERROR = 'Permission for exporting user data denied';

const CSV_FILENAME = 'hoxhunt-user-data.csv';

/**
 * Creates a downloadable CSV file out of a list of users that match given parameters
 */
const createUserListCSVFile: TCreateUserListCSVFileHandlerConfig = {
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
  async handler(ctx, { organizationId, selectedColumns, searchParams }) {
    const { fileContents, remoteFilePath } = await getFileWithFilePath({
      ctx,
      organizationId,
      selectedDataIds: selectedColumns,
      ...searchParams,
    });
    const bucketName = await ctx.getConfig('googleCloudStorageBucket');

    const { resourceUrl } =
      await ctx.handlers.integration.googleCloudStorage.upload(
        withTaskRunnerRole(ctx),
        {
          bucketName,
          fileContents,
          remoteFilePath,
          fileName: CSV_FILENAME,
          uploadType: 'content',
          contentDisposition: EUploadContentDisposition.ATTACHMENT,
        }
      );

    const expiresAt = moment().add(24, 'h').toDate();

    return await ctx.handlers.integration.googleCloudStorage.getSignedUrl(ctx, {
      resourceUrl,
      options: {
        action: ESignedUrlAction.READ,
        expires: expiresAt,
      },
    });
  },
};

export default createUserListCSVFile;
