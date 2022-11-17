import { complement } from 'ramda';

import { isNonEmptyString } from '@hox/frontend-utils/ramda';
import { UserDetailsOrganizationInfoFragment } from '../../graphql/__generated__/FetchUserDetails.generated';

const containsNumbers = (str: string) => str.match(/\d/) !== null;
const containsBrackets = (str: string) => str.match(/[<>(){}[\]]/) !== null;

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

export const getFormValidationRules = (
  organization: UserDetailsOrganizationInfoFragment
) => ({
  firstName: nameValidationRules,
  lastName: nameValidationRules,
  department: [],
  site: [],
  isAnonymous: [],
  uiLanguage: [],
  questLanguages: [],
  country: [],
  email: [],
  city: [],
  gameMode: [],
});
