import { MongoError } from 'mongodb';
import * as R from 'ramda';
import VError from 'verror';

import {
  withExceptionMessage,
  withExceptionStacktrace,
  withOrganizationId,
  withScimUpdateOperation,
  withScimUpdatePath,
  withScimUpdateValueNoPii,
  withUserExternalId,
  withUserId,
} from '@hox/telemetry-shared/context';

import { ADMIN } from '@server/domains/lib/auth/roles';
import { THandlerContext } from '@server/domains/lib/models';
import { IUser } from '@server/lib/typedSchemas';

import { toScimUserResponse } from './lib/common.models';
import { throwScimUpdateError } from './lib/error';
import {
  createUpdateUserTransformerFromValue,
  getBuilder,
  runUserTransformer,
} from './lib/parser/builder';
import { TUserTransformer } from './lib/parser/builder.models';
import { getLexer } from './lib/parser/lexer';
import { ELexerMode } from './lib/parser/lexer.models';
import { getFieldProjectionPathForUpdatePath } from './lib/parser/mappings';
import { getParser } from './lib/parser/parser';
import { EParserMode, EParserUpdateMode } from './lib/parser/parser.models';
import {
  EScimUpdateOperationType,
  IScimUserUpdateOperation,
  IUpdateUserResult,
  TUpdateUserContext as TCtx,
  TUpdateUserHandlerConfig,
} from './lib/updateUser.models';

const toLowerCase = R.pipe(R.defaultTo(''), R.toLower);

const updateOperationParserModeMapping = {
  [EScimUpdateOperationType.ADD]: EParserUpdateMode.ADD,
  [EScimUpdateOperationType.REPLACE]: EParserUpdateMode.REPLACE,
  [EScimUpdateOperationType.REMOVE]: EParserUpdateMode.REMOVE,
};

const createScimUpdateTransform = (
  operationType: EScimUpdateOperationType,
  updateValue: Record<string, unknown>,
  filterString?: string
) => {
  const parserConfig = {
    mode: EParserMode.UPDATE,
    updateModeConfig:
      updateOperationParserModeMapping[toLowerCase(operationType)],
  };
  const lexerConfig = { mode: ELexerMode.USER };

  // path is optional in replace and add but in remove it is mandatory
  if (!filterString) {
    if (operationType === EScimUpdateOperationType.REMOVE) {
      throwScimUpdateError(400, `Update operation failed`, 'invalidPath');
    }

    return createUpdateUserTransformerFromValue(parserConfig, updateValue);
  }
  const tokens = getLexer({ ...lexerConfig })(filterString);
  const parseExpression = getParser({ ...parserConfig, tokens });
  const buildQueryObject = getBuilder(parserConfig);
  const expression = parseExpression(0, [], true);

  const { userTransformer, updatePath } = buildQueryObject(
    expression,
    updateValue
  );

  return { userTransformer, updatePaths: [updatePath] };
};

const toScimUpdateUserResponse = async (
  ctx: TCtx,
  user: IUser
): Promise<IUpdateUserResult> => ({
  response: await toScimUserResponse(ctx, user),
});

// get operation value only if it contains "active" operation value, which is inherently not PII
const getUserActiveOperationValue = (operation?: IScimUserUpdateOperation) => {
  if (
    operation != null &&
    R.defaultTo('', operation.path).toLowerCase() === 'active'
  ) {
    return withScimUpdateValueNoPii(operation.value);
  }
};

const isDuplicateKeyError = (error: MongoError) => error.code === 11000;

// (Samuli): Currently we have two unique user fields email.address and scim.userName
const extractDuplicateField = (
  error: MongoError & { keyPattern: Record<string, number> }
) => {
  if (error.keyPattern['scim.userName'] !== undefined) {
    return 'userName';
  } else if (error.keyPattern['emails.address'] !== undefined) {
    return 'email';
  }

  return undefined;
};

type TFieldProjection = { [key: string]: 1 };
type TScimUpdateUserParsedOperationSet = {
  userTransformer: TUserTransformer;
  mongoFieldProjection: TFieldProjection;
};

