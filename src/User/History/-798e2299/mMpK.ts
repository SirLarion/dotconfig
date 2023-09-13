import { IBuildResult } from '@server/domains/integration/email/lib/build.models';
import { ISendPayload } from '@server/domains/integration/email/lib/send.models';
import { ESupportedLocales } from '@server/lib/i18n';
import { IUser } from '@server/lib/typedSchemas';
import { EEmailRecordType } from '@server/lib/typedSchemas/User/models';
import { TSendUserListCSVEmailContext } from './sendUserListCSVEmail.models';

const buildEmail =
  (ctx: TSendUserListCSVEmailContext) =>
  (buildConfig: {
    context: { user: IUser; startOnboardingUrl: string };
    template: { subject: string; body: string };
  }) =>
    ctx.handlers.integration.email.build(ctx, {
      ...buildConfig,
      languageCode: ESupportedLocales.EN,
    });

const buildCSVDownloadEmail =
  (ctx: TSendUserListCSVEmailContext, user: IUser) => (signedUrl: string) =>
    ctx
      .getAsset('email-templates/organization_onboarding_invite.html')
      .text()
      .then(body => ({
        template: { subject: "You're ready to onboard Hoxhunt", body },
        context: {
          startOnboardingUrl: signedUrl,
          user,
        },
      }))
      .then(buildEmail(ctx));

const getSendMailOptions =
  (ctx: TSendUserListCSVEmailContext, user: IUser) =>
  (builtMail: IBuildResult) =>
    ctx
      .getConfig('emailDelivery')
      .then(config => config.welcomeEmailSender)
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
