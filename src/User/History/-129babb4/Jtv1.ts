import { get, identity, isEmpty } from 'lodash';
import R from 'ramda';

import {
  withOrganizationId,
  withSentry,
  withTaskId,
  withTaskSignature,
  withUserId,
} from '@hox/telemetry-shared/context';
import { withLinks } from '@hox/telemetry-shared/tracer';

import {
  withIdentityFromAuthInfo,
  withTaskRunnerRole,
  withTelemetry,
} from '@server/domains/lib/contextWith';
import { EIdentityAuthenticationLevel } from '@server/domains/lib/identity';
import { toTelemetryContext } from '@server/domains/lib/log';
import {
  IHandlerContext,
  IMetaContext,
  THandlerContext,
} from '@server/domains/lib/models';
import {
  EMetricHistogram,
  EMetricResultLabel,
} from '@server/domains/lib/prometheus/models';
import { ETaskState, ITask } from '@server/lib/typedSchemas/Task/models';

const createTaskUpdater =
  (ctx: Pick<IHandlerContext, 'handlers'> & IMetaContext) =>
  (task: ITask<any, any>) =>
    ctx.handlers.collection.task.update(withTaskRunnerRole(ctx), {
      id: task._id,
      data: task,
    });

// If signature has three dot-delimited fields then it's a handler signature
// otherwise it's a service method signature
const isHandlerSignature = (signature: string) => !!signature.split('.')[2];

const performHandlerCall = (
  ctx: Pick<IHandlerContext, 'handlers'> & IMetaContext,
  signature: string,
  asUserId: string,
  args: any
) =>
  ctx.handlers.collection.user
    .get(ctx, { id: asUserId })
    .then(user =>
      withIdentityFromAuthInfo(ctx, {
        authenticationLevel: EIdentityAuthenticationLevel.NORMAL,
        user,
      })
    )
    .then(newCtx => get(newCtx.handlers, signature)(newCtx, ...args));

const createTaskExecutor =
  (ctx: Pick<IHandlerContext, 'handlers'> & IMetaContext) =>
  (task: ITask<any, any>) => {
    if (isHandlerSignature(task.signature)) {
      console.log(task.call.args);
      return performHandlerCall(
        ctx,
        task.signature,
        task.userId,
        task.call.args
      );
    }
    throw new Error(
      `Task with id ${task._id} had invalid signature ${task.signature}. Task engine does not support legacy service calls no longer`
    );
  };

const createTaskExecutionTimeTracker = (
  ctx: Pick<IHandlerContext, 'handlers' | 'metrics'> & IMetaContext
) => {
  const startTime = Date.now();
  return async (signature: string, result: EMetricResultLabel) => {
    await ctx.metrics.histogram(EMetricHistogram.TASK_EXECUTION_TIME_SECONDS, {
      value: (Date.now() - startTime) / 1000,
      labels: {
        signature,
        result,
      },
    });
  };
};

const addExecutionLock =
  (
    ctx: Pick<IHandlerContext, 'handlers'> & IMetaContext,
    lock: {
      lockId: string;
      expiresAt: Date;
    }
  ) =>
  <V>(criticalPath: () => Promise<V>) => {
    return async () => {
      const acquired =
        await ctx.handlers.infrastructure.distributedLock.acquireLock(
          withTaskRunnerRole(ctx),
          lock
        );
      if (acquired !== true) {
        throw new Error(`Error acquiring lock for lockId '${lock.lockId}'`);
      }
      try {
        return await criticalPath();
      } finally {
        const released =
          await ctx.handlers.infrastructure.distributedLock.releaseLock(
            withTaskRunnerRole(ctx),
            lock
          );
        if (released !== true) {
          // eslint-disable-next-line no-unsafe-finally
          throw new Error(`Error releasing lock for lockId '${lock.lockId}'`);
        }
      }
    };
  };

