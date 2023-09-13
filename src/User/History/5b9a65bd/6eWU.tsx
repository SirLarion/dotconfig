import React from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { compose, branch, renderNothing } from 'recompose';

import get from 'lodash/get';

import { GetIsSuperAdminDocument } from './__generated__/GetIsSuperAdmin.generated';
import { TMapper, IResponse, IChildProps } from './models';

const OnlyForSuperAdmin = ({ children }) => (
  <React.Fragment>{children}</React.Fragment>
);

const mapQueryResultToProps: TMapper = result => {
  return { isSuperAdmin: get(result, 'data.currentUser.isSuperAdmin', false) };
};

export const OnlySuperAdmin = compose(
  graphql<{}, IResponse, {}, IChildProps>(GetIsSuperAdminDocument, {
    props: mapQueryResultToProps,
  }),
  branch(({ isSuperAdmin }) => !isSuperAdmin, renderNothing)
)(OnlyForSuperAdmin);

export default OnlySuperAdmin;
