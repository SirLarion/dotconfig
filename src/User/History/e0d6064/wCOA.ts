import { expect } from 'chai';

import { resetDatabase } from '@server/lib/serverTestUtils/serverTestUtils';
import { createMigrationTestCtx } from '@server/startup/migrations/migrationTestUtils';
import v280 from '@server/startup/migrations/v280';

describe('v280', () => {
  beforeEach(async () => resetDatabase());
  after(() => resetDatabase());

  it('should create an industry with _id: "global" and name: "Global"', async () => {
    const ctx = await createMigrationTestCtx();

    await v280.up(null, ctx);

    const industry = await ctx.handlers.collection.industry.get(ctx, {
      id: 'global',
    });

    expect(industry?.name).eql('Global');
  });
});
