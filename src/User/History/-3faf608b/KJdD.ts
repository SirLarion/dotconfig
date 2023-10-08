import {
  IHandlerConfig,
  IHandlerContext,
  IMetaContext,
} from '@server/domains/lib/models';

export type TRemoveDomainContext = IMetaContext &
  Pick<IHandlerContext, 'handlers'>;
export interface IRemoveDomainPayload {
  organizationId: string;
  domainName: string;
}
export interface IRemoveDomainResult {}

export type TRemoveDomainHandlerConfig = IHandlerConfig<
  TRemoveDomainContext,
  IRemoveDomainPayload,
  IRemoveDomainResult
>;