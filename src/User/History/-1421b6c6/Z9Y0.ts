import { ACL } from '@server/domains/lib/auth/roles';

import { buildResourceUrl, getStorageClient } from './lib/lib';
import { uploadToGoogleStorage } from './lib/upload.lib';
import { TUploadHandlerConfig } from './lib/upload.models';

const upload: TUploadHandlerConfig = {
  roles: [ACL.Roles.SUPER_ADMIN, ACL.Roles.TASK_RUNNER],
  async handler(ctx, payload) {
    const storageClient = await getStorageClient(ctx);
    const bucket = storageClient.bucket(payload.bucketName);

    await uploadToGoogleStorage(bucket, payload);

    return {
      resourceUrl: buildResourceUrl(payload.bucketName, payload.remoteFilePath),
    };
  },
};

export default upload;
