import moment from 'moment';
import { isEmpty } from 'ramda';

import { ESignedUrlAction } from '@server/domains/integration/googleCloudStorage/lib/models';
import { ADMIN, SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import { withTaskRunnerRole } from '@server/domains/lib/contextWith';
import {
  errorFailedPrecondition,
  errorPermissionDenied,
} from '@server/util/error';

import { getFileWithFilePath } from './lib/createUserListCSVFile.lib';
import { TCreateUserListCSVFileHandlerConfig } from './lib/createUserListCSVFile.models';

export const NO_USERS_ERROR = 'No users provided for export';
export const EXPORT_DENIED_ERROR = 'Permission for exporting user data denied';
const LOW_USER_COUNT = 1000;

/**
 * Creates a downloadable CSV file out of a list of users that match given parameters
 */
const createUserListCSVFile: TCreateUserListCSVFileHandlerConfig = {
  roles: [ADMIN, SUPER_ADMIN],
  async handler(ctx, { userCount, selectedColumns, searchParams }) {
    if (userCount === 0) {
      throw errorFailedPrecondition(ctx, NO_USERS_ERROR);
    }

    const { fileContents, remoteFilePath } = await getFileWithFilePath({
      ctx,
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

    const { signedUrl } =
      await ctx.handlers.integration.googleCloudStorage.getSignedUrl(ctx, {
        resourceUrl,
        options: {
          action: ESignedUrlAction.READ,
          expires: expiresAt,
        },
      });

    // if (userCount > LOW_USER_COUNT) {
    // }

    return {
      signedUrl,
    };
  },
};

export default createUserListCSVFile;
