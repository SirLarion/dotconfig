import React, { FC } from 'react';
import styled from 'styled-components';

export interface ILineStyleDisplayProps {
  $color: string;
  $style: 'solid' | 'dashed';
}

const StyledLineStyleDisplay = styled.div<ILineStyleDisplayProps>`
  width: 2rem;
  > div {
    background-color: ${p => p.$color};
  }
  gap: 0.4rem;
`;

const Line = styled.div`
  display: inline;
  height: 4px;
  width: 0.8rem;
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
