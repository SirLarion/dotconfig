import React from 'react';
import PropTypes from '../../utils/propTypes';
import { Row, Col } from 'react-flexbox-grid';
import { FormattedMessage } from 'react-intl';
import { Check } from '../../components/Check/';
import { SmartTable } from '../../components/SmartTable';
import { CreateOrganizationButton } from './components/CreateOrganizationButton';
import { OnlySuperAdmin } from '../../components/OnlySuperAdmin/OnlySuperAdmin';

const getRowColumnActions = ({
  deleteOrganization,
  goToOrganizationUpdate,
  inviteUnstartedUsers,
  startGameForUsers,
  inviteOrgToOnboard,
}) => [
  org => ({
    id: 'updateOrganization',
    primaryText: (
      <FormattedMessage
        id="app.admin.updateOrganization"
        defaultMessage="Update Organization"
        description="label for Update Organization Button"
      />
    ),
    onClick: () => goToOrganizationUpdate(org._id),
  }),
  org => ({
    id: 'deleteOrganization',
    primaryText: (
      <FormattedMessage
        id="app.admin.deleteOrganization"
        defaultMessage="Delete Organization"
        description="label for Delete Organization Button"
      />
    ),
    onClick: () => deleteOrganization(org._id),
    isDangerous: true,
    message: (
      <FormattedMessage
        id="app.admin.deleteOrganization.confirm"
        defaultMessage="Are you sure you want to delete {organizationName}?"
        values={{
          organizationName: org.name,
        }}
        description="Confirmation message for Delete Organization Button"
      />
    ),
  }),
  org => ({
    id: 'inviteUnstartedUsers',
    primaryText: (
      <FormattedMessage
        id="app.admin.inviteUnstartedUsers"
        defaultMessage="Invite unstarted users ({unstartedUsers})"
        description="label for Invite unstarted users Button"
        values={{
          unstartedUsers: `${org.userCount - org.onboardedCount}`,
        }}
      />
    ),
    onClick: () => inviteUnstartedUsers(org._id),
    disabled: org.userCount - org.onboardedCount === 0,
    isDangerous: true,
    message: (
      <FormattedMessage
        id="app.admin.inviteUnstartedUsers.confirm"
        defaultMessage="Are you sure you want to invite {unstartedUserCount} unstarted users in {organizationName}?"
        values={{
          unstartedUserCount: org.userCount - org.onboardedCount,
          organizationName: org.name,
        }}
        description="Confirmation message for Invite unstarted users Button"
      />
    ),
  }),
  org => ({
    id: 'startGameForUnstartedUsers',
    primaryText: (
      <FormattedMessage
        id="app.admin.automaticallyStartGameForUnstartedUsers"
        defaultMessage="Automatically start unstarted users ({unstartedUserCount})"
        description="label for Automatically start game for unstarted Users Button"
        values={{
          unstartedUserCount: `${org.userCount - org.onboardedCount}`,
          organizationName: org.name,
        }}
      />
    ),
    onClick: () => startGameForUsers(org._id),
    disabled: org.userCount - org.onboardedCount === 0,
    isDangerous: true,
    message: (
      <FormattedMessage
        id="app.admin.startGameForUnstartedUsers.confirm"
        defaultMessage="Are you sure you want to start the game for {unstartedUserCount} unstarted users in {organizationName}?"
        values={{
          unstartedUserCount: `${org.userCount - org.onboardedCount}`,
          organizationName: org.name,
        }}
        description="Confirmation message for Start game for unstarted users Button"
      />
    ),
  }),
  org => ({
    id: 'inviteOrgToOnboard',
    primaryText: (
      <FormattedMessage
        id="app.admin.inviteOrgToOnboard"
        defaultMessage="Invite {organizationName} to start self-service onboarding"
        description="Label for action to start self-service onboarding for an organization"
        values={{
          organizationName: org.name,
        }}
      />
    ),
    onClick: () => inviteOrgToOnboard(org._id),
    disabled: !!org.onboardingStartedAt,
    isDangerous: true,
    message: (
      <FormattedMessage
        id="app.admin.inviteOrgToOnboard.confirm"
        defaultMessage="Are you sure you want to start self-service onboarding for organization: {organizationName}?"
        values={{
          organizationName: org.name,
        }}
        description="Confirmation message for starting self-service onboarding for an organization"
      />
    ),
  }),
];

const PROP_TYPES = {
  organizations: PropTypes.array.isRequired,
  isSuperAdmin: PropTypes.bool.isRequired,
  ui: PropTypes.object.isRequired,
  deleteOrganization: PropTypes.func.isRequired,
  goToOrganizationUpdate: PropTypes.func.isRequired,
  inviteUnstartedUsers: PropTypes.func.isRequired,
  startGameForUsers: PropTypes.func.isRequired,
  inviteOrgToOnboard: PropTypes.func.isRequired,
};

const headers = [
  {
    alias: 'id',
    dataAlias: '_id',
    superAdminOnly: true,
  },
  {
    alias: 'Name',
    dataAlias: 'name',
  },
  {
    alias: 'Users',
    dataAlias: 'userCount',
  },
  {
    alias: 'Active users (yes/no)',
    dataAlias: 'gameActive',
  },
  {
    alias: 'Not onboarded',
    dataAlias: 'unstartedCount',
  },
  {
    alias: 'Game active',
    dataAlias: 'isActive',
  },
];

const renderRowColumnItem = (org, dataAlias) => {
  switch (dataAlias) {
    case 'gameActive':
      return `${org.gameActiveCount} / ${org.userCount - org.gameActiveCount}`;
    case 'isActive':
      return <Check checked={org.game.active} />;
    case 'unstartedCount':
      return org.userCount - org.onboardedCount;
    default:
      return org[dataAlias];
  }
};
const OrganizationList = props => {
  const { organizations, isSuperAdmin, ui, ...actionHandlers } = props;

  const superAdminActions = getRowColumnActions(actionHandlers);

  const tableHeaders = React.useMemo(
    () => headers.filter(header => isSuperAdmin || !header.superAdminOnly),
    [headers, isSuperAdmin]
  );

  return (
    <Row>
      <Col xs={12}>
        <OnlySuperAdmin>
          <CreateOrganizationButton />
        </OnlySuperAdmin>
        <SmartTable
          selectable={false}
          renderRowColumnItem={renderRowColumnItem}
          total={organizations.length}
          limit={Infinity}
          offset={0}
          tableHeaders={tableHeaders}
          data={organizations}
          rowColumnActions={isSuperAdmin ? superAdminActions : null}
        />
      </Col>
    </Row>
  );
};

OrganizationList.propTypes = PROP_TYPES;

export default OrganizationList;
