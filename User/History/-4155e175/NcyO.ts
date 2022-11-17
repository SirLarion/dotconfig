import { fieldsList } from 'graphql-fields-list';
import { sortBy } from 'lodash';
import R from 'ramda';

import {
  enrichedLeaderboardUserRows,
  resolveLeaderboard,
} from '@server/api/graphql/resolvers/leaderboard';
import { trackClientMetrics } from '@server/api/graphql/resolvers/mutations/analyticsMutations';
import {
  createFeedbackRule,
  removeFeedbackRule,
  updateFeedbackRule,
} from '@server/api/graphql/resolvers/mutations/feedbackRuleMutations';
import {
  addIncidentNote,
  deleteIncidentNote,
  huntingSearchJobResultsSeen,
  revertHuntingEmailDeletion,
  startHuntingEmailDeletion,
  startHuntingSearchJob,
  updateIncidentNote,
  updateIncidentState,
} from '@server/api/graphql/resolvers/mutations/incidentMutations';
import {
  createOrUpdateMarker,
  deleteMarker,
} from '@server/api/graphql/resolvers/mutations/markerMutations';
import {
  addFeatureForOrganization,
  addGoogleClientId,
  createOrganization,
  createOrganizationScimToken,
  deleteOrganization,
  initHuntingSearchAndDestroySettings,
  inviteUnstartedUsers,
  organizationLaunchTraining,
  recalculateAchievementCompletion,
  removeOrganizationDomain,
  removeFeatureFromOrganization,
  removeGameCooldownFromOrganizationUsers,
  removeGoogleClientId,
  scheduleStatRecalculationTasksForOrganizations,
  setDemoMode,
  setOrganizationDkim,
  setOrganizationGmailIntegration,
  startGameForUnstartedUsers,
  startOrganizationOnboarding,
  updateOrganization,
  updateOrganizationIncidentPolicySettings,
  updateOrganizationIncidentSettings,
  updateOrganizationSecurityTeamName,
} from '@server/api/graphql/resolvers/mutations/organizationMutations';
import { organizationOnboardingTaskMarkCompleted } from '@server/api/graphql/resolvers/mutations/organizationOnboardingTaskMutations';
import {
  setOrgQuizNewContentOnByDefault,
  updateOrganizationQuizModule,
  updateOrganizationQuizModuleTemplate,
} from '@server/api/graphql/resolvers/mutations/organizationQuizMutations';
import {
  updateOrganizationPluginRedirect,
  updateOrganizationPluginSettings,
  updateOrganizationThreatSettings,
} from '@server/api/graphql/resolvers/mutations/organizationThreatMutations';
import { upsertOrganizationTrainingRule } from '@server/api/graphql/resolvers/mutations/organizationTrainingRuleMutations';
import {
  deleteQuest,
  sendQuestToCurrentUser,
  sendQuestToOrganization,
  technicalTestQuestRemoveAll,
  technicalTestQuestSendToUser,
  watchMarkers,
} from '@server/api/graphql/resolvers/mutations/questMutations';
import {
  deleteThreat,
  processThreat,
  rateThreat,
  userReceivedRatingInInstantFeedback,
} from '@server/api/graphql/resolvers/mutations/threatMutations';
import {
  createToken,
  revokeAllTokens,
  revokeToken,
} from '@server/api/graphql/resolvers/mutations/tokenMutations';
import {
  createInstantFeedbackUserFeedback,
  updateUserFeedback,
} from '@server/api/graphql/resolvers/mutations/userFeedbackMutations';
import {
  addFeatureForUser,
  addGeolocation,
  addRoleForUsers,
  addUiEvents,
  addUserEventAndRecalculateRewards,
  automaticStart,
  autoStartUser,
  claimAchievement,
  createUsers,
  deactivateUsers,
  deleteUsers,
  executeBulkUserAction,
  generateUserCSVFile,
  inviteUser,
  inviteUsers,
  migrateQuestMarkers,
  onboardCurrentUser,
  onboardUser,
  reactivateUsers,
  recalculateStats,
  removeFeatureFromUser,
  resetUserGame,
  resetUsersRoles,
  selfOnboardCurrentUser,
  sendQuestsToEmails,
  setRoleForUser,
  setUserProperties,
  setUsersForOnboardingBackfill,
  softDeleteUser,
  startGameForCurrentUser,
  toggleActive,
  toggleGameMode,
  undoSoftDeleteUser,
  unlinkPlugin,
  updateUser,
  updateUserFingerprint,
  upsertUser,
} from '@server/api/graphql/resolvers/mutations/userMutations';
import { IOrganization } from '@server/collections/organizations';
import {
  IMongoParams,
  TMongoSelector,
} from '@server/domains/collection/lib/mongo/lib/models';
import { demoModeTemplateSelector } from '@server/domains/game/questTemplate/lib/demoTemplates.lib';
import { IFetchEphemeralUrlPayload } from '@server/domains/integration/virustotalAugment/lib/fetchEphemeralUrl.models';
import { EUserRole } from '@server/domains/lib/auth/roles';
import { mapCursor } from '@server/domains/lib/collectionFp';
import { withTaskRunnerRole } from '@server/domains/lib/contextWith';
import { THandlerContext } from '@server/domains/lib/models';
import { IUser } from '@server/lib/typedSchemas';
import { IDomain } from '@server/lib/typedSchemas/Organization/models';
import {
  EThreatState,
  EThreatWorkQueueDirection,
} from '@server/lib/typedSchemas/Threat/models';

