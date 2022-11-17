import base64 from 'base-64';
import path from 'path';
import R from 'ramda';

import { ETelemetrySetup } from '@hox/telemetry-shared/models';
import { parseTelemetrySetup } from '@hox/telemetry-shared/setup';

import { parseClickhouseConfig } from '@server/domains/analytics/cubes/lib/clickhouse';
import { EAnalyticsFailureMode } from '@server/domains/analytics/ingest/lib/schema';
import parseSshConnectionString from '@server/lib/ssh-tunnel/parseSshConnectionString';
import { ITestEnv, loadDevEnv, shouldLoadDevEnv } from '@server/startup/devEnv';
import { absoluteUrl } from '@server/util/absoluteUrl';

import { validateEnv } from './validateEnv';

const getPackageRootPath = () => {
  const root = process.env.PACKAGE_ROOT_DIR || process.cwd();

  return path.isAbsolute(root) ? root : path.join(process.cwd(), root);
};

const paths = {
  root: getPackageRootPath(),
  private: path.join(getPackageRootPath(), 'private'),
  public: path.join(getPackageRootPath(), 'public'),
};

const testEnv = R.pipe(
  (metadataStr: string) => JSON.parse(metadataStr || '{}'),
  ({ isAppTest, isTest }) => ({ isAppTest: !!isAppTest, isTest: !!isTest })
)(process.env.TEST_METADATA);

if (shouldLoadDevEnv(testEnv)) {
  // Do this before any other env vars are read if we're not running tests
  loadDevEnv(path.join(paths.private, '.env'));
}

validateEnv(['ROOT_URL', 'MONGO_URL'])(process.env);

const DEFAULT_SERVER_TLS_ROOT_DIR = '/var/run/hox/secrets/tls';

const parseBoolean = (maybeTrue: boolean | string | number) =>
  [true, 'true', '1', 1].includes(maybeTrue);

const parseNumber = (maybeNumber: string) => {
  const num = parseInt(maybeNumber, 10);
  return isNaN(num) ? undefined : num;
};

const ensureSuperAdminEnabledInTestsByDefault = (
  testEnv: ITestEnv,
  superAdminAccessEnabled: boolean
): boolean => {
  // The `testEnv.isTest || testEnv.isAppTest` check is used to always enable super admin for tests
  // Currently there are ~30 tests that have a hidden, hard to configure per test, assumption
  // on the global appConfig settings. This explicitly enables the env for all tests to provide
  // to make all roles available unless it has explicitly been set disabled in env.
  if (
    (testEnv.isTest || testEnv.isAppTest) &&
    process.env.ENABLE_SUPER_ADMIN_ACCESS === undefined
  ) {
    return true;
  }
  return superAdminAccessEnabled;
};

const parseAnalyticsFailureMode = (
  mode: string,
  defaultMode = EAnalyticsFailureMode.ERROR
): EAnalyticsFailureMode => {
  if (!mode) {
    return defaultMode;
  }
  const raw = mode.toLowerCase();
  return (
    Object.values(EAnalyticsFailureMode).find(known => known === raw) ||
    defaultMode
  );
};

export const trimTrailingSlash = (urlString: string) =>
  urlString && urlString.endsWith('/') ? urlString.slice(0, -1) : urlString;

const fromMinutesToMilliSeconds = (minuteCount: string) =>
  Number(minuteCount) * 60 * 1000;

export const getSshTunnelConfig = (
  sshConnectionString: string,
  sshClientPrivateKey: string
) => {
  if (!sshConnectionString) {
    return;
  }

  const tunnelConfig = parseSshConnectionString(sshConnectionString);

  if (!sshClientPrivateKey) {
    return tunnelConfig;
  }

  return {
    ...tunnelConfig,
    privateKey: base64.decode(sshClientPrivateKey),
  };
};

