import { expect } from 'chai';
import { flatten } from 'ramda';

import {
  insertMockOrganization,
  withOrganizationOverrides,
} from '@server/domains/lib/testMockCreators/mockOrganization';
import { resetDatabase } from '@server/lib/serverTestUtils/serverTestUtils';
import { createMigrationTestCtx } from '@server/startup/migrations/migrationTestUtils';
import v271 from '@server/startup/migrations/v271';
import { industryData } from '@server/startup/migrations/v271-data';

const TEST_INDUSTRIES = [industryData[0], industryData[4], industryData[2]];

describe('v271', () => {
  beforeEach(async () => resetDatabase());
  after(() => resetDatabase());

  const setup = async () => {
    const ctx = await createMigrationTestCtx();

    const orgsWithIndustries = await Promise.all(
      TEST_INDUSTRIES.map(async ({ orgs, ...industry }) => {
        await ctx.handlers.collection.industry.create(ctx, {
          data: industry,
        });

        return await Promise.all(
          orgs.map(
            async orgId =>
              await insertMockOrganization(
                withOrganizationOverrides({ _id: orgId })
              )
          )
        ).then(res => [industry._id, res]);
      })
    ).then(res => Object.fromEntries(res) as Record<string, string[]>);

    const orgWithoutIndustry = await insertMockOrganization();

    return {
      ctx,
      orgsWithIndustries,
      orgWithoutIndustry,
    };
  };

  it('adds industryId to existing organizations based on the mapping in the data', async () => {
    const { ctx, orgsWithIndustries } = await setup();

    await v271.up(null, ctx);

    TEST_INDUSTRIES.forEach(async ({ _id, orgs }) => {
      orgs.forEach(async orgId => {
        const { industryId } = await ctx.handlers.collection.organization.get(
          ctx,
          {
            id: orgId,
          }
        );
        expect(industryId).eql(_id);
      });
    });
  });

  it('does not add industryId to orgs that are not defined in the mapping in the data', async () => {
    const { ctx, orgWithoutIndustry } = await setup();

    // Setup test specific premigration data here

    await v271.up(null, ctx);

    // Verify postmigration data

    expect(true).eql(false, 'Migration effects should be tested');
  });
});