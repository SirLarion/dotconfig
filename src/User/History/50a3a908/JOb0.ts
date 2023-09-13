import { useCallback } from 'react';
import { isEmpty } from 'ramda';
import { useSetRecoilState } from 'recoil';

import { useCurrentUser } from '@hox/frontend-utils/hooks/useCurrentUser';
import { USER_DATA_COLUMN } from '@hox/frontend-utils/types/graphql.generated';

import { downloadFile } from '../../../../views/UserImport/lib';
import { useUserListState } from '../../../../views/UserManagement/hooks/useUserListState';
import { useGenerateUserCSVFileMutation } from '../../actions/graphql/__generated__/GenerateUserCSVFile.generated';
import { userActionState } from '../../recoil';

export const useGenerateExport = () => {
  const {
    organization: { _id: organizationId },
  } = useCurrentUser();
  const { search, filter, selectedIds } = useUserListState();
  const setView = useSetRecoilState(userActionState.view);
  const setTaskGroupId = useSetRecoilState(userActionState.taskGroupId);

  const [mutate] = useGenerateUserCSVFileMutation();

  const runGenerateExport = useCallback(
    async (selectedColumns: USER_DATA_COLUMN[]) => {
      try {
        const { data } = await mutate({
          variables: {
            ...(!isEmpty(selectedIds)
              ? {
                  organizationId,
                  // eslint-disable-next-line @typescript-eslint/naming-convention
                  filter: { _id_in: selectedIds },
                }
              : {
                  organizationId,
                  search,
                  filter,
                }),
            selectedColumns,
          },
        });

        const taskGroupId = data?.generateUserCSVFile.taskGroup?._id;
        const signedUrl = data?.generateUserCSVFile.signedUrl;

        if (taskGroupId) {
          setTaskGroupId(taskGroupId);
        } else if (signedUrl) {
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
  };
};
