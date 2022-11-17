import R from 'ramda';

import { withOrganizationId, withUserId } from '@hox/telemetry-shared/context';

import { IOrganization } from '@server/collections/organizations';
import { IBuildResult } from '@server/domains/integration/email/lib/build.models';
import { ISendPayload } from '@server/domains/integration/email/lib/send.models';
import { TASK_RUNNER } from '@server/domains/lib/auth/roles';
import {
  withIdentityFromAuthInfo,
  withTaskRunnerRole,
} from '@server/domains/lib/contextWith';
import { EIdentityAuthenticationLevel } from '@server/domains/lib/identity';
import { THandlerContext } from '@server/domains/lib/models';
import { ESupportedLocales } from '@server/lib/i18n';
import { IUser } from '@server/lib/typedSchemas';
import { EEmailRecordType } from '@server/lib/typedSchemas/User/models';
import { errorFailedPrecondition } from '@server/util/error';

import { createUserNotFoundError } from './lib/lib';
import { TSendMagicLinkEmailHandlerConfig } from './lib/sendMagicLinkEmail.models';

type TRequiredUserData = Pick<IUser, '_id' | 'organizationId'>;

type TRequiredOrgData = Pick<IOrganization, 'sso'>;

const checkUser =
  (emailAddress: string) =>
  (user?: TRequiredUserData): TRequiredUserData => {
    if (!user) {
      throw createUserNotFoundError({
        msg: 'User was not found with the given email address',
        info: { emailAddress },
      });
    }

    return user;
  };

const checkMagicLinkIsAllowed =
  (ctx: THandlerContext) => async (user: TRequiredUserData) => {
    const org: TRequiredOrgData =
      await ctx.handlers.collection.organization.get(ctx, {
        id: user.organizationId,
        params: {
          selector: {},
          options: {
            fields: {
              sso: 1,
            },
          },
        },
      });

    if (org?.sso?.enabled) {
      throw errorFailedPrecondition(
        ctx,
        'Magic link login is not allowed for orgs with configured SSO',
        withUserId(user._id),
        withOrganizationId(user.organizationId)
      );
    }

    return user;
  };

const getHiddenEmailBodyIdentifier = (ctx: THandlerContext, orgId: string) =>
  ctx.handlers.collection.organization
    .get(ctx, {
      id: orgId,
      params: {
        selector: {},
        options: {
          fields: {
            delivery: 1,
          },
        },
      },
    })
    .then(res => res?.delivery?.email?.customHiddenEmailBodyIdentifier);

const getUser = (ctx: THandlerContext) => (userId: string) =>
  ctx.handlers.collection.user.get(ctx, { id: userId });

const buildEmail =
  (
    ctx: THandlerContext,
    user: { profile: { locale?: { ui?: ESupportedLocales } } },
    languageOverride?: ESupportedLocales
  ) =>
  (buildConfig: {
    context: { [key: string]: any };
    template: { subject: string; body: string };
  }) =>
    ctx.handlers.integration.email.build(ctx, {
      ...buildConfig,
      languageCode:
        languageOverride || user.profile.locale.ui || ESupportedLocales.EN,
    });

const buildMagicLinkEmail =
  (
    ctx: THandlerContext,
    signedUrl: string,
    customHiddenEmailBodyIdentifier?: string,
    languageOverride?: ESupportedLocales
  ) =>
  (user: IUser) =>
    ctx
      .getAsset('email-templates/magic_link_login.html')
      .text()
      .then(body => ({
        template: { subject: '[Hoxhunt] Sign in link', body },
        context: { magicLoginUrl: signedUrl, customHiddenEmailBodyIdentifier },
      }))
      .then(buildEmail(ctx, user, languageOverride));

const getSendMailOptions =
  (ctx: THandlerContext, user: IUser) => (builtMail: IBuildResult) =>
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
        params: { emailType: EEmailRecordType.LOGIN_LINK },
        userId: user._id,
        organizationId: user.organizationId,
      }));

const sendEmail = (ctx: THandlerContext) => (emailPayload: ISendPayload) =>
  ctx.handlers.integration.email.send(ctx, emailPayload);

const buildAndSendAsUser =
  (
    ctx: THandlerContext,
    loginUrl: string,
    languageOverride?: ESupportedLocales
  ) =>
  async (user: IUser) => {
    const userCtx = withIdentityFromAuthInfo(ctx, {
      authenticationLevel: EIdentityAuthenticationLevel.NORMAL,
      user,
    });
    const customHiddenEmailBodyIdentifier = await getHiddenEmailBodyIdentifier(
      ctx,
      user.organizationId
    );
    const identifierElement = customHiddenEmailBodyIdentifier
      ? `<a href="http://${customHiddenEmailBodyIdentifier}" style="font-size:0px; text-decoration:none;"><p>&nbsp;</p></a>`
      : undefined;
    return R.pipe(
      buildMagicLinkEmail(
        withTaskRunnerRole(userCtx),
        loginUrl,
        identifierElement,
        languageOverride
      ),
      R.then(getSendMailOptions(userCtx, user)),
      R.then(sendEmail(withTaskRunnerRole(userCtx)))
    )(user);
  };

const sendMagicLinkEmail: TSendMagicLinkEmailHandlerConfig = {
  roles: [TASK_RUNNER],
  telemetry: {
    inputToLogMessageAttributes: payload => [
      withUserId(payload.userId),
      withOrganizationId(payload.organizationId),
    ],
  },
  handler: async (ctx, { loginUrl, userId, languageOverride }) =>
    R.pipe(
      getUser(ctx),
      R.then(checkUser(userId)),
      R.then(checkMagicLinkIsAllowed(ctx)),
      R.then(buildAndSendAsUser(ctx, loginUrl, languageOverride))
    )(userId),
};

export default sendMagicLinkEmail;
