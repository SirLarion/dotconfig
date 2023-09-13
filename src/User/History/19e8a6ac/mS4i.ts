import { IDomain } from '@server/lib/typedSchemas/Organization/models';

import { authenticatedResolver } from '../../utils';
import { createMutationError } from './utils';

export const updateDomain = authenticatedResolver(
  async (
    root,
    { organizationId, domain }: { organizationId: string; domain: IDomain },
    ctx
  ) => {
    return ctx.handlers.organization.domain.update(ctx, {
      organizationId,
      domainInput: domain,
    });
  }
);

export const removeDomain = authenticatedResolver(
  async (root, args: { organizationId: string; domain: IDomain }, ctx) => {
    try {
      const organization = await ctx.handlers.organization.domain.remove(
        ctx,
        args
      );
      return {
        data: organization,
        errors: [],
      };
    } catch (err) {
      return { errors: [createMutationError(err)] };
    }
  }
);
