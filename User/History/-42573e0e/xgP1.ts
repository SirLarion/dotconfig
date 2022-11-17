import { EClientEvent } from '@server/lib/analyticEvents';
import {
  EOnboardingState,
  EUserEvents,
  EUserGameDeactivationReason,
  EUserStatus,
} from '@server/lib/typedSchemas/User/models';
import { allowedUserPersistedEvents } from '@server/lib/typedSchemas/User/UserEvent';
import { EJobFunction } from '@server/lib/typedSchemas/User/UserProfile';

import { Challenge } from './challenge';
import { DateRange, UserSpecifier } from './common';
import { QuestCooldown, QuestCooldownInput } from './questCooldown';
import { Ranks, RewardEnums } from './rewards';

export const UserActionResult = `
  # Interface for user action result
  type UserActionResult implements ActionResult {
    # Users affected by this action. Exists if action was performed synchronously.
    result: [User!]
    # A handle that can be used to monitor background tasks. Exists if action is performed in the background.
    taskGroup: TaskGroup
  }
`;

export const UserConnection = `
  # Paginated user list interface
  type UserConnection implements Connection {
    # List of users on current page
    nodes: [User!]!
    # Pagination information for current selection
    pageInfo: HoxPageInfo!
    # Total user count for current selection
    totalCount: Int!
  }
`;

export const UserScimInformation = `
  # Information about user SCIM provisioning
  type UserScimInformation {
    # When was the user last provisioned
    lastProvisionedAt: Date!
  }
`;

export const Labs = `
  # Labs content
  type Labs {
    # Challenge states for Challenges in labs
    challenges: [Challenge]!
  }
`;

export const JwtToken = `
# JWTPayload contains the claims embedded into the generated token. More details on claims at https://tools.ietf.org/html/rfc7519.
type JWTPayload {
  # The "iat" (issued at) claim identifies the time at which the JWT was issued.
  iat: Int!
  # The "sub" (subject) claim identifies the principal that is the subject of the JWT.
  sub: String!
  # The "jti" (JWT ID) claim provides a unique identifier for the JWT.
  jti: ID!
  # The "description" claim is a user provided description of the token usage purpose.
  description: String!
}
`;

export const UserEnums = `
  # State of the user
  enum USER_STATUS {
    ${Object.values(EUserStatus).join(',')}
  }
  # Possible game modes for user
  enum USER_GAME_MODE {
    INTENSIVE,
    REPORT_ONLY,
  }

  # Possible user onboarding states
  enum ONBOARDING_STATE {
    ${Object.values(EOnboardingState).join(',')}
  }

  # Additional info on why a user game is paused
  enum USER_GAME_DEACTIVATION_REASON {
    ${Object.values(EUserGameDeactivationReason).join(',')}
  }

  # Persistable Ui events
  enum USER_UI_EVENT {
    ${Object.values(EClientEvent).join(',')}
  }

  # Special user events that can be persisted
  enum USER_EVENT {
    ${Object.values(EUserEvents).join(',')}
  }

  # Persistable user events
  enum USER_PERSISTED_EVENT {
    ${allowedUserPersistedEvents.join(',')}
  }

  # Possible job functions
  enum JOB_FUNCTION {
    ${Object.values(EJobFunction).join(',')}
  }
`;

export const IUserProfileName = `
  # Users name information
  interface IUserProfileName @external {
    # Firstname e.g. John
    firstName: String @external
    # Lastname e.g. Smith-Mcain
    lastName: String @external
    # Whether the user has chosen to be anonymous
    isAnonymous: Boolean!
  }
`;

export const PublicUser = `
  # Public profile of the user
  type PublicUserProfile implements IUserProfileName {
    # Firstname e.g. John
    firstName: String
    # Lastname e.g. Smith-Mcain
    lastName: String
    # Whether the user has chosen to be anonymous
    isAnonymous: Boolean!
  }

  # User's on leaderboard representation
  type PublicUser {
    # Id of the user
    _id: ID!
    # Profile information about the user
    profile: PublicUserProfile
  }
`;

export const UiEvent = `
  # users Ui events
  type UiEvent {
    # Name of the event
    eventName: String
    # How many times the events has been recorded for the user
    eventCount: Int
    # When was the event first seen
    firstSeenAt: Date
    # When was the event last seen
    lastSeenAt: Date
  }
`;

export const UserFlags = `
  # Different statuses calculated from the user
  type UserFlags {
    # Whether user has completed onboarding tutorial for game (Deprecated, use game.onboardedAt)
    gameOnboardingTutorialCompleted: Boolean! @deprecated
  }
`;

