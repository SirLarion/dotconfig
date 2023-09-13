import React from 'react';
import { FormattedMessage } from 'react-intl';

import { UserActionDescriptions } from './actions/intl';

export const USER_ACTION_INTL = {
  actionMenuButtonText: (
    <FormattedMessage
      id="app.admin.userAction.actionMenuButton.text"
      defaultMessage="Actions"
      description="Text for button that will open menu that lists executable user actions"
    />
  ),
  actionMenuDisabledTooltipText: (
    <FormattedMessage
      id="app.admin.userAction.actionMenuButton.disabled.tooltip.text"
      defaultMessage="You need to select at least one user"
      description="Text for a tooltip that shows when the action menu button is disabled and user hovering over the button"
    />
  ),
  genericErrorMessage: (
    <FormattedMessage
      id="app.admin.userAction.genericError.message"
      defaultMessage="User action failed. Please try again."
      description="Generic error message for user actions"
    />
  ),
  automaticStart: {
    displayName: (
      <FormattedMessage
        id="app.admin.userAction.displayName.automaticStart"
        defaultMessage="Start training"
        description="Display name for automatic start user action"
      />
    ),
    // eslint-disable-next-line react/display-name
    title: (taskCount: number) => (
      <FormattedMessage
        id="app.admin.userAction.confirm.title.automaticStart"
        defaultMessage="Start training for {taskCount, plural, =1{1 user} other{# users}}"
        description="Title for for automatically start training for users action confirmation view"
        values={{
          taskCount,
        }}
      />
    ),
    description: UserActionDescriptions.autoStart,
  },
  invite: {
    displayName: (
      <FormattedMessage
        id="app.admin.userAction.displayName.invite"
        defaultMessage="Invite to training"
        description="Display name for invite users to training user action"
      />
    ),
    // eslint-disable-next-line react/display-name
    title: (taskCount: number) => (
      <FormattedMessage
        id="app.admin.userAction.confirm.title.invite"
        defaultMessage="Invite {taskCount, plural, =1{1 user} other{# users}} to training"
        description="Title for invite users to training action confirmation view"
        values={{
          taskCount,
        }}
      />
    ),
    description: UserActionDescriptions.invite.description,
    tip: UserActionDescriptions.invite.tip,
  },
  reactivate: {
    displayName: (
      <FormattedMessage
        id="app.admin.userAction.displayName.undoSoftDelete"
        defaultMessage="Undo removal"
        description="Display name for reactivate users user action"
      />
    ),
    // eslint-disable-next-line react/display-name
    title: (taskCount: number) => (
      <FormattedMessage
        id="app.admin.userAction.confirm.title.reactivate"
        defaultMessage="Undo removal for {taskCount, plural, =1{1 user} other{# users}}?"
        description="Title for reactivate users action confirmation view"
        values={{
          taskCount,
        }}
      />
    ),
    description: UserActionDescriptions.undoSoftDelete,
  },
  softDelete: {
    displayName: (
      <FormattedMessage
        id="app.admin.userAction.displayName.softDelete"
        defaultMessage="Delete"
        description="Display name for delete users user action"
      />
    ),
    // eslint-disable-next-line react/display-name
    title: (taskCount: number) => (
      <FormattedMessage
        id="app.admin.userAction.confirm.title.softDelete"
        defaultMessage="Remove {taskCount, plural, =1{1 user} other{# users}}"
        description="Title for soft delete user action confirmation view"
        values={{
          taskCount,
        }}
      />
    ),
    description: UserActionDescriptions.softDelete,
    descriptionOrgScimEnabled: UserActionDescriptions.softDeleteScimEnabled,
  },
  exportCsv: {
    displayName: (
      <FormattedMessage
        id="app.admin.userAction.displayName.exportCsv"
        defaultMessage="Export as CSV"
        description="Display name for the action to export selected users' data as a CSV file"
      />
    ),
    title: (userCount: number) => (
      <FormattedMessage
        id="app.admin.userAction.confirm.title.exportCsv"
        defaultMessage="Export {userCount, plural, ={1 user} other{# users}} as CSV"
        description="Title for confirming exporting user data as a CSV"
        values={{ userCount }}
      />
    ),
    description: UserActionDescriptions.exportCsv,
    noteLarge: UserActionDescriptions.exportCsvNoteLarge,
  },
  setProperties: {
    displayName: (
      <FormattedMessage
        id="app.admin.userAction.displayName.setProperties"
        defaultMessage="Set properties"
        description="Display name for set user properties action"
      />
    ),
  },
};
