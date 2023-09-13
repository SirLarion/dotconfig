import { IOrganization } from '@server/collections/organizations';
import {
  IHandlerConfig,
  IHandlerContext,
  IMetaContext,
} from '@server/domains/lib/models';
import { IDomain } from '@server/lib/typedSchemas/Organization/models';

export type TRemoveContext = IMetaContext & Pick<IHandlerContext, 'handlers'>;

export interface IRemovePayload {
  organizationId: string;
  domainInput: IDomain;
}

export type TRemoveHandlerConfig = IHandlerConfig<
  TRemoveContext,
  IRemovePayload,
  IOrganization
>;