export const UserRewards = `
  # Reward interface
  interface UserReward {
    # Type of reward
    rewardType: RewardType!
    # When was the reward achieved
    achievedAt: Date
  }

  # User's achievement
  type UserAchievement implements UserReward {
    # Achievement id
    id: AchievementId!
    # Type of reward
    rewardType: RewardType!
    # Achievement state
    state: AchievementState!
    # When the achievement was awarded
    achievedAt: Date
    # When the achievement was claimed by or for the user
    claimedAt: Date
    # The numeric goal for the achievement (if applicable)
    goal: Int
    # The users current progress to goals for
    currentProgress: Int
  }
`;

export const Plugin = `
  # Hoxhunt plugin linked to User
  type Plugin implements Node {
    # Id
    _id: ID!
    # Created At
    createdAt: Date
    # Updated At
    updatedAt: Date

    # Plugin ID
    pluginId: String!
    # User this plugin is linked to
    userId: ID!
  }
`;

export const PluginConnection = `
  # Paginated list interface for Hoxhunt plugins linked to a User
  type PluginConnection implements Connection {
    # List of Plugins on current page
    nodes: [Plugin!]!
    # Pagination information for current selection
    pageInfo: HoxPageInfo!
    # Total Plugin count for current selection
    totalCount: Int!
  }
`;

