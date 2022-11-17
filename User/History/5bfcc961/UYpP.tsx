import React, { FC } from 'react';
import styled from 'styled-components';

import { useCurrentUser } from '@hox/frontend-utils/hooks/useCurrentUser';

import { Header } from '../../components/Header';
import { FormattedMessage } from 'react-intl';

export interface IDashboardProps {}

const StyledDashboard = styled.div``;
const DashboardHeader = styled(Header)``;

export const Dashboard: FC<IDashboardProps> = ({ ...restProps }) => {
  return (
    <>
      <DashboardHeader>

      <StyledDashboard {...restProps}></StyledDashboard>
    </>
  );
};
