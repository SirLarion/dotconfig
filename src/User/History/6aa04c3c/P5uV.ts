import { TStartContext } from './start.models';

export const setOnboardingStartedAt = (
  ctx: TStartContext,
  organizationId: string
) =>
  ctx.handlers.collection.organization.patch(ctx, {
    id: organizationId,
    data: {
      onboardingStartedAt: ctx.getGlobal('newDate')(),
    },
  });

export const removeOnboardingCompletedAtValue = (
  ctx: TStartContext,
  organizationId: string
) =>
  ctx.handlers.collection.organization.patch(ctx, {
    id: organizationId,
    data: {
      onboardingCompletedAt: null,
    },
  });

export const createOrganizationOnboardingTasks = async (
  ctx: TStartContext,
  organizationId: string
) => {
  const { onboardingTaskTemplates } =
    await ctx.handlers.admin.organizationOnboarding.getOnboardingTaskTemplates(
      ctx,
      {}
    );

  const createOnboardingTaskPromises = onboardingTaskTemplates.map(template =>
    ctx.handlers.collection.organizationOnboardingTask.create(ctx, {
      data: {
        organizationId,
        ...template,
      },
    })
  );

  return Promise.all(createOnboardingTaskPromises);
};