export const User = `
  # Locale information on use
  type Locale {
    # UI locale
    ui: String
    # What locales can we send quests in
    quests: [String!]!
    # Latest known locale from browser
    latest: String
    # Tz offset in minutes of the last visit
    tzOffset: Int
    # Tz information
    tz: String
    # Disable automatic timezone update
    disableAutomaticTimezoneUpdate: Boolean!
  }
  # Geo entry
  type GeolocationEntry {
    # Ip address ipv4 or ipv6
    ip: String!
    # Countrycode e.g. Fi
    countryCode: String
    # Country name in English e.g. Finland
    countryName: String
    # Region code e.g. 18 (specific to country)
    regionCode: String
    # Region name e.g. Uusimaa
    regionName: String
    # City name e.g. Espoo
    city: String
    # Zipcode e.g. 00180
    zipCode: String
    # Timzzone e.g. Europe/Helsinki
    timeZone: String
    # Latitude 60.2167
    latitude: Float
    # Longitude e.g. 24.6667
    longitude: Float
    # MetroCode if available
    metroCode: Int
    # When entry was created
    createdAt: Date
  }
  # Geolocation data
  type Geolocation {
    # Latest collected entry
    latest: GeolocationEntry
    # Historical Entries
    history: [GeolocationEntry]
  }

  # Users profile information
  type UserProfile implements IUserProfileName @external {
    # Firstname e.g. John
    firstName: String! @external
    # Lastname e.g. Smith-Mcain
    lastName: String @external
    # Phone number e.g. +358-281812-11
    phone: String
    # Department e.g. Technology
    department: String
    # Job function e.g.
    jobFunction: JOB_FUNCTION
    # Country code that the user has selected
    country: String
    # User's city
    city: String
    # User's site
    site: String
    # Locale information e.g. what lang user has selected etc.
    locale: Locale!
    # Geolocation data collected from the users visits
    geoLocation: Geolocation
    # Whether the user has chosen to be anonymous
    isAnonymous: Boolean!
    # User is set to have enforced anonymity
    hasEnforcedAnonymity: Boolean!
    # Is spicy mode enabled for the user?
    spicyModeEnabled: Boolean!
  }

  # Player stats
  type Stats {
    # How many succesfully reported quests has user completed
    success: Int!
    # How many has he failed
    failed: Int!
    # How many has he missed
    missed: Int!
    # Total quests sent
    total: Int!
    # State of the last 10 quests
    last10Quests: [String]!
    # Failure rate e.g. 0.20
    failureRate: Float!
  }
  #Player season stats
  type SeasonStats {
    # How many succesfully reported quests has user completed
    success: Int!
    # How many has he failed
    failed: Int!
    # How many has he missed
    missed: Int!
    # Total quests sent
    total: Int!
    # What season the stats are for
    season: String!
    # Stars earned during the season
    stars: Int!
  }
  # Player streak stats
  type Streaks {
    # Stats for succeeded quests
    success: Streak!
    # Stats for missed quests
    missed: Streak!
    # Stats for failed quests
    failed: Streak!
  }
  # Player single streak
  type Streak {
    # Current streak of category
    current: Int!
    # Best streak of category
    best: Int!
  }
  # Player information
  type Player {
     # Rewards player has gained and has in pipeline
    rewards: [UserReward!]!
    # Player stats
    stats: Stats!
    # Player stats per season
    seasonStats: [SeasonStats]!
    # Players best streaks for miss/fail/success
    streaks: Streaks!
    # Collected stars
    stars: Int
    # Get rank for a time period
    rank(user: UserSpecifierInput!, dateRange: DateRangeInput!): Rank
  }
  # Game state information
  type Game @external {
    # Is game active for the user
    active: Boolean!
    # Date when game was last set to active
    activatedAt: Date @external
    # User's game mode
    mode: USER_GAME_MODE!
    # Default cooldown for the user
    questCooldown: QuestCooldown
    # If a user has had email delivery issues they might be given a delivery cooldown:
    onCooldownUntil: Date
    # A specific reason why a user game has been paused
    deactivationReason: USER_GAME_DEACTIVATION_REASON
    # Are automatic reminder emails disabled
    automaticRemindersDisabled: Boolean
    # The time user was onboarded at
    onboardedAt: Date @external
    # Onboarding state
    onboardingState: ONBOARDING_STATE!
    # New onboardedAt value, will replace onboardedAt
    newOnboardedAt: Date
  }
  # List of dates the user has been sent invites
  type UserInvites {
    # Send time of invite
    sentAt: Date
  }

  # Represents a User
  type User implements Node @external {
    # User's unique id
    _id: ID! @external

    # Users EmailAddresses
    emails: [EmailAddress!]! @external

    # Users profile
    profile: UserProfile! @external

    # JWT payloads issued to the user
    jwtPayloads: [JWTPayload]

    # Organization the user belongs
    organization: Organization! @external

    # organizationName (Deprecated, use organization link instead)
    organizationName: String @deprecated

    # Player profile of the user
    player: Player!

    # Game contains information about the current game status
    game: Game! @external

    # Quests sent to user
    # @filterable @sortable @paginatable
    quests: [Quest]! @external

    # Dashboard events (quests, TODO: add achievements)
    # @filterable @sortable @paginatable
    dashboardItems: [Quest!]!

    # Total count of quests in end state
    questsCount: Int!

    # Threats reported by user
    # @filterable @sortable @paginatable
    reportedThreats: [Threat]

    # Statistics for threats used in reported threats dashboard
    threatStatistics: ThreatStatistics

    # Threats for the user
    # @filterable @sortable @paginatable
    threatsConnection(search: String): ThreatConnection!

    # Task groups for the user
    # @filterable @sortable @paginatable
    taskGroupsConnection: TaskGroupConnection!

    # User's status
    status: USER_STATUS!

    # Role ACL data about the user
    roles: [String!]!

    # Invites the user has been sent
    invites: [UserInvites]

    # Is user an organization admin?
    isAdmin: Boolean!

    # Is user a super admin?
    isSuperAdmin: Boolean!

    # Is user a soc operator?
    isSocOperator: Boolean!
    
    # Tags associated to the user
    tags: [Tag]

    # The feature set that is extended on top of organisation features
    features: [Tag!]!

    # Ui events
    events: [UiEvent]!

    # User activity
    # @filterable @sortable @paginatable
    activity: AnalyticsEventConnection!

    # Labs data
    labs: Labs!

    # User Scim Information. Only available for users provisioned via SCIM.
    scim: UserScimInformation

    # Computed flags for the user
    flags: UserFlags!

    # When the user was created
    createdAt: Date @external

    # When user was last updated
    updatedAt: Date @external

    # When user was scheduled for deletion
    softDeletedAt: Date @external

    # When will the system perform scheduled deletion
    willBeHardDeletedAt: Date @external

    # Find all plugins linked to user
    plugins: [Plugin!]!

    # Should show NPS survey to user
    shouldAskNpsSurvey: Boolean

    # Date when NPS survey has been asked last time
    lastAskedNpsSurveyAt: Date
  }
`;

const UserSettingsInput = `
  # Input for user settings
  input UserSettingsInput {
    # User id
    _id: ID!

    # Changes to users profile
    profile: UserProfileInput
  }
`;