const emailDelivery = {
  connectionOptions: process.env.MAIL_URL ? process.env.MAIL_URL : '',
  appEmailSender: 'Hoxhunt <robot@hoxhunt.com>',
  welcomeEmailSender: 'Hoxhunt <welcome@hoxhunt.com>',
  sshTunnel: getSshTunnelConfig(
    process.env.MAIL_SSH_TUNNEL,
    process.env.MAIL_SSH_TUNNEL_PRIVATE_KEY
  ),
  defaultReturnPath: process.env.DEFAULT_EMAIL_RETURN_PATH
    ? process.env.DEFAULT_EMAIL_RETURN_PATH
    : 'bounces@hoxhunt.com',
  tls: {
    certPath: process.env.EMAIL_CLIENT_TLS_CERT_PATH,
    keyPath: process.env.EMAIL_CLIENT_TLS_KEY_PATH,
  },
};

const hoxUrl = {
  url: process.env.HOXURL_URL,
  username: process.env.HOXURL_USER,
  password: process.env.HOXURL_PASSWORD,
};

const hoxHash = {
  enabled: parseBoolean(process.env.HOXHASH_ENABLED),
  baseUrl: process.env.HOXHASH_BASE_URL,
  compareBatchedBatchSize:
    parseNumber(process.env.HOXHASH_COMPARE_BATCHED_BATCH_SIZE) || 500,
};

const hoxSnap = {
  enabled: parseBoolean(process.env.HOXSNAP_ENABLED),
  baseUrl: process.env.HOXSNAP_BASE_URL,
};

const cloudinary = {
  secret: process.env.CLOUDINARY_SECRET,
};

const bitly = {
  token: process.env.BITLY_API_TOKEN,
};

const infraApi = {
  address: process.env.INFRA_API_ADDRESS,
  enabled: !!process.env.INFRA_API_ADDRESS,
  tlsCredentialsDir:
    process.env.SERVER_TLS_ROOT_DIR || DEFAULT_SERVER_TLS_ROOT_DIR,
  jwtTokenSignSecret: process.env.INFRA_API_JWT_SIGNING_SECRET,
  jwtValidityMinutes: parseNumber(
    process.env.INFRA_API_JWT_VALIDITY_MINUTES || '15'
  ),
  localDummyKey: process.env.INFRA_API_DKIM_LOCAL_DUMMY_KEY
    ? base64.decode(process.env.INFRA_API_DKIM_LOCAL_DUMMY_KEY)
    : '',
};

const schedules = {
  gameCycle: process.env.TASK_SCHEDULE_GAME_CYCLE,
  expireQuests: process.env.TASK_SCHEDULE_EXPIRE_QUESTS,
  threatFeedback: process.env.TASK_SCHEDULE_THREAT_FEEDBACK,
  databaseCleanup: process.env.TASK_SCHEDULE_DATABASE_CLEANUP,
  threatObservableAnalysis:
    process.env.TASK_SCHEDULE_THREAT_OBSERVABLE_ANALYSIS,
  questTemplateStatisticsUpdate:
    process.env.TASK_SCHEDULE_QUEST_TEMPLATE_STATISTICS_UPDATE,
  runPipelineForThreats: process.env.TASK_SCHEDULE_RUN_THREAT_PIPELINE,
  enrichPreviouslyFailed: process.env.TASK_SCHEDULE_ENRICH_PREVIOUSLY_FAILED,
  uploadTranslations: process.env.TASK_SCHEDULE_UPLOAD_TRANSLATIONS,
  automaticEnrollment: process.env.TASK_SCHEDULE_AUTOMATICALLY_ENROLL_USERS,
  timeoutOldHuntingSearchJobs:
    process.env.TASK_SCHEDULE_TIMEOUT_OLD_HUNTING_SEARCH_JOBS,
  updateAchievementAggregates:
    process.env.TASK_SCHEDULE_UPDATE_ORGANIZATION_AGGREGATES,
  updateCountryLeaderboardAggregates:
    process.env.TASK_SCHEDULE_UPDATE_COUNTRY_LEADERBOARD_AGGREGATES,
  updateUserCountByCountryAggregates:
    process.env.TASK_SCHEDULE_UPDATE_USER_COUNT_BY_COUNTRY_AGGREGATES,
  scheduleReminderEmails: process.env.TASK_SCHEDULE_SCHEDULE_REMINDER_EMAILS,
  removePreUploadedThreats:
    process.env.TASK_SCHEDULE_REMOVE_PRE_UPLOADED_THREATS,
  backfillQuestMarkerStars:
    process.env.TASK_SCHEDULE_BACKFILL_QUEST_MARKER_STARS,
  backfillOnboardingEvents:
    process.env.TASK_SCHEDULE_BACKFILL_ONBOARDING_EVENTS,
  trackOrganizionFeatures: process.env.TASK_SCHEDULE_ORGANIZATION_FEATURE_DUMP,
  threatSplitHops: process.env.TASK_SCHEDULE_THREAT_SPLIT_HOPS || '0 0 0 1 1 0',
};

