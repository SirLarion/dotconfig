import { IIndustry } from '@server/lib/typedSchemas/Industry/Industry';

import { authenticatedResolver } from '../../utils';

export const createIndustry = authenticatedResolver(
  async (root, industry: { name: string }, ctx) => {
    console.log(industry);
    const createdIndustry = await ctx.handlers.collection.industry.create(ctx, {
      data: industry,
    });

    return createdIndustry;
  }
);

export const updateIndustry = authenticatedResolver(
  async (root, args: { industry: IIndustry }, ctx) => {
    const {
      industry: { _id, ...data },
    } = args;

    const updatedIndustry = await ctx.handlers.collection.industry.patch(ctx, {
      id: _id,
      data,
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
