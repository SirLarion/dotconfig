import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { addSeconds } from 'date-fns';
import R from 'ramda';

import { ADMIN, SUPER_ADMIN } from '@server/domains/lib/auth/roles';
import { insertMockOrganization } from '@server/domains/lib/testMockCreators/mockOrganization';
import {
  insertMockOrganizationOnboardingTask,
  withCompletedAt,
  withOrganizationId,
  withRequired,
} from '@server/domains/lib/testMockCreators/mockOrganizationOnboardingTask';
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

import launchOrganization from '../launchOrganization';

chai.use(chaiAsPromised);

const FROZEN_DATE = new Date();

const setup = async () => {
  const taskQueue = createStubTaskQueue();

  const organization = await insertMockOrganization(withId(organizationId));

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

  it('should create start game tasks for eligible users', async () => {
    const { ctx, taskQueue } = await setup();

    await insertMockOrganizationOnboardingTask(
      withRequired(true),
      withOrganizationId(organization._id),
      withCompletedAt(FROZEN_DATE)
    );
    await launchOrganization.handler(ctx, {
      organizationId: organization._id,
    });
    expect(taskQueue.submitTaskGroup.callCount).eql(1);
    const sortByUserId = R.sortBy(R.path(['args', 'userId']));
    expect(sortByUserId(taskQueue.submitTaskGroup.firstCall.args[2].tasks)).eql(
      [
        {
          args: {
            forceStart: true,
            userId: 'good-user-1',
            organizationId: organization._id,
          },
          scheduleTime: FROZEN_DATE,
          uniqueKey: `launchOrganization:game.user.start:good-user-1:${FROZEN_DATE.toISOString()}`,
        },
        {
          args: {
            forceStart: true,
            userId: 'good-user-2',
            organizationId: organization._id,
          },
          scheduleTime: addSeconds(FROZEN_DATE, 5),
          uniqueKey: `launchOrganization:game.user.start:good-user-2:${FROZEN_DATE.toISOString()}`,
        },
        {
          args: {
            forceStart: true,
            userId: 'good-user-3',
            organizationId: organization._id,
          },
          scheduleTime: addSeconds(FROZEN_DATE, 10),
          uniqueKey: `launchOrganization:game.user.start:good-user-3:${FROZEN_DATE.toISOString()}`,
        },
      ]
    );
  });

  it('should throw error if not all required onboarding tasks are complete', async () => {
    const { ctx } = await setup();

    const { organization } = await createMockData(
      ctx.identity.getOrganizationId()
    );
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
    const { ctx } = await setup();

    const { organization } = await createMockData(
      ctx.identity.getOrganizationId()
    );
    await ctx.handlers.admin.organizationOnboarding.launchOrganization(ctx, {
      organizationId: organization._id,
    });

    const updatedOrg = await ctx.handlers.collection.organization.get(ctx, {
      id: organization._id,
    });
    expect(updatedOrg.onboardingCompletedAt).eql(FROZEN_DATE);
  });
});
