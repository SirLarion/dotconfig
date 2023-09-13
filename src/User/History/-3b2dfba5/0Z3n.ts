import {
  getNamedType,
  getNullableType,
  GraphQLField,
  GraphQLObjectType,
  GraphQLSchema,
  isListType,
} from 'graphql';
import { get } from 'lodash';

import {
  asGraphQLArgument,
  getAnnotationType,
  getListNullableType,
  resolverArgParser,
} from '../lib';

import { getMongoFilter, mongoSortConverter } from './mongo/argConverter';
import {
  constructSortEnumInput,
  constructSortEnumValues,
  newGraphqlList,
} from './schemaHelper';

export const SORT_SUFFIX = '_sort';

const getFilterArgs = (resolverArgs: object) => get(resolverArgs, 'sort', []);

export const resolverSortParser = resolverArgParser(getFilterArgs);
export const resolverSortParserMongo = resolverSortParser(
  getMongoFilter(mongoSortConverter)
);

export const sortVisitor =
  (schema: GraphQLSchema) =>
  <TSource, TContext>(field: GraphQLField<TSource, TContext>) => {
    const nullableListType = getListNullableType(field);

    const typeMap = schema.getTypeMap();
    const sortType = getAnnotationType(field, typeMap);
    let fieldType = sortType;

    if (!isListType(nullableListType)) {
      if (!sortType) {
        throw new Error(
          `@sortable cannot be used for non list or connection types. Got ${field.type}`
        );
      }
    } else {
      fieldType = getNullableType(nullableListType.ofType) as GraphQLObjectType;
    }

    const fieldKey = `${fieldType}${SORT_SUFFIX}`;

    /* If an earlier visitor has already assigned the sort enum to the typemap, escape early to keep referential equality intact
  Make sure to use the existing sort enum since creating a new one will mess things up  */
    if (typeMap[fieldKey] !== undefined) {
      const inputType = newGraphqlList(typeMap[fieldKey]);

      field.args = [
        ...field.args,
        asGraphQLArgument({
          name: 'sort',
          type: inputType,
        }),
      ];
      return;
    }

    const inputFields = constructSortEnumValues(
      Object.values(fieldType.getFields())
    );
    const inputType = constructSortEnumInput(fieldKey, inputFields);

    field.args = [
      ...field.args,
      asGraphQLArgument({
        name: 'sort',
        type: inputType,
      }),
    ];

    typeMap[fieldKey] = getNamedType(inputType);
  };
