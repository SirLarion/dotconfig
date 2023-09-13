import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import R from 'ramda';

import { SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import {
  insertMockOrganization,
  withOnboardingCompletedAt,
  withOnboardingStartedAt,
} from '@server/domains/lib/testMockCreators/mockOrganization';
import { createMockUser } from '@server/domains/lib/testMockCreators/mockUser';
import { testACL } from '@server/domains/lib/testShared';
import {
  createIntegrationCtx,
  withGlobals,
  withUserIdentity,
} from '@server/domains/lib/testUtilIntegration';
import { resetDatabase } from '@server/lib/serverTestUtils/serverTestUtils';

import start from '../start';

chai.use(chaiAsPromised);

type TSetupOptions = {
  onboardingStartedAt?: Date;
  onboardingCompletedAt?: Date;
};

const FROZEN_DATE = new Date();

describe('admin.organizationOnboarding.start', () => {
  testACL(start, [SUPER_ADMIN]);
  beforeEach(() => resetDatabase());
  after(() => resetDatabase());

  const setup = async (args: TSetupOptions) => {
    const user = await createMockUser({}, { persist: true });
    const modifiers = [];

    if (args.onboardingStartedAt) {
      modifiers.push(withOnboardingStartedAt(args.onboardingStartedAt));
    }

    if (args.onboardingCompletedAt) {
      modifiers.push(withOnboardingCompletedAt(args.onboardingCompletedAt));
    }

    const organization = await insertMockOrganization(...modifiers);

    const ctx = await R.pipe(
      withUserIdentity(user, [SUPER_ADMIN]),
      withGlobals({
        newDate: () => FROZEN_DATE,
      }),
      createIntegrationCtx
    )(null);

    return { ctx, user, organization };
  };

  it('should throw error if organization onboarding already started', async () => {
    const { ctx, organization } = await setup({
      onboardingStartedAt: new Date(),
    });
    await expect(
      ctx.handlers.admin.organizationOnboarding.start(ctx, {
        organizationId: organization._id,
      })
    ).rejectedWith('Onboarding is already started for organization');
  });

  it('should set onboardingStartedAt timestamp', async () => {
    const { ctx, organization } = await setup({});
    await ctx.handlers.admin.organizationOnboarding.start(ctx, {
      organizationId: organization._id,
    });

    const updatedOrg = await ctx.handlers.collection.organization.get(ctx, {
      id: organization._id,
    });
    expect(updatedOrg.onboardingStartedAt).eql(FROZEN_DATE);
  });
});
