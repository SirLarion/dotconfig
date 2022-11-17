import { TTaskHandlerFunc } from '@server/tasks/models';

export interface IScheduleDef {
  intendedAt: Date;
}

export enum EScheduledTaskId {
  DATABASE_CLEAN = 'database.clean',
  GAME_CYCLE = 'game.cycle',
  GAME_EXPIRE_QUESTS = 'game.expireQuests',
  GAME_QUEST_TEMPLATES_UPDATE_STATISTICS = 'game.questTemplates.updateStatistics',
  ORGANIZATION_REPORTS_METRICS_AGGREGATION = 'organization.reports.metricsAggregation',
  THREAT_RUN_PIPELINE = 'threat.pipeline.runPipelineForThreats',
  THREAT_ENRICH_PREVIOUSLY_FAILED = 'infrastructure.migration.enrichPreviouslyFailedThreats',
  THREAT_FEEDBACK = 'threat.feedback',
  THREAT_OBSERVABLE_ANALYSIS = 'threat.observableAnalysis',
  THREAT_SPLIT_HOPS = 'threat.threatSplitHops',
  DYNAMIC_TRANSLATIONS_UPLOAD = 'intl.translations.uploadDynamicTranslations',
  START_GAME_FOR_USERS_WITH_AUTOMATIC_ENROLLMENT = 'game.user.startGameForUsersWithAutomaticEnrollment',
  TIMEOUT_OLD_HUNTING_SEARCH_JOBS = 'threat.hunting.timeoutOldHuntingSearchJobs',
  UPDATE_ACHIEVEMENT_AGGREGATES = 'game.organization.updateAchievementAggregates',
  UPDATE_COUNTRY_LEADERBOARD_AGGREGATES = 'game.organization.updateCountryLeaderboardAggregates',
  UPDATE_USER_COUNT_BY_COUNTRY_AGGREGATES = 'game.organization.updateUserCountByCountryAggregates',
  SCHEDULE_REMINDER_EMAILS = 'game.organization.scheduleReminderEmails',
  REMOVE_PRE_UPLOADED_THREATS = 'infrastructure.database.removePreUploadedThreats',
  BACKFILL_QUEST_MARKER_STARS = 'infrastructure.migration.cleanUpUserEvents',
  BACKFILL_ONBOARDING_EVENTS = 'infrastructure.migration.backfillOnboardingEvents',
  TRACK_ORGANIZATION_FEATURES = 'internal.features.trackOrganizationFeatures',
}

export interface IScheduledTaskDef<IN> {
  id: string;
  cron: string;
  signature: string;
  serviceFn: TTaskHandlerFunc<IN, any>;
  args?: ((schedule: IScheduleDef) => IN) | IN;
}
