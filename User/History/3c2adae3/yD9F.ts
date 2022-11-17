import {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLInputObjectTypeConfig,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLOutputType,
  GraphQLScalarType,
  GraphQLString,
} from 'graphql';
import { camelCase, capitalize, snakeCase } from 'lodash';
import { keys } from 'ramda';

import * as sql from '@server/api/graphql/extensions/sql/escape';
import { GraphQLTimestamp } from '@server/api/graphql/scalars/timestamp';
import { IQueryPayload } from '@server/domains/analytics/cubes/lib/query.models';

import {
  BQ_IN_OPERATORS,
  BQ_OPERATORS,
  BQ_ORDERBY,
  BQ_SCHEMA_MODE_REQUIRED,
  BQ_SCHEMA_TYPE_BIGNUMERIC,
  BQ_SCHEMA_TYPE_BOOL,
  BQ_SCHEMA_TYPE_DATE,
  BQ_SCHEMA_TYPE_FLOAT,
  BQ_SCHEMA_TYPE_INT,
  BQ_SCHEMA_TYPE_NUMERIC,
  BQ_SCHEMA_TYPE_STRING,
  BQ_SCHEMA_TYPE_TIMESTAMP,
  BQ_SIMPLE_AGGREGATE_FUNCTIONS,
  BQ_STRING_OPERATORS,
  IBQColumnSchema,
  TBigQuerySchemaSupportedModes,
  TBigQuerySchemaSupportedTypes,
} from '../bq/models';
import { connectionDefinitions, forwardConnectionArgs } from '../relay';

import { TGraphQLTypedefFromSqlSchema } from './models';

const gqlOrderByEnumFields = (name: string, columns: string[]) =>
  columns
    .map(column =>
      keys(BQ_ORDERBY)
        .map(operator => ({
          [`${column}_${operator}`]: {
            value: `${column}_${operator}`,
          },
        }))
        .reduce((p, c) => ({ ...p, ...c }), {})
    )
    .reduce((p, c) => ({ ...p, ...c }), {});

const sqlColumnToScalar = (
  type: TBigQuerySchemaSupportedTypes
): GraphQLScalarType => {
  switch (type) {
    case BQ_SCHEMA_TYPE_INT:
      return GraphQLInt;
    case BQ_SCHEMA_TYPE_FLOAT:
      return GraphQLFloat;
    case BQ_SCHEMA_TYPE_NUMERIC:
      return GraphQLFloat;
    case BQ_SCHEMA_TYPE_BIGNUMERIC:
      return GraphQLFloat;
    case BQ_SCHEMA_TYPE_BOOL:
      return GraphQLBoolean;
    case BQ_SCHEMA_TYPE_STRING:
      return GraphQLString;
    case BQ_SCHEMA_TYPE_TIMESTAMP:
      return GraphQLTimestamp;
    case BQ_SCHEMA_TYPE_DATE:
      return GraphQLTimestamp;
    default:
      throw new Error(`SQL type ${type} not supported`);
  }
};

const sqlColumnNullable =
  (mode: TBigQuerySchemaSupportedModes) => (type: GraphQLScalarType) =>
    mode === BQ_SCHEMA_MODE_REQUIRED ? new GraphQLNonNull(type) : type;

export const gqlTypedefFromSqlSchema: TGraphQLTypedefFromSqlSchema = (
  name: string,
  columns: IBQColumnSchema[]
): GraphQLObjectType => {
  return new GraphQLObjectType({
    name,
    fields: columns
      .map(column => ({
        [camelCase(column.name)]: {
          description: column.description,
          type: sqlColumnNullable(column.mode)(sqlColumnToScalar(column.type)),
        },
      }))
      .reduce((prev, current) => ({ ...prev, ...current })),
  });
};

export interface IAggregationOperator {
  name: string;
  description: string | null;
  resolveConnectionType: (
    name: string,
    fieldInputType: IBQColumnSchema[]
  ) => GraphQLOutputType;
  resolveOrderByEnums: (
    name: string,
    fieldInputType: IBQColumnSchema[]
  ) => {
    [x: string]: {
      value: string;
    };
  };
  resolveSql: (input: unknown) => Array<Partial<IQueryPayload>>;
}

const GROUP_BY_TIMESTAMP = {
  timestampByDay: 'DAY',
  timestampByWeek: 'WEEK',
  timestampByMonth: 'MONTH',
  timestampByQuarter: 'QUARTER',
  timestampByYear: 'YEAR',
};