/**
 * Iterate over all update operations to do two things:
 * 1. Create a transformer function that goes through all update operations on a user
 * 2. Build a mongo field projection from normalized update paths
 */
export const parseUpdateOperations = (
  ctx: THandlerContext,
  updateOperations: IScimUserUpdateOperation[],
  scimId: string
): TScimUpdateUserParsedOperationSet => {
  try {
    const { mongoFieldProjection, transformers } = updateOperations.reduce(
      (acc, updateOperation) => {
        ctx.getContextLogger().info(
          ctx,
          'User update operation',
          ...[
            withScimUpdateOperation(updateOperation.op),
            withScimUpdatePath(updateOperation.path),
            getUserActiveOperationValue(updateOperation), // potentially undefined
          ].filter(fn => fn != null)
        );

        const { userTransformer, updatePaths } = createScimUpdateTransform(
          updateOperation.op,
          updateOperation.value,
          updateOperation.path
        );

        const fieldProjectionPaths = updatePaths.reduce(
          (acc, curr) => [...acc, ...getFieldProjectionPathForUpdatePath(curr)],
          []
        );

        acc.transformers.push(userTransformer);
        fieldProjectionPaths.forEach(fieldProjectionPath => {
          acc.mongoFieldProjection[fieldProjectionPath] = 1;
        });

        return acc;
      },
      {
        transformers: [] as TUserTransformer[],
        mongoFieldProjection: {} as TFieldProjection,
      }
    );

    return {
      userTransformer: (user: IUser) =>
        transformers.reduce((acc, transformer) => transformer(acc), user),
      mongoFieldProjection,
    };
  } catch (e) {
    throwScimUpdateError(
      400,
      `Update operation failed for user with scimId ${scimId}`,
      'invalidPath'
    );
  }
};

const getUserWithScimId = async (
  ctx: THandlerContext,
  scimId: string,
  mongoFieldProjection: TFieldProjection
) => {
  const user = await ctx.handlers.collection.user.get(ctx, {
    id: scimId,
    params: {
      selector: {
        organizationId: ctx.identity.getOrganizationId(),
      },
      options: {
        fields: mongoFieldProjection,
      },
    },
  });

  if (user == null) {
    ctx
      .getContextLogger()
      .error(
        ctx,
        'Failed to retrieve user with scimId',
        withUserExternalId(scimId)
      );

    throwScimUpdateError(404, `Failed to retrieve user with scimId ${scimId}`);
  }

  return user;
};

const updateUser: TUpdateUserHandlerConfig = {
  roles: [ADMIN],
  telemetry: {
    inputToLogMessageAttributes: input => [withUserId(input.scimId)],
  },
  async handler(ctx, { updateOperations, scimId }) {
    const { userTransformer, mongoFieldProjection } = parseUpdateOperations(
      ctx,
      updateOperations,
      scimId
    );

    const user = await getUserWithScimId(ctx, scimId, mongoFieldProjection);

    try {
      const updatedUser = await runUserTransformer(ctx, userTransformer, user);

      return toScimUpdateUserResponse(ctx, updatedUser);
    } catch (e) {
      ctx
        .getContextLogger()
        .info(
          ctx,
          'Failed to update SCIM user',
          withUserId(user._id),
          withUserExternalId(scimId),
          withOrganizationId(user.organizationId),
          withExceptionMessage(e.message),
          withExceptionStacktrace(VError.fullStack(e))
        );

      if (isDuplicateKeyError(e)) {
        const affectedField = extractDuplicateField(e);

        if (!affectedField) {
          throwScimUpdateError(
            409,
            `Update operation failed for user with scimId ${scimId}.`,
            'uniqueness'
          );
        }
        throwScimUpdateError(
          409,
          `Update operation failed for user with scimId ${scimId}. Resource with this ${affectedField} already exists.`,
          'uniqueness'
        );
      }
      throwScimUpdateError(
        400,
        `Update operation failed for user with scimId ${user._id}`,
        'invalidPath'
      );
    }
  },
};

export default updateUser;
