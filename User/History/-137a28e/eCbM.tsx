import React, { FC } from 'react';
import styled from 'styled-components';

import { Header } from '../../../../components/Header';

export interface IDashboardHeaderProps {}

const StyledDashboardHeader = styled(Header)``;

export const DashboardHeader: FC<IDashboardHeaderProps> = ({
  ...restProps
}) => {
  return <StyledDashboardHeader {...restProps}>heloo</StyledDashboardHeader>;
};
