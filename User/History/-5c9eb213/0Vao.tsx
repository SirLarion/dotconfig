import React, { FC } from 'react';
import styled from 'styled-components';
import { RecoilRoot } from 'recoil';
import { RecoilURLSync } from 'recoil-sync';

import { Layout } from '../../components/Layout';
import { userActions } from '../../components/UserActions/actions';
import {
  JSONParseNullAsUndefined,
  JSONStringifyUndefinedAsNull,
} from '../../utils/recoil';

import { UserActions } from './../../components/UserActions';
import { getDefaultFilters } from './components/filters/lib';
import { UserListPage } from './components/UserListPage';
import { UserManagementHeader } from './components/UserManagementHeader';
import { useOrganizationScimStatus } from './hooks/useOrganizationScimStatus';

const StyledUserManagement = styled(Layout.View)``;

export const UserManagement: FC = ({ ...restProps }) => {
  const { scimEnabled } = useOrganizationScimStatus();

  const allowedUserActions = [
    userActions.setUserProperties,
    userActions.exportCsv,
    userActions.deactivateUsers,
    userActions.autostartUsers,
    userActions.inviteUsers,
    userActions.reactivateUsers,
  ];

  return (
    <>
      <RecoilRoot>
        <RecoilURLSync
          location={{ part: 'queryParams' }}
          serialize={JSONStringifyUndefinedAsNull}
          deserialize={JSONParseNullAsUndefined}
        >
          <UserManagementHeader />
          <StyledUserManagement {...restProps}>
            <UserListPage
              filters={getDefaultFilters(scimEnabled)}
              Actions={UserActions}
              scimEnabled={scimEnabled}
              allowedUserActions={allowedUserActions}
            />
          </StyledUserManagement>
        </RecoilURLSync>
      </RecoilRoot>
    </>
  );
};
