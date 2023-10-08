import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { createLocalStorageLens } from '@hox/frontend-utils/localStorage';

import { useGetIsOrgOnboardingQuery } from './__generated__/GetIsOrgOnboarding.generated';

const { get, set } = createLocalStorageLens<boolean>('obflow');

export const useShowOnboarding = () => {
  const { data } = useGetIsOrgOnboardingQuery();
  const { onboardingStartedAt, onboardingCompletedAt } =
    data?.currentUser?.organization || {};

  const search = useLocation().search;
  const hasParam = new URLSearchParams(search).get('obflow') !== null;
  const localStorageValue = get();

  const isOrganizationOnboarding = useMemo(
    () => !!onboardingStartedAt && !onboardingCompletedAt,
    [onboardingStartedAt, onboardingCompletedAt]
  );

  const showOnboarding = useMemo(
    () => localStorageValue || hasParam || isOrganizationOnboarding,
    [localStorageValue, hasParam, isOrganizationOnboarding]
  );

  useEffect(() => {
    if (hasParam) {
      set(true);
    }
  }, [hasParam]);

  return {
    showOnboarding,
  };
};