import React, { FC } from 'react';
import styled from 'styled-components';

import { Layout } from '../../components/Layout';

import { AnalyticsSection } from './components/AnalyticsSection';
import { useAnalyticsQuery } from './components/AnalyticsSection/hooks/useAnalyticsQuery';
import { DashboardHeader } from './components/DashboardHeader';

const StyledDashboard = styled(Layout.View)``;

const Content = styled(Layout.Content)``;

export const Dashboard: FC = ({ ...restProps }) => {
  const timeframe = 'quarter';
  const { analytics, loading, industry } = useAnalyticsQuery(timeframe);

  return (
    <>
      <DashboardHeader industry={industry} />
      <StyledDashboard {...restProps}>
        <Content>
          <AnalyticsSection loading={loading} analytics={analytics} />
        </Content>
      </StyledDashboard>
    </>
  );
};
