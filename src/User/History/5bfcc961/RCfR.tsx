import React, { FC } from 'react';
import styled from 'styled-components';

import { useCurrentUser } from '@hox/frontend-utils/hooks/useCurrentUser';

export interface IDashboardProps {}

const StyledDashboard = styled.div``;

export const Dashboard: FC<IDashboardProps> = ({ ...restProps }) => {
  const { profile } = useCurrentUser();
  return <StyledDashboard {...restProps}></StyledDashboard>;
};
