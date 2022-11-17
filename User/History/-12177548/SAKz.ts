import { extractTimeseriesData } from '../lib';

import { useGetOrgOnboardingRateQuery } from './__generated__/GetOrgOnboardingRate.generated';

export const useGetOrgOnboardingRate = () => {
  const { data, loading } = useGetOrgOnboardingRateQuery({
    variables: { filter: { timestamp_gt: '2022-07-30T00:00:00Z' } },
  });

  return { timeseries: extractTimeseriesData(data), loading };
};
