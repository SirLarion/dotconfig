import { expect } from 'chai';

import {
  insertMockUser,
  withGame,
} from '@server/domains/lib/testMockCreators/mockUser';
import { resetDatabase } from '@server/lib/serverTestUtils/serverTestUtils';
import { IUser } from '@server/lib/typedSchemas';
import { EOnboardingState } from '@server/lib/typedSchemas/User/models';
import { createMigrationTestCtx } from '@server/startup/migrations/migrationTestUtils';
import v272 from '@server/startup/migrations/v272';

const FROZEN_DATE = new Date();

interface ITestUser {
  userCreator: (intermediate: Partial<IUser>) => Partial<IUser>;
  expectedOnboardedAt: undefined | Date;
}

describe('v272', () => {
  beforeEach(async () => resetDatabase());
  after(() => resetDatabase());

  const setup = async () => {
    const ctx = await createMigrationTestCtx();

    const testData: ITestUser[] = [
      {
        userCreator: withGame({
          onboardedAt: new Date(),
          onboardingState: EOnboardingState.NOT_ONBOARDED,
        }),
        expectedOnboardedAt: undefined,
      },
      {
        userCreator: withGame({
          onboardedAt: new Date(),
          onboardingState: EOnboardingState.READY_TO_ONBOARD,
        }),
        expectedOnboardedAt: undefined,
      },
      {
        userCreator: withGame({
          onboardedAt: FROZEN_DATE,
          onboardingState: EOnboardingState.ONBOARDED,
        }),
        expectedOnboardedAt: FROZEN_DATE,
      },
      {
        userCreator: withGame({
          onboardedAt: null,
          onboardingState: EOnboardingState.NOT_ONBOARDED,
        }),
        expectedOnboardedAt: undefined,
      },
    ];

    const users = await Promise.all(
      testData.map(async user => ({
        ...user,
        user: await insertMockUser(user.userCreator),
      }))
    );

    return {
      ctx,
      users,
    };
  };

  it('should unset onboardedAt for users with onboardingState not equal to ONBOARDED but onboardedAt set', async () => {
    const { ctx, users } = await setup();

    await v272.up(null, ctx);
    for (const user of users) {
      const updatedUser = await ctx.handlers.collection.user.get(ctx, {
        id: user.user._id,
      });
      expect(updatedUser.game.onboardedAt).to.eql(user.expectedOnboardedAt);
    }
  });
});
