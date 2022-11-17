import {
  getNullableType,
  GraphQLArgument,
  GraphQLField,
  GraphQLObjectType,
  GraphQLOutputType,
  isObjectType,
} from 'graphql';

import { OP_SEPARATOR, SUBFIELD_SEPARATOR, TAdapterFn } from './models';

export const resolverArgParser =
  (argGetter: (resolverArgs: object) => object) =>
  <S extends object>(adapter: TAdapterFn<S>) =>
  (resolverArgs: object) =>
    adapter(argGetter(resolverArgs));

export const parseArgName = (rawKey: string) => {
  const i0 = rawKey.lastIndexOf(SUBFIELD_SEPARATOR);
  const i1 = rawKey.substring(i0 + 2).indexOf(OP_SEPARATOR);
  const field = rawKey.substring(0, i0 + 2 + i1);
  const operator = rawKey.substring(i0 + 2 + i1 + 1);
  return {
    field,
    operator,
  };
};

export const visitWith =
  <TSource, TContext>(
    predicate: (field: GraphQLField<TSource, TContext>) => boolean,
    visitor: (field: GraphQLField<TSource, TContext>) => void
  ) =>
  (field: GraphQLField<TSource, TContext>) => {
    if (predicate(field)) {
      visitor(field);
    }
  };

export const getAnnotationType = <TSource, TContext>(
  field: GraphQLField<TSource, TContext>
): string | undefined => {
  const desc = field.description || '';
  const i = desc.indexOf('@');
  const re = /[^()]+(?=\))/g;
  if (i >= 0) {
    const matches = desc.slice(i).match(re);
    return matches ? matches[0] : undefined;
  }
  return undefined;
};

export const getExtensionsResult =
  <TParserResult>(
    combineParserResults: (results: TParserResult[]) => TParserResult
  ) =>
  (argParsers: Array<(resolverArgs: object) => TParserResult>) =>
  (resolverArgs: object): TParserResult => {
    const results = argParsers.map(fn => fn(resolverArgs));
    return combineParserResults(results);
  };

export const isConnectionType = (
  type: GraphQLOutputType
): type is GraphQLObjectType => {
  return (
    isObjectType(type) &&
    type.astNode.interfaces.findIndex(
      ({ name }) => name.value === 'Connection'
    ) !== -1
  );
};

export const isActionResultType = (
  type: GraphQLOutputType
): type is GraphQLObjectType => {
  return (
    isObjectType(type) &&
    type.astNode.interfaces.findIndex(
      ({ name }) => name.value === 'ActionResult'
    ) !== -1
  );
};

export const getListNullableType = <TSource, TContext>(
  field: GraphQLField<TSource, TContext>
) => {
  const nullableType = getNullableType(field.type);

  if (isConnectionType(nullableType)) {
    const { nodes } = nullableType.getFields();
    return getNullableType(nodes.type);
  }

  if (isActionResultType(nullableType)) {
    const { result } = nullableType.getFields();
    return getNullableType(result.type);
  }

  return nullableType;
};

export const asGraphQLArgument = ({
  name,
  type,
}: Pick<GraphQLArgument, 'name' | 'type'>): GraphQLArgument => ({
  name,
  type,
  defaultValue: undefined,
  astNode: undefined,
  deprecationReason: undefined,
  extensions: undefined,
  description: undefined,
});
