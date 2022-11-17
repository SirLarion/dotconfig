import React, { FC } from 'react';
import styled from 'styled-components';

import { DashboardHeader } from './components/DashboardHeader';

export interface IDashboardProps {}

const StyledDashboard = styled.div``;

export const Dashboard: FC<IDashboardProps> = ({ ...restProps }) => {
  return (
    <>
      <DashboardHeader />
      <StyledDashboard {...restProps}></StyledDashboard>
    </>
  );
};
