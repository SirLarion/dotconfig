import { Industry } from '@hox/frontend-utils/src/types/graphql.generated';

interface ITag<TCategory = string> {
  name: string;
  categoryName: TCategory;
}

export enum EUserGameMode {
  INTENSIVE = 'INTENSIVE',
  REPORT_ONLY = 'REPORT_ONLY',
}

export enum EOrgEmailEnvironment {
  GOOGLE = 'google',
  MICROSOFT = 'microsoft',
}

export enum EOrgRegion {
  ASIA = 'asia',
  US = 'us',
  EUROPE = 'europe',
}

export interface IQueryOrg {
  _id: string;
  name: string;
  emailEnvironment: EOrgEmailEnvironment;
  region: EOrgRegion;
  industry?: Industry;
  tagBlacklist: ITag[];
  spicyModeTagBlacklist: ITag[];
  features: Array<ITag<'features'>>;
  sendThreatFeedback: boolean;
  askNPSSurvey: boolean;
  hideZendeskWidget: boolean;
  emailDomainMappings: Array<{
    to: string;
    from: string;
  }>;
  game: {
    active: boolean;
    allowAnyoneToJoin: boolean;
    defaultGameMode: EUserGameMode;
    usersAreAnonymousByDefault: boolean;
    firstQuestTag: string;
  };
  pluginRedirect: {
    redirectPhish: boolean;
    redirectSpam: boolean;
    uploadThreats: boolean;
    phishRedirectAddresses: string[];
    spamRedirectAddresses: string[];
  };
  delivery: {
    email: {
      compressGlobs: string[];
      customHeaders: Array<{ key: string; value: string }>;
      privateSmtpConnectionString: string;
      inlineImages: boolean;
      useReturnPath: boolean;
      customHiddenEmailBodyIdentifier?: string;
    };
  };
  plugin: {
    officejs: {
      allowedDomains: Array<{
        name: string;
        cert?: string;
      }>;
      forceOnlyClientApis?: boolean;
    };
    removeThreatAfterReporting: boolean;
    removeSimulationAfterReporting: boolean;
  };
  sso: {
    enabled: boolean;
    endPoint: string;
    providerName: string;
    cert: string;
    privateCert: string;
    disableIdentifierFormat: boolean;
    identifierFormat: string;
  };
  notifications: {
    weeklyReportToAdmins: boolean;
    threatEscalationEmails: string[];
  };
  images: {
    logo?: { url: string };
    useCustomGameLogo?: boolean;
    customGameLogo?: { url: string };
    useCustomOnboardingAssets?: boolean;
    logoEmail?: { url: string };
    buttonLocationFirstQuest?: { url: string };
    buttonLocationInvite?: { url: string };
    buttonLocationWelcome?: { url: string };
    customPluginIcon?: { url: string };
  };
  results?: {
    customEmailDisclaimer?: string;
  };
  automaticEnrollmentSettings: {
    enabled: boolean;
    useForcedStart: boolean;
  };
}
