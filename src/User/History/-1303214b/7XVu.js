import { defineMessages } from 'react-intl';

export const Intl = defineMessages({
  editSuccess: {
    id: 'app.notification.organization.editSuccess',
    defaultMessage: 'Organization updated successfully!',
    description: 'Notification for orgnization edit success',
  },
  editFailure: {
    id: 'app.notification.error.organization.edit',
    defaultMessage: 'Oops! Something went wrong when updating',
    description: 'Notification for organization edit failure',
  },
  actionSave: {
    id: 'app.form.actions.save',
    defaultMessage: 'Save',
    description: 'Text for Save button',
  },
  actionAdd: {
    id: 'app.form.add',
    defaultMessage: 'Add',
    description: 'Button for adding a field',
  },
  actionRemove: {
    id: 'app.form.remove',
    defaultMessage: 'Remove',
    description: 'Button for removing a value in a form',
  },
  actionCreate: {
    id: 'app.action.create',
    defaultMessage: 'Create',
    description:
      'A label for a Button that will result in creation of something new',
  },
  actionCancel: {
    id: 'app.action.cancel',
    defaultMessage: 'Cancel',
    description: 'A label for a Button that cancels the current action',
  },
  validationIsRequired: {
    id: 'app.form.validation.required',
    defaultMessage: 'Required',
    description: 'Error message for required text field',
  },
  anonymousUserName: {
    id: 'app.user.anonymousUserName',
    defaultMessage: 'Anonymous',
    description:
      'A name given to a user who wishes to be anonymous (in leaderboards etc.)',
  },
  tokenLoginFailed: {
    id: 'app.notification.error.tokenLogin',
    defaultMessage: 'Token based login failed, please try again.',
    description: 'Notification for token based login failure',
  },
  questFailingFailed: {
    id: 'app.notification.error.failQuest',
    defaultMessage:
      'Error in the bank for benefit of player: Failure of Quest Failed!',
    description: 'Playful notification for when failing quest fails',
  },
  oops: {
    id: 'app.general.oops',
    defaultMessage: 'Oops!',
    description:
      'Something unexpected just happened, this is a title on a page explaining what happened',
  },
  wellDone: {
    id: 'app.general.wellDone',
    defaultMessage: 'Well done!',
    description:
      'The user has just done something epic that worth congratulating',
  },
  scheduling: {
    id: 'app.general.scheduling',
    defaultMessage: 'Scheduling',
    description: 'The system is scheduling some operations',
  },
  promoteToUnstartedUsers: {
    id: 'app.organizations.list.promoteToUnstartedUsers.scheduled',
    defaultMessage: 'Sending out promotion emails',
    description:
      'A notification shown when background scheduling of promotion emails is completed',
  },
  formLabelName: {
    id: 'app.form.label.name',
    defaultMessage: 'Name',
    description:
      'A label for a form text field that can be used to edit a name',
  },
  domain: {
    id: 'app.form.domainLabel',
    defaultMessage: 'Domain',
    description: 'Domain input label',
  },
  createdAt: {
    id: 'app.general.createdAt',
    defaultMessage: 'Created at',
    description:
      'A timestamp for when an object has been created in the system',
  },
});
