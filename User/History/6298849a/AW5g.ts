import { fieldsList } from 'graphql-fields-list';
import moment from 'moment';
import R from 'ramda';

import {
  excludeFieldAndGetNewParams,
  shouldRetrieveField,
  STATISTICS,
} from '@server/api/graphql/resolvers/root';
import { INTRODUCTION_SEQUENCE_BASE_TAGS } from '@server/core/game/questEngine/lib';
import { TMongoSelector } from '@server/domains/collection/lib/mongo/lib/models';
import { ERankName } from '@server/domains/collection/rank/lib/ranks.models';
import { fetchCursor } from '@server/domains/lib/collectionFp';
import { withTaskRunnerRole } from '@server/domains/lib/contextWith';
import { expandQuestTemplatesSearchString } from '@server/domains/questTemplate/search/lib/findQuestTemplatesBySearchString.lib';
import { constructThreatSelector } from '@server/domains/threat/search/findThreatsBySearchString';
import { expandUsersSearchString } from '@server/domains/user/search/lib/findUsersBySearchString.lib';
import { IQuizModule } from '@server/lib/typedSchemas';
import {
  EIncidentPolicyName,
  EIncidentState,
} from '@server/lib/typedSchemas/Incident/models';
import {
  IOrganization,
  IOrgQuizModule,
  ISSOSettings,
  TIncidentPolicySettings,
} from '@server/lib/typedSchemas/Organization/models';
import { EQuestState } from '@server/lib/typedSchemas/Quest/models';

import { RANKS } from '../../../domains/collection/rank/lib/ranks';
import { createConnection } from '../connection';
import {
  getExtensionsMongoSelector,
  TExtensionArgs,
} from '../extensions/applyExtensions';
import {
  authenticatedResolver,
  createResolver,
  overrideQueryParams,
  resolveX509CertInfo,
  TResolver,
} from '../utils';

const valuesToFilter = ['not:open', 'is:open', 'not:resolved', 'is:resolved'];

const openOrResolvedValues = (token: string) => !valuesToFilter.includes(token);

const excludeIncidentStateFilters = R.pipe(
  R.split(' '),
  R.filter(openOrResolvedValues),
  R.join(' ')
);

const enrichQuizModuleFields = (
  quizModules: Array<Pick<IQuizModule, '_id' | 'name'>>,
  orgQuizModules: IOrgQuizModule[]
) => {
  return orgQuizModules.map(om => {
    const moduleDef = quizModules.find(qm => qm._id === om.moduleId);

    return {
      ...om,
      ...{ name: moduleDef.name },
    };
  });
};

export const getUserCountResolver = <TArgs = unknown>(
  getSelector: TResolver<IOrganization, TArgs, TMongoSelector<unknown>>
) =>
  authenticatedResolver(async (org: IOrganization, args: TArgs, ctx) =>
    ctx.handlers.collection.user
      .find(withTaskRunnerRole(ctx), {
        params: {
          selector: {
            ...getSelector(org, args, ctx),
            organizationId: org._id,
          },
          options: {
            fields: {
              _id: 1,
            },
          },
        },
      })
      .then(c => c.count())
  );

