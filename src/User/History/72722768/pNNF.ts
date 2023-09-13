import { TASK_RUNNER } from '@server/domains/lib/auth/roles';

import { sendCSVDownloadEmail } from './lib/sendUserListCSVEmail.lib';
import { TSendUserListCSVEmailHandlerConfig } from './lib/sendUserListCSVEmail.models';

/**
 * Sends an email to an admin containing a link to fetch a CSV with user data from GCS
 */
const sendUserListCSVEmail: TSendUserListCSVEmailHandlerConfig = {
  roles: [TASK_RUNNER],
  async handler(ctx, { signedUrl, userId }) {
    return await sendCSVDownloadEmail(ctx, signedUrl, userId);
  },
};

export default sendUserListCSVEmail;
