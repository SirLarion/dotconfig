import { atom, atomFamily } from 'recoil';

import { defaultLocale } from '@hox/frontend-utils/i18n';

import { USER_GAME_MODE } from '../../../types/graphql.generated';
import {
  EUserImportMethod,
  IImportableUser,
  IOrganizationImportSettings,
  IUserImportRow,
} from '../lib';

export const organizationImportSettingsState =
  atom<IOrganizationImportSettings>({
    key: 'organizationImportSettingsState',
    default: {
      emailDomains: [],
      defaultGameMode: USER_GAME_MODE.REPORT_ONLY,
      usersAreAnonymousByDefault: false,
      defaultUiLanguage: defaultLocale,
      defaultSimualtionLanguages: [defaultLocale],
    },
  });

export const userImportMethodState = atom<EUserImportMethod | undefined>({
  key: 'userImportMethodState',
  default: undefined,
});

export const csvHeaderMappings = atom<Record<string, string>>({
  key: 'csvHeaderMappings',
  default: {},
});

export const csvMappingCreatedColumnCount = atom<number>({
  key: 'csvMappingCreatedColumnCount',
  default: 0,
});

export type TSelectableColumn = {
  header: string;
  value?: string;
};

export const csvUnrecognizedHeaders = atom<TSelectableColumn[]>({
  key: 'csvUnrecognizedHeaders',
  default: [],
});

export const allUsersState = atom<Map<string, IUserImportRow>>({
  key: 'allUsersState',
  default: new Map(),
});

export const allUserIdsState = atom<string[]>({
  key: 'allUserIdsState',
  default: [],
});

export const selectedUsersState = atom<Map<string, boolean>>({
  key: 'selectedUsersState',
  default: new Map(),
});

export const filterErroredUsersState = atom<boolean>({
  key: 'filterErroredUsersState',
  default: false,
});

export const focusedRowState = atom<string | null>({
  key: 'focusedRowState',
  default: null,
});

export const csvImportedUsers = atom<Array<Record<string, string>>>({
  key: 'csvImportedUsers',
  default: [],
});

export const csvImportedHeaders = atom<string[]>({
  key: 'csvImportedHeaders',
  default: [],
});

/**
 * Keep list of user ids that have been created by the import
 */
export const createdUserIdsState = atom<string[]>({
  key: 'createdUserIdsState',
  default: [],
});

/**
 * Keep list of user ids that have been updated by the import
 */
export const updatedUserIdsState = atom<string[]>({
  key: 'updatedUserIdsState',
  default: [],
});

/**
 * Keep list of user ids for users that have been errored in the import
 */
export const erroredUserIdsState = atom<string[]>({
  key: 'erroredUserIdsState',
  default: [],
});

/**
 * A dictionary of import errors, accessible by user id
 */
export const importErrorsState = atomFamily<string[], string>({
  key: 'importErrorsState2',
  default: [],
});

/**
 * Keep list of users that have been errored in the import
 */
export const erroredUsersState = atom<IImportableUser[]>({
  key: 'erroredUserState',
  default: [],
});
