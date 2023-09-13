import { escapeRegExp } from 'lodash';
import R from 'ramda';

import { ANONYMOUS } from '@server/domains/lib/auth/roles';
import { withTaskRunnerRole } from '@server/domains/lib/contextWith';
import { ESupportedLocales } from '@server/lib/i18n';
import { IUser } from '@server/lib/typedSchemas';
import { EEmailRecordType } from '@server/lib/typedSchemas/User/models';
import { withTaskRunnerIdentity } from '@server/startup/fixtures/taskRunnerUser';

import { EAuthenticationLevel } from '../otp/lib/createOtp.models';

import { createUserNotFoundError } from './lib/lib';
import {
  TSendJwtMagicLinkViaEmailContext as TCtx,
  TSendJwtMagicLinkViaEmailHandlerConfig,
} from './lib/sendJwtMagicLinkViaEmail.models';

const EMAIL_LIMIT_WINDOW_SECONDS = 3600; // hour
const MAX_SEND_COUNT = 5;

const checkUser = (emailAddress: string) => (user?: IUser) => {
  if (!user) {
    throw createUserNotFoundError({
      msg: 'User was not found with the given email address',
      info: { emailAddress },
    });
  }

  return user;
};

const checkIsRateLimited = (ctx: TCtx) => async (user: IUser) => {
  await ctx.handlers.integration.email.imposeDeliveryLimit(ctx, {
    emailRecordType: EEmailRecordType.LOGIN_LINK,
    limitSeconds: EMAIL_LIMIT_WINDOW_SECONDS,
    maxSendCount: MAX_SEND_COUNT,
    userId: user._id,
  });

  return user;
};

const getUserWithEmail =
  (ctx: TCtx) =>
  (emailAddress: string): Promise<Pick<IUser, '_id'>> =>
    ctx.handlers.collection.user
      .find(withTaskRunnerRole(ctx), {
        params: {
          selector: {
            'emails.address': new RegExp(escapeRegExp(emailAddress), 'i'),
          },
          options: { limit: 1, fields: { _id: 1, organizationId: 1 } },
        },
      })
      .then(cursor => cursor.fetch())
      .then(users => R.head(users));

const sendEmail =
  (ctx: TCtx, languageOverride?: ESupportedLocales) =>
  ({
    userId,
    organizationId,
    loginUrl,
  }: {
    userId: string;
    organizationId: string;
    loginUrl: string;
  }) =>
    ctx.handlers.auth.email.sendMagicLinkEmail(ctx, {
      userId,
      organizationId,
      loginUrl,
      languageOverride,
    });

const createLoginUrl =
  (ctx: TCtx, redirectUri?: string) =>
  ({ _id: userId, organizationId }: Pick<IUser, '_id' | 'organizationId'>) =>
    ctx
      .getConfig('defaultLoginRedirectUrl')
      .then(defaultRedirectUrl =>
        ctx.handlers.auth.jwt.createLoginUrl(ctx, {
          userId,
          authenticationLevel: EAuthenticationLevel.NORMAL,
          redirectUri: redirectUri || defaultRedirectUrl,
        })
      )
      .then(({ url: loginUrl }) => ({
        loginUrl,
        userId,
        organizationId,
      }));

const sendJwtMagicLinkViaEmail: TSendJwtMagicLinkViaEmailHandlerConfig = {
  roles: [ANONYMOUS],
  handler: async (ctx, { emailAddress, redirectUri, languageOverride }) => {
    const elevatedCtx = await withTaskRunnerIdentity(ctx);

    return R.pipe(
      getUserWithEmail(elevatedCtx),
      R.then(checkUser(emailAddress)),
      R.then(checkIsRateLimited(elevatedCtx)),
      R.then(createLoginUrl(elevatedCtx, redirectUri)),
      R.then(sendEmail(elevatedCtx, languageOverride))
    )(emailAddress);
  },
};

export default sendJwtMagicLinkViaEmail;
