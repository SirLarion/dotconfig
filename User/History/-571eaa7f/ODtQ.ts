import {
  ELicense,
  ELicenseSet,
  ESeat,
} from '@server/domains/admin/licenses/lib/listAll.models';
import { ESupportedLocales } from '@server/lib/i18n';
import { ITag } from '@server/lib/typedSchemas';
import { IImage } from '@server/lib/typedSchemas/Image';
import { EIncidentPolicyName } from '@server/lib/typedSchemas/Incident/models';
import { TQuestTag } from '@server/lib/typedSchemas/QuestTemplate/QuestTemplate';
import { EUserGameMode } from '@server/lib/typedSchemas/User/models';

import { IBaseSchema } from '../Base';
import { IIndustry } from '../Industry/Industry';
import { IQuestCooldown } from '../QuestCooldown';

import {
  IContextOrganization,
  IContextPerson,
  IContextWebService,
} from './context/models';
import { EOrgQuizModuleState } from './OrgQuizModule';
import { EOrgQuizTemplateState } from './OrgQuizTemplate';
import { EThreatAnalysisPriority } from './OrgThreatSettings';

export enum EOrgRegion {
  US = 'us',
  EUROPE = 'europe',
  ASIA = 'asia',
}

export enum EOrgEmailEnvironment {
  MICROSOFT = 'microsoft',
  GOOGLE = 'google',
}

export enum ELeaderboardGrouping {
  DEPARTMENT = 'department',
  COUNTRY = 'country',
  SITE = 'site',
}

export interface IEmailDomainMapping {
  from: string;
  to: string;
}
export interface IDeliveryEmail {
  compressGlobs?: string[];
  privateSmtpConnectionString?: string;
  customHeaders?: ICustomHeader[];
  inlineImages?: boolean;
  useReturnPath?: boolean;
  useDkim?: boolean;
  customHiddenEmailBodyIdentifier?: string;
  useGmailDeliveryApi?: boolean;
}

export interface IDelivery {
  email: IDeliveryEmail;
}

export interface ICustomHeader {
  key: string;
  value: string;
}

export interface IOrgAutomaticReminders {
  enabled: boolean;
  startAfterNMissed: number;
  repeatEveryNMissed: number;
}

export interface IOrgGame {
  active: boolean;
  allowAnyoneToJoin: boolean;
  defaultGameMode: EUserGameMode;
  usersAreAnonymousByDefault: boolean;
  anonymousLeaderboards: boolean;
  leaderboardVisibility: IOrgLeaderboardVisibility;
  leaderboardGrouping: ELeaderboardGrouping;
  questCooldown?: IQuestCooldown;
  spicyModeEnabled: boolean;
  automaticReminders: IOrgAutomaticReminders;
  firstQuestTag: TQuestTag;
  // Should be added to life-cycle enum in future
  demoMode: boolean;
}

export interface IImages {
  logo?: IImage;
  useCustomOnboardingAssets?: boolean;
  logoEmail?: IImage;
  buttonLocationFirstQuest?: IImage;
  buttonLocationInvite?: IImage;
  buttonLocationWelcome?: IImage;
  // For now, icon must also be uploaded to plugin frontend. This will hopefully replace that in the future
  customPluginIcon?: IImage;
}

export interface IResults {
  customEmailDisclaimer?: string;
}

export interface IHeader {
  key: string;
  value: string;
}

export enum EThreatRedirectFormatBody {
  DEFAULT = 'DEFAULT',
  ORIGINAL_BODY = 'ORIGINAL_BODY',
}

export enum EThreatRedirectFormatAttachment {
  DEFAULT = 'DEFAULT',
  UNIQUE_NAME = 'UNIQUE_NAME',
  NONE = 'NONE',
}
export interface IThreatRedirectFormat {
  body: string;
  attachment: string;
  headers?: IHeader[];
}

export interface IPluginRedirect {
  redirectPhish: boolean;
  redirectSpam: boolean;
  uploadThreats: boolean;
  phishRedirectAddresses?: string[];
  spamRedirectAddresses?: string[];
  phishRedirectFormat?: IThreatRedirectFormat;
}

export interface IThreatRedirectionSettings {
  enabled: boolean;
  emailAddress?: string;
}

/**
 * Organization threat related settings
 *
 * TODO(Max): migrate threat settings here:
 *
 * uploadThreats, pluginRedirect, sendThreatFeedback
 */
