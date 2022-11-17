import React from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { compose, branch, renderNothing } from 'recompose';
import { gql } from '@apollo/client';

import get from 'lodash/get';

import { TMapper, IResponse, IChildProps, TRenderCallback } from './models';

const OnlyForAdminOrSuperAdmin = ({ children, isSuperAdmin, isAdmin }) => {
  const renderCallback: TRenderCallback = children;
  return (
    <React.Fragment>{renderCallback({ isSuperAdmin, isAdmin })}</React.Fragment>
  );
};

const mapQueryResultToProps: TMapper = result => {
  return {
    isSuperAdmin: get(result, 'data.currentUser.isSuperAdmin', false),
    isAdmin: get(result, 'data.currentUser.isAdmin', false),
  };
};

export const OnlyAdminOrSuperAdmin = compose(
  graphql<{}, IResponse, {}, IChildProps>(adminOrSuperAdminQuery, {
    props: mapQueryResultToProps,
  }),
  branch(
    ({ isSuperAdmin, isAdmin }) => !isSuperAdmin && !isAdmin,
    renderNothing
  )
)(OnlyForAdminOrSuperAdmin);

export default OnlyAdminOrSuperAdmin;