const UserInput = `
  # User locale input
  input UserLocaleInput {
    # UI language code
    ui: String

    # Quest language code
    quests: [String!]

    # Timezone string, e.g. Europe/Helsinki.
    # Supported formats: IANA names, UTC+-H
    tz: String

    # Disable automatic update of timezone
    disableAutomaticTimezoneUpdate: Boolean
  }

  # User profile input
  input UserProfileInput {
    # First name of user
    firstName: String

    # Last name of user
    lastName: String

    # User's location country code
    country: String

    # User's city
    city: String

    # User's site
    site: String

    # User's department
    department: String

    # User's job function
    jobFunction: JOB_FUNCTION

    # User's phone
    phone: String

    # User's locale info
    locale: UserLocaleInput

    # Does the user want to be anonymised?
    isAnonymous: Boolean

    # User is set to have enforced anonymity
    hasEnforcedAnonymity: Boolean

    # Is spicy mode enabled for the user?
    spicyModeEnabled: Boolean
  }



  # Input for user game settings
  input UserGameInput {
    # User's game mode
    mode: USER_GAME_MODE
    # User activity setting
    active: Boolean
    # Quest cooldown settings
    questCooldown: QuestCooldownInput
    # Are automatic reminder emails disabled
    automaticRemindersDisabled: Boolean
    # The time user was onboarded at
    onboardedAt: Date
  }

  # Input for user email addresses
  input UserEmailInput {
    # Actual address
    address: String!
    # Wheter the addess has been validated
    verified: Boolean!
  }

  # Input for user settings
  input UserInput {
    # User id
    _id: ID!

    # Changes to user's email addresses
    emails: [UserEmailInput]

    # Changes to user's game settings
    game: UserGameInput

    # Changes to user's profile
    profile: UserProfileInput

    # Features input for user
    features: [TagInput]
  }

  # Input for creating users
  input CreateUserInput {
    # User organization
    organizationId: ID!

    # User email address
    emails: [UserEmailInput]!

    # User profile
    profile: UserProfileInput

    # Changes to user's game settings
    game: UserGameInput
  }
`;

const FingerprintInput = `
  # Fingerprint components
  input FingerprintComponents {
    # detected user agent
    user_agent: String
    # detected language
    language: String
    # detected color depth
    color_depth: Int
    # detected pixel ratio of the device
    pixel_ratio: Float
    # System's total number of logical processors available to the user agent.
    hardware_concurrency: Int
    # Screen resolution
    resolution: [Int]
    # Available screen resolution
    available_resolution: [Int]
    # Timezone offset
    timezone_offset: Int
    # Has session storage
    session_storage: Int
    # Has local storage
    local_storage: Int
    # Has indexed db
    indexed_db: Int
    # Has open database
    open_database: Int
    # CPU class
    cpu_class: String
    # Navigator platform (e.g. macintel)
    navigator_platform: String
    # Is do not track enabled
    do_not_track: String
    # Plugins
    regular_plugins: [String]
    # Canvas fingerprint
    canvas: String
    # WebGL fingerprint
    webgl: String
    # Is adblock enabled
    adblock: Boolean
    # Has the user tampered with its languages
    has_lied_languages: Boolean
    # Has the user tampered with its screen resolution
    has_lied_resolution: Boolean
    # Has the user tampered with its OS
    has_lied_os: Boolean
    # Has the user tampered with its browser agent
    has_lied_browser: Boolean
    # Touch screen detection and capabilities
    touch_support: [String]
    # A list of installed fonts, detected with JS/CSS
    js_fonts: [String]
  }
  # Fingerprint input
  input FingerprintInput {
    # Fingerprint
    result: String!
    # Components that make up the fingerprint
    components: FingerprintComponents!
  }
`;

const UiEventInput = `
  # Ui event input
  input UiEventInput {
    # event name
    eventName: USER_UI_EVENT!
  }
`;

export const UserPropertiesInput = `
  # Input type for SetUserProperties mutation
  input UserPropertiesInput {
    anonymous: Boolean
    department: String
    gameMode: USER_GAME_MODE
    jobFunction: JOB_FUNCTION
    spicyModeEnabled: Boolean
    uiLanguage: SUPPORTED_LOCALE
  }
`;

export default () => [
  DateRange,
  QuestCooldown,
  QuestCooldownInput,
  UserSpecifier,
  Ranks,
  RewardEnums,
  UserConnection,
  UserActionResult,
  Challenge,
  Labs,
  UserEnums,
  IUserProfileName,
  PublicUser,
  UiEvent,
  JwtToken,
  UserSettingsInput,
  UserInput,
  FingerprintInput,
  UiEventInput,
  UserFlags,
  UserRewards,
  UserScimInformation,
  Plugin,
  PluginConnection,
  User,
  UserPropertiesInput,
];
