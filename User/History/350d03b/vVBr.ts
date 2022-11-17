import {
  IHandlerConfig,
  IHandlerContext,
  IMetaContext,
} from '@server/domains/lib/models';

export type TFetchEmailDeliveryAccessTokenContext = IMetaContext &
  Pick<
    IHandlerContext,
    'handlers' | 'getConfig' | 'getGlobal' | 'getContextLogger'
  >;

export interface IFetchEmailDeliveryAccessTokenPayload {
  emailAddress: string;
}

export interface IFetchEmailDeliveryAccessTokenResult {
  accessToken: string | undefined;
}

export type TFetchEmailDeliveryAccessTokenHandlerConfig = IHandlerConfig<
  TFetchEmailDeliveryAccessTokenContext,
  IFetchEmailDeliveryAccessTokenPayload,
  IFetchEmailDeliveryAccessTokenResult
>;
