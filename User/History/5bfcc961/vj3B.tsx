import React, { FC } from 'react';
import styled from 'styled-components';

import { Layout } from '../../components/Layout';

import { AnalyticsSection } from './components/AnalyticsSection';
import { DashboardHeader } from './components/DashboardHeader';

const StyledDashboard = styled(Layout.View)``;

const Content = styled(Layout.Content)``;

export const Dashboard: FC = ({ ...restProps }) => {
  return (
    <>
      <DashboardHeader />
      <StyledDashboard {...restProps}>
        <Content>
          <AnalyticsSection timeframe="month" />
        </Content>
      </StyledDashboard>
    </>
  );
};
