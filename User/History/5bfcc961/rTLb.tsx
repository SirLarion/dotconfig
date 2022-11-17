import React, { FC } from 'react';
import styled from 'styled-components';

export interface IDashboardProps {}

const StyledDashboard = styled.div``;

export const Dashboard: FC<IDashboardProps> = ({ ...restProps }) => {
  return <StyledDashboard {...restProps}>heloo</StyledDashboard>;
};