export interface IThreatSettings {
  /**
   * Report to Platform
   *
   * If enabled, instruct plugin to report threat to email platform (Exchange server, 0365 instance, G Suite)
   */
  reportToPlatform: boolean;
  /**
   *
   * Additive to reportToPlatform
   *
   * If enabled, allow email platform vendor to use report data globally.
   * This functionality may not be present on all platforms.
   */
  allowPlatformVendorDataUsage: boolean;

  threatAnalysisPriority: EThreatAnalysisPriority;

  // The date after which the threatAnalysisPriority setting is disregarded and EThreatAnalysisPriority.DEFAULT is used instead.
  threatAnalysisPriorityExpiresAt?: Date;

  securityTeamName?: string;
}

export interface IGoogleClientId {
  clientId: string;
  addedAt: Date;
}

export interface IApiSettings {
  googleClientIds: IGoogleClientId[];
}

export interface IOfficeJSDomain {
  name: string;
  cert?: string;
}

export interface IOfficeJSPlugin {
  allowedDomains?: IOfficeJSDomain[];
  forceOnlyClientApis?: boolean;
}

export interface IPlugin {
  officejs: IOfficeJSPlugin;
  removeThreatAfterReporting: boolean;
  removeSimulationAfterReporting: boolean;
  userActedOnQuestionsEnabled?: boolean;
}

export interface INotifications {
  weeklyReportToAdmins: boolean;
  threatEscalationEmails: string[];
}

export interface ISSOSettings {
  enabled?: boolean;
  endPoint?: string;
  providerName?: string;
  cert?: string;
  certInfo?: IX509CertInfo;
  privateCert?: string;
  disableIdentifierFormat?: boolean;
  identifierFormat?: string;
}

export interface IX509CertInfo {
  validFrom?: Date;
  validTo?: Date;
}

export interface IDomain {
  name: string;
  defaultUiLanguage?: ESupportedLocales;
  defaultSimulationLanguages?: ESupportedLocales[];
  allowedSimulationLanguages?: ESupportedLocales[];
  context?: IOrgContext;
}

export interface IIncidentPolicySettings {
  policyName: EIncidentPolicyName;
  enabled: boolean;
  requireMaliciousHoxhuntRating: boolean;
  policySettings: object;
  useCustomEmailTemplate: boolean;
  emailTemplate?: IIncidentPolicyEmailTemplate;
}

export interface ICampaignPolicySettings extends IIncidentPolicySettings {
  policyName: EIncidentPolicyName.CAMPAIGN;
  policySettings: {
    creationThreshold: number;
  };
}

export interface IBusinessEmailCompromisePolicySettings
  extends IIncidentPolicySettings {
  policyName: EIncidentPolicyName.BUSINESS_EMAIL_COMPROMISE;
  policySettings: {
    creationThreshold: number;
  };
}

export interface IUserActedOnThreatPolicySettings
  extends IIncidentPolicySettings {
  policyName: EIncidentPolicyName.USER_ACTED_ON_THREAT;
  policySettings: {};
}

export interface IIncidentPolicyEmailTemplate {
  subject: string;
  body: string;
}

export type TIncidentPolicySettings =
  | ICampaignPolicySettings
  | IBusinessEmailCompromisePolicySettings
  | IUserActedOnThreatPolicySettings;

export interface IIncidentVtApiKeySettings {
  name: string;
  value: string;
}

export interface IIncidentSettings {
  policies?: TIncidentPolicySettings[];
  incidentResponseModuleEnabled?: boolean;
  huntingApiUrl?: string;
  vtApiKey?: IIncidentVtApiKeySettings;
}

/**
 * A license set is a collection of licenses governing a set of features.
 * Such a feature set could be a product (training, response),
 * or any set of features that can be packaged and sold together.
 */
export interface ILicenseSetSettings {
  /**
   * Name of the license set
   */
  setName: ELicenseSet;
  /**
   * Whether this license is active for the organization
   */
  isEnabled: boolean;
  /**
   * Which license of the set is selected
   */
  selectedLicense?: ELicense;
  /**
   * Seats purchased separately from licenses
   */
  extraSeats?: ESeat[];
  /**
   * This will be default seat for users that are not assigned
   * one separately
   */
  defaultSeat?: ESeat;
}

