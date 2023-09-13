import { isEmpty, keys } from 'lodash';
import { FilterQuery, ObjectID, ReadPreference, UpdateQuery } from 'mongodb';
import R from 'ramda';
import { CleanOption, SimpleSchemaStatic } from 'simpl-schema';

import { appConfig } from '@server/app/appConfig';
import { fetchCursorHead } from '@server/domains/lib/collectionFp';
import { THandlerContext } from '@server/domains/lib/models';
import { errorNotFound } from '@server/util/error';
import { PartialError } from '@server/util/error/PartialError';

import { connectCollection } from './collection/mongoState';
import { POLICIES } from './collection/policies';
import { createCollectionGuard } from './collection/secureCollection';
import {
  canonicalizeFieldProjection,
  flattenObjectPreserveNatives,
  getFieldProjection,
  idToString,
  onlyIdProjected,
  toLegacyCursor,
  toNativeReadParams,
  toNativeWriteParams,
} from './lib/lib';
import {
  ICreateManyParams,
  ICursor,
  IMongoAggregate,
  IMongoCreate,
  IMongoCreateMany,
  IMongoDistinct,
  IMongoFind,
  IMongoGet,
  IMongoPatch,
  IMongoRemove,
  IMongoUpdate,
  IMongoUpsert,
  MONGOID,
  TCollectionInputSchemas,
  TMongoFieldSpecifier,
  TMongoSelector,
} from './lib/models';
import { TCollection } from './collection';
import { ICollections, TCollectionSchemas } from './collections';

export type ValueOf<T extends Record<string, unknown>> = T[keyof T];

// Brutally dig the schema out of a collection enhanced by Collection2
const getCollectionSchema = <T>(collection: TCollection<T>) =>
  collection.getSchema();

const getCollectionName = <C extends THandlerContext>(ctx: C) =>
  ctx.meta.service as keyof ICollections;

const getCollection = <
  C extends THandlerContext,
  T extends TCollectionInputSchemas
>(
  ctx: C
): TCollection<T> => {
  const col = ctx.getGlobal('getCollection')(getCollectionName(ctx));

  if (!col) {
    throw new Error(
      `Cannot find collection for handler context. ctx.meta.service=${ctx.meta.service}`
    );
  }

  return col as unknown as TCollection<T>;
};

const getSchema = <C extends THandlerContext>(ctx: C) =>
  R.pipe(
    getCollection,
    getCollectionSchema,
    R.when(R.isNil, (): SimpleSchemaStatic => {
      throw new Error(
        `Cannot find schema for handler context. ctx.meta.service=${ctx.meta.service}`
      );
    })
  )(ctx);

const collectionGuard = createCollectionGuard(POLICIES);

const getConnectedCollection = async <
  C extends THandlerContext,
  T extends TCollectionInputSchemas
>(
  ctx: C
): Promise<TCollection<T>> =>
  R.pipe(
    (ctx: C) => getCollection<C, T>(ctx),
    connectCollection,
    R.then(async col =>
      collectionGuard.addAuthorization(
        ctx,
        col,
        appConfig.auth.enableAuthZDebug
      )
    )
  )(ctx);

export const aggregate = async <
  T extends TCollectionSchemas,
  C extends THandlerContext,
  TRes
>(
  ctx: C,
  input: IMongoAggregate
): Promise<TRes[]> => {
  return getConnectedCollection<C, T>(ctx).then(
    col =>
      new Promise((resolve, reject) =>
        col.aggregate<TRes>(
          input.pipeline,
          {
            readPreference: ReadPreference.SECONDARY_PREFERRED,
          },
          (err, res) => {
            err ? reject(err) : resolve(res.toArray());
          }
        )
      )
  );
};

export const find = async <
  T extends TCollectionSchemas,
  C extends THandlerContext
>(
  ctx: C,
  { params }: IMongoFind<T>
): Promise<ICursor<T>> => {
  const parsed = toNativeReadParams(params);
  const options = parsed.options;
  return getConnectedCollection<C, T>(ctx)
    .then(col =>
      col.find(parsed.selector, {
        ...options,
        fields: canonicalizeFieldProjection(parsed.options.fields),
      })
    )
    .then(toLegacyCursor);
};

export const distinct = <
  T extends TCollectionSchemas,
  C extends THandlerContext
>(
  ctx: C,
  { key, selector }: IMongoDistinct<T>
): Promise<unknown[]> => {
  return getConnectedCollection<C, T>(ctx).then(col =>
    col.distinct(key, selector)
  );
};

export const get = async <
  T extends TCollectionSchemas,
  C extends THandlerContext
>(
  ctx: C,
  { id, params }: IMongoGet<T>
): Promise<T> => {
  const {
    options: { limit, ...restOpts },
    selector,
  } = toNativeReadParams(params);
  const finalSelector: TMongoSelector<any> = {
    ...selector,
    _id: id,
  };

  return getConnectedCollection<C, T>(ctx).then(col =>
    col.findOne(finalSelector, {
      ...restOpts,
      fields: canonicalizeFieldProjection(restOpts.fields),
    })
  );
};

