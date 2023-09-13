import { IOrganization } from '@server/collections/organizations';
import {
  IHandlerConfig,
  IHandlerContext,
  IMetaContext,
} from '@server/domains/lib/models';
import { IUser } from '@server/lib/typedSchemas';

export type TFetchEmailDeliveryAccessTokenContext = IMetaContext &
  Pick<
    IHandlerContext,
    'handlers' | 'getConfig' | 'getGlobal' | 'getContextLogger'
  >;

export interface IFetchEmailDeliveryAccessTokenPayload {
  user: IUser;
  organization: IOrganization;
}

export interface IFetchEmailDeliveryAccessTokenResult {
  accessToken: string;
}

export type TFetchEmailDeliveryAccessTokenHandlerConfig = IHandlerConfig<
  TFetchEmailDeliveryAccessTokenContext,
  IFetchEmailDeliveryAccessTokenPayload,
  IFetchEmailDeliveryAccessTokenResult
>;
