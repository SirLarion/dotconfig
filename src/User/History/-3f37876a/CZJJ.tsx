import React, { useState, useEffect, useMemo } from 'react';

import get from 'lodash/get';

import { SmartTable } from '../../components/SmartTable';

import { FormattedNumber, FormattedMessage } from 'react-intl';
import { Check } from '../../components/Check';

import { Row, Col } from 'react-flexbox-grid';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

import { getUserRole } from './components/RoleCellRenderer';
import { getUserState } from './components/UserStateCellRenderer';
import { LastQuestsChart } from './components/LastQuestsChart';

import { MutationCommandMenu } from '../../components/CommandMenu/MutationCommandMenu';
import { commands } from './components/UserListCommandMenu';
import TextField from '@material-ui/core/TextField';
import { useDebouncedCallback } from '../../hooks/useDebounce';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import Intl, { getClearUserSelectionText } from './intl';
import { IIcuMessage } from '../../models/common';
import { useCurrentUser } from '@hox/frontend-utils/hooks/useCurrentUser';
import { config } from '../../utils/config';
import { Loading } from '../../components/Loading';
import { OrganizationSelector } from '../../components/OrganizationSelector/OrganizationSelectorContainer';
import { useUserListQuery } from './__generated__/UserListQuery.generated';
import { User_sort } from '@hox/frontend-utils/types/graphql.generated';

const UnwrapFormattedMessage = (props: IIcuMessage) => (
  <FormattedMessage {...props}>{msg => <>{msg}</>}</FormattedMessage>
);

const getGraphqlFilterSpecifier = (filter: string) =>
  !filter
    ? undefined
    : {
        OR: [
          { emails__address_starts_with: filter },
          { organizationName_starts_with: filter },
        ],
      };

const getGraphQLSortSpecifier = (sort: {
  sortHeader: string;
  isAsc: boolean;
}) => `${sort.sortHeader.replace(/\./g, '__')}_${sort.isAsc ? 'ASC' : 'DESC'}`;

const renderRowColumnItem = (row, dataAlias) => {
  switch (dataAlias) {
    case 'roles':
      return getUserRole(get(row, dataAlias, []));
    case 'profile.firstName':
      return `${get(row, 'profile.firstName')} ${
        get(row, 'profile.lastName') || ''
      }`;
    case 'player.stats.failureRate':
      return (
        <FormattedNumber
          value={get(row, dataAlias)}
          minimumFractionDigits={0}
          style="percent"
        />
      );
    case 'game.mode':
      return (
        <span style={{ textTransform: 'capitalize' }}>
          {get(row, dataAlias).toLowerCase().replace('_', ' ')}
        </span>
      );
    case 'game.active':
      return <Check checked={get(row, dataAlias)} />;
    case 'player.stats.last10Quests':
      return <LastQuestsChart cellData={get(row, dataAlias)} />;
    case 'status':
      return getUserState(row);
    default:
      return get(row, dataAlias);
  }
};

const tableHeaders = [
  { sortable: false, alias: 'id', dataAlias: '_id', superAdminOnly: true },
  { sortable: false, alias: 'Role', dataAlias: 'roles' },
  { sortable: true, alias: 'Name', dataAlias: 'profile.firstName' },
  { sortable: false, alias: 'Status', dataAlias: 'status' },
  { sortable: true, alias: 'Organization', dataAlias: 'organizationName' },
  {
    sortable: false,
    alias: 'Failure Rate %',
    dataAlias: 'player.stats.failureRate',
  },
  { sortable: true, alias: 'Stars', dataAlias: 'player.stars' },
  {
    sortable: false,
    alias: 'Last Quests',
    dataAlias: 'player.stats.last10Quests',
  },
  { sortable: true, alias: 'Reported', dataAlias: 'player.stats.success' },
  { sortable: true, alias: 'Game mode', dataAlias: 'game.mode' },
  { sortable: true, alias: 'Game Active ?', dataAlias: 'game.active' },
];

const AdminActionsStyled = styled.div`
  display: flex;
`;

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
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const UserList: React.FC = () => {
  const { isSuperAdmin, isAdmin } = useCurrentUser();
  const limit = 50;
  const [skip, setSkip] = useState(0);
  const [sort, setSort] = useState({
    sortHeader: 'profile.firstName',
    isAsc: true,
  });
  const [filter, setFilter] = useState('');
  const [organizationId, setOrganizationId] = useState(null);

  const setSearch = useDebouncedCallback(searchTerm => {
    setFilter(searchTerm);
    setSkip(0);
  }, 600);

  const variables = {
    limit,
    skip,
    organizationId,
    filter: getGraphqlFilterSpecifier(filter),
    sort: getGraphQLSortSpecifier(sort) as User_sort,
  };

  const [selectedUserIds, setSelectedUserIds] = useState([]);

  const mutationVariables = {
    organizationId,
    selectedUserIds,
  };

  const { data, loading } = useUserListQuery({
    variables,
    skip: !isSuperAdmin || !organizationId,
  });

  const users = useMemo(() => get(data, 'organizations.0.users', []), [data]);

  // Clear selected users when list changes
  useEffect(() => {
    setSelectedUserIds([]);
  }, [users]);

  // note(Anssi): because MUI mutates internal state,
  // workaround to manipulate material UI table state is needed.
  // e.g. clearing "selectedUserIds" here is not enough to clear MUI table
  const dangerousTableRef = React.useRef(null);

  const headers = useMemo(
    () => tableHeaders.filter(header => isSuperAdmin || !header.superAdminOnly),
    [tableHeaders, isSuperAdmin]
  );

  useEffect(() => {
    if (isAdmin && !isSuperAdmin) {
      window.location.assign(config.adminPortalHref);
    }
  }, [isSuperAdmin, isAdmin]);

  if (!isSuperAdmin) {
    return <Loading />;
  }

  return (
    <>
      <FixedHeightRowStyled>
        <Col xs={12}>
          <InputLabel>Organization</InputLabel>
          <OrganizationSelector
            onChange={setOrganizationId}
            value={organizationId}
          />
        </Col>
        <TableActionsContainer>
          <Col xs={6}>
            <AdminActionsStyled>
              <MutationCommandMenu
                disabled={selectedUserIds.length === 0}
                commands={commands}
                params={mutationVariables}
                queryVariables={variables}
              />
              <Button
                variant="outlined"
                color="secondary"
                disabled={selectedUserIds.length === 0}
                onClick={() => {
                  setSelectedUserIds([]);
                  if (dangerousTableRef.current) {
                    dangerousTableRef.current.externalClearTableSelection();
                  }
                }}
                style={{ marginLeft: '1rem' }}
              >
                {getClearUserSelectionText(selectedUserIds.length)}
              </Button>
            </AdminActionsStyled>
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
            selectable
            renderRowColumnItem={renderRowColumnItem}
            onRowSelection={setSelectedUserIds}
            selectedIds={selectedUserIds}
            onSort={setSort}
            total={
              users.length === limit
                ? skip + users.length + 1
                : skip + users.length
            }
            limit={limit}
            offset={skip}
            onPageClick={setSkip}
            tableHeaders={headers}
            data={users}
            ref={dangerousTableRef}
          />
        </TableColStyled>
      </FixedHeightRowStyled>
    </>
  );
};

export default UserList;
