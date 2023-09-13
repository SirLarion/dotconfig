import R from 'ramda';

import {
  authenticatedResolver,
  createResolver,
  defaultOrganizationIdSelector,
  overrideQueryParams,
} from '@server/api/graphql/utils';
import { Users } from '@server/collections/users';
import { runHandlerWithTaskRunnerRole } from '@server/core/tasks/lib';
import { TSelectedUserDataId } from '@server/domains/admin/userManagement/lib/createUserListCSVFile.models';
import { INewUser } from '@server/domains/collection/user/lib/create.models';
import { IOnboardUserPayload } from '@server/domains/game/user/lib/onboardUser.models';
import { IResetUserGamePayload } from '@server/domains/game/user/lib/resetUserGame.models';
import { IUserFingerprintData } from '@server/domains/legacy/fingerprintUser/lib/models';
import { EUserRole, ROLES } from '@server/domains/lib/auth/roles';
import { fetchCursorHead, mapCursor } from '@server/domains/lib/collectionFp';
import { withTaskRunnerRole } from '@server/domains/lib/contextWith';
import { defer } from '@server/domains/lib/defer';
import {
  IHandlerContext,
  IMetaContext,
  THandlerContext,
} from '@server/domains/lib/models';
import { TFanOutPayload } from '@server/domains/user/bulkAction/lib/fanOut.models';
import { TUserProperties } from '@server/domains/user/bulkAction/lib/setUserProperties.lib';
import { expandUsersSearchString } from '@server/domains/user/search/lib/findUsersBySearchString.lib';
import serverIntl from '@server/intl';
import { EClientEvent } from '@server/lib/analyticEvents';
import { EBulkUserActionKind } from '@server/lib/bulkUserActions';
import { ESupportedLocales } from '@server/lib/i18n';
import { IUser } from '@server/lib/typedSchemas';
import { EUserEvents } from '@server/lib/typedSchemas/User/models';
import { errorInvalidArgument } from '@server/util/error';

import { getMeta } from '../../../../domains/lib/context';
import { ResolverError } from '../../errors';
import { getExtensionsMongoSelector } from '../../extensions/applyExtensions';

import { getSingleOrganizationByEmailDomains, getUniqueDomains } from './utils';

type TUserActionScope = {
  organizationId: string;
  search?: string;
  filter?: Record<string, unknown>;
};

const pickErrorMessages = (results: Array<{ error?: Error }>) =>
  results.reduce(
    (acc, result) =>
      result && result.error ? [...acc, result.error.message] : acc,
    [] as string[]
  );

const throwCombinedError = (errorMessages: string[]) => {
  throw new ResolverError(
    `Failed for ${errorMessages.length} users.`,
    'InviteUserError',
    { messages: errorMessages }
  );
};

const checkForErrors = R.pipe(
  pickErrorMessages,
  R.when(errors => errors.length > 0, throwCombinedError)
);

const getUsersForUserAction = async (
  ctx: IHandlerContext & IMetaContext,
  actionName: string,
  args: TUserActionScope
) => {
  if (!args.organizationId) {
    throw errorInvalidArgument(
      ctx,
      `${actionName} must have organizationId set`
    );
  }

  const searchString = args.search || '';

  const params = overrideQueryParams(getExtensionsMongoSelector(args), {
    selector: {
      organizationId: args.organizationId,
    },
  });

  const { users } = await ctx.handlers.user.search.findUsersBySearchString(
    ctx,
    { params, searchString }
  );
  return users;
};

const getSearchUserCount = async (
  ctx: IHandlerContext & IMetaContext,
  args: TUserActionScope
) => {
  if (!args.organizationId) {
    throw errorInvalidArgument(
      ctx,
      'organizationId must be set to get user count'
    );
  }
  const searchString = args.search || '';

  const params = overrideQueryParams(getExtensionsMongoSelector(args), {
    selector: {
      organizationId: args.organizationId,
    },
  });

  const { userSelector } = expandUsersSearchString(
    ctx,
    { organizationId: args.organizationId },
    searchString
  );
  const finalUserSelector = R.mergeDeepLeft(userSelector, params.selector);
  return await ctx.handlers.collection.user
    .find(ctx, {
      params: {
        selector: finalUserSelector,
        options: params.options,
      },
    })
    .then(c => c.count());
};

