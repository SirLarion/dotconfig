import {
  IHandlerConfig,
  IHandlerContext,
  IMetaContext,
} from '@server/domains/lib/models';
import { IDomain } from '@server/lib/typedSchemas/Organization/models';

export type TUpdateContext = IMetaContext & Pick<IHandlerContext, 'handlers'>;

export interface IUpdatePayload {
  organizationId: string;
  domainInput: IDomain;
}

export type TUpdateHandlerConfig = IHandlerConfig<
  TUpdateContext,
  IUpdatePayload,
  IDomain
>;
