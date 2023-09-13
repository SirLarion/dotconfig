import cronParser from 'cron-parser';
import { subHours } from 'date-fns';
import { filter, flow, keyBy } from 'lodash/fp';
import tz from 'timezone';
import VError from 'verror';

import { IAppConfig } from '@server/app/appConfig';
import { handlerTree } from '@server/domains/gen/handlers';
import { SIGNATURE as ONBOARDING_SIGNATURE } from '@server/domains/infrastructure/migration/backfillOnboardingEvents';
import { SIGNATURE as QUEST_MARKER_SIGNATURE } from '@server/domains/infrastructure/migration/backfillQuestMarkerStars';

import { EScheduledTaskId, IScheduledTaskDef } from './models';

const FIFTEEN_MINUTES_IN_HOURS = 0.25;

// So that scheduled task argument type validation actually works.
const typinate = <T>(taskDef: IScheduledTaskDef<T>) =>
  taskDef as IScheduledTaskDef<T>;

// Because of holy brevity!
const t = typinate;

const createTaskDefs = (
  schedules: IAppConfig['tasks']['schedules']
): Array<IScheduledTaskDef<any>> => [
  t({
    id: EScheduledTaskId.DATABASE_CLEAN,
    cron: schedules.databaseCleanup,
    serviceFn: handlerTree.infrastructure.database.cleanup,
    signature: 'infrastructure.database.cleanup',
    args: ({ intendedAt }) => ({
      intendedAt,
    }),
  }),
  t({
    id: EScheduledTaskId.THREAT_FEEDBACK,
    cron: schedules.threatFeedback,
    serviceFn: handlerTree.threat.feedback.startBatchedThreatFeedback,
    signature: 'threat.feedback.startBatchedThreatFeedback',
  }),
  t({
    id: EScheduledTaskId.THREAT_OBSERVABLE_ANALYSIS,
    cron: schedules.threatObservableAnalysis,
    serviceFn: handlerTree.legacy.threatObservableTask.update,
    signature: 'legacy.threatObservableTask.update',
  }),
  t({
    id: EScheduledTaskId.GAME_CYCLE,
    cron: schedules.gameCycle,
    serviceFn: handlerTree.game.cycle.full,
    signature: 'game.cycle.full',
    args: ({ intendedAt }) => ({
      intendedAt,
      transactionId: intendedAt.toISOString(),
    }),
  }),
  t({
    id: EScheduledTaskId.GAME_QUEST_TEMPLATES_UPDATE_STATISTICS,
    cron: schedules.questTemplateStatisticsUpdate,
    serviceFn: handlerTree.game.questTemplate.updateStatistics,
    signature: 'game.questTemplate.updateStatistics',
    args: ({ intendedAt }) => ({
      // Aggregate previous UTC day's quest template statistics
      // Using subHours instead of subDays to ignore DST changes
      date: subHours(new Date(tz(intendedAt, '%Y-%m-%d')), 24),
    }),
  }),
  t({
    id: EScheduledTaskId.GAME_EXPIRE_QUESTS,
    cron: schedules.expireQuests,
    serviceFn: handlerTree.game.quest.expireAll,
    signature: 'game.quest.expireAll',
    args: ({ intendedAt }) => ({
      cutoffDate: intendedAt,
    }),
  }),
  t({
    id: EScheduledTaskId.THREAT_RUN_PIPELINE,
    cron: schedules.runPipelineForThreats,
    serviceFn: handlerTree.threat.pipeline.runPipelineForThreats,
    signature: 'threat.pipeline.runPipelineForThreats',
  }),
  t({
    id: EScheduledTaskId.THREAT_ENRICH_PREVIOUSLY_FAILED,
    cron: schedules.enrichPreviouslyFailed,
    serviceFn:
      handlerTree.infrastructure.migration.enrichPreviouslyFailedThreats,
    signature: 'infrastructure.migration.enrichPreviouslyFailedThreats',
  }),
  t({
    id: EScheduledTaskId.THREAT_SPLIT_HOPS,
    cron: schedules.threatSplitHops,
    serviceFn: handlerTree.infrastructure.migration.splitHops,
    signature: 'infrastructure.migration.splitHops',
  }),
  t({
    id: EScheduledTaskId.DYNAMIC_TRANSLATIONS_UPLOAD,
    cron: schedules.uploadTranslations,
    serviceFn: handlerTree.intl.translations.uploadDynamicTranslations,
    signature: 'intl.translations.uploadDynamicTranslations',
  }),
  t({
    id: EScheduledTaskId.START_GAME_FOR_USERS_WITH_AUTOMATIC_ENROLLMENT,
    cron: schedules.automaticEnrollment,
    serviceFn: handlerTree.game.user.startGameForUsersWithAutomaticEnrollment,
    signature: 'game.user.startGameForUsersWithAutomaticEnrollment',
  }),
  t({
    id: EScheduledTaskId.TIMEOUT_OLD_HUNTING_SEARCH_JOBS,
    cron: schedules.timeoutOldHuntingSearchJobs,
    serviceFn: handlerTree.threat.hunting.timeoutOldHuntingSearchJobs,
    signature: 'threat.hunting.timeoutOldHuntingSearchJobs',
  }),
  t({
    id: EScheduledTaskId.UPDATE_ACHIEVEMENT_AGGREGATES,
    cron: schedules.updateAchievementAggregates,
    serviceFn: handlerTree.game.organization.updateAchievementAggregates,
    signature: 'game.organization.updateAchievementAggregates',
    args: () => ({}),
  }),
  t({
    id: EScheduledTaskId.UPDATE_COUNTRY_LEADERBOARD_AGGREGATES,
    cron: schedules.updateCountryLeaderboardAggregates,
    serviceFn: handlerTree.game.organization.updateCountryLeaderboardAggregates,
    signature: 'game.organization.updateCountryLeaderboardAggregates',
    args: () => ({}),
  }),
  t({
    id: EScheduledTaskId.UPDATE_USER_COUNT_BY_COUNTRY_AGGREGATES,
    cron: schedules.updateUserCountByCountryAggregates,
    serviceFn: handlerTree.game.organization.updateUserCountByCountryAggregates,
    signature: 'game.organization.updateUserCountByCountryAggregates',
    args: () => ({}),
  }),
  t({
    id: EScheduledTaskId.SCHEDULE_REMINDER_EMAILS,
    cron: schedules.scheduleReminderEmails,
    serviceFn: handlerTree.game.organization.scheduleReminderEmails,
    signature: 'game.organization.scheduleReminderEmails',
    args: ({ intendedAt }) => ({
      intendedAt,
      transactionId: intendedAt.toISOString(),
    }),
  }),
  t({
    id: EScheduledTaskId.REMOVE_PRE_UPLOADED_THREATS,
    cron: schedules.removePreUploadedThreats,
    serviceFn: handlerTree.infrastructure.database.removePreUploadedThreats,
    signature: 'infrastructure.database.removePreUploadedThreats',
    args: () => ({
      minAgeInHours: FIFTEEN_MINUTES_IN_HOURS,
    }),
  }),
  t({
    id: EScheduledTaskId.BACKFILL_QUEST_MARKER_STARS,
    cron: schedules.backfillQuestMarkerStars,
    serviceFn: handlerTree.infrastructure.migration.backfillQuestMarkerStars,
    signature: QUEST_MARKER_SIGNATURE,
    args: ({ intendedAt }) => ({ limit: 1000, intendedAt }),
  }),
  t({
    id: EScheduledTaskId.BACKFILL_ONBOARDING_EVENTS,
    cron: schedules.backfillOnboardingEvents,
    serviceFn: handlerTree.infrastructure.migration.backfillOnboardingEvents,
    signature: ONBOARDING_SIGNATURE,
    args: ({ intendedAt }) => ({ limit: 500, intendedAt }),
  }),
  t({
    id: EScheduledTaskId.TRACK_ORGANIZATION_FEATURES,
    cron: schedules.trackOrganizionFeatures,
    serviceFn: handlerTree.internal.features.trackOrganizationFeatures,
    signature: 'internal.features.trackOrganizationFeatures',
    args: () => ({}),
  }),
];

const validateSchedules = (
  taskDefs: Array<IScheduledTaskDef<any>>
): Array<IScheduledTaskDef<any>> => {
  taskDefs.forEach(taskDef => {
    try {
      cronParser.parseExpression(taskDef.cron);
    } catch (e) {
      throw new VError(
        {
          name: 'TaskScheduleError',
          cause: e,
          info: {
            task: taskDef.id,
          },
        },
        undefined
      );
    }
  });

  return taskDefs;
};

export const createScheduledTaskDefs = (
  schedules: IAppConfig['tasks']['schedules']
): Array<IScheduledTaskDef<any>> =>
  flow(
    createTaskDefs,
    filter(
      ({ cron }: IScheduledTaskDef<any>) =>
        cron !== undefined && cron.trim() !== ''
    ),
    validateSchedules,
    keyBy(({ id }: IScheduledTaskDef<any>) => id)
  )(schedules);
