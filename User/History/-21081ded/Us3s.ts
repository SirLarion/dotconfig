import { Express } from 'express';
import { DocumentNode, GraphQLResolveInfo, print } from 'graphql';
import R from 'ramda';
import supertest from 'supertest';

import { TGlobals } from '@server/app/appGlobals';
import {
  addContextToRequest,
  createAppServer,
  createIntegrationCtx,
  withAppConfig,
  withGlobals,
  withMiddleware,
  withUserIdentity,
} from '@server/domains/lib/testUtilIntegration';
import { IUser } from '@server/lib/typedSchemas';
import { enrichContextMeta } from '@server/startup/enrichMeta';

import { createGraphQLServers } from './initGraphQLServers';

export type TGQLTestProps = {
  currentUser: IUser;
  throwOnErrors?: boolean;
  globalsOverrides?: Partial<TGlobals>;
};

export type TGQLClient = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: <TRes = any, TVars = Record<string, any>>(queryProps: {
    variables?: TVars;
    query: DocumentNode;
  }) => Promise<{ data: TRes }>;
};

const createFetch =
  (server: Express) =>
  (
    url: string,
    init: {
      headers: Record<string, string>;
      body: string;
    }
  ) =>
    supertest(server).post(url).set(init.headers).send(init.body);

const getOperationName = (query: DocumentNode) =>
  R.pipe(
    R.prop('definitions'),
    R.find(R.propEq('kind', 'OperationDefinition')),
    R.path<string>(['name', 'value'])
  )(query);

const createGQLClient = (server: Express, props: TGQLTestProps): TGQLClient => {
  const fetch = createFetch(server);
  return {
    query: ({ variables, query }) =>
      fetch('/graphql', {
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          operationName: getOperationName(query),
          variables,
          query: print(query),
        }),
      })
        .then(R.prop('body'))
        .then(
          R.unless(
            () => !props.throwOnErrors,
            throwOnGQLError(getOperationName(query))
          )
        ),
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const throwOnGQLError =
  (opName: string) =>
  <TData = any>(res: {
    data: TData;
    errors?: Array<{
      name: string;
      message: string;
      locations: Array<{ line: number; column: number }>;
      path: string[];
      extensions: Record<string, unknown>;
    }>;
  }) => {
    if (res.errors?.length) {
      const [gqlError] = res.errors;

      // eslint-disable-next-line no-console
      console.error(JSON.stringify(gqlError, null, 2));

      const err = new Error(gqlError.message);
      err.name = `${gqlError.name} (${opName})`;
      throw err;
    }
    return res;
  };

export const setupGQLTest = async (props: TGQLTestProps) => {
  const ctx = await R.pipe(
    withGlobals(props.globalsOverrides || {}),
    withAppConfig({
      corsAllowedHostGlobs: '*',
      httpRedirectAllowedHostGlobs: '',
      isDevelopment: true,
    }),
    withUserIdentity(props.currentUser),
    createIntegrationCtx
  )(null);

  const [gqlServer] = await createGraphQLServers(ctx.app);

  const createServerWith = createAppServer(
    withMiddleware(addContextToRequest(ctx), enrichContextMeta)
  );

  const server = createServerWith(gqlServer);
  const client = createGQLClient(server, props);

  return {
    ctx,
    server,
    client,
  };
};

export const mockResolverInfoWith = ({
  fieldName,
  returnType,
  fieldsToQuery,
}: {
  fieldName: string;
  returnType: string;
  fieldsToQuery: readonly string[];
}): GraphQLResolveInfo =>
  ({
    rootValue: null,
    cacheControl: null,
    fieldName,
    fieldNodes: [
      {
        kind: 'Field',
        name: {
          kind: 'Name',
          value: fieldName,
        },
        selectionSet: {
          kind: 'SelectionSet',
          selections: fieldsToQuery.map(fieldToQuery => ({
            kind: 'Field',
            name: {
              kind: 'Name',
              value: fieldToQuery,
            },
            arguments: [],
            directives: [],
          })),
        },
      },
    ],
    returnType,
    parentType: 'RootQuery',
    path: { key: 'questTemplates' },
    schema: {},
    fragments: {},
    operation: {},
    variableValues: {},
  } as any);
