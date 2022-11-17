import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useCurrentUser } from '@hox/frontend-utils/hooks/useCurrentUser';
import { FullscreenLoading } from './components/Loading';

const KnowledgeBaseView = lazy(() =>
  import(
    /* webpackChunkName: "knowledge-base-view" */ './views/KnowledgeBaseView'
  ).then(x => ({
    default: x.KnowledgeBaseView,
  }))
);

const DebugView = lazy(() => import('./modules/QuestDebugger/Debug'));
const RateThreatIndexView = lazy(
  () => import('./modules/RateThreat/RateThreatIndexView')
);
const MarkerListView = lazy(() => import('./modules/MarkerList'));
const MarkerContainerView = lazy(
  () => import('./modules/MarkerView/MarkerContainer')
);
const OrganizationView = lazy(
  () => import('./modules/CreateEditOrganization/EditOrganization')
);

const OrganizationListContainerView = lazy(
  () => import('./modules/OrganizationList/OrganizationListContainer')
);

const AddUsersView = lazy(() => import('./modules/AddUsers/AddUsersView'));
const UserListView = lazy(() => import('./modules/UserList/UserList'));
const ImpersonateUsersListView = lazy(
  () => import('./modules/ImpersonateUsersList/ImpersonateUsersList')
);
const QuestTemplateListView = lazy(
  () => import('./modules/QuestTemplateList/QuestTemplateList')
);
const QuestTemplateEditorView = lazy(
  () => import('./modules/QuestTemplateEditor')
);

const BulkUserActionsContainerView = lazy(
  () => import('./modules/BulkUserActions/BulkUserActionsContainer')
);
const DesktopOnlyView = lazy(
  () => import('./components/DesktopOnly/DesktopOnly')
);
const NotFoundView = lazy(() => import('./components/NotFound'));

export const Routes: React.FC = ({ children }) => {
  const { isSuperAdmin } = useCurrentUser();
  const defaultRoute = isSuperAdmin ? '/users/table' : '/threats';
  console.log(defaultRoute);

  return (
    <React.Fragment>
      <Suspense fallback={<FullscreenLoading />}>
        <Switch>
          <Redirect exact from="/" to={defaultRoute} />
          <Route exact path="/knowledge-base" component={KnowledgeBaseView} />
          <Route path="/debug" component={DebugView} />
          <Route path="/threats/:threatId?" component={RateThreatIndexView} />
          <Route exact path="/markers" component={MarkerListView} />
          <Route path="/markers/:markerId" component={MarkerContainerView} />
          <Route path="/fail/:questId" component={MarkerContainerView} />
          <Route
            exact
            path="/organizations"
            component={OrganizationListContainerView}
          />
          <Route
            path="/organizations/edit/:organizationId"
            component={OrganizationView}
          />
          <Route exact path="/users" component={AddUsersView} />
          <Route path="/users/table" component={UserListView} />
          <Route
            exact
            path="/questTemplates"
            component={QuestTemplateListView}
          />
          <Route
            path="/questTemplates/:questTemplateId"
            component={QuestTemplateEditorView}
          />
          <Route
            path="/bulkUserActions"
            component={BulkUserActionsContainerView}
          />
          <Route path="/desktopOnly" component={DesktopOnlyView} />
          <Route
            path="/users/impersonate"
            component={ImpersonateUsersListView}
          />
          <Route path="*" component={NotFoundView} />
          {children}
        </Switch>
      </Suspense>
    </React.Fragment>
  );
};
