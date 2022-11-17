import { TSendResult } from '@server/domains/integration/email/lib/send.models';
import {
  IHandlerConfig,
  IHandlerContext,
  IMetaContext,
} from '@server/domains/lib/models';

export type TSendUserListCSVEmailContext = IMetaContext &
  Pick<IHandlerContext, 'handlers' | 'getConfig' | 'getAsset'>;

export interface ISendUserListCSVEmailPayload {
  signedUrl: string;
  organizationId: string;
  impersonatorId?: string;
}

export type TSendUserListCSVEmailHandlerConfig = IHandlerConfig<
  TSendUserListCSVEmailContext,
  ISendUserListCSVEmailPayload,
  TSendResult
>;
