import R from 'ramda';

import { withOrganizationId, withUserId } from '@hox/telemetry-shared/context';

import { IOrganization } from '@server/collections/organizations';
import { EAuthenticationLevel } from '@server/domains/auth/otp/lib/createOtp.models';
import { IBuildResult } from '@server/domains/integration/email/lib/build.models';
import { ISendPayload } from '@server/domains/integration/email/lib/send.models';
import { TASK_RUNNER } from '@server/domains/lib/auth/roles';
import {
  withIdentityFromAuthInfo,
  withTaskRunnerRole,
} from '@server/domains/lib/contextWith';
import { EIdentityAuthenticationLevel } from '@server/domains/lib/identity';
import { ESupportedLocales } from '@server/lib/i18n';
import { IUser } from '@server/lib/typedSchemas';
import { EEmailRecordType } from '@server/lib/typedSchemas/User/models';
import { errorFailedPrecondition } from '@server/util/error';

import { createUserNotFoundError } from './lib/lib';
import { TStartContext } from './start.models';

type TRequiredUserData = Pick<IUser, '_id' | 'organizationId'>;

export const setOnboardingStartedAt = (
  ctx: TStartContext,
  organizationId: string
) =>
  ctx.handlers.collection.organization.patch(ctx, {
    id: organizationId,
    data: {
      onboardingStartedAt: ctx.getGlobal('newDate')(),
    },
  });

export const createOrganizationOnboardingTasks = async (
  ctx: TStartContext,
  organizationId: string
) => {
  const { onboardingTaskTemplates } =
    await ctx.handlers.admin.organizationOnboarding.getOnboardingTaskTemplates(
      ctx,
      {}
    );
  const createOnboardingTaskPromises = onboardingTaskTemplates.map(template =>
    ctx.handlers.collection.organizationOnboardingTask.create(ctx, {
      data: {
        organizationId,
        ...template,
      },
    })
  );
  return Promise.all(createOnboardingTaskPromises);
};

const buildEmail =
  (ctx: TStartContext) =>
  (buildConfig: {
    context: { [key: string]: any };
    template: { subject: string; body: string };
  }) =>
    ctx.handlers.integration.email.build(ctx, {
      ...buildConfig,
      languageCode: ESupportedLocales.EN,
    });

const buildOnboardingInvitationEmail =
  (ctx: TStartContext) => (signedUrl: string) =>
    ctx
      .getAsset('email-templates/organization_onboarding_invite.html')
      .text()
      .then(body => ({
        template: { subject: "You're ready to onboard Hoxhunt", body },
        context: { magicLoginUrl: signedUrl },
      }))
      .then(buildEmail(ctx));

const getSendMailOptions =
  (ctx: TStartContext, user: IUser) => (builtMail: IBuildResult) =>
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

const sendEmail = (ctx: TStartContext) => (emailPayload: ISendPayload) =>
  ctx.handlers.integration.email.send(ctx, emailPayload);

const buildAndSendAsUser =
  (ctx: TStartContext, loginUrl: string) => async (user: IUser) => {
    const userCtx = withIdentityFromAuthInfo(ctx, {
      authenticationLevel: EIdentityAuthenticationLevel.NORMAL,
      user,
    });
    return R.pipe(
      buildOnboardingInvitationEmail(withTaskRunnerRole(userCtx), loginUrl),
      R.then(getSendMailOptions(userCtx, user)),
      R.then(sendEmail(withTaskRunnerRole(userCtx)))
    )(user);
  };

const createLoginUrl =
  (ctx: TStartContext) =>
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
  ctx: TStartContext,
  organizationId: string
) => {
  const admins = await ctx.handlers.collection.user.findAdminsByOrganizationId(
    ctx,
    {
      organizationId,
    }
  );

  if (admins.length === 0) {
    throw errorFailedPrecondition(
      ctx,
      'No admin users exist in organization',
      withOrganizationId(organizationId)
    );
  }

  return R.map(
    R.pipe(
      createLoginUrl(ctx),
      R.then(buildOnboardingInvitationEmail(withTaskRunnerRole(ctx))),
      R.then()
    )
  )(admins);
};
