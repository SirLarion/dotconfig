import { isError } from 'lodash';
import { compact, flow, map, uniq } from 'lodash/fp';
import R from 'ramda';
import VError from 'verror';

import { HuntingSearchJobResults } from '@server/collections/huntingSearchJobResults';
import { IIncidentBeta } from '@server/collections/incidentBeta';
import {
  addDefaultContext,
  getIntl,
} from '@server/domains/integration/email/lib/build.lib';
import { THandlerContext } from '@server/domains/lib/models';
import { IIncidentEscalationInfo } from '@server/domains/threat/pipeline/lib/triggerEscalationNotification.models';
import { EServerEvent } from '@server/lib/analyticEvents';
import { ESupportedLocales } from '@server/lib/i18n';
import { EHuntingSearchJobResultState } from '@server/lib/typedSchemas/HuntingSearchJobResult/models';
import { EIncidentState } from '@server/lib/typedSchemas/Incident/models';
import { EIncidentEvent } from '@server/lib/typedSchemas/IncidentBeta/IncidentEvent';
import { IIncidentNote } from '@server/lib/typedSchemas/IncidentBeta/Note';
import {
  IIncidentSettings,
  TIncidentPolicySettings,
} from '@server/lib/typedSchemas/Organization/models';
import {
  EThreatClassification,
  EThreatSeverity,
} from '@server/lib/typedSchemas/Threat/models';

const mockCustomEmailTemplateContext = (
  ctx: THandlerContext,
  policySettings: TIncidentPolicySettings
): IIncidentEscalationInfo => ({
  humanReadableId: 'humanReadableId',
  firstReportedAt: ctx.getGlobal('newDate')(),
  incidentPolicyName: policySettings.policyName,
  incidentPath: 'http://incident.path',
  incidentType: R.toLower(policySettings.policyName),
  reporterCount: 1,
  threatSubject: 'Very dangerous threat',
  threatTimestamp: ctx.getGlobal('newDate')(),
  threatSender: 'Phishy sender',
  threatRecipients: [],
  threatAttachments: [],
  threatSeverity: EThreatSeverity.THREAT_SEVERITY_PHISH,
  classification: EThreatClassification.LIKELY_MALICIOUS,
  userActs: [],
  signedUrl: 'http://signed.url',
  reporterEmailAddresses: [],
  reporterFullNames: [],
});

export const getUniqueDomains = (emails: string[]): string[] =>
  flow(
    map((email: string) => email.split('@')),
    map(([, domain]: string[]) => domain),
    compact,
    uniq
  )(emails);

export const getSingleOrganizationByEmailDomains = async (
  ctx: THandlerContext,
  emailDomains: string[]
) =>
  ctx.handlers.collection.organization
    .find(ctx, {
      params: {
        selector: { 'domains.name': { $in: emailDomains } },
        options: { limit: 2 },
      },
    })
    .then(result => result.fetch())
    .then(organizations => {
      if (organizations.length !== 1) {
        throw new VError(
          { name: 'BulkUserActionValidationError' },
          organizations.length === 0
            ? 'No organization found for the given email address domain(s)'
            : 'Multiple organizations'
        );
      }
      return organizations[0];
    });

export const updateManySearchJobResponseStates = (
  searchJobResultIds: string[],
  state: EHuntingSearchJobResultState
): Promise<unknown> =>
  HuntingSearchJobResults.connect().then(col =>
    col.updateMany({ _id: { $in: searchJobResultIds } }, { $set: { state } })
  );

export const updateNoteInList = (
  noteId: string,
  objectToMerge: Partial<IIncidentNote>,
  notesList: IIncidentNote[]
) =>
  R.map(
    R.when<IIncidentNote, IIncidentNote>(
      R.propEq('_id', noteId),
      R.mergeLeft(objectToMerge)
    )
  )(notesList);

export const getNoteUserId = (noteId: string, notesList: IIncidentNote[]) =>
  R.pipe(
    R.find<IIncidentNote>(R.propEq('_id', noteId)),
    R.prop('userId')
  )(notesList);

export type TUserActionScope = {
  organizationId: string;
  search?: string;
  filter?: Record<string, unknown>;
};

