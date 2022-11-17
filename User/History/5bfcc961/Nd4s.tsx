import React, { FC } from 'react';
import styled from 'styled-components';

import { Layout } from '../../components/Layout';

import { DashboardHeader } from './components/DashboardHeader';
import { MetricsSection } from './components/MetricsSection';

const StyledDashboard = styled(Layout.View)``;

c;

export const Dashboard: FC = ({ ...restProps }) => {
  return (
    <>
      <DashboardHeader />
      <StyledDashboard {...restProps}>
        <Content>
          <MetricsSection />
        </Content>
      </StyledDashboard>
    </>
  );
};