export const getFromWriteResultById =
  <T extends TCollectionSchemas, C extends THandlerContext>(
    ctx: C,
    { params }: { params?: { options?: { fields?: TMongoFieldSpecifier } } }
  ) =>
  (writeResult: { _id: string }): Promise<T> => {
    const { fields } = getFieldProjection(params);

    if (onlyIdProjected(fields)) {
      return Promise.resolve(writeResult as T);
    }

    return get<T, C>(ctx, {
      id: writeResult._id,
      params: { selector: {}, options: { fields } },
    });
  };

export const createWriteOnly = async <
  T extends TCollectionInputSchemas,
  C extends THandlerContext
>(
  ctx: C,
  { data }: IMongoCreate<T>
): Promise<{ _id: string }> =>
  getConnectedCollection<C, T>(ctx).then(col =>
    col
      // Couldn't make types agree
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .insertOne(data as any)
      .then(({ insertedId }) => ({
        _id: idToString(insertedId),
      }))
  );

export const create = async <
  T extends TCollectionInputSchemas,
  R extends TCollectionSchemas,
  C extends THandlerContext
>(
  ctx: C,
  { data, params }: IMongoCreate<T>
): Promise<R> =>
  createWriteOnly<T, C>(ctx, { data }).then(
    getFromWriteResultById<R, C>(ctx, { params })
  );

const getAutovalueContextExtensions =
  (extensions: CleanOption['extendAutoValueContext']) =>
  <C extends THandlerContext>(ctx: C) => ({
    ...extensions,
    userId: ctx.identity._id,
  });

const getInsertAutovalueExtensions = getAutovalueContextExtensions({
  isInsert: true,
});

const removeByIndices = <T>(indices: number[], array: T[]) => {
  const newArray = [...array];

  const indicesInDecendingOrder = indices.sort().reverse();

  indicesInDecendingOrder.forEach(index => newArray.splice(index, 1));

  return newArray;
};

const handleCreateManyError =
  <T extends { _id: MONGOID }>(docsWithIds: T[]) =>
  (err: any) => {
    if (!err.result) {
      throw err;
    }
    const nonWrittenIndices = err.result.getWriteErrors().map(R.prop('index'));

    const createdDocs = removeByIndices(nonWrittenIndices, docsWithIds);
    const createdIds = createdDocs.map(({ _id }) => _id);

    const msg = 'Error while inserting documents in bulk';

    throw new PartialError(
      {
        msg,
        info: { msg },
        cause: err,
      },
      { createdIds, createdDocs, nonWrittenIndices }
    );
  };

export const createMany =
  <B extends boolean>({ useMongoObjectId }: ICreateManyParams<B>) =>
  async <
    T extends TCollectionInputSchemas & {
      _id?: B extends true ? ObjectID : MONGOID;
    },
    C extends THandlerContext
  >(
    ctx: C,
    { data }: IMongoCreateMany<T>
  ): // TODO once agenda is removed, remove the ObjectID[] alternative
  Promise<{
    createdIds: Array<T['_id']>;
    createdDocs: T[];
  }> => {
    const schema = getSchema(ctx);
    schema.validate(data);

    const collection = await getConnectedCollection<C, T>(ctx);

    const docsWithIds = data.map(doc => ({
      ...(useMongoObjectId ? {} : { _id: collection.getNewId() }),
      ...schema.clean(doc, {
        extendAutoValueContext: getInsertAutovalueExtensions(ctx),
        getAutoValues: true,
      }),
    }));

    // ordered: false allows insertions to continue even with failures at
    // some docs. This makes sense since even without it, there may be
    // successes and failures. Without it the insertions just terminate at
    // the first error.
    return collection
      .insertMany(docsWithIds, { ordered: false })
      .catch(handleCreateManyError(docsWithIds))
      .then(result => {
        console.log(result);
        return {
          createdIds: Object.values(result.insertedIds) as Array<
            B extends true ? ObjectID : MONGOID
          >,
          createdDocs: docsWithIds,
        };
      });
  };

export const updateWriteOnly = async <
  T extends TCollectionSchemas,
  C extends THandlerContext
>(
  ctx: C,
  { id, data, params }: IMongoUpdate<T>
): Promise<{ _id: string }> => {
  const parsed = toNativeWriteParams(params);
  // Custom mongo's $set types don't like Exclusion
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateParams: UpdateQuery<T> = { $set: R.omit(['_id'], data) as any };
  const { modifiedCount } = await getConnectedCollection<C, T>(ctx).then(col =>
    col.updateOne(
      {
        ...parsed.selector,
        _id: id,
      } as FilterQuery<T>,
      updateParams,
      parsed.options
    )
  );
  if (modifiedCount !== 1) {
    throw errorNotFound(ctx, 'Update failed. No document was modified.');
  }

  // Careful here. If the document _id can be changed, this can be incorrect
  return { _id: id };
};

