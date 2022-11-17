import {
  IHandlerConfig,
  IHandlerContext,
  IMetaContext,
} from '@server/domains/lib/models';
import { IUser } from '@server/lib/typedSchemas';

export type TUpdateEmailAddressContext = IMetaContext &
  Pick<IHandlerContext, 'handlers'>;
export interface IUpdateEmailAddressPayload {
  userId: string;
  orgId: string;
  emailAddress: string;
}

export type TUpdateEmailAddressHandlerConfig = IHandlerConfig<
  TUpdateEmailAddressContext,
  IUpdateEmailAddressPayload,
  IUser
>;
