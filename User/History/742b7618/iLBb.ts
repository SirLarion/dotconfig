// GENERATED, DO NOT EDIT
// This file is generated from the domain folder-file structure. To regenerate, run: npm run generate:handlertree
import sinon from 'sinon';

export type THandlerStubTree = Readonly<{
  admin: Readonly<{
    organizationOnboarding: Readonly<{
      completeOnboardingTask: sinon.SinonStub;
      getOnboardingTaskTemplates: sinon.SinonStub;
      launchOrganization: sinon.SinonStub;
      reopenOnboardingTask: sinon.SinonStub;
      start: sinon.SinonStub;
    }>;
    scim: Readonly<{
      createUser: sinon.SinonStub;
      findUsers: sinon.SinonStub;
      getUser: sinon.SinonStub;
      removeUser: sinon.SinonStub;
      replaceUser: sinon.SinonStub;
      updateUser: sinon.SinonStub;
    }>;
    technicalTesting: Readonly<{
      findTestTemplates: sinon.SinonStub;
      removeTechnicalTestingQuests: sinon.SinonStub;
      sendTestQuestToUser: sinon.SinonStub;
    }>;
  }>;
  analytics: Readonly<{
    cubes: Readonly<{
      query: sinon.SinonStub;
    }>;
    ingest: Readonly<{
      createEnriched: sinon.SinonStub;
      ping: sinon.SinonStub;
      track: sinon.SinonStub;
    }>;
    sink: Readonly<{
      track: sinon.SinonStub;
    }>;
  }>;
  auth: Readonly<{
    email: Readonly<{
      sendJwtMagicLinkViaEmail: sinon.SinonStub;
      sendMagicLinkEmail: sinon.SinonStub;
    }>;
    iap: Readonly<{
      findUser: sinon.SinonStub;
    }>;
    impersonate: Readonly<{
      loginAsOtherUser: sinon.SinonStub;
    }>;
    info: Readonly<{
      getLoginInfo: sinon.SinonStub;
    }>;
    jwt: Readonly<{
      consumeRefreshToken: sinon.SinonStub;
      createAccessToken: sinon.SinonStub;
      createHuntingAccessToken: sinon.SinonStub;
      createLoginUrl: sinon.SinonStub;
      createRefreshToken: sinon.SinonStub;
      handleRefreshToken: sinon.SinonStub;
      login: sinon.SinonStub;
      logout: sinon.SinonStub;
      verifyAccessToken: sinon.SinonStub;
      verifyRefreshToken: sinon.SinonStub;
    }>;
    otp: Readonly<{
      consumeOtp: sinon.SinonStub;
      createOtp: sinon.SinonStub;
      createOtpLoginUrl: sinon.SinonStub;
      createOtpPayload: sinon.SinonStub;
      verifyOtp: sinon.SinonStub;
    }>;
    plugin: Readonly<{
      authenticateGoogle: sinon.SinonStub;
      authenticateOfficeJs: sinon.SinonStub;
      verifyGoogleIdToken: sinon.SinonStub;
    }>;
    scim: Readonly<{
      createScimToken: sinon.SinonStub;
    }>;
  }>;
  bots: Readonly<{
    teams: Readonly<{
      reportAction: sinon.SinonStub;
    }>;
  }>;
  collection: Readonly<{
    agendaJob: Readonly<{
      createMany: sinon.SinonStub;
      find: sinon.SinonStub;
      remove: sinon.SinonStub;
    }>;
    analyticsEvent: Readonly<{
      aggregate: sinon.SinonStub;
      create: sinon.SinonStub;
      createMany: sinon.SinonStub;
      find: sinon.SinonStub;
      get: sinon.SinonStub;
      patch: sinon.SinonStub;
      remove: sinon.SinonStub;
      update: sinon.SinonStub;
      upsert: sinon.SinonStub;
    }>;
    clientInfo: Readonly<{
      create: sinon.SinonStub;
      find: sinon.SinonStub;
      get: sinon.SinonStub;
      patch: sinon.SinonStub;
      remove: sinon.SinonStub;
      update: sinon.SinonStub;
      upsert: sinon.SinonStub;
    }>;
    distributedLock: Readonly<{
      create: sinon.SinonStub;
      find: sinon.SinonStub;
      remove: sinon.SinonStub;
    }>;
    emailRecord: Readonly<{
      create: sinon.SinonStub;
      createMany: sinon.SinonStub;
      find: sinon.SinonStub;
      patch: sinon.SinonStub;
      remove: sinon.SinonStub;
    }>;
    feedbackRule: Readonly<{
      create: sinon.SinonStub;
      find: sinon.SinonStub;
      patch: sinon.SinonStub;
      remove: sinon.SinonStub;
    }>;
    fingerprint: Readonly<{
      create: sinon.SinonStub;
      find: sinon.SinonStub;
      get: sinon.SinonStub;
      patch: sinon.SinonStub;
      remove: sinon.SinonStub;
      update: sinon.SinonStub;
      upsert: sinon.SinonStub;
    }>;
    gmailAddonExecutionState: Readonly<{
      create: sinon.SinonStub;
      get: sinon.SinonStub;
      upsert: sinon.SinonStub;
    }>;
    huntingSearchJob: Readonly<{
      create: sinon.SinonStub;
      find: sinon.SinonStub;
      get: sinon.SinonStub;
      patch: sinon.SinonStub;
      remove: sinon.SinonStub;
    }>;
    huntingSearchJobResult: Readonly<{
      create: sinon.SinonStub;
      createMany: sinon.SinonStub;
      find: sinon.SinonStub;
      get: sinon.SinonStub;
      patch: sinon.SinonStub;
      remove: sinon.SinonStub;
    }>;
    incidentBeta: Readonly<{
      aggregate: sinon.SinonStub;
      create: sinon.SinonStub;
      find: sinon.SinonStub;
      get: sinon.SinonStub;
      patch: sinon.SinonStub;
      remove: sinon.SinonStub;
      update: sinon.SinonStub;
      upsert: sinon.SinonStub;
    }>;
    marker: Readonly<{
      create: sinon.SinonStub;
      find: sinon.SinonStub;
      get: sinon.SinonStub;
      patch: sinon.SinonStub;
      remove: sinon.SinonStub;
      update: sinon.SinonStub;
      upsert: sinon.SinonStub;
    }>;
    migrations: Readonly<{
      create: sinon.SinonStub;
      get: sinon.SinonStub;
      patch: sinon.SinonStub;
    }>;
    npsAnswer: Readonly<{
      create: sinon.SinonStub;
      find: sinon.SinonStub;
    }>;
    oneTimePassword: Readonly<{
      create: sinon.SinonStub;
      find: sinon.SinonStub;
      remove: sinon.SinonStub;
    }>;
    organization: Readonly<{
      addFeatureForOrganization: sinon.SinonStub;
      addGoogleClientId: sinon.SinonStub;
      create: sinon.SinonStub;
      find: sinon.SinonStub;
      get: sinon.SinonStub;
      getByDomain: sinon.SinonStub;
      patch: sinon.SinonStub;
      remove: sinon.SinonStub;
      removeFeatureFromOrganization: sinon.SinonStub;
      removeGoogleClientId: sinon.SinonStub;
    }>;
    organizationOnboardingTask: Readonly<{
      create: sinon.SinonStub;
      find: sinon.SinonStub;
      patch: sinon.SinonStub;
      remove: sinon.SinonStub;
    }>;
    organizationTrainingRule: Readonly<{
      find: sinon.SinonStub;
      get: sinon.SinonStub;
      remove: sinon.SinonStub;
      upsert: sinon.SinonStub;
    }>;
    plugin: Readonly<{
      create: sinon.SinonStub;
      find: sinon.SinonStub;
      get: sinon.SinonStub;
      patch: sinon.SinonStub;
      remove: sinon.SinonStub;
      update: sinon.SinonStub;
      upsert: sinon.SinonStub;
    }>;
    quest: Readonly<{
      aggregate: sinon.SinonStub;
      create: sinon.SinonStub;
      find: sinon.SinonStub;
      get: sinon.SinonStub;
      patch: sinon.SinonStub;
      remove: sinon.SinonStub;
      update: sinon.SinonStub;
      upsert: sinon.SinonStub;
    }>;
    questTemplate: Readonly<{
      create: sinon.SinonStub;
      find: sinon.SinonStub;
      get: sinon.SinonStub;
      patch: sinon.SinonStub;
      remove: sinon.SinonStub;
      update: sinon.SinonStub;
      upsert: sinon.SinonStub;
    }>;
    quizModule: Readonly<{
      create: sinon.SinonStub;
      find: sinon.SinonStub;
      get: sinon.SinonStub;
      patch: sinon.SinonStub;
      remove: sinon.SinonStub;
      update: sinon.SinonStub;
      upsert: sinon.SinonStub;
    }>;
    quizTemplate: Readonly<{
      create: sinon.SinonStub;
      find: sinon.SinonStub;
      get: sinon.SinonStub;
      patch: sinon.SinonStub;
      remove: sinon.SinonStub;
      update: sinon.SinonStub;
    }>;
    rank: Readonly<{
      find: sinon.SinonStub;
    }>;
    refreshToken: Readonly<{
      create: sinon.SinonStub;
      find: sinon.SinonStub;
      remove: sinon.SinonStub;
    }>;
    tag: Readonly<{
      find: sinon.SinonStub;
      findVectorTag: sinon.SinonStub;
    }>;
    task: Readonly<{
      create: sinon.SinonStub;
      createMany: sinon.SinonStub;
      find: sinon.SinonStub;
      get: sinon.SinonStub;
      patch: sinon.SinonStub;
      remove: sinon.SinonStub;
      update: sinon.SinonStub;
      upsert: sinon.SinonStub;
    }>;
    taskGroup: Readonly<{
      create: sinon.SinonStub;
      find: sinon.SinonStub;
      get: sinon.SinonStub;
      patch: sinon.SinonStub;
      remove: sinon.SinonStub;
      update: sinon.SinonStub;
      upsert: sinon.SinonStub;
    }>;
    threat: Readonly<{
      aggregate: sinon.SinonStub;
      create: sinon.SinonStub;
      find: sinon.SinonStub;
      get: sinon.SinonStub;
      patch: sinon.SinonStub;
      remove: sinon.SinonStub;
      update: sinon.SinonStub;
      upsert: sinon.SinonStub;
    }>;
    threatObservable: Readonly<{
      create: sinon.SinonStub;
      find: sinon.SinonStub;
      get: sinon.SinonStub;
      patch: sinon.SinonStub;
      remove: sinon.SinonStub;
      update: sinon.SinonStub;
      upsert: sinon.SinonStub;
    }>;
    threatResource: Readonly<{
      find: sinon.SinonStub;
      upsert: sinon.SinonStub;
    }>;
    threatSimilarityGroup: Readonly<{
      create: sinon.SinonStub;
      find: sinon.SinonStub;
      get: sinon.SinonStub;
      patch: sinon.SinonStub;
      remove: sinon.SinonStub;
      upsert: sinon.SinonStub;
    }>;
    translation: Readonly<{
      create: sinon.SinonStub;
      find: sinon.SinonStub;
      get: sinon.SinonStub;
      patch: sinon.SinonStub;
      remove: sinon.SinonStub;
      update: sinon.SinonStub;
      upsert: sinon.SinonStub;
    }>;
    user: Readonly<{
      addFeatureForUser: sinon.SinonStub;
      aggregate: sinon.SinonStub;
      create: sinon.SinonStub;
      distinct: sinon.SinonStub;
      find: sinon.SinonStub;
      findAdminsByOrganizationId: sinon.SinonStub;
      findCoworkersByOrganizationId: sinon.SinonStub;
      get: sinon.SinonStub;
      patch: sinon.SinonStub;
      remove: sinon.SinonStub;
      removeFeatureFromUser: sinon.SinonStub;
      update: sinon.SinonStub;
      upsert: sinon.SinonStub;
    }>;
    userFeedback: Readonly<{
      create: sinon.SinonStub;
      find: sinon.SinonStub;
      patch: sinon.SinonStub;
      remove: sinon.SinonStub;
    }>;
    vector: Readonly<{
      create: sinon.SinonStub;
      find: sinon.SinonStub;
      get: sinon.SinonStub;
      patch: sinon.SinonStub;
      remove: sinon.SinonStub;
      update: sinon.SinonStub;
      upsert: sinon.SinonStub;
    }>;
  }>;
  data: Readonly<{
    dash: Readonly<{
      proxyDashRequests: sinon.SinonStub;
    }>;
  }>;
  game: Readonly<{
    challenge: Readonly<{
      updateForUser: sinon.SinonStub;
    }>;
    cycle: Readonly<{
      full: sinon.SinonStub;
      user: sinon.SinonStub;
    }>;
    email: Readonly<{
      inviteOrganizationsUnstartedUsers: sinon.SinonStub;
      sendActivationEmail: sinon.SinonStub;
      sendWelcomeEmail: sinon.SinonStub;
    }>;
    engine: Readonly<{
      createNewQuest: sinon.SinonStub;
      getQuestBasedOnLatestTheme: sinon.SinonStub;
      getTranslatedQuest: sinon.SinonStub;
    }>;
    leaderboard: Readonly<{
      getCountryLeaderboard: sinon.SinonStub;
      getLeaderboard: sinon.SinonStub;
      getSimpleUserStarsLeaderboard: sinon.SinonStub;
      getUserStarsLeaderboard: sinon.SinonStub;
    }>;
    organization: Readonly<{
      scheduleReminderEmails: sinon.SinonStub;
      setDemoMode: sinon.SinonStub;
      updateAchievementAggregates: sinon.SinonStub;
      updateCountryLeaderboardAggregates: sinon.SinonStub;
      updateUserCountByCountryAggregates: sinon.SinonStub;
    }>;
    quest: Readonly<{
      deliver: sinon.SinonStub;
      expire: sinon.SinonStub;
      expireAll: sinon.SinonStub;
      fail: sinon.SinonStub;
      getAttachment: sinon.SinonStub;
      getFailUrl: sinon.SinonStub;
      getResultUrl: sinon.SinonStub;
      getSignedFailUrl: sinon.SinonStub;
      getSignedResultUrl: sinon.SinonStub;
      register: sinon.SinonStub;
      report: sinon.SinonStub;
      reportWithMessageId: sinon.SinonStub;
      trackDelivery: sinon.SinonStub;
    }>;
    questTemplate: Readonly<{
      checkCompilability: sinon.SinonStub;
      compileQuestTemplatePreview: sinon.SinonStub;
      compileQuestTemplateString: sinon.SinonStub;
      compileQuestToVector: sinon.SinonStub;
      generateFailureFunnel: sinon.SinonStub;
      getDifficultyFactors: sinon.SinonStub;
      getExampleContext: sinon.SinonStub;
      updateStatistics: sinon.SinonStub;
    }>;
    quiz: Readonly<{
      actOnPreview: sinon.SinonStub;
      actOnQuizObjective: sinon.SinonStub;
      preview: sinon.SinonStub;
      selectNextForUser: sinon.SinonStub;
    }>;
    result: Readonly<{
      get: sinon.SinonStub;
      selectAndPatchSecondaryObjective: sinon.SinonStub;
    }>;
    user: Readonly<{
      claimAchievement: sinon.SinonStub;
      getChangedRewards: sinon.SinonStub;
      imposeDeliveryCooldown: sinon.SinonStub;
      legacyOnboardUser: sinon.SinonStub;
      onboardUser: sinon.SinonStub;
      recalculateStats: sinon.SinonStub;
      resetUserGame: sinon.SinonStub;
      selfOnboard: sinon.SinonStub;
      start: sinon.SinonStub;
      startGameForOrganizationsUnstartedUsers: sinon.SinonStub;
      startGameForUsersWithAutomaticEnrollment: sinon.SinonStub;
      updateOnboardingEligibility: sinon.SinonStub;
      updatePlayerStats: sinon.SinonStub;
    }>;
  }>;
  infrastructure: Readonly<{
    auth: Readonly<{
      createToken: sinon.SinonStub;
      getSigninData: sinon.SinonStub;
      resolveApiUserFromToken: sinon.SinonStub;
      revokeToken: sinon.SinonStub;
      verifyTokenAgainstWhitelist: sinon.SinonStub;
    }>;
    database: Readonly<{
      cleanup: sinon.SinonStub;
      removePreUploadedThreats: sinon.SinonStub;
    }>;
    distributedLock: Readonly<{
      acquireLock: sinon.SinonStub;
      releaseLock: sinon.SinonStub;
    }>;
    dkim: Readonly<{
      create: sinon.SinonStub;
      getSigningKey: sinon.SinonStub;
    }>;
    health: Readonly<{
      alive: sinon.SinonStub;
      ready: sinon.SinonStub;
    }>;
    hoxHash: Readonly<{
      compare: sinon.SinonStub;
      compareBatched: sinon.SinonStub;
      computeFuzzyHash: sinon.SinonStub;
    }>;
    hoxUrl: Readonly<{
      createShortLink: sinon.SinonStub;
    }>;
    htmlToImage: Readonly<{
      createImageFromHtml: sinon.SinonStub;
    }>;
    id: Readonly<{
      generateHumanReadableId: sinon.SinonStub;
    }>;
    jwt: Readonly<{
      create: sinon.SinonStub;
      decode: sinon.SinonStub;
      signUrlForCurrentUser: sinon.SinonStub;
      verify: sinon.SinonStub;
      verifySignedUrl: sinon.SinonStub;
    }>;
    logger: Readonly<{
      log: sinon.SinonStub;
    }>;
    migration: Readonly<{
      backfillOnboardingEvents: sinon.SinonStub;
      backfillQuestMarkerStars: sinon.SinonStub;
      backfillUserQuestMarkerStars: sinon.SinonStub;
      enrichPreviouslyFailedThreats: sinon.SinonStub;
      splitHops: sinon.SinonStub;
      v175FixThreatHeaders: sinon.SinonStub;
    }>;
    profile: Readonly<{
      capturePerformanceProfile: sinon.SinonStub;
    }>;
  }>;
  integration: Readonly<{
    azure: Readonly<{
      getResourceTemplate: sinon.SinonStub;
      getResourceTemplateUrl: sinon.SinonStub;
    }>;
    bitly: Readonly<{
      getUrl: sinon.SinonStub;
    }>;
    cloudinary: Readonly<{
      signUpload: sinon.SinonStub;
    }>;
    dns: Readonly<{
      lookup: sinon.SinonStub;
      lookupMx: sinon.SinonStub;
      validateSpf: sinon.SinonStub;
    }>;
    email: Readonly<{
      build: sinon.SinonStub;
      deliver: sinon.SinonStub;
      imposeDeliveryLimit: sinon.SinonStub;
      send: sinon.SinonStub;
      trackDelivery: sinon.SinonStub;
    }>;
    gmail: Readonly<{
      fetchEmailDeliveryAccessToken: sinon.SinonStub;
      getApiCredentials: sinon.SinonStub;
      insertMessage: sinon.SinonStub;
    }>;
    googleCloudKms: Readonly<{
      decryptAsymmetric: sinon.SinonStub;
      getPublicKey: sinon.SinonStub;
    }>;
    googleCloudStorage: Readonly<{
      deleteFile: sinon.SinonStub;
      downloadFile: sinon.SinonStub;
      getSignedUrl: sinon.SinonStub;
      listFiles: sinon.SinonStub;
      upload: sinon.SinonStub;
    }>;
    http: Readonly<{
      request: sinon.SinonStub;
    }>;
    virustotalAugment: Readonly<{
      fetchEphemeralUrl: sinon.SinonStub;
    }>;
    zendesk: Readonly<{
      createToken: sinon.SinonStub;
      redirect: sinon.SinonStub;
    }>;
  }>;
  internal: Readonly<{
    diagnostics: Readonly<{
      debugEngineHeuristics: sinon.SinonStub;
    }>;
    experiments: Readonly<{
      initOrGetUserSplitTestCase: sinon.SinonStub;
    }>;
    features: Readonly<{
      hasFeature: sinon.SinonStub;
      hasFeatures: sinon.SinonStub;
      trackOrganizationFeatures: sinon.SinonStub;
    }>;
  }>;
  intl: Readonly<{
    translations: Readonly<{
      getAll: sinon.SinonStub;
      getCdnTranslations: sinon.SinonStub;
      getDatabaseSourceMessages: sinon.SinonStub;
      getStaticSourceMessages: sinon.SinonStub;
      syncTranslations: sinon.SinonStub;
      uploadDynamicTranslations: sinon.SinonStub;
    }>;
  }>;
  legacy: Readonly<{
    fingerprintUser: Readonly<{
      update: sinon.SinonStub;
    }>;
    importUsers: Readonly<{
      create: sinon.SinonStub;
    }>;
    markerFactory: Readonly<{
      create: sinon.SinonStub;
      remove: sinon.SinonStub;
      update: sinon.SinonStub;
    }>;
    questMarkerReview: Readonly<{
      create: sinon.SinonStub;
    }>;
    sendQuestToOrganization: Readonly<{
      create: sinon.SinonStub;
    }>;
    sendQuestToUser: Readonly<{
      create: sinon.SinonStub;
    }>;
    threatObservableTask: Readonly<{
      create: sinon.SinonStub;
      update: sinon.SinonStub;
      upsert: sinon.SinonStub;
    }>;
    userTagCreator: Readonly<{
      create: sinon.SinonStub;
    }>;
  }>;
  organization: Readonly<{
    domain: Readonly<{
      update: sinon.SinonStub;
    }>;
    quiz: Readonly<{
      getModules: sinon.SinonStub;
      syncOrgModuleState: sinon.SinonStub;
      upsertModule: sinon.SinonStub;
      upsertModuleTemplate: sinon.SinonStub;
    }>;
  }>;
  plugin: Readonly<{
    action: Readonly<{
      click: sinon.SinonStub;
      handleAction: sinon.SinonStub;
      reportQuest: sinon.SinonStub;
      start: sinon.SinonStub;
      startGame: sinon.SinonStub;
      upload: sinon.SinonStub;
    }>;
    response: Readonly<{
      unknownUser: sinon.SinonStub;
    }>;
  }>;
  questTemplate: Readonly<{
    benchmark: Readonly<{
      findTemplates: sinon.SinonStub;
    }>;
    search: Readonly<{
      findQuestTemplatesBySearchString: sinon.SinonStub;
    }>;
  }>;
  security: Readonly<{
    validation: Readonly<{
      sanitizeHtml: sinon.SinonStub;
    }>;
  }>;
  templating: Readonly<{
    handlebars: Readonly<{
      compileTemplate: sinon.SinonStub;
      parseTemplate: sinon.SinonStub;
    }>;
  }>;
  threat: Readonly<{
    analysis: Readonly<{
      assign: sinon.SinonStub;
      calculateStatistics: sinon.SinonStub;
      calculateTrendHistogram: sinon.SinonStub;
      callMlModelWithThreat: sinon.SinonStub;
      getPrioritisedListOfAnalysableThreats: sinon.SinonStub;
      rateSimilarityGroup: sinon.SinonStub;
      rateThreat: sinon.SinonStub;
    }>;
    cortex: Readonly<{
      analyze: sinon.SinonStub;
      getAnalyzers: sinon.SinonStub;
      getJobReport: sinon.SinonStub;
    }>;
    feedback: Readonly<{
      sendFeedbackToUser: sinon.SinonStub;
      startBatchedThreatFeedback: sinon.SinonStub;
    }>;
    hunting: Readonly<{
      deleteEmail: sinon.SinonStub;
      getSearchResults: sinon.SinonStub;
      initializeSettings: sinon.SinonStub;
      revertEmailDeletion: sinon.SinonStub;
      startSearch: sinon.SinonStub;
      timeoutOldHuntingSearchJobs: sinon.SinonStub;
    }>;
    pipeline: Readonly<{
      assignSimilarityGroup: sinon.SinonStub;
      enrichThreat: sinon.SinonStub;
      escalate: sinon.SinonStub;
      rateAutomatically: sinon.SinonStub;
      runPipelineForThreats: sinon.SinonStub;
      updateIncidents: sinon.SinonStub;
    }>;
    rules: Readonly<{
      evaluateExpression: sinon.SinonStub;
    }>;
    search: Readonly<{
      findIncidentsBySearchString: sinon.SinonStub;
      findThreatsBySearchString: sinon.SinonStub;
    }>;
  }>;
  user: Readonly<{
    adminAction: Readonly<{
      sendQuest: sinon.SinonStub;
    }>;
    bulk: Readonly<{
      sendQuest: sinon.SinonStub;
    }>;
    bulkAction: Readonly<{
      fanOut: sinon.SinonStub;
    }>;
    email: Readonly<{
      inviteUser: sinon.SinonStub;
    }>;
    enrichment: Readonly<{
      addGeolocation: sinon.SinonStub;
      persistEvents: sinon.SinonStub;
      persistEventsAndRecalculateRewards: sinon.SinonStub;
    }>;
    nps: Readonly<{
      create: sinon.SinonStub;
      shouldAskNpsSurvey: sinon.SinonStub;
    }>;
    roles: Readonly<{
      addRole: sinon.SinonStub;
      removeRoles: sinon.SinonStub;
      setRole: sinon.SinonStub;
    }>;
    search: Readonly<{
      findUsersBySearchString: sinon.SinonStub;
    }>;
    softDelete: Readonly<{
      deactivateUser: sinon.SinonStub;
      reactivateUser: sinon.SinonStub;
    }>;
  }>;
}>;

