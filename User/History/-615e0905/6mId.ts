import { useMemo } from 'react';
import { uniq } from 'ramda';

import { useErroredUserEmailsQuery } from './graphql/__generated__/ErroredUserEmails.generated';
import {
  FailedTaskInfoFragment,
  useUserActionTaskGroupProgressQueryQuery,
} from './graphql/__generated__/UserActionTaskGroupProgress.generated';

const getUserId = (task: FailedTaskInfoFragment) => {
  const json = JSON.parse(task.args)[0];
  return json.userId || json.id;
};

const extractErrorInfo = (task: FailedTaskInfoFragment) => ({
  errorMessage: task.errorMessage || 'Unknown error',
  userId: getUserId(task),
});

type TErrorInfo = ReturnType<typeof extractErrorInfo>;

const getUniqueUserIds = (errorInfos: TErrorInfo[]): string[] =>
  uniq(errorInfos.map(errorInfo => errorInfo.userId));

export type TEnrichedErrorInfo = TErrorInfo & { userEmail: string | undefined };

export const useTaskGroupErrorEnricher = (
  taskGroupId: string | undefined,
  errorCount: number
): TEnrichedErrorInfo[] => {
  const taskGroupsResult = useUserActionTaskGroupProgressQueryQuery({
    skip: errorCount === 0 || !taskGroupId,
    variables: {
      taskGroupId: taskGroupId ?? '',
      showErrors: errorCount > 0,
    },
  });

  const taskGroup = taskGroupsResult.data?.taskGroups[0];

  const errorInfos = (taskGroup?.failedTasks || []).map(extractErrorInfo);

  const erroredUserIds = getUniqueUserIds(errorInfos);

  const userEmailsResult = useErroredUserEmailsQuery({
    skip: erroredUserIds.length === 0,
    variables: {
      userIds: erroredUserIds,
    },
  });

  const userEmailsMap = useMemo(() => {
    const users = userEmailsResult.data?.currentUser?.organization.users || [];

    return users.reduce((acc, user) => {
      acc[user._id] = user.emails[0].address;

      return acc;
    }, {} as { [key: string]: string | undefined });
  }, [userEmailsResult]);

  const withUserEmails = useMemo(() => {
    return errorInfos.map(({ errorMessage, userId }) => ({
      errorMessage,
      userId,
      userEmail: userEmailsMap[userId],
    }));
  }, [errorInfos, userEmailsMap]);

  return withUserEmails;
};
