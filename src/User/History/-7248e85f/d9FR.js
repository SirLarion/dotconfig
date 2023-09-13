import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { graphql } from '@apollo/client/react/hoc';
import { connect } from 'react-redux';

import { useCurrentUser } from '@hox/frontend-utils/hooks/useCurrentUser';
import { Intl } from '../../utils/clientIntl';
import { isSuperAdmin } from '../../models/userGetters';
import { compose } from '../../components/higherOrderComponents';
import {
  createNotification,
  createNotificationFromText,
  createPrebuildNotification,
} from '../../utils/notification/lib';

import OrganizationList from './OrganizationListView';
import { config } from '../../utils/config';

const mapDispatchToProps = dispatch => {
  return {
    showSuccessNotification: intlMsg =>
      intlMsg
        ? dispatch(createNotification('success', intlMsg))
        : dispatch(createPrebuildNotification('success')),
    showErrorNotification: errorMsg =>
      dispatch(createNotificationFromText('error', errorMsg)),
  };
};
const currentUserQueryConf = { name: 'currentUserData' };

const getOrganizationIdFilter = currentUser =>
  isSuperAdmin(currentUser)
    ? {}
    : { organizationId: currentUser.organization._id };

const organizationsQueryConf = {
  name: 'organizationData',
  options: ({ currentUserData: { currentUser = {} } }) => ({
    variables: {
      ...getOrganizationIdFilter(currentUser),
    },
  }),
  props: ({
    organizationData: { loading, organizations = [] },
    ownProps: {
      history,
      currentUserData: { currentUser = {}, loading: currentUserLoading },
    },
  }) => ({
    isLoading: loading || currentUserLoading,
    isSuperAdmin: isSuperAdmin(currentUser),
    organizations,
    goToOrganizationUpdate: id => history.push(`/organizations/edit/${id}`),
  }),
};

const deleteOrgMutationConf = {
  props: ({
    mutate,
    ownProps: { showSuccessNotification, showErrorNotification },
  }) => ({
    deleteOrganization: organizationId =>
      mutate({
        variables: { organizationId },
        update: (proxy, { data: { deleteOrganization } }) => {
          const queryDef = {
            query: GetOrganizationListOrgsDocument,
          };
          const data = proxy.readQuery(queryDef);
          data.organizations = data.organizations.filter(
            ({ _id }) => _id !== deleteOrganization._id
          );
          proxy.writeQuery({ ...queryDef, data });
          showSuccessNotification();
        },
      })
        .then(() => showSuccessNotification())
        .catch(err => showErrorNotification(err.message)),
  }),
};

const inviteUnstartedUsersMutationConf = {
  props: ({ mutate, ownProps }) => ({
    inviteUnstartedUsers: organizationId =>
      mutate({
        variables: { organizationId },
      })
        .then(() =>
          ownProps.showSuccessNotification({
            ...Intl.promoteToUnstartedUsers,
          })
        )
        .catch(err => ownProps.showErrorNotification(err.message)),
  }),
};

const startGameForUnstartedUsersMutationConf = {
  props: ({ mutate, ownProps }) => ({
    startGameForUsers: organizationId =>
      mutate({
        variables: { organizationId },
      })
        .then(() =>
          ownProps.showSuccessNotification({
            ...Intl.scheduling,
          })
        )
        .catch(err => ownProps.showErrorNotification(err.message)),
  }),
};

const Container = compose(
  withRouter,
  connect(null, mapDispatchToProps),
  graphql(CURRENT_USER_QUERY, currentUserQueryConf),
  graphql(GetOrganizationListOrgsDocument, organizationsQueryConf),
  graphql(DELETE_ORGANIZATION_MUTATION, deleteOrgMutationConf),
  graphql(INVITE_UNSTARTED_USERS_MUTATION, inviteUnstartedUsersMutationConf),
  graphql(
    START_GAME_FOR_UNSTARTED_USERS_MUTATION,
    startGameForUnstartedUsersMutationConf
  )
)(OrganizationList);

const OrganizationListContainer = props => {
  const { isSuperAdmin, isAdmin } = useCurrentUser();

  useEffect(() => {
    if (isAdmin && !isSuperAdmin) {
      window.location.assign(config.adminPortalHref);
    }
  }, [isSuperAdmin, isAdmin]);

  if (!isSuperAdmin) {
    return null;
  }

  return <Container {...props} />;
};

export default OrganizationListContainer;