const instrumentTrackExecutionTime =
  (
    ctx: Pick<IHandlerContext, 'handlers' | 'metrics'> & IMetaContext,
    signature: string
  ) =>
  <V>(criticalPath: () => Promise<V>) => {
    return async () => {
      const trackExecutionTime = createTaskExecutionTimeTracker(ctx);
      try {
        const result = await criticalPath();
        await trackExecutionTime(signature, EMetricResultLabel.SUCCESS);
        return result;
      } catch (error) {
        await trackExecutionTime(signature, EMetricResultLabel.FAILURE);
        throw error;
      }
    };
  };

const updateTaskAfterExecution =
  (
    update: (task: ITask<any, any>) => Promise<ITask<any, any>>,
    task: ITask<any, any>
  ) =>
  <V>(criticalPath: () => Promise<V>) => {
    return async () => {
      try {
        const result = await criticalPath();
        await update({
          ...task,
          result,
          state: ETaskState.SUCCESS,
        });
        return result;
      } catch (error) {
        await update({
          ...task,
          errorMessage: error.message,
          state: ETaskState.FAILURE,
        });
        throw error;
      }
    };
  };

const extendErrorHandling =
  (ctx: THandlerContext, task: ITask<any, any>) =>
  <V>(criticalPath: () => Promise<V>) =>
  async () => {
    try {
      return await criticalPath();
    } catch (error) {
      const signature = get(task, 'signature');
      const organizationId = get(task, 'organizationId');
      const userId = get(task, 'userId');

      ctx
        .getContextLogger()
        .errorUnexpected(
          ctx,
          'Encountered an error while handling a task',
          error,
          withSentry(),
          withTaskId(task._id),
          withTaskSignature(signature),
          withUserId(userId),
          withOrganizationId(organizationId)
        );

      throw error;
    }
  };

const hasTraceData = (task: ITask<any, any>): boolean =>
  !isEmpty(task.traceId) && !isEmpty(task.spanId);

export const EXTRA_MS_TO_ADD_TO_LOCK_EXPIRE = 1000 * 60 * 2;

export const createTaskServiceCallHandler = () => {
  // Store timeouts so they can be cleared
  const timeouts = new Set<NodeJS.Timeout>();
  process.addListener('exit', () => timeouts.forEach(id => clearTimeout(id)));

  return async (
    rootCtx: Pick<
      IHandlerContext,
      'handlers' | 'metrics' | 'getConfig' | 'getTracer'
    > &
      IMetaContext,
    task: ITask<any, any>
  ): Promise<any> =>
    rootCtx.getTracer().withSpan(
      toTelemetryContext(rootCtx),
      async telemetry => {
        const callCtx = withTelemetry(rootCtx, telemetry);

        const taskUpdater = createTaskUpdater(callCtx);
        const taskExecutor = createTaskExecutor(callCtx);
        const taskQueueDefaultTimeout = (await callCtx.getConfig('taskQueue'))
          .defaultTimeout;

        const invokeExecutor = (): Promise<any> =>
          new Promise((resolve, reject) => {
            // We'll reject if execution timeout is reached
            const timeout = setTimeout(
              () =>
                reject(
                  new Error(`Timeout of ${taskQueueDefaultTimeout}ms exceeded`)
                ),
              taskQueueDefaultTimeout
            );

            timeouts.add(timeout);

            taskExecutor(task)
              .then(res => {
                // Make sure the invokation doesn't cause the Node process to hang
                clearTimeout(timeout);
                timeouts.delete(timeout);
                resolve(res);
              })
              .catch(reject);
          });

        return R.pipe(
          extendErrorHandling(callCtx, task),
          updateTaskAfterExecution(taskUpdater, task),
          instrumentTrackExecutionTime(callCtx, task.signature),
          task.lockId
            ? addExecutionLock(callCtx, {
                lockId: task.lockId,
                expiresAt: new Date(
                  Date.now() +
                    taskQueueDefaultTimeout +
                    EXTRA_MS_TO_ADD_TO_LOCK_EXPIRE
                ),
              })
            : identity
        )(invokeExecutor)();
      },
      withLinks(
        hasTraceData(task)
          ? [{ traceId: task.traceId, spanId: task.spanId }]
          : undefined
      )
    );
};
