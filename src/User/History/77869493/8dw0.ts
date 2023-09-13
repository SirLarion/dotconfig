import { uniq } from 'ramda';

import { USER_DATA_COLUMN } from '@hox/frontend-utils/types/graphql.generated';

import {
  AVAILABLE_COLUMN_IDS,
  AVAILABLE_COLUMNS,
} from '../../../../views/UserManagementBeta/columnCustomization/constants/columns';
import { TColumnId } from '../../../../views/UserManagementBeta/types';

type TExportableUserColumn = `${USER_DATA_COLUMN}`;

// This must be equal to
// resolvers/mutations/userMutation.ts -> MAX_USERS_FOR_FAST_EXPORT
export const MAX_USERS_FOR_FAST_EXPORT = 5000;

// Composite columns should be broken down to their atomic parts for CSV
// exports. Define here which other columns each composite column is made out of.
const COLUMNS_TO_EXPORTABLES: Partial<
  Record<TColumnId, TExportableUserColumn[]>
> = {
  nameAndEmail: ['firstName', 'lastName', 'email'],
  name: ['firstName', 'lastName'],
  businessUnit: ['department', 'site'],
  location: ['city', 'country'],
  last10Quests: [], // Graph, don't export at all
};

export const mapTableColumnsToExportables = (selectedColumns: TColumnId[]) =>
  uniq(
    AVAILABLE_COLUMN_IDS.reduce(
      (prev: TExportableUserColumn[], post: TColumnId) => [
        ...prev,
        ...(selectedColumns.includes(post)
          ? COLUMNS_TO_EXPORTABLES[post] || [post as TExportableUserColumn]
          : []),
      ],
      []
    )
  ) as USER_DATA_COLUMN[];

const BLACKLISTED_COLUMNS = ['last10Quests'];

export const isBlacklisted = (colId: TColumnId) =>
  BLACKLISTED_COLUMNS.includes(colId);

export const getComboFieldComponents = () => {
  const arr: TColumnId[] = [];
  Object.entries(AVAILABLE_COLUMNS).forEach(([, { comboField }]) =>
    arr.push(...(comboField || []))
  );

  return arr;
};

export const enrichTableColumnsWithComboFields = (
  selectedColumnIds: TColumnId[]
) => {
  let arr: TColumnId[] = [];
  selectedColumnIds.forEach(colId => {
    arr = arr.concat([colId, ...(AVAILABLE_COLUMNS[colId].comboField || [])]);
  });

  return arr;
};