const sqlQueriesForTimestampBys = keys(GROUP_BY_TIMESTAMP)
  .map(key => ({
    [key]: {
      select: [
        sql.raw(
          `TIMESTAMP_TRUNC(\`timestamp\`, ${GROUP_BY_TIMESTAMP[key]}) AS \`dimensions__${key}\``
        ),
      ],
      groupBy: [sql.raw(`\`dimensions__${key}\``)],
    } as Partial<IQueryPayload>,
  }))
  .reduce((prev, current) => ({ ...prev, ...current }));

const columnsAsFields = (columns: IBQColumnSchema[]) =>
  columns
    .map(column => ({
      [camelCase(column.name)]: {
        description: column.description,
        type: sqlColumnNullable(column.mode)(sqlColumnToScalar(column.type)),
      },
    }))
    .reduce((prev, current) => ({ ...prev, ...current }));

const aggregation = (
  aggregator: string,
  aggregatorSql: string,
  aggregatorParameter?: string
): IAggregationOperator => ({
  name: aggregator,
  description: 'List of dimensions to group by',
  resolveConnectionType: (name: string, columns: IBQColumnSchema[]) =>
    new GraphQLObjectType({
      name: `${name}${capitalize(aggregator)}`,
      fields: {
        ...columnsAsFields(columns),
      },
    }),
  resolveOrderByEnums: (name: string, columns: IBQColumnSchema[]) =>
    gqlOrderByEnumFields(name, [
      ...columns.map(column => `${aggregator}__${camelCase(column.name)}`),
    ]),
  resolveSql: (gqlAggregateNodeFields: string[]) => [
    {
      select: gqlAggregateNodeFields
        .map(field => [field, snakeCase(field)])
        .map(([alias, column]) =>
          sql.join(
            [
              sql.join(
                [
                  sql.raw(aggregatorSql),
                  sql.raw(
                    `(${aggregatorParameter ? `${aggregatorParameter} ` : ''}`
                  ),
                  sql.identifier(column),
                  sql.raw(')'),
                ],
                ''
              ),
              sql.raw('AS'),
              sql.identifier(`${aggregator}__${alias}`),
            ],
            ' '
          )
        ),
    },
  ],
});

export const aggregateOperators: IAggregationOperator[] = [
  {
    name: 'dimensions',
    description: 'List of dimensions to group by',
    resolveConnectionType: (name: string, columns: IBQColumnSchema[]) =>
      new GraphQLObjectType({
        name: `${name}Dimensions`,
        fields: {
          ...columnsAsFields(columns),
          ...keys(GROUP_BY_TIMESTAMP)
            .map(column => ({
              [camelCase(column)]: {
                type: sqlColumnToScalar(BQ_SCHEMA_TYPE_TIMESTAMP),
              },
            }))
            .reduce((prev, current) => ({ ...prev, ...current })),
        },
      }),
    resolveOrderByEnums: (name: string, columns: IBQColumnSchema[]) =>
      gqlOrderByEnumFields(name, [
        ...columns.map(column => `dimensions__${camelCase(column.name)}`),
        ...keys(GROUP_BY_TIMESTAMP).map(column => `dimensions__${column}`),
      ]),
    resolveSql: (gqlNodeFields: string[]) => [
      {
        select: [
          ...gqlNodeFields
            .filter(field => !(field in sqlQueriesForTimestampBys))
            .map(field => [field, snakeCase(field)])
            .map(([alias, column]) =>
              sql.join(
                [
                  sql.identifier(column),
                  sql.raw('AS'),
                  sql.identifier(`dimensions__${alias}`),
                ],
                ' '
              )
            ),
        ],
        groupBy: gqlNodeFields
          .filter(field => !(field in sqlQueriesForTimestampBys))
          .map(field => sql.raw(`\`dimensions__${field}\``)),
      },
      ...gqlNodeFields.map(field =>
        field in sqlQueriesForTimestampBys
          ? sqlQueriesForTimestampBys[field]
          : {}
      ),
    ],
  },
  aggregation('countDistinct', 'COUNT', 'DISTINCT'),
  aggregation('stdDev', 'STDDEV'),

  ...keys(BQ_SIMPLE_AGGREGATE_FUNCTIONS).map(op =>
    aggregation(op, BQ_SIMPLE_AGGREGATE_FUNCTIONS[op])
  ),
];

export const aggregateOperatorsPerName = aggregateOperators
  .map(agg => ({ [agg.name]: agg }))
  .reduce((prev, current) => ({ ...prev, ...current }));

