import { expect } from 'chai';
import { flatten } from 'ramda';

import { resetDatabase } from '@server/lib/serverTestUtils/serverTestUtils';
import { createMigrationTestCtx } from '@server/startup/migrations/migrationTestUtils';
import v271 from '@server/startup/migrations/v271';
import { industryData } from '@server/startup/migrations/v271-data';
import { insertMockOrganization } from '@server/domains/lib/testMockCreators/mockOrganization';
import { withOrganizationId } from '@server/domains/lib/testMockCreators/mockUtil';

const TEST_INDUSTRIES = [industryData[0], industryData[4], industryData[2]];

describe('v271', () => {
  beforeEach(async () => resetDatabase());
  after(() => resetDatabase());

  const setup = async () => {
    const ctx = await createMigrationTestCtx();

    const orgs = await Promise.all(
      TEST_INDUSTRIES.map(async ({ orgs, ...industry }) => {
        const { name } = await ctx.handlers.collection.industry.create(ctx, {
          data: industry,
        });

        return await Promise.all(
          orgs.map(orgId => insertMockOrganization({ _id: orgId }))
        );
      })
    ).then(flatten);

    return {
      ctx,
      orgs,
    };
  };

  it('adds industryId to existing organizations', async () => {
    const { ctx } = await setup();

    // Setup test specific premigration data here

    await v271.up(null, ctx);

    // Verify postmigration data

    expect(true).eql(false, 'Migration effects should be tested');
  });
});
