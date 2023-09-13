import { capitalize, cloneDeep, flow, get, merge } from 'lodash';
import R from 'ramda';

import { UserSchema } from '@server/collections/users/collection';
import { create } from '@server/domains/collection/lib/mongo';
import { InputDoc } from '@server/domains/collection/lib/mongo/lib/models';
import {
  ICreatePayload,
  INewUser,
  TCreateContext,
} from '@server/domains/collection/user/lib/create.models';
import {
  createDefaultsMapper,
  MAPPING_RULES,
} from '@server/domains/collection/user/lib/customDefaultsMapper';
import { TRewardUser } from '@server/domains/game/user/rewardSpecs/models';
import { EUserRole } from '@server/domains/lib/auth/roles';
import { withTaskRunnerRole } from '@server/domains/lib/contextWith';
import { ESupportedLocales, supportedLocales } from '@server/lib/i18n';
import {
  IDomain,
  IOrganization,
} from '@server/lib/typedSchemas/Organization/models';
import { isNotNil } from '@server/util/fp';

import { EServerEvent } from '../../../../lib/analyticEvents';
import { THandlerAnalyticsEventBuilderFunc } from '../../../lib/models';

import { IUser } from './models';
import {
  getUpdatedAnalyticsTrackedFields,
  hasEmail,
  validateUserEmails,
} from './shared.lib';

const MONGO_DUPLICATE_KEY_ERROR = 11000;

const orgHasConditionalMapping = (ctx: TCreateContext, org: IOrganization) =>
  ctx.handlers.internal.features.hasFeature(withTaskRunnerRole(ctx), {
    featureName: 'custom enforced anonymity mapping',
    organization: org,
  });

const ensureLowercaseEmails = (data: INewUser): INewUser => ({
  ...data,
  emails: data.emails.map(email => ({
    ...email,
    address: email.address.toLowerCase(),
  })),
});

const ensureValidLanguage = (data: INewUser) => {
  const language = get(data, 'profile.locale.ui');

  if (!language || supportedLocales.includes(language)) {
    return data;
  }

  const clone = cloneDeep(data);

  delete clone.profile.locale.ui;

  return clone;
};

const parseNamesFromEmail = (email: string) => {
  const name = email.split('@')[0];
  const split = name.split('.');

  const [firstName, ...lastNameParts] = split.map(p => {
    if (!p) {
      return ' ';
    }

    if (p.includes('-')) {
      return p.split('-').map(capitalize).join('-');
    }

    return capitalize(p);
  });

  return {
    firstName: firstName.trim(),
    lastName: lastNameParts.join(' ').trim(),
  };
};

const getPrimaryEmailAddress = (data: INewUser): string =>
  R.path(['emails', 0, 'address'], data);

const addParsedNames = (data: INewUser) =>
  R.pipe(
    getPrimaryEmailAddress,
    parseNamesFromEmail,
    R.mergeRight(data.profile),
    R.objOf('profile'),
    R.mergeRight(data)
  )(data);

const hasFirstName = R.pathSatisfies(isNotNil, ['profile', 'firstName']);
const hasLastName = R.pathSatisfies(isNotNil, ['profile', 'lastName']);
const hasNames = R.both(hasFirstName, hasLastName);
const shouldParseNamesFromEmail = R.both(hasEmail, R.complement(hasNames));

const ensureNames = (data: INewUser) =>
  R.when(shouldParseNamesFromEmail, addParsedNames)(data);

const getDefaultsFromSchema = (): InputDoc<IUser> => UserSchema.clean({});

export const cleanNewUserData = (data: INewUser) =>
  flow(ensureLowercaseEmails, ensureValidLanguage, ensureNames)(data);

export const orgIsInDemoMode = R.path(['game', 'demoMode']);

export const addDemoRoleToUser = (ctx: TCreateContext) => (user: IUser) =>
  ctx.handlers.user.roles.addRole(withTaskRunnerRole(ctx), {
    role: EUserRole.DEMO,
    userId: user._id,
  });