const getUserEmails = (users: IUser[]) =>
  users.map(user => user.emails[0].address);

const handleCombinedError = <T>(results: Array<T | { error?: Error }>): T[] => {
  checkForErrors(results);
  return results as T[];
};

export const updateUser = authenticatedResolver(
  async (root, args: { user: IUser }, ctx) => {
    const {
      user: { _id, ...update },
    } = args;
    const params = R.pipe(
      getExtensionsMongoSelector,
      defaultOrganizationIdSelector(ctx)
    )(args);
    const updatedUser = await ctx.handlers.collection.user.patch(ctx, {
      id: _id,
      data: update,
      params,
    });
    return updatedUser;
  }
);

export const createUsers = authenticatedResolver(
  async (root, { users }: { users: INewUser[] }, ctx) => {
    const createdUsers = await Promise.all(
      users.map(data => ctx.handlers.collection.user.create(ctx, { data }))
    );

    return createdUsers;
  }
);

export const upsertUser = authenticatedResolver(
  async (root, { user }: { user: IUser }, ctx) => {
    const [existingUser] = await ctx.handlers.collection.user
      .find(ctx, {
        params: {
          selector: {
            'emails.address': user.emails[0].address,
            organizationId: user.organizationId,
          },
          options: {
            limit: 1,
            fields: {
              _id: 1,
            },
          },
        },
      })
      .then(c => c.fetch());

    const isUpdate = existingUser !== undefined;

    const upsertedUser = isUpdate
      ? await ctx.handlers.collection.user.patch(ctx, {
          id: existingUser._id,
          data: R.omit(['organizationId', 'emails'], user),
        })
      : await ctx.handlers.collection.user.create(ctx, { data: user });

    return {
      updated: isUpdate,
      inserted: !isUpdate,
      user: upsertedUser,
    };
  }
);

export const deleteUsers = authenticatedResolver(
  async (root, args: TUserActionScope, ctx) => {
    const users = await getUsersForUserAction(ctx, 'DeleteUsers', args);
    const userEmails = getUserEmails(users);
    return {
      taskGroup: await ctx.handlers.user.bulkAction.fanOut(ctx, {
        emails: userEmails,
        actionKind: EBulkUserActionKind.DELETE_USER,
        userId: ctx.identity._id,
        organizationId: ctx.identity.organizationId,
      }),
    };
  }
);

export const deactivateUsers = authenticatedResolver(
  async (root, args: TUserActionScope, ctx) => {
    const users = await getUsersForUserAction(ctx, 'DeactivateUsers', args);
    const userEmails = getUserEmails(users);
    return {
      taskGroup: await ctx.handlers.user.bulkAction.fanOut(ctx, {
        emails: userEmails,
        actionKind: EBulkUserActionKind.DEACTIVATE_USER,
        userId: ctx.identity._id,
        organizationId: ctx.identity.organizationId,
      }),
    };
  }
);

export const reactivateUsers = authenticatedResolver(
  async (root, args: TUserActionScope, ctx) => {
    const users = await getUsersForUserAction(ctx, 'ReactivateUsers', args);
    const userEmails = getUserEmails(users);
    return {
      taskGroup: await ctx.handlers.user.bulkAction.fanOut(ctx, {
        emails: userEmails,
        actionKind: EBulkUserActionKind.REACTIVATE_USER,
        userId: ctx.identity._id,
        organizationId: ctx.identity.organizationId,
      }),
    };
  }
);

export const addUiEvents = authenticatedResolver(
  async (root, args: { uiEvents: Array<{ eventName: EClientEvent }> }, ctx) => {
    const user = await ctx.handlers.collection.user.get(ctx, {
      id: ctx.identity._id,
      params: {
        selector: {
          organizationId: ctx.identity.organizationId,
        },
        options: { fields: { events: 1 } },
      },
    });
    return ctx.handlers.user.enrichment.persistEvents(ctx, {
      user,
      events: args.uiEvents,
    });
  }
);

