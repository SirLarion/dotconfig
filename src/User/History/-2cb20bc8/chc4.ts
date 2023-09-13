import {
  IHandlerConfig,
  IHandlerContext,
  IMetaContext,
} from '@server/domains/lib/models';

export type TInvitationContext = IMetaContext &
  Pick<IHandlerContext, 'handlers'>;
export interface ISendOnboardingInvitationToAdminsPayload {}
export interface ISendOnboardingInvitationToAdminsResult {}

export type TSendOnboardingInvitationToAdminsHandlerConfig = IHandlerConfig<
  TInvitationContext,
  ISendOnboardingInvitationToAdminsPayload,
  ISendOnboardingInvitationToAdminsResult
>;
