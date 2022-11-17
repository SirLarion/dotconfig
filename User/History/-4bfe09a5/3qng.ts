import {
  withOrganizationId,
  withTaskGroupId,
  withUserId,
} from '@hox/telemetry-shared/context';

import { THandlerContext } from '@server/domains/lib/models';
import { ETaskState, ITask } from '@server/lib/typedSchemas/Task/models';
import { TErrorInfo } from '@server/util/error';
import { PartialError } from '@server/util/error/PartialError';

import { chooseTaskQueue, createTaskObject } from './lib';
import { ITaskDef, ITaskQueue, THandlerFn, TTaskHandlerFunc } from './models';

const handleCreateTasksError =
  (ctx: THandlerContext, sample: ITaskDef<unknown, unknown>) =>
  async (e: Error) => {
    ctx
      .getContextLogger()
      .error(
        ctx,
        e.message,
        withUserId(sample.userId),
        withOrganizationId(sample.organizationId),
        withTaskGroupId(sample.groupId)
      );
    return Promise.reject(e);
  };

export const createTasks = <T, V>(
  ctx: THandlerContext,
  taskDefs: Array<ITaskDef<T, V>>
) =>
  ctx.handlers.collection.task
    .createMany(ctx, {
      data: taskDefs.map(createTaskObject),
    })
    .then(createManyResult => {
      console.log(createManyResult);
      return { createdTasks: createManyResult.createdDocs };
    })
    .catch(handleCreateTasksError(ctx, taskDefs[0]))
    .catch(error => ({ createdTasks: error.result.createdDocs }));

const getFailedTaskIds = (
  e: PartialError<{ errorInfos: Array<TErrorInfo<ITask<unknown, unknown>>> }>
) => e.result.errorInfos.map(({ data }) => data._id);

const handleTaskSubmissionError =
  (ctx: THandlerContext) =>
  (
    error: PartialError<{
      errorInfos: Array<TErrorInfo<ITask<unknown, unknown>>>;
    }>
  ) =>
    Promise.all(
      getFailedTaskIds(error).map(taskId =>
        ctx.handlers.collection.task.patch(ctx, {
          id: taskId,
          data: {
            state: ETaskState.FAILURE,
            errorMessage: error.message,
          },
        })
      )
    ).then(() => {
      throw error;
    });

export const submitTasks = async <T, V>(
  taskQueues: {
    agendaTaskQueue: ITaskQueue;
  },
  ctx: THandlerContext,
  handlerFn: TTaskHandlerFunc<T, V>,
  taskDefs: Array<ITaskDef<T, V>>
): Promise<void> =>
  !taskDefs || taskDefs.length === 0
    ? Promise.resolve(undefined)
    : Promise.all([
        chooseTaskQueue(ctx, {
          taskQueues,
          taskDef: taskDefs[0],
        }),
        createTasks(ctx, taskDefs),
      ]).then(([taskQueue, createTasksResult]) =>
        taskQueue
          .submitTasks(ctx, createTasksResult.createdTasks)
          .catch(handleTaskSubmissionError(ctx))
          .then(() => undefined)
      );

export const createTaskArraySubmitter =
  (taskQueues: { agendaTaskQueue: ITaskQueue }) =>
  async <T, V>(
    ctx: THandlerContext,
    handlerFn: THandlerFn<T, V>,
    taskDefs: Array<ITaskDef<T, V>>
  ): Promise<void> =>
    submitTasks(taskQueues, ctx, handlerFn, taskDefs);
