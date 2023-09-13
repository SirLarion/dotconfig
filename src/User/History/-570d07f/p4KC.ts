import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { createLocalStorageLens } from '@hox/frontend-utils/localStorage';
import { useGetIsOrgOnboardingQuery } from './__generated__/GetIsOrgOnboarding.generated';

const { get, set } = createLocalStorageLens<boolean>('obflow');

export const useShowOnboarding = () => {
  const { data, loading, error } = useGetIsOrgOnboardingQuery();
  const { onboardingStartedAt, onboardingFinishedAt } =
    data?.currentUser?.organization || {};

  const search = useLocation().search;
  const hasParam = new URLSearchParams(search).get('obflow') !== null;
  const localStorageValue = get();

  const isOrganizationOnboarding =
    !!onboardingStartedAt && !onboardingFinishedAt;
  const showOnboarding = localStorageValue ? localStorageValue : hasParam;

  useEffect(() => {
    if (hasParam) {
      set(true);
    }
  }, [hasParam]);

  return { showOnboarding };
};
