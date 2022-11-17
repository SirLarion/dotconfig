import { get, merge } from 'lodash';
import R from 'ramda';

import { TMongoSelector } from '@server/domains/collection/lib/mongo/lib/models';
import { EUserRole } from '@server/domains/lib/auth/roles';
import { cursorIsNotEmpty } from '@server/domains/lib/collectionFp';
import {
  EOrgRegion,
  IIncidentPolicySettings,
  IOrganization,
} from '@server/lib/typedSchemas/Organization/models';

import { IFindPayload, TFindContext } from './find.models';
import { IGetPayload, TGetContext } from './get.models';
import { TIncidentPolicySanitationContext } from './models';
import { IRemovePayload, TRemoveContext } from './remove.models';
import { errorAlreadyExists } from '@server/util/error';
import { TPatchContext } from './patch.models';

type TCollectionsToRemove =
  | 'feedbackRule'
  | 'huntingSearchJob'
  | 'organizationTrainingRule'
  | 'analyticsEvent'
  | 'organizationOnboardingTask'
  | 'incidentBeta';

export const removeAllWithSelector = async <T extends TCollectionsToRemove>(
  ctx: TRemoveContext,
  serviceName: T,
  selector: TMongoSelector<any>
) => {
  const service = ctx.handlers.collection[serviceName];

  const cursor = await service.find(ctx, {
    params: { selector },
  });

  const result = [];
  for (const doc of await cursor.fetch()) {
    result.push(await service.remove(ctx, { id: doc._id }));
  }

  return result;
};

const sanitizeIncidentTemplate =
  (ctx: TIncidentPolicySanitationContext) =>
  async (policy: IIncidentPolicySettings): Promise<IIncidentPolicySettings> => {
    if (!policy.emailTemplate) {
      return policy;
    }

    const body = await ctx.handlers.security.validation.sanitizeHtml(ctx, {
      htmlString: policy.emailTemplate.body,
      params: {
        capabilities: { blockLinks: false },
      },
    });

    return {
      ...policy,
      emailTemplate: {
        ...policy.emailTemplate,
        body,
      },
    };
  };

const sanitizeIncidentSettings =
  (ctx: TIncidentPolicySanitationContext) =>
  (policies: IIncidentPolicySettings[]): Promise<IIncidentPolicySettings[]> => {
    return Promise.all(policies.map(sanitizeIncidentTemplate(ctx)));
  };

const validateDomainSettings = (
  ctx: TPatchContext,
  data: DeepPartial<IOrganization>
) => {
  if (data.domains) {
    if (
      data.domains.length !== R.uniqBy(({ name }) => name, data.domains).length
    ) {
      throw errorAlreadyExists();
    }
  }
};

export const sanitizeData = <T extends DeepPartial<IOrganization>>(
  ctx: TIncidentPolicySanitationContext,
  data: T
): Promise<T> => {
  validateDomainSettings(data);
  return sanitizeIncidentSettings(ctx)(
    get(data, 'incidentSettings.policies', [])
  ).then(policies =>
    merge({}, data, policies.length ? { incidentSettings: { policies } } : {})
  );
};

export const organizationHasUsers = async (
  ctx: TRemoveContext,
  { id }: IRemovePayload
) => {
  return ctx.handlers.collection.user
    .find(ctx, {
      params: {
        selector: { organizationId: id },
        options: { limit: 1 },
      },
    })
    .then(cursorIsNotEmpty);
};

export const removeOrganizationFeedbackRules = async (
  ctx: TRemoveContext,
  payload: IRemovePayload
) => removeAllWithSelector(ctx, 'feedbackRule', { organizationId: payload.id });

export const removeOrganizationHuntingSearchJobs = async (
  ctx: TRemoveContext,
  payload: IRemovePayload
) =>
  removeAllWithSelector(ctx, 'huntingSearchJob', {
    organizationId: payload.id,
  });
export const removeOrganizationTrainingRules = async (
  ctx: TRemoveContext,
  { id }: IRemovePayload
) =>
  removeAllWithSelector(ctx, 'organizationTrainingRule', {
    organizationId: id,
  });

export const removeOrganizationAnalyticsEvents = async (
  ctx: TRemoveContext,
  { id }: IRemovePayload
) =>
  removeAllWithSelector(ctx, 'analyticsEvent', {
    organizationId: id,
  });

export const removeOrganizationOnboardingTasks = async (
  ctx: TRemoveContext,
  { id }: IRemovePayload
) =>
  removeAllWithSelector(ctx, 'organizationOnboardingTask', {
    organizationId: id,
  });

export const removeOrganizationIncidents = async (
  ctx: TRemoveContext,
  { id }: IRemovePayload
) =>
  removeAllWithSelector(ctx, 'incidentBeta', {
    organizationId: id,
  });

/**
 *
 * (hopefully) temporary quick win to clamp organizations
 * so we can show only US customers to certain people
 * @param ctx
 * @param payload
 * @returns
 */
export const addRegionSelectorForUSOnlyContext = <
  T extends IFindPayload | IGetPayload
>(
  ctx: TFindContext | TGetContext,
  payload: T
): T => {
  if (!ctx.identity.hasRole(EUserRole.US_REGION_ONLY)) {
    return payload;
  }

  const ownOrgOrUSSelector = {
    $or: [{ _id: ctx.identity.organizationId }, { region: EOrgRegion.US }],
  };

  // Use $and to avoid messing with the original selector
  const updatedSelector = {
    $and: [payload.params?.selector, ownOrgOrUSSelector].filter(
      selector => selector !== undefined
    ),
  };

  return R.assocPath(['params', 'selector'], updatedSelector, payload);
};
