import React, { FC } from 'react';
import styled from 'styled-components';

import { Card } from '@hox/ui/Card';

import { Layout } from '../../components/Layout';

import { DashboardHeader } from './components/DashboardHeader';

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
  return (
    <>
      <DashboardHeader />
      <StyledDashboard {...restProps}>
        <Content>
          <Container>
            <Card>One card</Card>
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