export default () => ({
  Organization: {
    users: authenticatedResolver(
      async (
        org: IOrganization,
        args: TExtensionArgs<{ search?: string }>,
        ctx
      ) => {
        const queryParams = getExtensionsMongoSelector(args);
        const searchString = args.search || '';

        const params = overrideQueryParams(queryParams, {
          selector: { organizationId: org._id },
        });

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
    usersConnection: authenticatedResolver(
      async (
        org: IOrganization,
        args: TExtensionArgs<{ search?: string }>,
        ctx,
        info
      ) => {
        const queryParams = getExtensionsMongoSelector(args);

        const params = overrideQueryParams(queryParams, {
          selector: {
            ...expandUsersSearchString(
              ctx,
              { organizationId: org._id },
              args.search || ''
            ).userSelector,
            organizationId: org._id,
          },
        });

        return createConnection(
          ctx,
          ctx.handlers.collection.user,
          params,
          info
        );
      }
    ),
    questsConnection: authenticatedResolver(
      async (org: IOrganization, args: TExtensionArgs, ctx, info) => {
        const queryParams = getExtensionsMongoSelector(args);

        const params = overrideQueryParams(queryParams, {
          selector: {
            organizationId: org._id,
          },
        });

        return createConnection(
          ctx,
          ctx.handlers.collection.quest,
          params,
          info
        );
      }
    ),
    threatsConnection: authenticatedResolver(
      async (
        org: IOrganization,
        args: TExtensionArgs<{ search?: string }>,
        ctx,
        info
      ) => {
        const params = getExtensionsMongoSelector(args);

        const paramsWithOrgId = R.mergeDeepRight(
          {
            selector: { organizationId: org._id },
          },
          params
        );

        const threatSelector = await constructThreatSelector(ctx, {
          params: paramsWithOrgId,
          searchString: args.search || '',
        });

        const finalParams = overrideQueryParams(params, {
          selector: threatSelector,
        });

        return createConnection(
          ctx,
          ctx.handlers.collection.threat,
          finalParams,
          info
        );
      }
    ),
    benchmarkQuestTemplatesConnection: authenticatedResolver(
      async (
        organization: IOrganization,
        args: TExtensionArgs,
        ctx,
        grapqhQLResolveInfo
      ) => {
        const params = getExtensionsMongoSelector(args);

        return ctx.handlers.questTemplate.benchmark.findTemplates(ctx, {
          grapqhQLResolveInfo,
          organization,
          params,
        });
      }
    ),
    questTemplatesConnection: authenticatedResolver(
      async (
        org: IOrganization,
        args: TExtensionArgs<{ search?: string }>,
        ctx,
        info
      ) => {
        let queryParams = getExtensionsMongoSelector(args);

        if (!shouldRetrieveField(STATISTICS, fieldsList(info))) {
          queryParams = excludeFieldAndGetNewParams(STATISTICS, queryParams);
        }

        const params = overrideQueryParams(queryParams, {
          selector: {
            isActive: true,
            $and: [
              queryParams.selector,
              {
                $or: [
                  { 'attributes.forOrganizations': { $exists: false } },
                  { 'attributes.forOrganizations': [] },
                  { 'attributes.forOrganizations': org._id },
                ],
              },
            ],
          },
        });

        const combinedParams = {
          ...params,
          selector: R.mergeWith(
            R.concat,
            params.selector,
            (await expandQuestTemplatesSearchString(ctx, args.search || ''))
              .questTemplateSelector || {}
          ),
        };

        return createConnection(
          ctx,
          ctx.handlers.collection.questTemplate,
          combinedParams,
          info
        );
      }
    ),
    trainingRules: authenticatedResolver(
      async (org: IOrganization, args: TExtensionArgs, ctx, info) => {
        const queryParams = getExtensionsMongoSelector(args);

        const params = overrideQueryParams(queryParams, {
          selector: {
            organizationId: org._id,
          },
        });

        return createConnection(
          ctx,
          ctx.handlers.collection.organizationTrainingRule,
          params,
          info
        );
      }
    ),
    threats: authenticatedResolver(
      async (org: IOrganization, args: TExtensionArgs, ctx) => {
        const queryParams = getExtensionsMongoSelector(args);

        const params = overrideQueryParams(queryParams, {
          selector: { organizationId: org._id },
        });

        const cursor = await ctx.handlers.collection.threat.find(ctx, {
          params,
        });

        return cursor.fetch();
      }
    ),

    incidentCount: authenticatedResolver(
      async (
        org: IOrganization,
        args: TExtensionArgs<{ search?: string }>,
        ctx
      ) => {
        let searchString = args.search;

        if (args.excludeIncidentStateFilters) {
          searchString = excludeIncidentStateFilters(searchString);
        }

        const params = overrideQueryParams(
          {},
          {
            selector: {
              organizationId: org._id,
            },
            options: {
              fields: {
                state: 1,
              },
            },
          }
        );

        const { incidents } =
          await ctx.handlers.threat.search.findIncidentsBySearchString(ctx, {
            params,
            searchString,
          });

        const { OPEN: open, RESOLVED: resolved } = R.reduce(
          (acc, { state }) =>
            R.pipe(R.prop(state), R.add(1), R.assoc(state, R.__, acc))(acc),
          { [EIncidentState.OPEN]: 0, [EIncidentState.RESOLVED]: 0 },
          incidents
        );

        return {
          resolved,
          open,
          total: R.add(open, resolved),
        };
      }
    ),
    quizModules: authenticatedResolver(
      async (org: IOrganization, args, ctx) => {
        const orgModules = await ctx.handlers.organization.quiz.getModules(
          ctx,
          {
            organizationId: org._id,
          }
        );

        const quizModules = await ctx.handlers.collection.quizModule
          .find(withTaskRunnerRole(ctx), {
            params: {
              selector: { _id: { $in: R.pluck('moduleId', orgModules) } },
              options: {
                fields: { name: 1, _id: 1, 'quizTemplates.state': 1 },
              },
            },
          })
          .then(c => fetchCursor<Pick<IQuizModule, '_id' | 'name'>>(c));

        return enrichQuizModuleFields(quizModules, orgModules);
      }
    ),
    incidents: authenticatedResolver(
      async (
        org: IOrganization,
        args: TExtensionArgs<{ search?: string }>,
        ctx
      ) => {
        const queryParams = getExtensionsMongoSelector(args);

        const params = overrideQueryParams(queryParams, {
          selector: { organizationId: org._id },
        });

        const searchString = args.search || '';

        const result =
          await ctx.handlers.threat.search.findIncidentsBySearchString(ctx, {
            params,
            searchString,
          });

        return result.incidents;
      }
    ),
    industry: authenticatedResolver(async (org: IOrganization, ctx) => {
      const params = { selector: { industryId: org.industryId } };
    }),
    plugin: (org: IOrganization) => {
      const { plugin, pluginRedirect } = org;

      return {
        ...plugin,
        redirect: pluginRedirect,
      };
    },
    userCount: getUserCountResolver(() => ({})),
    userCountForRank: getUserCountResolver((_, args: { rank: ERankName }) => ({
      'player.stars': {
        $gte: RANKS.find(r => r.name === args.rank).starsRequired,
      },
      'profile.hasEnforcedAnonymity': false,
    })),
    gameActiveCount: getUserCountResolver(() => ({ 'game.active': true })),
    onboardedCount: getUserCountResolver(() => ({
      'player.stats.total': { $gt: 0 },
    })),
    stuckInFirstQuestCount: authenticatedResolver(
      async (org: IOrganization, _, ctx) => {
        const users = await ctx.handlers.collection.user
          .find(ctx, {
            params: {
              selector: {
                organizationId: org._id,
                'player.stats.total': 0, // small optimization
              },
              options: {
                fields: {
                  _id: 1,
                },
              },
            },
          })
          .then(c => c.fetch());

        return ctx.handlers.collection.quest
          .find(ctx, {
            params: {
              selector: {
                userId: { $in: users.map(u => u._id) },
                tag: { $regex: `^${INTRODUCTION_SEQUENCE_BASE_TAGS[0]}` },
                state: EQuestState.QUEST_STATE_STARTED,
                startsAt: {
                  $lte: moment().subtract(1, 'days').toDate(),
                },
                updatedAt: {
                  $lte: moment().subtract(1, 'days').toDate(),
                },
              },
            },
          })
          .then(c => c.count());
      }
    ),
    sentVectorCount: authenticatedResolver(
      async (org: IOrganization, _, ctx) => {
        const count = await ctx.handlers.collection.user
          .find(ctx, {
            params: {
              selector: {
                organizationId: org._id,
                'player.stats.total': { $gt: 0 }, // small optimization
              },
            },
          })
          .then(cursor => {
            const userIds = cursor.map(user => user._id);

            return ctx.handlers.collection.vector
              .find(ctx, {
                params: {
                  selector: {
                    userId: { $in: userIds },
                    createdAt: {
                      $gte: moment().subtract(7, 'days').toDate(),
                    },
                  },
                  options: {
                    fields: {
                      _id: 1,
                    },
                  },
                },
              })
              .then(c => c.count());
          });

        return count;
      }
    ),
    huntingSearchAndDestroyDeploymentUrl: authenticatedResolver(
      async (_, { fullDeployment }, ctx) => {
        const { url } =
          await ctx.handlers.integration.azure.getResourceTemplateUrl(ctx, {
            fullDeployment,
          });

        return url;
      }
    ),
    departments: authenticatedResolver(
      async (org: IOrganization, args, ctx) => {
        return (
          (await ctx.handlers.collection.user.distinct(ctx, {
            key: 'profile.department',
            selector: {
              organizationId: org._id,
            },
          })) as string[]
        ).filter(department => department);
      }
    ),
    countries: authenticatedResolver(async (org: IOrganization, args, ctx) => {
      return (
        (await ctx.handlers.collection.user.distinct(ctx, {
          key: 'profile.country',
          selector: {
            organizationId: org._id,
          },
        })) as string[]
      ).filter(country => country);
    }),
    sites: authenticatedResolver(async (org: IOrganization, args, ctx) => {
      return (
        (await ctx.handlers.collection.user.distinct(ctx, {
          key: 'profile.site',
          selector: {
            organizationId: org._id,
          },
        })) as string[]
      ).filter(site => site);
    }),
    cities: authenticatedResolver(async (org: IOrganization, args, ctx) => {
      return (
        (await ctx.handlers.collection.user.distinct(ctx, {
          key: 'profile.city',
          selector: {
            organizationId: org._id,
          },
        })) as string[]
      ).filter(city => city);
    }),
    organizationOnboardingTasksConnection: authenticatedResolver(
      async (org: IOrganization, args: TExtensionArgs, ctx, info) => {
        const queryParams = getExtensionsMongoSelector(args);

        const params = overrideQueryParams(queryParams, {
          selector: {
            organizationId: org._id,
          },
        });

        return createConnection(
          ctx,
          ctx.handlers.collection.organizationOnboardingTask,
          params,
          info
        );
      }
    ),
    licenseSets: createResolver((org: IOrganization, args, ctx) =>
      ctx.handlers.admin.licenses.getOrgLicenseSets(ctx, {
        organizationId: org._id,
      })
    ),
  },
  OrgSsoSettings: {
    certInfo: createResolver((sso: ISSOSettings, args, ctx) =>
      sso.cert ? resolveX509CertInfo(ctx, sso.cert) : undefined
    ),
  },
  IncidentPolicySettings: {
    __resolveType: (policySettings: TIncidentPolicySettings) => {
      switch (policySettings.policyName) {
        case EIncidentPolicyName.USER_ACTED_ON_THREAT:
          return 'DefaultIncidentPolicySettings';
        default:
          return 'ThresholdIncidentPolicySettings';
      }
    },
  },
});