export const gqlAggregationTypedefFromSqlSchema: TGraphQLTypedefFromSqlSchema =
  (name: string, columns: IBQColumnSchema[]): GraphQLObjectType => {
    return new GraphQLObjectType({
      name,
      fields: aggregateOperators
        .map(operator => ({
          [operator.name]: {
            type: operator.resolveConnectionType(name, columns),
          },
        }))
        .reduce((prev, current) => ({ ...prev, ...current })),
    });
  };

const EXTENSION_KEY = 'com.hoxhunt:tableName';

const addTableToExtensions = <
  T extends { extensions?: Pick<GraphQLInputObjectTypeConfig, 'extensions'> }
>(
  input: T,
  tableName: string
): T => {
  input.extensions = { ...input.extensions, ...{ [EXTENSION_KEY]: tableName } };

  return input;
};

export const getTableNameFromExtensions = <
  T extends { extensions?: Pick<GraphQLInputObjectTypeConfig, 'extensions'> }
>(
  input: T
): string => {
  return input.extensions[EXTENSION_KEY];
};

export const generateGqlResolverType = (
  name: string,
  columns: IBQColumnSchema[],
  table: string,
  resolver: any,
  aggregate?: boolean
): GraphQLObjectType => {
  const filterInput: GraphQLInputObjectType = new GraphQLInputObjectType({
    name: camelCase(`${name}_filter`),
    fields: () => ({
      and: { type: new GraphQLList(filterInput), defaultValue: undefined },
      or: { type: new GraphQLList(filterInput), defaultValue: undefined },
      ...columns
        .map(column =>
          keys(
            column.type !== BQ_SCHEMA_TYPE_STRING
              ? BQ_OPERATORS
              : BQ_STRING_OPERATORS
          )
            .map(operator => ({
              [`${camelCase(column.name)}_${operator}`]: {
                type: sqlColumnToScalar(column.type),
              },
            }))
            .reduce((p, c) => ({ ...p, ...c }), {})
        )
        .reduce((p, c) => ({ ...p, ...c }), {}),
      ...columns
        .map(column =>
          keys(BQ_IN_OPERATORS)
            .map(operator => ({
              [`${camelCase(column.name)}_${operator}`]: {
                type: new GraphQLList(sqlColumnToScalar(column.type)),
              },
            }))
            .reduce((p, c) => ({ ...p, ...c }), {})
        )
        .reduce((p, c) => ({ ...p, ...c }), {}),
    }),
  });

  const orderByEnums = aggregate
    ? aggregateOperators
        .map(operator => operator.resolveOrderByEnums(name, columns))
        .reduce((prev, current) => ({ ...prev, ...current }))
    : gqlOrderByEnumFields(
        name,
        columns.map(column => camelCase(column.name))
      );

  const orderBy = new GraphQLEnumType({
    name: camelCase(`${name}_order_by_fields`),
    values: orderByEnums,
  });

  const type = new GraphQLObjectType({
    name: aggregate
      ? `${camelCase(name)}AggregateQuery`
      : `${camelCase(name)}Query`,
    fields: {
      [`${camelCase(name)}`]: {
        type: addTableToExtensions(
          connectionDefinitions({
            nodeType: aggregate
              ? gqlAggregationTypedefFromSqlSchema(
                  camelCase(name) + 'Aggregate',
                  columns
                )
              : gqlTypedefFromSqlSchema(camelCase(name), columns),
            connectionFields: {
              totalCount: {
                type: GraphQLInt,
                description:
                  'Identifies the total count of items in the connection.',
              },
              pageInfo: {
                type: new GraphQLObjectType({
                  name: 'AnalyticsPageInfo',
                  description: 'Information about pagination in a connection.',
                  fields: () => ({
                    hasNextPage: {
                      type: new GraphQLNonNull(GraphQLBoolean),
                      description:
                        'When paginating forwards, are there more items?',
                    },
                    startCursor: {
                      type: GraphQLString,
                      description:
                        'When paginating backwards, the cursor to continue.',
                    },
                    endCursor: {
                      type: GraphQLString,
                      description:
                        'When paginating forwards, the cursor to continue.',
                    },
                  }),
                }),
              },
            },
          }).connectionType,
          table
        ),
        args: {
          filter: {
            type: filterInput,
            description: 'Filters query results based on values of fields',
          },
          orderBy: {
            type: new GraphQLList(orderBy),
            description: 'Sort results of the query',
          },
          ...forwardConnectionArgs,
        },
        resolve: resolver,
      },
    },
  });

  return type;
};
