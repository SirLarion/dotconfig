import { useGetOrgOnboardingRateQuery } from './__generated__/GetOrgOnboardingRate.generated';

import { extractTimeseriesData } from '../lib';

export const useGetOrgOnboardingRate = () => {
  const { data, loading } = useGetOrgOnboardingRateQuery({
    variables: { filter: { timestamp_gt: '2022-07-30T00:00:00Z' } },
  });

  return { timeseries: extractTimeseriesData(data), loading };
};
