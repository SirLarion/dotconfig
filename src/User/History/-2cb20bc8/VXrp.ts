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
export interface IOnboardingInvitationResult {}

export type TOnboardingInvitationHandlerConfig = IHandlerConfig<
  TOnboardingInvitationContext,
  IOnboardingInvitationPayload,
  IOnboardingInvitationResult
>;
