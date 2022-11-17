import {
  IHandlerConfig,
  IHandlerContext,
  IMetaContext,
} from '@server/domains/lib/models';

export type TAddContext = IMetaContext & Pick<IHandlerContext, 'handlers'>;
export interface IAddPayload {}
export interface IAddResult {}

export type TAddHandlerConfig = IHandlerConfig<
  TAddContext,
  IAddPayload,
  IAddResult
>;
