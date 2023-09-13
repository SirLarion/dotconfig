import React from 'react';
import { FormattedMessage } from 'react-intl';

export const USER_MANAGEMENT_INTL = {
  pageTitle: (
    <FormattedMessage
      id="app.admin.userManagement.pageTitle"
      defaultMessage="User Management"
      description="Page title text for User Management page"
    />
  ),
  userImportLinkButton: (
    <FormattedMessage
      id="app.admin.userManagement.userImportLinkButton"
      defaultMessage="Add users"
      description="Text for link button that takes the user to User Import page"
    />
  ),
  searchPlaceholder: {
    id: 'app.admin.userManagement.userList.searchPlaceholder',
    defaultMessage: 'Search with name or email',
    description: 'Placeholder text for search bar when it is empty',
  },
  filter: {
    allUsers: (
      <FormattedMessage
        id="app.admin.userManagement.filter.allUsers"
        defaultMessage="All users"
        description="Label for a filter which removes all filters and displays all users in user list"
      />
    ),
    onboarded: (
      <FormattedMessage
        id="app.admin.userManagement.filter.onboarded"
        defaultMessage="Onboarded"
        description="Label for a filter which filters onboarded users in user list"
      />
    ),
    notOnboarded: (
      <FormattedMessage
        id="app.admin.userManagement.filter.notOnboarded"
        defaultMessage="Not onboarded"
        description="Label for a filter which filters not onboarded users in user list"
      />
    ),
    reportOnly: (
      <FormattedMessage
        id="app.admin.userManagement.filter.reportOnly"
        defaultMessage="Report only"
        description="Label for a filter which filters users that cannot join training in user list"
      />
    ),
    removed: (
      <FormattedMessage
        id="app.admin.userManagement.filter.removed"
        defaultMessage="Pending removal"
        description="Label for a filter which filters users are removed and pending deletion in user list"
      />
    ),
    dropdownFilters: {
      role: {
        id: 'app.admin.userManagement.filter.dropdown.role',
        defaultMessage: 'Role',
        description:
          'Label for a dropdown that lists possible user roles to filter the list with',
      },
      country: {
        id: 'app.admin.userManagement.filter.dropdown.country',
        defaultMessage: 'Country',
        description:
          'Label for a dropdown that lists possible countries to filter the list with',
      },
      site: {
        id: 'app.admin.userManagement.filter.dropdown.site',
        defaultMessage: 'Site',
        description:
          'Label for a dropdown that lists possible sites (as in a site where the worker is working at) to filter the list with',
      },
      city: {
        id: 'app.admin.userManagement.filter.dropdown.city',
        defaultMessage: 'City',
        description:
          'Label for a dropdown that lists possible cities to filter the list with',
      },
      department: {
        id: 'app.admin.userManagement.filter.dropdown.department',
        defaultMessage: 'Department',
        description:
          'Label for a dropdown that lists possible departments to filter the list with',
      },
      trainingStatus: {
        id: 'app.admin.userManagement.filter.dropdown.trainingStatus',
        defaultMessage: 'Training status',
        description:
          'Label for a dropdown that allows user to filter by training active status',
      },
      scimProvision: {
        id: 'app.admin.userManagement.filter.dropdown.scimProvision',
        defaultMessage: 'SCIM provisioning',
        description:
          'Label for a dropdown that allows user to filter by scim provisioning status',
      },
    },
  },
};
