import { addSeconds } from 'date-fns';

import { handlerTree } from '@server/domains/gen/handlers';
import { fetchCursor } from '@server/domains/lib/collectionFp';
import serverIntl from '@server/intl';
import { IUser } from '@server/lib/typedSchemas';
import { EUserGameMode } from '@server/lib/typedSchemas/User/models';

import { TLaunchOrganizationContext } from './launchOrganization.models';

const SECONDS_APART = 5;

const createTasks = (
  ctx: TLaunchOrganizationContext,
  organizationId: string,
  users: Array<Pick<IUser, '_id'>>
) => {
  const currentDate = ctx.getGlobal('newDate')();

  const tasks = users.map((user, idx) => ({
    uniqueKey: `launchOrganization:game.user.start:${
      user._id
    }:${currentDate.toISOString()}`,
    scheduleTime: addSeconds(currentDate, idx * SECONDS_APART),
    args: {
      userId: user._id,
      forceStart: true,
      organizationId,
    },
  }));

  return tasks;
};

export const setNullOnboardingStartedAt = (
  ctx: TLaunchOrganizationContext,
  organizationId: string
) =>
  ctx.handlers.collection.organization.patch(ctx, {
    id: organizationId,
    data: {
      onboardingStartedAt: null,
    },
  });

const createTaskGroup = (
  ctx: TLaunchOrganizationContext,
  organizationId: string,
  users: Array<Pick<IUser, '_id'>>
) => ({
  userId: ctx.identity.getEffectiveId(),
  organizationId,
  signature: 'game.user.start',
  description: serverIntl.launchOrganization,
  tasks: createTasks(ctx, organizationId, users),
});

export const createAutomaticStartTasks = async (
  ctx: TLaunchOrganizationContext,
  organizationId: string,
  users: Array<Pick<IUser, '_id'>>
) => {
  const taskQueue = await ctx.getTaskQueue();
  taskQueue.submitTaskGroup(
    ctx,
    handlerTree.game.user.start,
    createTaskGroup(ctx, organizationId, users)
  );
};

export const getEligibleUsers = async (
  ctx: TLaunchOrganizationContext,
  organizationId: string
) => {
  const users = await ctx.handlers.collection.user
    .find(ctx, {
      params: {
        selector: {
          organizationId,
          'game.mode': EUserGameMode.INTENSIVE,
          'game.active': false,
        },
        options: {
          fields: {
            _id: 1,
          },
          sort: {
            _id: 1,
          },
        },
      },
    })
    .then(fetchCursor);

  return users;
};
