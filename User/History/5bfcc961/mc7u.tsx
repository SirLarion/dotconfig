import React, { FC } from 'react';
import styled from 'styled-components';

import { Card } from '@hox/ui/Card';

import { Layout } from '../../components/Layout';

import { AnalyticsGraphCard } from './components/AnalyticsGraphCard';
import { DashboardHeader } from './components/DashboardHeader';
import { useGetOrgOnboardingRate } from './hooks/useGetOrgOnboardingRate';

const StyledDashboard = styled(Layout.View)``;

const Content = styled(Layout.Content)``;

const Container = styled.div`
  width: 100%;
  display: flex;
  > * {
    flex-grow: 1;
  }
  > :not(:last-child) {
    margin-right: 1rem;
  }
`;

export const Dashboard: FC = ({ ...restProps }) => {
  const { timeseries, latestData } = useGetOrgOnboardingRate();

  return (
    <>
      <DashboardHeader />
      <StyledDashboard {...restProps}>
        <Content>
          <Container>
            <AnalyticsGraphCard
              title="Here's some data"
              graphColor="blue"
              timeseries={timeseries}
              latestData={latestData}
            />
            <Card>Two card</Card>
          </Container>
          <Container>
            <Card>Red card</Card>
            <Card>Blue card</Card>
            <Card>One more for the road?</Card>
          </Container>
        </Content>
      </StyledDashboard>
    </>
  );
};
