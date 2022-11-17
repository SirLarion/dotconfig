import React, { useState, useMemo, useEffect } from 'react';

import { useQuery } from '../../hooks/useQuery';
import get from 'lodash/get';
import { SmartTable } from '../../components/SmartTable';

import { FormattedMessage } from 'react-intl';
import { Check } from '../../components/Check';

import { Row, Col } from 'react-flexbox-grid';

import {
  getMostRelevantRole,
  getUserRole,
} from '../UserList/components/RoleCellRenderer';
import { getUserState } from '../UserList/components/UserStateCellRenderer';

import TextField from '@material-ui/core/TextField';
import { useDebouncedCallback } from '../../hooks/useDebounce';

import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import Intl from '../UserList/intl';
import { IIcuMessage } from '../../models/common';
import { config } from '../../utils/config';
import { OrganizationSelector } from '../../components/OrganizationSelector/OrganizationSelectorContainer';
import { Dropdown } from '@hox/ui/Dropdown';
import { useGetImpersonateUsersListQuery } from './__generated__/GetImpersonateUsersList.generated';
import { User_sort } from '@hox/frontend-utils/types/graphql.generated';

const ROLE_DROPDOWN_ITEMS = [
  {
    id: 'admin',
    value: 'admin',
  },
  {
    id: 'soc-operator',
    value: 'soc-operator',
  },
  {
    id: 'user',
    value: 'user',
  },
];

const asDropdownItem = (value: string) => ({ value });

const UnwrapFormattedMessage = (props: IIcuMessage) => (
  <FormattedMessage {...props}>{msg => <>{msg}</>}</FormattedMessage>
);

const getGraphQLSearchSpecifier = (role: string) =>
  role !== undefined ? `role:${role}` : undefined;

const getGraphQLSortSpecifier = (sort: {
  sortHeader: string;
  isAsc: boolean;
}) =>
  `${sort.sortHeader.replace(/\./g, '__')}_${
    sort.isAsc ? 'ASC' : 'DESC'
  }` as User_sort;

const isImpersonationAllowed = (roles: string[]) => {
  const mostRelevantRole = getMostRelevantRole(roles);
  return !(
    mostRelevantRole === 'task-runner' || mostRelevantRole === 'super-admin'
  );
};

const renderImpersonateButton = (
  isImpersonationAllowed: boolean,
  id: string
) => {
  if (!isImpersonationAllowed) {
    return (
      <Button size="small" color="primary" disabled>
        Impersonate
      </Button>
    );
  }
  return (
    <a
      href={`${config.gqlHost}/auth/impersonate/loginasotheruser?userId=${id}`}
    >
      <Button size="small" color="primary">
        Impersonate
      </Button>
    </a>
  );
};

const renderRowColumnItem = () => (row, dataAlias) => {
  switch (dataAlias) {
    case 'roles':
      return getUserRole(get(row, dataAlias, []));
    case 'profile.firstName':
      return `${get(row, 'profile.firstName')} ${get(row, 'profile.lastName')}`;
    case 'game.mode':
      return (
        <span style={{ textTransform: 'capitalize' }}>
          {get(row, dataAlias).toLowerCase().replace('_', ' ')}
        </span>
      );
    case 'game.active':
      return <Check checked={get(row, dataAlias)} />;
    case 'status':
      return getUserState(row);
    case 'impersonate':
      return renderImpersonateButton(
        isImpersonationAllowed(get(row, 'roles', [])),
        get(row, '_id', '')
      );
    default:
      return get(row, dataAlias);
  }
};

const tableHeaders = [
  { sortable: false, alias: 'Role', dataAlias: 'roles' },
  { sortable: true, alias: 'Name', dataAlias: 'profile.firstName' },
  { sortable: false, alias: 'Status', dataAlias: 'status' },
  { sortable: true, alias: 'Organization', dataAlias: 'organizationName' },
  { sortable: true, alias: 'Game mode', dataAlias: 'game.mode' },
  { sortable: true, alias: 'Game Active ?', dataAlias: 'game.active' },
  { sortable: false, alias: '', dataAlias: 'impersonate' },
];

// note(Anssi): top bar = 150px
const FixedHeightRowStyled = styled(Row)`
  height: calc(100vh - 150px - 0.5rem);
  align-content: flex-start;
  overflow: hidden;
`;

// note(Anssi): actions bar = 60px
const TableColStyled = styled(Col)`
  margin-top: 0.5rem;
  max-height: calc(100% - 60px);
  overflow-y: auto;
`;

const TableActionsContainer = styled.div`
  display: flex;
  width: 100%;
  height: min-content;
  margin-bottom: 2rem;
`;

const UserList: React.FC = () => {
  const limit = 50;
  const [organizationId, setOrganizationId] = useState(undefined);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('admin');
  const [skip, setSkip] = useState(0);
  const [sort, setSort] = useState({
    sortHeader: 'profile.firstName',
    isAsc: true,
  });
  const [filter, setFilter] = useState('');

  const setSearch = useDebouncedCallback(searchTerm => {
    setEmail(searchTerm);
  }, 600);

  useEffect(() => {
    setSkip(0);
  }, [organizationId, email, role]);

  const variables = {
    limit,
    skip,
    organizationId,
    email,
    search: getGraphQLSearchSpecifier(role),
    sort: getGraphQLSortSpecifier(sort),
  };

  const { data, loading } = useGetImpersonateUsersListQuery({
    skip: !organizationId,
    variables,
  });

  const users = useMemo(
    () => get(data, 'organizations.0.usersConnection.nodes', []),
    [data]
  );

  // note(Anssi): because MUI mutates internal state,
  // workaround to manipulate material UI table state is needed.
  // e.g. clearing "selectedUserIds" here is not enough to clear MUI table
  const dangerousTableRef = React.useRef(null);

  return (
    <FixedHeightRowStyled>
      <TableActionsContainer>
        <Col xs={3}>
          <OrganizationSelector
            value={organizationId}
            onChange={setOrganizationId}
          />
        </Col>
        <Col xs={3}>
          <Dropdown
            items={ROLE_DROPDOWN_ITEMS}
            title="user role"
            initialSelected={asDropdownItem(role)}
            onChange={item => {
              if (!Array.isArray(item)) {
                setRole(item.value);
              }
            }}
          />
        </Col>
        <Col xs={6}>
          <TextField
            helperText={
              <UnwrapFormattedMessage {...Intl.searchUsersHelperText} />
            }
            fullWidth
            onChange={event => setSearch(event.target.value)}
          />
        </Col>
      </TableActionsContainer>
      <TableColStyled xs={12}>
        <SmartTable
          isLoading={loading}
          renderRowColumnItem={renderRowColumnItem()}
          onRowSelection={() => {}}
          onSort={setSort}
          total={
            users.length === limit
              ? skip + users.length + 1
              : skip + users.length
          }
          limit={limit}
          offset={skip}
          onPageClick={setSkip}
          tableHeaders={tableHeaders}
          data={users}
          ref={dangerousTableRef}
        />
      </TableColStyled>
    </FixedHeightRowStyled>
  );
};

export default UserList;