export interface IOrganization extends IBaseSchema {
  name: string;
  // TODO(PS): Change once migration is done
  emailEnvironment?: EOrgEmailEnvironment;
  emailDomainMappings: IEmailDomainMapping[];
  domains: IDomain[];
  delivery?: IDelivery;
  game: IOrgGame;
  images: IImages;
  results: IResults;
  pluginRedirect: IPluginRedirect;
  plugin: IPlugin;
  stats: {};
  sso: ISSOSettings;
  tags: ITag[];
  features: Array<ITag<'features'>>;
  tagBlacklist: ITag[];
  spicyModeTagBlacklist: ITag[];
  sendThreatFeedback: boolean;
  notifications: INotifications;
  industry: IIndustry;
  incidentSettings: IIncidentSettings;
  threatSettings: IThreatSettings;
  apiSettings?: IApiSettings;
  scim?: IOrgScim;
  quizSettings: IQuizSettings;
  automaticEnrollmentSettings?: IAutomaticEnrollmentSettings;
  hideZendeskWidget: boolean;
  askNPSSurvey: boolean;
  aggregates: IOrgAggregates;
  region?: EOrgRegion;
  onboardingStartedAt?: Date;
  onboardingCompletedAt?: Date;
  licenseSettings: ILicenseSetSettings[];
}
// Add setting path here to track it in daily feature snapshot
// Hope we get actual tracking soon :)
export const TRACKED_ORGANIZATION_SETTINGS: Array<PathsOf<IOrganization>> = [
  ['game', 'spicyModeEnabled'],
  ['game', 'leaderboardVisibility', 'individual'],
  ['game', 'leaderboardVisibility', 'country'],
  ['game', 'anonymousLeaderboards'],
  ['game', 'usersAreAnonymousByDefault'],
  ['game', 'active'],
  ['sendThreatFeedback'],
  ['askNPSSurvey'],
  ['quizSettings', 'enabled'],
  ['quizSettings', 'newContentActiveByDefault'],
  ['sso', 'enabled'],
  ['threatSettings', 'reportToPlatform'],
  ['pluginRedirect', 'redirectPhish'],
  ['pluginRedirect', 'redirectSpam'],
  ['pluginRedirect', 'uploadThreats'],
  ['incidentSettings', 'incidentResponseModuleEnabled'],
];

export interface IOrgContextPersons {
  hr: IContextPerson;
  ceo: IContextPerson;
}

export interface ITelecomContext extends IContextOrganization {
  fakeUrl?: string;
}
export interface IOrgContext {
  organization: IContextOrganization;
  telecomOperator: ITelecomContext;
  webmail: IContextWebService;
  persons: IOrgContextPersons;
}

export interface IOrgScimAuth {
  jti: string;
  createdAt: Date;
  generatedBy: string;
}

export interface IOrgScim {
  authToken: IOrgScimAuth;
}

export interface IQuizSettings {
  newContentActiveByDefault?: boolean;
  modules: IOrgQuizModule[];
  enabled: boolean;
}

export interface IAutomaticEnrollmentSettings {
  enabled: boolean;
  useForcedStart: boolean;
}

export interface IOrgQuizTemplate {
  state: EOrgQuizTemplateState;
  templateId: string;
  reviewedAt?: Date;
}
export interface IEnrichedOrgQuizTemplate extends IOrgQuizTemplate {
  custom?: boolean;
  availableInDemoMode?: boolean;
}
export interface IOrgQuizModule {
  state: EOrgQuizModuleState;
  moduleId: string;
  templates: IEnrichedOrgQuizTemplate[];
}

export interface IEnrichedOrgQuizModule extends IOrgQuizModule {
  templateCount: {
    active: number;
    total: number;
    unreviewed: number;
    custom: number;
    omittedFromDemoMode: number;
  };
  templates: IEnrichedOrgQuizTemplate[];
}

export interface IOrgAggregateItem {
  count: number;
  name: string;
}

export interface IOrgAggregate {
  items: IOrgAggregateItem[];
  updatedAt: Date;
  totalCount: number;
}

export interface IOrgAggregates {
  achievementCompletion?: IOrgAggregate;
  countryLeaderboard?: IOrgAggregate;
  userCountsByCountry?: IOrgAggregate;
}

export interface IOrgLeaderboardVisibility {
  individual: boolean;
  country: boolean;
}
