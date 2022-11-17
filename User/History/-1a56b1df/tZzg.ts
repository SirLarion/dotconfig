import {
  attempt,
  cloneDeep,
  defaults,
  first,
  get,
  has,
  isEmpty,
  merge,
  pickBy,
  reduce,
  set,
  some,
  unset,
} from 'lodash';
import R from 'ramda';

import { flattenObject } from '@server/domains/collection/lib/mongo/lib/lib';
import { TMongoFieldSpecifier } from '@server/domains/collection/lib/mongo/lib/models';
import {
  IAccessControlPolicy,
  IInputPolicyArgs,
  IMatchPolicyArgs,
  IMongoProjectionPolicyArgs,
  TExemptionChecker,
} from '@server/domains/lib/auth/models';
import { EUserRole, ROLES } from '@server/domains/lib/auth/roles';
import {
  IMetaContext,
  THandlerContext,
  THandlerInputAuthFunc,
} from '@server/domains/lib/models';
import {
  deprecatedUseSemanticErrorserrorFactory,
  errorPermissionDenied,
} from '@server/util/error';

import { getIdentityRolesFromContext } from '../context';
import {
  EIdentityAuthenticationLevel,
  hasAuthenticationLevel,
} from '../identity';

export const policyAuthorizer = <C extends THandlerContext, IN>(
  ...policies: Array<IAccessControlPolicy<IN>>
): THandlerInputAuthFunc<C, IN> => {
  return async (ctx: C, input: IN): Promise<IN> => {
    return policies
      .filter(({ isExempt }) => !isExempt(ctx))
      .reduce(
        (overriddenInput, { policy }) => policy(ctx, overriddenInput),
        input
      );
  };
};

const createCheckExemptRoles =
  (exempt: EUserRole[]): TExemptionChecker =>
  ctx => {
    const currentRoles = getIdentityRolesFromContext(ctx);
    return exempt.some(r => currentRoles.includes(r));
  };

export const createExemptionChecker = (
  exempt: EUserRole[] | TExemptionChecker
) => (typeof exempt === 'function' ? exempt : createCheckExemptRoles(exempt));

const tryMapInputFieldValue = (value: Record<string, unknown>) => {
  const keys = Object.keys(value);
  // Only map a query parameter object containing a single lone $eq condition
  if (keys.length === 1 && keys.includes('$eq')) {
    return value.$eq;
  }

  return value;
};

const hasAuthNLevel =
  (authenticationLevel: EIdentityAuthenticationLevel): TExemptionChecker =>
  ctx =>
    hasAuthenticationLevel(ctx.identity, authenticationLevel);

const hasAuthenticationLevelNormal = hasAuthNLevel(
  EIdentityAuthenticationLevel.NORMAL
);

export const getWhitelistedFieldNames = (
  fieldSpecifier: TMongoFieldSpecifier
) => Object.keys(pickBy(fieldSpecifier, v => v === 1));

export const getInputValue = <T>(input: T, inputField: string) => {
  const fieldValue = get(input, inputField);

  if (typeof fieldValue === 'object') {
    return tryMapInputFieldValue(fieldValue) as any;
  }

  return fieldValue;
};

export const createUnauthorizedInputError =
  deprecatedUseSemanticErrorserrorFactory('UnauthorizedInputError');

const isUnauthorizedInputError = (maybeError: Error) =>
  get(maybeError, 'name') === 'UnauthorizedInputError';

const createMatchPolicy = <TDefaultInput extends string>(
  identityField: 'organizationId' | '_id',
  defaultInputField: TDefaultInput
) => {
  return ({ exempt, inputField = defaultInputField }: IMatchPolicyArgs) => {
    return {
      isExempt: createExemptionChecker(exempt),
      policy: <IN>(ctx: IMetaContext, input: IN): IN => {
        if (
          get(ctx.identity, identityField) !== getInputValue(input, inputField)
        ) {
          const identityValue = get(ctx.identity, identityField);
          const inputValue = getInputValue(input, inputField);

          throw createUnauthorizedInputError({
            msg: 'Unauthorized input',
            debugMsg: `Unauthorized input: expected ${inputField}=${identityValue} to match ${inputField}=${inputValue}`,
            info: {
              identityField,
              identityValue,
              inputField,
              inputValue,
              meta: ctx.meta,
            },
          });
        }
        return input;
      },
    };
  };
};

export const matchId = createMatchPolicy('_id', 'id');

export const matchUserId = createMatchPolicy('_id', 'userId');

export const matchOrganizationId = createMatchPolicy(
  'organizationId',
  'organizationId'
);

export const matchReporterUserId = createMatchPolicy('_id', 'reporterUserId');

type TMatchPolicy = ReturnType<ReturnType<typeof createMatchPolicy>>;

/**
 * matchOneof allows us to create OR clauses from matchers. If a single submatcher matches, matchOneOf matches.
 */
export const matchOneOf = (...matchPolicies: TMatchPolicy[]): TMatchPolicy => {
  return {
    isExempt: (ctx: IMetaContext) =>
      matchPolicies.every(policy => policy.isExempt(ctx)),
    policy: <IN>(ctx: IMetaContext, input: IN): IN => {
      const results = matchPolicies.map(({ policy }) =>
        attempt(policy, ctx, input)
      );

      const errors = results.filter(isUnauthorizedInputError);

      if (errors.length === results.length) {
        throw first(errors);
      }

      return input;
    },
  };
};