export const addUserEventAndRecalculateRewards = authenticatedResolver(
  async (root, args: { event: EUserEvents; userId: string }, ctx) => {
    if (!Object.values(EUserEvents).includes(args.event)) {
      throw errorInvalidArgument(
        ctx,
        'addUserEventAndRecalculateRewards can be only called with EUserEvents'
      );
    }

    return ctx.handlers.user.enrichment.persistEventsAndRecalculateRewards(
      ctx,
      {
        userId: args.userId,
        events: [args.event],
      }
    );
  }
);

export const updateUserFingerprint = authenticatedResolver(
  async (
    root,
    args: { id: string; clientFingerprint?: IUserFingerprintData },
    ctx
  ) => {
    const { id, clientFingerprint } = args;

    const fingerprint = await ctx.handlers.legacy.fingerprintUser.update(ctx, {
      userId: id,
      data: clientFingerprint
        ? JSON.parse(JSON.stringify(clientFingerprint))
        : null,
    });
    const user = await ctx.handlers.legacy.userTagCreator.create(
      withTaskRunnerRole(ctx),
      {
        params: {
          userId: id,
          fingerprints: fingerprint ? [fingerprint] : [],
        },
      }
    );

    return user;
  }
);

export const startGameForCurrentUser = authenticatedResolver(
  (root, args, ctx) => {
    const { organizationId, _id: userId } = ctx.identity;

    return runHandlerWithTaskRunnerRole(ctx, ctx.handlers.game.user.start, {
      userId,
      organizationId,
    });
  }
);

export const selfOnboardCurrentUser = authenticatedResolver(
  (root, args: { locale?: ESupportedLocales }, ctx) => {
    const { organizationId, _id: userId } = ctx.identity;
    const { locale } = args;

    return runHandlerWithTaskRunnerRole(
      ctx,
      ctx.handlers.game.user.selfOnboard,
      {
        userId,
        organizationId,
        locale,
      }
    );
  }
);

const getOrgUsersEmails = async (
  ctx: THandlerContext,
  organizationId: string
) => {
  return ctx.handlers.collection.user
    .find(ctx, {
      params: {
        selector: {
          organizationId,
        },
        options: {
          fields: {
            emails: 1,
          },
        },
      },
    })
    .then(mapCursor(user => user.emails[0].address));
};

export const executeBulkUserAction = authenticatedResolver(
  async (
    root,
    { emails, organizationId: targetOrganizationId, ...rest }: TFanOutPayload,
    ctx
  ) => {
    const emailDomains = getUniqueDomains(emails);

    let organizationId: string;
    let targetEmails: string[];

    if ((!emails || emails.length === 0) && !targetOrganizationId) {
      throw errorInvalidArgument(
        ctx,
        'Emails list or organizationId is required for Bulk user action'
      );
    }

    if (
      rest.actionKind === EBulkUserActionKind.DELETE_USER &&
      targetOrganizationId
    ) {
      throw errorInvalidArgument(
        ctx,
        'Delete user event not allowed for whole organization'
      );
    }

    if (emails) {
      organizationId = (
        await getSingleOrganizationByEmailDomains(ctx, emailDomains)
      )._id;
      targetEmails = emails;
    } else {
      organizationId = targetOrganizationId;
      targetEmails = await getOrgUsersEmails(ctx, targetOrganizationId);
    }

    return ctx.handlers.user.bulkAction.fanOut(ctx, {
      emails: targetEmails,
      userId: ctx.identity._id,
      organizationId,
      ...rest,
    });
  }
);

export const createBulkUserActionResolver = (actionKind: EBulkUserActionKind) =>
  createResolver(async (root, args: TFanOutPayload, context) => {
    return executeBulkUserAction(
      root,
      { ...args, actionKind } as TFanOutPayload,
      context
    );
  });

export const sendQuestsToEmails = createBulkUserActionResolver(
  EBulkUserActionKind.SEND_QUEST
);

export const onboardCurrentUser = authenticatedResolver(
  async (root, args, ctx) => {
    return ctx.handlers.game.user.legacyOnboardUser(ctx, {
      userId: ctx.identity._id,
      organizationId: ctx.identity.organizationId,
    });
  }
);

export const onboardUser = authenticatedResolver(
  async (root, args: IOnboardUserPayload, ctx) =>
    ctx.handlers.game.user.onboardUser(ctx, args).then(() =>
      ctx.handlers.collection.user.get(withTaskRunnerRole(ctx), {
        id: args.userId,
      })
    )
);