const tasks = {
  isTaskProcessingEnabled: process.env.SKIP_TASK_PROCESSING !== 'true',
  isSchedulerEnabled: process.env.SKIP_TASK_SCHEDULING !== 'true',
  schedules,
};

const DEFAULT_POOL_SIZE = 10;

const taskQueueDefaultPoolScheduleCount =
  parseNumber(process.env.TASK_QUEUE_DEFAULT_POOL_SCHEDULE_COUNT) ||
  DEFAULT_POOL_SIZE;
const taskQueueDefaultPoolExecuteCount =
  parseNumber(process.env.TASK_QUEUE_DEFAULT_POOL_EXECUTE_COUNT) ||
  taskQueueDefaultPoolScheduleCount;

const taskQueueTrainingPoolScheduleCount =
  parseNumber(process.env.TASK_QUEUE_TRAINING_POOL_SCHEDULE_COUNT) ||
  DEFAULT_POOL_SIZE;
const taskQueueTrainingPoolExecuteCount =
  parseNumber(process.env.TASK_QUEUE_TRAINING_POOL_EXECUTE_COUNT) ||
  taskQueueTrainingPoolScheduleCount;

const taskQueueResponsePoolScheduleCount =
  parseNumber(process.env.TASK_QUEUE_THREAT_PROCESSING_POOL_SCHEDULE_COUNT) ||
  DEFAULT_POOL_SIZE;
const taskQueueResponsePoolExecuteCount =
  parseNumber(process.env.TASK_QUEUE_THREAT_PROCESSING_POOL_EXECUTE_COUNT) ||
  taskQueueTrainingPoolScheduleCount;

const taskQueue = {
  defaultTimeout: fromMinutesToMilliSeconds(
    process.env.TASK_QUEUE_DEFAULT_TIMEOUT_IN_MINUTES
  ),
  pools: {
    default: {
      scheduleCount: taskQueueDefaultPoolScheduleCount,
      executeCount: taskQueueDefaultPoolExecuteCount,
    },
    training: {
      scheduleCount: taskQueueTrainingPoolScheduleCount,
      executeCount: taskQueueTrainingPoolExecuteCount,
    },
    response: {
      scheduleCount: taskQueueResponsePoolScheduleCount,
      executeCount: taskQueueResponsePoolExecuteCount,
    },
  },
  concurrencyLimit: parseNumber(process.env.TASK_QUEUE_CONCURRENCY_LIMIT),
  listeningTaskPools: process.env.LISTENING_TASK_POOLS,
};

const zendesk = {
  jwtSecret: process.env.ZENDESK_JWT_SECRET,
  baseUrl: process.env.ZENDESK_BASE_URL,
};

const googleCloudConfig = {
  project: process.env.GOOGLE_CLOUD_PROJECT,
  region: process.env.GOOGLE_CLOUD_REGION,
};

const googleKmsConfig = {
  project: googleCloudConfig.project,
  region: process.env.GOOGLE_CLOUD_KMS_REGION,
};