export const getUserSearchPayload = (args: TUserActionScope) => {
  const searchString = args.search || '';

  const params = overrideQueryParams(getExtensionsMongoSelector(args), {
    selector: {
      organizationId: args.organizationId,
    },
  });
  return { params, searchString };
};

export const getEventFromNewState = (state: EIncidentState): EIncidentEvent => {
  switch (state) {
    case EIncidentState.RESOLVED:
      return EIncidentEvent.INCIDENT_RESOLVED;
    case EIncidentState.OPEN:
      return EIncidentEvent.INCIDENT_REOPENED;
  }
};

export const createIncidentNoteAnalyticsEvent = async (
  ctx: THandlerContext,
  {
    event,
    userId,
    incidentId,
    noteId,
  }: {
    event: EServerEvent;
    userId: string;
    incidentId: string;
    noteId: string;
  }
) =>
  await ctx.handlers.analytics.sink.track(
    ctx,
    ctx.getGlobal('analytics').buildEvent({
      event,
      userId,
      properties: {
        incidentId,
        noteId,
      },
    })
  );

export const createAnalyticsEventFromIncidentState = async (
  ctx: THandlerContext,
  state: EIncidentState,
  incident: IIncidentBeta
) => {
  if (state === EIncidentState.RESOLVED) {
    await ctx.handlers.analytics.sink.track(
      ctx,
      ctx.getGlobal('analytics').buildEvent({
        event: EServerEvent.RESPONSE_INCIDENT_CLOSED,
        userId: ctx.identity._id,
        properties: {
          incidentId: incident._id,
        },
      })
    );
  } else if (state === EIncidentState.OPEN) {
    await ctx.handlers.analytics.sink.track(
      ctx,
      ctx.getGlobal('analytics').buildEvent({
        event: EServerEvent.RESPONSE_INCIDENT_REOPENED,
        userId: ctx.identity._id,
        properties: {
          incidentId: incident._id,
        },
      })
    );
  }
};

export const validateCustomIncidentEmailTemplate = async (
  ctx: THandlerContext,
  policySettings: TIncidentPolicySettings
) => {
  /* 
    sanitazion also done before inserting this data in:
    imports/server/domains/collection/organization/lib/lib.ts
  */
  const sanitizedBody = await ctx.handlers.security.validation.sanitizeHtml(
    ctx,
    {
      htmlString: policySettings.emailTemplate.body,
      params: {
        capabilities: { blockLinks: false },
      },
    }
  );

  const mockContext = mockCustomEmailTemplateContext(ctx, policySettings);
  const context = await addDefaultContext(ctx, mockContext);
  const intl = await getIntl(ctx, ESupportedLocales.EN);
  return ctx.handlers.templating.handlebars.compileTemplate(ctx, {
    template: sanitizedBody,
    context,
    intl,
  });
};

const isCustomTemplateInUse = (policySettings: TIncidentPolicySettings) =>
  policySettings.emailTemplate?.body && policySettings.useCustomEmailTemplate;

const hasCustomIncidentEmailTemplateChanged = (
  policySettings: TIncidentPolicySettings,
  incidentSettings: IIncidentSettings
) => {
  const policyToBeChanged = incidentSettings.policies.find(
    ({ policyName }) => policyName === policySettings.policyName
  );

  return (
    policySettings.emailTemplate?.body !==
    policyToBeChanged?.emailTemplate?.body
  );
};

const unknownVariableErrorRegex = new RegExp('"(.*?)" not defined in');

export const isUnknownVariableException = ({ message }: Error) =>
  message.match(unknownVariableErrorRegex);

export const getBadIncidentTemplateVariable = ({ message }: Error) =>
  message.match(/"(.*?)"/)[0];

export const shouldValidateCustomIncidentEmailTemplate = (
  policySettings: TIncidentPolicySettings,
  incidentSettings: IIncidentSettings
) =>
  isCustomTemplateInUse(policySettings) &&
  hasCustomIncidentEmailTemplateChanged(policySettings, incidentSettings);

export type TMutationError = {
  message: string;
  field?: string[];
};

export const createMutationError = (
  error: Error | string,
  field: string[] = []
): TMutationError => ({
  message: isError(error) ? error.message : error,
  field,
});

export type TMutationResult<T> = {
  errors: TMutationError[];
  data?: T;
};
