import { isNil, reject } from 'ramda';
import { defineMessages, MessageDescriptor } from 'react-intl';

import { supportedLanguages } from '@hox/frontend-utils/i18n';

import { USER_GAME_MODE } from '../../../types/graphql.generated';
import { OrganizationDomainsFragment } from '../components/UserImportTable/graphql/__generated__/CurrentUserOrganizationDefaultSettings.generated';

type TDomains = OrganizationDomainsFragment['domains'];

import { IImportableUser, TUserImportRowErrors } from '.';
const INTL = {
  email: defineMessages({
    empty: {
      id: 'admin.userImport.cell.validation.email.empty',
      defaultMessage: 'Email cannot be empty',
      description:
        'Error message when user email value has no value in form field',
    },
    badFormat: {
      id: 'admin.userImport.cell.validation.email.badFormat',
      defaultMessage: 'Email format is incorrect',
      description:
        'Error message when email value has incorrect format in form field',
    },
    disallowedDomain: {
      id: 'admin.userImport.cell.validation.email.disallowedDomain',
      defaultMessage: 'Email domain is disallowed',
      description:
        'Error message when email value has disallowed domain in form field',
    },
  }),
  firstName: defineMessages({
    empty: {
      id: 'admin.userImport.cell.validation.firstName.empty',
      defaultMessage: 'First name cannot be empty',
      description:
        'Error message when user first name value has no value in form field',
    },
  }),
  lastName: defineMessages({
    empty: {
      id: 'admin.userImport.cell.validation.lastName.empty',
      defaultMessage: 'Last name cannot be empty',
      description:
        'Error message when user last name value has no value in form field',
    },
  }),
  gameMode: defineMessages({
    invalidValue: {
      id: 'admin.userImport.cell.gameMode.invalidError',
      defaultMessage: 'Game mode can be either REPORT_ONLY or INTENSIVE',
      description: 'Error message for invalid game mode value',
    },
  }),
  language: defineMessages({
    invalidValue: {
      id: 'admin.userImport.cell.language.unsupportedError',
      defaultMessage: 'Unsupported language code',
      description: 'Error message for unsupported language value',
    },
  }),
  questLanguages: defineMessages({
    invalidValue: {
      id: 'admin.userImport.cell.questLanguages.unsupportedError',
      defaultMessage: 'Unsupported language code(s)', // todo show invalid code?
      description: 'Error message for unsupported language value',
    },
    notAllowedValue: {
      id: 'admin.userImport.cell.questLanguages.notAllowedError',
      defaultMessage:
        'Language is not allowed by organization. "{domainName}" domain allows only following languages: [{allowedSimulationLanguages}]',
      description: 'Error message for not allowed language value',
    },
  }),
  isAnonymous: defineMessages({
    invalidValue: {
      id: 'admin.userImport.cell.isAnonymous.invalidError',
      defaultMessage: 'The value can be either TRUE or FALSE',
      description: 'Error message for invalid anonymity value',
    },
  }),
};

export const hasValidEmailFormat = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const hasValidDomain = (
  email: string,
  allowedEmailDomains: string[] | undefined
) =>
  !allowedEmailDomains ||
  (allowedEmailDomains &&
    hasValidEmailFormat(email) &&
    allowedEmailDomains.includes(email.split('@')[1]));

const isValidEmail =
  (allowedEmailDomains: string[] | undefined) => (email: string) =>
    hasValidEmailFormat(email) && hasValidDomain(email, allowedEmailDomains);

const isString = (value: unknown): value is string => typeof value === 'string';

export const getEmailValidator = (allowedEmailDomains: string[] | undefined) =>
  isValidEmail(allowedEmailDomains);

type TValidationResult = MessageDescriptor[] | undefined;

export const emailsDomainIsAllowed = (email: string, domains?: TDomains) => {
  const [, emailDomain] = email?.split('@');
  return domains?.some(domain => domain.name === emailDomain);
};

export const getAllowedQuestLanguages = (email: string, domains?: TDomains) => {
  const [, emailDomain] = email?.split('@');
  return (
    domains?.find(domain => domain.name === emailDomain)
      ?.allowedSimulationLanguages || []
  );
};

const validateEmail = (value: unknown, allowedDomains?: TDomains) => {
  if (!isString(value)) {
    return [INTL.email.empty];
  }

  if (!hasValidEmailFormat(value)) {
    return [INTL.email.badFormat];
  }

  if (!emailsDomainIsAllowed(value, allowedDomains)) {
    return [INTL.email.disallowedDomain];
  }
};

export const validateFirstName = (value?: unknown): TValidationResult => {
  const hasValue = isString(value) && value.trim() !== '';

  if (!hasValue) {
    return [INTL.firstName.empty];
  }
};
export const validateLastName = (value?: unknown): TValidationResult => {
  const hasValue = isString(value) && value.trim() !== '';

  if (!hasValue) {
    return [INTL.lastName.empty];
  }
};

export const validateGameMode = (value: unknown): TValidationResult => {
  if (!value) {
    return;
  }

  const isValidValue =
    value === USER_GAME_MODE.INTENSIVE || value === USER_GAME_MODE.REPORT_ONLY;

  if (!isValidValue) {
    return [INTL.gameMode.invalidValue];
  }
};

export const validateIsAnonymous = (value: unknown): TValidationResult => {
  if (!value) {
    return;
  }

  const isValidValue = value === true || value === false;

  if (!isValidValue) {
    return [INTL.isAnonymous.invalidValue];
  }
};

export const validateUiLanguage = (value: unknown): TValidationResult => {
  if (!value) {
    return;
  }
  const isValidValue = supportedLanguages.find(lang => lang.code === value);

  if (!isValidValue) {
    return [INTL.language.invalidValue];
  }
};

const validateQuestLanguages = (
  domains: TDomains,
  email: IImportableUser['email'],
  questLanguages?: IImportableUser['questLanguages']
): TValidationResult => {
  if (!questLanguages) {
    return;
  }

  const isValid = questLanguages.every(value =>
    supportedLanguages.some(lang => lang.code === value)
  );
  if (!isValid) {
    return [INTL.questLanguages.invalidValue];
  }

  // check for domain's allowedSimulationLanguages
  const allowedQuestLanguages = getAllowedQuestLanguages(email, domains);

  const isAllowedLanguage =
    allowedQuestLanguages.length === 0 ||
    questLanguages.every(value =>
      allowedQuestLanguages.some(lang => lang === value)
    );
  if (!isAllowedLanguage) {
    return [INTL.questLanguages.notAllowedValue];
  }
};

export const validateUser = (
  allowedEmailDomains: TDomains,
  user: IImportableUser
): TUserImportRowErrors => {
  return reject(isNil, {
    email: validateEmail(user.email, allowedEmailDomains),
    firstName: validateFirstName(user.firstName),
    lastName: validateLastName(user.lastName),
    language: validateUiLanguage(user.language),
    questLanguages: validateQuestLanguages(
      allowedEmailDomains,
      user.email,
      user.questLanguages
    ),
    gameMode: validateGameMode(user.gameMode),
    isAnonymous: validateIsAnonymous(user.isAnonymous),
  });
};
