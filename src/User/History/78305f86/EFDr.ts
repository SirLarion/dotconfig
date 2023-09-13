import { authenticatedResolver } from '../../utils';

export const createIndustry = authenticatedResolver(
  async (root, data: { name: string }, ctx) => {
    const createdIndustry = await ctx.handlers.collection.industry.create(ctx, {
      data,
    });

    return createdIndustry;
  }
);
