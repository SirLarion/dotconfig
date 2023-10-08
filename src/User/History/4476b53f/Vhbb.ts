import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import R from 'ramda';

import { ADMIN, SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import { insertMockOrganization } from '@server/domains/lib/testMockCreators/mockOrganization';
import {
  insertMockOrganizationOnboardingTask,
  withOrganizationId,
  withRequired,
} from '@server/domains/lib/testMockCreators/mockOrganizationOnboardingTask';
import {
  insertMockQuest,
  withOrigin,
} from '@server/domains/lib/testMockCreators/mockQuest';
import { withId } from '@server/domains/lib/testMockCreators/mockUtil';
import { testACL } from '@server/domains/lib/testShared';
import { createStubTaskQueue } from '@server/domains/lib/testUtil';
import {
  createIntegrationCtx,
  withGlobals,
  withTaskQueue,
  withUserIdentity,
} from '@server/domains/lib/testUtilIntegration';
import { resetDatabase } from '@server/lib/serverTestUtils/serverTestUtils';
import { EQuestOrigin } from '@server/lib/typedSchemas/Quest/models';

import launchOrganization from '../launchOrganization';

chai.use(chaiAsPromised);

const FROZEN_DATE = new Date();

const MOCK_ORG_ID = 'to_the_moon';

const setup = async () => {
  const taskQueue = createStubTaskQueue();

  await insertMockQuest(withOrigin(EQuestOrigin.TECHNICAL_TEST));

  const organization = await insertMockOrganization(withId(MOCK_ORG_ID));

  const ctx = await R.pipe(
    withGlobals({
      newDate: () => FROZEN_DATE,
    }),
    withUserIdentity(
      {
        _id: '_id',
        organizationId: 'organizationId',
      },
      [ADMIN]
    ),
    withTaskQueue(taskQueue),
    createIntegrationCtx
  )(null);

  return { ctx, organization, taskQueue };
};

describe('admin.organizationOnboarding.launchOrganization', () => {
  testACL(launchOrganization, [ADMIN, SUPER_ADMIN]);
  beforeEach(() => resetDatabase());
  after(() => resetDatabase());

  it('should throw error if not all required onboarding tasks are complete', async () => {
    const { ctx, organization } = await setup();

    await insertMockOrganizationOnboardingTask(
      withRequired(true),
      withOrganizationId(organization._id)
    );
    await expect(
      ctx.handlers.admin.organizationOnboarding.launchOrganization(ctx, {
        organizationId: organization._id,
      })
    ).rejectedWith(
      'Failed to launch organization. Organization has incomplete onboarding tasks that are required.'
    );
  });

  it('should mark organization onboardingCompletedAt', async () => {
    const { ctx, organization } = await setup();

    await ctx.handlers.admin.organizationOnboarding.launchOrganization(ctx, {
      organizationId: organization._id,
    });

    const updatedOrg = await ctx.handlers.collection.organization.get(ctx, {
      id: organization._id,
    });
    expect(updatedOrg.onboardingCompletedAt).eql(FROZEN_DATE);
  });

  it('should remove technical test quests', async () => {
    const { ctx, organization } = await setup();

    const testQuestCount = await ctx.handlers.collection.quest
      .find(ctx, {
        params: {
          selector: {
            organizationId,
            origin: EQuestOrigin.TECHNICAL_TEST,
          },
          options: {
            fields: {
              _id: 1,
            },
          },
        },
      })
      .then(c => c.count());
  });
});