import { IOrganization } from '@server/collections/organizations';
import {
  IHandlerConfig,
  IHandlerContext,
  IMetaContext,
} from '@server/domains/lib/models';

export type TCreateContext = IMetaContext &
  Pick<IHandlerContext, 'handlers' | 'getContextLogger'>;

export interface ICreatePayload {
  data: Pick<IOrganization, 'name'> & Partial<IOrganization>;
}

export type TCreateHandlerConfig = IHandlerConfig<
  TCreateContext,
  ICreatePayload,
  IOrganization
>;
