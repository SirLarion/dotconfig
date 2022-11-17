import { getErrorTelemetryOptions } from '@hox/telemetry-shared/error';
import {
  ILogger,
  ITelemetryCallContext,
  TTelemetryOptionFn,
} from '@hox/telemetry-shared/models';

import { IContextLogger, THandlerContext } from './models';
import { errorAttributes } from './telemetry';

export const safeLogError = <C extends THandlerContext>(
  ctx: C,
  message: string,
  err: Error
) => {
  try {
    ctx
      .getContextLogger()
      .error(
        ctx,
        message,
        ...errorAttributes(err),
        ...getErrorTelemetryOptions(err)
      );
  } catch (e) {
    try {
      ctx.getContextLogger().errorUnexpected(ctx, 'failed to log error', e);
    } catch (eFinal) {
      // eslint-disable-next-line no-console
      console.error(eFinal);
    }
  }
};

export const safeLog = <C extends THandlerContext>(
  ctx: C,
  level: 'debug' | 'info' | 'warn',
  msg: string,
  optFn: () => TTelemetryOptionFn[]
) => {
  try {
    const opts = optFn();
    ctx.getContextLogger()[level](ctx, msg, ...opts);
  } catch (e) {
    safeLogError(ctx, 'logging failure', e);
  }
};

export const toTelemetryContext = <C extends THandlerContext>(
  ctx: C
): ITelemetryCallContext => ({
  identity: {
    id: ctx.identity.getId(),
    organizationId: ctx.identity.getOrganizationId(),
    roles: ctx.identity.getUserRoles(),
    addedRoles: ctx.identity.getAddedRoles(),
    ...(ctx.identity.getImpersonatorId() && {
      impersonatorId: ctx.identity.getImpersonatorId(),
    }),
  },
  meta: {
    telemetry: ctx.meta.telemetry,
    domain: ctx.meta.domain,
    component: ctx.meta.service,
    action: ctx.meta.handler,
    detached: ctx.meta.detached,
  },
  ...(ctx.request && {
    request: ctx.request,
  }),
});

export const wrapContextLogger = (logger: ILogger): IContextLogger => ({
  unwrap: () => logger,
  debug: (ctx, ...args) => logger.debug(toTelemetryContext(ctx), ...args),
  info: (ctx, ...args) => logger.info(toTelemetryContext(ctx), ...args),
  warn: (ctx, ...args) => logger.warn(toTelemetryContext(ctx), ...args),
  error: (ctx, ...args) => logger.error(toTelemetryContext(ctx), ...args),
  errorUnexpected: (ctx, ...args) =>
    logger.errorUnexpected(toTelemetryContext(ctx), ...args),
});
