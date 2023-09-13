import gql from 'graphql-tag';

import { Image, ImageInput } from '@server/api/graphql/schema/common';
import {
  ContextOrganization,
  ContextPerson,
  ContextTheme,
  ContextWebService,
} from '@server/api/graphql/schema/context';
import {
  Domain,
  DomainInput,
  DomainMutationResult,
} from '@server/api/graphql/schema/domain';
import { IncidentPolicy } from '@server/api/graphql/schema/incident';
import {
  ELicense,
  ELicenseSet,
  ESeat,
} from '@server/domains/admin/licenses/lib/listAll.models';
import {
  ELeaderboardGrouping,
  EOrgEmailEnvironment,
  EOrgRegion,
  EThreatRedirectFormatAttachment,
  EThreatRedirectFormatBody,
} from '@server/lib/typedSchemas/Organization/models';
import { EOrgQuizModuleState } from '@server/lib/typedSchemas/Organization/OrgQuizModule';
import { EOrgQuizTemplateState } from '@server/lib/typedSchemas/Organization/OrgQuizTemplate';
import { EThreatAnalysisPriority } from '@server/lib/typedSchemas/Organization/OrgThreatSettings';

import { QuestCooldown, QuestCooldownInput } from './questCooldown';
import { Tag, TagInput } from './tag';

export const OrgEnums = `
  enum LEADERBOARD_GROUPING {
    ${Object.values(ELeaderboardGrouping).join(',')}
  }
`;

export const OrgDomainContext = `
  # Persons within an organization
  type OrgDomainContextPersons {
    # Hr person info
    hr: ContextPerson
    # ceo info
    ceo: ContextPerson
  }

  # Context for a domain of an org
  type OrgDomainContext {
    # information about the org
    organization: ContextOrganization
    # info about the org's telco
    telecomOperator: ContextOrganization
    # info about the webmail service
    webmail: ContextWebService
    # Info about persons of the org
    persons: OrgDomainContextPersons
  }
`;

export const OrgIncidentCount = `
  # Incident count
  type OrgIncidentCount {
    # Open incident count
    open: Int!
    # Closed incident count
    resolved: Int!
    # Total incident count
    total: Int!
  }
`;

export const OrgApiSettings = `
  # Google client id object
  type GoogleClientId {
    # When was this client id added
    addedAt: Date!
    # The client id value itself
    clientId: String!
  }

  # Organizations api settings
  type ApiSettings {
    # Google client ids to configure
    googleClientIds: [GoogleClientId!]
  }
`;

export const OrgIncidentSettings = `

# Default set of policy settings
interface IncidentPolicySettings {
  # Name of the policy this incident template is for
  policyName: IncidentPolicy!
  # Should this policy be used when checking for incidents?
  enabled: Boolean!
  # Incident should be escalated if Hoxhunt rated malicious
  requireMaliciousHoxhuntRating: Boolean
  # When escalating, use customized or default template
  useCustomEmailTemplate: Boolean!
  # Email template, used if useCustomEmailTemplate is true
  emailTemplate: IncidentEmailTemplate
}

# Incident email template
type IncidentEmailTemplate {
  # Template for the email subject
  subject: String!
  # Template for the email body
  body: String!
}

# Org incident email templates
type DefaultIncidentPolicySettings implements IncidentPolicySettings {
  # Name of the policy this incident template is for
  policyName: IncidentPolicy!
  # Should this policy be used when checking for incidents?
  enabled: Boolean!
  # Incident should be escalated if Hoxhunt rated malicious
  requireMaliciousHoxhuntRating: Boolean
  # When escalating, use customized or default template
  useCustomEmailTemplate: Boolean!
  # Email template, used if useCustomEmailTemplate is true
  emailTemplate: IncidentEmailTemplate
}

# Threshold policy specific settings
type ThresholdPolicySettings {
  # How many reports are required before an incident is created
  creationThreshold: Int
}

# Specific settings for threshold policies
type ThresholdIncidentPolicySettings implements IncidentPolicySettings {
  # Name of the policy this incident template is for
  policyName: IncidentPolicy!
  # Should this policy be used when checking for incidents?
  enabled: Boolean!
  # Incident should be escalated if Hoxhunt rated malicious
  requireMaliciousHoxhuntRating: Boolean
  # When escalating, use customized or default template
  useCustomEmailTemplate: Boolean!
  # Email template, used if useCustomEmailTemplate is true
  emailTemplate: IncidentEmailTemplate
  # Threshold policy specific settings
  policySettings: ThresholdPolicySettings
}

# IncidentVirusTotalApiKeySettings
type IncidentVtApiKeySettings {
  # Name for the api key
  name: String
  # Api key value
  value: String
}


# Organization incident creation settings
type OrgIncidentSettings {
  # Incident response active for organization
  incidentResponseModuleEnabled: Boolean
  # Settings for individual incident policies
  policies: [IncidentPolicySettings]!
  # Url for search hunting operation
  huntingSearchUrl: String
  # Url for email deletion hunting operation
  huntingDeletionUrl: String
  # Url for email deletion revert hunting operation
  huntingRevertEmailDeletionUrl: String
  # Virus total api key
  vtApiKey: IncidentVtApiKeySettings
  # Virus total encryption public key
  vtEncryptionPublicKey: String!
}
`;

