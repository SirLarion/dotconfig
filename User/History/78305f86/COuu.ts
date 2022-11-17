import { authenticatedResolver } from '../../utils';

export const createIndustry = authenticatedResolver(
  async (root, industry: { name: string }, ctx) => {
    const createdIndustry = await ctx.handlers.collection.industry.create(
      ctx,
      industry
    );
  }
);
