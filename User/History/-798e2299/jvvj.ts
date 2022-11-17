import { IBuildResult } from '@server/domains/integration/email/lib/build.models';
import { ESupportedLocales } from '@server/lib/i18n';
import { IUser } from '@server/lib/typedSchemas';
import { TSendUserListCSVEmailContext } from './sendUserListCSVEmail.models';

const buildEmail =
  (ctx: TSendUserListCSVEmailContext) =>
  (buildConfig: {
    context: { user: IUser; downloadUrl: string };
    template: { subject: string; body: string };
  }) =>
    ctx.handlers.integration.email.build(ctx, {
      ...buildConfig,
      languageCode: ESupportedLocales.EN,
    });

const buildOnboardingInvitationEmail =
  (ctx: TSendUserListCSVEmailContext, user: IUser) => (signedUrl: string) =>
    ctx
      .getAsset('email-templates/organization_onboarding_invite.html')
      .text()
      .then(body => ({
        template: { subject: "You're ready to onboard Hoxhunt", body },
        context: {
          downloadUrl: signedUrl,
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
        params: { emailType: EEmailRecordType.ORGANIZATION_SELF_ONBOARDING },
        userId: user._id,
        organizationId: user.organizationId,
      }));

const sendEmail = (
  ctx: TSendUserListCSVEmailContext,
  emailPayload: ISendPayload
) => ctx.handlers.integration.email.send(ctx, emailPayload);