export const OrgQuizModuleInput = `
input OrgQuizModuleInput {
  # Org Admin Quiz Module selection
  state: OrgQuizModuleState!
  # Module ID
  moduleId: ID!
}
`;

export const OrgQuizModuleTemplateInput = `
input OrgQuizModuleTemplateInput {
  # Org Admin Quiz Module Template selection
  state: OrgQuizTemplateState!
  # Module ID
  moduleId: ID!
  # Template ID
  templateId: ID!
}
`;

export const OrgQuizModule = `
# Org Admin Quiz Template selection
enum OrgQuizTemplateState {
  ${Object.values(EOrgQuizTemplateState).join('\n')}
}

# Org Admin Quiz Module selection
enum OrgQuizModuleState {
  ${Object.values(EOrgQuizModuleState).join('\n')}
}


# Org selected Quiz Module Templates
type OrgQuizModuleTemplate {
  # Id
  templateId: ID!
  # Admin selection for is template active
  state: OrgQuizTemplateState!
  # Name of the Quiz Template
  title: IcuMessage!
  # Description of the Quiz Template
  description: IcuMessage
  # Tag of Quiz Template
  tag: String!
  # When an admin has reviewed the template
  reviewedAt: Date
  # Is Quiz Template Organizations custom content
  custom: Boolean
}

# Module template statistics 
type OrgQuizModuleStatistics {
  active: Int!
  total: Int!
  unreviewed: Int!
  omittedFromDemoMode: Int!
  custom: Int!
}

# Org Quiz Module activity setting
type OrgQuizModule {
  # Id
  moduleId: ID!
  # Name of the module
  name: IcuMessage!
  # Admin selection for is module active
  state: OrgQuizModuleState!
  # Quiz Templates
  quizTemplates: [OrgQuizModuleTemplate!]!
  # Stats of amount of quizzes in module
  templateCount: OrgQuizModuleStatistics!
}
`;

export const OrgLicenseSets = gql`
  "All license sets"
  enum ELicenseSet {
    ${Object.values(ELicenseSet).join('\n')}
  }

  "All licenses"
  enum ELicense {
    ${Object.values(ELicense).join('\n')}
  }

  "All seats"
  enum ESeat {
    ${Object.values(ESeat).join('\n')}
  }

  "Describes the status of a feature"
  type FeatureStatus {
    "Is the feature on?"
    isEnabled: Boolean!
  }

  "A feature"
  type Feature {
    "Name of the feature. Should describe what it does"
    name: String!
    "Status for the feat"
    status: FeatureStatus!
  }


  "Info on seats"
  type SeatInfo {
    "Seats available in the set, if any"
    available: [ESeat]!
    "Extra seats bought"
    extra: [ESeat]!
    "Default seat for users without assigned a seat"
    default: ESeat!
  }

  "Properties of a license"
  type License {
    "Name of the license"
    name: ELicense!
    "Whether the feature is enabled or not"
    isEnabled: Boolean!
  }

  "License set settings"
  type LicenseSet {
    "Name of the set"
    setName: ELicenseSet!
    "Is the set enabled"
    isEnabled: Boolean!
    "Available licenses in the set"
    licenses: [License]!
    "Info on seats, if they're in use in the license set"
    seatInfo: SeatInfo
  }

  "License input"
  input LicenseInput {
    "Name of the license"
    name: ELicense!
    "Is the license enabled"
    isEnabled: Boolean!
  }

  "Seat settings input"
  input SeatSettingsInput {
    "Extra seats bought"
    extra: [ESeat!]
    "Default seat for users with no assigned seat"
    default: ESeat
  }

  "Input for license set settings"
  input LicenseSettingsInput {
    "Name of the set"
    setName: ELicenseSet!
    "Is the set active"
    isEnabled: Boolean!
    "Which of the licenses is enabled"
    selectedLicense: ELicense!
    "Default seat for users with no assigned seat"
    defaultSeat: ESeat
    "Extra seats bought"
    extraSeats: [ESeat!]
  }
`;

