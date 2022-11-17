import { any, complement } from 'ramda';

import { isNonEmptyString } from '@hox/frontend-utils/ramda';

import { UserDetailsOrganizationInfoFragment } from '../../graphql/__generated__/FetchUserDetails.generated';

const containsNumbers = (str: string) => str.match(/\d/) !== null;
const containsBrackets = (str: string) => str.match(/[<>(){}[\]]/) !== null;

const isValidDomain = (domains: Array<{ name: string }>) => (email: string) =>
  any((domain: { name: string }) => email.endsWith(`@${domain.name}`))(domains);

// TODO(Max): Name maximum length validation?
const nameValidationRules = [
  {
    predicate: isNonEmptyString,
    message: 'Cannot be empty',
  },
  {
    predicate: complement(containsNumbers),
    message: 'Cannot contain numbers',
  },
  {
    predicate: complement(containsBrackets),
    message: 'Cannot contain brackets',
  },
];

const getEmailValidationRules = (domains: Array<{ name: string }>) => [
  {
    predicate: isNonEmptyString,
    message: 'Cannot be empty',
  },
  {
    predicate: isValidDomain(domains),
    message: 'Domain has to exist',
  },
];

export const getFormValidationRules = (
  organization: UserDetailsOrganizationInfoFragment
) => ({
  firstName: nameValidationRules,
  lastName: nameValidationRules,
  email: getEmailValidationRules(organization.domains),
  department: [],
  site: [],
  isAnonymous: [],
  uiLanguage: [],
  questLanguages: [],
  country: [],
  city: [],
  gameMode: [],
});
