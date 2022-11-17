import { IDomain } from '@server/lib/typedSchemas/Organization/models';

import { authenticatedResolver } from '../../utils';

import { createMutationError } from './utils';

export const addDomain = authenticatedResolver(
  async (root, args: { organizationId: string; domain: IDomain }, ctx) => {
    try {
      const newDomain = await ctx.handlers.organization.domain.add(ctx, args);
      return {
        data: newDomain,
      };
    } catch (err) {
      return { errors: [createMutationError(err)] };
    }
  }
);

export const updateDomain = authenticatedResolver(
  async (
    root,
    { organizationId, domain }: { organizationId: string; domain: IDomain },
    ctx
  ) => {
    try {
      const updatedDomain = await ctx.handlers.organization.domain.update(ctx, {
        organizationId,
        domainInput: domain,
      });
      return {
        data: updatedDomain,
      };
    } catch (err) {
      return { errors: [createMutationError(err)] };
    }
  }
);

export const removeDomain = authenticatedResolver(
  async (root, args: { organizationId: string; domainInput: IDomain }, ctx) => {
    try {
      const domain = await ctx.handlers.organization.domain.remove(ctx, args);
      return {
        data: domain,
      };
    } catch (err) {
      return { errors: [createMutationError(err)] };
    }
  }
);
