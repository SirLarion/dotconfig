import { flatten } from 'ramda';
import { MessageDescriptor } from 'react-intl';
import { Cell } from 'react-table';
import { v4 as uuidv4 } from 'uuid';

import { USER_GAME_MODE } from '../../../types/graphql.generated';
import {
  CurrentUserOrganizationDefaultSettingsQuery,
  OrganizationDomainsFragment,
} from '../components/UserImportTable/graphql/__generated__/CurrentUserOrganizationDefaultSettings.generated';

type TDomains = OrganizationDomainsFragment['domains'];

export enum EUserImportMethod {
  COPY_AND_PASTE = 'copy_and_paste',
  IMPORT_LIST = 'import_list',
  SCIM = 'scim',
}

export interface IImportableUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  city?: string;
  department?: string;
  site?: string;
  language?: string;
  questLanguages?: string[];
  gameMode?: USER_GAME_MODE;
  isAnonymous?: boolean;
}

export type TImportKey = keyof IImportableUser;

export type TUserImportRowErrors = {
  [key in keyof IImportableUser]?: MessageDescriptor[];
};

export interface IUserImportRow {
  user: IImportableUser;
  errors: TUserImportRowErrors;
}

export type TImportError = {
  userId: string;
  errors: string[];
};

export interface IUserImportTableCellProps<TValue> {
  cell: Cell<string>;
  rowId: string;
  rowValue: TValue;
  rowFocus?: boolean;
}

export interface IOrganizationImportSettings {
  emailDomains: TDomains;
  defaultGameMode: USER_GAME_MODE | null;
  usersAreAnonymousByDefault: boolean;
  defaultUiLanguage?: string;
  defaultSimualtionLanguages?: string[];
}

export const userCsvHeaders: Array<keyof IImportableUser> = [
  'email',
  'firstName',
  'lastName',
  'city',
  'country',
  'site',
  'department',
  'language',
  'questLanguages',
  'gameMode',
  'isAnonymous',
];

const getHeaderRow = (columns: string[]) => [columns.join(';')];

const generateCsv = (
  headers: Array<keyof IImportableUser>,
  users: IImportableUser[]
) =>
  getHeaderRow(headers)
    .concat(users.map(user => headers.map(header => user[header]).join(';')))
    .join('\n');

// note(Anssi): credits due to https://stackoverflow.com/a/19328891
export const downloadFile = (href: string, fileName: string) => {
  const hiddenAnchorLink = document.createElement('a');
  document.body.append(hiddenAnchorLink);
  hiddenAnchorLink.style.display = 'none';
  hiddenAnchorLink.href = href;
  hiddenAnchorLink.download = fileName;
  hiddenAnchorLink.click();
  window.URL.revokeObjectURL(href);
  document.body.removeChild(hiddenAnchorLink);
};

export const getDownloadableBlobHref = <T extends BlobPart>({
  data,
  type,
}: {
  data: T | T[];
  type: string;
}) => {
  const flattenedData = flatten([data]) as unknown as T[];
  const blob = new Blob(flattenedData, { type });
  const href = URL.createObjectURL(blob);
  return href;
};

export const generateCsvFile = (
  headers: Array<keyof IImportableUser>,
  users: IImportableUser[],
  csvFileName?: string
) => {
  const csv = generateCsv(headers, users);

  const today = new Date().toISOString().slice(0, 10);
  const fileName = `${csvFileName}.csv` || `users-${today}.csv`;
  const href = getDownloadableBlobHref({
    data: csv,
    type: 'text/csv;charset=utf-8;',
  });
  return { href, fileName };
};

export const csvRequiredFields = ['email', 'firstName', 'lastName'];
export const csvOptionalFields = [
  'department',
  'country',
  'city',
  'site',
  'gameMode',
  'isAnonymous',
  'language',
  'questLanguages',
];

export const csvAllFields = [...csvRequiredFields, ...csvOptionalFields];
export const getAllowedEmailDomains = (
  data?: CurrentUserOrganizationDefaultSettingsQuery
) => data?.currentUser?.organization.domains;

export const generateUserImportId = () => uuidv4();

export const userImportMeasurementsPx = {
  FOOTER_BUTTON_HEIGHT: 48,
  TABLE_TOOLBAR_HEIGHT: 48,
  TABLE_TOOLBAR_TOTAL_HEIGHT: 80,
  TABLE_HEADER_TOTAL_HEIGHT: 30,
  HEADER_HEIGHT: 88,
  TABLE_ROW_PADDING_BOTTOM: 8,
  CONTENT_VERTICAL_PADDING: 48,
};
