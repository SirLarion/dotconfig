/* eslint-disable react/display-name */

import React from 'react';
import { formatRelative } from 'date-fns';

import { Star } from '@hox/ui/Star';

import { UserTrainingStatusTag } from '../../../../components/UserTrainingStatusTag';
import { SWITCH_INTL } from '../../../../intl/generic';
import { toPercentage } from '../../../../utils/toPercentage';
import { TColumnConfig, TColumnId } from '../../types';
import { ColumnCell } from '../components/cells';
import { CUSTOM_COLUMN_INTL as INTL } from '../intl';

export const MAX_COLUMN_COUNT = 6;

/*
 * When creating a new column for the UserList table,
 * both frontend and backend functionality must be implemented

 * FRONTEND:
 *  1. Add its ID to AVAILABLE_COLUMN_IDS
 *  2. Add its specification to AVAILABLE_COLUMNS
 *  3. Create INTL for it in UserList/intl
 * (4.) If the column is sortable, see UserManagement/hooks/useUserListSort
 * (5.) If the column is a composite column (i.e. nameAndEmail), see 
 *      components/UserActions/components/ExportUserCSV/lib.ts
 
 * BACKEND: (domains.admin.userManagement.createUserListCSVFile)
 *  1. Add its ID to USER_DATA_COLUMNS in createUserListCSVFile.models.ts
 *  2. Add its specification to USER_DATA_TRANSFORMS in createUserListCSVFile.lib.ts
 
 */
export const AVAILABLE_COLUMN_IDS = [
  'nameAndEmail',
  'name',
  'email',
  'location',
  'city',
  'country',
  'businessUnit',
  'department',
  'site',
  'stars',
  'failRate',
  'missRate',
  'successRate',
  'last10Quests',
  'isAnonymous',
  'spicyMode',
  'questLanguages',
  'language',
  'scimProvisioned',
  'trainingStatus',
] as const;

