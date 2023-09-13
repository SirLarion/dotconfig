import { useEffect, useState } from 'react';
import { GetOnboardingRateTimeseriesDataQuery } from './__generated__/GetOnboardingRateTimeseries.generated';

import mockData from './mock.json';

export const useMockData = () => {
  const [data, setData] = useState<
    GetOnboardingRateTimeseriesDataQuery | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(
    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 500),
    []
  );
};