const vtKeyConfig = {
  keyId: process.env.VIRUSTOTAL_KMS_ENCRYPTION_KEY_ID,
  keyRingId: process.env.CUSTOMER_PROVIDED_SECRETS_KEY_RING_ID,
  versionId: '1',
};

const gmailApiDelivery = {
  credentialsPath: process.env.GOOGLE_GMAIL_API_CREDENTIALS,
  requiredScopes: 'https://www.googleapis.com/auth/gmail.insert', // Comma separated list
};

// Comma separated lists of client_ids that should be allowed to authenticate to hoxapp with their aud claim
const googleClientIds = {
  gmailAddon: (process.env.HOXPLUGIN_GMAIL_CLIENT_IDS || '').split(','),
};

const otp = {
  magicLinkLoginUrlValidityInMinutes: parseNumber(
    process.env.OTP_MAGIC_LINK_LOGIN_URL_VALIDITY_IN_MINUTES
  ),
  successUrlValidityInMinutes: parseNumber(
    process.env.OTP_SUCCESS_URL_VALIDITY_IN_MINUTES
  ),
  signingSecret: process.env.OTP_SIGNING_SECRET,
};

const hoxAuth = {
  jwtSigningSecret: process.env.JWT_AUTH_TOKEN_SIGNING_SECRET,

  refreshTokenExpiryDays: parseNumber(
    process.env.REFRESH_TOKEN_EXPIRY_DAYS || '7'
  ),
  weakRefreshTokenExpiryMinutes: parseNumber(
    process.env.WEAK_REFRESH_TOKEN_EXPIRY_MINUTES || '30'
  ),
  accessTokenExpiryMinutes: parseNumber(
    process.env.ACCESS_TOKEN_EXPIRY_MINUTES || '15'
  ),
};

const scim = {
  scimSigningSecret: process.env.SCIM_SIGNING_SECRET,
};

const dashReverseProxy = {
  host: process.env.DASH_HOST,
  port: parseNumber(process.env.DASH_PORT),
  timeoutMs: 60000,
};

const frontendUrls = {
  importantToReportArticleUrl:
    process.env.IMPORTANT_TO_REPORT_ARTICLE_URL ||
    'https://support.hoxhunt.com/hc/en-us/articles/360024915312',
  introductionToHoxhuntUrl:
    process.env.INTRODUCTION_TO_HOXHUNT_URL ||
    'https://support.hoxhunt.com/hc/en-us/articles/360020320112-Introduction-to-Hoxhunt',
};

const gcs = {
  bucket: process.env.INTERNAL_STORAGE_BUCKET,
};

const github = {
  clientInfo: {
    userAgent: 'HoxApp',
    authToken: process.env.GITHUB_ACCESS_TOKEN,
    baseUrl: 'https://api.github.com',
  },
  repos: {
    translations: {
      owner: 'hoxhunt',
      name: process.env.GITHUB_TRANSLATIONS_REPO_NAME,
    },
  },
};

const performanceProfiler = {
  maximumDurationSeconds:
    parseNumber(process.env.PERFORMANCE_PROFILER_MAXIMUM_DURATION_SECONDS) ||
    600,
};

const huntingSearchAndDestroy = {
  searchAndDestroyPrivateKeyPath: process.env.CLIENT_AUTH_TLS_KEY_PATH,
  apimJwtPublicKeyCertificatePfxPath: process.env.CLIENT_AUTH_TLS_CERT_PFX_PATH,
  searchAndDestroyPublicKeyCertificatePath:
    process.env.CLIENT_AUTH_TLS_CERT_PATH,
};

const playwright = {
  chromeBrowserPath: process.env.PLAYWRIGHT_CHROME_BROWSER_PATH,
};

const clickhouseDatabase =
  process.env.CLICKHOUSE_ANALYTICS_CUBES_DB_NAME || 'analytics_cubes_beta';

const auth = {
  enableSuperAdminAccess: ensureSuperAdminEnabledInTestsByDefault(
    testEnv,
    parseBoolean(process.env.ENABLE_SUPER_ADMIN_ACCESS)
  ),
  enableAuthZDebug: parseBoolean(process.env.ENABLE_AUTH_Z_DEBUG),
};

