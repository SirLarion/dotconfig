import React from 'react';
import { FormattedMessage } from 'react-intl';

export const UserActionDescriptions = {
  autoStart: (
    <FormattedMessage
      id="app.admin.action.autoStartUser.description"
      defaultMessage="The user will receive a welcome package from Hoxhunt via email and the training will begin."
      description="Desription for auto start user action"
    />
  ),
  autoStartResume: (
    <FormattedMessage
      id="app.admin.action.autoStartUser.resume.description"
      defaultMessage="The user's training will resume."
      description="Desription for auto start user action when resuming training"
    />
  ),
  softDelete: (
    <FormattedMessage
      id="app.admin.action.softDeleteUser.description.part1"
      defaultMessage="Removed user will have their account and data permanently deleted after 90 days."
      description="Description for soft delete user action"
    />
  ),
  softDeleteScimEnabled: (
    <FormattedMessage
      id="app.admin.action.softDeleteUser.description.infoblock.scim"
      defaultMessage="Note: SCIM provisioned users cannot be manually removed."
      description="Additional description for soft delete user action for organization that have SCIM provisioning enabled"
    />
  ),
  exportCsv: (
    <FormattedMessage
      id="app.admin.action.exportCsv.description"
      defaultMessage="Choose which columns to export."
      description="Description for soft delete user action"
    />
  ),
  exportCsvNoteLarge: (
    <FormattedMessage
      id="app.admin.action.exportCsv.description.noteLarge"
      defaultMessage="NOTE: You are exporting a large amount of users' data. Processing the file may take long so we will send you an email containing a link to download it."
      description="A disclaimer for the user that the amount of exported users' data is large and they will be sent a link to download it by email instead of directly downloading."
    />
  ),
  invite: {
    description: (
      <FormattedMessage
        id="app.admin.action.inviteUserToTraining.description.part1"
        defaultMessage="Invite user to training by sending them an invitation email. {boldText}"
        description="Description for invite to training user action"
        values={{
          boldText: (
            <span style={{ fontWeight: 600 }}>
              <FormattedMessage
                id="app.admin.action.inviteUserToTraining.description.part2"
                defaultMessage="User will not receive other simulations until they have reported the invitation email."
                description="Description for invite to training user action"
              />
            </span>
          ),
        }}
      />
    ),
    tip: (
      <FormattedMessage
        id="app.admin.action.inviteUserToTraining.tip"
        defaultMessage='To ensure higher onboarding rates, we suggest to use "Start training" action instead.'
        description="Text for invite user action tip"
      />
    ),
  },
  undoSoftDelete: (
    <FormattedMessage
      id="app.admin.action.undoSoftDeleteUser.description"
      defaultMessage="Undoing removal cancels the removal process and reinstates the user to the training."
      description="Description for undo soft delete user action"
    />
  ),
};
