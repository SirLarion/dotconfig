import React, { FC, useState } from 'react';
import styled from 'styled-components';

import { AnimatedResizingContent } from '@hox/ui/AnimatedResizingContent';
import { Button } from '@hox/ui/Button';
import { Dropdown } from '@hox/ui/Dropdown';
import { palette } from '@hox/ui/styles/theme';
import { ButtonText, Heading4 } from '@hox/ui/Text';
import { TinyLoadingIndicator } from '@hox/ui/TinyLoadingIndicator';

import { RadioItemsList } from '../../../../components/RadioItemsList';
import { BUTTON_INTL } from '../../../../intl/generic';

const Wrapper = styled.div`
  width: 43rem;
  > :not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

const StyledActionButtons = styled(AnimatedResizingContent)`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  > :first-child:not(:last-child) {
    margin-right: 1rem;
  }
`;

const Title = styled(Heading4)`
  > span {
    color: ${palette(p => p.cta.primary.level(2))};
  }
`;

const Description = styled(ButtonText).attrs({
  color: palette(p => p.foreground.primary.dimmed),
})``;

interface IActionButtonsProps {
  onActionConfirm: () => void;
  onActionCancel: () => void;
  confirmButtonDisabled?: boolean;
}

const CTAButtons: FC<IActionButtonsProps> = ({
  onActionConfirm,
  onActionCancel,
  confirmButtonDisabled = false,
  ...rest
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOnConfirm = () => {
    setConfirmLoading(true);
    setTimeout(() => setConfirmLoading(false), 1000);
    // new Promise(() => onActionConfirm()).then(() => setConfirmLoading(false));
  };

  return (
    <StyledActionButtons axis="x" {...rest}>
      <Button outlined onClick={onActionCancel}>
        {BUTTON_INTL.cancel}
      </Button>
      <Button
        disabled={confirmButtonDisabled || confirmLoading}
        onClick={handleOnConfirm}
      >
        {confirmLoading ? (
          <TinyLoadingIndicator visible />
        ) : (
          BUTTON_INTL.confirm
        )}
      </Button>
    </StyledActionButtons>
  );
};

const RadioButtons = RadioItemsList;

export const Blocks = {
  CTAButtons,
  RadioButtons,
  Dropdown,
  Title,
  Description,
  Wrapper,
};
