import createCookierParser from 'cookie-parser';
import express, {
  Express,
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from 'express';
import R from 'ramda';

import {
  withExceptionMessage,
  withHttpMethod,
  withHttpTarget,
  withIAPAuthenticatorName,
  withIAPAuthenticatorPath,
} from '@hox/telemetry-shared/context';

import { EUserRole } from '@server/domains/lib/auth/roles';
import { withIdentity } from '@server/domains/lib/contextWith';
import { getIdentity } from '@server/domains/lib/identity';
import {
  errorNotFound,
  errorPermissionDenied,
  errorUnauthenticated,
} from '@server/util/error';
import { IAppServers } from '@server/util/models';

import { logError } from '../handler-endpoints/lib';

import {
  TAuthenticatorWrapper,
  TFindAuthenticator,
  TIdentityAndAccessProxyConfig,
  TRouteConfig,
} from './models';

const expandConfigs = (configs: TIdentityAndAccessProxyConfig[]) =>
  R.pipe(
    R.map(({ strategies, ...rest }: TIdentityAndAccessProxyConfig) => ({
      ...rest,
      findAuthenticator: (req: Request) => {
        const authenticator = R.find(
          strategy => strategy.match(req),
          strategies
        );
        return authenticator
          ? {
              name: authenticator.name,
              authenticate: authenticator.authenticator,
            }
          : null;
      },
    })),
    R.map(({ match, ...rest }) =>
      R.map(
        method => ({
          method,
          path: match.url,
          ...rest,
        }),
        match.methods
      )
    ),
    R.flatten
  )(configs);

const sendForbidden = (res: Response) => res.sendStatus(401);

const doAuthenticate =
  (authenticator: TAuthenticatorWrapper) => (req: Request) =>
    authenticator
      .authenticate(req)
      .then(result => ({
        authenticatedBy: authenticator.name,
        ...result,
      }))
      .catch(err => {
        req.ctx
          .getContextLogger()
          .error(
            req.ctx,
            'Incoming request authentication failed. Authenticator threw an error.',
            withExceptionMessage(err.message),
            withIAPAuthenticatorName(authenticator.name)
          );

        throw err;
      });

const createAuthenticateHandler =
  (
    findAuthenticator: TFindAuthenticator,
    rulePath: string | RegExp
  ): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    if (req.hiap) {
      return next();
    }
    return new Promise((resolve, reject) => {
      const authenticator = findAuthenticator(req);
      if (!authenticator) {
        return reject(
          errorNotFound(
            req.ctx,
            'Authenticator not found.',
            withHttpMethod(req.method),
            withHttpTarget(req.path),
            withIAPAuthenticatorPath(rulePath.toString())
          )
        );
      }
      resolve(authenticator);
    })
      .then((authenticator: TAuthenticatorWrapper) =>
        doAuthenticate(authenticator)(req)
      )
      .then(({ authenticatedBy, user, isAuthorized, authenticationLevel }) => {
        if (!isAuthorized) {
          throw errorUnauthenticated(
            req.ctx,
            'Authentication failed.',
            withHttpMethod(req.method),
            withHttpTarget(req.path),
            withIAPAuthenticatorName(authenticatedBy),
            withIAPAuthenticatorPath(rulePath.toString())
          );
        }

        const identity = getIdentity({
          authenticationLevel,
          user,
          impersonatorId: user?.impersonatorId,
        });

        // Safeguard against possible mistakes in url signing
        if (identity.hasRole(EUserRole.TASK_RUNNER)) {
          throw errorPermissionDenied(
            req.ctx,
            'IAP authenticated a user with system privileges. This should never happen!',
            withHttpMethod(req.method),
            withHttpTarget(req.path),
            withIAPAuthenticatorName(authenticatedBy),
            withIAPAuthenticatorPath(rulePath.toString())
          );
        }

        req.hiap = {
          match: {
            url: rulePath,
            method: req.method,
            strategy: authenticatedBy,
          },
          isAuthorized,
          identity,
        };

        req.ctx = withIdentity(req.ctx, identity);
        next();
      })
      .catch(async err => {
        await logError(req, err);
        return sendForbidden(res);
      });
  };

const setupRoutes =
  (configs: TIdentityAndAccessProxyConfig[]) => (server: Express) => {
    R.pipe(
      expandConfigs,
      R.map(({ findAuthenticator, ...config }: TRouteConfig) => ({
        ...config,
        handler: createAuthenticateHandler(findAuthenticator, config.path),
      })),
      R.forEach(config => {
        server[config.method](config.path, config.handler);
      })
    )(configs);

    server.use('/', (req: Request, res: Response, next: NextFunction) => {
      if (!req.hiap || !req.hiap.isAuthorized) {
        return sendForbidden(res);
      }
      next();
      return;
    });

    return server;
  };

const applyRootMiddlewares = (server: Express) =>
  server.use('/', createCookierParser());

export const createIdentityAndAccessProxy =
  (server: Express) => (configs: TIdentityAndAccessProxyConfig[]) =>
    R.pipe(applyRootMiddlewares, setupRoutes(configs))(server);

export const initIdentityAndAccessProxy =
  (
    internalConfig: TIdentityAndAccessProxyConfig[],
    externalConfig: TIdentityAndAccessProxyConfig[]
  ) =>
  ({ internalServer, externalServer }: IAppServers) => {
    internalServer.use(
      '/',
      createIdentityAndAccessProxy(express())(internalConfig)
    );
    externalServer.use(
      '/',
      createIdentityAndAccessProxy(express())(externalConfig)
    );
  };
