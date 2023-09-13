import { SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import { EServerEvent } from '@server/lib/analyticEvents';

import { TSetOrganizationIndustryHandlerConfig } from './lib/setOrganizationIndustry.models';

/**
 * SetOrganizationIndustry the industry that an organization operates in
 */
const setOrganizationIndustry: TSetOrganizationIndustryHandlerConfig = {
  roles: [SUPER_ADMIN],
  analyticsEventBuilder: (ctx, _, organization) =>
    ctx.getGlobal('analytics').buildEvent({
      event: EServerEvent.ORGANIZATION_INDUSTRY_UPDATED,
      userId: ctx.identity.getId(),
      timestamp: ctx.getGlobal('newDate')(),
      properties: {
        industryId: organization.industryId,
        organizationId: organization._id,
      },
    }),
  async handler(ctx, { organizationId, industryId }) {
    const industry = await ctx.handlers.collection.industry.get(ctx, {
      industryId,
    });

    return ctx.handlers.collection.organization.patch(ctx, {
      id: organizationId,
      data: { industryId: industry._id },
    });
  },
};

export default setOrganizationIndustry;
