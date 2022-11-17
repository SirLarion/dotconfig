import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { palette } from '@hox/ui/styles/theme';

import { userImportPaths } from '../../layouts/paths';
import { PageNotFoundView } from '../PageNotFoundView';

import { UserImportHeader } from './components/UserImportHeader';
import { useCurrentUserOrganizationDefaultSettingsQuery } from './components/UserImportTable/graphql/__generated__/CurrentUserOrganizationDefaultSettings.generated';
import { organizationImportSettingsState } from './recoil/atoms';
import { getUsersCount } from './recoil/selectors';
import { getAllowedEmailDomains } from './lib';
import { UserImportCSVAdditionView } from './UserImportCSVAdditionView';
import { UserImportEmailAdditionView } from './UserImportEmailAdditionView';
import { UserImportMethodSelectionView } from './UserImportMethodSelectionView';
import { UserImportProgressView } from './UserImportProgressView';
import { UserImportResultView } from './UserImportResultView';
import { UserImportReviewView } from './UserImportReviewView';

const StyledUserImport = styled.div`
  background: ${palette(p => p.background.base)};
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const UserImportView: FC = () => {
  const { data } = useCurrentUserOrganizationDefaultSettingsQuery();
  const setOrganizationImportSettings = useSetRecoilState(
    organizationImportSettingsState
  );
  useEffect(() => {
    if (data !== undefined && data.currentUser) {
      const emailDomains = getAllowedEmailDomains(data) || [];
      const { defaultGameMode, usersAreAnonymousByDefault } =
        data.currentUser.organization.game;

      setOrganizationImportSettings({
        emailDomains,
        defaultGameMode,
        usersAreAnonymousByDefault,
      });
    }
  }, [data, setOrganizationImportSettings]);

  const usersCount = useRecoilValue(getUsersCount);
  const hasUsers = usersCount > 0;

  const componentOrRedirect = (path: string, component: React.FC) => {
    if (!hasUsers) {
      return (
        <Route exact path={path}>
          <Redirect to={userImportPaths.root} />
        </Route>
      );
    }
    return <Route exact path={path} component={component} />;
  };

  return (
    <StyledUserImport>
      <UserImportHeader />
      <Switch>
        <Route
          exact
          path={userImportPaths.root}
          component={UserImportMethodSelectionView}
        />
        <Route
          path={userImportPaths.methodEmail}
          component={UserImportEmailAdditionView}
        />
        <Route
          path={userImportPaths.methodCsv}
          component={UserImportCSVAdditionView}
        />
        {componentOrRedirect(userImportPaths.review, UserImportReviewView)}
        {componentOrRedirect(userImportPaths.progress, UserImportProgressView)}
        {componentOrRedirect(userImportPaths.result, UserImportResultView)}
        <Route
          path="*"
          render={() => (
            <>
              <PageNotFoundView />
            </>
          )}
        />
      </Switch>
    </StyledUserImport>
  );
};
