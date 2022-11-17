import React from 'react';
import styled from 'styled-components';

import { Button } from '@hox/ui/Button';
import { useToggleQuestTemplateSoftDeletion } from '../useToggleQuestTemplateSoftDeletion';

const StyledDeleteButton = styled(Button)`
  width: 100%;
  white-space: pre-wrap;
`;

interface IDeleteButtonProps {
  disabledMessage?: string;
  isDeleted: boolean;
  questTemplateId: string;
}

export const DeleteButton: React.FC<IDeleteButtonProps> = ({
  disabledMessage,
  isDeleted,
  questTemplateId,
}) => {
  const [confirmationClickCount, setConfirmationClickCount] = React.useState(0);
  const { toggleQTDeletion } = useToggleQuestTemplateSoftDeletion();

  const handleClick = React.useCallback(() => {
    if (confirmationClickCount < 4) {
      setConfirmationClickCount(confirmationClickCount + 1);
      return;
    }
    setConfirmationClickCount(0);
    toggleQTDeletion(questTemplateId);
  }, [confirmationClickCount, questTemplateId, toggleQTDeletion]);

  const confirmationText =
    confirmationClickCount > 0
      ? `Click ${5 - confirmationClickCount} more times to confirm!`
      : '';

  const buttonText = isDeleted
    ? 'Click to restore template'
    : 'Click to soft delete template';

  return (
    <StyledDeleteButton
      disabled={!!disabledMessage}
      onClick={handleClick}
      type="button"
      color={isDeleted ? 'secondary' : 'danger'}
    >
      {disabledMessage || `${buttonText}\n${confirmationText}`}
    </StyledDeleteButton>
  );
};
