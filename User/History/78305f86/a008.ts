import { IIndustry } from '@server/lib/typedSchemas/Industry/Industry';

import { authenticatedResolver } from '../../utils';

export const createIndustry = authenticatedResolver(
  async (root, { industry }, ctx) => {
    const createdIndustry = await ctx.handlers.collection.industry.create(ctx, {
      data: industry,
    });

    return createdIndustry;
  }
);

export const updateIndustry = authenticatedResolver(
  async (
    root,
    args: { industryId: string; industryInput: Partial<IIndustry> },
    ctx
  ) => {
    const updatedIndustry = await ctx.handlers.collection.industry.patch(ctx, {
      id: args.industryId,
      data: args.industryInput,
    });

    return updatedIndustry;
  }
);

export const deleteIndustry = authenticatedResolver(
  async (root, args: { industryId: string }, ctx) => {
    const deletedIndustry = await ctx.handlers.collection.industry.remove(ctx, {
      id: args.industryId,
    });

    return deletedIndustry;
  }
);
