import { getHandlerPath } from '@server/domains/lib/handlerPath';
import taskGroupIntl from '@server/intl/taskGroupIntl';
import { ITaskGroup } from '@server/lib/typedSchemas/TaskGroup/models';
import { initTaskRunnerUser } from '@server/startup/fixtures/taskRunnerUser';
import { THandlerFn } from '@server/tasks/models';

import { withIdentityFromAuthInfo, withTaskRunnerRole } from './contextWith';
import { EIdentityAuthenticationLevel } from './identity';
import { THandlerContext } from './models';

/**
 * Defer a task to be executed later.
 * Run the task as the calling ctx identity.
 */
export const defer = async <IN, OUT>(
  ctx: THandlerContext,
  handlerFn: THandlerFn<IN, OUT>,
  payload: IN,
  scheduleTime?: Date
): Promise<ITaskGroup> => {
  const signature = getHandlerPath(ctx, handlerFn);
  const taskQueue = await ctx.getTaskQueue();

  console.log('taskGroup for handler ', signature);
  console.log('task for args ', payload);

  return taskQueue.submitTaskGroup(withTaskRunnerRole(ctx), handlerFn, {
    userId: ctx.identity._id,
    organizationId: ctx.identity.organizationId || 'global',
    signature,
    tasks: [{ args: payload }],
    description: taskGroupIntl.generic,
    ...(scheduleTime && { scheduleTime }),
  });
};

/**
 * Defer a task to be executed later.
 * Run the task as the task runner.
 */
export const deferAsTaskRunner = async <IN, OUT>(
  ctx: THandlerContext,
  handlerFn: THandlerFn<IN, OUT>,
  payload: IN,
  scheduleTime?: Date
) =>
  defer(
    withIdentityFromAuthInfo(ctx, {
      authenticationLevel: EIdentityAuthenticationLevel.NORMAL,
      user: await initTaskRunnerUser(),
    }),
    handlerFn,
    payload,
    scheduleTime
  );
