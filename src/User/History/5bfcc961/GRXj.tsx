import { Card } from '@hox/ui/Card';
import React, { FC } from 'react';
import styled from 'styled-components';

import { Layout } from '../../components/Layout';

import { DashboardHeader } from './components/DashboardHeader';

const StyledDashboard = styled(Layout.View)``;

export const Dashboard: FC = ({ ...restProps }) => {
  return (
    <>
      <DashboardHeader />
      <StyledDashboard {...restProps}>
        <Layout.Content>
          <Card>One card</Card>
          <Card>Two card</Card>
          <Card>Red card</Card>
          <Card>Blue card</Card>
        </Layout.Content>
      </StyledDashboard>
    </>
  );
};
