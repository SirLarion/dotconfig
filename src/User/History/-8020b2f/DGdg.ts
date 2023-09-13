import R from 'ramda';

import {
  withOrganizationId,
  withUserEmailDomain,
} from '@hox/telemetry-shared/context';

import {
  IDomain,
  IOrganization,
} from '@server/lib/typedSchemas/Organization/models';
import { isSameOrSubDomain } from '@server/util';
import {
  errorFailedPrecondition,
  errorInvalidArgument,
} from '@server/util/error';

import { TCreateContext } from './create.models';
import { IUser } from './models';

type TUserUpdateTrackedFields<T> = { [key in keyof T]: Array<keyof T[key]> };

const userInfoChangedAnalyticsTrackedFields: TUserUpdateTrackedFields<
  Pick<IUser, 'profile' | 'game'>
> = {
  profile: [
    'country',
    'department',
    'city',
    'site',
    'spicyModeEnabled',
    'jobFunction',
    'hasEnforcedAnonymity',
  ],
  game: ['active', 'mode'],
};

export const isEmailInOrgDomains = (domains: IDomain[], email: string = '') => {
  const [, emailHostName] = email.split('@');

  return domains.some(domain => isSameOrSubDomain(domain.name, emailHostName));
};
const isNotEmpty = <T>(value: T) => R.not(R.isEmpty(value));

const takeIfNotEmpty = (fields: Record<string, unknown>) =>
  isNotEmpty(fields) ? fields : undefined;

const domainFromEmailAddress = (email: string) => email.split('@', 2)[1];

const getEmailDomain = (userData: DeepPartial<IUser>) => {
  const email = R.pathOr('', ['emails', 0, 'address'], userData);

  return domainFromEmailAddress(email);
};

export const validateUserEmails = (
  ctx: TCreateContext,
  org: IOrganization,
  emails: Pick<IUser, 'emails'>
) => {
  const emailAddress = emails[0].address;

  if (R.isEmpty(emailAddress)) {
    throw errorInvalidArgument(
      ctx,
      'Input email address cannot be empty',
      withOrganizationId(org._id)
    );
  }
  const [localId, domain] = emailAddress.split('@');

  if (!isEmailInOrgDomains(org.domains, emailAddress)) {
    throw errorFailedPrecondition(
      ctx,
      `Email domain ${domain} not configured in organization`,
      withOrganizationId(org._id),
      withUserEmailDomain(domain)
    );
  }

  if (R.isEmpty(localId)) {
    throw errorInvalidArgument(
      ctx,
      'The local-part (preceding @-symbol) of input email address cannot be empty',
      withOrganizationId(org._id),
      withUserEmailDomain(domain)
    );
  }
};

type TFields = Array<keyof IUser['profile']>;

const profileShouldNullFields: TFields = [
  'department',
  'site',
  'country',
  'city',
];

const nullEmptyStringProfileFields = (profile: DeepPartial<IUser['profile']>) =>
  profileShouldNullFields.reduce((prevObject, currentField) => {
    if (profile[currentField] === undefined) {
      return prevObject;
    }

    return {
      ...prevObject,
      [currentField]:
        profile[currentField] === '' ? null : profile[currentField],
    };
  }, {});

export const getUpdatedAnalyticsTrackedFields = (
  userData: DeepPartial<IUser>
) => {
  const domain = getEmailDomain(userData);

  const profile = R.pick(
    userInfoChangedAnalyticsTrackedFields.profile,
    R.pathOr({}, ['profile'], userData)
  );

  const game = R.pick(
    userInfoChangedAnalyticsTrackedFields.game,
    R.pathOr({}, ['game'], userData)
  );

  const formattedProfile = nullEmptyStringProfileFields(profile);

  return {
    ...(domain && { domain }),
    ...takeIfNotEmpty(formattedProfile),
    ...takeIfNotEmpty(game),
  };
};
