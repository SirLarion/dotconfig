import { Query } from '../../utils/apollo';

interface IPartialGQLTaskGroup {
  _id: string;
  description: {
    id: string;
    defaultMessage: string;
  };
  estimatedTotalTaskCount: number;
  totalTaskCount: number;
  successCount: number;
  failureCount: number;
  tasks?: Array<{
    _id: string;
    args: string;
    errorMessage: string;
    signature: string;
  }>;
}

export interface ITaskGroupProgressQueryData {
  taskGroups: IPartialGQLTaskGroup[];
}

interface ITaskGroupProgressQueryVariables {
  taskGroupId: string;
  showErrors: boolean;
}

export class TaskGroupProgressQuery extends Query<
  ITaskGroupProgressQueryData,
  ITaskGroupProgressQueryVariables
> {}
