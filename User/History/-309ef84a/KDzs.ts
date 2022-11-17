import { createMany } from '@server/domains/collection/lib/mongo';
import {
  ICreateManyPayload,
  TCreateManyContext,
  TCreateManyResult,
} from '@server/domains/collection/task/lib/models';
import { ACL } from '@server/domains/lib/auth/roles';
import { IHandlerConfig } from '@server/domains/lib/models';

import { withTraceAndSpanId } from './lib/lib';

const callCreateMany = createMany({ useMongoObjectId: false });

const handler: IHandlerConfig<
  TCreateManyContext,
  ICreateManyPayload,
  TCreateManyResult
> = {
  roles: [ACL.Roles.SUPER_ADMIN, ACL.Roles.TASK_RUNNER],
  handler: (ctx, payload) =>
    callCreateMany(ctx, {
      data: payload.data.map(task => withTraceAndSpanId(ctx, task)),
    }),
};
export default handler;
