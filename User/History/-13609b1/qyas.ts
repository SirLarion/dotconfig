import { IOrganization } from '@server/collections/organizations';
import {
  IHandlerConfig,
  IHandlerContext,
  IMetaContext,
} from '@server/domains/lib/models';

export type TStartContext = IMetaContext &
  Pick<IHandlerContext, 'handlers' | 'getGlobal' | 'getAsset' | 'getConfig'>;
export interface IStartPayload {
  organizationId: string;
}
export type TStartResult = IOrganization;

export type TStartHandlerConfig = IHandlerConfig<
  TStartContext,
  IStartPayload,
  TStartResult
>;
