import React from 'react';
import styled, { css } from 'styled-components';
import get from 'lodash/get';
import { Grid } from 'react-flexbox-grid';
import { OptionProps } from '@apollo/client/react/hoc';
import { TopBar } from '../../components/TopBar';
import { loadingAdvanced } from '../../components/higherOrderComponents';
import { injectSettings } from '../../components/higherOrderComponents/injectSettings';
import { RelativeLoading } from '../../components/Loading';
import { createStyles, Theme } from '@material-ui/core';
import { createStyleProvider } from '../../components/ui/Style/createStyled';
import { NavigationDrawer } from '../../components/Navigation/NavigationDrawer';
import { SideBar } from '../../components/Navigation/SideBar';
import { Features } from '../higherOrderComponents/features/features';
import { Routes } from '../../routes';
import { RedirectToGameDialog } from '../RedirectToGameDialog/RedirectToGameDialog';
import { useAuth } from '@hox/frontend-utils/auth/AuthProvider';
import { Portal } from '@hox/ui/Portal';
import { ToastHub, ToastProvider } from '@hox/ui/ToastHub';
import {
  useGetAppUserQuery,
  GetAppUserQuery,
} from './__generated__/GetAppUser.generated';

export interface IAppViewProps {
  openNavigationDrawer: () => void;
  closeNavigationDrawer: () => void;
  isNavigationDrawerOpen: boolean;
  usePublicLayout?: boolean;
  settings?: { [key: string]: any };
}

const Styles = (theme: Theme) =>
  createStyles({
    main: {
      position: 'absolute',
      top: 120,
      right: 10,
      left: 0,
      [theme.breakpoints.up('sm')]: {
        left: 120,
        right: 20,
      },
      [theme.breakpoints.up('lg')]: {
        left: '8vw',
        right: '3vw',
        top: 150,
      },
    },
  });

const StyleProvider = createStyleProvider(Styles);

const isAdminOrSOC = (currentUserRoles: string[]) =>
  currentUserRoles.includes('admin') ||
  currentUserRoles.includes('super-admin') ||
  currentUserRoles.includes('soc-operator');

type IPropsFromGQL = {
  isLoading: boolean;
  currentUserRoles: string[];
};

const mapQueryResultToProps = (props: GetAppUserQuery): IPropsFromGQL => {
  const { currentUser } = props;
  const isLoading = currentUser === undefined;
  return {
    isLoading,
    currentUserRoles: get(currentUser, 'roles', []),
  };
};

// (Samuli) Because of the weird different layout of legacy app, we need to do some adjustments for
// the impersonation banner
const StyledMainContainer = styled.div<{ $isImpersonating?: boolean }>`
  ${({ $isImpersonating }) => {
    if ($isImpersonating) {
      return css`
        > :nth-child(1) {
          top: 4rem;
        }
        > :nth-child(2) {
          top: 9rem;
        }
        > :nth-child(4) {
          top: 13rem;
        }
      `;
    }
  }}
`;

const AppViewView: React.SFC<IAppViewProps> = ({
  isNavigationDrawerOpen,
  openNavigationDrawer,
  closeNavigationDrawer,
  usePublicLayout = false,
  settings = {},
  children,
}) => {
  const { isImpersonating } = useAuth();
  const data = useGetAppUserQuery();
  const { isLoading, currentUserRoles } = mapQueryResultToProps(data);
  return (
    <ToastProvider>
      <Portal name="toastHub">
        <ToastHub />
      </Portal>

      <StyleProvider>
        {styles => (
          <Features>
            {({ loading, hasFeature }) => {
              const checkHasFeature = (featName: string) =>
                !loading && hasFeature(featName);
              return (
                <StyledMainContainer $isImpersonating={isImpersonating}>
                  <TopBar
                    isPublic={usePublicLayout}
                    openNavigationDrawer={openNavigationDrawer}
                  />
                  <SideBar
                    currentUserRoles={currentUserRoles}
                    hasFeature={checkHasFeature}
                    settings={settings}
                  />
                  <NavigationDrawer
                    closeNavigationDrawer={closeNavigationDrawer}
                    isOpen={isNavigationDrawerOpen}
                    currentUserRoles={currentUserRoles}
                    hasFeature={checkHasFeature}
                    settings={settings}
                  />
                  <main className={styles.classes.main}>
                    <Grid fluid>
                      {isAdminOrSOC(currentUserRoles) ? (
                        <Routes />
                      ) : (
                        <RedirectToGameDialog />
                      )}
                    </Grid>
                  </main>
                </StyledMainContainer>
              );
            }}
          </Features>
        )}
      </StyleProvider>
    </ToastProvider>
  );
};

export const AppView = loadingAdvanced<IAppViewProps>(props => props.isLoading)(
  () => <RelativeLoading />
)(injectSettings(AppViewView));
