import { IOrganization } from '@server/collections/organizations';
import {
  IHandlerConfig,
  IHandlerContext,
  IMetaContext,
} from '@server/domains/lib/models';

export type TUpdateContext = IMetaContext & Pick<IHandlerContext, 'handlers'>;
export interface IUpdatePayload {
  organizationId: string;
  industryId: string;
}

export type TUpdateHandlerConfig = IHandlerConfig<
  TUpdateContext,
  IUpdatePayload,
  IOrganization
>;
