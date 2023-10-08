import { pipe, uniq, reduce } from 'ramda';

import { USER_DATA_COLUMN } from '@hox/frontend-utils/types/graphql.generated';

import { TColumnId } from '../../../../views/UserManagement/types';

type ExportableUserColumn = `${USER_DATA_COLUMN}`;

// This must be equal to
// resolvers/mutations/userMutation.ts -> MAX_USERS_FOR_FAST_EXPORT
export const MAX_USERS_FOR_FAST_EXPORT = 5000;

const COLUMNS_TO_EXPORTABLES: Partial<
  Record<TColumnId, ExportableUserColumn[]>
> = {
  nameAndEmail: ['firstName', 'lastName', 'emailAddress'],
  name: ['firstName', 'lastName'],
  businessUnit: ['department', 'site'],
  location: ['city', 'country'],
  last10Quests: [], // Graph, don't export at all
};

export const mapTableColumnsToExportables = (selectedColumns: TColumnId[]) =>
  pipe(
    reduce(
      (prev, post) => [...prev, COLUMNS_TO_EXPORTABLES[post] || post],
      [] as USER_DATA_COLUMN
    ),
    uniq
  )(selectedColumns);