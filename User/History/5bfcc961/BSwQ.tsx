import React, { FC } from 'react';
import styled from 'styled-components';

import { Layout } from '../../components/Layout';

import { DashboardHeader } from './components/DashboardHeader';

export interface IDashboardProps {}

const StyledDashboard = styled(Layout.View)``;

export const Dashboard: FC<IDashboardProps> = ({ ...restProps }) => {
  return (
    <>
      <DashboardHeader />
      <StyledDashboard {...restProps}></StyledDashboard>
    </>
  );
};
