import fetch, { Headers, Response } from 'node-fetch';
import R from 'ramda';
import { URLSearchParams } from 'url';

import { telemetryToHeaders } from '@hox/telemetry-shared/http';

import { ROLES } from '@server/domains/lib/auth/roles';

import {
  THttpOptions,
  THttpResponse,
  TRequestContext,
  TRequestHandlerConfig,
} from './lib/request.models';

/**
 * Serializes payload into json
 */
const withJsonPayload = ({ data, ...rest }: THttpOptions) =>
  R.merge(
    R.any(R.equals(rest.method), ['post', 'put', 'delete']) && data
      ? { body: JSON.stringify(data) }
      : {},
    rest
  );

/**
 * Serializes params to query string
 */
const withUrlParams = ({ url, params, ...rest }: THttpOptions) =>
  R.merge(
    { url: `${url}${params ? '?' : ''}${new URLSearchParams(params)}` },
    rest
  );

/**
 * Serializes telemetry to headers
 */
const withHeaders =
  (ctx: TRequestContext) =>
  ({ headers = {}, ...rest }: THttpOptions) =>
    R.merge(
      { headers: { ...headers, ...telemetryToHeaders(ctx.meta.telemetry) } },
      rest
    );

const getResult = async <D>(res: Response) => {
  const body = await res.text();
  const data = R.tryCatch<D>(
    text => JSON.parse(text),
    R.always(undefined)
  )(body);

  return {
    body,
    data,
  };
};

const headersToObj = (headers: Headers) =>
  Object.entries(headers.raw()).reduce(
    (acc, [key, values]) => ({ ...acc, [key]: values.join(',') }),
    {}
  );

const convertToHttpResponse = async <D>(
  res: Response
): Promise<THttpResponse<D>> =>
  getResult<D>(res).then(({ data, body }) => ({
    statusCode: res.status,
    headers: headersToObj(res.headers),
    body,
    data,
  }));

const request: TRequestHandlerConfig = {
  roles: ROLES,
  handler: async <D>(
    ctx: TRequestContext,
    payload: THttpOptions
  ): Promise<THttpResponse<D>> =>
    Promise.resolve(withJsonPayload(payload))
      .then(withUrlParams)
      .then(withHeaders(ctx))
      .then(({ url, ...rest }) => fetch(url, rest))
      .then(res => convertToHttpResponse<D>(res)),
};

export default request;
