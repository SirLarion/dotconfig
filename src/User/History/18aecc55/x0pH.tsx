import React from 'react';
import { gql } from '@apollo/client';
import { FormattedMessage } from 'react-intl';
import { UserListDocument } from '../__generated__/UserListQuery.generated';

const createNominateAsRoleConfirmationMessage = role => (
  <FormattedMessage
    id="app.admin.addRole.confirm"
    defaultMessage="Are you sure you want nominate selected users to {role}?"
    description="Confirmation message for the nominate users to role button"
    values={{ role }}
  />
);

const addRoleForUsers = role => {
  switch (role) {
    case 'admin':
      return UserListAddAdminRoleDocument;
    case 'super-admin':
      return UserListAddSuperAdminRoleDocument;
    case 'soc-operator':
      return UserListAddSOCRoleDocument;
    default:
      throw new Error(`No role: '${role}' defined`);
  }
};

export const commands = [
  {
    id: 'game.toggleActive',
    isDangerous: true,
    superAdminOnly: true,
    mutation: UserListToggleActiveDocument,
    message: (
      <FormattedMessage
        id="app.admin.toggleActive.confirm"
        defaultMessage="Are you sure you want to toggle selected users to be active? Please note that actions for 50 or more users will be created as tasks and will not complete immediately."
        description="Confirmation message for toggling the selected users to be active"
      />
    ),
    primaryText: (
      <FormattedMessage
        id="app.admin.toggleActive"
        defaultMessage="Toggle Active"
        description="label for Admin Toggle Active Button"
      />
    ),
  },
  {
    id: 'user.toggleGameMode',
    isDangerous: true,
    mutation: UserListToggleGameModeDocument,
    message: (
      <FormattedMessage
        id="app.admin.toggleGameMode.confirm"
        defaultMessage="Are you sure you want to toggle the game mode for the selected users? Please note that actions for 50 or more users will be created as tasks and will not complete immediately."
        description="Confirmation message for toggling the game mode for the selected users"
      />
    ),
    primaryText: (
      <FormattedMessage
        id="app.admin.toggleGameMode"
        defaultMessage="Toggle Game mode"
        description="label for a button that toggles the game mode of a user"
      />
    ),
  },
  {
    id: 'invite.inviteUser',
    mutation: gql`
      mutation UserListInviteUserCommand(
        $organizationId: ID!
        $selectedUserIds: [ID!]!
      ) {
        inviteUsers(
          organizationId: $organizationId
          filter: { _id_in: $selectedUserIds }
        ) {
          result {
            _id
            status
          }
          taskGroup {
            _id
            estimatedTotalTaskCount
          }
        }
      }
    `,
    isDangerous: true,
    confirmText: 'SEND_INVITATION',
    message: (
      <FormattedMessage
        id="app.admin.invite.confirm"
        defaultMessage="Are you sure you want to invite the selected users? Please note that actions for 50 or more users will be created as tasks and will not complete immediately."
        description="Confirmation message for inviting the selected users to the game"
      />
    ),
    primaryText: (
      <FormattedMessage
        id="app.admin.inviteUser"
        defaultMessage="Invite user"
        description="label for a button that invites user"
      />
    ),
  },
  {
    id: 'user.enroll',
    isDangerous: true,
    superAdminOnly: true,
    mutation: gql`
      mutation UserListAutomaticStartCommand(
        $organizationId: ID!
        $selectedUserIds: [ID!]!
      ) {
        automaticStart(
          organizationId: $organizationId
          filter: { _id_in: $selectedUserIds }
        ) {
          result {
            _id
            status
            game {
              active
              mode
            }
          }
          taskGroup {
            _id
            estimatedTotalTaskCount
          }
        }
      }
    `,
    message: (
      <FormattedMessage
        id="app.admin.automaticallyStart.confirm"
        defaultMessage="Are you sure you want to automatically start the game for the selected users? Please note that actions for 50 or more users will be created as tasks and will not complete immediately."
        description="Confirmation message for automatically starting the game for the selected users"
      />
    ),
    primaryText: (
      <FormattedMessage
        id="app.admin.automaticallyStart"
        defaultMessage="Automatically start"
        description="Label for the automatically start button"
      />
    ),
  },
  {
    id: 'user.revokeAdditionalRoles',
    mutation: UserListResetUserRolesDocument,
    isDangerous: true,
    superAdminOnly: true,
    message: (
      <FormattedMessage
        id="app.admin.revokeAdditionalRoles.confirm"
        defaultMessage="Are you sure you want revoke additional roles from the selected users? Please note that actions for 50 or more users will be created as tasks and will not complete immediately."
        description="Confirmation message for revoking additional roles from selected users"
      />
    ),
    primaryText: (
      <FormattedMessage
        id="app.admin.revokeAdditionalRolesButton"
        defaultMessage="Revoke additional roles"
        description="Label for command that revokes all additional roles from selected users"
      />
    ),
  },
  {
    id: 'user.nominateAsAdmin',
    mutation: addRoleForUsers('admin'),
    isDangerous: true,
    superAdminOnly: true,
    message: createNominateAsRoleConfirmationMessage('Admin'),
    primaryText: (
      <FormattedMessage
        id="app.admin.nominateToAdmin"
        defaultMessage="Nominate to Admin"
        description="label for Admin Nominate to Admin Button"
      />
    ),
  },
  {
    id: 'user.nominateAsSOCOperator',
    mutation: addRoleForUsers('soc-operator'),
    isDangerous: true,
    superAdminOnly: true,
    message: createNominateAsRoleConfirmationMessage('SOC Operator'),
    primaryText: (
      <FormattedMessage
        id="app.admin.nominateAsSOCOperator"
        defaultMessage="Nominate to SOC operator"
        description="Label for command that nominates a user as a Security Operations Center operator"
      />
    ),
  },
  {
    id: 'user.nominateAsSuperAdmin',
    mutation: addRoleForUsers('super-admin'),
    isDangerous: true,
    superAdminOnly: true,
    message: createNominateAsRoleConfirmationMessage('Super Admin'),
    primaryText: (
      <FormattedMessage
        id="app.admin.nominateToSuperAdmin"
        defaultMessage="Nominate to Super-Admin"
        description="label for Admin Nominate to Super-Admin Button"
      />
    ),
  },
  {
    id: 'user.delete',
    mutation: gql`
      mutation UserListDeleteUsersCommand(
        $organizationId: ID!
        $selectedUserIds: [ID!]!
      ) {
        deleteUsers(
          organizationId: $organizationId
          filter: { _id_in: $selectedUserIds }
        ) {
          result {
            _id
          }
          taskGroup {
            _id
            estimatedTotalTaskCount
          }
        }
      }
    `,
    afterMutationUpdate:
      queryVariables =>
      (proxy, { data: { deleteUsers } }) => {
        const queryDef = {
          query: UserListDocument,
          variables: queryVariables,
        };
        const data = proxy.readQuery(queryDef);
        if (data.result) {
          data.result.users = data.result.users.filter(
            ({ _id }) => deleteUsers.findIndex(user => user._id === _id) === -1
          );
          proxy.writeQuery({ ...queryDef, data });
        }
      },
    isDangerous: true,
    message: (
      <FormattedMessage
        id="app.admin.deleteUser.confirm"
        defaultMessage="Are you sure you want to delete selected users? Please note that actions for 50 or more users will be created as tasks and will not complete immediately."
        description="Confirmation message for the delete users button"
      />
    ),
    primaryText: (
      <FormattedMessage
        id="app.admin.deleteUser"
        defaultMessage="Delete User"
        description="label for Admin Delete User Button"
      />
    ),
  },
];
