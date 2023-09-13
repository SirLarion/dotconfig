import R from 'ramda';

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

const isNotEmpty = <T>(value: T) => R.not(R.isEmpty(value));

const takeIfNotEmpty = (fields: Record<string, unknown>) =>
  isNotEmpty(fields) ? fields : undefined;

const domainFromEmailAddress = (email: string) => email.split('@', 2)[1];

const getEmailAddress = (userData: DeepPartial<IUser>) =>
  R.pathOr('', ['emails', 0, 'address'], userData);

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
  const emailAddress = getEmailAddress(userData);
  const domain = domainFromEmailAddress(emailAddress);

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
    ...takeIfNotEmpty({ emailAddress }),
    ...takeIfNotEmpty(formattedProfile),
    ...takeIfNotEmpty(game),
  };
};
