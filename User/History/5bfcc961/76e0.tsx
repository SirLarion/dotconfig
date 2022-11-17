import React, { FC } from 'react';
import styled from 'styled-components';

import { useCurrentUser } from '@hox/frontend-utils/hooks/useCurrentUser';

import { Header } from '../../components/Header';
import { FormattedMessage } from 'react-intl';

export interface IDashboardProps {}

const StyledDashboard = styled.div``;
const DashboardHeader = styled(Header)``;

export const Dashboard: FC<IDashboardProps> = ({ ...restProps }) => {
  const { profile } = useCurrentUser();
  return (
    <>
      <DashboardHeader>
        <FormattedMessage
          id="app.admin.dashboard.heading.title"
          defaultMessage="Welcome {adminName},"
          description="Heading title for the admin dashboard view welcoming the admin."
          values={{
            adminName: profile.firstName,
          }}
        />
      </DashboardHeader>
      <StyledDashboard {...restProps}></StyledDashboard>
    </>
  );
};
