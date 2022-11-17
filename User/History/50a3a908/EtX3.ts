import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';

import { USER_DATA_COLUMN } from '@hox/frontend-utils/types/graphql.generated';

import { downloadFile } from '../../../../views/UserImport/lib';
import { useGenerateUserCSVFileMutation } from '../../actions/graphql/__generated__/GenerateUserCSVFile.generated';
import { userActionState } from '../../recoil';
import { useUserListSelectorParams } from 'views/UserManagement/hooks/useUserListSelectorParams';

export const useGenerateExport = () => {
  const setView = useSetRecoilState(userActionState.view);
  const setTaskGroupId = useSetRecoilState(userActionState.taskGroupId);
  const selector = useUserListSelectorParams();

  const [mutate, { loading }] = useGenerateUserCSVFileMutation();

  const runGenerateExport = useCallback(
    async (selectedColumns: USER_DATA_COLUMN[]) => {
      try {
        const { data } = await mutate({
          variables: {
            ...selector,
            selectedColumns,
          },
        });

        const taskGroupId = data?.generateUserCSVFile.taskGroup?._id;
        const signedUrl = data?.generateUserCSVFile.signedUrl;

        if (taskGroupId) {
          setTaskGroupId(taskGroupId);
        } else if (signedUrl) {
          setView('result');
          downloadFile(signedUrl);
        }
      } catch (error) {
        setView('error');
      }
    },
    [
      mutate,
      selectedIds,
      organizationId,
      search,
      filter,
      setTaskGroupId,
      setView,
    ]
  );
  return {
    runGenerateExport,
    loading,
  };
};
