import { IBuildResult } from '@server/domains/integration/email/lib/build.models';
import { ISendPayload } from '@server/domains/integration/email/lib/send.models';
import { ESupportedLocales } from '@server/lib/i18n';
import { IUser } from '@server/lib/typedSchemas';
import { EEmailRecordType } from '@server/lib/typedSchemas/User/models';

import { TSendUserListCSVEmailContext } from './sendUserListCSVEmail.models';

const buildEmail =
  (ctx: TSendUserListCSVEmailContext) =>
  (buildConfig: {
    context: { downloadUrl: string };
    template: { subject: string; body: string };
  }) =>
    ctx.handlers.integration.email.build(ctx, {
      ...buildConfig,
      languageCode: ESupportedLocales.EN,
    });

const buildCSVDownloadEmail =
  (ctx: TSendUserListCSVEmailContext) => (signedUrl: string) =>
    ctx
      .getAsset('email-templates/csv_download_link.html')
      .text()
      .then(body => ({
        template: { subject: 'CSV export download link', body },
        context: {
          downloadUrl: signedUrl,
        },
      }))
      .then(buildEmail(ctx));

const getSendMailOptions =
  (ctx: TSendUserListCSVEmailContext, user: IUser) =>
  (builtMail: IBuildResult) =>
    ctx
      .getConfig('emailDelivery')
      .then(config => config.appEmailSender)
      .then(from => ({
        mailOptions: {
          from,
          to: user.emails[0].address,
          subject: builtMail.subject,
          html: builtMail.body,
        },
        params: { emailType: EEmailRecordType.DOWNLOAD_LINK },
        userId: user._id,
        organizationId: user.organizationId,
      }));

const sendEmail = (
  ctx: TSendUserListCSVEmailContext,
  emailPayload: ISendPayload
) => ctx.handlers.integration.email.send(ctx, emailPayload);

export const sendCSVDownloadEmail = (
  ctx: TSendUserListCSVEmailContext,
  signedUrl: string
) => {
  const email = await R.pipe(
    R.then(buildCSVDownloadEmail(ctx)),
    R.then(getSendMailOptions(ctx))
  )();
  return sendEmail(ctx, email);
};
