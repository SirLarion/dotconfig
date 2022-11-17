import R from 'ramda';

import { authenticatedResolver } from '@server/api/graphql/utils';
import { runHandlerWithTaskRunnerRole } from '@server/core/tasks/lib';
import { IPatchPayload } from '@server/domains/collection/organization/lib/patch.models';
import { ISetDemoModePayload } from '@server/domains/game/organization/lib/setDemoMode.models';
import { THandlerContext } from '@server/domains/lib/models';
import serverIntl from '@server/intl';
import { EServerEvent } from '@server/lib/analyticEvents';
import { EBulkUserActionKind } from '@server/lib/bulkUserActions';
import { ITag } from '@server/lib/typedSchemas';
import {
  IOrganization,
  TIncidentPolicySettings,
} from '@server/lib/typedSchemas/Organization/models';
import { errorInvalidArgument } from '@server/util/error';

import {
  createMutationError,
  getBadIncidentTemplateVariable,
  isUnknownVariableException,
  shouldValidateCustomIncidentEmailTemplate,
  validateCustomIncidentEmailTemplate,
} from './utils';

type TOrganizationUpdateAnalyticsArgs = {
  organizationId: string;
  organizationBeforePatch: IOrganization;
  organizationAfterPatch: IOrganization;
  organizationInput: Partial<IOrganization>;
};

export const createOrganization = authenticatedResolver(
  async (root, { organization }, ctx) => {
    return ctx.handlers.collection.organization.create(ctx, {
      data: organization,
    });
  }
);

const getThreatAnalysisPriority = (
  org: Pick<IOrganization, 'threatSettings'>
) => R.path(['threatSettings', 'threatAnalysisPriority'], org) || null;

const isSettingThreatAnalysisPriority: (organizationInput: unknown) => boolean =
  R.pipe(getThreatAnalysisPriority, R.complement(R.isNil));

const trackThreatAnalysisPrioritySettingAnalytics =
  (ctx: THandlerContext, { organizationId }: { organizationId: string }) =>
  (org: Pick<IOrganization, 'threatSettings'>) =>
    ctx.handlers.analytics.sink
      .track(
        ctx,
        ctx.getGlobal('analytics').buildEvent({
          event:
            EServerEvent.RESPONSE_ORGANIZATION_THREAT_ANALYSIS_PRIORITY_ASSIGNED,
          userId: ctx.identity._id,
          properties: {
            organizationId,
            threatAnalysisPriority: getThreatAnalysisPriority(org),
          },
        })
      )
      .catch(() => {});

const handleThreatAnalysisPrioritySettingAnalytics = (
  ctx: THandlerContext,
  {
    organizationId,
    organization,
  }: { organizationId: string; organization: DeepPartial<IOrganization> }
) =>
  R.when(
    isSettingThreatAnalysisPriority,
    trackThreatAnalysisPrioritySettingAnalytics(ctx, { organizationId })
  )(organization);

const trackFeatureFlagAnalytics =
  (ctx: THandlerContext, organizationId: string) =>
  ({ feature, event }: { feature: string; event: EServerEvent }) =>
    ctx.handlers.analytics.sink
      .track(
        ctx,
        ctx.getGlobal('analytics').buildEvent({
          event,
          userId: ctx.identity._id,
          properties: {
            organizationId,
            featureFlagName: feature,
          },
        })
      )
      .catch(() => {});

const mapWithAnalyticsEvent =
  (event: EServerEvent) => (feature: ITag<'features'>) => ({
    feature: feature.name,
    event,
  });

