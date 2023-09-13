import { ISendResult } from '@server/domains/integration/email/lib/send.models';
import {
  IHandlerConfig,
  IHandlerContext,
  IMetaContext,
} from '@server/domains/lib/models';

export type TOnboardingInvitationContext = IMetaContext &
  Pick<IHandlerContext, 'handlers' | 'getGlobal' | 'getAsset' | 'getConfig'>;
export interface IOnboardingInvitationPayload {
  organizationId: string;
}
export type TOnboardingInvitationResult = ISendResult[];

export type TOnboardingInvitationHandlerConfig = IHandlerConfig<
  TOnboardingInvitationContext,
  IOnboardingInvitationPayload,
  TOnboardingInvitationResult
>;
