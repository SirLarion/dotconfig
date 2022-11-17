import React, { FC, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

import { Button as BaseButton } from '@hox/ui/Button';
import { Dropdown } from '@hox/ui/Dropdown';
import { palette, themeProp } from '@hox/ui/styles/theme';
import { ButtonText, Heading4 } from '@hox/ui/Text';

import { RadioItemsList } from '../../../../components/RadioItemsList';
import { BUTTON_INTL } from '../../../../intl/generic';

const Wrapper = styled.div`
  width: 43rem;
  > :not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

const StyledActionButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  > :first-child:not(:last-child) {
    margin-right: 1rem;
  }
`;

const loadingAnimation = keyframes`
  from {opacity: 0.5; }
  to {opacity: 0.7; }
`;

const Button = styled(BaseButton)<{ loading?: boolean }>`
  ${({ loading }) =>
    loading &&
    css`
      animation-name: ${loadingAnimation};
      animation-duration: 3s;
      animation-iteration-count: infinite;
    `}
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
  const [confirmLoading, setConfirmLoading] = useState(true);

  const handleOnConfirm = () => {
    setConfirmLoading(true);
    new Promise(() => onActionConfirm()).then(() => setConfirmLoading(false));
  };

  return (
    <StyledActionButtons {...rest}>
      <Button outlined onClick={onActionCancel}>
        {BUTTON_INTL.cancel}
      </Button>
      <Button
        disabled={confirmButtonDisabled}
        onClick={handleOnConfirm}
        loading={confirmLoading}
      >
        {BUTTON_INTL.confirm}
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
