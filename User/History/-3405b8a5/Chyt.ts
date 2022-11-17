import {
  getNullableType,
  GraphQLField,
  GraphQLInputField,
  GraphQLInputObjectType,
  GraphQLOutputType,
  GraphQLSchema,
  isListType,
} from 'graphql';
import { TypeMap } from 'graphql/type/schema';
import { get } from 'lodash';

import {
  asGraphQLArgument,
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
  (schema: GraphQLSchema, filterTypeName?: string) =>
  <TSource, TContext>(field: GraphQLField<TSource, TContext>) => {
    const nullableListType = getListNullableType(field);

    if (!isListType(nullableListType)) {
      throw new Error(
        `@filterable cannot be used for non list or connection types. got ${field.type}`
      );
    }

    const typeMap = schema.getTypeMap();

    if (filterTypeName && !typeMap[filterTypeName]) {
      throw new Error(
        `Cannot use @filterable(${filterTypeName}). Type: ${filterTypeName} does not exist.`
      );
    }

    const fieldType =
      typeMap[filterTypeName] || getNullableType(nullableListType.ofType);
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
