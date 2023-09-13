import { useState } from 'react';
import { GetOnboardingRateTimeseriesDataQuery } from './__generated__/GetOnboardingRateTimeseries.generated';

export const useMockData = () => {
  const [data, setData] = useState<
    GetOnboardingRateTimeseriesDataQuery | undefined
  >(undefined);
};
