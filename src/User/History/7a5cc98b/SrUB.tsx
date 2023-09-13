import React, { FC } from 'react';
import styled from 'styled-components';

export interface ILineStyleDisplayProps {
  $color: string;
  $style: 'solid' | 'dashed';
}

const StyledLineStyleDisplay = styled.div<ILineStyleDisplayProps>``;

export const LineStyleDisplay: FC<ILineStyleDisplayProps> = ({
  ...restProps
}) => {
  return <StyledLineStyleDisplay {...restProps}>heloo</StyledLineStyleDisplay>;
};
