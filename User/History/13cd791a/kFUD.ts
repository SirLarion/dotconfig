import {
  IHandlerConfig,
  IHandlerContext,
  IMetaContext,
} from '@server/domains/lib/models';
import { IDomain } from '@server/lib/typedSchemas/Organization/models';

export type TAddContext = IMetaContext & Pick<IHandlerContext, 'handlers'>;

export interface IAddPayload {
  organizationId: string;
  domainInput: IDomain;
}

export type TAddHandlerConfig = IHandlerConfig<
  TAddContext,
  IAddPayload,
  IDomain
>;
