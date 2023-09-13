import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';

import { useSetUserPropertiesMutation } from '../../../../components/UserActions/actions/graphql/__generated__/SetUserProperties.generated';
import { useUserListSelectorParams } from '../../../../views/UserManagement/hooks/useUserListSelectorParams';
import { userActionState } from '../../recoil';

import { TEditableProperties } from './types';

export const useSetProperties = () => {
  const setView = useSetRecoilState(userActionState.view);
  const setTaskGroupId = useSetRecoilState(userActionState.taskGroupId);
  const selector = useUserListSelectorParams();

  const [mutate] = useSetUserPropertiesMutation();

  const runSetProperties = useCallback(
    async (properties: TEditableProperties) => {
      try {
        const result = await mutate({
          variables: {
            ...selector,
            userProperties: properties,
          },
        });

        const taskGroupId = result.data?.setUserProperties.taskGroup?._id;

        if (taskGroupId) {
          setTaskGroupId(taskGroupId);
          setView('progress');
        }
      } catch (error) {
        setView('error');
      }
    },
    [mutate, selector, setTaskGroupId, setView]
  );

  return {
    runSetProperties,
  };
};
