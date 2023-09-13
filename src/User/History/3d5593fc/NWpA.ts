import { makeExecutableSchema } from '@graphql-tools/schema';
import { stitchSchemas } from '@graphql-tools/stitch';
import R from 'ramda';

import { IApp } from '@server/app/models';

import { buildAnalyticsSchema } from './extensions/analyticsData/gqlSchema/schemaBuilder';
import { extendSchema } from './extensions/applyExtensions';
import { getGQLSchema } from './extensions/sql/bq/getBqSchemas';
import { filterSchemaNodesWithoutDirective } from './externalSchemaTransform';
import getResolvers from './resolvers';
import { getTypeDefs } from './schema';

export const buildSchemas = async (app: IApp) => {
  const typeDefs = getTypeDefs();
  const appResolvers = getResolvers();

  let appSchema = makeExecutableSchema({
    typeDefs,
    resolvers: appResolvers,
  });

  extendSchema(appSchema);

  const [
    cubesSchema,
    { schema: analyticsSchema, resolvers: analyticsResolvers },
  ] = await Promise.all([getGQLSchema(app), buildAnalyticsSchema(app)]);

  const resolvers = R.mergeDeepRight(appResolvers, analyticsResolvers);

  appSchema = stitchSchemas({
    subschemas: [cubesSchema, appSchema, analyticsSchema],
    mergeDirectives: true,
    resolvers,
    typeMergingOptions: {
      // Use descriptions from the first schema if one exists in it
      typeDescriptionsMerger: candidates =>
        candidates[0]?.type?.description
          ? candidates[0]?.type?.description
          : candidates[1]?.type?.description,
    },
    onTypeConflict: (left, right) => {
      if (left === right) {
        return left;
      }
      throw Error(
        `Type conflict with merging analytics schemas and our main schema, Conflicting types: left ${left.name}, right ${right.name}`
      );
    },
  });

  const externalSchema = filterSchemaNodesWithoutDirective(appSchema);

  return { appSchema, externalSchema };
};
