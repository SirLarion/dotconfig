import React, { FC } from 'react';
import styled from 'styled-components';

export interface ILineStyleDisplayProps {
  $color: string;
  $style: 'solid' | 'dashed';
}

const StyledLineStyleDisplay = styled.div``;

const Line = styled.span<Pick<ILineStyleDisplayProps, '$color'>>``;

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