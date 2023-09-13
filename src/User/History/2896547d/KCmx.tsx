import React, { FC, useRef } from 'react';
import styled from 'styled-components';
import { animated, config, useSpring } from 'react-spring/dist';
import { useRecoilValue } from 'recoil';

import { Card } from '@hox/ui/Card';

import { useBodyScrollLock } from '../../../../views/TrainingManagement/questTemplate/hooks/useBodyScrollLock';
import { PortalOverlay } from '../../../PortalOverlay';
import { userActionState } from '../../recoil';
import { TUserActionView } from '../../types';
import { UserActionConfirmationView } from '../UserActionConfirmationView';
import { UserActionErrorView } from '../UserActionErrorView';
import { UserActionProgressView } from '../UserActionProgressView';
import { UserActionResultView } from '../UserActionResultView';

const StyledUserActionDialogRenderer = styled(animated(Card))`
  max-height: calc(100vh - 4rem);
  padding: 0;
  overflow: hidden;

  :hover {
    overflow-y: auto;
  }
`;

const Content = styled.div`
  padding: 1.5rem;
  text-align: left;
`;

export interface IUserActionDialogProps {
  onActionConfirm: () => void;
  onActionCancel: () => void;
  onActionFinish: () => void;
  onActionMutationComplete: () => void;
  scimEnabled: boolean;
}

export const UserActionDialogRenderer: FC<IUserActionDialogProps> = ({
  onActionCancel,
  onActionConfirm,
  onActionFinish,
  onActionMutationComplete,
  scimEnabled,
  ...restProps
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const view = useRecoilValue(userActionState.view);
  const selectedAction = useRecoilValue(userActionState.selectedAction);

  const spring = useSpring({
    from: {
      opacity: 0,
      transform: 'translate3d(0, 1rem, 0)',
    },
    to: {
      opacity: 1,
      transform: 'translate3d(0, 0, 0)',
    },
    config: {
      clamp: true,
      ...config.stiff,
    },
  });

  useBodyScrollLock(ref);

  const getCurrentView = (view: TUserActionView) => {
    switch (view) {
      case 'custom':
        return (
          selectedAction?.customDialog &&
          selectedAction.customDialog({
            onActionConfirm,
            onActionFinish,
            onActionCancel,
          })
        );
      case 'confirm':
        return (
          <UserActionConfirmationView
            scimEnabled={scimEnabled}
            onActionCancel={onActionCancel}
            onActionConfirm={onActionConfirm}
          />
        );
      case 'progress':
        return <UserActionProgressView />;
      case 'result':
        return (
          <UserActionResultView
            onActionFinish={onActionFinish}
            onActionMutationComplete={onActionMutationComplete}
          />
        );
      case 'error':
        return <UserActionErrorView onActionExit={onActionFinish} />;
      default:
        throw new Error(`No renderer available for ${view}`);
    }
  };

  return (
    <PortalOverlay visible>
      <StyledUserActionDialogRenderer style={spring} ref={ref} {...restProps}>
        <Content>{view && getCurrentView(view)}</Content>
      </StyledUserActionDialogRenderer>
    </PortalOverlay>
  );
};