import { createConnection } from '../connection';
import {
  getExtensionsMongoSelector,
  TExtensionArgs,
} from '../extensions/applyExtensions';
import {
  assignThreatsWith,
  authenticatedResolver,
  createResolver,
  defaultIdSelectorForOrganization,
  defaultOrganizationIdSelector,
  defaultReporterUserIdSelector,
  defaultUserIdSelector,
  defaultUserIdSelectorExemptSuperAdmin,
  getSetOfThreatsByBaselineThreat,
  overrideQueryParams,
  resolveUser,
} from '../utils';

import { updateChallenge } from './mutations/challengeMutations';
import updateDomain from './mutations/domainMutations';
import {
  addLastNpsSurveyAskedAtForCurrentUser,
  createNpsAnswer,
} from './mutations/npsMutations';
import {
  createQuestTemplate,
  deleteQuestTemplate,
  toggleQuestTemplatePublicationStatus,
  toggleQuestTemplateSoftDeletion,
  updateQuestTemplate,
} from './mutations/questTemplateMutations';
import {
  createQuizModule,
  deleteQuizModule,
  updateQuizModule,
} from './mutations/quizModuleMutations';
import {
  actOnQuizObjective,
  actOnQuizPreview,
} from './mutations/quizMutations';
import {
  createQuizTemplate,
  deleteQuizTemplate,
  updateQuizTemplate,
} from './mutations/quizTemplateMutations';
import { toggleThreatResourceIsMalicious } from './mutations/threatResources';
import { previewQuiz } from './quizTemplate';
import { resolveResult } from './result';

const STATISTICS = 'statistics';

const getRelatedThreatIds = async (
  ctx: THandlerContext,
  threatId: string,
  organizationIdSelector: TMongoSelector<unknown>
) => {
  const threat = await ctx.handlers.collection.threat.get(ctx, {
    id: threatId,
  });
  if (threat.assignedSimilarityGroup) {
    return ctx.handlers.collection.threat
      .find(ctx, {
        params: {
          selector: {
            'assignedSimilarityGroup.id': threat.assignedSimilarityGroup.id,
            organizationId: organizationIdSelector,
          },
          options: {
            fields: {
              _id: 1,
            },
          },
        },
      })
      .then(mapCursor(t => t._id));
  }
  return [];
};

const PRIVILEGED_ROLES = [
  EUserRole.ADMIN,
  EUserRole.SUPER_ADMIN,
  EUserRole.HOXHUNT_THREAT_ANALYST,
];

const isPrivilegedIdentity = (ctx: THandlerContext) =>
  PRIVILEGED_ROLES.some(ctx.identity.hasRole);