const shutdown = {
  // Time to wait, after shutting down HTTP sockets, before starting tear down.
  // Must be less than terminationGracePeriodSeconds defined in Kubernetes manifest
  // so that there is enough time for the app to run the tear down itself after the wait.
  gracePeriodHttpSeconds: 15,
};

export const appConfig = {
  ...testEnv,
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV !== 'production',
  auth,
  paths,
  emailDelivery,
  gmailApiDelivery,
  plugins: {
    googleClientIds,
  },
  taskQueue,
  hoxUrl,
  hoxHash,
  hoxSnap,
  infraApi,
  cloudinary,
  bitly,
  tasks,
  appUrl: trimTrailingSlash(process.env.ROOT_URL || absoluteUrl()),
  version: process.env.VERSION,
  environment: process.env.NODE_ENV,
  mongo: {
    defaultDbUrl: process.env.MONGO_URL,
    taskSystemDbUrl: process.env.TASK_SYSTEM_MONGO_URL || process.env.MONGO_URL,
    analyticsEventsDbUrl:
      process.env.ANALYTICS_EVENTS_MONGO_URL || process.env.MONGO_URL,
    gmailAddonDbUrl: process.env.GMAIL_ADDON_MONGO_URL || process.env.MONGO_URL,
    runMigrations: parseBoolean(
      process.env.MIGRATE_MONGO_DBS || testEnv.isAppTest || testEnv.isTest
        ? 'false'
        : 'true'
    ),
  },
  i18nUrl: process.env.I18N_CDN_URL,
  i18nCacheTimeMillis: parseNumber(process.env.I18N_CDN_MAX_AGE_MILLIS) || 0, // 0 means no cache
  sentryUrl: process.env.SENTRY_URL,
  sentryPublicUrl: process.env.SENTRY_PUBLIC_URL,
  sentyDomain: process.env.SENTRY_DOMAIN || 'https://sentry.io',
  hoxhuntApiUrl: process.env.HOXHUNT_API_URL || absoluteUrl(''),
  apiTokenSigningSecret: process.env.API_TOKEN_SIGNING_SECRET,
  cortexApiKey: process.env.CORTEX_API_KEY,
  cortexBaseUrl: process.env.CORTEX_BASE_URL,
  googleCloudStorageBucket: process.env.GOOGLE_CLOUDSTORAGE_BUCKET,
  csvTemporaryStorageBucket:
    process.env.ADMIN_CSV_EXPORT_TEMPORARY_STORAGE_BUCKET,
  gcs,
  cdnUrl: process.env.CDN_URL || '',
  corsAllowedHostGlobs: process.env.CORS_ALLOWED_HOST_GLOBS,
  corsMaxAgeInSeconds: parseNumber(process.env.CORS_MAX_AGE_IN_SECONDS) || 0,
  httpRedirectAllowedHostGlobs: process.env.HTTP_REDIRECT_ALLOWED_HOST_GLOBS,
  logLevel: process.env.LOG_LEVEL,
  migrationVersion: process.env.MIGRATE_MONGO_TO_VERSION || 'latest',
  prometheusPort: parseNumber(process.env.PROMETHEUS_PORT || '9100'),
  zendesk,
  automaticThreatAnalysisEnabled: parseBoolean(
    process.env.AUTOMATIC_THREAT_ANALYSIS_ENABLED
  ),
  threatObservableAnalyzerBatchSize: parseNumber(
    process.env.THREAT_OBSERVABLE_ANALYSIS_BATCH_SIZE || '60'
  ),
  firstQuestDeliveryRetryCount: parseNumber(
    process.env.FIRST_QUEST_DELIVERY_RETRY_COUNT || '3' // default to 3 retries
  ),
  firstQuestDeliveryRetryDelay: parseNumber(
    process.env.FIRST_QUEST_DELIVERY_RETRY_DELAY || '100' // default to ~100ms delay between each attempt
  ),
  googleStorageConfig: {
    projectId: 'hoxhunt',
  },
  // use as a wowrkaroud for Google's getSignedUrl being slow and timing out with GKE https://github.com/hoxhunt/hox/issues/14504
  workloadIdentityWorkaroundGoogleApplicationCredentials:
    process.env.HOX_WORKLOAD_IDENTITY_WORKAROUND_GOOGLE_APPLICATION_CREDENTIALS,
  analytics: {
    pubsub: {
      enabled: !!process.env.GOOGLE_PUBSUB_TOPIC_ANALYTICS_INGEST,
      project: googleCloudConfig.project,
      topic: process.env.GOOGLE_PUBSUB_TOPIC_ANALYTICS_INGEST,
    },
    cubes: {
      clickhouse: {
        enabled: !!process.env.CLICKHOUSE_ANALYTICS_CUBES_URL,
        config: parseClickhouseConfig({
          connectionUrl: process.env.CLICKHOUSE_ANALYTICS_CUBES_URL,
          databaseName: clickhouseDatabase,
        }),
        database: clickhouseDatabase,
      },
    },
    failureMode: parseAnalyticsFailureMode(process.env.ANALYTICS_FAILURE_MODE),
  },
  hoxAuth,
  threatEnrichmentVersion: process.env.THREAT_ENRICHMENT_VERSION,
  gameAppUrl: process.env.GAME_APP_URL,
  defaultLoginRedirectUrl: process.env.GAME_APP_URL,
  organizationOnboardingWelcomeUrl: `${process.env.ADMIN_APP_URL}/welcome`,
  otp,
  scim,
  frontendUrls,
  googleKmsConfig,
  vtKeyConfig,
  contextTelemetrySetup: parseTelemetrySetup(
    process.env.HOX_TELEMETRY_SETUP || ETelemetrySetup.DISABLED
  ),
  dashReverseProxy,
  github,
  performanceProfiler,
  huntingSearchAndDestroy,
  responseAppUrl: process.env.RESPONSE_APP_URL,
  iocMlModelUrl: process.env.IOC_ML_MODEL_URL,
  adminAppUrl: process.env.ADMIN_APP_URL,
  playwright,
  authAppUrl: process.env.AUTH_APP_URL,
  officeJsAppUrl: process.env.OFFICE_JS_APP_URL,
  shutdown,
};

