import {
  getNullableType,
  GraphQLField,
  GraphQLInputField,
  GraphQLInputObjectType,
  GraphQLSchema,
  isListType,
} from 'graphql';
import { TypeMap } from 'graphql/type/schema';
import { get } from 'lodash';

import {
  asGraphQLArgument,
  getAnnotationType,
  getListNullableType,
  resolverArgParser,
} from '../lib';

import { getMongoFilter, mongoFieldConverter } from './mongo/argConverter';
import {
  constructCompositeMetaFilter,
  constructInputFields,
} from './schemaHelper';

export { SafeResolvers } from './schemaHelper';

export const FILTER_SUFFIX = '_filter';

const getFilterArgs = (resolverArgs: object) => get(resolverArgs, 'filter', {});

export const resolverFilterParser = resolverArgParser(getFilterArgs);
export const resolverFilterParserMongo = resolverFilterParser(
  getMongoFilter(mongoFieldConverter)
);

const getInputType = (
  typeMap: TypeMap,
  fieldKey: string,
  inputFields: GraphQLInputField[]
): GraphQLInputObjectType => {
  // Input object types are matched referentially when validating queries
  // Reuse the first one created for all subsequent filters
  if (typeMap[fieldKey] !== undefined) {
    return typeMap[fieldKey] as GraphQLInputObjectType;
  }

  return constructCompositeMetaFilter(fieldKey, inputFields);
};
export const filterVisitor =
  (schema: GraphQLSchema) =>
  <TSource, TContext>(field: GraphQLField<TSource, TContext>) => {
    const nullableListType = getListNullableType(field);

    const typeMap = schema.getTypeMap();
    const filterType = getAnnotationType(field, typeMap);

    if (!isListType(nullableListType)) {
      throw new Error(
        `@filterable cannot be used for non list or connection types. got ${field.type}`
      );
    }

    const fieldType = filterType || getNullableType(nullableListType.ofType);
    const fieldKey = `${fieldType}${FILTER_SUFFIX}`;

    const inputFields = constructInputFields(
      Object.values(fieldType.getFields())
    );

    const inputType = getInputType(typeMap, fieldKey, inputFields);

    field.args = [
      ...field.args,
      asGraphQLArgument({
        name: 'filter',
        type: inputType,
      }),
    ];

    typeMap[fieldKey] = inputType;
  };
