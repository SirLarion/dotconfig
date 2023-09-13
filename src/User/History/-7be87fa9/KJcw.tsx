import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';

import { OnboardingBar } from '../components/OnboardingBar';
import { useShowOnboarding } from '../onboarding/hooks/useShowOnboarding';
import { OnboardingLandingView } from '../views/OnboardingLanding';
import { UserImportView } from '../views/UserImport';

import { MainLayout } from './MainLayout';
import { onboardingPaths, userImportPaths } from './paths';

const OnboardingBarLayouts: FC<{ showOnboarding: boolean }> = ({
  showOnboarding,
}) => {
  return (
    <>
      {showOnboarding && <OnboardingBar />}
      <Switch>
        <Route path={userImportPaths.root} component={UserImportView} />
        <Route path="/" component={MainLayout} />
      </Switch>
    </>
  );
};

export const Layouts: FC = () => {
  const { showOnboarding } = useShowOnboarding();
  return (
    <>
      <Switch>
        {showOnboarding && (
          <Route
            path={onboardingPaths.welcome}
            component={OnboardingLandingView}
          />
        )}
        <OnboardingBarLayouts showOnboarding={showOnboarding} />
      </Switch>
    </>
  );
};