const handleFeatureFlagAnalytics = (
  ctx: THandlerContext,
  {
    organizationBeforePatch,
    organizationAfterPatch,
    organizationInput,
    organizationId,
  }: TOrganizationUpdateAnalyticsArgs
) => {
  if (!organizationInput?.features) {
    return;
  }
  const trackFeatureFlagEvent = trackFeatureFlagAnalytics(ctx, organizationId);

  const [{ features: newFeatures }, { features: oldFeatures }] = [
    organizationAfterPatch,
    organizationBeforePatch,
  ];
  const featuresAdded = R.difference(newFeatures, oldFeatures);
  const featuresRemoved = R.difference(oldFeatures, newFeatures);

  const trackFeatureFlagEventsArray = R.pipe(
    R.concat(
      R.map(
        mapWithAnalyticsEvent(EServerEvent.ORGANIZATION_FEATURE_FLAG_ADDED),
        featuresAdded
      )
    ),
    R.concat(
      R.map(
        mapWithAnalyticsEvent(EServerEvent.ORGANIZATION_FEATURE_FLAG_REMOVED),
        featuresRemoved
      )
    )
  )([]);

  return trackFeatureFlagEventsArray.forEach(trackFeatureFlagEvent);
};

const handleOrganizationUpdateAnalytics = (
  ctx: THandlerContext,
  args: TOrganizationUpdateAnalyticsArgs
) => {
  handleThreatAnalysisPrioritySettingAnalytics(ctx, {
    organizationId: args.organizationId,
    organization: args.organizationInput,
  });
  handleFeatureFlagAnalytics(ctx, args);
};

export const updateOrganization = authenticatedResolver(
  async (root, { organizationId, organization }, ctx) => {
    const organizationBeforePatch =
      await ctx.handlers.collection.organization.get(ctx, {
        id: organizationId,
      });

    const organizationAfterPatch =
      await ctx.handlers.collection.organization.patch(ctx, {
        id: organizationId,
        data: organization,
      });

    handleOrganizationUpdateAnalytics(ctx, {
      organizationBeforePatch,
      organizationAfterPatch,
      organizationInput: organization,
      organizationId,
    });

    return organizationAfterPatch;
  }
);

export const deleteOrganization = authenticatedResolver(
  async (root, { organizationId }: { organizationId: string }, ctx) => {
    return ctx.handlers.collection.organization.remove(ctx, {
      id: organizationId,
    });
  }
);

export const inviteUnstartedUsers = authenticatedResolver(
  async (root, { organizationId }: { organizationId: string }, ctx) => {
    const taskQueue = await ctx.getTaskQueue();
    const identity = ctx.identity;

    return taskQueue.submitTaskGroup(
      ctx,
      ctx.handlers.game.email.inviteOrganizationsUnstartedUsers,
      {
        signature: 'game.email.inviteOrganizationsUnstartedUsers',
        userId: identity._id,
        organizationId: identity.organizationId,
        description: serverIntl.schedulePromotionEmails,
        tasks: [
          {
            args: {
              input: {
                callingUserId: identity._id,
                callingOrgId: identity.organizationId,
                targetOrganizationId: organizationId,
              },
            },
          },
        ],
      }
    );
  }
);

export const startGameForUnstartedUsers = authenticatedResolver(
  (root, { organizationId }: { organizationId: string }, ctx) =>
    ctx.getTaskQueue().then(taskQueue =>
      taskQueue.submitTaskGroup(
        ctx,
        ctx.handlers.game.user.startGameForOrganizationsUnstartedUsers,
        {
          signature: 'game.user.startGameForOrganizationsUnstartedUsers',
          userId: ctx.identity._id,
          organizationId: ctx.identity.organizationId,
          description: serverIntl.scheduleGameStartForUsers,
          tasks: [
            {
              args: {
                params: {
                  caller: {
                    userId: ctx.identity._id,
                    organizationId: ctx.identity.organizationId,
                  },
                  organizationId,
                },
              },
            },
          ],
        }
      )
    )
);

export const updateOrganizationIncidentSettings = authenticatedResolver(
  async (
    root,
    {
      organizationId,
      incidentSettings,
    }: {
      organizationId: string;
      incidentSettings: IPatchPayload['data']['incidentSettings'];
    },
    ctx
  ) =>
    ctx.handlers.collection.organization.patch(ctx, {
      id: organizationId,
      data: {
        incidentSettings,
      },
    })
);

