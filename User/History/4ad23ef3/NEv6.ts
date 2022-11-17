import R from 'ramda';

import { withOrganizationId } from '@hox/telemetry-shared/context';

import { EAuthenticationLevel } from '@server/domains/auth/otp/lib/createOtp.models';
import { IBuildResult } from '@server/domains/integration/email/lib/build.models';
import { ISendPayload } from '@server/domains/integration/email/lib/send.models';
import { ESupportedLocales } from '@server/lib/i18n';
import { IUser } from '@server/lib/typedSchemas';
import { EEmailRecordType } from '@server/lib/typedSchemas/User/models';
import { errorFailedPrecondition } from '@server/util/error';
import { TOnboardingInvitationContext } from './sendOnboardingInvitationToAdmins.models';

const buildEmail =
  (ctx: TOnboardingInvitationContext) =>
  (buildConfig: {
    context: { [key: string]: string };
    template: { subject: string; body: string };
  }) =>
    ctx.handlers.integration.email.build(ctx, {
      ...buildConfig,
      languageCode: ESupportedLocales.EN,
    });

const buildOnboardingInvitationEmail =
  (ctx: TOnboardingInvitationContext) => (signedUrl: string) =>
    ctx
      .getAsset('email-templates/organization_onboarding_invite.html')
      .text()
      .then(body => ({
        template: { subject: "You're ready to onboard Hoxhunt", body },
        context: { startOnboardingUrl: signedUrl },
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

const sendEmail =
  (ctx: TOnboardingInvitationContext) => (emailPayload: ISendPayload) =>
    ctx.handlers.integration.email.send(ctx, emailPayload);

const createLoginUrl =
  (ctx: TOnboardingInvitationContext) =>
  ({ _id: userId }: IUser) =>
    ctx
      .getConfig('defaultLoginRedirectUrl')
      .then(defaultRedirectUrl =>
        ctx.handlers.auth.jwt.createLoginUrl(ctx, {
          userId,
          authenticationLevel: EAuthenticationLevel.NORMAL,
          redirectUri: defaultRedirectUrl,
        })
      )
      .then(({ url: loginUrl }) => loginUrl);

export const sendOnboardingInvitationToOrgAdmins = async (
  ctx: TOnboardingInvitationContext,
  organizationId: string
) => {
  const admins = await ctx.handlers.collection.user.findAdminsByOrganizationId(
    ctx,
    { organizationId }
  );

  if (admins.length === 0) {
    throw errorFailedPrecondition(
      ctx,
      'No admin users exist in organization',
      withOrganizationId(organizationId)
    );
  }

  const emails = R.map((admin: IUser) =>
    R.pipe(
      createLoginUrl(ctx),
      R.then(buildOnboardingInvitationEmail(ctx)),
      R.then(getSendMailOptions(ctx, admin))
    )(admin)
  )(admins);
};
