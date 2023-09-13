import {
  IHandlerConfig,
  IHandlerContext,
  IMetaContext,
} from '@server/domains/lib/models';

export type TGetContext = IMetaContext & Pick<IHandlerContext, 'handlers'>;
export interface IGetPayload {
  industryId: string;
}
export interface IGetResult {}

export type TGetHandlerConfig = IHandlerConfig<
  TGetContext,
  IGetPayload,
  IGetResult
>;
