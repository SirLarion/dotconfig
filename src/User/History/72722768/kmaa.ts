import { ADMIN, SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import { sendCSVDownloadEmail } from './lib/sendUserListCSVEmail.lib';

import { TSendUserListCSVEmailHandlerConfig } from './lib/sendUserListCSVEmail.models';

/**
 * Sends an email to an admin containing a link to fetch a CSV with user data from GCS
 */
const sendUserListCSVEmail: TSendUserListCSVEmailHandlerConfig = {
  roles: [ADMIN, SUPER_ADMIN],
  async handler(ctx, { signedUrl }) {
    return await sendCSVDownloadEmail(ctx, signedUrl);
  },
};

export default sendUserListCSVEmail;
