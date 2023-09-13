/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { lazy } from 'react';
import { withRouter, NavLink, Route, Switch, Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid/Grid';
import BusinessIcon from '@material-ui/icons/Business';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import { FormattedMessage } from 'react-intl';

import { Intl } from './components/intl';
import { Page, PageHeader, PageContent } from '../../components/ui/Page/Page';
import { IStyles } from '../../components/higherOrderComponents/models';

import { compose } from '../../components/higherOrderComponents';
import { complement, isNil, propSatisfies } from 'ramda';

const shouldRedirect = propSatisfies(complement(isNil), 'redirectTo');
const shouldNotRedirect = complement(shouldRedirect);

interface IEditOrganizationViewProps {
  match: {
    params: {
      organizationId: string;
    };
  };
  onPageChange: (page: string) => void;
  isActive: (page: string) => boolean;
  styles: IStyles;
}

const SUB_PAGES = [
  {
    pageName: '',
    menuItemIntl: Intl.navSettings,
    component: lazy(
      () =>
        import(
          '../../modules/CreateEditOrganization/components/Settings/OrganizationSettings'
        )
    ),
  },
  {
    pageName: 'domains',
    menuItemIntl: Intl.navDomains,
    component: lazy(
      () =>
        import(
          '../../modules/CreateEditOrganization/components/Domains/DomainSettings'
        )
    ),
  },
  {
    pageName: 'threats',
    menuItemIntl: Intl.navThreats,
    component: lazy(
      () =>
        import(
          '../../modules/CreateEditOrganization/components/ThreatSettings/ThreatSettings'
        )
    ),
  },
  {
    pageName: 'incidents',
    redirectTo: 'hdr',
  },
  {
    pageName: 'hdr',
    menuItemIntl: Intl.navHdr,
    component: lazy(
      () =>
        import(
          '../../modules/CreateEditOrganization/components/IncidentSettings/IncidentSettings'
        )
    ),
  },
  {
    pageName: 'scim',
    menuItemIntl: Intl.navScim,
    component: lazy(
      () =>
        import(
          '../../modules/CreateEditOrganization/components/ScimSettings/ScimSettings'
        )
    ),
  },
  {
    pageName: 'onboarding',
    menuItemIntl: Intl.navOnboarding,
    component: lazy(
      () =>
        import(
          '../../modules/CreateEditOrganization/components/OnboardingSettings'
        )
    ),
  },
  {
    pageName: 'demo-mode',
    menuItemIntl: Intl.navDemo,
    component: lazy(
      () => import('../../modules/CreateEditOrganization/components/DemoMode')
    ),
  },
  {
    pageName: 'licenses',
    menuItemIntl: Intl.navLicenses,
    component: lazy(() => import('./components/Licenses/LicenseSettings')),
  },
];

export const EditOrganizationFormView: React.FC<IEditOrganizationViewProps> = ({
  match,
  children,
}) => {
  return (
    <Page>
      <PageHeader icon={<BusinessIcon />}>
        <FormattedMessage {...Intl.organizationSettings} />
      </PageHeader>
      <PageContent>
        <Grid container spacing={10}>
          <Grid item xs={12} md={3} lg={2}>
            <List>
              {SUB_PAGES.filter(shouldNotRedirect).map(
                ({ pageName, menuItemIntl }) => (
                  <NavLink
                    key={pageName}
                    to={`/organizations/edit/${match.params.organizationId}/${pageName}`}
                  >
                    <ListItem button>
                      <ListItemText
                        primary={<FormattedMessage {...menuItemIntl} />}
                      />
                    </ListItem>
                  </NavLink>
                )
              )}
            </List>
          </Grid>

          <Grid item xs={12} md={9} lg={8} xl={6}>
            <Switch>
              {SUB_PAGES.filter(shouldNotRedirect).map(
                ({ pageName, component }) => (
                  <Route
                    key={pageName}
                    exact
                    path={`/organizations/edit/:organizationId/${pageName}`}
                    component={component}
                  />
                )
              )}
              {SUB_PAGES.filter(shouldRedirect).map(
                ({ pageName, redirectTo }) => (
                  <Redirect
                    key={pageName}
                    from={`/organizations/edit/:organizationId/${pageName}`}
                    to={`/organizations/edit/:organizationId/${redirectTo}`}
                  />
                )
              )}
            </Switch>
            {children}
          </Grid>
        </Grid>
      </PageContent>
    </Page>
  );
};

export default compose(withRouter)(EditOrganizationFormView);
