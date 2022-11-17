import { expect } from 'chai';

import { resetDatabase } from '@server/lib/serverTestUtils/serverTestUtils';
import { createMigrationTestCtx } from '@server/startup/migrations/migrationTestUtils';
import v280 from '@server/startup/migrations/v280';
import { withSuperAdminRole } from '@server/domains/lib/contextWith';

describe('v280', () => {
  beforeEach(async () => resetDatabase());
  after(() => resetDatabase());

  it('up - What does the migration do?', async () => {
    const ctx = await createMigrationTestCtx();

    await v280.up(null, ctx);

    const industry = await ctx.handlers.collection.industry.get(
      withSuperAdminRole(ctx),
      {}
    );

    expect(true).eql(false, 'Migration effects should be tested');
  });
});