export const AVAILABLE_COLUMNS: Record<TColumnId, TColumnConfig> = {
  nameAndEmail: {
    id: 'nameAndEmail',
    label: INTL.columnName.nameAndEmail,
    minWidth: '16%',
    maxWidth: '1fr',
    node: ({ user }) => (
      <ColumnCell.UserInfo>
        <ColumnCell.Text>
          <ColumnCell.TextStrong>
            {user.profile.firstName} {user.profile.lastName}
          </ColumnCell.TextStrong>
        </ColumnCell.Text>
        <ColumnCell.Text dimmed>{user.emails[0].address}</ColumnCell.Text>
      </ColumnCell.UserInfo>
    ),
    comboField: ['name', 'email'],
    tooltip: INTL.tooltip.nameAndEmailAddress,
  },
  name: {
    id: 'name',
    label: INTL.columnName.name,
    minWidth: '16%',
    maxWidth: '1fr',
    node: ({ user }) => (
      <ColumnCell.UserInfo>
        <ColumnCell.Text>
          {user.profile.firstName} {user.profile.lastName}
        </ColumnCell.Text>
      </ColumnCell.UserInfo>
    ),
  },
  email: {
    id: 'email',
    label: INTL.columnName.email,
    minWidth: '16%',
    maxWidth: '1fr',
    node: ({ user }) => (
      <ColumnCell.Text>{user.emails[0].address}</ColumnCell.Text>
    ),
  },
  location: {
    id: 'location',
    label: INTL.columnName.location,
    minWidth: '12%',
    maxWidth: '0.75fr',
    node: ({ user }) => (
      <ColumnCell.DoubleLine>
        <ColumnCell.Text>{user.profile.city ?? '-'}</ColumnCell.Text>
        <ColumnCell.Text dimmed>{user.profile.country ?? '-'}</ColumnCell.Text>
      </ColumnCell.DoubleLine>
    ),
    comboField: ['city', 'country'],
    tooltip: INTL.tooltip.location,
  },
  city: {
    id: 'city',
    label: INTL.columnName.city,
    minWidth: '12%',
    maxWidth: '0.75fr',
    sortable: true,
    node: ({ user }) => (
      <ColumnCell.Text>{user.profile.city ?? '-'}</ColumnCell.Text>
    ),
  },
  country: {
    id: 'country',
    label: INTL.columnName.country,
    minWidth: '12%',
    maxWidth: '0.75fr',
    sortable: true,
    node: ({ user }) => (
      <ColumnCell.Text>{user.profile.country ?? '-'}</ColumnCell.Text>
    ),
  },
  businessUnit: {
    id: 'businessUnit',
    label: INTL.columnName.businessUnit,
    minWidth: '12%',
    maxWidth: '0.75fr',
    node: ({ user }) => (
      <ColumnCell.DoubleLine>
        <ColumnCell.Text>{user.profile.department ?? '-'}</ColumnCell.Text>
        <ColumnCell.Text dimmed>{user.profile.site ?? '-'}</ColumnCell.Text>
      </ColumnCell.DoubleLine>
    ),
    comboField: ['department', 'site'],
    tooltip: INTL.tooltip.businessUnit,
  },
  department: {
    id: 'department',
    label: INTL.columnName.department,
    minWidth: '12%',
    maxWidth: '0.75fr',
    sortable: true,
    node: ({ user }) => (
      <ColumnCell.Text>{user.profile.department ?? '-'}</ColumnCell.Text>
    ),
  },
  site: {
    id: 'site',
    label: INTL.columnName.site,
    minWidth: '12%',
    maxWidth: '0.75fr',
    sortable: true,
    node: ({ user }) => (
      <ColumnCell.Text>{user.profile.site ?? '-'}</ColumnCell.Text>
    ),
  },
  stars: {
    id: 'stars',
    label: INTL.columnName.stars,
    sortable: true,
    minWidth: '6rem',
    maxWidth: '0.3fr',
    node: ({ user }) => (
      <ColumnCell.Stars>
        <Star />
        <ColumnCell.Text>{user.player.stars}</ColumnCell.Text>
      </ColumnCell.Stars>
    ),
  },
  failRate: {
    id: 'failRate',
    label: INTL.columnName.failRate,
    sortable: true,
    minWidth: '6rem',
    maxWidth: '0.3fr',
    node: ({ user }) => (
      <ColumnCell.Text>
        {`${user.player.stats.failed} (${Math.round(
          100 * user.player.stats.failureRate
        )} %)`}
      </ColumnCell.Text>
    ),
  },
  missRate: {
    id: 'missRate',
    label: INTL.columnName.missRate,
    sortable: true,
    minWidth: '6rem',
    maxWidth: '0.3fr',
    node: ({ user }) => (
      <ColumnCell.Text>
        {`${user.player.stats.missed} (${toPercentage(
          user.player.stats.missed,
          user.player.stats.total
        )} %)`}
      </ColumnCell.Text>
    ),
  },
  successRate: {
    id: 'successRate',
    label: INTL.columnName.successRate,
    sortable: true,
    minWidth: '6rem',
    maxWidth: '0.3fr',
    node: ({ user }) => (
      <ColumnCell.Text>
        {`${user.player.stats.success} (${toPercentage(
          user.player.stats.success,
          user.player.stats.total
        )} %)`}
      </ColumnCell.Text>
    ),
  },
  last10Quests: {
    id: 'last10Quests',
    label: INTL.columnName.last10Quests,
    minWidth: '8rem',
    maxWidth: '0.5fr',
    node: ({ user }) => (
      <ColumnCell.Last10QuestsGraph
        last10Quests={user.player.stats.last10Quests}
      />
    ),
    tooltip: INTL.tooltip.last10Quests,
  },
  isAnonymous: {
    id: 'isAnonymous',
    label: INTL.columnName.isAnonymous,
    minWidth: '6rem',
    maxWidth: '0.3fr',
    sortable: true,
    node: ({ user }) => (
      <ColumnCell.Text>
        {user.profile.isAnonymous ? SWITCH_INTL.on : SWITCH_INTL.off}
      </ColumnCell.Text>
    ),
    tooltip: INTL.tooltip.isAnonymous,
  },
  spicyMode: {
    id: 'spicyMode',
    label: INTL.columnName.spicyMode,
    minWidth: '6rem',
    maxWidth: '0.3fr',
    sortable: true,
    node: ({ user }) => (
      <ColumnCell.Text>
        {user.profile.spicyModeEnabled ? SWITCH_INTL.on : SWITCH_INTL.off}
      </ColumnCell.Text>
    ),
    tooltip: INTL.tooltip.spicyMode,
  },
  questLanguages: {
    id: 'questLanguages',
    label: INTL.columnName.questLanguages,
    minWidth: '8rem',
    maxWidth: '0.3fr',
    node: ({ user }) => {
      const langs = user.profile.locale.quests;

      return (
        <ColumnCell.Text>
          {langs.length > 0 ? langs.join(', ') : '-'}
        </ColumnCell.Text>
      );
    },
    tooltip: INTL.tooltip.questLanguages,
  },
  language: {
    id: 'language',
    label: INTL.columnName.language,
    minWidth: '8rem',
    maxWidth: '0.3fr',
    sortable: true,
    node: ({ user }) => (
      <ColumnCell.Text>{user.profile.locale.ui}</ColumnCell.Text>
    ),
    tooltip: INTL.tooltip.language,
  },
  scimProvisioned: {
    id: 'scimProvisioned',
    label: INTL.columnName.scimProvisioned,
    minWidth: '8rem',
    maxWidth: '0.3fr',
    node: ({ user }) => (
      <ColumnCell.Text>
        {user.scim?.lastProvisionedAt
          ? formatRelative(new Date(user.scim?.lastProvisionedAt), new Date())
          : '-'}
      </ColumnCell.Text>
    ),
    tooltip: INTL.tooltip.scimProvisioned,
    sortable: true,
  },
  trainingStatus: {
    id: 'trainingStatus',
    label: INTL.columnName.trainingStatus,
    minWidth: '8rem',
    maxWidth: '0.5fr',
    node: ({ user }) => (
      <UserTrainingStatusTag
        active={user.game.active}
        deactivationReason={user.game.deactivationReason}
      />
    ),
  },
};

export const DEFAULT_COLUMN_SELECTION: TColumnId[] = [
  'nameAndEmail',
  'location',
  'businessUnit',
  'stars',
  'failRate',
  'last10Quests',
];

export const PERFORMANCE_COLUMN_SELECTION: TColumnId[] = [
  'nameAndEmail',
  'stars',
  'failRate',
  'missRate',
  'successRate',
  'last10Quests',
];

export const PREDEFINED_COLUMN_LAYOUTS: Record<string, TColumnId[]> = {
  default: DEFAULT_COLUMN_SELECTION,
  performance: PERFORMANCE_COLUMN_SELECTION,
};

export const isCustomLayout = (layout: string) =>
  !Object.keys(PREDEFINED_COLUMN_LAYOUTS).includes(layout);

export const DEFAULT_CUSTOM_LAYOUTS: Record<string, TColumnId[]> = {
  'custom 1': [],
  'custom 2': [],
};
