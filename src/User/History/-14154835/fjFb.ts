import {
  IHandlerConfig,
  IHandlerContext,
  IMetaContext,
} from '@server/domains/lib/models';

export type TUpdateEmailAddressContext = IMetaContext &
  Pick<IHandlerContext, 'handlers'>;
export interface IUpdateEmailAddressPayload {}
export interface IUpdateEmailAddressResult {}

export type TUpdateEmailAddressHandlerConfig = IHandlerConfig<
  TUpdateEmailAddressContext,
  IUpdateEmailAddressPayload,
  IUpdateEmailAddressResult
>;
