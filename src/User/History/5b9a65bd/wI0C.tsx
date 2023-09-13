import React from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { compose, branch, renderNothing } from 'recompose';
import { gql } from '@apollo/client';

import get from 'lodash/get';

import { GetIsSuperAdminDocument } from './__generated__/GetIsSuperAdmin.generated';
import { TMapper, IResponse, IChildProps } from './models';

const OnlyForSuperAdmin = ({ children }) => (
  <React.Fragment>{children}</React.Fragment>
);

const mapQueryResultToProps: TMapper = result => {
  return { isSuperAdmin: get(result, 'data.currentUser.isSuperAdmin', false) };
};

const superAdminQuery = gql``;

export const OnlySuperAdmin = compose(
  graphql<{}, IResponse, {}, IChildProps>(superAdminQuery, {
    props: mapQueryResultToProps,
  }),
  branch(({ isSuperAdmin }) => !isSuperAdmin, renderNothing)
)(OnlyForSuperAdmin);

export default OnlySuperAdmin;
