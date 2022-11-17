import { ISendResult } from '@server/domains/integration/email/lib/send.models';
import {
  IHandlerConfig,
  IHandlerContext,
  IMetaContext,
} from '@server/domains/lib/models';

export type TSendUserListCSVEmailContext = IMetaContext &
  Pick<IHandlerContext, 'handlers'>;
export interface ISendUserListCSVEmailPayload {
  signedUrl: string;
}

export type TSendUserListCSVEmailHandlerConfig = IHandlerConfig<
  TSendUserListCSVEmailContext,
  ISendUserListCSVEmailPayload,
  ISendResult
>;