export const determineDefaultLocale = (
  org: IOrganization,
  newUserData: INewUser
): string => {
  const emailAddress = newUserData.emails[0].address;
  const extractedDomain = emailAddress.split('@')[1];

  const userDomainName = org.domains.find(u => u.name === extractedDomain);

  return userDomainName
    ? userDomainName.defaultUiLanguage
    : org.domains[0].defaultUiLanguage;
};

const mapSimulationLanguagesFromDomain = (
  domain: IDomain
): ESupportedLocales[] => {
  const allowedSimulationLanguages = domain.allowedSimulationLanguages || [];
  const defaultSimulationLanguages = domain.defaultSimulationLanguages || [];

  if (allowedSimulationLanguages.length > 0) {
    return R.intersection(
      allowedSimulationLanguages,
      defaultSimulationLanguages
    );
  }

  return defaultSimulationLanguages;
};

export const determineDefaultSimulationLanguages = (
  org: IOrganization,
  newUserData: INewUser
): string[] => {
  const emailAddress = newUserData.emails[0].address;
  const extractedDomain = emailAddress.split('@')[1];

  const userDomain = org.domains.find(u => u.name === extractedDomain);

  const defaultSimulationLanguages = userDomain
    ? mapSimulationLanguagesFromDomain(userDomain)
    : [];

  return defaultSimulationLanguages;
};

export const defaultsFromOrg = (org: IOrganization, newUserData: INewUser) => ({
  organizationName: org.name,
  roles: {
    [org._id]: [EUserRole.USER],
  },
  profile: {
    locale: {
      ui: determineDefaultLocale(org, newUserData),
      quests: determineDefaultSimulationLanguages(org, newUserData),
    },
    isAnonymous: org.game.usersAreAnonymousByDefault,
  },
  game: {
    mode: org.game.defaultGameMode,
  },
});

export const validateNewUser =
  (ctx: TCreateContext, org: IOrganization) =>
  (data: INewUser): void => {
    const emailAddress = data.emails[0].address;

    validateUserEmails(ctx, org, emailAddress);
  };

const getUserRewards = (ctx: TCreateContext, user: TRewardUser) =>
  ctx.handlers.game.user.getChangedRewards(withTaskRunnerRole(ctx), { user });

export const getUserDoc = async (
  ctx: TCreateContext,
  org: IOrganization,
  newUserData: INewUser
) => {
  // extend here by passing organisation settings into createDefaultsMapper instead of hardcoded
  const withCustomDefaults = createDefaultsMapper(MAPPING_RULES);

  const hasConditionalMapping = await orgHasConditionalMapping(ctx, org);

  const user = merge(
    getDefaultsFromSchema(),
    defaultsFromOrg(org, newUserData),
    hasConditionalMapping ? withCustomDefaults(newUserData) : {},
    newUserData
  );

  return merge(user, { player: await getUserRewards(ctx, user) });
};

export const createNewUser =
  (ctx: TCreateContext, org: IOrganization) =>
  async (newUserData: INewUser) => {
    try {
      const newUser = await create<INewUser, IUser, TCreateContext>(ctx, {
        data: await getUserDoc(ctx, org, newUserData),
      });

      return newUser;
    } catch (e) {
      if (e.code && e.code === MONGO_DUPLICATE_KEY_ERROR) {
        throw new Error('User with email already exists');
      }

      throw e;
    }
  };

export const buildUserCreatedEvent = (
  ctx: TCreateContext,
  input: ICreatePayload,
  newUser: IUser
) =>
  ctx.getGlobal('analytics').buildEvent({
    event: EServerEvent.USER_CREATED,
    userId: newUser._id,
    timestamp: newUser.createdAt,
    properties: { organizationId: newUser.organizationId },
  });

export const buildInitialUserInfoUpdatedEvent: THandlerAnalyticsEventBuilderFunc<
  ICreatePayload,
  IUser
> = (ctx, payload, user) => {
  const fields = getUpdatedAnalyticsTrackedFields(user);

  return ctx.getGlobal('analytics').buildEvent({
    event: EServerEvent.USER_INFO_UPDATED,
    userId: user._id,
    properties: fields,
  });
};