export const inviteUsers = authenticatedResolver(
  async (root, args: TUserActionScope, ctx) => {
    const users = await getUsersForUserAction(ctx, 'InviteUser', args);
    const userEmails = getUserEmails(users);
    return {
      taskGroup: await ctx.handlers.user.bulkAction.fanOut(ctx, {
        emails: userEmails,
        actionKind: EBulkUserActionKind.INVITE_USER,
        userId: ctx.identity._id,
        organizationId: ctx.identity.organizationId,
      }),
    };
  }
);

export const automaticStart = authenticatedResolver(
  async (root, args: TUserActionScope, ctx) => {
    const users = await getUsersForUserAction(ctx, 'AutomaticStart', args);
    const userEmails = getUserEmails(users);
    return {
      taskGroup: await ctx.handlers.user.bulkAction.fanOut(ctx, {
        emails: userEmails,
        actionKind: EBulkUserActionKind.AUTOMATIC_START,
        userId: ctx.identity._id,
        organizationId: ctx.identity.organizationId,
      }),
    };
  }
);

export const addRoleForUsers = authenticatedResolver(
  async (
    root,
    {
      organizationId,
      userIds,
      role,
    }: { organizationId: string; userIds: string[]; role: EUserRole },
    ctx
  ): Promise<IUser[]> => {
    if (!R.includes(role, ROLES)) {
      throw new Error(`Cannot nominate users to role ${role}`);
    }

    const results = await Promise.all(
      userIds.map(
        async (userId: string): Promise<IUser | { error?: Error }> => {
          const user = await ctx.handlers.collection.user.get(ctx, {
            id: userId,
            params: {
              selector: {
                organizationId,
              },
            },
          });

          if (!user) {
            throw new Error(`No user found with given id (${userId})`);
          }

          return ctx.handlers.user.roles
            .addRole(ctx, { userId, role })
            .catch((error: Error) => ({ error }));
        }
      )
    );

    return handleCombinedError(results);
  }
);

export const resetUsersRoles = authenticatedResolver(
  (root, { organizationId, userIds }, ctx) => {
    return Promise.all(
      userIds.map(async (userId: string) => {
        const user = await ctx.handlers.collection.user.get(ctx, {
          id: userId,
          params: {
            selector: {
              organizationId,
            },
          },
        });
        if (!user) {
          throw new Error(`No user found with given id (${userId})`);
        }
        return ctx.handlers.user.roles
          .removeRoles(ctx, {
            userId,
            roles: [
              EUserRole.ADMIN,
              EUserRole.SOC_OPERATOR,
              EUserRole.SUPER_ADMIN,
              EUserRole.HOXHUNT_THREAT_ANALYST,
            ],
          })
          .catch((error: Error) => ({ error }));
      })
    ).then(handleCombinedError);
  }
);

export const setRoleForUser = authenticatedResolver(
  async (root, { userId, organizationId, role }, ctx) => {
    if (!R.includes(role, ROLES)) {
      throw new Error(`Cannot nominate users to role ${role}`);
    }

    const user = await ctx.handlers.collection.user.get(ctx, {
      id: userId,
      params: {
        selector: {
          organizationId,
        },
      },
    });

    if (!user) {
      throw new Error(`No user found with given id (${userId})`);
    }

    return ctx.handlers.user.roles.setRole(ctx, {
      userId,
      organizationId,
      role,
    });
  }
);

export const toggleGameMode = authenticatedResolver(
  async (root, args: TUserActionScope, ctx) => {
    const users = await getUsersForUserAction(ctx, 'ToggleGameMode', args);
    const userEmails = getUserEmails(users);
    const mappedGameModes = users.reduce((prev, current) => {
      prev[current._id] = current.game.mode;
      return prev;
    }, {});
    return {
      taskGroup: await ctx.handlers.user.bulkAction.fanOut(ctx, {
        emails: userEmails,
        actionKind: EBulkUserActionKind.TOGGLE_GAME_MODE,
        userId: ctx.identity._id,
        organizationId: ctx.identity.organizationId,
        currentGameModes: mappedGameModes,
      }),
    };
  }
);

