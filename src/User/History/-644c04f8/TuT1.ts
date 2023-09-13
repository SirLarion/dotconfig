import { forEachField } from '@graphql-tools/utils';
import { GraphQLField, GraphQLSchema } from 'graphql';
import { get, merge } from 'lodash';

import { IMongoParams } from '@server/domains/collection/lib/mongo/lib/models';

import { filterVisitor, resolverFilterParserMongo } from './filter/filter';
import {
  paginationVisitor,
  resolverPaginationParserMongo,
} from './pagination/pagination';
import { resolverSortParserMongo, sortVisitor } from './sort/sort';
import { getExtensionsResult, visitWith } from './lib';
import { EExtensionAnnotation } from './models';

export type TExtensionArgs<T = {}> = Record<string, unknown> & T;

// const getExtensionType = <TSource, TContext>(
//   field: GraphQLField<TSource, TContext>
// ) => {
//   const desc = get(field, 'description', '');
//   const start = desc.indexOf('@');
//   const re = /[^()]+(?=\))/g;
//   if (start >= 0) {
//     const type = desc.slice(start).match(re)[0];
//   }
//   return undefined;
// };

const isExtensionEnabled =
  (annotation: EExtensionAnnotation) =>
  <TSource, TContext>(field: GraphQLField<TSource, TContext>): boolean =>
    get(field, 'description', '').indexOf(annotation) >= 0;

const filterExtension = {
  predicate: isExtensionEnabled(EExtensionAnnotation.FILTER),
  visitor: filterVisitor,
};
const sortExtension = {
  predicate: isExtensionEnabled(EExtensionAnnotation.SORT),
  visitor: sortVisitor,
};
const paginationExtension = {
  predicate: isExtensionEnabled(EExtensionAnnotation.PAGINATION),
  visitor: paginationVisitor,
};

export const extendSchema = (schema: GraphQLSchema) => {
  const visitors = [
    visitWith(sortExtension.predicate, sortExtension.visitor(schema)),
    visitWith(filterExtension.predicate, filterExtension.visitor(schema)),
    visitWith(
      paginationExtension.predicate,
      paginationExtension.visitor(schema)
    ),
  ];
  visitors.forEach(visitor => forEachField(schema, visitor));
};

export const combineMongoParserResults = (
  results: IMongoParams[]
): IMongoParams =>
  results.reduce(merge, {
    selector: {},
    options: {},
  });

export const getExtensionsMongoSelector = getExtensionsResult<IMongoParams>(
  combineMongoParserResults
)([
  resolverFilterParserMongo,
  resolverSortParserMongo,
  resolverPaginationParserMongo,
]);
