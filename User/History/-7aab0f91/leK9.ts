import {
  withExceptionMessage,
  withOrganizationId,
  withTaskGroupId,
  withUserId,
} from '@hox/telemetry-shared/context';

import { MONGOID } from '@server/domains/collection/lib/mongo/lib/models';
import { THandlerContext } from '@server/domains/lib/models';
import { ETaskPriority } from '@server/lib/typedSchemas/Task/models';
import { ITaskGroup } from '@server/lib/typedSchemas/TaskGroup/models';

import {
  ITaskCallDef,
  ITaskDef,
  ITaskGroupDef,
  THandlerFn,
  TSubmitTasks,
  TTaskHandlerFunc,
} from './models';

const handleSubmitError =
  (ctx: THandlerContext, taskGroup: ITaskGroup) => async (e: Error) => {
    ctx
      .getContextLogger()
      .error(
        ctx,
        'failed to submit task group',
        withExceptionMessage(e.message),
        withUserId(taskGroup.userId),
        withOrganizationId(taskGroup.organizationId),
        withTaskGroupId(taskGroup._id)
      );
  };

export const SMALL_TASK_GROUP_SIZE_THRESHOLD = 100;

/**
 * Run smaller groups with increased priority so it is less likely they are blocked by congestion
 */
const getTaskPriorityForGroup = (
  taskGroupDef: ITaskGroupDef<unknown, unknown>
): number =>
  taskGroupDef.tasks.length <= SMALL_TASK_GROUP_SIZE_THRESHOLD
    ? ETaskPriority.HIGH
    : ETaskPriority.DEFAULT;

const createTaskDef =
  (groupId: MONGOID, taskGroupDef: ITaskGroupDef<unknown, unknown>) =>
  (
    taskCallDef: ITaskCallDef<unknown, unknown>
  ): ITaskDef<unknown, unknown> => ({
    signature: taskGroupDef.signature,
    userId: taskGroupDef.userId,
    organizationId: taskGroupDef.organizationId,
    ...(taskGroupDef.scheduleTime && {
      scheduleTime: taskGroupDef.scheduleTime,
    }),
    ...taskCallDef,
    priority: getTaskPriorityForGroup(taskGroupDef),
    groupId,
  });

export const submitTaskGroup = async <T, V>(
  submitTasks: TSubmitTasks,
  ctx: THandlerContext,
  taskHandlerFn: TTaskHandlerFunc<T, V>,
  taskGroupDef: ITaskGroupDef<T, V>
): Promise<ITaskGroup> => {
  const taskGroup = await ctx.handlers.collection.taskGroup.create(ctx, {
    data: {
      userId: taskGroupDef.userId,
      organizationId: taskGroupDef.organizationId,
      description: taskGroupDef.description,
      estimatedTotalTaskCount: taskGroupDef.tasks.length,
    },
  });

  console.log('taskGroupDef tasks ', taskGroupDef.tasks[0].args.searchParams);

  // Don't wait for tasks to hit the DB

  submitTasks(
    ctx,
    taskHandlerFn,
    taskGroupDef.tasks.map(createTaskDef(taskGroup._id, taskGroupDef))
  ).catch(handleSubmitError(ctx, taskGroup));

  return taskGroup;
};

export const createTaskGroupSubmitter =
  (submitTasks: TSubmitTasks) =>
  async <IN, OUT>(
    ctx: THandlerContext,
    handlerFn: THandlerFn<IN, OUT>,
    taskGroupDef: ITaskGroupDef<IN, OUT>
  ): Promise<ITaskGroup> =>
    submitTaskGroup<IN, OUT>(submitTasks, ctx, handlerFn, taskGroupDef);
