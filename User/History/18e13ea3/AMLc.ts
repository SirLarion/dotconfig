import escapeStringRegexp from 'escape-string-regexp';

import { fetchCursorHead } from '@server/domains/lib/collectionFp';
import { THandlerContext } from '@server/domains/lib/models';
import {
  createCollection,
  createIndexSpec,
} from '@server/lib/collection-helpers';
import { IOrganization } from '@server/lib/typedSchemas/Organization/models';
import { OrganizationSchema } from '@server/lib/typedSchemas/Organization/Organization';

export const Organizations = createCollection<IOrganization>(
  'Organizations',
  OrganizationSchema,
  [
    createIndexSpec(
      {
        'domains.name': 1,
      },
      { unique: true }
    ),
    createIndexSpec(
      {
        'scim.authToken.jti': 1,
      },
      { unique: true, sparse: true }
    ),
  ]
);

Organizations.publicFields = {
  _id: 1,
  name: 1,
  sendThreatFeedback: 1,
  domains: 1,
  emailDomainMappings: 1,
  delivery: 1,
  game: 1,
  images: 1,
  pluginRedirect: 1,
  plugin: 1,
  stats: 1,
  sso: 1,
  notifications: 1,
  tags: 1,
  features: 1,
  industryId: 1,
  incidentSettings: 1,
  aggregates: 1,
  licenses: 1,
};

Organizations.fields.threatAnalyst.query = {
  _id: 1,
  name: 1,
  incidentSettings: 1,
};

Organizations.fields.weakAuthentication.query = {
  _id: 1,
  aggregates: 1,
  features: 1,
  game: 1,
  hideZendeskWidget: 1,
  images: 1,
  name: 1,
  sso: 1,
};

// TODO - Purge these out from codebase
export const findByEmailDomain = (
  ctx: THandlerContext,
  domain: string,
  fields: Record<string, number> = {}
) =>
  ctx.handlers.collection.organization
    .find(ctx, {
      params: {
        selector: {
          'domains.name': new RegExp(`^${escapeStringRegexp(domain)}$`, 'i'),
        },
        options: {
          limit: 1,
          fields,
        },
      },
    })
    .then(fetchCursorHead);
