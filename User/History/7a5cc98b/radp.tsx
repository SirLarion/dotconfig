import React, { FC } from 'react';
import styled from 'styled-components';

export interface ILineStyleDisplayProps {
  $color: string;
  $style: 'solid' | 'dashed';
}

const StyledLineStyleDisplay = styled.div<ILineStyleDisplayProps>`
  width: 2rem;
  display: flex;
  > div {
    background-color: ${p => p.$color};
  }
  gap: 0.25rem;
`;

const Line = styled.div`
  height: 0.25rem;
  flex-grow: 1;
  border-radius: 100%;
`;

export const LineStyleDisplay: FC<ILineStyleDisplayProps> = props => {
  return (
    <StyledLineStyleDisplay {...props}>
      <Line />
      {props.$style === 'dashed' && <Line />}
    </StyledLineStyleDisplay>
  );
};
