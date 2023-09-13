import { ETaskState } from '@server/lib/typedSchemas/Task/models';

const Task = `
  # Possible task states
  enum TaskState {
    ${Object.values(ETaskState).join(',')}
  }

  # Task is a deferred background service call
  type Task implements Node {
    # Id
    _id: ID!
    # Created At
    createdAt: Date
    # Updated At
    updatedAt: Date

    # Current Task state
    state: TaskState!
    # Signature of this job. Consists of [serviceName].[serviceMethod]
    signature: String
    # Only one job with the same unique key can run at a time!
    uniqueKey: String

    # The result of running the task (if any)
    result: String

    # Service call arguments serialized as a string
    args: String!

    # Service call error serialized as a string, available if TaskState = FAILURE
    errorMessage: String

    # TaskGroup that this task is a part of
    group: TaskGroup!
  }
`;

export default () => [Task];
