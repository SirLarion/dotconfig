import React, { FC } from 'react';
import styled from 'styled-components';

export interface ILineStyleDisplayProps {
  $color: string;
  $style: 'solid' | 'dashed';
}

const StyledLineStyleDisplay = styled.div`
  width: 2rem;
`;

const Line = styled.span<Pick<ILineStyleDisplayProps, '$color'>>`
  border: 2px solid ${p => p.$color};
  border-radius: 2px;

`;

export const LineStyleDisplay: FC<ILineStyleDisplayProps> = ({
  $color,
  $style,
  ...restProps
}) => {
  if ($style === 'dashed') {
    return <;
  }

  return <StyledLineStyleDisplay {...restProps}>heloo</StyledLineStyleDisplay>;
};