export const setUserProperties = authenticatedResolver(
  async (
    root,
    args: TUserActionScope & { userProperties: TUserProperties },
    ctx
  ) => {
    if (args.userProperties == undefined) {
      throw errorInvalidArgument(
        ctx,
        'SetUserProperties requires a list of userProperties that will be set'
      );
    }
    const users = await getUsersForUserAction(ctx, 'SetUserProperties', args);
    const userEmails = getUserEmails(users);

    return {
      taskGroup: await ctx.handlers.user.bulkAction.fanOut(ctx, {
        emails: userEmails,
        actionKind: EBulkUserActionKind.SET_USER_PROPERTIES,
        userId: ctx.identity._id,
        organizationId: ctx.identity.organizationId,
        properties: args.userProperties,
      }),
    };
  }
);

export const generateUserCSVFile = authenticatedResolver(
  async (
    root,
    args: TUserActionScope & { selectedColumns: TSelectedUserDataId[] },
    ctx
  ) => {
    const userCount = await getSearchUserCount(ctx, args);
    console.log(userCount);
    if (userCount < 1000) {
      return await ctx.handlers.admin.userManagement.createUserListCsvFile(
        ctx,
        { ...args, userCount }
      );
    } else {
      return await defer(
        ctx,
        ctx.handlers.admin.userManagement.createUserListCsvFile,
        {
          ...args,
          userCount,
        }
      );
    }
  }
);

export const toggleActive = authenticatedResolver(
  async (root, args: TUserActionScope, ctx) => {
    const users = await getUsersForUserAction(ctx, 'ToggleActive', args);
    const userEmails = getUserEmails(users);
    const mappedActive = users.reduce((prev, current) => {
      prev[current._id] = current.game.active;
      return prev;
    }, {});
    return {
      taskGroup: await ctx.handlers.user.bulkAction.fanOut(ctx, {
        emails: userEmails,
        actionKind: EBulkUserActionKind.TOGGLE_ACTIVE,
        userId: ctx.identity._id,
        organizationId: ctx.identity.organizationId,
        currentGameActives: mappedActive,
      }),
    };
  }
);

export const migrateQuestMarkers = authenticatedResolver<
  unknown,
  { userIds: string[] }
>(async (root, { userIds }, ctx) => {
  const taskQueue = await ctx.getTaskQueue();
  const operationId = ctx.getGlobal('newUuidV4')();

  const userTasks = await ctx.handlers.collection.user
    .find(withTaskRunnerRole(ctx), {
      params: {
        selector: { _id: { $in: userIds } },
        options: { fields: { _id: 1, organizationId: 1 } },
      },
    })
    .then(
      mapCursor(({ _id: userId, organizationId }) => ({
        uniqueKey: `infrastructure.migration.backfillUserQuestMarkerStars:${userId}-${operationId}`,
        args: { userId, organizationId },
      }))
    );

  if (userTasks.length === 0) {
    throw new Error('No users found with given ids');
  }

  return taskQueue.submitTaskGroup(
    ctx,
    ctx.handlers.infrastructure.migration.backfillUserQuestMarkerStars,
    {
      userId: ctx.identity._id,
      organizationId: ctx.identity.organizationId,
      signature: 'infrastructure.migration.backfillUserQuestMarkerStars',
      description: serverIntl.generic,
      tasks: userTasks,
    }
  );
});

export const recalculateStats = authenticatedResolver<
  unknown,
  { userIds: string[] }
>(async (root, { userIds }, ctx) => {
  const taskQueue = await ctx.getTaskQueue();
  const operationId = ctx.getGlobal('newUuidV4')();

  const userTasks = await ctx.handlers.collection.user
    .find(withTaskRunnerRole(ctx), {
      params: {
        selector: { _id: { $in: userIds } },
        options: { fields: { _id: 1, organizationId: 1 } },
      },
    })
    .then(
      mapCursor(({ _id: userId, organizationId }) => ({
        uniqueKey: `game.user.recalculateStats:${userId}-${operationId}`,
        args: { userId, organizationId },
      }))
    );

  if (userTasks.length === 0) {
    throw new Error('No users found with given ids');
  }

  return taskQueue.submitTaskGroup(
    ctx,
    ctx.handlers.game.user.recalculateStats,
    {
      userId: ctx.identity._id,
      organizationId: ctx.identity.organizationId,
      signature: 'game.user.recalculateStats',
      description: serverIntl.generic,
      tasks: userTasks,
    }
  );
});

