import { IIndustry } from '@server/lib/typedSchemas/Industry/Industry';
import { authenticatedResolver } from '../../utils';

export const createIndustry = authenticatedResolver(
  async (root, data: { name: string }, ctx) => {
    const createdIndustry = await ctx.handlers.collection.industry.create(ctx, {
      data,
    });

    return createdIndustry;
  }
);

export const updateIndustry = authenticatedResolver(
  async (root, args: { industry: IIndustry }, ctx) => {
    const createdIndustry = await ctx.handlers.collection.industry.patch(ctx, {
      data,
    });

    return createdIndustry;
  }
);