export const handlerMockTree: THandlerStubTree = Object.freeze({
  admin: Object.freeze({
    organizationOnboarding: Object.freeze({
      completeOnboardingTask: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "admin.organizationOnboarding.completeOnboardingTask"'
          )
        ),
      getOnboardingTaskTemplates: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "admin.organizationOnboarding.getOnboardingTaskTemplates"'
          )
        ),
      launchOrganization: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "admin.organizationOnboarding.launchOrganization"'
          )
        ),
      reopenOnboardingTask: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "admin.organizationOnboarding.reopenOnboardingTask"'
          )
        ),
      start: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "admin.organizationOnboarding.start"'
          )
        ),
    }),
    scim: Object.freeze({
      createUser: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "admin.scim.createUser"')),
      findUsers: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "admin.scim.findUsers"')),
      getUser: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "admin.scim.getUser"')),
      removeUser: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "admin.scim.removeUser"')),
      replaceUser: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "admin.scim.replaceUser"')
        ),
      updateUser: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "admin.scim.updateUser"')),
    }),
    technicalTesting: Object.freeze({
      findTestTemplates: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "admin.technicalTesting.findTestTemplates"'
          )
        ),
      removeTechnicalTestingQuests: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "admin.technicalTesting.removeTechnicalTestingQuests"'
          )
        ),
      sendTestQuestToUser: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "admin.technicalTesting.sendTestQuestToUser"'
          )
        ),
    }),
  }),
  analytics: Object.freeze({
    cubes: Object.freeze({
      query: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "analytics.cubes.query"')),
    }),
    ingest: Object.freeze({
      createEnriched: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "analytics.ingest.createEnriched"'
          )
        ),
      ping: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "analytics.ingest.ping"')),
      track: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "analytics.ingest.track"')
        ),
    }),
    sink: Object.freeze({
      track: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "analytics.sink.track"')),
    }),
  }),
  auth: Object.freeze({
    email: Object.freeze({
      sendJwtMagicLinkViaEmail: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "auth.email.sendJwtMagicLinkViaEmail"'
          )
        ),
      sendMagicLinkEmail: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "auth.email.sendMagicLinkEmail"')
        ),
    }),
    iap: Object.freeze({
      findUser: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "auth.iap.findUser"')),
    }),
    impersonate: Object.freeze({
      loginAsOtherUser: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "auth.impersonate.loginAsOtherUser"'
          )
        ),
    }),
    info: Object.freeze({
      getLoginInfo: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "auth.info.getLoginInfo"')
        ),
    }),
    jwt: Object.freeze({
      consumeRefreshToken: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "auth.jwt.consumeRefreshToken"')
        ),
      createAccessToken: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "auth.jwt.createAccessToken"')
        ),
      createHuntingAccessToken: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "auth.jwt.createHuntingAccessToken"'
          )
        ),
      createLoginUrl: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "auth.jwt.createLoginUrl"')
        ),
      createRefreshToken: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "auth.jwt.createRefreshToken"')
        ),
      handleRefreshToken: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "auth.jwt.handleRefreshToken"')
        ),
      login: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "auth.jwt.login"')),
      logout: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "auth.jwt.logout"')),
      verifyAccessToken: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "auth.jwt.verifyAccessToken"')
        ),
      verifyRefreshToken: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "auth.jwt.verifyRefreshToken"')
        ),
    }),
    otp: Object.freeze({
      consumeOtp: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "auth.otp.consumeOtp"')),
      createOtp: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "auth.otp.createOtp"')),
      createOtpLoginUrl: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "auth.otp.createOtpLoginUrl"')
        ),
      createOtpPayload: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "auth.otp.createOtpPayload"')
        ),
      verifyOtp: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "auth.otp.verifyOtp"')),
    }),
    plugin: Object.freeze({
      authenticateGoogle: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "auth.plugin.authenticateGoogle"')
        ),
      authenticateOfficeJs: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "auth.plugin.authenticateOfficeJs"'
          )
        ),
      verifyGoogleIdToken: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "auth.plugin.verifyGoogleIdToken"'
          )
        ),
    }),
    scim: Object.freeze({
      createScimToken: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "auth.scim.createScimToken"')
        ),
    }),
  }),
  bots: Object.freeze({
    teams: Object.freeze({
      reportAction: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "bots.teams.reportAction"')
        ),
    }),
  }),
  collection: Object.freeze({
    agendaJob: Object.freeze({
      createMany: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.agendaJob.createMany"'
          )
        ),
      find: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.agendaJob.find"')
        ),
      remove: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.agendaJob.remove"')
        ),
    }),
    analyticsEvent: Object.freeze({
      aggregate: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.analyticsEvent.aggregate"'
          )
        ),
      create: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.analyticsEvent.create"'
          )
        ),
      createMany: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.analyticsEvent.createMany"'
          )
        ),
      find: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.analyticsEvent.find"')
        ),
      get: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.analyticsEvent.get"')
        ),
      patch: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.analyticsEvent.patch"'
          )
        ),
      remove: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.analyticsEvent.remove"'
          )
        ),
      update: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.analyticsEvent.update"'
          )
        ),
      upsert: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.analyticsEvent.upsert"'
          )
        ),
    }),
    clientInfo: Object.freeze({
      create: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.clientInfo.create"')
        ),
      find: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.clientInfo.find"')
        ),
      get: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.clientInfo.get"')
        ),
      patch: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.clientInfo.patch"')
        ),
      remove: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.clientInfo.remove"')
        ),
      update: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.clientInfo.update"')
        ),
      upsert: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.clientInfo.upsert"')
        ),
    }),
    distributedLock: Object.freeze({
      create: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.distributedLock.create"'
          )
        ),
      find: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.distributedLock.find"'
          )
        ),
      remove: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.distributedLock.remove"'
          )
        ),
    }),
    emailRecord: Object.freeze({
      create: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.emailRecord.create"')
        ),
      createMany: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.emailRecord.createMany"'
          )
        ),
      find: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.emailRecord.find"')
        ),
      patch: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.emailRecord.patch"')
        ),
      remove: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.emailRecord.remove"')
        ),
    }),
    feedbackRule: Object.freeze({
      create: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.feedbackRule.create"')
        ),
      find: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.feedbackRule.find"')
        ),
      patch: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.feedbackRule.patch"')
        ),
      remove: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.feedbackRule.remove"')
        ),
    }),
    fingerprint: Object.freeze({
      create: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.fingerprint.create"')
        ),
      find: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.fingerprint.find"')
        ),
      get: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.fingerprint.get"')
        ),
      patch: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.fingerprint.patch"')
        ),
      remove: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.fingerprint.remove"')
        ),
      update: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.fingerprint.update"')
        ),
      upsert: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.fingerprint.upsert"')
        ),
    }),
    gmailAddonExecutionState: Object.freeze({
      create: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.gmailAddonExecutionState.create"'
          )
        ),
      get: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.gmailAddonExecutionState.get"'
          )
        ),
      upsert: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.gmailAddonExecutionState.upsert"'
          )
        ),
    }),
    huntingSearchJob: Object.freeze({
      create: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.huntingSearchJob.create"'
          )
        ),
      find: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.huntingSearchJob.find"'
          )
        ),
      get: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.huntingSearchJob.get"'
          )
        ),
      patch: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.huntingSearchJob.patch"'
          )
        ),
      remove: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.huntingSearchJob.remove"'
          )
        ),
    }),
    huntingSearchJobResult: Object.freeze({
      create: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.huntingSearchJobResult.create"'
          )
        ),
      createMany: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.huntingSearchJobResult.createMany"'
          )
        ),
      find: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.huntingSearchJobResult.find"'
          )
        ),
      get: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.huntingSearchJobResult.get"'
          )
        ),
      patch: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.huntingSearchJobResult.patch"'
          )
        ),
      remove: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.huntingSearchJobResult.remove"'
          )
        ),
    }),
    incidentBeta: Object.freeze({
      aggregate: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.incidentBeta.aggregate"'
          )
        ),
      create: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.incidentBeta.create"')
        ),
      find: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.incidentBeta.find"')
        ),
      get: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.incidentBeta.get"')
        ),
      patch: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.incidentBeta.patch"')
        ),
      remove: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.incidentBeta.remove"')
        ),
      update: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.incidentBeta.update"')
        ),
      upsert: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.incidentBeta.upsert"')
        ),
    }),
    marker: Object.freeze({
      create: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.marker.create"')
        ),
      find: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.marker.find"')
        ),
      get: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "collection.marker.get"')),
      patch: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.marker.patch"')
        ),
      remove: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.marker.remove"')
        ),
      update: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.marker.update"')
        ),
      upsert: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.marker.upsert"')
        ),
    }),
    migrations: Object.freeze({
      create: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.migrations.create"')
        ),
      get: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.migrations.get"')
        ),
      patch: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.migrations.patch"')
        ),
    }),
    npsAnswer: Object.freeze({
      create: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.npsAnswer.create"')
        ),
      find: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.npsAnswer.find"')
        ),
    }),
    oneTimePassword: Object.freeze({
      create: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.oneTimePassword.create"'
          )
        ),
      find: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.oneTimePassword.find"'
          )
        ),
      remove: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.oneTimePassword.remove"'
          )
        ),
    }),
    organization: Object.freeze({
      addFeatureForOrganization: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.organization.addFeatureForOrganization"'
          )
        ),
      addGoogleClientId: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.organization.addGoogleClientId"'
          )
        ),
      create: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.organization.create"')
        ),
      find: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.organization.find"')
        ),
      get: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.organization.get"')
        ),
      getByDomain: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.organization.getByDomain"'
          )
        ),
      patch: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.organization.patch"')
        ),
      remove: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.organization.remove"')
        ),
      removeFeatureFromOrganization: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.organization.removeFeatureFromOrganization"'
          )
        ),
      removeGoogleClientId: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.organization.removeGoogleClientId"'
          )
        ),
    }),
    organizationOnboardingTask: Object.freeze({
      create: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.organizationOnboardingTask.create"'
          )
        ),
      find: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.organizationOnboardingTask.find"'
          )
        ),
      patch: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.organizationOnboardingTask.patch"'
          )
        ),
      remove: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.organizationOnboardingTask.remove"'
          )
        ),
    }),
    organizationTrainingRule: Object.freeze({
      find: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.organizationTrainingRule.find"'
          )
        ),
      get: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.organizationTrainingRule.get"'
          )
        ),
      remove: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.organizationTrainingRule.remove"'
          )
        ),
      upsert: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.organizationTrainingRule.upsert"'
          )
        ),
    }),
    plugin: Object.freeze({
      create: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.plugin.create"')
        ),
      find: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.plugin.find"')
        ),
      get: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "collection.plugin.get"')),
      patch: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.plugin.patch"')
        ),
      remove: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.plugin.remove"')
        ),
      update: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.plugin.update"')
        ),
      upsert: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.plugin.upsert"')
        ),
    }),
    quest: Object.freeze({
      aggregate: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.quest.aggregate"')
        ),
      create: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.quest.create"')
        ),
      find: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "collection.quest.find"')),
      get: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "collection.quest.get"')),
      patch: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.quest.patch"')
        ),
      remove: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.quest.remove"')
        ),
      update: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.quest.update"')
        ),
      upsert: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.quest.upsert"')
        ),
    }),
    questTemplate: Object.freeze({
      create: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.questTemplate.create"'
          )
        ),
      find: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.questTemplate.find"')
        ),
      get: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.questTemplate.get"')
        ),
      patch: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.questTemplate.patch"')
        ),
      remove: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.questTemplate.remove"'
          )
        ),
      update: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.questTemplate.update"'
          )
        ),
      upsert: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.questTemplate.upsert"'
          )
        ),
    }),
    quizModule: Object.freeze({
      create: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.quizModule.create"')
        ),
      find: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.quizModule.find"')
        ),
      get: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.quizModule.get"')
        ),
      patch: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.quizModule.patch"')
        ),
      remove: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.quizModule.remove"')
        ),
      update: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.quizModule.update"')
        ),
      upsert: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.quizModule.upsert"')
        ),
    }),
    quizTemplate: Object.freeze({
      create: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.quizTemplate.create"')
        ),
      find: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.quizTemplate.find"')
        ),
      get: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.quizTemplate.get"')
        ),
      patch: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.quizTemplate.patch"')
        ),
      remove: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.quizTemplate.remove"')
        ),
      update: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.quizTemplate.update"')
        ),
    }),
    rank: Object.freeze({
      find: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "collection.rank.find"')),
    }),
    refreshToken: Object.freeze({
      create: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.refreshToken.create"')
        ),
      find: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.refreshToken.find"')
        ),
      remove: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.refreshToken.remove"')
        ),
    }),
    tag: Object.freeze({
      find: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "collection.tag.find"')),
      findVectorTag: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.tag.findVectorTag"')
        ),
    }),
    task: Object.freeze({
      create: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.task.create"')
        ),
      createMany: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.task.createMany"')
        ),
      find: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "collection.task.find"')),
      get: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "collection.task.get"')),
      patch: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "collection.task.patch"')),
      remove: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.task.remove"')
        ),
      update: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.task.update"')
        ),
      upsert: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.task.upsert"')
        ),
    }),
    taskGroup: Object.freeze({
      create: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.taskGroup.create"')
        ),
      find: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.taskGroup.find"')
        ),
      get: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.taskGroup.get"')
        ),
      patch: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.taskGroup.patch"')
        ),
      remove: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.taskGroup.remove"')
        ),
      update: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.taskGroup.update"')
        ),
      upsert: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.taskGroup.upsert"')
        ),
    }),
    threat: Object.freeze({
      aggregate: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.threat.aggregate"')
        ),
      create: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.threat.create"')
        ),
      find: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.threat.find"')
        ),
      get: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "collection.threat.get"')),
      patch: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.threat.patch"')
        ),
      remove: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.threat.remove"')
        ),
      update: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.threat.update"')
        ),
      upsert: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.threat.upsert"')
        ),
    }),
    threatObservable: Object.freeze({
      create: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.threatObservable.create"'
          )
        ),
      find: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.threatObservable.find"'
          )
        ),
      get: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.threatObservable.get"'
          )
        ),
      patch: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.threatObservable.patch"'
          )
        ),
      remove: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.threatObservable.remove"'
          )
        ),
      update: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.threatObservable.update"'
          )
        ),
      upsert: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.threatObservable.upsert"'
          )
        ),
    }),
    threatResource: Object.freeze({
      find: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.threatResource.find"')
        ),
      upsert: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.threatResource.upsert"'
          )
        ),
    }),
    threatSimilarityGroup: Object.freeze({
      create: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.threatSimilarityGroup.create"'
          )
        ),
      find: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.threatSimilarityGroup.find"'
          )
        ),
      get: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.threatSimilarityGroup.get"'
          )
        ),
      patch: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.threatSimilarityGroup.patch"'
          )
        ),
      remove: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.threatSimilarityGroup.remove"'
          )
        ),
      upsert: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.threatSimilarityGroup.upsert"'
          )
        ),
    }),
    translation: Object.freeze({
      create: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.translation.create"')
        ),
      find: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.translation.find"')
        ),
      get: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.translation.get"')
        ),
      patch: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.translation.patch"')
        ),
      remove: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.translation.remove"')
        ),
      update: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.translation.update"')
        ),
      upsert: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.translation.upsert"')
        ),
    }),
    user: Object.freeze({
      addFeatureForUser: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.user.addFeatureForUser"'
          )
        ),
      aggregate: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.user.aggregate"')
        ),
      create: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.user.create"')
        ),
      distinct: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.user.distinct"')
        ),
      find: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "collection.user.find"')),
      findAdminsByOrganizationId: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.user.findAdminsByOrganizationId"'
          )
        ),
      findCoworkersByOrganizationId: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.user.findCoworkersByOrganizationId"'
          )
        ),
      get: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "collection.user.get"')),
      patch: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "collection.user.patch"')),
      remove: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.user.remove"')
        ),
      removeFeatureFromUser: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "collection.user.removeFeatureFromUser"'
          )
        ),
      update: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.user.update"')
        ),
      upsert: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.user.upsert"')
        ),
    }),
    userFeedback: Object.freeze({
      create: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.userFeedback.create"')
        ),
      find: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.userFeedback.find"')
        ),
      patch: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.userFeedback.patch"')
        ),
      remove: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.userFeedback.remove"')
        ),
    }),
    vector: Object.freeze({
      create: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.vector.create"')
        ),
      find: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.vector.find"')
        ),
      get: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "collection.vector.get"')),
      patch: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.vector.patch"')
        ),
      remove: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.vector.remove"')
        ),
      update: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.vector.update"')
        ),
      upsert: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "collection.vector.upsert"')
        ),
    }),
  }),
  data: Object.freeze({
    dash: Object.freeze({
      proxyDashRequests: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "data.dash.proxyDashRequests"')
        ),
    }),
  }),
  game: Object.freeze({
    challenge: Object.freeze({
      updateForUser: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "game.challenge.updateForUser"')
        ),
    }),
    cycle: Object.freeze({
      full: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "game.cycle.full"')),
      user: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "game.cycle.user"')),
    }),
    email: Object.freeze({
      inviteOrganizationsUnstartedUsers: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "game.email.inviteOrganizationsUnstartedUsers"'
          )
        ),
      sendActivationEmail: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "game.email.sendActivationEmail"')
        ),
      sendWelcomeEmail: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "game.email.sendWelcomeEmail"')
        ),
    }),
    engine: Object.freeze({
      createNewQuest: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "game.engine.createNewQuest"')
        ),
      getQuestBasedOnLatestTheme: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "game.engine.getQuestBasedOnLatestTheme"'
          )
        ),
      getTranslatedQuest: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "game.engine.getTranslatedQuest"')
        ),
    }),
    leaderboard: Object.freeze({
      getCountryLeaderboard: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "game.leaderboard.getCountryLeaderboard"'
          )
        ),
      getLeaderboard: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "game.leaderboard.getLeaderboard"'
          )
        ),
      getSimpleUserStarsLeaderboard: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "game.leaderboard.getSimpleUserStarsLeaderboard"'
          )
        ),
      getUserStarsLeaderboard: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "game.leaderboard.getUserStarsLeaderboard"'
          )
        ),
    }),
    organization: Object.freeze({
      scheduleReminderEmails: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "game.organization.scheduleReminderEmails"'
          )
        ),
      setDemoMode: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "game.organization.setDemoMode"')
        ),
      updateAchievementAggregates: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "game.organization.updateAchievementAggregates"'
          )
        ),
      updateCountryLeaderboardAggregates: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "game.organization.updateCountryLeaderboardAggregates"'
          )
        ),
      updateUserCountByCountryAggregates: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "game.organization.updateUserCountByCountryAggregates"'
          )
        ),
    }),
    quest: Object.freeze({
      deliver: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "game.quest.deliver"')),
      expire: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "game.quest.expire"')),
      expireAll: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "game.quest.expireAll"')),
      fail: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "game.quest.fail"')),
      getAttachment: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "game.quest.getAttachment"')
        ),
      getFailUrl: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "game.quest.getFailUrl"')),
      getResultUrl: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "game.quest.getResultUrl"')
        ),
      getSignedFailUrl: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "game.quest.getSignedFailUrl"')
        ),
      getSignedResultUrl: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "game.quest.getSignedResultUrl"')
        ),
      register: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "game.quest.register"')),
      report: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "game.quest.report"')),
      reportWithMessageId: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "game.quest.reportWithMessageId"')
        ),
      trackDelivery: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "game.quest.trackDelivery"')
        ),
    }),
    questTemplate: Object.freeze({
      checkCompilability: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "game.questTemplate.checkCompilability"'
          )
        ),
      compileQuestTemplatePreview: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "game.questTemplate.compileQuestTemplatePreview"'
          )
        ),
      compileQuestTemplateString: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "game.questTemplate.compileQuestTemplateString"'
          )
        ),
      compileQuestToVector: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "game.questTemplate.compileQuestToVector"'
          )
        ),
      generateFailureFunnel: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "game.questTemplate.generateFailureFunnel"'
          )
        ),
      getDifficultyFactors: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "game.questTemplate.getDifficultyFactors"'
          )
        ),
      getExampleContext: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "game.questTemplate.getExampleContext"'
          )
        ),
      updateStatistics: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "game.questTemplate.updateStatistics"'
          )
        ),
    }),
    quiz: Object.freeze({
      actOnPreview: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "game.quiz.actOnPreview"')
        ),
      actOnQuizObjective: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "game.quiz.actOnQuizObjective"')
        ),
      preview: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "game.quiz.preview"')),
      selectNextForUser: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "game.quiz.selectNextForUser"')
        ),
    }),
    result: Object.freeze({
      get: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "game.result.get"')),
      selectAndPatchSecondaryObjective: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "game.result.selectAndPatchSecondaryObjective"'
          )
        ),
    }),
    user: Object.freeze({
      claimAchievement: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "game.user.claimAchievement"')
        ),
      getChangedRewards: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "game.user.getChangedRewards"')
        ),
      imposeDeliveryCooldown: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "game.user.imposeDeliveryCooldown"'
          )
        ),
      legacyOnboardUser: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "game.user.legacyOnboardUser"')
        ),
      onboardUser: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "game.user.onboardUser"')),
      recalculateStats: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "game.user.recalculateStats"')
        ),
      resetUserGame: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "game.user.resetUserGame"')
        ),
      selfOnboard: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "game.user.selfOnboard"')),
      start: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "game.user.start"')),
      startGameForOrganizationsUnstartedUsers: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "game.user.startGameForOrganizationsUnstartedUsers"'
          )
        ),
      startGameForUsersWithAutomaticEnrollment: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "game.user.startGameForUsersWithAutomaticEnrollment"'
          )
        ),
      updateOnboardingEligibility: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "game.user.updateOnboardingEligibility"'
          )
        ),
      updatePlayerStats: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "game.user.updatePlayerStats"')
        ),
    }),
  }),
  infrastructure: Object.freeze({
    auth: Object.freeze({
      createToken: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "infrastructure.auth.createToken"'
          )
        ),
      getSigninData: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "infrastructure.auth.getSigninData"'
          )
        ),
      resolveApiUserFromToken: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "infrastructure.auth.resolveApiUserFromToken"'
          )
        ),
      revokeToken: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "infrastructure.auth.revokeToken"'
          )
        ),
      verifyTokenAgainstWhitelist: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "infrastructure.auth.verifyTokenAgainstWhitelist"'
          )
        ),
    }),
    database: Object.freeze({
      cleanup: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "infrastructure.database.cleanup"'
          )
        ),
      removePreUploadedThreats: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "infrastructure.database.removePreUploadedThreats"'
          )
        ),
    }),
    distributedLock: Object.freeze({
      acquireLock: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "infrastructure.distributedLock.acquireLock"'
          )
        ),
      releaseLock: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "infrastructure.distributedLock.releaseLock"'
          )
        ),
    }),
    dkim: Object.freeze({
      create: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "infrastructure.dkim.create"')
        ),
      getSigningKey: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "infrastructure.dkim.getSigningKey"'
          )
        ),
    }),
    health: Object.freeze({
      alive: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "infrastructure.health.alive"')
        ),
      ready: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "infrastructure.health.ready"')
        ),
    }),
    hoxHash: Object.freeze({
      compare: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "infrastructure.hoxHash.compare"')
        ),
      compareBatched: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "infrastructure.hoxHash.compareBatched"'
          )
        ),
      computeFuzzyHash: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "infrastructure.hoxHash.computeFuzzyHash"'
          )
        ),
    }),
    hoxUrl: Object.freeze({
      createShortLink: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "infrastructure.hoxUrl.createShortLink"'
          )
        ),
    }),
    htmlToImage: Object.freeze({
      createImageFromHtml: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "infrastructure.htmlToImage.createImageFromHtml"'
          )
        ),
    }),
    id: Object.freeze({
      generateHumanReadableId: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "infrastructure.id.generateHumanReadableId"'
          )
        ),
    }),
    jwt: Object.freeze({
      create: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "infrastructure.jwt.create"')
        ),
      decode: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "infrastructure.jwt.decode"')
        ),
      signUrlForCurrentUser: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "infrastructure.jwt.signUrlForCurrentUser"'
          )
        ),
      verify: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "infrastructure.jwt.verify"')
        ),
      verifySignedUrl: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "infrastructure.jwt.verifySignedUrl"'
          )
        ),
    }),
    logger: Object.freeze({
      log: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "infrastructure.logger.log"')
        ),
    }),
    migration: Object.freeze({
      backfillOnboardingEvents: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "infrastructure.migration.backfillOnboardingEvents"'
          )
        ),
      backfillQuestMarkerStars: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "infrastructure.migration.backfillQuestMarkerStars"'
          )
        ),
      backfillUserQuestMarkerStars: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "infrastructure.migration.backfillUserQuestMarkerStars"'
          )
        ),
      enrichPreviouslyFailedThreats: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "infrastructure.migration.enrichPreviouslyFailedThreats"'
          )
        ),
      splitHops: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "infrastructure.migration.splitHops"'
          )
        ),
      v175FixThreatHeaders: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "infrastructure.migration.v175FixThreatHeaders"'
          )
        ),
    }),
    profile: Object.freeze({
      capturePerformanceProfile: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "infrastructure.profile.capturePerformanceProfile"'
          )
        ),
    }),
  }),
  integration: Object.freeze({
    azure: Object.freeze({
      getResourceTemplate: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "integration.azure.getResourceTemplate"'
          )
        ),
      getResourceTemplateUrl: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "integration.azure.getResourceTemplateUrl"'
          )
        ),
    }),
    bitly: Object.freeze({
      getUrl: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "integration.bitly.getUrl"')
        ),
    }),
    cloudinary: Object.freeze({
      signUpload: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "integration.cloudinary.signUpload"'
          )
        ),
    }),
    dns: Object.freeze({
      lookup: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "integration.dns.lookup"')
        ),
      lookupMx: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "integration.dns.lookupMx"')
        ),
      validateSpf: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "integration.dns.validateSpf"')
        ),
    }),
    email: Object.freeze({
      build: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "integration.email.build"')
        ),
      deliver: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "integration.email.deliver"')
        ),
      imposeDeliveryLimit: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "integration.email.imposeDeliveryLimit"'
          )
        ),
      send: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "integration.email.send"')
        ),
      trackDelivery: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "integration.email.trackDelivery"'
          )
        ),
    }),
    gmail: Object.freeze({
      fetchEmailDeliveryAccessToken: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "integration.gmail.fetchEmailDeliveryAccessToken"'
          )
        ),
      getApiCredentials: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "integration.gmail.getApiCredentials"'
          )
        ),
      insertMessage: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "integration.gmail.insertMessage"'
          )
        ),
    }),
    googleCloudKms: Object.freeze({
      decryptAsymmetric: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "integration.googleCloudKms.decryptAsymmetric"'
          )
        ),
      getPublicKey: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "integration.googleCloudKms.getPublicKey"'
          )
        ),
    }),
    googleCloudStorage: Object.freeze({
      deleteFile: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "integration.googleCloudStorage.deleteFile"'
          )
        ),
      downloadFile: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "integration.googleCloudStorage.downloadFile"'
          )
        ),
      getSignedUrl: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "integration.googleCloudStorage.getSignedUrl"'
          )
        ),
      listFiles: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "integration.googleCloudStorage.listFiles"'
          )
        ),
      upload: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "integration.googleCloudStorage.upload"'
          )
        ),
    }),
    http: Object.freeze({
      request: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "integration.http.request"')
        ),
    }),
    virustotalAugment: Object.freeze({
      fetchEphemeralUrl: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "integration.virustotalAugment.fetchEphemeralUrl"'
          )
        ),
    }),
    zendesk: Object.freeze({
      createToken: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "integration.zendesk.createToken"'
          )
        ),
      redirect: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "integration.zendesk.redirect"')
        ),
    }),
  }),
  internal: Object.freeze({
    diagnostics: Object.freeze({
      debugEngineHeuristics: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "internal.diagnostics.debugEngineHeuristics"'
          )
        ),
    }),
    experiments: Object.freeze({
      initOrGetUserSplitTestCase: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "internal.experiments.initOrGetUserSplitTestCase"'
          )
        ),
    }),
    features: Object.freeze({
      hasFeature: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "internal.features.hasFeature"')
        ),
      hasFeatures: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "internal.features.hasFeatures"')
        ),
      trackOrganizationFeatures: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "internal.features.trackOrganizationFeatures"'
          )
        ),
    }),
  }),
  intl: Object.freeze({
    translations: Object.freeze({
      getAll: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "intl.translations.getAll"')
        ),
      getCdnTranslations: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "intl.translations.getCdnTranslations"'
          )
        ),
      getDatabaseSourceMessages: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "intl.translations.getDatabaseSourceMessages"'
          )
        ),
      getStaticSourceMessages: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "intl.translations.getStaticSourceMessages"'
          )
        ),
      syncTranslations: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "intl.translations.syncTranslations"'
          )
        ),
      uploadDynamicTranslations: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "intl.translations.uploadDynamicTranslations"'
          )
        ),
    }),
  }),
  legacy: Object.freeze({
    fingerprintUser: Object.freeze({
      update: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "legacy.fingerprintUser.update"')
        ),
    }),
    importUsers: Object.freeze({
      create: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "legacy.importUsers.create"')
        ),
    }),
    markerFactory: Object.freeze({
      create: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "legacy.markerFactory.create"')
        ),
      remove: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "legacy.markerFactory.remove"')
        ),
      update: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "legacy.markerFactory.update"')
        ),
    }),
    questMarkerReview: Object.freeze({
      create: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "legacy.questMarkerReview.create"'
          )
        ),
    }),
    sendQuestToOrganization: Object.freeze({
      create: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "legacy.sendQuestToOrganization.create"'
          )
        ),
    }),
    sendQuestToUser: Object.freeze({
      create: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "legacy.sendQuestToUser.create"')
        ),
    }),
    threatObservableTask: Object.freeze({
      create: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "legacy.threatObservableTask.create"'
          )
        ),
      update: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "legacy.threatObservableTask.update"'
          )
        ),
      upsert: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "legacy.threatObservableTask.upsert"'
          )
        ),
    }),
    userTagCreator: Object.freeze({
      create: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "legacy.userTagCreator.create"')
        ),
    }),
  }),
  organization: Object.freeze({
    domain: Object.freeze({
      update: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "organization.domain.update"')
        ),
    }),
    quiz: Object.freeze({
      getModules: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "organization.quiz.getModules"')
        ),
      syncOrgModuleState: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "organization.quiz.syncOrgModuleState"'
          )
        ),
      upsertModule: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "organization.quiz.upsertModule"')
        ),
      upsertModuleTemplate: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "organization.quiz.upsertModuleTemplate"'
          )
        ),
    }),
  }),
  plugin: Object.freeze({
    action: Object.freeze({
      click: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "plugin.action.click"')),
      handleAction: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "plugin.action.handleAction"')
        ),
      reportQuest: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "plugin.action.reportQuest"')
        ),
      start: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "plugin.action.start"')),
      startGame: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "plugin.action.startGame"')
        ),
      upload: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "plugin.action.upload"')),
    }),
    response: Object.freeze({
      unknownUser: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "plugin.response.unknownUser"')
        ),
    }),
  }),
  questTemplate: Object.freeze({
    benchmark: Object.freeze({
      findTemplates: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "questTemplate.benchmark.findTemplates"'
          )
        ),
    }),
    search: Object.freeze({
      findQuestTemplatesBySearchString: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "questTemplate.search.findQuestTemplatesBySearchString"'
          )
        ),
    }),
  }),
  security: Object.freeze({
    validation: Object.freeze({
      sanitizeHtml: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "security.validation.sanitizeHtml"'
          )
        ),
    }),
  }),
  templating: Object.freeze({
    handlebars: Object.freeze({
      compileTemplate: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "templating.handlebars.compileTemplate"'
          )
        ),
      parseTemplate: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "templating.handlebars.parseTemplate"'
          )
        ),
    }),
  }),
  threat: Object.freeze({
    analysis: Object.freeze({
      assign: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "threat.analysis.assign"')
        ),
      calculateStatistics: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "threat.analysis.calculateStatistics"'
          )
        ),
      calculateTrendHistogram: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "threat.analysis.calculateTrendHistogram"'
          )
        ),
      callMlModelWithThreat: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "threat.analysis.callMlModelWithThreat"'
          )
        ),
      getPrioritisedListOfAnalysableThreats: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "threat.analysis.getPrioritisedListOfAnalysableThreats"'
          )
        ),
      rateSimilarityGroup: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "threat.analysis.rateSimilarityGroup"'
          )
        ),
      rateThreat: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "threat.analysis.rateThreat"')
        ),
    }),
    cortex: Object.freeze({
      analyze: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "threat.cortex.analyze"')),
      getAnalyzers: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "threat.cortex.getAnalyzers"')
        ),
      getJobReport: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "threat.cortex.getJobReport"')
        ),
    }),
    feedback: Object.freeze({
      sendFeedbackToUser: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "threat.feedback.sendFeedbackToUser"'
          )
        ),
      startBatchedThreatFeedback: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "threat.feedback.startBatchedThreatFeedback"'
          )
        ),
    }),
    hunting: Object.freeze({
      deleteEmail: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "threat.hunting.deleteEmail"')
        ),
      getSearchResults: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "threat.hunting.getSearchResults"'
          )
        ),
      initializeSettings: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "threat.hunting.initializeSettings"'
          )
        ),
      revertEmailDeletion: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "threat.hunting.revertEmailDeletion"'
          )
        ),
      startSearch: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "threat.hunting.startSearch"')
        ),
      timeoutOldHuntingSearchJobs: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "threat.hunting.timeoutOldHuntingSearchJobs"'
          )
        ),
    }),
    pipeline: Object.freeze({
      assignSimilarityGroup: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "threat.pipeline.assignSimilarityGroup"'
          )
        ),
      enrichThreat: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "threat.pipeline.enrichThreat"')
        ),
      escalate: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "threat.pipeline.escalate"')
        ),
      rateAutomatically: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "threat.pipeline.rateAutomatically"'
          )
        ),
      runPipelineForThreats: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "threat.pipeline.runPipelineForThreats"'
          )
        ),
      updateIncidents: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "threat.pipeline.updateIncidents"'
          )
        ),
    }),
    rules: Object.freeze({
      evaluateExpression: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "threat.rules.evaluateExpression"'
          )
        ),
    }),
    search: Object.freeze({
      findIncidentsBySearchString: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "threat.search.findIncidentsBySearchString"'
          )
        ),
      findThreatsBySearchString: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "threat.search.findThreatsBySearchString"'
          )
        ),
    }),
  }),
  user: Object.freeze({
    adminAction: Object.freeze({
      sendQuest: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "user.adminAction.sendQuest"')
        ),
    }),
    bulk: Object.freeze({
      sendQuest: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "user.bulk.sendQuest"')),
    }),
    bulkAction: Object.freeze({
      fanOut: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "user.bulkAction.fanOut"')
        ),
    }),
    email: Object.freeze({
      inviteUser: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "user.email.inviteUser"')),
    }),
    enrichment: Object.freeze({
      addGeolocation: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "user.enrichment.addGeolocation"')
        ),
      persistEvents: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "user.enrichment.persistEvents"')
        ),
      persistEventsAndRecalculateRewards: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "user.enrichment.persistEventsAndRecalculateRewards"'
          )
        ),
    }),
    nps: Object.freeze({
      create: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "user.nps.create"')),
      shouldAskNpsSurvey: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "user.nps.shouldAskNpsSurvey"')
        ),
    }),
    roles: Object.freeze({
      addRole: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "user.roles.addRole"')),
      removeRoles: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "user.roles.removeRoles"')
        ),
      setRole: sinon
        .stub()
        .rejects(new Error('unexpected handler call: "user.roles.setRole"')),
    }),
    search: Object.freeze({
      findUsersBySearchString: sinon
        .stub()
        .rejects(
          new Error(
            'unexpected handler call: "user.search.findUsersBySearchString"'
          )
        ),
    }),
    softDelete: Object.freeze({
      deactivateUser: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "user.softDelete.deactivateUser"')
        ),
      reactivateUser: sinon
        .stub()
        .rejects(
          new Error('unexpected handler call: "user.softDelete.reactivateUser"')
        ),
    }),
  }),
});
