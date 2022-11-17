import React, { FC } from 'react';
import styled from 'styled-components';

import { TimeseriesGraph } from '@hox/ui/TimeseriesGraph';

import { useMockData } from './useMockData';

// import { useGetOnboardingRateTimeseriesDataQuery } from './__generated__/GetOnboardingRateTimeseries.generated';

export interface IDashboardProps {}

const StyledDashboard = styled.div`
  width: 60rem;
  height: 25rem;
`;

export const Dashboard: FC<IDashboardProps> = ({ ...restProps }) => {
  // const { data, loading } = useGetOnboardingRateTimeseriesDataQuery();
  const { data, loading } = useMockData();

  if (!loading) {
    return (
      <StyledDashboard {...restProps}>
        <TimeseriesGraph queryResult={data} />
      </StyledDashboard>
    );
  }

  return <div>Loading</div>;
};
