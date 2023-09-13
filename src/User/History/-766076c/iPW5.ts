import { withOrganizationId, withUserId } from '@hox/telemetry-shared/context';

import {
  blacklistInput,
  policyAuthorizer,
} from '@server/domains/lib/auth/policy';
import { EUserRole } from '@server/domains/lib/auth/roles';
import { deferAsTaskRunner } from '@server/domains/lib/defer';
import { EMetricResultLabel } from '@server/domains/lib/prometheus/models';
import { defaultUserTraceAttributes } from '@server/domains/lib/telemetry';

import { getResponseCodeFromResponse } from './lib/deliver.lib';
import {
  deliverEmail,
  getEmailDeliveryArgs,
  getUserAndOrg,
  parseAddress,
  saveEmailRecord,
  trackDeliveryMetric,
} from './lib/send.lib';
import {
  ISendPayload,
  TSendContext,
  TSendHandlerConfig,
} from './lib/send.models';

const send: TSendHandlerConfig = {
  roles: [EUserRole.SUPER_ADMIN, EUserRole.ADMIN, EUserRole.TASK_RUNNER],
  inputAuthorizer: policyAuthorizer<TSendContext, ISendPayload>(
    blacklistInput({
      fields: ['mailOptions.bcc', 'mailOptions.cc', 'mailOptions.headers'],
      exempt: [EUserRole.SUPER_ADMIN, EUserRole.TASK_RUNNER],
    })
  ),
  telemetry: {
    inputToLogMessageAttributes: defaultUserTraceAttributes,
  },
  async handler(ctx, payload) {
    const finalParams = {
      ...payload.params,
    };

    const address = parseAddress(payload.mailOptions.to);
    const { organization, user } = await getUserAndOrg(
      ctx,
      address,
      finalParams.emailType
    );

    const mailDeliveryArgs = await getEmailDeliveryArgs(
      ctx,
      organization,
      payload.mailOptions
    );

    try {
      const sentMessageInfo = await deliverEmail(
        ctx,
        organization,
        mailDeliveryArgs,
        user._id
      );

      trackDeliveryMetric(ctx, {
        emailType: finalParams.emailType,
        organization: organization._id,
        result: EMetricResultLabel.SUCCESS,
      });

      // In some cases an email recipient may be listed as 'pending'.
      if (sentMessageInfo.pending && sentMessageInfo.pending.length > 0) {
        ctx
          .getContextLogger()
          .warn(
            ctx,
            'A successful email delivery has pending recipients.',
            withOrganizationId(organization._id),
            withUserId(user._id)
          );
      }

      const responseCode = getResponseCodeFromResponse(
        sentMessageInfo.response
      );

      await saveEmailRecord(
        ctx,
        {
          organizationId: user.organizationId,
          user,
          emailType: finalParams.emailType,
          ...(!isNaN(responseCode) && { responseCode }),
        },
        sentMessageInfo
      );

      return sentMessageInfo;
    } catch (error) {
      const responseCode = error.responseCode;
      // Response code is numeric standard SMTP Response code.
      // Nodemailer adds it to delivery errors it throws
      if (typeof responseCode === 'number') {
        await saveEmailRecord(
          ctx,
          {
            organizationId: user.organizationId,
            user,
            emailType: finalParams.emailType,
            responseCode,
          },
          {
            messageId: mailDeliveryArgs.mail.messageId,
          }
        );
      }

      if (responseCode === 550) {
        await deferAsTaskRunner(
          ctx,
          ctx.handlers.game.user.imposeDeliveryCooldown,
          { userId: user._id }
        );
      }

      trackDeliveryMetric(ctx, {
        emailType: finalParams.emailType,
        organization: organization._id,
        result: EMetricResultLabel.FAILURE,
        ...(responseCode && { responseCode }),
      });
      throw error;
    }
  },
};

export default send;
