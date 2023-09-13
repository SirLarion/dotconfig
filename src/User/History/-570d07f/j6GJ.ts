import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { createLocalStorageLens } from '@hox/frontend-utils/localStorage';
import { useGetIsOrgOnboardingQuery } from './__generated__/GetIsOrgOnboarding.generated';
import { onboardingState } from 'onboarding/recoil';

const { get, set } = createLocalStorageLens<boolean>('obflow');

export const useOnboardingVisibility = () => {
  const setShowOnboarding = useSetRecoilState(onboardingState.showOnboarding);
  const { data, loading } = useGetIsOrgOnboardingQuery();
  const { onboardingStartedAt, onboardingCompletedAt } =
    data?.currentUser?.organization || {};

  const search = useLocation().search;
  const hasParam = new URLSearchParams(search).get('obflow') !== null;
  const localStorageValue = get();

  const isOrganizationOnboarding = useMemo(
    () => !!(!!onboardingStartedAt && !onboardingCompletedAt),
    [onboardingStartedAt, onboardingCompletedAt]
  );

  const showOnboarding = useMemo(
    () =>
      (localStorageValue ? localStorageValue : hasParam) ||
      isOrganizationOnboarding,
    [localStorageValue, hasParam, isOrganizationOnboarding]
  );

  useEffect(() => {
    if (hasParam) {
      set(true);
    }
    if (!loading) {
    }
  }, [hasParam, isOrganizationOnboarding]);
};