export const Organization = `
  # Threat analysis priority possible fields
  enum ThreatAnalysisPriority {
    ${Object.values(EThreatAnalysisPriority).join('\n')}
  }

  # Supported email environments
  enum EmailEnvironment {
    ${Object.values(EOrgEmailEnvironment).join('\n')}
  }

  # Region where organization operates
  enum Region {
    ${Object.values(EOrgRegion).join('\n')}
  }
  
  # Allowed values for threat forwarding format body
  enum ThreatRedirectFormatBody {
    ${Object.values(EThreatRedirectFormatBody)}
  }

  # Allowed values for threat forwarding format body
  enum ThreatRedirectFormatAttachment {
    ${Object.values(EThreatRedirectFormatAttachment)}
  }

  # Email domain mapping e.g. some customer we need to map emails from specific domain to another
  type EmailDomainMapping {
    # Domain e.g. hox.com
    from: String
    # Domain e.g. hoxhunt.com
    to: String
  }

  # An email header
  type PluginEmailHeader {
    # name of the header
    key: String!
    # value of the header
    value: String!
  }
  # Email Delivery settings
  type EmailDeliverySettings {
    # List of globs for which we compress email attachments e.g. ['*.docm', '*.pptm']
    compressGlobs: [String]
    # List of headers to include in email communications to the org
    customHeaders: [PluginEmailHeader]
    # Connection string to use when emailing the org
    privateSmtpConnectionString: String
    # Should images be inlined to emails sent to users of the org
    inlineImages: Boolean
    # Should set Return-Path header to standard hoxhunt return-path when sending email. SPF will pass, but with Google will show via
    useReturnPath: Boolean
    # Custom string used for identification of vectors sent by Hoxhunt
    customHiddenEmailBodyIdentifier: String
    # Value indicating whether to use DKIM when sending mails to the organization users
    useDkim: Boolean
    # Whether direct Gmail API integration is in use
    useGmailDeliveryApi: Boolean
  }
  # Organization delivery settings
  type OrgDeliverySettings {
    # Email delivery settings
    email: EmailDeliverySettings
  }

  # Organization automatic reminder settings
  type OrgAutomaticReminders {
    # Automatic reminders enabled
    enabled: Boolean!
    # Send reminder ever N missed quests
    repeatEveryNMissed: Int!
    # Start sending reminders after N missed quests
    startAfterNMissed: Int!
  }
  
  # Visibility of user and country leaderboard for the organizaion input
  type OrgLeaderboardVisibility {
    # Are the individual leaderboards enabled in the organization
    individual: Boolean!
    # Are the country leaderboards enabled in the organization
    country: Boolean!
  }

  # Organization game settings
  type OrgGameSettings {
    # Automatic reminder settings
    automaticReminders: OrgAutomaticReminders!
    # Whether game is on for the organization
    active: Boolean
    # Can anyone join the game from the org?
    allowAnyoneToJoin: Boolean
    # The default game mode given to unknown users upon creation via plugin click
    defaultGameMode: USER_GAME_MODE
    # The default anonymity setting new users are added with via plugin click
    usersAreAnonymousByDefault: Boolean!
    # Users are anonymous in leaderboards
    anonymousLeaderboards: Boolean!
    # Leaderboard visibility for individual and country leaderboards
    leaderboardVisibility: OrgLeaderboardVisibility!
    # Leaderboard grouping for department or country leaderboards
    leaderboardGrouping: LEADERBOARD_GROUPING
    # Default cooldown for the org's users
    questCooldown: QuestCooldown
    # Spicy mode is enabled for the organization
    spicyModeEnabled: Boolean!
    # Tag of first quest to be sent
    firstQuestTag: String!
    # Is the organization in demo / POC-mode
    demoMode: Boolean!
  }
  # Plugin options
  type PluginRedirect {
    # Whether redirect real threats to specific email
    redirectPhish: Boolean
    # Whether redirect spam to specific email
    redirectSpam: Boolean
    # Whether upload threats to us
    uploadThreats: Boolean
    # Email addresses to redirect real threats
    phishRedirectAddresses: [String!]
    # Email addresses to redirect real threats
    spamRedirectAddresses: [String!]
  }
  # Domains for office js settings
  type OfficeJsDomain {
    # Domain name
    name: String!
    # cert to use when for verifying users from this domain
    cert: String
  }
  # OfficeJs (Outlook) plugin settings
  type PluginOfficeJs {
    # Allowed domains from which JWT cert checks are accepted e.g. office365.com
    allowedDomains: [OfficeJsDomain]
    # Should force to use only client APIs with the plugin
    forceOnlyClientApis: Boolean
  }
  # Threat forwarding email format 
  type ThreatRedirectFormat {
    # Format for the body of the redirected email
    body: ThreatRedirectFormatBody!
    # Format for the attachment of the redirected email
    attachment: ThreatRedirectFormatAttachment!
    # Additional headers for the redirected email
    headers: [PluginEmailHeader!]
  }
  # Plugin redirect options
  type OrgPluginRedirect {
    # Whether redirect real threats to specific email
    redirectPhish: Boolean
    # Whether redirect spam to specific email
    redirectSpam: Boolean
    # Whether upload threats to us
    uploadThreats: Boolean
    # Email addresses to redirect real threats
    phishRedirectAddresses: [String!]
    # Email addresses to redirect real threats
    spamRedirectAddresses: [String!]
    # Email format for the redirected threats
    phishRedirectFormat: ThreatRedirectFormat
  }
  # Organization threat related settings
  type OrgThreatSettings {
    # Should threats be reported to email platform?
    reportToPlatform: Boolean
    # Should threats be reported to email platform vendor?
    allowPlatformVendorDataUsage: Boolean
    # Threat analysis priority
    threatAnalysisPriority: ThreatAnalysisPriority
    # Threat analysis priority end date
    threatAnalysisPriorityExpiresAt: Date
    # Security team name
    securityTeamName: String
  }
  # Organization Plugin settings
  type OrgPluginSettings {
    # Specific settings regarding officejs plugins
    officejs: PluginOfficeJs
    # Whether to remove a threat after it has been reported
    removeThreatAfterReporting: Boolean
    # Whether to remove a simulation after it has been reported
    removeSimulationAfterReporting: Boolean
    # Whether to show user acted on questions in plugin
    userActedOnQuestionsEnabled: Boolean
  }
  # Organization SSO settings
  type OrgSsoSettings {
    # If SSO is on
    enabled: Boolean
    # Organization SSO endpoint
    endPoint: String
    # Organization SSO provider name
    providerName: String
    # Organization idp cert
    cert: String
    # Organization idp cert additional information
    certInfo: OrgIdpCertInfo
    # privateCert
    privateCert: String
    # disableIdentifierFormat
    disableIdentifierFormat: Boolean
    # identifierFormat
    identifierFormat: String
  }
  # Org idp certificate additional information
  type OrgIdpCertInfo {
    # Certificate is valid from this time onwards
    validFrom: Date
    # Certificate is valid until this time
    validTo: Date
  }
  # Org notification settings
  type OrgNotificationSettings {
    # Whether or not to send weekly report to admins
    weeklyReportToAdmins: Boolean
    # An array of emails that are used to send threat escalation emails
    threatEscalationEmails: [String]
  }
  # Org images
  type OrganizationImages {
    # Logo for training emails
    logo: Image
    # Should use custom logo in game app
    useCustomGameLogo: Boolean
    # Organisations custom logo in game app
    customGameLogo: Image
    # Orgs reuploaded custom plugin logo (also uploaded to plugin)
    customPluginIcon: Image
    # Should use custom onboarding assets
    useCustomOnboardingAssets: Boolean
    # Custom asset for adding logo next to Hoxhunt logo in email templates
    logoEmail: Image
    # Custom asset for Bootcamp 0 simulation heading image
    buttonLocationFirstQuest: Image
    # Custom asset for Invitation Email heading image
    buttonLocationInvite: Image
    # Custom asset for Welcome Email heading image
    buttonLocationWelcome: Image
  }
  # Org custom results settings
  type OrganizationResultSettings {
    # Custom email header that is added to the results-page, but not in the email itself
    customEmailDisclaimer: String
  }
  # SCIM private token
  type ScimAuthPrivateToken {
    # Private key for authenticating
    token: String
  }
  # Org SCIM auth token metadata
  type OrgScimAuthToken {
    # When SCIM authentication token was created
    createdAt: Date
  }
  # Org SCIM settings
  type OrgScimSettings {
    # SCIM authentication token
    authToken: OrgScimAuthToken
  }
  # Org Quiz settings
  type OrgQuizSettings {
    # Are quizzes active
    newContentActiveByDefault: Boolean!
    # Is security awareness training active
    enabled: Boolean!
  }
  # Org automatic enrollment settings
  type OrgAutomaticEnrollmentSettings {
    # Is automatic enrollment enabled for users in this org
    enabled: Boolean
    # Will the game be forcibly started for the users
    useForcedStart: Boolean
  }

  # Aggregated items
  type AggregateItem {
    count: Int!
    name: String!
  }

  # Aggregated result
  type AggregationResult {
    # Aggregate items
    items: [AggregateItem!]!
    # Total count of items
    totalCount: Int!
    # Last updatedAt of the aggregate
    updatedAt: Date!
  }

  # Aggregated organizational data
  type Aggregates {
    achievementCompletion: AggregationResult
    userCountsByCountry: AggregationResult
  }

  # Organization
  type Organization implements Node @external {
    # Id
    _id: ID!  @external
    # Name of the organization e.g. HoxHunt
    name: String!  @external
    # Email environment
    emailEnvironment: EmailEnvironment
    # Region
    region: Region

    # Domains of the org
    domains: [Domain!]!

    # Email domain mappings
    emailDomainMappings: [EmailDomainMapping]!
    # Delivery settings
    delivery: OrgDeliverySettings!
    # Game settings
    game: OrgGameSettings!
    # Plugin redirect settings
    pluginRedirect: OrgPluginRedirect!
    # Plugin settings
    plugin: OrgPluginSettings!
    # Sso settings
    sso: OrgSsoSettings!
    # Notification settings
    notifications: OrgNotificationSettings
    # Images
    images: OrganizationImages!
    # Result settings
    results: OrganizationResultSettings
    # SCIM
    scim: OrgScimSettings
    # Quiz Settings
    quizSettings: OrgQuizSettings
    # Quiz Modules
    quizModules: [OrgQuizModule!]!
    # Automatic enrollment settings
    automaticEnrollmentSettings: OrgAutomaticEnrollmentSettings

    # Do we send threat feedback to the organization's users
    sendThreatFeedback: Boolean

    # Do we ask NPS survey from organization users
    askNPSSurvey: Boolean

    # Users for the organization
    # @filterable @sortable @paginatable
    users(search: String): [User!]! @external

    # Users for the organization
    # @filterable @sortable @paginatable
    usersConnection(search: String): UserConnection!

    # Threats for the user
    # @filterable @sortable @paginatable
    threatsConnection(search: String): ThreatConnection!

    # Quest templates for the organization
    # @filterable @sortable @paginatable
    questTemplatesConnection(search: String): QuestTemplateConnection!

    # Benchmark templates for the organization
    # @filterable @sortable @paginatable
    benchmarkQuestTemplatesConnection: QuestTemplateConnection!

    # Threats reported by org users
    # @filterable @sortable @paginatable
    threats: [Threat] @external
    # Threat settings
    threatSettings: OrgThreatSettings

    # Threatborne incidents created for organization
    # @filterable @sortable @paginatable
    incidents(search: String): [Incident] @external
    # Incident settings
    incidentSettings: OrgIncidentSettings!

    # Organization api settings
    apiSettings: ApiSettings

    # Incident count
    incidentCount(search: String, excludeIncidentStateFilters: Boolean): OrgIncidentCount!

    # Organization training rules
    # @filterable @sortable @paginatable
    trainingRules: OrganizationTrainingRuleConnection!

    # Tags for the organization
    tags: [Tag!]!

    # The features that are enabled for the org
    features: [Tag!]!

    # New tags for the organization
    tagBlacklist: [Tag]


    # Tags that are blocklisted in spicy mode
    spicyModeTagBlacklist: [Tag]!

    # Total count of users for the org
    userCount: Int!

    # Amount of users with a specific rank or higher
    userCountForRank(rank: RankName!): Int!

    # Total count of users that have game active
    gameActiveCount: Int!

    # Total count of users who have completed at least 1 quest
    onboardedCount: Int!

    # Total count of users that have received first quest but have not yet reported it
    stuckInFirstQuestCount: Int!

    # Count of sent vectors (past 7 days)
    sentVectorCount: Int!

    # When org was created at
    createdAt: Date @external
    # When org was updated at
    updatedAt: Date @external

    # Get the url for deploying the Azure Resource Manager template for Hunting Search and Destroy
    huntingSearchAndDestroyDeploymentUrl(fullDeployment: Boolean): String!

    # Hide Zendesk widget in product UI
    hideZendeskWidget: Boolean

    # Aggregated training data
    aggregates: Aggregates!

    # List of organization's departments
    departments: [String!]!

    # List of organization users' countries
    countries: [String!]!

    # List of organization users' sites
    sites: [String!]!

    #List of organization users' cities
    cities: [String!]!

    # When onboarding was started
    onboardingStartedAt: Date

    # When onboarding was completed
    onboardingCompletedAt: Date

    # @filterable @sortable @paginatable
    questsConnection: QuestConnection!

    # @filterable @sortable @paginatable
    organizationOnboardingTasksConnection: OrganizationOnboardingTaskConnection!

    # Licenses settings
    licenseSets: [LicenseSet!]!
  }
`;

