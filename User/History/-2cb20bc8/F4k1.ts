import {
  IHandlerConfig,
  IHandlerContext,
  IMetaContext,
} from '@server/domains/lib/models';

export type TSendOnboardingInvitationToAdminsContext = IMetaContext &
  Pick<IHandlerContext, 'handlers'>;
export interface ISendOnboardingInvitationToAdminsPayload {}
export interface ISendOnboardingInvitationToAdminsResult {}

export type TSendOnboardingInvitationToAdminsHandlerConfig = IHandlerConfig<
  TSendOnboardingInvitationToAdminsContext,
  ISendOnboardingInvitationToAdminsPayload,
  ISendOnboardingInvitationToAdminsResult
>;
