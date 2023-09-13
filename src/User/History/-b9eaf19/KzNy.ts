import { expect } from 'chai';
import merge from 'lodash/merge';
import VError from 'verror';

import { IAppConfig } from '@server/app/appConfig';

import { createScheduledTaskDefs } from './scheduledTasks';

const schedules: IAppConfig['tasks']['schedules'] = {
  gameCycle: '0 0 * * * *',
  expireQuests: '0 7 * * * *',
  databaseCleanup: '0 2 * * * *',
  threatFeedback: '0 3 * * * *',
  threatObservableAnalysis: '0 5 * * * *',
  questTemplateStatisticsUpdate: '0 7 * * * *',
  runPipelineForThreats: '0 */10 * * * *',
  enrichPreviouslyFailed: '0 */5 * * * *',
  uploadTranslations: '*/2 0 0 * * *',
  automaticEnrollment: '0 0 0 * * 3',
  timeoutOldHuntingSearchJobs: '0 */10 * * * *',
  updateAchievementAggregates: '0 0 3 * * *',
  updateCountryLeaderboardAggregates: '0 0 3 * * *',
  updateUserCountByCountryAggregates: '0 0 4 * * *',
  scheduleReminderEmails: '0 0 * * * *',
  removePreUploadedThreats: '0 1 * * * *',
  backfillQuestMarkerStars: '0 0 * * *',
  trackOrganizionFeatures: '0 0 * * *',
  backfillOnboardingEvents: '0 0 * * *',
  threatSplitHops: '0 0 * * *',
};

describe('scheduledTasks', () => {
  it('creates a task definition map for all schedules', () => {
    const taskDefMap = createScheduledTaskDefs(schedules);

    expect(taskDefMap['game.cycle'].cron).eql(schedules.gameCycle);
    expect(taskDefMap['database.clean'].cron).eql(schedules.databaseCleanup);
    expect(taskDefMap['threat.feedback'].cron).eql(schedules.threatFeedback);
    expect(taskDefMap['threat.observableAnalysis'].cron).eql(
      schedules.threatObservableAnalysis
    );
    expect(taskDefMap['intl.translations.uploadDynamicTranslations'].cron).eql(
      schedules.uploadTranslations
    );
    expect(taskDefMap['threat.hunting.timeoutOldHuntingSearchJobs'].cron).eql(
      schedules.timeoutOldHuntingSearchJobs
    );
    expect(
      taskDefMap['game.organization.updateAchievementAggregates'].cron
    ).eql(schedules.updateAchievementAggregates);
  });

  it('Filters out all definitions with an empty cron', () => {
    const missingSchedules = merge({}, schedules, {
      gameCycle: '',
      databaseCleanup: '',
    });

    const taskDefMap = createScheduledTaskDefs(missingSchedules);

    expect(taskDefMap).to.not.haveOwnProperty('game.cycle');
    expect(taskDefMap).to.not.haveOwnProperty('database.clean');
  });

  it('Throws an informative error when a broken cron is used', () => {
    const brokenSchedules = merge({}, schedules, {
      uploadTranslations: 'asd asd asd asd asd asd',
    });

    let scheduleError = null;
    try {
      createScheduledTaskDefs(brokenSchedules);
    } catch (e) {
      scheduleError = e;
    } finally {
      expect(scheduleError).not.eql(null);
      expect(scheduleError.name).eql('TaskScheduleError');
      expect(VError.info(scheduleError).task).eql(
        'intl.translations.uploadDynamicTranslations'
      );
    }
  });
});
