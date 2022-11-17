import { useState } from 'react';

export const useMockData = () => {
  const [data, setData] =
    useState<GetOnboardingRateTimeseriesDataQuery>(undefined);
};
