import React, { FC } from 'react';
import styled from 'styled-components';
import { filter } from 'ramda';
import { Route, Switch } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useAuth } from '@hox/frontend-utils/auth/AuthProvider';
import { useCurrentUser } from '@hox/frontend-utils/hooks/useCurrentUser';
import { ISidenavLink, Sidenav } from '@hox/ui/Sidenav';
import { parseCurrentUser } from '@hox/ui/Sidenav/lib';

import { Logo } from '../../components/Logo';
import { globalState } from '../../global/recoil';
import { config } from '../../utils/config';
import { AccountSettingsView } from '../../views/AccountSettings';
import { AwarenessMomentsView } from '../../views/AwarenessMoments';
import { OnboardingView } from '../../views/Onboarding';
import { PageNotFoundView } from '../../views/PageNotFoundView';
import { SettingsView } from '../../views/Settings';
import { TechnicalTestingView } from '../../views/TechnicalTesting';
import { TrainingManagementView } from '../../views/TrainingManagement';
import { UserDetails } from '../../views/UserDetails';
import { UserManagement } from '../../views/UserManagement';
import {
  ACCOUNT_SETTINGS_PATH,
  onboardingPaths,
  SECURITY_AWARENESS_TRAINING_PATH,
  SETTINGS_PATH,
  TECHNICAL_TESTING_PATH,
  TRAINING_MANAGEMENT_PATH,
  USER_DETAILS_PATH,
  USER_MANAGEMENT_PATH,
} from '../paths';

import {
  hasFeatureFlag,
  logoutLink,
  onboardingMenuItem,
  primary,
  ScrollToTop,
  secondary,
} from './lib';
import { onboardingState } from 'onboarding/recoil';

const MainLayoutStyled = styled.div`
  display: flex;
`;

const MainLayoutContent = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

export const MainLayout: FC = () => {
  const currentUser = useCurrentUser();

  const { logout, isImpersonating } = useAuth();

  const filterWithFeatures = filter(
    (link: ISidenavLink) =>
      !link.featureFlag || hasFeatureFlag(link.featureFlag, currentUser)
  );

  const userInfo = parseCurrentUser(currentUser);

  const setSidenavWidthRem = useSetRecoilState(globalState.sidenavWidthRem);

  const showOnboarding = useRecoilValue(onboardingState.showOnboarding);

  const navItems = showOnboarding
    ? filterWithFeatures([...primary, ...onboardingMenuItem])
    : filterWithFeatures(primary);

  return (
    <MainLayoutStyled>
      <Sidenav
        onResize={width => setSidenavWidthRem(width)}
        userInfo={userInfo}
        logo={<Logo simple />}
        logoutLink={{ ...logoutLink, onClick: logout }}
        primaryLinks={navItems}
        secondaryLinks={filterWithFeatures(secondary)}
        crossAppConfig={config}
        isImpersonating={isImpersonating}
      />
      <MainLayoutContent>
        <ScrollToTop>
          <Switch>
            <Route
              path={ACCOUNT_SETTINGS_PATH}
              component={AccountSettingsView}
            />
            <Route path={SETTINGS_PATH} component={SettingsView} />
            <Route
              path={TRAINING_MANAGEMENT_PATH}
              component={TrainingManagementView}
            />

            <Route path={onboardingPaths.root} component={OnboardingView} />
            <Route
              path={SECURITY_AWARENESS_TRAINING_PATH}
              component={AwarenessMomentsView}
            />
            <Route
              exact
              path={TECHNICAL_TESTING_PATH}
              component={TechnicalTestingView}
            />
            <Route
              exact
              path={USER_MANAGEMENT_PATH}
              component={UserManagement}
            />
            <Route path={USER_DETAILS_PATH} component={UserDetails} />
            <Route path="/" component={UserManagement} />
            <Route path="*" component={PageNotFoundView} />
          </Switch>
        </ScrollToTop>
      </MainLayoutContent>
    </MainLayoutStyled>
  );
};
