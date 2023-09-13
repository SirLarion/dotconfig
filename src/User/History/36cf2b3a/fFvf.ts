import { useCallback, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { head, values } from 'ramda';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { useCurrentUser } from '@hox/frontend-utils/hooks/useCurrentUser';
import { User_filter } from '@hox/frontend-utils/types/graphql.generated';

import { useUserListState } from '../../../views/UserManagement/hooks/useUserListState';
import { userActionState } from '../recoil';
import { IUserAction, TUserActionResult } from '../types';

type TUserActionMutationVariables = {
  organizationId: string;
  filter?: User_filter | null;
  search?: string;
};

type TUserActionGqlFilters = Omit<
  TUserActionMutationVariables,
  'organizationId' | 'userIds'
>;

const getMutationVariables = (
  organizationId: string,
  allSelected: boolean,
  gqlFilters: TUserActionGqlFilters = {},
  selectedIds?: string[]
): TUserActionMutationVariables => {
  if (allSelected) {
    return {
      organizationId,
      filter: gqlFilters.filter,
      search: gqlFilters.search || '',
    };
  } else {
    return {
      organizationId,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      filter: { _id_in: selectedIds },
    };
  }
};

export const useUserAction = () => {
  const {
    organization: { _id: organizationId },
  } = useCurrentUser();
  const { mutate, reFetchObservableQueries } = useApolloClient();

  const { search, filter, selectedIds, allSelected, resetSelection } =
    useUserListState();

  const [openDialog, setOpenDialog] = useState(false);

  const setView = useSetRecoilState(userActionState.view);
  const setTaskGroupId = useSetRecoilState(userActionState.taskGroupId);

  const [selectedAction, setSelectedAction] = useRecoilState(
    userActionState.selectedAction
  );

  const createAction = useCallback(
    (action: IUserAction) => {
      setOpenDialog(true);
      setSelectedAction(action);
      setView(action.customDialog ? 'custom' : 'confirm');
    },
    [setSelectedAction, setView]
  );

  const runAction = useCallback(
    async (
      action: IUserAction,
      allSelected: boolean,
      gqlFilters?: TUserActionGqlFilters,
      selectedIds?: string[]
    ) => {
      try {
        const variables = getMutationVariables(
          organizationId,
          allSelected,
          gqlFilters,
          selectedIds
        );

        const { data } = await mutate({
          mutation: action.mutation,
          variables,
        });

        const { taskGroup } = head(values(data)) as TUserActionResult;

        if (taskGroup) {
          setTaskGroupId(taskGroup._id);
          setView('progress');

          return;
        }
      } catch (error) {
        setView('error');
      }
    },
    [organizationId, mutate, setView, setTaskGroupId]
  );

  const onActionCancel = useCallback(
    () => setOpenDialog(false),
    [setOpenDialog]
  );

  const onActionFinish = useCallback(() => {
    resetSelection();
    setOpenDialog(false);
  }, [resetSelection, setOpenDialog]);

  const onActionConfirm = useCallback(() => {
    const gqlFilters = {
      filter,
      search,
    };

    selectedAction &&
      runAction(selectedAction, allSelected, gqlFilters, selectedIds);
  }, [selectedAction, runAction, allSelected, filter, search, selectedIds]);

  const onActionMutationComplete = useCallback(() => {
    reFetchObservableQueries();
  }, [reFetchObservableQueries]);

  return {
    runAction,
    createAction,
    onActionCancel,
    onActionFinish,
    onActionConfirm,
    onActionMutationComplete,
    selectedAction,
    openDialog,
  };
};