export const OrganizationInput = `
  # EmailDomainMappingInput
  input EmailDomainMappingInput  {
    # Domain e.g. hox.com
    from: String
    # Domain e.g. hoxhunt.com
    to: String
  }

  # IncidentSettingsEmailTemplateInput
  input IncidentSettingsEmailTemplateInput {
    # Template for the email subject
    subject: String!
    # Template for the email body
    body: String!
  }

  # IncidentVirusTotalApiKeySettingsInput
  input IncidentVtApiKeySettingsInput {
    # Name for the api key
    name: String
    # Api key value
    value: String
  }

  # Incident settings input
  input IncidentSettingsInput {
    # Is incident response module activated
    incidentResponseModuleEnabled: Boolean
    # Virus total api key encrypted
    vtApiKey: IncidentVtApiKeySettingsInput
  }

  # Email templates for incident settings
  input DefaultIncidentPolicySettingsInput {
    # Name of the policy
    policyName: IncidentPolicy!
    # Is the policy enabled
    enabled: Boolean!
    # Incident should be escalated if Hoxhunt rated malicious
    requireMaliciousHoxhuntRating: Boolean
    # Is the policy using a customized email template
    useCustomEmailTemplate: Boolean!
    # Custom email template for policy
    emailTemplate: IncidentSettingsEmailTemplateInput
  }

  # Threshold specific settings
  input ThresholdIncidentPolicySpecificSettingsInput {
    # How many reports are required before an incident is created
    creationThreshold: Int
  }

  # Email templates for incident settings
  input ThresholdIncidentPolicySettingsInput {
    # Name of the policy
    policyName: IncidentPolicy!
    # Is the policy enabled
    enabled: Boolean!
    # Incident should be escalated if Hoxhunt rated malicious
    requireMaliciousHoxhuntRating: Boolean
    # Is the policy using a customized email template
    useCustomEmailTemplate: Boolean!
    # Custom email template for policy
    emailTemplate: IncidentSettingsEmailTemplateInput
    # Threshold specific policy settings input
    policySettings: ThresholdIncidentPolicySpecificSettingsInput
  }

  # Persons within an organization
  input OrgDomainContextPersonsInput {
    # Hr person info
    hr: ContextPersonInput
    # ceo info
    ceo: ContextPersonInput
  }

  # Domain context input
  input OrgDomainContextInput {
    # information about the org
    organization: ContextOrganizationInput
    # info about the org's telco
    telecomOperator: ContextOrganizationInput
    # info about the webmail service
    webmail: ContextWebServiceInput
    # Info about persons of the org
    persons: OrgDomainContextPersonsInput
  }

  # Organization automatic reminder settings input
  input OrgAutomaticRemindersInput {
    # Automatic reminders enabled
    enabled: Boolean
    # Send reminder ever N missed quests
    repeatEveryNMissed: Int
    # Start sending reminders after N missed quests
    startAfterNMissed: Int
  }

  # Visibility of user and country leaderboard for the organizaion input
  input OrgLeaderboardVisibilityInput {
    # Are the individual leaderboards enabled in the organization
    individual: Boolean
    # Are the country leaderboards enabled in the organization
    country: Boolean
  }

  # Organization game settings
  input OrgGameSettingsInput {
    # Automatic reminder settings
    automaticReminders: OrgAutomaticRemindersInput
    # Whether game is on for the organization
    active: Boolean
    # Can anyone join the game from the org?
    allowAnyoneToJoin: Boolean
    # The default game mode given to unknown users upon creation via plugin click
    defaultGameMode: USER_GAME_MODE
    # The default anonymity setting new users are added with via plugin click
    usersAreAnonymousByDefault: Boolean
    # All users are anonymous in leaderboard
    anonymousLeaderboards: Boolean
    # Leaderboard visibility for individual and country leaderboards
    leaderboardVisibility: OrgLeaderboardVisibilityInput
    # Grpuping of organizations leaderboard
    leaderboardGrouping: LEADERBOARD_GROUPING 
    # Quest cooldown settings
    questCooldown: QuestCooldownInput
    # Spicy mode is enabled for the organization
    spicyModeEnabled: Boolean
    # Tag of first quest to be sent
    firstQuestTag: String
  }

  # Threat forwarding email format input
  input ThreatRedirectFormatInput {
    # Input for format for the body of the redirected email
    body: ThreatRedirectFormatBody!
    # Input for format for the attachment of the redirected email
    attachment: ThreatRedirectFormatAttachment!
    # Input for additional headers for the redirected email
    headers: [PluginEmailHeaderInput!]
  }

  # Plugin redirect options
  input OrgPluginRedirectInput {
    # Whether redirect real threats to specific email
    redirectPhish: Boolean
    # Whether redirect spam to specific email
    redirectSpam: Boolean
    # Whether upload threats to us
    uploadThreats: Boolean
    # Email addresses to redirect real threats
    phishRedirectAddresses: [String!]
    # Email addresses to redirect real threats
    spamRedirectAddresses: [String!]
    # Email format for the redirected threats
    phishRedirectFormat: ThreatRedirectFormatInput
  }

  # Plugin threat settings input
  input OrgThreatSettingsInput {
    # Should threats be reported to email platform?
    reportToPlatform: Boolean
    # Should threats be reported to email platform vendor?
    allowPlatformVendorDataUsage: Boolean
    # Threat analysis priority
    threatAnalysisPriority: ThreatAnalysisPriority
    # Threat analysis priority end date
    threatAnalysisPriorityExpiresAt: Date
    # Security team name
    securityTeamName: String
  }

  # Domains for office js settings
  input OfficeJsDomainInput {
    # Domain name
    name: String!
    # cert to use when for verifying users from this domain
    cert: String
  }

  # OfficeJs (Outlook) plugin settings
  input PluginOfficeJsInput {
    # Allowed domains from which JWT cert checks are accepted e.g. office365.com
    allowedDomains: [OfficeJsDomainInput!]
    # Should force to use only client APIs with the plugin
    forceOnlyClientApis: Boolean
  }

  # Organization Plugin settings
  input OrgPluginSettingsInput {
    # Specific settings regarding officejs plugins
    officejs: PluginOfficeJsInput
    # Whether to remove a threat after it has been reported
    removeThreatAfterReporting: Boolean
    # Whether to remove a simulation after it has been reported
    removeSimulationAfterReporting: Boolean
    # Whether to show user acted questions in plugin
    userActedOnQuestionsEnabled: Boolean
  }

  # Organization SSO settings
  input OrgSsoSettingsInput {
    # If SSO is on
    enabled: Boolean
    # Organization SSO endpoint
    endPoint: String
    # Organization SSO provider name
    providerName: String
    # Organization idp cert
    cert: String
    # privateCert
    privateCert: String
    # disableIdentifierFormat
    disableIdentifierFormat: Boolean
    # identifierFormat
    identifierFormat: String
  }

  # Org notification settings
  input OrgNotificationSettingsInput {
    # Whether or not to send weekly report to admins
    weeklyReportToAdmins: Boolean
    # An array of emails that are used to send threat escalation emails
    threatEscalationEmails: [String!]
  }

  # Org images input
  input OrgImagesInput {
    # Org logo
    logo: ImageInput
    # Should use custom logo in game app
    useCustomGameLogo: Boolean
    # Organisations custom logo in game app (usually white or light colored)
    customGameLogo: ImageInput
    # Orgs reuploaded custom plugin logo (also uploaded to plugin)
    customPluginIcon: ImageInput
    # Should use custom onboarding assets
    useCustomOnboardingAssets: Boolean
    # Custom asset for adding logo next to Hoxhunt logo in email templates
    logoEmail: ImageInput
    # Custom asset for Bootcamp simulation heading image
    buttonLocationFirstQuest: ImageInput
    # Custom asset for Invite Email heading image
    buttonLocationInvite: ImageInput
    # Custom asset for Welcome Email heading image
    buttonLocationWelcome: ImageInput
  }

  # Org results input
  input OrgResultsInput {
    # Custom email header that is added to the results-page, but not in the email itself
    customEmailDisclaimer: String
  }

  # An email header
  input PluginEmailHeaderInput {
    # name of the header
    key: String!
    # value of the header
    value: String!
  }
  # Email Delivery settings
  input EmailDeliverySettingsInput {
    # List of globs for which we compress email attachments e.g. ['*.docm', '*.pptm']
    compressGlobs: [String!]
    # List of headers to include in email communications to the org
    customHeaders: [PluginEmailHeaderInput!]
    # Connection string to use when emailing the org
    privateSmtpConnectionString: String
    # Should images be inlined to emails sent to users of the org
    inlineImages: Boolean
    # Should set Return-Path header to standard hoxhunt return-path when sending email. SPF will pass, but with Google will show via
    useReturnPath: Boolean
    # Custom string used for identification of vectors sent by Hoxhunt
    customHiddenEmailBodyIdentifier: String
    # Value indicating whether to use DKIM when sending mails to the organization users
    useDkim: Boolean
    # Whether direct Gmail API integration is in use
    useGmailDeliveryApi: Boolean
  }
  # Organization delivery settings
  input OrgDeliverySettingsInput {
    # Email delivery settings
    email: EmailDeliverySettingsInput
  }
  # Organization quiz settings
  input OrgQuizSettingsInput {
    # Are quizzes active
    newContentActiveByDefault: Boolean
    # Is security awareness training active
    enabled: Boolean
  }

  # Organization automatic enrollment settings
  input OrgAutomaticEnrollmentSettingsInput {
    # Is automatic enrollment enabled for users in this org
    enabled: Boolean
    # Will the game be forcibly started for the users
    useForcedStart: Boolean
  }

  # Organization input
  input OrganizationInput {
    # name
    name: String
    # Email environment
    emailEnvironment: EmailEnvironment
    # Region
    region: Region
    # Email domains
    emailDomains: String
    # Email domain mappings
    emailDomainMappings: [EmailDomainMappingInput!]
    # Domains
    domains: [DomainInput!]
    # Tags for the organization
    tags: [TagInput!]
    # Features for the organization
    features: [TagInput!]
    # Tags for the organization
    tagBlacklist: [TagInput!]
    # Tags that are blocklisted in spicy mode
    spicyModeTagBlacklist: [TagInput!]
    # Game settings
    game: OrgGameSettingsInput
    # Plugin redirect settings
    pluginRedirect: OrgPluginRedirectInput
    # Plugin settings
    plugin: OrgPluginSettingsInput
    # Sso settings
    sso: OrgSsoSettingsInput
    # Notification settings
    notifications: OrgNotificationSettingsInput
    # images
    images: OrgImagesInput
    # result settings
    results: OrgResultsInput
    # Delivery settings
    delivery: OrgDeliverySettingsInput
    # Do we send threat feedback to the organization's users
    sendThreatFeedback: Boolean
    # Should ask NPS survey from organization users
    askNPSSurvey: Boolean
    # Org threat settings
    threatSettings: OrgThreatSettingsInput
    # Org Quiz settings
    quizSettings: OrgQuizSettingsInput
    # Org automatic enrollment settings
    automaticEnrollmentSettings: OrgAutomaticEnrollmentSettingsInput
    # Hide Zendesk widget in product UI
    hideZendeskWidget: Boolean
    # License settings
    licenseSettings: [LicenseSettingsInput!]
  }

  # Organization creation input
  input CreateOrganizationInput {
    # name
    name: String!
    # Domains 
    domains: [DomainInput!]
    # Email environment
    emailEnvironment: EmailEnvironment
    # Region
    region: Region
    # Tags for the organization
    tagBlacklist: [TagInput!]
    # Tags that are blocklisted in spicy mode
    spicyModeTagBlacklist: [TagInput!]
    # Plugin settings
    plugin: OrgPluginSettingsInput
  }
`;

export const OrganizationMutations = gql`
  type OrganizationMutationResult implements MutationResult {
    data: Organization
    errors: [MutationError!]!
  }
`;

export default () => [
  Tag,
  TagInput,
  Image,
  ImageInput,
  QuestCooldown,
  QuestCooldownInput,
  IncidentPolicy,
  OrgIncidentSettings,
  ContextOrganization,
  ContextWebService,
  ContextTheme,
  ContextPerson,
  OrgDomainContext,
  Organization,
  OrganizationInput,
  OrgIncidentCount,
  OrgApiSettings,
  OrgEnums,
  Domain,
  DomainInput,
  DomainMutationResult,
  OrgQuizModule,
  OrgQuizModuleInput,
  OrgQuizModuleTemplateInput,
  OrgLicenseSets,
  OrganizationMutations,
];
