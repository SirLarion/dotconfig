import { withSuperAdminRole } from '@server/domains/lib/contextWith';
import { industryData } from '@server/startup/migrations/v274-data';

import { createMigration } from './utils';

/*
 * Creates Industry objects corresponding to current customers' industries. Adds
 * corresponding industryIds to the orgs in those industries.
 */
export default createMigration({
  version: 274,
  up: async (_, ctx) => {
    const logger = ctx.getContextLogger();
    console.log(ctx.identity.getOrganizationId());
    const superAdminCtx = withSuperAdminRole(ctx);

    logger.info(ctx, '1. Creating Industries.');

    const industries = await Promise.all(
      industryData.map(async ({ orgs, ...industry }) => {
        logger.info(ctx, `Creating industry: ${industry.name}`);

        return {
          industry: await ctx.handlers.collection.industry.create(
            superAdminCtx,
            {
              data: industry,
            }
          ),
          orgs,
        };
      })
    );

    logger.info(ctx, `2. Adding industryIds to orgs`);
    await Promise.all(
      industries.flatMap(({ industry, orgs }) =>
        orgs.map(organizationId =>
          ctx.handlers.admin.industries
            .setOrganizationIndustry(superAdminCtx, {
              organizationId,
              industryId: industry._id,
            })
            .catch(err =>
              logger.error(
                ctx,
                `Failed to add industryId for ${organizationId}: ${err}`
              )
            )
        )
      )
    );

    logger.info(
      ctx,
      `2. All done! Most of the existing organizations should now have an industryId for their respective industry.`
    );
  },
});
