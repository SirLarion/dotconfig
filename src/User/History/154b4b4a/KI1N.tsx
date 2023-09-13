import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { TColumnId, TColumnLayoutId } from '../types';

const layoutName: Record<TColumnLayoutId, ReactNode> = {
  default: (
    <FormattedMessage
      id="app.admin.columnCustomization.layoutName.default"
      defaultMessage="Default"
      description="The name for the default table column layout"
    />
  ),
  performance: (
    <FormattedMessage
      id="app.admin.columnCustomization.layoutName.performance"
      defaultMessage="Performance"
      description="The name for a table column layout which focuses on displaying performance related metrics"
    />
  ),
};

const StyledLayoutNameTag = styled.span`
  text-transform: capitalize;
  font-weight: bold;
`;

export const LayoutTitle: FC<{ layout: TColumnLayoutId }> = ({ layout }) => (
  <FormattedMessage
    id="app.admin.columnCustomization.predefinedLayoutTitle"
    defaultMessage="Columns in the {layout} view"
    description="Title for list displaying which columns are present in a column layout whose name is defined by 'layout'"
    values={{
      layout: (
        <StyledLayoutNameTag>
          {layoutName[layout] || layout}
        </StyledLayoutNameTag>
      ),
    }}
  />
);

export const COLUMN_CUSTOMIZATION_INTL = {
  title: (
    <FormattedMessage
      id="app.admin.columnCustomization.header.title"
      defaultMessage="Column customization"
      description="Title for user table column customization dialog"
    />
  ),
  description: (
    <FormattedMessage
      id="app.admin.columnCustomization.header.description"
      defaultMessage="Select a predefined layout or tailor a custom layout to fit your personal use."
      description="Description for user table column customization dialog"
    />
  ),
  button: {
    useLayout: (
      <FormattedMessage
        id="app.admin.button.useLayout"
        defaultMessage="Use layout"
        description="Text for button that uses the currently selected layout"
      />
    ),
    saveAndUseLayout: (
      <FormattedMessage
        id="app.admin.button.saveAndUse"
        defaultMessage={`Save & use`}
        description="Text for button that saves uses the currently selected layout"
      />
    ),
  },
};

