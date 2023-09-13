import React, { FC, useMemo } from 'react';
import styled from 'styled-components';
import { isEmpty } from 'ramda';
import { useSetRecoilState } from 'recoil';

import { Button } from '@hox/ui/Button';
import { HoxIcon } from '@hox/ui/HoxIcon';
import { ButtonText, SmallText } from '@hox/ui/Text';
import { Tooltip } from '@hox/ui/Tooltip';

import { useUserListState } from '../../views/UserManagement/hooks/useUserListState';
import { ActionMenu, IActionMenuItem } from '../ActionMenu';

import { ActionMenuItem } from './components/ActionMenuItem';
import { UserActionDialogRenderer } from './components/UserActionDialogRenderer';
import { useUserAction } from './hooks/useUserAction';
import { USER_ACTION_INTL as INTL } from './intl';
import { getUserActions } from './lib';
import { userActionState } from './recoil';
import { IUserAction } from './types';

const StyledUserActions = styled.div``;

export interface IUserActionsProps {
  scimEnabled: boolean;
  totalUserCount: number;
  actions: IUserAction[];
}

export const UserActions: FC<IUserActionsProps> = ({
  scimEnabled,
  totalUserCount,
  actions,
  ...restProps
}) => {
  const {
    createAction,
    onActionCancel,
    onActionConfirm,
    onActionFinish,
    onActionMutationComplete,
    openDialog,
    selectedAction,
  } = useUserAction();

  const { selectedIds, allSelected } = useUserListState();

  const setUserActionTaskCount = useSetRecoilState(userActionState.taskCount);
  useMemo(() => {
    const taskCount = allSelected ? totalUserCount : selectedIds.length;
    setUserActionTaskCount(taskCount);
  }, [allSelected, totalUserCount, selectedIds, setUserActionTaskCount]);

  // Actions
  const memoizedActions = useMemo(() => getUserActions(actions), [actions]);
  const actionMenuItems: IActionMenuItem[] = memoizedActions.map(action => ({
    name: <ActionMenuItem action={action} />,
    action: () => createAction(action),
  }));

  const disabled = isEmpty(selectedIds) && !allSelected;

  return (
    <StyledUserActions {...restProps}>
      <ActionMenu
        disabled={disabled}
        items={actionMenuItems}
        menuButton={
          disabled ? (
            <Tooltip
              position="below"
              tooltipBoxChildren={
                <SmallText>{INTL.actionMenuDisabledTooltipText}</SmallText>
              }
            >
              <Button outlined iconStart={<HoxIcon.Action dimmed />}>
                <ButtonText>{INTL.actionMenuButtonText}</ButtonText>
              </Button>
            </Tooltip>
          ) : (
            <Button outlined iconStart={<HoxIcon.Action dimmed />}>
              <ButtonText>{INTL.actionMenuButtonText}</ButtonText>
            </Button>
          )
        }
      />
      {selectedAction && openDialog && (
        <UserActionDialogRenderer
          onActionConfirm={onActionConfirm}
          onActionCancel={onActionCancel}
          onActionFinish={onActionFinish}
          onActionMutationComplete={onActionMutationComplete}
          scimEnabled={scimEnabled}
        />
      )}
    </StyledUserActions>
  );
};