// The blacklisting currently assumes and relies on the mongo layer canonicalizeFieldProjection to merge the projections correctly
export const blacklistProjection = ({
  exempt,
  fields,
  inputField = 'params.options.fields',
}: IMongoProjectionPolicyArgs) => {
  const projectionWithZeroValues = reduce(
    fields,
    (acc, field) => {
      acc[field] = 0;
      return acc;
    },
    {}
  );

  return {
    isExempt: createExemptionChecker(exempt),
    policy: <IN>(ctx: IMetaContext, input: IN): IN => {
      const overridden = cloneDeep(input);
      const existingProjection = get(overridden, inputField);
      set(
        overridden as any,
        inputField,
        merge({}, existingProjection, projectionWithZeroValues)
      );
      return overridden;
    },
  };
};

export const whitelistProjection = ({
  exempt,
  fields,
  inputField = 'params.options.fields',
}: IMongoProjectionPolicyArgs) => {
  if (fields.length === 0) {
    throw new Error('Illegal fields specified: List cannot be empty');
  }

  const projectionWithAllowedValues = reduce(
    fields,
    (acc, field) => {
      acc[field] = 1;
      return acc;
    },
    {}
  );

  return {
    isExempt: createExemptionChecker(exempt),
    policy: <IN>(ctx: IMetaContext, input: IN): IN => {
      const overridden = cloneDeep(input);
      const existingProjection = get(overridden, inputField);
      if (isEmpty(existingProjection)) {
        // apply default projection as none existed
        set(
          overridden as any,
          inputField,
          cloneDeep(projectionWithAllowedValues)
        );
        return overridden;
      }

      if (some(existingProjection, v => v === 0)) {
        // projection contains exlusions
        // -> mongo projections cannot contain both exclusions and inclusions
        // -> we can merge the whitelist as is and rely on canonicalizeFieldProjection on mongo layer to figure out the correct projection
        set(
          overridden as any,
          inputField,
          defaults(
            pickBy(existingProjection, v => v === 0),
            projectionWithAllowedValues
          )
        );
        return overridden;
      }

      // pick the allowed properties in existing projection based on the policy allowed fields
      const newProjection = reduce(
        existingProjection,
        (proj, val, key) => {
          if (
            some(fields, field => key === field || key.startsWith(`${field}.`))
          ) {
            proj[key] = 1;
          }
          return proj;
        },
        {}
      );

      set(overridden as any, inputField, newProjection);
      return overridden;
    },
  };
};

export const whitelistInput = ({ exempt, fields = [] }: IInputPolicyArgs) => {
  return {
    isExempt: createExemptionChecker(exempt),
    policy: <IN>(ctx: IMetaContext, input: IN): IN => {
      const objectPaths = Object.keys(flattenObject(input as any));
      objectPaths.forEach(path => {
        if (some(fields, field => path.startsWith(field))) {
          return;
        }
        throw errorPermissionDenied(
          ctx,
          `Illegal input. Path [${path}] is not allowed`
        );
      });

      return input;
    },
  };
};

export interface IWhitelistInputValues {
  exempt: EUserRole[];
  inputField: string;
  allowedValues?: string[];
}

export const whitelistInputValues = ({
  exempt,
  inputField,
  allowedValues = [],
}: IWhitelistInputValues) => {
  return {
    isExempt: createExemptionChecker(exempt),
    policy: <IN>(ctx: IMetaContext, input: IN): IN => {
      if (!has(input, inputField)) {
        return input;
      }
      const value = get(input, inputField);

      if (!allowedValues.includes(value)) {
        throw errorPermissionDenied(
          ctx,
          `Illegal input. Value in path [${inputField}] is not allowed`
        );
      }

      return input;
    },
  };
};

export const forceProjectionForWeakAuthenticated = (
  projection: Record<string, 1>
) =>
  whitelistProjection({
    fields: getWhitelistedFieldNames(projection),
    // Exempts normal authn levels and all identities with task_runner role
    // effectively targeting those with WEAK authn level
    exempt: R.anyPass([
      createCheckExemptRoles([EUserRole.TASK_RUNNER]),
      hasAuthenticationLevelNormal,
    ]),
  });

export const forceProjectionForThreatAnalyst = (
  projection: Record<string, 1>
) =>
  whitelistProjection({
    fields: getWhitelistedFieldNames(projection),
    exempt: createCheckExemptRoles(
      ROLES.filter(role => role !== EUserRole.HOXHUNT_THREAT_ANALYST)
    ),
  });

export const blacklistInput = ({ exempt, fields = [] }: IInputPolicyArgs) => {
  return {
    isExempt: createExemptionChecker(exempt),
    policy: <IN>(ctx: IMetaContext, input: IN): IN => {
      const overridden = cloneDeep(input);
      fields.forEach(fieldPath => {
        unset(overridden, fieldPath);
      });
      return overridden;
    },
  };
};
