import { expect } from 'chai';

import {
  insertMockUser,
  withGame,
} from '@server/domains/lib/testMockCreators/mockUser';
import { resetDatabase } from '@server/lib/serverTestUtils/serverTestUtils';
import { EOnboardingState } from '@server/lib/typedSchemas/User/models';
import { createMigrationTestCtx } from '@server/startup/migrations/migrationTestUtils';
import v273 from '@server/startup/migrations/v273';

import {
  withId,
  withoutValidation,
} from '../../../domains/lib/testMockCreators/mockUtil';

const FROZEN_DATE = new Date();
const insertUser = withoutValidation(insertMockUser);

describe('v273', () => {
  beforeEach(async () => resetDatabase());
  after(() => resetDatabase());

  const setup = async () => {
    const ctx = await createMigrationTestCtx();

    const userIds = JSON.parse(
      await ctx.getAsset('migrations/v273-data.json').text()
    );

    const [migratedUser, nonMigratedUser] = await Promise.all([
      insertUser(
        withId(userIds[0]),
        withGame({
          newOnboardedAt: FROZEN_DATE,
          onboardedAt: null,
          onboardingState: EOnboardingState.ONBOARDED,
        } as unknown)
      ),
      insertUser(
        withGame({
          newOnboardedAt: FROZEN_DATE,
          onboardedAt: null,
          onboardingState: EOnboardingState.ONBOARDED,
        } as unknown)
      ),
    ]);

    return {
      ctx,
      migratedUser,
      nonMigratedUser,
    };
  };

  it('updates onboardedAt with newOnboardedAt value if newOnboardedAt is not null', async () => {
    const { ctx, migratedUser, nonMigratedUser } = await setup();
    await v273.up(null, ctx);

    const updatedMigratedUser = await ctx.handlers.collection.user.get(ctx, {
      id: migratedUser._id,
    });

    expect(updatedMigratedUser.game.onboardedAt).to.eql(FROZEN_DATE);

    const nonUpdatedNonMigratedUser = await ctx.handlers.collection.user.get(
      ctx,
      {
        id: nonMigratedUser._id,
      }
    );
    expect(nonUpdatedNonMigratedUser).to.deep.equal(nonMigratedUser);
  });
});
