import { expect } from 'chai';

import { resetDatabase } from '@server/lib/serverTestUtils/serverTestUtils';
import { createMigrationTestCtx } from '@server/startup/migrations/migrationTestUtils';
import v271 from '@server/startup/migrations/v271';

describe('v271', () => {
  beforeEach(async () => resetDatabase());
  after(() => resetDatabase());

  const setup = async () => {
    // It is almost always worth it to integration test your migration
    const ctx = await createMigrationTestCtx();

    // Setup premigration data common for all tests here

    return {
      ctx,
    };
  };

  it('up - What does the migration do?', async () => {
    const { ctx } = await setup();

    // Setup test specific premigration data here

    await v271.up(null, ctx);

    // Verify postmigration data

    expect(true).eql(false, 'Migration effects should be tested');
  });
});
