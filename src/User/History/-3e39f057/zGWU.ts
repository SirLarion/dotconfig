import Joi from 'joi';
import R from 'ramda';
import VError from 'verror';

import {
  isFailedPrecondition,
  isInvalidArgument,
  isNotFound,
} from '@hox/telemetry-shared/error';

import { checkQuery } from '@server/api/handler-endpoints/lib';
import { HandlerRouteDefFactory } from '@server/api/handler-endpoints/models';
import {
  ILoginAsOtherUserPayload,
  ILoginAsOtherUserResult,
} from '@server/domains/auth/impersonate/lib/loginAsOtherUser.models';

import { setRefreshTokenCookieForPaths } from '../jwt/refreshToken';

/**
 * @path: /auth/impersonate/loginasotheruser
 * @methods: get
 * @external: true
 */
const authImpersonateLoginAsOtherUser: HandlerRouteDefFactory<
  ILoginAsOtherUserPayload,
  ILoginAsOtherUserResult
> = handlerTree => ({
  handler: handlerTree.auth.impersonate.loginAsOtherUser,
  preHandler: R.pipe(
    checkQuery(
      Joi.object({
        userId: Joi.string().required(),
      })
    ),
    ({ query }) => ({
      userId: query.userId.toString(),
    })
  ),
  handleErrorResponse: (req, res, err: VError) => {
    const realError = err.cause();
    if (isNotFound(realError)) {
      res.sendStatus(404);
    } else if (isInvalidArgument(realError)) {
      res.sendStatus(400);
    } else if (isFailedPrecondition(realError)) {
      res.sendStatus(403);
    }
  },
  respond: (req, res, handlerOutput) => {
    const { refreshToken, refreshTokenExpiry, domain, redirect } =
      handlerOutput;
    setRefreshTokenCookieForPaths(
      res,
      refreshToken,
      domain,
      refreshTokenExpiry
    );
    res.redirect(redirect);
  },
});

export default authImpersonateLoginAsOtherUser;
