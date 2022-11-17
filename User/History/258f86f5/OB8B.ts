import App from './app';
export declare const app: App<{
  isProduction: boolean;
  isDevelopment: boolean;
  paths: {
    root: string;
    private: string;
    public: string;
  };
  emailDelivery: {
    connectionOptions: string;
    appEmailSender: string;
    welcomeEmailSender: string;
    sshTunnel:
      | import('../lib/ssh-tunnel/parseSshConnectionString').ISshConf
      | {
          privateKey: any;
          username?: string;
          password?: string;
          host: string;
          port: number;
        };
    defaultReturnPath: string;
    tls: {
      certPath: string;
      keyPath: string;
    };
  };
  taskQueue: {
    defaultTimeout: number;
    pools: {
      default: {
        scheduleCount: number;
        executeCount: number;
      };
      training: {
        scheduleCount: number;
        executeCount: number;
      };
    };
    concurrencyLimit: number;
    listeningTaskPools: string;
  };
  hoxUrl: {
    url: string;
    username: string;
    password: string;
  };
  hoxHash: {
    enabled: boolean;
    baseUrl: string;
    compareBatchedBatchSize: number;
  };
  hoxSnap: {
    enabled: boolean;
    baseUrl: string;
  };
  infraApi: {
    address: string;
    enabled: boolean;
    tlsCredentialsDir: string;
    jwtTokenSignSecret: string;
    jwtValidityMinutes: number;
    localDummyKey: any;
  };
  cloudinary: {
    secret: string;
  };
  bitly: {
    token: string;
  };
  tasks: {
    isTaskProcessingEnabled: boolean;
    isSchedulerEnabled: boolean;
    schedules: {
      gameCycle: string;
      expireQuests: string;
      threatFeedback: string;
      databaseCleanup: string;
      userEnrichment: string;
      threatObservableAnalysis: string;
      organizationWeeklySummaryDelivery: string;
      questTemplateStatisticsUpdate: string;
      runPipelineForThreats: string;
      enrichPreviouslyFailed: string;
      uploadTranslations: string;
      automaticEnrollment: string;
      timeoutOldHuntingSearchJobs: string;
    };
  };
  twilio: {
    baseUrl: string;
    accountSid: string;
    authToken: string;
  };
  appUrl: string;
  version: string;
  environment: string;
  mongo: {
    defaultDbUrl: string;
    taskSystemDbUrl: string;
    analyticsEventsDbUrl: string;
    runMigrations: boolean;
  };
  i18nUrl: string;
  i18nCacheTimeMillis: number;
  sentryUrl: string;
  sentryPublicUrl: string;
  sentyDomain: string;
  hoxhuntApiUrl: string;
  apiTokenSigningSecret: string;
  cortexApiKey: string;
  cortexBaseUrl: string;
  googleCloudStorageBucket: string;
  gcs: {
    bucket: string;
  };
  analyticsStorageBucket: string;
  questTemplateImagesStorageBucket: string;
  cdnUrl: string;
  corsAllowedHostGlobs: string;
  corsMaxAgeInSeconds: number;
  httpRedirectAllowedHostGlobs: string;
  logLevel: string;
  migrationVersion: string;
  prometheusPort: number;
  zendesk: {
    jwtSecret: string;
    baseUrl: string;
  };
  automaticThreatAnalysisEnabled: boolean;
  threatObservableAnalyzerBatchSize: number;
  firstQuestDeliveryRetryCount: number;
  firstQuestDeliveryRetryDelay: number;
  googleStorageConfig: {
    projectId: string;
  };
  analytics: {
    pubsub: {
      enabled: boolean;
      project: string;
      topic: string;
    };
    cubes: {
      enabled: boolean;
      project: string;
      dataset: string;
    };
    failureMode: import('../domains/analytics/ingest/lib/schema').EAnalyticsFailureMode;
  };
  hoxAuth: {
    jwtSigningSecret: string;
    refreshTokenExpiryDays: number;
    accessTokenExpiryMinutes: number;
  };
  threatEnrichmentVersion: string;
  gameAppUrl: string;
  otp: {
    magicLinkLoginUrlValidityInMinutes: number;
    successUrlValidityInMinutes: number;
    signingSecret: string;
  };
  scim: {
    scimSigningSecret: string;
  };
  frontendUrls: {
    importantToReportArticleUrl: string;
    introductionToHoxhuntUrl: string;
  };
  googleTasksConfig: {
    queue: string;
    jwtSecret: string;
    jwtValidityInMinutes: number;
    submissionBatchSize: number;
    project: string;
    region: string;
  };
  contextTelemetrySetup: import('../../monorepo/packages/lib/telemetry_shared/models').ETelemetrySetup;
  dashReverseProxy: {
    host: string;
    port: number;
  };
  quizCompiler: {
    responseUrl: string;
    adaptiveCardOriginatorToken: string;
    imageBaseUrl: string;
  };
  quizSenderEmailAddress: string;
  github: {
    clientInfo: {
      userAgent: string;
      authToken: string;
      baseUrl: string;
    };
    repos: {
      translations: {
        owner: string;
        name: string;
      };
    };
  };
  performanceProfiler: {
    maximumDurationSeconds: number;
  };
  huntingSearchAndDestroy: {
    searchAndDestroyPrivateKeyPath: string;
    apimJwtPublicKeyCertificatePfxPath: string;
    searchAndDestroyPublicKeyCertificatePath: string;
  };
  responseAppUrl: string;
  iocMlModelUrl: string;
  adminAppUrl: string;
  playwright: {
    chromeBrowserPath: string;
  };
  authAppUrl: string;
  isAppTest: boolean;
  isTest: boolean;
}>;
