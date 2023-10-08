import { expect } from 'chai';

import {
  insertMockOrganization,
  withOrganizationOverrides,
} from '@server/domains/lib/testMockCreators/mockOrganization';
import { resetDatabase } from '@server/lib/serverTestUtils/serverTestUtils';
import { createMigrationTestCtx } from '@server/startup/migrations/migrationTestUtils';
import v274 from '@server/startup/migrations/v274';
import { industryData } from '@server/startup/migrations/v274-data';

const TEST_INDUSTRIES = [industryData[0], industryData[4], industryData[2]];

describe('v274', () => {
  beforeEach(async () => await resetDatabase());
  after(async () => await resetDatabase());

  const setup = async () => {
    const ctx = await createMigrationTestCtx();

    await Promise.all(
      TEST_INDUSTRIES.map(async ({ orgs }) => {
        orgs.forEach(
          async orgId =>
            await insertMockOrganization(
              withOrganizationOverrides({ _id: orgId })
            )
        );
      })
    );

    const orgWithoutIndustry = await insertMockOrganization();

    return {
      ctx,
      orgWithoutIndustry,
    };
  };

  it('adds industryId to existing organizations based on the mapping in the data', async () => {
    const { ctx } = await setup();

    await v274.up(null, ctx);

    await Promise.all(
      TEST_INDUSTRIES.map(({ _id, orgs }) => {
        orgs.forEach(async orgId => {
          const { industryId } = await ctx.handlers.collection.organization.get(
            ctx,
            {
              id: orgId,
            }
          );
          expect(industryId).eql(_id);
        });
      })
    );
  });

  it('does not add industryId to orgs that are not defined in the mapping in the data', async () => {
    const { ctx, orgWithoutIndustry } = await setup();

    await v274.up(null, ctx);

    const org = await ctx.handlers.collection.organization.get(ctx, {
      id: orgWithoutIndustry._id,
    });

    expect(org.industryId).eql(undefined);
  });
});