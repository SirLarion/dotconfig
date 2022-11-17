import { USER_DATA_COLUMNS } from '@server/domains/admin/userManagement/lib/createUserListCSVFile.models';
import { ESelfOnboardStatus } from '@server/domains/game/user/lib/selfOnboard.models';

const Root = `
  # Root Query
  type Query @external {
    # Current signed-in user
    currentUser: User @external

    # Current users public version
    publicCurrentUser: PublicUser

    # Users
    # @filterable @paginatable @sortable
    users(search: String): [User!]! @external

    # Quests represent simulations and their results
    # @filterable @paginatable @sortable
    quests: [Quest!]! @external

    # A list of Hoxhunt plugins linked to a User
    # @filterable @paginatable @sortable
    pluginConnection: PluginConnection!

    # A vector is a delivered quest payload
    # @filterable @paginatable @sortable
    vectorConnection: VectorConnection!

    # Returns a list of Quest templates used in technical testing
    # @filterable @paginatable @sortable
    technicalTestTemplatesConnection: QuestTemplateConnection!

    # A list of organizations
    # @filterable @paginatable @sortable
    organizations: [Organization!]! @external

    # List of feedback rules
    # @filterable @paginatable @sortable
    feedbackRules: [FeedbackRule!]!

    # List of user feedbacks
    # @filterable @paginatable @sortable
    userFeedbacks: [UserFeedback!]!

    # A list of threats
    # @filterable @paginatable @sortable
    threats(search: String): [Threat!]! @external

    # A list of assignable threats
    # @filterable @paginatable @sortable
    assignedThreats(newThreatCount: Int!, organizationId: ID): [Threat!]!

    # A set of threats around given threatId with filters
    # @filterable @sortable @paginatable
    threatsAround(
      threatId: ID,
      campaignThreatId: ID,
      direction: ThreatWorkQueueDirection,
    ): [Threat!]!

    # A list of threatObservables
    # @filterable @paginatable @sortable
    threatObservables: [ThreatObservable!]! @external

    # Templates from which our quests are built
    # @filterable @paginatable @sortable
    questTemplates: [QuestTemplate!]!

    # QuestTemplates, but with only demoTemplates
    # @filterable @paginatable @sortable
    demoQuestTemplates(organizationId: String): [QuestTemplate!]!

    # Quiztemplates that from which our quiz quests are built
    # @filterable @paginatable @sortable
    quizTemplates: [QuizTemplate!]!

    # List of quizModules
    # @filterable @paginatable @sortable
    quizModules: [QuizModule!]!

    # A list of markers
    # @filterable @paginatable @sortable
    markers: [Marker!]!

    # Query different leaderboards by their boardType
    leaderboard(
      boardType: BoardType
      organizationId: ID!
      group: UserStarsBoardGroup
      userId: ID
      startDate: Date
      endDate: Date
      limit: Int = 10
      hideAnonymousUsers: Boolean = true
    ): [Leaderboard!]!

    # Enrich leaderboard user rows
    enrichedLeaderboardUserRows(
      userIds: [ID!]!
    ):[PublicUser!]!

    # All available system tags used to describe objects
    tags: [Tag!]!

    # All available system tags used to describe objects
    vectorTags: [Tag]

    # Data for signin flow
    signinData(emailAddress: String!): SigninData
    # App settings
    app: App!

    # Background task handles
    # @filterable @paginatable @sortable
    taskGroups: [TaskGroup!]!

    # A list of incidents
    # @filterable @paginatable @sortable
    incidents(search: String): [Incident!]! @external

    # Creates a JWT token with which the current user can login to Zendesk
    zendeskLoginToken: String

    # Run text through our compilation pipeline
    compiledTemplateString(templateString: String, translations: [IcuMessageInput!]): String

    # Run a quest template through our compilation pipeline
    compiledQuestTemplateEmail(emailTemplate: QuestTemplateEmailTemplateInput!, organizationIdForContext: String): Email
    
    # Sign off an upload to cloudinary
    signedCloudinaryUploadParams(params: CloudinaryUploadParams!): String!

    # All ranks in the system
    ranks: [Rank!]!

    # Similiar threats in users inboxes in organization
    # @filterable @paginatable @sortable
    huntingSearchJobResults(incidentId: String!): [HuntingSearchJobResult]!

    # Hunting search job
    # @filterable @paginatable @sortable
    huntingSearchJobs(incidentId: String!): [HuntingSearchJob]!

    # Quiz Template Preview. With preview you can interact with the template as it is shown for end-user
    quizTemplatePreview(tag: ID!): BaseQuiz!

    # Result
    result(id: ID!, quizTag: String, useQuestObjectives: Boolean, useCompletionMethod: Boolean): Result

    # Fetch the virustotal augment ephemeral url
    fetchVtAugmentEphemeralUrl(query: String!, apiKeyEncrypted: String!): String!
  }

  # Overrides for QuestTemplate compile
  input CompileTemplateOverridesInput {
    # The id for the organization of which context data should be used for the template
    organizationId: ID!
  }

  # User upsert result
  type UserUpsertResult {
    # True if the user was updated
    updated: Boolean!
    # True if the user was created
    inserted: Boolean!
    # The returned user
    user: User!
  }

  # User start game result
  type UserStartGameResult {
    # True if game was started successfully
    gameStarted: Boolean!
    # True if game was activated but user has already been a part of the game (does not send bootcamp or welcome emails)
    hasPlayedPreviously: Boolean!
  }

  # Self-onboarding result status
  enum SELF_ONBOARDING_STATUS {
    ${Object.values(ESelfOnboardStatus).join(',')}
  }

  enum USER_DATA_COLUMN {
    ${USER_DATA_COLUMNS.join(',')}
  }

  # User self onboard result
  type UserSelfOnboardResult {
    # Status returned by self onboarding
    status: SELF_ONBOARDING_STATUS!
  }

  # CSV export result
  type GenerateUserCSVResult {
    # A signed URL to access created CSV in GCS, defined for low user count calls
    signedUrl: String
    # Task group for the user export task, defined for high user count calls 
    taskGroup: TaskGroup
  }

  # Root Mutation
  type Mutation @external {
    # Create organization
    createOrganization(organization: OrganizationInput!): Organization

    # Update organization
    updateOrganization(organizationId: ID!, organization: OrganizationInput!): Organization

    # Update organization incident policy settings
    updateOrganizationIncidentPolicySettings(organizationId: ID!, policySettings: DefaultIncidentPolicySettingsInput): Organization
    # Update organization campaign incident policy settings
    updateOrganizationThresholdIncidentPolicySettings(organizationId: ID!, policySettings: ThresholdIncidentPolicySettingsInput): Organization

    # Update other organization incidentSettings than policySettings
    updateOrganizationIncidentSettings(organizationId: ID!, incidentSettings: IncidentSettingsInput): Organization

    # Create new SCIM authentication token under organization
    createOrganizationScimToken(organizationId: ID!): ScimAuthPrivateToken

    # Delete organization
    deleteOrganization(organizationId: ID!): Organization

    # Create and set resource template deployment url for organization if it does not exists
    initHuntingSearchAndDestroySettings: String

    # Watch markers for a quest
    watchMarkers(questId: ID!, userId: ID!): Result

    # Rate a single threat, and send feedback to reporter
    rateThreat(rating: RateThreatInput!): RateThreatResult

    # Set user to have received threat feedback in instant feedback
    userReceivedRatingInInstantFeedback(threatId: ID!): Threat

    # Delete threat
    deleteThreat(threatId: ID!): Threat

    # Deletion flow in logic app
    startHuntingEmailDeletion(searchJobResultIds: [ID!]!): [HuntingSearchJobResult]

    # Revert hunting email deletion (move back to inbox)
    revertHuntingEmailDeletion(searchJobResultIds: [ID!]!): [HuntingSearchJobResult]

    # Run search flow
    startHuntingSearchJob(incidentId: String!): HuntingSearchJob!

    # Set results seen for an incident
    huntingSearchJobResultsSeen(incidentId: String!): [HuntingSearchJob]!

    # Reprocess threat through threat pipeline
    processThreat(threatId: ID!): Boolean

    # Schedule sending of invitation emails to unstarted users of an organization
    inviteUnstartedUsers(organizationId: ID!): TaskGroup!

    # Schedule game starts to unstarted users of an organization
    startGameForUnstartedUsers(organizationId: ID!): TaskGroup!

    # Update user
    updateUser(user: UserInput!): User

    # Create users
    createUsers(users: [CreateUserInput]!): [User]!

    # Upsert user
    upsertUser(user: CreateUserInput!): UserUpsertResult!


    # Delete marker
    deleteMarker(id: ID!): Marker

    # Update / create marker
    createOrUpdateMarker(marker: MarkerInput!): Marker

    # Update user's fingerprint
    updateUserFingerprint(id: ID!, clientFingerprint: FingerprintInput): User

    # add an ui event to current user's events
    addUiEvents(uiEvents: [UiEventInput]!): User

    # NOTE: Lets use string rather than enum so it's not so easy to play the system
    # Add an user event to persist for user and recalculate rewards
    addUserEventAndRecalculateRewards(event: USER_EVENT!, userId: String!): User

    # Add a malicious link
    toggleThreatResourceIsMalicious(input: ThreatResourceInput!): ThreatResource

    # Update Incident state
    updateIncidentState(incidentId: ID!, state: IncidentState!): Incident @external

    # Add Incident note
    addIncidentNote(incidentId: ID!, note: IncidentNoteInput!): Incident @external

    # Update Incident note
    updateIncidentNote(incidentId: ID!, organizationId: ID!, note: EditIncidentNoteInput!): Incident

    # Delete Incident note
    deleteIncidentNote(incidentId: ID!, organizationId: ID!, noteId: ID!): Incident

    # Track client metric submission (window.performance + initial GraphQL query)
    trackClientMetrics(clientName: String!, metrics: ClientMetricInput!): Boolean!

    # Send quest to all users of an organization
    sendQuestToOrganization(organizationId: ID!, templateTag: String!, origin: QuestOrigin): TaskGroup
    
    # Delete quest
    deleteQuest(questId: ID!): Quest

    # Start game for current user
    startGameForCurrentUser: UserStartGameResult!

    # Self onboard current user
    selfOnboardCurrentUser(locale: String): UserSelfOnboardResult!

    # Execute bulk user action for specified list of emails or whole organization
    executeBulkUserAction(actionKind: BulkUserActionKind, emails: [String], organizationId: String): TaskGroup

    # Send quest to a specified list of emails or whole organization
    sendQuestsToEmails(emails: [String], organizationId: String, questTags: [String]!, origin: QuestOrigin, preventDuplicates: Boolean, secondaryObjectiveOverrides: SecondaryObjectiveOverrides): TaskGroup

    # Send a quest to self
    sendQuestToCurrentUser(questTag: String!, overrides: QuestSendingOverrides): TaskGroup

    # Create api key
    createToken(description: String!): String

    # Revoke api key
    revokeToken(jti: ID!): ID!

    # Revoke all user created api tokens
    revokeAllTokens: [ID]!

    # Update a Challenge for user
    updateChallenge(userId: ID!, organizationId: ID!, challenge: EChallenge!, data: ChallengeInput!): User

    # Mark the current user as onboarded 
    onboardCurrentUser: User!

    # Onboard a user via the new onboarding flow
    onboardUser(userId: ID!, organizationId: ID!): User!

    # Set user roles, effectively changing their permissions in the system
    addRoleForUsers(organizationId: ID!, userIds: [ID!]!, role: String!): [User]!

    # Reset users' roles back to normal user
    resetUsersRoles(organizationId: ID!, userIds: [ID!]!): [User]!

    # Set a specific role for user, effectively changing their permissions in the system
    setRoleForUser(userId: ID!, organizationId: ID! role: String!): User!

    # Create a new quest template
    createQuestTemplate(questTemplate: QuestTemplateInput!): QuestTemplate

    # Update a quest template
    updateQuestTemplate(questTemplateId: ID!, questTemplate: QuestTemplateInput!): QuestTemplate

    # Delete a quest template (only possible if quest template has no quests)
    deleteQuestTemplate(questTemplateId: ID!): QuestTemplate

    # Toggle isActive state for quest template
    toggleQuestTemplatePublicationStatus(questTemplateId: ID!, isActive: Boolean!): QuestTemplate

    # Toggle soft deletion of a quest template (delete / restore)
    toggleQuestTemplateSoftDeletion(questTemplateId: ID!): QuestTemplate

    # Create a new quiz template
    createQuizTemplate(quizTemplate: CreateQuizTemplateInput!): QuizTemplate

    # Update a quiz template
    updateQuizTemplate(quizTemplate: QuizTemplateInput!): QuizTemplate

    # Delete quiz template
    deleteQuizTemplate(quizTemplateId: ID!): QuizTemplate

    # Create quiz module
    createQuizModule(quizModule: QuizModuleCreateInput!): QuizModule

    # Update quiz module
    updateQuizModule(quizModule: QuizModuleUpdateInput!): QuizModule

    # Delete quiz module
    deleteQuizModule(quizModuleId: ID!): QuizModule

    # Recalculate users stats
    recalculateStats(userIds: [ID!]!): TaskGroup

    # Schedule organization recalculation 
    scheduleStatRecalculationTasksForOrganizations(organizationIds: [ID!]!, usersPerMinute: Int!): TaskGroup

    # Migrate quest markers users stats
    migrateQuestMarkers(userIds: [ID!]!): TaskGroup

    # Set users for backfilling workflow related to onboarding events
    setUsersForOnboardingBackfill(userIds: [ID!]!): Boolean!

    # Claim achievement
    claimAchievement(achievementId: AchievementId! userId: ID! organizationId: ID!): User

    # Add geolocation
    addGeolocation(userId: ID!): Boolean

    # Unlink Plugin from user
    unlinkPlugin(userId: ID!, pluginId: ID!): Plugin

    # Act on a Preview version of quiz. No side-effects (quest / db / analytics).
    actOnQuizPreview(id: ID!, userId: ID!, organizationId: ID!, action: BlockSetActionsInput!): Quiz

    # Act on a quest with quiz objective (IQuestWithQuizObjective)
    actOnQuizObjective(id: ID!, userId: ID!, organizationId: ID!, action: BlockSetActionsInput!): Quiz

    # Create Nps survey answer
    createNpsAnswer(npsAnswer: NpsAnswerInput!): Boolean

    # Mark when user nps survey last shown to current user
    addLastNpsSurveyAskedAtForCurrentUser: Date

    # Update organization's domain
    updateDomain(organizationId: ID!, domain: DomainInput!): Domain

    # Update organization's Quiz Module
    updateOrganizationQuizModule(organizationId: ID!, input: OrgQuizModuleInput!): OrgQuizModule

    # Update organization's Quiz Module Template
    updateOrganizationQuizModuleTemplate(organizationId: ID!, input: OrgQuizModuleTemplateInput!): OrgQuizModule

    # Update organization's plugin redirect settings
    updateOrganizationPluginRedirect(organizationId: ID!, pluginRedirect: OrgPluginRedirectInput!): Organization

    # Update organization's plugin settings
    updateOrganizationPluginSettings(organizationId: ID!, pluginSettings: OrgPluginSettingsInput!): Organization

    # Update organization's threat settings
    updateOrganizationThreatSettings(organizationId: ID!, threatSettings: OrgThreatSettingsInput!): Organization

    # Set an organizations quizSettings.newContentActiveByDefault setting
    setOrgQuizNewContentOnByDefault(organizationId: ID!, value: Boolean!): OrgQuizSettings

    # Remove game cooldown from all users in organization
    removeGameCooldownFromOrganizationUsers(organizationId: ID!): [User]!

    # Toggle demoMode for organization 
    setDemoMode(organizationId: ID!, value: Boolean!): Organization

    # Set whether DKIM should be used when sending emails to the organization
    setOrganizationDkim(organizationId: ID!, useDkim: Boolean!): Boolean

    # Set whether the Gmail delivery API should be used when sending emails to the organization
    setOrganizationGmailIntegration(useGmailDeliveryApi: Boolean!): Boolean

    # Remove the given domain from an organization if no users under the domain exist
    removeOrganizationDomain(domainName: String): OrganizationMutationResult!

    # Adds a feature to the specified user. Doesn't add duplicates.
    addFeatureForUser(id: ID!, feature: String!): Boolean

    # Removes a feature from the specified user.
    removeFeatureFromUser(id: ID!, feature: String!): Boolean

    # Remove game cooldown from user
    # @filterable
    removeGameCooldown(organizationId: ID!, search: String): UserActionResult!

    # Delete user
    # @filterable
    deleteUsers(organizationId: ID!, search: String): UserActionResult!

    # Deactivate user. Deactivated users will be removed automatically in 90 days.
    # @filterable
    deactivateUsers(organizationId: ID!, search: String): UserActionResult!

    # Reactivate user. Cancel pending user removal and reinstate their game state.
    # @filterable
    reactivateUsers(organizationId: ID!, search: String): UserActionResult!

    # Invite users by sending promotion emails to users
    # @filterable
    inviteUsers(organizationId: ID!, search: String): UserActionResult!

    # Enroll users, automatically starting the game for them.
    # @filterable
    automaticStart(organizationId: ID!, search: String): UserActionResult!

    # Toggle the game mode for given users between.
    # @filterable
    toggleGameMode(organizationId: ID!, search: String): UserActionResult!

    # Toggle the game on or off for users
    # @filterable
    toggleActive(organizationId: ID!, search: String): UserActionResult!

    # Set properties for users
    # @filterable
    setUserProperties(organizationId: ID!, search: String, userProperties: UserPropertiesInput!): UserActionResult!

    # Generate a CSV file containing data of users that match given search parameters
    # @filterable(User)
    generateUserCSVFile(organizationId: ID!, search: String, selectedColumns: [USER_DATA_COLUMN!]!): GenerateUserCSVResult!

    # Recalculate achievement completion aggregate for an organization
    recalculateAchievementCompletion(organizationId: ID!): String!

    # Create or update an organization training rule
    upsertOrganizationTrainingRule(input: OrganizationTrainingRuleInput): OrganizationTrainingRule!

    # Removes a feature from the specified organization
    removeFeatureFromOrganization(id: ID!, feature: String!): Boolean!

    # Adds (an existing) feature for the specified organization. Can't be used for creating new features.
    addFeatureForOrganization(id: ID!, feature: String!): Boolean

    # Created a feedback rule for the organization
    createFeedbackRule(rule: FeedbackRuleInput!, organizationId: ID!): FeedbackRule!

    # Update a feedback rule
    updateFeedbackRule(rule: FeedbackRulePatchInput): FeedbackRule!

    # Remove a feedback rule
    removeFeedbackRule(ruleId: ID!): FeedbackRule!

    # User left feedback
    createInstantFeedbackUserFeedback(feedback: InstantFeedbackUserFeedbackCreateInput!, organizationId: ID!, userId: ID!): UserFeedback!

    # User updated their feedback
    updateUserFeedback(feedback: UserFeedbackPatchInput!): UserFeedback!

    # Soft delete single user
    softDeleteUser(userId: ID!, organizationId: ID!): User

    # Undo soft delete for single user
    undoSoftDeleteUser(userId: ID!, organizationId: ID!): User

    # Start training for single user
    autoStartUser(userId: ID!, organizationId: ID!): User

    # Invite single user by sending promotion email to user
    inviteUser(userId: ID!, organizationId: ID!): User

    # Reset all gamification elements for a user (achievements, remove quests)
    resetUserGame(userId: String!, organizationId: String!, questIdsToKeep: [String!]): TaskGroup

    # Send a technical test quest to user
    technicalTestQuestSendToUser(userId: ID!, organizationId: ID!, questTag: String!): QuestMutationResult!

    # Remove technical test quests from organization users
    technicalTestQuestRemoveAll(organizationId: ID!): QuestMutationResult!
    
    # Add a new Google client id to the api settings, needed when organization has their own add-on in Google environment
    addGoogleClientId(organizationId: ID!, clientId: String!): Organization!

    # Remove a Google client id from the api settings
    removeGoogleClientId(organizationId: ID!, clientId: String!): Organization!

    # Start onboarding for organization
    startOrganizationOnboarding(organizationId: ID!): OrganizationMutationResult!

    # Complete onboarding task
    organizationOnboardingTaskMarkCompleted(onboardingTaskId: ID!, organizationId: ID!): OrganizationOnboardingTaskMutationResult!

    # Launch organization
    organizationLaunchTraining(organizationId: ID!): OrganizationMutationResult!

    # Update organizations security team name
    updateOrganizationSecurityTeamName(organizationId: ID!, securityTeamName: String!): Organization
  }
`;

export default () => [Root];