const filterEmailDomains = (user: IUser, organization: IOrganization) => {
  const userEmailDomain = user.emails[0].address.split('@')[1];

  return R.evolve(
    { domains: R.filter((domain: IDomain) => domain.name === userEmailDomain) },
    organization
  );
};

export const shouldRetrieveField = (
  field: string,
  fieldsQueried: string[]
): boolean => R.includes(field, fieldsQueried);

export const excludeFieldAndGetNewParams = (
  field: string,
  oldParams: IMongoParams
): IMongoParams => R.assocPath(['options', 'fields', field], 0, oldParams);

export default () => ({
  Query: {
    app: () => ({}),
    currentUser: createResolver(async (root, args, ctx) => {
      const { _id, organizationId } = ctx.identity;
      if (!_id) {
        return null;
      }
      return resolveUser(ctx, _id, organizationId);
    }),
    publicCurrentUser: createResolver(async (root, args, ctx) => {
      const { _id, organizationId } = ctx.identity;
      if (!_id) {
        return null;
      }
      return resolveUser(ctx, _id, organizationId);
    }),
    users: authenticatedResolver(
      async (root, args: TExtensionArgs<{ search?: string }>, ctx) => {
        const searchString = args.search || '';
        const params = R.pipe(
          getExtensionsMongoSelector,
          defaultOrganizationIdSelector(ctx)
        )(args);
        const result = await ctx.handlers.user.search.findUsersBySearchString(
          ctx,
          {
            params,
            searchString,
          }
        );
        return result.users;
      }
    ),
    quests: authenticatedResolver(async (root, args: TExtensionArgs, ctx) => {
      const params = R.pipe(
        getExtensionsMongoSelector,
        defaultOrganizationIdSelector(ctx),
        defaultUserIdSelector(ctx)
      )(args);
      const quests = await ctx.handlers.collection.quest.find(ctx, { params });
      return quests.fetch();
    }),
    pluginConnection: authenticatedResolver(
      async (root, args: TExtensionArgs, ctx, info) => {
        const params = R.pipe(
          getExtensionsMongoSelector,
          defaultUserIdSelector(ctx)
        )(args);
        return createConnection(
          ctx,
          ctx.handlers.collection.plugin,
          params,
          info
        );
      }
    ),
    vectorConnection: authenticatedResolver(
      async (org, args: TExtensionArgs, ctx, info) => {
        const params = R.pipe(
          getExtensionsMongoSelector,
          defaultOrganizationIdSelector(ctx),
          defaultUserIdSelector(ctx)
        )(args);

        return createConnection(
          ctx,
          ctx.handlers.collection.vector,
          params,
          info
        );
      }
    ),
    technicalTestTemplatesConnection: authenticatedResolver(
      async (root, args: TExtensionArgs, ctx, grapqhQLResolveInfo) => {
        const params = getExtensionsMongoSelector(args);
        return ctx.handlers.admin.technicalTesting.findTestTemplates(ctx, {
          grapqhQLResolveInfo,
          params,
        });
      }
    ),
    organizations: authenticatedResolver(
      async (root, args: TExtensionArgs, ctx): Promise<IOrganization[]> => {
        const queryParams = R.pipe(
          getExtensionsMongoSelector,
          defaultIdSelectorForOrganization(ctx)
        )(args);

        const promise = ctx.handlers.collection.organization
          .find(ctx, {
            params: queryParams,
          })
          .then(c => c.fetch());

        if (isPrivilegedIdentity(ctx)) {
          return promise;
        }

        // The query organization query for an unprivileged user will always return at most 1 organization
        const [[organization], queryingUser] = await Promise.all([
          promise,
          ctx.handlers.collection.user.get(ctx, {
            id: ctx.identity._id,
            params: {
              selector: {
                _id: ctx.identity._id,
                organizationId: ctx.identity.organizationId,
              },
              options: { fields: { 'emails.address': 1 } },
            },
          }),
        ]);

        // We need to retrieve the domain languages separately, bacause they're
        // not accessible to a user. Do not merge the two organization queries
        // into one, because that would expose sensitive organization data.
        const organizationWithDomains =
          await ctx.handlers.collection.organization.get(
            withTaskRunnerRole(ctx),
            {
              id: ctx.identity.organizationId,
              params: {
                selector: {},
                options: {
                  fields: {
                    'domains.name': 1,
                    'domains.allowedSimulationLanguages': 1,
                  },
                },
              },
            }
          );

        return [
          R.merge(
            organization,
            filterEmailDomains(queryingUser, organizationWithDomains)
          ),
        ];
      }
    ),
    huntingSearchJobs: authenticatedResolver(
      async (root, args: TExtensionArgs<{ incidentId: string }>, ctx) =>
        (
          await ctx.handlers.collection.huntingSearchJob.find(ctx, {
            params: overrideQueryParams(getExtensionsMongoSelector(args), {
              selector: {
                incidentId: args.incidentId,
              },
            }),
          })
        ).fetch()
    ),
    huntingSearchJobResults: authenticatedResolver(
      async (root, args: TExtensionArgs<{ incidentId: string }>, ctx) => {
        const searchJobs = await ctx.handlers.collection.huntingSearchJob
          .find(ctx, {
            params: {
              selector: {
                incidentId: args.incidentId,
              },
              options: {
                fields: {
                  _id: 1,
                },
              },
            },
          })
          .then(c => c.fetch());

        if (R.isEmpty(searchJobs)) {
          return [];
        }

        const jobIds = R.pluck('_id', searchJobs);

        const params = overrideQueryParams(getExtensionsMongoSelector(args), {
          selector: {
            huntingSearchJobIds: { $in: jobIds },
          },
          options: {
            sort: {
              timestamp: -1,
            },
          },
        });
        return (
          await ctx.handlers.collection.huntingSearchJobResult.find(ctx, {
            params,
          })
        ).fetch();
      }
    ),
    assignedThreats: authenticatedResolver(
      async (
        root,
        args: { newThreatCount: number; organizationId?: string },
        ctx
      ) => {
        const assignThreats = assignThreatsWith(ctx);
        const { _id: userId } = ctx.identity;
        const newThreatCount = R.prop('newThreatCount', args);
        const organizationId = R.propOr(null, 'organizationId', args);

        // get already assigned threats for user that are still valid
        const userAssignedThreatsNoRating = await ctx.handlers.collection.threat
          .find(ctx, {
            params: {
              selector: {
                'assignment.userId': userId,
                'assignment.expiresAt': { $gte: ctx.getGlobal('newDate')() },
                severity: { $exists: false },
              },
              options: { fields: { _id: 1 } },
            },
          })
          .then(c => c.fetch());

        // fetch new threats for user to rate
        const { threats: newPrioritizedThreats } =
          await ctx.handlers.threat.analysis.getPrioritisedListOfAnalysableThreats(
            ctx,
            organizationId
              ? { count: newThreatCount, organizationId }
              : { count: newThreatCount }
          );

        // assign the threats
        await Promise.all(
          userAssignedThreatsNoRating
            .concat(newPrioritizedThreats)
            .map(assignThreats)
        );

        return (
          await ctx.handlers.collection.threat.find(ctx, {
            params: {
              selector: {
                'assignment.userId': userId,
                'assignment.expiresAt': { $gte: ctx.getGlobal('newDate')() },
              },
            },
          })
        ).fetch();
      }
    ),
    feedbackRules: authenticatedResolver(
      async (root, args: TExtensionArgs, ctx) => {
        const params = R.pipe(defaultOrganizationIdSelector(ctx))(
          getExtensionsMongoSelector(args)
        );

        return ctx.handlers.collection.feedbackRule
          .find(ctx, {
            params,
          })
          .then(c => c.fetch());
      }
    ),
    userFeedbacks: authenticatedResolver(
      async (root, args: TExtensionArgs, ctx) => {
        const params = R.pipe(
          defaultOrganizationIdSelector(ctx),
          defaultUserIdSelectorExemptSuperAdmin(ctx)
        )(getExtensionsMongoSelector(args));

        return ctx.handlers.collection.userFeedback
          .find(ctx, {
            params,
          })
          .then(c => c.fetch());
      }
    ),
    threats: authenticatedResolver(
      async (root, args: TExtensionArgs<{ search?: string }>, ctx) => {
        const params = R.pipe(
          defaultReporterUserIdSelector(ctx),
          defaultOrganizationIdSelector(ctx)
        )(getExtensionsMongoSelector(args));

        const searchString = args.search || '';
        const { threats } =
          await ctx.handlers.threat.search.findThreatsBySearchString(ctx, {
            searchString,
            params,
          });
        return threats;
      }
    ),
    threatsAround: authenticatedResolver(
      async (
        root,
        args: TExtensionArgs<{
          threatId?: string;
          direction: EThreatWorkQueueDirection;
          first: number;
          campaignThreatId?: string;
        }>,
        ctx
      ) => {
        const { threatId, direction, first, campaignThreatId } = args;
        const queryParams = getExtensionsMongoSelector(args);

        const idToFetchAround = campaignThreatId || threatId;

        // If campaignThreatId is given, look up the campaign to get threatIds
        // With the new pipeline, instead of using threatSet, we use similarityGroup
        const relatedThreatIds = campaignThreatId
          ? await getRelatedThreatIds(
              ctx,
              campaignThreatId,
              queryParams.selector.organizationId
            )
          : [];

        const params = overrideQueryParams(queryParams, {
          selector: {
            state: EThreatState.THREAT_UPLOADED,
            'enrichments.version': { $exists: true },
            ...(campaignThreatId
              ? {
                  _id: {
                    $in: [idToFetchAround].concat(relatedThreatIds),
                  },
                }
              : {}),
          },
        });

        if (!idToFetchAround) {
          const cursor = await ctx.handlers.collection.threat.find(ctx, {
            params,
          });
          return cursor.fetch();
        }

        const threatCursor = await ctx.handlers.collection.threat.find(ctx, {
          params: {
            selector: {
              _id: idToFetchAround,
              organizationId: (params.selector as any).organizationId,
            },
          },
        });

        const [foundThreat] = await threatCursor.fetch();

        // If the threat cannot be found (e.g conflicting filter orgId and threatId)
        // Just fetch the list without any placement info
        if (!foundThreat) {
          const cursor = await ctx.handlers.collection.threat.find(ctx, {
            params,
          });
          return cursor.fetch();
        }

        if (direction === EThreatWorkQueueDirection.AROUND) {
          const limitHalfed = Math.floor(first / 2);
          const [older, newer] = await Promise.all([
            getSetOfThreatsByBaselineThreat(
              ctx,
              params,
              foundThreat,
              limitHalfed,
              EThreatWorkQueueDirection.OLD
            ),
            getSetOfThreatsByBaselineThreat(
              ctx,
              params,
              foundThreat,
              limitHalfed,
              EThreatWorkQueueDirection.NEW
            ),
          ]);
          return sortBy([...newer, ...older], 'createdAt');
        } else {
          return getSetOfThreatsByBaselineThreat(
            ctx,
            params,
            foundThreat,
            first,
            direction
          );
        }
      }
    ),
    threatObservables: authenticatedResolver(
      async (root, args: TExtensionArgs, ctx) => {
        const params = getExtensionsMongoSelector(args);
        const cursor = await ctx.handlers.collection.threatObservable.find(
          ctx,
          {
            params,
          }
        );
        return cursor.fetch();
      }
    ),
    questTemplates: authenticatedResolver(
      async (root, args: TExtensionArgs, ctx, info) => {
        let params = getExtensionsMongoSelector(args);

        if (!shouldRetrieveField(STATISTICS, fieldsList(info))) {
          params = excludeFieldAndGetNewParams(STATISTICS, params);
        }

        return ctx.handlers.collection.questTemplate
          .find(ctx, { params })
          .then(c => c.fetch())
          .then(R.reject(R.isNil));
      }
    ),
    // for super-admin tools
    demoQuestTemplates: authenticatedResolver(
      async (
        root,
        {
          organizationId,
          ...args
        }: { organizationId?: string } & TExtensionArgs,
        ctx,
        info
      ) => {
        let params = getExtensionsMongoSelector(args);

        params = {
          ...params,
          selector: {
            $and: [
              params.selector,
              demoModeTemplateSelector,
              {
                $or: [
                  { 'attributes.forOrganizations': { $exists: false } },
                  { 'attributes.forOrganizations': [] },
                  { 'attributes.forOrganizations': organizationId },
                ],
              },
            ],
          },
        };

        if (!shouldRetrieveField(STATISTICS, fieldsList(info))) {
          params = excludeFieldAndGetNewParams(STATISTICS, params);
        }

        return ctx.handlers.collection.questTemplate
          .find(ctx, { params })
          .then(c => c.fetch())
          .then(R.reject(R.isNil));
      }
    ),
    quizTemplates: authenticatedResolver(
      async (root, args: TExtensionArgs, ctx) => {
        const params = getExtensionsMongoSelector(args);

        return ctx.handlers.collection.quizTemplate
          .find(ctx, { params })
          .then(c => c.fetch());
      }
    ),
    quizModules: authenticatedResolver(
      async (root, args: TExtensionArgs, ctx) => {
        const params = getExtensionsMongoSelector(args);

        return ctx.handlers.collection.quizModule
          .find(ctx, { params })
          .then(c => c.fetch());
      }
    ),
    markers: authenticatedResolver(async (root, args: TExtensionArgs, ctx) => {
      const params = getExtensionsMongoSelector(args);
      const cursor = await ctx.handlers.collection.marker.find(ctx, { params });
      return cursor.fetch();
    }),
    taskGroups: authenticatedResolver((root, args: TExtensionArgs, ctx) => {
      const params = R.pipe(
        getExtensionsMongoSelector,
        defaultOrganizationIdSelector(ctx)
      )(args);

      return ctx.handlers.collection.taskGroup
        .find(ctx, { params })
        .then(cursor => cursor.fetch());
    }),
    incidents: authenticatedResolver(
      async (root, args: TExtensionArgs<{ search?: string }>, ctx) => {
        const searchString = args.search || '';
        const params = R.pipe(
          getExtensionsMongoSelector,
          defaultOrganizationIdSelector(ctx)
        )(args);
        const result =
          await ctx.handlers.threat.search.findIncidentsBySearchString(ctx, {
            params,
            searchString,
          });
        return result.incidents;
      }
    ),
    leaderboard: resolveLeaderboard,
    enrichedLeaderboardUserRows: enrichedLeaderboardUserRows,
    tags: authenticatedResolver(async (root, args, ctx) => {
      return ctx.handlers.collection.tag.find(ctx, {});
    }),
    vectorTags: authenticatedResolver(async (root, args, ctx) => {
      return ctx.handlers.collection.tag.findVectorTag(ctx, {});
    }),
    signinData: createResolver(
      async (root, args: { emailAddress: string }, ctx) => {
        return ctx.handlers.infrastructure.auth.getSigninData(ctx, {
          userEmail: args.emailAddress,
        });
      }
    ),
    zendeskLoginToken: authenticatedResolver((root, args, ctx) => {
      return ctx.handlers.integration.zendesk.createToken(ctx, {});
    }),
    compiledQuestTemplateEmail: authenticatedResolver(
      (root, { emailTemplate, organizationIdForContext }, ctx) => {
        return ctx.handlers.game.questTemplate.compileQuestTemplatePreview(
          ctx,
          {
            emailTemplate,
            useExampleContext: false,
            organizationIdForContext,
          }
        );
      }
    ),
    compiledTemplateString: authenticatedResolver(
      async (root, { templateString, translations = [] }, ctx) => {
        const { result } =
          await ctx.handlers.game.questTemplate.compileQuestTemplateString(
            ctx,
            {
              templateString,
              translations,
              useExampleContext: false,
            }
          );

        return result;
      }
    ),
    signedCloudinaryUploadParams: authenticatedResolver(
      async (root, { params }, ctx) => {
        const result = await ctx.handlers.integration.cloudinary.signUpload(
          ctx,
          params
        );
        return result.signedUploadParams;
      }
    ),
    ranks: authenticatedResolver((root, args, ctx) =>
      ctx.handlers.collection.rank.find(ctx, {})
    ),
    quizTemplatePreview: previewQuiz,
    result: resolveResult,
    fetchVtAugmentEphemeralUrl: authenticatedResolver(
      (root, args: IFetchEphemeralUrlPayload, ctx) =>
        ctx.handlers.integration.virustotalAugment
          .fetchEphemeralUrl(ctx, args)
          .then(({ url }) => url)
    ),
  },
  Mutation: {
    deleteOrganization,
    createOrganization,
    sendQuestToOrganization,
    technicalTestQuestSendToUser,
    technicalTestQuestRemoveAll,
    updateOrganization,
    updateOrganizationIncidentPolicySettings,
    updateOrganizationThresholdIncidentPolicySettings:
      updateOrganizationIncidentPolicySettings,
    toggleThreatResourceIsMalicious,
    updateOrganizationIncidentSettings,
    createOrganizationScimToken,
    initHuntingSearchAndDestroySettings,
    inviteUnstartedUsers,
    startGameForUnstartedUsers,
    createUsers,
    updateUser,
    upsertUser,
    deleteUsers,
    deactivateUsers,
    reactivateUsers,
    addUiEvents,
    addUserEventAndRecalculateRewards,
    createOrUpdateMarker,
    deleteMarker,
    trackClientMetrics,
    updateIncidentState,
    addIncidentNote,
    deleteIncidentNote,
    updateIncidentNote,
    updateUserFingerprint,
    watchMarkers,
    deleteThreat,
    rateThreat,
    processThreat,
    userReceivedRatingInInstantFeedback,
    startGameForCurrentUser,
    selfOnboardCurrentUser,
    executeBulkUserAction,
    sendQuestsToEmails,
    sendQuestToCurrentUser,
    deleteQuest,
    createToken,
    revokeToken,
    revokeAllTokens,
    updateChallenge,
    onboardCurrentUser,
    onboardUser,
    inviteUser,
    inviteUsers,
    automaticStart,
    addRoleForUsers,
    resetUsersRoles,
    setRoleForUser,
    toggleGameMode,
    setUserProperties,
    generateUserCSVFile,
    toggleActive,
    createQuestTemplate,
    updateQuestTemplate,
    deleteQuestTemplate,
    toggleQuestTemplateSoftDeletion,
    toggleQuestTemplatePublicationStatus,
    createQuizTemplate,
    updateQuizTemplate,
    deleteQuizTemplate,
    createQuizModule,
    updateQuizModule,
    deleteQuizModule,
    migrateQuestMarkers,
    setUsersForOnboardingBackfill,
    recalculateStats,
    resetUserGame,
    addGeolocation,
    claimAchievement,
    unlinkPlugin,
    startHuntingSearchJob,
    startHuntingEmailDeletion,
    revertHuntingEmailDeletion,
    huntingSearchJobResultsSeen,
    actOnQuizPreview,
    actOnQuizObjective,
    createNpsAnswer,
    addLastNpsSurveyAskedAtForCurrentUser,
    updateDomain,
    updateOrganizationQuizModule,
    updateOrganizationQuizModuleTemplate,
    updateOrganizationPluginRedirect,
    updateOrganizationPluginSettings,
    updateOrganizationThreatSettings,
    setOrgQuizNewContentOnByDefault,
    removeGameCooldownFromOrganizationUsers,
    setDemoMode,
    setOrganizationDkim,
    setOrganizationGmailIntegration,
    removeOrganizationDomain,
    addFeatureForUser,
    removeFeatureFromUser,
    addFeatureForOrganization,
    removeFeatureFromOrganization,
    recalculateAchievementCompletion,
    upsertOrganizationTrainingRule,
    createFeedbackRule,
    updateFeedbackRule,
    removeFeedbackRule,
    createInstantFeedbackUserFeedback,
    updateUserFeedback,
    softDeleteUser,
    undoSoftDeleteUser,
    autoStartUser,
    addGoogleClientId,
    removeGoogleClientId,
    startOrganizationOnboarding,
    organizationOnboardingTaskMarkCompleted,
    organizationLaunchTraining,
    scheduleStatRecalculationTasksForOrganizations,
    updateOrganizationSecurityTeamName,
  },
});
