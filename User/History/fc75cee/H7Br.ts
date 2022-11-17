import moment from 'moment';

import { ESignedUrlAction } from '@server/domains/integration/googleCloudStorage/lib/models';
import { ADMIN, SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import { withTaskRunnerRole } from '@server/domains/lib/contextWith';
import { errorPermissionDenied } from '@server/util/error';

import { getFileWithFilePath } from './lib/createUserListCSVFile.lib';
import { TCreateUserListCSVFileHandlerConfig } from './lib/createUserListCSVFile.models';
import { isAdminOnly } from '@server/domains/user/adminAction/lib/util';

export const NO_USERS_ERROR = 'No users provided for export';
export const EXPORT_DENIED_ERROR = 'Permission for exporting user data denied';

/**
 * Creates a downloadable CSV file out of a list of users that match given parameters
 */
const createUserListCSVFile: TCreateUserListCSVFileHandlerConfig = {
  roles: [ADMIN, SUPER_ADMIN],
  async handler(ctx, { organizationId, selectedColumns, searchParams }) {
    const ctxOrgId = ctx.identity.getOrganizationId();
    if (isAdminOnly(ctx) && organizationId !== ctxOrgId) {
      throw errorPermissionDenied(
        ctx,
        'Exporting user list CSV denied',
        withOrganizationId()
      );
    }
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
          uploadType: 'content',
          remoteFilePath,
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
