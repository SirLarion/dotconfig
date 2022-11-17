const buildEmail =
  (ctx: TOnboardingInvitationContext) =>
  (buildConfig: {
    context: { user: IUser; startOnboardingUrl: string };
    template: { subject: string; body: string };
  }) =>
    ctx.handlers.integration.email.build(ctx, {
      ...buildConfig,
      languageCode: ESupportedLocales.EN,
    });

const buildOnboardingInvitationEmail =
  (ctx: TOnboardingInvitationContext, user: IUser) => (signedUrl: string) =>
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
  (ctx: TOnboardingInvitationContext, user: IUser) =>
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
  ctx: TOnboardingInvitationContext,
  emailPayload: ISendPayload
) => ctx.handlers.integration.email.send(ctx, emailPayload);