export const updateOrganizationIncidentPolicySettings = authenticatedResolver(
  async (
    root,
    {
      organizationId,
      policySettings,
    }: { organizationId: string; policySettings: TIncidentPolicySettings },
    ctx
  ) => {
    const { incidentSettings } = await ctx.handlers.collection.organization.get(
      ctx,
      {
        id: organizationId,
      }
    );

    if (
      shouldValidateCustomIncidentEmailTemplate(
        policySettings,
        incidentSettings
      )
    ) {
      try {
        // if validation fails, error will be thrown
        await validateCustomIncidentEmailTemplate(ctx, policySettings);
      } catch (error) {
        if (isUnknownVariableException(error)) {
          throw errorInvalidArgument(
            ctx,
            `Bad variable found in the template body with the value of: ${getBadIncidentTemplateVariable(
              error
            )}`
          );
        }
        throw error;
      }
    }

    const policies = incidentSettings.policies
      .filter(({ policyName }) => policyName !== policySettings.policyName)
      .concat(policySettings);

    return ctx.handlers.collection.organization.patch(ctx, {
      id: organizationId,
      data: {
        incidentSettings: {
          ...incidentSettings,
          policies,
        },
      },
    });
  }
);

export const removeGameCooldownFromOrganizationUsers = authenticatedResolver(
  async (root, { organizationId }: { organizationId: string }, ctx) => {
    const users = await (
      await ctx.handlers.collection.user.find(ctx, {
        params: {
          selector: {
            organizationId,
          },
          options: {
            fields: {
              _id: 1,
            },
          },
        },
      })
    ).fetch();
    const emails = users.map(user => user.emails[0].address);

    return ctx.handlers.user.bulkAction.fanOut(ctx, {
      emails,
      actionKind: EBulkUserActionKind.REMOVE_GAME_COOLDOWN,
      userId: ctx.identity._id,
      organizationId: ctx.identity.organizationId,
    });
  }
);

export const setOrganizationGmailIntegration = authenticatedResolver(
  async (
    root,
    { useGmailDeliveryApi }: { useGmailDeliveryApi: boolean },
    ctx
  ) => {
    const userId = ctx.identity.getId();
    const organizationId = ctx.identity.getOrganizationId();

    const user = await ctx.handlers.collection.user.get(ctx, {
      id: userId,
      params: {
        selector: { organizationId },
      },
    });

    // If API is being activated, allow it only if there is connectivity to it
    if (useGmailDeliveryApi) {
      await runHandlerWithTaskRunnerRole(
        ctx,
        ctx.handlers.integration.gmail.fetchEmailDeliveryAccessToken,
        { organizationId, emailAddress: user.emails[0].address }
      );
    }

    await ctx.handlers.collection.organization.patch(ctx, {
      id: organizationId,
      data: {
        delivery: {
          email: {
            useGmailDeliveryApi,
          },
        },
      },
    });

    return useGmailDeliveryApi;
  }
);

export const setOrganizationDkim = authenticatedResolver(
  async (
    root,
    { organizationId, useDkim }: { organizationId: string; useDkim: boolean },
    ctx
  ) => {
    await ctx.handlers.collection.organization.patch(ctx, {
      id: organizationId,
      data: {
        delivery: {
          email: {
            useDkim,
          },
        },
      },
    });

    if (useDkim) {
      await runHandlerWithTaskRunnerRole(
        ctx,
        ctx.handlers.infrastructure.dkim.create,
        {
          organizationId,
        }
      );
    }

    return useDkim;
  }
);

export const createOrganizationScimToken = authenticatedResolver(
  async (root, { organizationId }: { organizationId: string }, ctx) => {
    const { token, payload } = await ctx.handlers.auth.scim.createScimToken(
      ctx,
      { organizationId }
    );

    await ctx.handlers.collection.organization.patch(ctx, {
      id: organizationId,
      data: {
        scim: {
          authToken: payload,
        },
      },
    });

    return { token };
  }
);

