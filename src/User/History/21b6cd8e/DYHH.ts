import { TASK_RUNNER } from '@server/domains/lib/auth/roles';
import { defaultUserTraceAttributes } from '@server/domains/lib/telemetry';

import {
  doInsertMessageRequest,
  getInsertMessageAccessToken,
  getInsertParams,
  getRecipientAddress,
} from './lib/insertMessage.lib';
import { TInsertMessageHandlerConfig } from './lib/insertMessage.models';

const insertMessage: TInsertMessageHandlerConfig = {
  telemetry: {
    inputToLogMessageAttributes: defaultUserTraceAttributes,
  },
  roles: [TASK_RUNNER],
  async handler(ctx, { mail, userId, organizationId, options }) {
    const emailAddress = getRecipientAddress(mail);
    const [insertParams, accessToken] = await Promise.all([
      getInsertParams(ctx, mail, options),
      getInsertMessageAccessToken(ctx, organizationId, emailAddress),
    ]);

    const insertionResult = await doInsertMessageRequest(
      ctx,
      accessToken,
      insertParams
    );

    if (insertionResult.statusCode !== 200) {
      throw new Error(
        `Failed to insert email: ${insertionResult.data.error?.message}`
      );
    }

    return {};
  },
};

export default insertMessage;