export const update = async <
  T extends TCollectionSchemas,
  C extends THandlerContext
>(
  ctx: C,
  payload: IMongoUpdate<T>
): Promise<T> =>
  updateWriteOnly<T, C>(ctx, payload).then(
    getFromWriteResultById<T, C>(ctx, payload)
  );

export const patchWriteOnly = async <
  T extends TCollectionSchemas,
  C extends THandlerContext
>(
  ctx: C,
  { id, params, data }: IMongoPatch<T>
): Promise<{ _id: string }> => {
  const parsed = toNativeWriteParams(params);
  const flattenedData = flattenObjectPreserveNatives(R.omit(['_id'], data));
  // Custom mongo's $set types don't like anything
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateParams: UpdateQuery<T> = { $set: flattenedData as any };

  const writeResult = await getConnectedCollection<C, T>(ctx).then(col =>
    col.updateOne(
      {
        ...parsed.selector,
        _id: id,
      } as FilterQuery<any>,
      updateParams,
      parsed.options
    )
  );

  if (writeResult.modifiedCount !== 1) {
    throw errorNotFound(ctx, 'Patch failed. No document was modified.');
  }

  // Careful here. If the document _id can be changed, this can be incorrect
  return { _id: id };
};

export const patch = <T extends TCollectionSchemas, C extends THandlerContext>(
  ctx: C,
  payload: IMongoPatch<T>
) =>
  patchWriteOnly(ctx, payload).then(getFromWriteResultById<T, C>(ctx, payload));

export const removeWriteOnly = async <
  T extends TCollectionSchemas,
  C extends THandlerContext
>(
  ctx: C,
  { id, params }: IMongoRemove<T>
): Promise<{ _id: string }> => {
  const parsed = toNativeReadParams(params);
  const selector: TMongoSelector<any> = {
    ...parsed.selector,
    _id: id,
  };
  const { deletedCount } = await getConnectedCollection<C, T>(ctx).then(col =>
    col.deleteOne(selector)
  );

  if (deletedCount !== 1) {
    throw errorNotFound(ctx, 'Remove failed. No document was removed.');
  }

  return { _id: id };
};

export const remove = async <
  T extends TCollectionSchemas,
  C extends THandlerContext
>(
  ctx: C,
  payload: IMongoRemove<T>
) => {
  const doc = await getFromWriteResultById<T, C>(
    ctx,
    payload
  )({ _id: payload.id });
  await removeWriteOnly(ctx, payload);
  return doc;
};

export const upsertWriteOnly = async <
  T extends TCollectionSchemas,
  C extends THandlerContext
>(
  ctx: C,
  { modifier, params }: IMongoUpsert<T>
): Promise<{ _id: string | undefined }> => {
  const { selector, options } = toNativeWriteParams(params);

  if (options.multi) {
    throw new Error(
      'Upsert options with multi: true encountered. Upsert must only be applied to a single document.'
    );
  }

  if (!selector || isEmpty(keys(selector))) {
    throw new Error(
      'Empty upsert selector encountered. Upsert selector must have at least one key.'
    );
  }

  const result = await getConnectedCollection<C, T>(ctx).then(col =>
    // Cast to make Custom mongo & Mongo types agree
    // TODO: Fix
    col.updateOne(selector, modifier as unknown, {
      ...options,
      upsert: true,
    })
  );

  if (!result.upsertedId && result.modifiedCount + result.upsertedCount !== 1) {
    throw new Error('Upsert failed. No document was created or modified.');
  }

  return {
    _id: result.upsertedId ? idToString(result.upsertedId._id) : undefined,
  };
};

export const upsert = async <
  T extends TCollectionSchemas,
  C extends THandlerContext
>(
  ctx: C,
  payload: IMongoUpsert<T>
): Promise<T> => {
  const writeResult = await upsertWriteOnly(ctx, payload);

  if (writeResult._id) {
    return getFromWriteResultById<T, C>(ctx, {
      params: { options: payload.params.options },
    })(writeResult);
  }

  const queryOptions = getFieldProjection(payload.params);
  return find<T, C>(ctx, {
    params: { selector: payload.params.selector, options: queryOptions },
  })
    .then(fetchCursorHead)
    .then(document => {
      if (!document) {
        ctx
          .getContextLogger()
          .warn(
            ctx,
            'No document was found with the original selector after upsert. Such modifications are not advised!'
          );
      }
      return document;
    });
};

export const processWith =
  <T>(processor: (doc: T) => T) =>
  (cursor: ICursor<T>): ICursor<T> => ({
    // NOTE(Samuli): The cursor.map(processor) did not work as intended and filtered out much more than it should for some weird reason
    fetch: () => cursor.fetch().then(R.filter(val => processor(val) != null)),
    forEach: cb => cursor.forEach((doc, i, c) => cb(processor(doc), i, c)),
    map: cb => cursor.map((doc, i, c) => cb(processor(doc), i, c)),
    count: () => cursor.count(),
  });