export const CUSTOM_COLUMN_INTL: Record<string, ReactNode> & {
  columnName: Record<TColumnId, ReactNode>;
  tooltip: Record<TColumnId[number], ReactNode>;
} = {
  columnName: {
    nameAndEmail: (
      <FormattedMessage
        id="app.admin.userList.columnName.nameAndEmailAddress"
        defaultMessage="Name and email address"
        description="Text for Name and email address column name in user list header"
      />
    ),
    name: (
      <FormattedMessage
        id="app.admin.userList.columName.name"
        defaultMessage="Name"
        description="Text for 'Name' column in user list header"
      />
    ),
    email: (
      <FormattedMessage
        id="app.admin.userList.columName.emailAddress"
        defaultMessage="Email address"
        description="Text for 'Email' column in user list header"
      />
    ),
    location: (
      <FormattedMessage
        id="app.admin.userList.columnName.location"
        defaultMessage="Location"
        description="Text for 'Location' column in user list header"
      />
    ),
    city: (
      <FormattedMessage
        id="app.admin.userList.columName.city"
        defaultMessage="City"
        description="Text for 'City' column in user list header"
      />
    ),
    country: (
      <FormattedMessage
        id="app.admin.userList.columName.country"
        defaultMessage="Country"
        description="Text for 'Country' column in user list header"
      />
    ),
    businessUnit: (
      <FormattedMessage
        id="app.admin.userList.columnName.businessUnit"
        defaultMessage="Business unit"
        description="Text for 'Business unit' column in user list header"
      />
    ),
    department: (
      <FormattedMessage
        id="app.admin.userList.columnName.department"
        defaultMessage="Department"
        description="Text for 'Department' column in user list header"
      />
    ),
    site: (
      <FormattedMessage
        id="app.admin.userList.columnName.site"
        defaultMessage="Site"
        description="Text for 'Site' column in user list header"
      />
    ),
    stars: (
      <FormattedMessage
        id="app.admin.userList.columnName.starCount"
        defaultMessage="Stars"
        description="Text for 'Stars' column in user list header"
      />
    ),
    failRate: (
      <FormattedMessage
        id="app.admin.userList.columnName.failureRate"
        defaultMessage="Fail rate"
        description="Text for User info column name in user list header"
      />
    ),
    missRate: (
      <FormattedMessage
        id="app.admin.userList.columnName.missRate"
        defaultMessage="Miss rate"
        description="Text for 'Miss rate' column in user list header"
      />
    ),
    successRate: (
      <FormattedMessage
        id="app.admin.userList.columnName.successRate2"
        defaultMessage="Success rate"
        description="Text for 'Success rate' column in user list header"
      />
    ),
    last10Quests: (
      <FormattedMessage
        id="app.admin.userList.columnName.last10QuestsGraph"
        defaultMessage="Performance graph"
        description="Text for Performance column name in user list header. Column visualizes user's performance for last 10 quests"
      />
    ),
    anonymity: (
      <FormattedMessage
        id="app.admin.userList.columnName.anonymity"
        defaultMessage="Anonymity"
        description="Text for 'Anonymity' column in user list header"
      />
    ),
    spicyMode: (
      <FormattedMessage
        id="app.admin.userList.columnName.spicyMode"
        defaultMessage="Spicy Mode"
        description="Text for 'Spicy Mode' column in user list header"
      />
    ),
    trainingLang: (
      <FormattedMessage
        id="app.admin.userList.columnName.trainingLang"
        defaultMessage="Training language"
        description="Text for 'Training language' column in user list header"
      />
    ),
    uiLang: (
      <FormattedMessage
        id="app.admin.userList.columnName.uiLang"
        defaultMessage="Interface language"
        description="Text for 'Interface language' column in user list header"
      />
    ),
    scimProvisioned: (
      <FormattedMessage
        id="app.admin.userList.columnName.scimProvisioned"
        defaultMessage="SCIM provisioned"
        description="Text for 'SCIM provisioned' column in user list header"
      />
    ),
    trainingStatus: (
      <FormattedMessage
        id="app.admin.columnCustomization.columnName.trainingStatus"
        defaultMessage="Training status"
        description="Text for 'Training status' column in user list header"
      />
    ),
  },
  tooltip: {
    nameAndEmailAddress: (
      <FormattedMessage
        id="app.admin.columnCustomization.tooltip.nameAndEmailAddress"
        defaultMessage="Includes both name and email address."
        description="Tooltip text for 'Name and email address' column describing that it contains name and email address"
      />
    ),
    location: (
      <FormattedMessage
        id="app.admin.columnCustomization.tooltip.location"
        defaultMessage="Includes both city and country."
        description="Tooltip text for 'Location' column describing that it contains a city and a country"
      />
    ),
    businessUnit: (
      <FormattedMessage
        id="app.admin.columnCustomization.tooltip.businessUnit"
        defaultMessage="Includes both site and department."
        description="Tooltip text for 'Business unit' column describing that it contains a site and a department"
      />
    ),
    anonymity: (
      <FormattedMessage
        id="app.admin.columnCustomization.tooltip.anonymity"
        defaultMessage="Is the user's name used in the company leaderboards and co-worker emails."
        description="Tooltip text for 'Anonymity' column describing what the effect of its value is."
      />
    ),

    spicyMode: (
      <FormattedMessage
        id="app.admin.columnCustomization.tooltip.spicyMode"
        defaultMessage="Is the user participating in Spicy Mode."
        description="Tooltip text for 'Spicy Mode' column describing what the effect of its value is."
      />
    ),
    trainingLang: (
      <FormattedMessage
        id="app.admin.columnCustomization.tooltip.trainingLang"
        defaultMessage="The language(s) the user can receive Hoxhunt emails in."
        description="Tooltip text for 'Training language' column describing that it shows the languages of Hoxhunt emails received by the user."
      />
    ),
    uiLang: (
      <FormattedMessage
        id="app.admin.columnCustomization.tooltip.uiLang"
        defaultMessage="The user interface language for the user."
        description="Tooltip text for 'Interface language' column describing that it shows which language the user uses the Hoxhunt product in."
      />
    ),
    last10Quests: (
      <FormattedMessage
        id="app.admin.columnCustomization.tooltip.last10QuestsGraph"
        defaultMessage="The results of user's last 10 quests"
        description="Tooltip text for 'Performance graph' column describing that it visualizes user's performance from last 10 quests."
      />
    ),
    scimProvisioned: (
      <FormattedMessage
        id="app.admin.columnCustomization.tooltip.scimProvisioned"
        defaultMessage="Last time the user was provisioned by SCIM. '-' if the user is not provisioned by SCIM."
        description="Tooltip text for 'SCIM provisioned' column describing that it shows the last time user was provisioned by SCIM"
      />
    ),
  },
  layoutName,
  otherAvailableColumns: (
    <FormattedMessage
      id="app.admin.columnCustomization.otherAvailableColumns"
      defaultMessage="Other available columns"
      description="Title for list displaying which columns are not present in the currently selected column layout but are available generally."
    />
  ),
};