export const appSecrets = {
  cortexApiKey: appConfig.cortexApiKey,
  hoxUrl: {
    username: appConfig.hoxUrl.username,
    password: appConfig.hoxUrl.password,
  },
  otp: {
    signingSecret: otp.signingSecret,
  },
  apiTokenSigningSecret: appConfig.apiTokenSigningSecret,
  zendesk: {
    jwtSecret: process.env.ZENDESK_JWT_SECRET,
  },
  scim: {
    scimSigningSecret: scim.scimSigningSecret,
  },
  cloudinary: {
    secret: process.env.CLOUDINARY_SECRET,
  },
  hoxAuth: {
    jwtSigningSecret: hoxAuth.jwtSigningSecret,
  },
  infraApi: {
    jwtTokenSignSecret: infraApi.jwtTokenSignSecret,
    jwtValidityMinutes: infraApi.jwtValidityMinutes,
    localDummyKey: infraApi.localDummyKey,
  },
  huntingSearchAndDestroy: {
    searchAndDestroyPrivateKeyPath:
      huntingSearchAndDestroy.searchAndDestroyPrivateKeyPath,
    apimJwtPublicKeyCertificatePfxPath:
      huntingSearchAndDestroy.apimJwtPublicKeyCertificatePfxPath,
    searchAndDestroyPublicKeyCertificatePath:
      huntingSearchAndDestroy.searchAndDestroyPublicKeyCertificatePath,
  },
  gmailApiDelivery,
};

export type IAppConfig = typeof appConfig;
export type IAppSecrets = typeof appSecrets;
