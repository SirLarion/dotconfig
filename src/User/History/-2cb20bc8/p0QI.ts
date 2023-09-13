import {
  IHandlerConfig,
  IHandlerContext,
  IMetaContext,
} from '@server/domains/lib/models';

export type TOnboardingInvitationContext = IMetaContext &
  Pick<IHandlerContext, 'handlers'>;
export interface IOnboardingInvitationPayload {}
export interface IOnboardingInvitationResult {}

export type TOnboardingInvitationHandlerConfig = IHandlerConfig<
  TOnboardingInvitationContext,
  IOnboardingInvitationPayload,
  IOnboardingInvitationResult
>;
