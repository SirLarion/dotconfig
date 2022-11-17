import React, { FC } from 'react';
import styled from 'styled-components';

export interface ILineStyleDisplayProps {
  $color: string;
  $style: 'solid' | 'dashed';
}

const Line = styled.span<ILineStyleDisplayProps>``;

export const LineStyleDisplay: FC<ILineStyleDisplayProps> = ({
  $color,
  $style,
  ...restProps
}) => {
  if ($style === 'dashed') {
    return <div />;
  }

  return <StyledLineStyleDisplay {...restProps}>heloo</StyledLineStyleDisplay>;
};