export const resetUserGame = authenticatedResolver(
  (
    root,
    { organizationId, questIdsToKeep, userId }: IResetUserGamePayload,
    ctx
  ) =>
    ctx.getTaskQueue().then(t =>
      t.submitTaskGroup(ctx, ctx.handlers.game.user.resetUserGame, {
        userId: ctx.identity._id,
        organizationId: ctx.identity.organizationId,
        signature: 'game.user.resetUserGame',
        description: serverIntl.generic,
        tasks: [
          {
            uniqueKey: `game.user.resetUserGame:${userId}-${ctx.getGlobal(
              'newUuidV4'
            )()}`,
            args: { userId, organizationId, questIdsToKeep },
          },
        ],
      })
    )
);

export const claimAchievement = authenticatedResolver<
  unknown,
  { userId: string; achievementId: string; organizationId: string }
>((root, params, ctx) =>
  ctx.handlers.game.user.claimAchievement(ctx, {
    ...params,
    userFieldInclusions: Users.publicFields,
  })
);

export const addGeolocation = authenticatedResolver((root, { userId }, ctx) => {
  const { ip } = getMeta('net')(ctx);
  const { geoIpCountry: countryCode, geoIpTimezone: timezone } =
    getMeta('geoIp')(ctx);
  return runHandlerWithTaskRunnerRole(
    ctx,
    ctx.handlers.user.enrichment.addGeolocation,
    { userId, ip, countryCode, timezone }
  );
});

export const unlinkPlugin = authenticatedResolver(
  async (root, { userId, pluginId }, ctx) => {
    const plugin = await ctx.handlers.collection.plugin
      .find(ctx, {
        params: { selector: { userId, pluginId } },
      })
      .then(fetchCursorHead);

    return ctx.handlers.collection.plugin.remove(ctx, {
      id: plugin?._id,
    });
  }
);

export const removeGameCooldown = authenticatedResolver(
  async (root, args: TUserActionScope, ctx) => {
    const users = await getUsersForUserAction(ctx, 'RemoveGameCooldown', args);
    const userEmails = getUserEmails(users);
    return {
      taskGroup: await ctx.handlers.user.bulkAction.fanOut(ctx, {
        emails: userEmails,
        actionKind: EBulkUserActionKind.REMOVE_GAME_COOLDOWN,
        userId: ctx.identity._id,
        organizationId: ctx.identity.organizationId,
      }),
    };
  }
);

export const addFeatureForUser = authenticatedResolver(
  (root, args: { id: string; feature: string }, ctx) =>
    ctx.handlers.collection.user
      .addFeatureForUser(ctx, {
        id: args.id,
        feature: args.feature,
      })
      .then(result => result.modified)
);

export const removeFeatureFromUser = authenticatedResolver(
  (root, args: { id: string; feature: string }, ctx) =>
    ctx.handlers.collection.user
      .removeFeatureFromUser(ctx, {
        id: args.id,
        feature: args.feature,
      })
      .then(result => result.modified)
);

export const softDeleteUser = authenticatedResolver(
  (_, args: { userId: string; organizationId: string }, ctx) =>
    ctx.handlers.user.softDelete.deactivateUser(ctx, {
      userId: args.userId,
      organizationId: args.organizationId,
    })
);

export const undoSoftDeleteUser = authenticatedResolver(
  (_, args: { userId: string; organizationId: string }, ctx) =>
    ctx.handlers.user.softDelete.reactivateUser(ctx, {
      userId: args.userId,
      organizationId: args.organizationId,
    })
);

export const inviteUser = authenticatedResolver(
  (_, args: { userId: string; organizationId: string }, ctx) =>
    ctx.handlers.user.email.inviteUser(ctx, {
      userId: args.userId,
      organizationId: args.organizationId,
    })
);

export const autoStartUser = authenticatedResolver(
  async (_, args: { userId: string; organizationId: string }, ctx) => {
    const { organizationId, userId } = await ctx.handlers.game.user.start(ctx, {
      userId: args.userId,
      organizationId: args.organizationId,
    });

    return ctx.handlers.collection.user.get(ctx, {
      id: userId,
      params: { selector: { organizationId } },
    });
  }
);
