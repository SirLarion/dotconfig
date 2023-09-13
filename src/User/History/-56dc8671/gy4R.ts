import { Request } from 'express';
import R from 'ramda';

import { IVerifyAccessTokenResult } from '@server/domains/auth/jwt/lib/verifyAccessToken.models';
import { EAuthenticationLevel } from '@server/domains/auth/otp/lib/createOtp.models';
import { EUserRole } from '@server/domains/lib/auth/roles';
import { withTaskRunnerRole } from '@server/domains/lib/contextWith';
import { EIdentityAuthenticationLevel } from '@server/domains/lib/identity';
import { THandlerContext } from '@server/domains/lib/models';
import { IRoles } from '@server/lib/typedSchemas/User/MinimalUser';

import {
  IApiAuthenticatorConf,
  TAuthenticator,
  TAuthenticatorResult,
} from '../models';
import { getAccessToken, getUnauthenticatedResult } from '../util';

const verifyAccessToken = (ctx: THandlerContext, req: Request) =>
  ctx.handlers.auth.jwt.verifyAccessToken(ctx, {
    jwt: getAccessToken(req),
  });

const removeGroupsWithoutUserRole = R.filter(
  R.pipe(R.nth(1), R.includes(EUserRole.USER))
);

const createGroupsWithJustUserRole: (organizationIds: string[]) => IRoles =
  R.reduce(
    (acc, organizationId: string) => ({
      ...acc,
      [organizationId]: [EUserRole.USER],
    }),
    {}
  );

/**
 * Takes an IRoles object and returns a new object that's a copy of the input
 * IRoles with all but user roles removed.
 *
 * Any groups left empty are removed.
 *
 * @param roles
 */
export const filterNonUserRoles: (roles: IRoles) => IRoles = R.pipe(
  R.toPairs,
  removeGroupsWithoutUserRole,
  R.map(R.nth(0)),
  createGroupsWithJustUserRole
);

const getEffectiveRoles = (tokenInfo: IVerifyAccessTokenResult) =>
  tokenInfo.authenticationLevel === EAuthenticationLevel.WEAK
    ? filterNonUserRoles(tokenInfo.roles)
    : tokenInfo.roles;

export const resolveIdentityAuthNLevel = (
  tokenAuthNLevel: EAuthenticationLevel
) => {
  switch (tokenAuthNLevel) {
    case EAuthenticationLevel.NORMAL:
      return EIdentityAuthenticationLevel.NORMAL;
    case EAuthenticationLevel.WEAK:
      return EIdentityAuthenticationLevel.WEAK;
    default:
      throw new Error('Unknown authentication level in token');
  }
};

const mapTokenToIdentity = (
  tokenInfo: IVerifyAccessTokenResult
): TAuthenticatorResult => {
  console.log(tokenInfo);
  return {
    isAuthorized: true,
    authenticationLevel: resolveIdentityAuthNLevel(
      tokenInfo.authenticationLevel
    ),
    user: {
      _id: tokenInfo.sub,
      organizationId: tokenInfo.organizationId,
      roles: getEffectiveRoles(tokenInfo),
      ...(tokenInfo.impersonatorId && {
        impersonatorId: tokenInfo.impersonatorId,
      }),
    },
  };
};

export const accessTokenAuthenticate: TAuthenticator = async req => {
  const ctx = withTaskRunnerRole(req.ctx);
  try {
    const tokenInfo = await verifyAccessToken(ctx, req);
    return mapTokenToIdentity(tokenInfo);
  } catch (error) {
    return getUnauthenticatedResult(false);
  }
};

export const authenticatorConf: IApiAuthenticatorConf = {
  name: 'accessTokenAuthenticate',
  match: req => !!getAccessToken(req),
  authenticator: accessTokenAuthenticate,
};
