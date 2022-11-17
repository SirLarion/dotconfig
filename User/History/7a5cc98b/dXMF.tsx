import React, { FC } from 'react';
import styled from 'styled-components';

export interface ILineStyleDisplayProps {
  $color: string;
  $style: 'solid' | 'dashed';
}

const StyledLineStyleDisplay = styled.div<ILineStyleDisplayProps>`
  width: 2rem;
  > span {
    border-color: ${p => p.$color};
  }
  gap: 0.4rem;
`;

const Line = styled.span`
  width: 0.8rem;
  border-width: 2px;
  border-radius: 2px;
`;

export const LineStyleDisplay: FC<ILineStyleDisplayProps> = props => {
  return (
    <StyledLineStyleDisplay {...props}>
      <Line />
      {props.$style === 'dashed' && <Line />}
    </StyledLineStyleDisplay>
  );
};
