import { industryData } from '@server/startup/migrations/v272-data';

import { createMigration } from './utils';

/*
 * Creates Industry objects corresponding to current customers' industries. Adds
 * corresponding industryIds to the orgs in those industries.
 */
export default createMigration({
  version: 272,
  up: async (_, ctx) => {
    const logger = ctx.getContextLogger();

    logger.info(ctx, '1. Creating Industries.');
    await Promise.all(
      industryData.map(async ({ orgs, ...industry }) => {
        logger.info(ctx, `Creating industry: ${industry.name}`);

        const newIndustry = await ctx.handlers.collection.industry.create(ctx, {
          data: industry,
        });

        logger.info(ctx, `Adding industryId to orgs under ${industry.name}`);
        await Promise.all(
          orgs.map(
            async organizationId =>
              await ctx.handlers.admin.industries.setOrganizationIndustry(ctx, {
                organizationId,
                industryId: newIndustry._id,
              })
          )
        );
      })
    );

    logger.info(
      ctx,
      `2. All done! Most of the existing organizations should now have an industryId for their respective industry.`
    );
  },
});
