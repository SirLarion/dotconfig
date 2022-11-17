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
`;

const Line = styled.span`
  border-width: 2px;
  border-radius: 2px;
`;

export const LineStyleDisplay: FC<ILineStyleDisplayProps> = ({
  $color,
  $style,
  ...restProps
}) => {
  return (
    <StyledLineStyleDisplay {...restProps}>
      <Line $color />
    </StyledLineStyleDisplay>
  );
};