export const initHuntingSearchAndDestroySettings = authenticatedResolver(
  async (_, args, ctx) => {
    const { huntingApiUrl } =
      await ctx.handlers.threat.hunting.initializeSettings(ctx, args);

    return huntingApiUrl;
  }
);

export const recalculateAchievementCompletion = authenticatedResolver(
  async (_, { organizationId }, ctx) =>
    await runHandlerWithTaskRunnerRole(
      ctx,
      ctx.handlers.game.organization.updateAchievementAggregates,
      {
        organizationIds: [organizationId],
      }
    ).then(() => organizationId)
);

export const removeFeatureFromOrganization = authenticatedResolver(
  (root, args: { id: string; feature: string }, ctx) =>
    ctx.handlers.collection.organization.removeFeatureFromOrganization(ctx, {
      id: args.id,
      feature: args.feature,
    })
);

export const addFeatureForOrganization = authenticatedResolver(
  (root, args: { id: string; feature: string }, ctx) =>
    ctx.handlers.collection.organization.addFeatureForOrganization(ctx, {
      id: args.id,
      feature: args.feature,
    })
);

export const setDemoMode = authenticatedResolver(
  (root, args: ISetDemoModePayload, ctx) =>
    ctx.handlers.game.organization
      .setDemoMode(ctx, args)
      .then(R.prop('organization'))
);

export const addGoogleClientId = authenticatedResolver(
  async (
    root,
    args: {
      organizationId: string;
      clientId: string;
    },
    ctx
  ) => ctx.handlers.collection.organization.addGoogleClientId(ctx, args)
);

export const removeGoogleClientId = authenticatedResolver(
  async (
    root,
    args: {
      organizationId: string;
      clientId: string;
    },
    ctx
  ) => ctx.handlers.collection.organization.removeGoogleClientId(ctx, args)
);

export const scheduleStatRecalculationTasksForOrganizations =
  authenticatedResolver(
    async (
      root,
      args: {
        organizationIds: string[];
        usersPerMinute: number;
      },
      ctx
    ) =>
      ctx.handlers.game.user.scheduleStatRecalculationTasksForOrganizations(
        ctx,
        args
      )
  );

export const setOrganizationIndustry = authenticatedResolver(
  async (root, args: { organizationId: string; industryId: string }, ctx) => {
    const result = await ctx.handlers.collection.organization.patch(ctx, {
      id: organizationId,
      data: { industryId },
    });
  }
);

export const startOrganizationOnboarding = authenticatedResolver(
  async (
    root,
    args: {
      organizationId: string;
    },
    ctx
  ) => {
    try {
      const organization =
        await ctx.handlers.admin.organizationOnboarding.start(ctx, {
          organizationId: args.organizationId,
        });

      await ctx.handlers.admin.organizationOnboarding.sendOnboardingInvitationToAdmins(
        ctx,
        { organizationId: organization._id }
      );

      return {
        data: organization,
        errors: [],
      };
    } catch (err) {
      return { errors: [createMutationError(err)] };
    }
  }
);

export const organizationLaunchTraining = authenticatedResolver(
  async (
    root,
    args: {
      organizationId: string;
    },
    ctx
  ) => {
    try {
      const organization =
        await ctx.handlers.admin.organizationOnboarding.launchOrganization(
          ctx,
          {
            organizationId: args.organizationId,
          }
        );

      return {
        data: organization,
        errors: [],
      };
    } catch (err) {
      return { errors: [createMutationError(err)] };
    }
  }
);

export const updateOrganizationSecurityTeam = authenticatedResolver(
  async (
    root,
    { organizationId, securityTeamName, securityTeamEmailAddress },
    ctx
  ) =>
    ctx.handlers.collection.organization.patch(ctx, {
      id: organizationId,
      data: {
        threatSettings: {
          securityTeamName,
          securityTeamEmailAddress,
        },
      },
    })
);
