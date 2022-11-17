// GENERATED, DO NOT EDIT
// This file is generated from the domain folder-file structure. To regenerate, run: npm run generate:handlertree
import adminLicensesGetOrgLicenseSets from '@server/domains/admin/licenses/getOrgLicenseSets';
import adminLicensesListAll from '@server/domains/admin/licenses/listAll';
import adminOrganizationOnboardingCompleteOnboardingTask from '@server/domains/admin/organizationOnboarding/completeOnboardingTask';
import adminOrganizationOnboardingGetOnboardingTaskTemplates from '@server/domains/admin/organizationOnboarding/getOnboardingTaskTemplates';
import adminOrganizationOnboardingLaunchOrganization from '@server/domains/admin/organizationOnboarding/launchOrganization';
import adminOrganizationOnboardingReopenOnboardingTask from '@server/domains/admin/organizationOnboarding/reopenOnboardingTask';
import adminOrganizationOnboardingSendOnboardingInvitationToAdmins from '@server/domains/admin/organizationOnboarding/sendOnboardingInvitationToAdmins';
import adminOrganizationOnboardingStart from '@server/domains/admin/organizationOnboarding/start';
import adminScimCreateUser from '@server/domains/admin/scim/createUser';
import adminScimFindUsers from '@server/domains/admin/scim/findUsers';
import adminScimGetUser from '@server/domains/admin/scim/getUser';
import adminScimRemoveUser from '@server/domains/admin/scim/removeUser';
import adminScimReplaceUser from '@server/domains/admin/scim/replaceUser';
import adminScimUpdateUser from '@server/domains/admin/scim/updateUser';
import adminTechnicalTestingFindTestTemplates from '@server/domains/admin/technicalTesting/findTestTemplates';
import adminTechnicalTestingRemoveTechnicalTestingQuests from '@server/domains/admin/technicalTesting/removeTechnicalTestingQuests';
import adminTechnicalTestingSendTestQuestToUser from '@server/domains/admin/technicalTesting/sendTestQuestToUser';
import adminUserManagementCreateUserListCsvFile from '@server/domains/admin/userManagement/createUserListCSVFile';
import adminUserManagementRunLargeUserListCsvCreationFlow from '@server/domains/admin/userManagement/runLargeUserListCSVCreationFlow';
import adminUserManagementSendUserListCsvEmail from '@server/domains/admin/userManagement/sendUserListCSVEmail';
import analyticsCubesQuery from '@server/domains/analytics/cubes/query';
import analyticsIngestCreateEnriched from '@server/domains/analytics/ingest/createEnriched';
import analyticsIngestPing from '@server/domains/analytics/ingest/ping';
import analyticsIngestTrack from '@server/domains/analytics/ingest/track';
import analyticsSinkTrack from '@server/domains/analytics/sink/track';
import analyticsSinkTrackDetached from '@server/domains/analytics/sink/trackDetached';
import authEmailSendJwtMagicLinkViaEmail from '@server/domains/auth/email/sendJwtMagicLinkViaEmail';
import authEmailSendMagicLinkEmail from '@server/domains/auth/email/sendMagicLinkEmail';
import authIapFindUser from '@server/domains/auth/iap/findUser';
import authImpersonateLoginAsOtherUser from '@server/domains/auth/impersonate/loginAsOtherUser';
import authInfoGetLoginInfo from '@server/domains/auth/info/getLoginInfo';
import authJwtConsumeRefreshToken from '@server/domains/auth/jwt/consumeRefreshToken';
import authJwtCreateAccessToken from '@server/domains/auth/jwt/createAccessToken';
import authJwtCreateHuntingAccessToken from '@server/domains/auth/jwt/createHuntingAccessToken';
import authJwtCreateLoginUrl from '@server/domains/auth/jwt/createLoginUrl';
import authJwtCreateRefreshToken from '@server/domains/auth/jwt/createRefreshToken';
import authJwtHandleRefreshToken from '@server/domains/auth/jwt/handleRefreshToken';
import authJwtLogin from '@server/domains/auth/jwt/login';
import authJwtLogout from '@server/domains/auth/jwt/logout';
import authJwtVerifyAccessToken from '@server/domains/auth/jwt/verifyAccessToken';
import authJwtVerifyRefreshToken from '@server/domains/auth/jwt/verifyRefreshToken';
import authOtpConsumeOtp from '@server/domains/auth/otp/consumeOtp';
import authOtpCreateOtp from '@server/domains/auth/otp/createOtp';
import authOtpCreateOtpLoginUrl from '@server/domains/auth/otp/createOtpLoginUrl';
import authOtpCreateOtpPayload from '@server/domains/auth/otp/createOtpPayload';
import authOtpVerifyOtp from '@server/domains/auth/otp/verifyOtp';
import authPluginAuthenticateGoogle from '@server/domains/auth/plugin/authenticateGoogle';
import authPluginAuthenticateOfficeJs from '@server/domains/auth/plugin/authenticateOfficeJs';
import authPluginVerifyGoogleIdToken from '@server/domains/auth/plugin/verifyGoogleIdToken';
import authScimCreateScimToken from '@server/domains/auth/scim/createScimToken';
import botsTeamsReportAction from '@server/domains/bots/teams/reportAction';
import collectionAgendaJobCreateMany from '@server/domains/collection/agendaJob/createMany';
import collectionAgendaJobFind from '@server/domains/collection/agendaJob/find';
import collectionAgendaJobRemove from '@server/domains/collection/agendaJob/remove';
import collectionAnalyticsEventAggregate from '@server/domains/collection/analyticsEvent/aggregate';
import collectionAnalyticsEventCreate from '@server/domains/collection/analyticsEvent/create';
import collectionAnalyticsEventCreateMany from '@server/domains/collection/analyticsEvent/createMany';
import collectionAnalyticsEventFind from '@server/domains/collection/analyticsEvent/find';
import collectionAnalyticsEventGet from '@server/domains/collection/analyticsEvent/get';
import collectionAnalyticsEventPatch from '@server/domains/collection/analyticsEvent/patch';
import collectionAnalyticsEventRemove from '@server/domains/collection/analyticsEvent/remove';
import collectionAnalyticsEventUpdate from '@server/domains/collection/analyticsEvent/update';
import collectionAnalyticsEventUpsert from '@server/domains/collection/analyticsEvent/upsert';
import collectionClientInfoCreate from '@server/domains/collection/clientInfo/create';
import collectionClientInfoFind from '@server/domains/collection/clientInfo/find';
import collectionClientInfoGet from '@server/domains/collection/clientInfo/get';
import collectionClientInfoPatch from '@server/domains/collection/clientInfo/patch';
import collectionClientInfoRemove from '@server/domains/collection/clientInfo/remove';
import collectionClientInfoUpdate from '@server/domains/collection/clientInfo/update';
import collectionClientInfoUpsert from '@server/domains/collection/clientInfo/upsert';
import collectionDistributedLockCreate from '@server/domains/collection/distributedLock/create';
import collectionDistributedLockFind from '@server/domains/collection/distributedLock/find';
import collectionDistributedLockRemove from '@server/domains/collection/distributedLock/remove';
import collectionEmailRecordCreate from '@server/domains/collection/emailRecord/create';
import collectionEmailRecordCreateMany from '@server/domains/collection/emailRecord/createMany';
import collectionEmailRecordFind from '@server/domains/collection/emailRecord/find';
import collectionEmailRecordPatch from '@server/domains/collection/emailRecord/patch';
import collectionEmailRecordRemove from '@server/domains/collection/emailRecord/remove';
import collectionFeedbackRuleCreate from '@server/domains/collection/feedbackRule/create';
import collectionFeedbackRuleFind from '@server/domains/collection/feedbackRule/find';
import collectionFeedbackRulePatch from '@server/domains/collection/feedbackRule/patch';
import collectionFeedbackRuleRemove from '@server/domains/collection/feedbackRule/remove';
import collectionFingerprintCreate from '@server/domains/collection/fingerprint/create';
import collectionFingerprintFind from '@server/domains/collection/fingerprint/find';
import collectionFingerprintGet from '@server/domains/collection/fingerprint/get';
import collectionFingerprintPatch from '@server/domains/collection/fingerprint/patch';
import collectionFingerprintRemove from '@server/domains/collection/fingerprint/remove';
import collectionFingerprintUpdate from '@server/domains/collection/fingerprint/update';
import collectionFingerprintUpsert from '@server/domains/collection/fingerprint/upsert';
import collectionGmailAddonExecutionStateCreate from '@server/domains/collection/gmailAddonExecutionState/create';
import collectionGmailAddonExecutionStateGet from '@server/domains/collection/gmailAddonExecutionState/get';
import collectionGmailAddonExecutionStateUpsert from '@server/domains/collection/gmailAddonExecutionState/upsert';
import collectionHuntingSearchJobCreate from '@server/domains/collection/huntingSearchJob/create';
import collectionHuntingSearchJobFind from '@server/domains/collection/huntingSearchJob/find';
import collectionHuntingSearchJobGet from '@server/domains/collection/huntingSearchJob/get';
import collectionHuntingSearchJobPatch from '@server/domains/collection/huntingSearchJob/patch';
import collectionHuntingSearchJobRemove from '@server/domains/collection/huntingSearchJob/remove';
import collectionHuntingSearchJobResultAddHuntingSearchJobId from '@server/domains/collection/huntingSearchJobResult/addHuntingSearchJobId';
import collectionHuntingSearchJobResultCreate from '@server/domains/collection/huntingSearchJobResult/create';
import collectionHuntingSearchJobResultCreateMany from '@server/domains/collection/huntingSearchJobResult/createMany';
import collectionHuntingSearchJobResultFind from '@server/domains/collection/huntingSearchJobResult/find';
import collectionHuntingSearchJobResultGet from '@server/domains/collection/huntingSearchJobResult/get';
import collectionHuntingSearchJobResultPatch from '@server/domains/collection/huntingSearchJobResult/patch';
import collectionHuntingSearchJobResultRemove from '@server/domains/collection/huntingSearchJobResult/remove';
import collectionIncidentBetaAggregate from '@server/domains/collection/incidentBeta/aggregate';
import collectionIncidentBetaCreate from '@server/domains/collection/incidentBeta/create';
import collectionIncidentBetaFind from '@server/domains/collection/incidentBeta/find';
import collectionIncidentBetaGet from '@server/domains/collection/incidentBeta/get';
import collectionIncidentBetaPatch from '@server/domains/collection/incidentBeta/patch';
import collectionIncidentBetaRemove from '@server/domains/collection/incidentBeta/remove';
import collectionIncidentBetaUpdate from '@server/domains/collection/incidentBeta/update';
import collectionIncidentBetaUpsert from '@server/domains/collection/incidentBeta/upsert';
import collectionMarkerCreate from '@server/domains/collection/marker/create';
import collectionMarkerFind from '@server/domains/collection/marker/find';
import collectionMarkerGet from '@server/domains/collection/marker/get';
import collectionMarkerPatch from '@server/domains/collection/marker/patch';
import collectionMarkerRemove from '@server/domains/collection/marker/remove';
import collectionMarkerUpdate from '@server/domains/collection/marker/update';
import collectionMarkerUpsert from '@server/domains/collection/marker/upsert';
import collectionMigrationsCreate from '@server/domains/collection/migrations/create';
import collectionMigrationsGet from '@server/domains/collection/migrations/get';
import collectionMigrationsPatch from '@server/domains/collection/migrations/patch';
import collectionNpsAnswerCreate from '@server/domains/collection/npsAnswer/create';
import collectionNpsAnswerFind from '@server/domains/collection/npsAnswer/find';
import collectionOneTimePasswordCreate from '@server/domains/collection/oneTimePassword/create';
import collectionOneTimePasswordFind from '@server/domains/collection/oneTimePassword/find';
import collectionOneTimePasswordRemove from '@server/domains/collection/oneTimePassword/remove';
import collectionOrganizationAddFeatureForOrganization from '@server/domains/collection/organization/addFeatureForOrganization';
import collectionOrganizationAddGoogleClientId from '@server/domains/collection/organization/addGoogleClientId';
import collectionOrganizationCreate from '@server/domains/collection/organization/create';
import collectionOrganizationFind from '@server/domains/collection/organization/find';
import collectionOrganizationGet from '@server/domains/collection/organization/get';
import collectionOrganizationGetByDomain from '@server/domains/collection/organization/getByDomain';
import collectionOrganizationPatch from '@server/domains/collection/organization/patch';
import collectionOrganizationRemove from '@server/domains/collection/organization/remove';
import collectionOrganizationRemoveFeatureFromOrganization from '@server/domains/collection/organization/removeFeatureFromOrganization';
import collectionOrganizationRemoveGoogleClientId from '@server/domains/collection/organization/removeGoogleClientId';
import collectionOrganizationOnboardingTaskCreate from '@server/domains/collection/organizationOnboardingTask/create';
import collectionOrganizationOnboardingTaskFind from '@server/domains/collection/organizationOnboardingTask/find';
import collectionOrganizationOnboardingTaskPatch from '@server/domains/collection/organizationOnboardingTask/patch';
import collectionOrganizationOnboardingTaskRemove from '@server/domains/collection/organizationOnboardingTask/remove';
import collectionOrganizationTrainingRuleFind from '@server/domains/collection/organizationTrainingRule/find';
import collectionOrganizationTrainingRuleGet from '@server/domains/collection/organizationTrainingRule/get';
import collectionOrganizationTrainingRuleRemove from '@server/domains/collection/organizationTrainingRule/remove';
import collectionOrganizationTrainingRuleUpsert from '@server/domains/collection/organizationTrainingRule/upsert';
import collectionPluginCreate from '@server/domains/collection/plugin/create';
import collectionPluginFind from '@server/domains/collection/plugin/find';
import collectionPluginGet from '@server/domains/collection/plugin/get';
import collectionPluginPatch from '@server/domains/collection/plugin/patch';
import collectionPluginRemove from '@server/domains/collection/plugin/remove';
import collectionPluginUpdate from '@server/domains/collection/plugin/update';
import collectionPluginUpsert from '@server/domains/collection/plugin/upsert';
import collectionQuestAggregate from '@server/domains/collection/quest/aggregate';
import collectionQuestCreate from '@server/domains/collection/quest/create';
import collectionQuestFind from '@server/domains/collection/quest/find';
import collectionQuestGet from '@server/domains/collection/quest/get';
import collectionQuestPatch from '@server/domains/collection/quest/patch';
import collectionQuestRemove from '@server/domains/collection/quest/remove';
import collectionQuestUpdate from '@server/domains/collection/quest/update';
import collectionQuestUpsert from '@server/domains/collection/quest/upsert';
import collectionQuestTemplateCreate from '@server/domains/collection/questTemplate/create';
import collectionQuestTemplateFind from '@server/domains/collection/questTemplate/find';
import collectionQuestTemplateGet from '@server/domains/collection/questTemplate/get';
import collectionQuestTemplatePatch from '@server/domains/collection/questTemplate/patch';
import collectionQuestTemplateRemove from '@server/domains/collection/questTemplate/remove';
import collectionQuestTemplateUpdate from '@server/domains/collection/questTemplate/update';
import collectionQuestTemplateUpsert from '@server/domains/collection/questTemplate/upsert';
import collectionQuizModuleCreate from '@server/domains/collection/quizModule/create';
import collectionQuizModuleFind from '@server/domains/collection/quizModule/find';
import collectionQuizModuleGet from '@server/domains/collection/quizModule/get';
import collectionQuizModulePatch from '@server/domains/collection/quizModule/patch';
import collectionQuizModuleRemove from '@server/domains/collection/quizModule/remove';
import collectionQuizModuleUpdate from '@server/domains/collection/quizModule/update';
import collectionQuizModuleUpsert from '@server/domains/collection/quizModule/upsert';
import collectionQuizTemplateCreate from '@server/domains/collection/quizTemplate/create';
import collectionQuizTemplateFind from '@server/domains/collection/quizTemplate/find';
import collectionQuizTemplateGet from '@server/domains/collection/quizTemplate/get';
import collectionQuizTemplatePatch from '@server/domains/collection/quizTemplate/patch';
import collectionQuizTemplateRemove from '@server/domains/collection/quizTemplate/remove';
import collectionQuizTemplateUpdate from '@server/domains/collection/quizTemplate/update';
import collectionRankFind from '@server/domains/collection/rank/find';
import collectionRefreshTokenCreate from '@server/domains/collection/refreshToken/create';
import collectionRefreshTokenFind from '@server/domains/collection/refreshToken/find';
import collectionRefreshTokenRemove from '@server/domains/collection/refreshToken/remove';
import collectionTagFind from '@server/domains/collection/tag/find';
import collectionTagFindVectorTag from '@server/domains/collection/tag/findVectorTag';
import collectionTaskCreate from '@server/domains/collection/task/create';
import collectionTaskCreateMany from '@server/domains/collection/task/createMany';
import collectionTaskFind from '@server/domains/collection/task/find';
import collectionTaskGet from '@server/domains/collection/task/get';
import collectionTaskPatch from '@server/domains/collection/task/patch';
import collectionTaskRemove from '@server/domains/collection/task/remove';
import collectionTaskUpdate from '@server/domains/collection/task/update';
import collectionTaskUpsert from '@server/domains/collection/task/upsert';
import collectionTaskGroupCreate from '@server/domains/collection/taskGroup/create';
import collectionTaskGroupFind from '@server/domains/collection/taskGroup/find';
import collectionTaskGroupGet from '@server/domains/collection/taskGroup/get';
import collectionTaskGroupPatch from '@server/domains/collection/taskGroup/patch';
import collectionTaskGroupRemove from '@server/domains/collection/taskGroup/remove';
import collectionTaskGroupUpdate from '@server/domains/collection/taskGroup/update';
import collectionTaskGroupUpsert from '@server/domains/collection/taskGroup/upsert';
import collectionThreatAggregate from '@server/domains/collection/threat/aggregate';
import collectionThreatCreate from '@server/domains/collection/threat/create';
import collectionThreatFind from '@server/domains/collection/threat/find';
import collectionThreatGet from '@server/domains/collection/threat/get';
import collectionThreatPatch from '@server/domains/collection/threat/patch';
import collectionThreatRemove from '@server/domains/collection/threat/remove';
import collectionThreatUpdate from '@server/domains/collection/threat/update';
import collectionThreatUpsert from '@server/domains/collection/threat/upsert';
import collectionThreatObservableCreate from '@server/domains/collection/threatObservable/create';
import collectionThreatObservableFind from '@server/domains/collection/threatObservable/find';
import collectionThreatObservableGet from '@server/domains/collection/threatObservable/get';
import collectionThreatObservablePatch from '@server/domains/collection/threatObservable/patch';
import collectionThreatObservableRemove from '@server/domains/collection/threatObservable/remove';
import collectionThreatObservableUpdate from '@server/domains/collection/threatObservable/update';
import collectionThreatObservableUpsert from '@server/domains/collection/threatObservable/upsert';
import collectionThreatResourceFind from '@server/domains/collection/threatResource/find';
import collectionThreatResourceUpsert from '@server/domains/collection/threatResource/upsert';
import collectionThreatSimilarityGroupCreate from '@server/domains/collection/threatSimilarityGroup/create';
import collectionThreatSimilarityGroupFind from '@server/domains/collection/threatSimilarityGroup/find';
import collectionThreatSimilarityGroupGet from '@server/domains/collection/threatSimilarityGroup/get';
import collectionThreatSimilarityGroupPatch from '@server/domains/collection/threatSimilarityGroup/patch';
import collectionThreatSimilarityGroupRemove from '@server/domains/collection/threatSimilarityGroup/remove';
import collectionThreatSimilarityGroupUpsert from '@server/domains/collection/threatSimilarityGroup/upsert';
import collectionTranslationCreate from '@server/domains/collection/translation/create';
import collectionTranslationFind from '@server/domains/collection/translation/find';
import collectionTranslationGet from '@server/domains/collection/translation/get';
import collectionTranslationPatch from '@server/domains/collection/translation/patch';
import collectionTranslationRemove from '@server/domains/collection/translation/remove';
import collectionTranslationUpdate from '@server/domains/collection/translation/update';
import collectionTranslationUpsert from '@server/domains/collection/translation/upsert';
import collectionUserAddFeatureForUser from '@server/domains/collection/user/addFeatureForUser';
import collectionUserAggregate from '@server/domains/collection/user/aggregate';
import collectionUserCreate from '@server/domains/collection/user/create';
import collectionUserDistinct from '@server/domains/collection/user/distinct';
import collectionUserFind from '@server/domains/collection/user/find';
import collectionUserFindAdminsByOrganizationId from '@server/domains/collection/user/findAdminsByOrganizationId';
import collectionUserFindCoworkersByOrganizationId from '@server/domains/collection/user/findCoworkersByOrganizationId';
import collectionUserGet from '@server/domains/collection/user/get';
import collectionUserPatch from '@server/domains/collection/user/patch';
import collectionUserRemove from '@server/domains/collection/user/remove';
import collectionUserRemoveFeatureFromUser from '@server/domains/collection/user/removeFeatureFromUser';
import collectionUserUpdate from '@server/domains/collection/user/update';
import collectionUserUpsert from '@server/domains/collection/user/upsert';
import collectionUserFeedbackCreate from '@server/domains/collection/userFeedback/create';
import collectionUserFeedbackFind from '@server/domains/collection/userFeedback/find';
import collectionUserFeedbackPatch from '@server/domains/collection/userFeedback/patch';
import collectionUserFeedbackRemove from '@server/domains/collection/userFeedback/remove';
import collectionVectorCreate from '@server/domains/collection/vector/create';
import collectionVectorFind from '@server/domains/collection/vector/find';
import collectionVectorGet from '@server/domains/collection/vector/get';
import collectionVectorPatch from '@server/domains/collection/vector/patch';
import collectionVectorRemove from '@server/domains/collection/vector/remove';
import collectionVectorUpdate from '@server/domains/collection/vector/update';
import collectionVectorUpsert from '@server/domains/collection/vector/upsert';
import dataDashProxyDashRequests from '@server/domains/data/dash/proxyDashRequests';
import gameChallengeUpdateForUser from '@server/domains/game/challenge/updateForUser';
import gameCycleFull from '@server/domains/game/cycle/full';
import gameCycleUser from '@server/domains/game/cycle/user';
import gameEmailInviteOrganizationsUnstartedUsers from '@server/domains/game/email/inviteOrganizationsUnstartedUsers';
import gameEmailSendActivationEmail from '@server/domains/game/email/sendActivationEmail';
import gameEmailSendWelcomeEmail from '@server/domains/game/email/sendWelcomeEmail';
import gameEngineGetQuestBasedOnLatestTheme from '@server/domains/game/engine/getQuestBasedOnLatestTheme';
import gameEngineGetTranslatedQuest from '@server/domains/game/engine/getTranslatedQuest';
import gameEngineSelectNextQuestTemplate from '@server/domains/game/engine/selectNextQuestTemplate';
import gameLeaderboardEnrichUserLeaderboardRows from '@server/domains/game/leaderboard/enrichUserLeaderboardRows';
import gameLeaderboardGetCountryLeaderboard from '@server/domains/game/leaderboard/getCountryLeaderboard';
import gameLeaderboardGetLeaderboard from '@server/domains/game/leaderboard/getLeaderboard';
import gameLeaderboardGetSimpleUserStarsLeaderboard from '@server/domains/game/leaderboard/getSimpleUserStarsLeaderboard';
import gameLeaderboardGetUserStarsLeaderboard from '@server/domains/game/leaderboard/getUserStarsLeaderboard';
import gameOrganizationScheduleReminderEmails from '@server/domains/game/organization/scheduleReminderEmails';
import gameOrganizationSetDemoMode from '@server/domains/game/organization/setDemoMode';
import gameOrganizationUpdateAchievementAggregates from '@server/domains/game/organization/updateAchievementAggregates';
import gameOrganizationUpdateCountryLeaderboardAggregates from '@server/domains/game/organization/updateCountryLeaderboardAggregates';
import gameOrganizationUpdateUserCountByCountryAggregates from '@server/domains/game/organization/updateUserCountByCountryAggregates';
import gameQuestDeliver from '@server/domains/game/quest/deliver';
import gameQuestExpire from '@server/domains/game/quest/expire';
import gameQuestExpireAll from '@server/domains/game/quest/expireAll';
import gameQuestFail from '@server/domains/game/quest/fail';
import gameQuestGetAttachment from '@server/domains/game/quest/getAttachment';
import gameQuestGetFailUrl from '@server/domains/game/quest/getFailUrl';
import gameQuestGetResultUrl from '@server/domains/game/quest/getResultUrl';
import gameQuestGetSignedFailUrl from '@server/domains/game/quest/getSignedFailUrl';
import gameQuestGetSignedResultUrl from '@server/domains/game/quest/getSignedResultUrl';
import gameQuestRegister from '@server/domains/game/quest/register';
import gameQuestReport from '@server/domains/game/quest/report';
import gameQuestReportWithMessageId from '@server/domains/game/quest/reportWithMessageId';
import gameQuestTrackDelivery from '@server/domains/game/quest/trackDelivery';
import gameQuestTemplateCheckCompilability from '@server/domains/game/questTemplate/checkCompilability';
import gameQuestTemplateCompileQuestTemplateEditorPreview from '@server/domains/game/questTemplate/compileQuestTemplateEditorPreview';
import gameQuestTemplateCompileQuestTemplatePreview from '@server/domains/game/questTemplate/compileQuestTemplatePreview';
import gameQuestTemplateCompileQuestTemplateString from '@server/domains/game/questTemplate/compileQuestTemplateString';
import gameQuestTemplateCompileQuestToVector from '@server/domains/game/questTemplate/compileQuestToVector';
import gameQuestTemplateGenerateFailureFunnel from '@server/domains/game/questTemplate/generateFailureFunnel';
import gameQuestTemplateGetDifficultyFactors from '@server/domains/game/questTemplate/getDifficultyFactors';
import gameQuestTemplateGetExampleContext from '@server/domains/game/questTemplate/getExampleContext';
import gameQuestTemplateUpdateStatistics from '@server/domains/game/questTemplate/updateStatistics';
import gameQuizActOnPreview from '@server/domains/game/quiz/actOnPreview';
import gameQuizActOnQuizObjective from '@server/domains/game/quiz/actOnQuizObjective';
import gameQuizPreview from '@server/domains/game/quiz/preview';
import gameQuizSelectNextForUser from '@server/domains/game/quiz/selectNextForUser';
import gameResultGet from '@server/domains/game/result/get';
import gameResultSelectAndPatchSecondaryObjective from '@server/domains/game/result/selectAndPatchSecondaryObjective';
import gameUserClaimAchievement from '@server/domains/game/user/claimAchievement';
import gameUserGetChangedRewards from '@server/domains/game/user/getChangedRewards';
import gameUserImposeDeliveryCooldown from '@server/domains/game/user/imposeDeliveryCooldown';
import gameUserLegacyOnboardUser from '@server/domains/game/user/legacyOnboardUser';
import gameUserOnboardUser from '@server/domains/game/user/onboardUser';
import gameUserRecalculateStats from '@server/domains/game/user/recalculateStats';
import gameUserResetUserGame from '@server/domains/game/user/resetUserGame';
import gameUserScheduleStatRecalculationTasksForOrganizations from '@server/domains/game/user/scheduleStatRecalculationTasksForOrganizations';
import gameUserSelfOnboard from '@server/domains/game/user/selfOnboard';
import gameUserStart from '@server/domains/game/user/start';
import gameUserStartGameForOrganizationsUnstartedUsers from '@server/domains/game/user/startGameForOrganizationsUnstartedUsers';
import gameUserStartGameForUsersWithAutomaticEnrollment from '@server/domains/game/user/startGameForUsersWithAutomaticEnrollment';
import gameUserUpdateOnboardingEligibility from '@server/domains/game/user/updateOnboardingEligibility';
import gameUserUpdatePlayerStats from '@server/domains/game/user/updatePlayerStats';
import infrastructureAuthCreateToken from '@server/domains/infrastructure/auth/createToken';
import infrastructureAuthGetSigninData from '@server/domains/infrastructure/auth/getSigninData';
import infrastructureAuthResolveApiUserFromToken from '@server/domains/infrastructure/auth/resolveApiUserFromToken';
import infrastructureAuthRevokeToken from '@server/domains/infrastructure/auth/revokeToken';
import infrastructureAuthVerifyTokenAgainstWhitelist from '@server/domains/infrastructure/auth/verifyTokenAgainstWhitelist';
import infrastructureDatabaseCleanup from '@server/domains/infrastructure/database/cleanup';
import infrastructureDatabaseRemovePreUploadedThreats from '@server/domains/infrastructure/database/removePreUploadedThreats';
import infrastructureDistributedLockAcquireLock from '@server/domains/infrastructure/distributedLock/acquireLock';
import infrastructureDistributedLockReleaseLock from '@server/domains/infrastructure/distributedLock/releaseLock';
import infrastructureDkimCreate from '@server/domains/infrastructure/dkim/create';
import infrastructureDkimGetSigningKey from '@server/domains/infrastructure/dkim/getSigningKey';
import infrastructureHealthAlive from '@server/domains/infrastructure/health/alive';
import infrastructureHealthReady from '@server/domains/infrastructure/health/ready';
import infrastructureHoxHashCompare from '@server/domains/infrastructure/hoxHash/compare';
import infrastructureHoxHashCompareBatched from '@server/domains/infrastructure/hoxHash/compareBatched';
import infrastructureHoxHashComputeFuzzyHash from '@server/domains/infrastructure/hoxHash/computeFuzzyHash';
import infrastructureHoxUrlCreateShortLink from '@server/domains/infrastructure/hoxUrl/createShortLink';
import infrastructureHtmlToImageCreateImageFromHtml from '@server/domains/infrastructure/htmlToImage/createImageFromHtml';
import infrastructureIdGenerateHumanReadableId from '@server/domains/infrastructure/id/generateHumanReadableId';
import infrastructureJwtCreate from '@server/domains/infrastructure/jwt/create';
import infrastructureJwtDecode from '@server/domains/infrastructure/jwt/decode';
import infrastructureJwtSignUrlForCurrentUser from '@server/domains/infrastructure/jwt/signUrlForCurrentUser';
import infrastructureJwtVerify from '@server/domains/infrastructure/jwt/verify';
import infrastructureJwtVerifySignedUrl from '@server/domains/infrastructure/jwt/verifySignedUrl';
import infrastructureLoggerLog from '@server/domains/infrastructure/logger/log';
import infrastructureMigrationBackfillOnboardingEvents from '@server/domains/infrastructure/migration/backfillOnboardingEvents';
import infrastructureMigrationBackfillQuestMarkerStars from '@server/domains/infrastructure/migration/backfillQuestMarkerStars';
import infrastructureMigrationBackfillUserQuestMarkerStars from '@server/domains/infrastructure/migration/backfillUserQuestMarkerStars';
import infrastructureMigrationEnrichPreviouslyFailedThreats from '@server/domains/infrastructure/migration/enrichPreviouslyFailedThreats';
import infrastructureMigrationSplitHops from '@server/domains/infrastructure/migration/splitHops';
import infrastructureMigrationV175FixThreatHeaders from '@server/domains/infrastructure/migration/v175FixThreatHeaders';
import infrastructureProfileCapturePerformanceProfile from '@server/domains/infrastructure/profile/capturePerformanceProfile';
import integrationAzureGetResourceTemplate from '@server/domains/integration/azure/getResourceTemplate';
import integrationAzureGetResourceTemplateUrl from '@server/domains/integration/azure/getResourceTemplateUrl';
import integrationBitlyGetUrl from '@server/domains/integration/bitly/getUrl';
import integrationCloudinarySignUpload from '@server/domains/integration/cloudinary/signUpload';
import integrationDnsLookup from '@server/domains/integration/dns/lookup';
import integrationDnsLookupMx from '@server/domains/integration/dns/lookupMx';
import integrationDnsValidateSpf from '@server/domains/integration/dns/validateSpf';
import integrationEmailBuild from '@server/domains/integration/email/build';
import integrationEmailDeliver from '@server/domains/integration/email/deliver';
import integrationEmailImposeDeliveryLimit from '@server/domains/integration/email/imposeDeliveryLimit';
import integrationEmailSend from '@server/domains/integration/email/send';
import integrationEmailTrackDelivery from '@server/domains/integration/email/trackDelivery';
import integrationGmailFetchEmailDeliveryAccessToken from '@server/domains/integration/gmail/fetchEmailDeliveryAccessToken';
import integrationGmailGetApiCredentials from '@server/domains/integration/gmail/getApiCredentials';
import integrationGmailInsertMessage from '@server/domains/integration/gmail/insertMessage';
import integrationGoogleCloudKmsDecryptAsymmetric from '@server/domains/integration/googleCloudKms/decryptAsymmetric';
import integrationGoogleCloudKmsGetPublicKey from '@server/domains/integration/googleCloudKms/getPublicKey';
import integrationGoogleCloudStorageDeleteFile from '@server/domains/integration/googleCloudStorage/deleteFile';
import integrationGoogleCloudStorageDownloadFile from '@server/domains/integration/googleCloudStorage/downloadFile';
import integrationGoogleCloudStorageGetSignedUrl from '@server/domains/integration/googleCloudStorage/getSignedUrl';
import integrationGoogleCloudStorageListFiles from '@server/domains/integration/googleCloudStorage/listFiles';
import integrationGoogleCloudStorageUpload from '@server/domains/integration/googleCloudStorage/upload';
import integrationHttpRequest from '@server/domains/integration/http/request';
import integrationVirustotalAugmentFetchEphemeralUrl from '@server/domains/integration/virustotalAugment/fetchEphemeralUrl';
import integrationZendeskCreateToken from '@server/domains/integration/zendesk/createToken';
import integrationZendeskRedirect from '@server/domains/integration/zendesk/redirect';
import internalDiagnosticsDebugEngineHeuristics from '@server/domains/internal/diagnostics/debugEngineHeuristics';
import internalDiagnosticsDebugQuestEngine from '@server/domains/internal/diagnostics/debugQuestEngine';
import internalExperimentsInitOrGetUserSplitTestCase from '@server/domains/internal/experiments/initOrGetUserSplitTestCase';
import internalFeaturesHasFeature from '@server/domains/internal/features/hasFeature';
import internalFeaturesHasFeatures from '@server/domains/internal/features/hasFeatures';
import internalFeaturesTrackOrganizationFeatures from '@server/domains/internal/features/trackOrganizationFeatures';
import intlTranslationsGetAll from '@server/domains/intl/translations/getAll';
import intlTranslationsGetCdnTranslations from '@server/domains/intl/translations/getCdnTranslations';
import intlTranslationsGetDatabaseSourceMessages from '@server/domains/intl/translations/getDatabaseSourceMessages';
import intlTranslationsGetStaticSourceMessages from '@server/domains/intl/translations/getStaticSourceMessages';
import intlTranslationsSyncTranslations from '@server/domains/intl/translations/syncTranslations';
import intlTranslationsUploadDynamicTranslations from '@server/domains/intl/translations/uploadDynamicTranslations';
import legacyFingerprintUserUpdate from '@server/domains/legacy/fingerprintUser/update';
import legacyMarkerFactoryCreate from '@server/domains/legacy/markerFactory/create';
import legacyMarkerFactoryRemove from '@server/domains/legacy/markerFactory/remove';
import legacyMarkerFactoryUpdate from '@server/domains/legacy/markerFactory/update';
import legacyQuestMarkerReviewCreate from '@server/domains/legacy/questMarkerReview/create';
import legacySendQuestToOrganizationCreate from '@server/domains/legacy/sendQuestToOrganization/create';
import legacySendQuestToUserCreate from '@server/domains/legacy/sendQuestToUser/create';
import legacyThreatObservableTaskCreate from '@server/domains/legacy/threatObservableTask/create';
import legacyThreatObservableTaskUpdate from '@server/domains/legacy/threatObservableTask/update';
import legacyThreatObservableTaskUpsert from '@server/domains/legacy/threatObservableTask/upsert';
import legacyUserTagCreatorCreate from '@server/domains/legacy/userTagCreator/create';
import organizationDomainAdd from '@server/domains/organization/domain/add';
import organizationDomainRemove from '@server/domains/organization/domain/remove';
import organizationDomainUpdate from '@server/domains/organization/domain/update';
import organizationQuizGetModules from '@server/domains/organization/quiz/getModules';
import organizationQuizSyncOrgModuleState from '@server/domains/organization/quiz/syncOrgModuleState';
import organizationQuizUpsertModule from '@server/domains/organization/quiz/upsertModule';
import organizationQuizUpsertModuleTemplate from '@server/domains/organization/quiz/upsertModuleTemplate';
import pluginActionClick from '@server/domains/plugin/action/click';
import pluginActionHandleAction from '@server/domains/plugin/action/handleAction';
import pluginActionReportQuest from '@server/domains/plugin/action/reportQuest';
import pluginActionStart from '@server/domains/plugin/action/start';
import pluginActionStartGame from '@server/domains/plugin/action/startGame';
import pluginActionUpload from '@server/domains/plugin/action/upload';
import pluginResponseUnknownUser from '@server/domains/plugin/response/unknownUser';
import questTemplateBenchmarkFindTemplates from '@server/domains/questTemplate/benchmark/findTemplates';
import questTemplateSearchFindQuestTemplatesBySearchString from '@server/domains/questTemplate/search/findQuestTemplatesBySearchString';
import securityValidationSanitizeHtml from '@server/domains/security/validation/sanitizeHtml';
import templatingHandlebarsCompileTemplate from '@server/domains/templating/handlebars/compileTemplate';
import templatingHandlebarsParseTemplate from '@server/domains/templating/handlebars/parseTemplate';
import threatAnalysisAssign from '@server/domains/threat/analysis/assign';
import threatAnalysisCalculateStatistics from '@server/domains/threat/analysis/calculateStatistics';
import threatAnalysisCalculateTrendHistogram from '@server/domains/threat/analysis/calculateTrendHistogram';
import threatAnalysisCallMlModelWithThreat from '@server/domains/threat/analysis/callMlModelWithThreat';
import threatAnalysisGetPrioritisedListOfAnalysableThreats from '@server/domains/threat/analysis/getPrioritisedListOfAnalysableThreats';
import threatAnalysisRateSimilarityGroup from '@server/domains/threat/analysis/rateSimilarityGroup';
import threatAnalysisRateThreat from '@server/domains/threat/analysis/rateThreat';
import threatCortexAnalyze from '@server/domains/threat/cortex/analyze';
import threatCortexGetAnalyzers from '@server/domains/threat/cortex/getAnalyzers';
import threatCortexGetJobReport from '@server/domains/threat/cortex/getJobReport';
import threatFeedbackSendFeedbackToUser from '@server/domains/threat/feedback/sendFeedbackToUser';
import threatFeedbackStartBatchedThreatFeedback from '@server/domains/threat/feedback/startBatchedThreatFeedback';
import threatHuntingDeleteEmail from '@server/domains/threat/hunting/deleteEmail';
import threatHuntingGetSearchResults from '@server/domains/threat/hunting/getSearchResults';
import threatHuntingInitializeSettings from '@server/domains/threat/hunting/initializeSettings';
import threatHuntingRevertEmailDeletion from '@server/domains/threat/hunting/revertEmailDeletion';
import threatHuntingStartSearch from '@server/domains/threat/hunting/startSearch';
import threatHuntingTimeoutOldHuntingSearchJobs from '@server/domains/threat/hunting/timeoutOldHuntingSearchJobs';
import threatPipelineAssignSimilarityGroup from '@server/domains/threat/pipeline/assignSimilarityGroup';
import threatPipelineEnrichThreat from '@server/domains/threat/pipeline/enrichThreat';
import threatPipelineEscalate from '@server/domains/threat/pipeline/escalate';
import threatPipelineRateAutomatically from '@server/domains/threat/pipeline/rateAutomatically';
import threatPipelineRunPipelineForThreats from '@server/domains/threat/pipeline/runPipelineForThreats';
import threatPipelineUpdateIncidents from '@server/domains/threat/pipeline/updateIncidents';
import threatRulesEvaluateExpression from '@server/domains/threat/rules/evaluateExpression';
import threatSearchFindIncidentsBySearchString from '@server/domains/threat/search/findIncidentsBySearchString';
import threatSearchFindThreatsBySearchString from '@server/domains/threat/search/findThreatsBySearchString';
import userAdminActionSendQuest from '@server/domains/user/adminAction/sendQuest';
import userBulkSendQuest from '@server/domains/user/bulk/sendQuest';
import userBulkActionFanOut from '@server/domains/user/bulkAction/fanOut';
import userEmailInviteUser from '@server/domains/user/email/inviteUser';
import userEnrichmentAddGeolocation from '@server/domains/user/enrichment/addGeolocation';
import userEnrichmentPersistEvents from '@server/domains/user/enrichment/persistEvents';
import userEnrichmentPersistEventsAndRecalculateRewards from '@server/domains/user/enrichment/persistEventsAndRecalculateRewards';
import userNpsCreate from '@server/domains/user/nps/create';
import userNpsShouldAskNpsSurvey from '@server/domains/user/nps/shouldAskNpsSurvey';
import userRolesAddRole from '@server/domains/user/roles/addRole';
import userRolesRemoveRoles from '@server/domains/user/roles/removeRoles';
import userRolesSetRole from '@server/domains/user/roles/setRole';
import userSearchFindUsersBySearchString from '@server/domains/user/search/findUsersBySearchString';
import userSoftDeleteDeactivateUser from '@server/domains/user/softDelete/deactivateUser';
import userSoftDeleteReactivateUser from '@server/domains/user/softDelete/reactivateUser';

import { IHandlerFunc, THandlerContext } from '../lib/models';

// Handler function types

export type TAdminLicensesGetOrgLicenseSets =
  typeof adminLicensesGetOrgLicenseSets.handler;
export type TAdminLicensesListAll = typeof adminLicensesListAll.handler;
export type TAdminOrganizationOnboardingCompleteOnboardingTask =
  typeof adminOrganizationOnboardingCompleteOnboardingTask.handler;
export type TAdminOrganizationOnboardingGetOnboardingTaskTemplates =
  typeof adminOrganizationOnboardingGetOnboardingTaskTemplates.handler;
export type TAdminOrganizationOnboardingLaunchOrganization =
  typeof adminOrganizationOnboardingLaunchOrganization.handler;
export type TAdminOrganizationOnboardingReopenOnboardingTask =
  typeof adminOrganizationOnboardingReopenOnboardingTask.handler;
export type TAdminOrganizationOnboardingSendOnboardingInvitationToAdmins =
  typeof adminOrganizationOnboardingSendOnboardingInvitationToAdmins.handler;
export type TAdminOrganizationOnboardingStart =
  typeof adminOrganizationOnboardingStart.handler;
export type TAdminScimCreateUser = typeof adminScimCreateUser.handler;
export type TAdminScimFindUsers = typeof adminScimFindUsers.handler;
export type TAdminScimGetUser = typeof adminScimGetUser.handler;
export type TAdminScimRemoveUser = typeof adminScimRemoveUser.handler;
export type TAdminScimReplaceUser = typeof adminScimReplaceUser.handler;
export type TAdminScimUpdateUser = typeof adminScimUpdateUser.handler;
export type TAdminTechnicalTestingFindTestTemplates =
  typeof adminTechnicalTestingFindTestTemplates.handler;
export type TAdminTechnicalTestingRemoveTechnicalTestingQuests =
  typeof adminTechnicalTestingRemoveTechnicalTestingQuests.handler;
export type TAdminTechnicalTestingSendTestQuestToUser =
  typeof adminTechnicalTestingSendTestQuestToUser.handler;
export type TAdminUserManagementCreateUserListCsvFile =
  typeof adminUserManagementCreateUserListCsvFile.handler;
export type TAdminUserManagementRunLargeUserListCsvCreationFlow =
  typeof adminUserManagementRunLargeUserListCsvCreationFlow.handler;
export type TAdminUserManagementSendUserListCsvEmail =
  typeof adminUserManagementSendUserListCsvEmail.handler;
export type TAnalyticsCubesQuery = typeof analyticsCubesQuery.handler;
export type TAnalyticsIngestCreateEnriched =
  typeof analyticsIngestCreateEnriched.handler;
export type TAnalyticsIngestPing = typeof analyticsIngestPing.handler;
export type TAnalyticsIngestTrack = typeof analyticsIngestTrack.handler;
export type TAnalyticsSinkTrack = typeof analyticsSinkTrack.handler;
export type TAnalyticsSinkTrackDetached =
  typeof analyticsSinkTrackDetached.handler;
export type TAuthEmailSendJwtMagicLinkViaEmail =
  typeof authEmailSendJwtMagicLinkViaEmail.handler;
export type TAuthEmailSendMagicLinkEmail =
  typeof authEmailSendMagicLinkEmail.handler;
export type TAuthIapFindUser = typeof authIapFindUser.handler;
export type TAuthImpersonateLoginAsOtherUser =
  typeof authImpersonateLoginAsOtherUser.handler;
export type TAuthInfoGetLoginInfo = typeof authInfoGetLoginInfo.handler;
export type TAuthJwtConsumeRefreshToken =
  typeof authJwtConsumeRefreshToken.handler;
export type TAuthJwtCreateAccessToken = typeof authJwtCreateAccessToken.handler;
export type TAuthJwtCreateHuntingAccessToken =
  typeof authJwtCreateHuntingAccessToken.handler;
export type TAuthJwtCreateLoginUrl = typeof authJwtCreateLoginUrl.handler;
export type TAuthJwtCreateRefreshToken =
  typeof authJwtCreateRefreshToken.handler;
export type TAuthJwtHandleRefreshToken =
  typeof authJwtHandleRefreshToken.handler;
export type TAuthJwtLogin = typeof authJwtLogin.handler;
export type TAuthJwtLogout = typeof authJwtLogout.handler;
export type TAuthJwtVerifyAccessToken = typeof authJwtVerifyAccessToken.handler;
export type TAuthJwtVerifyRefreshToken =
  typeof authJwtVerifyRefreshToken.handler;
export type TAuthOtpConsumeOtp = typeof authOtpConsumeOtp.handler;
export type TAuthOtpCreateOtp = typeof authOtpCreateOtp.handler;
export type TAuthOtpCreateOtpLoginUrl = typeof authOtpCreateOtpLoginUrl.handler;
export type TAuthOtpCreateOtpPayload = typeof authOtpCreateOtpPayload.handler;
export type TAuthOtpVerifyOtp = typeof authOtpVerifyOtp.handler;
export type TAuthPluginAuthenticateGoogle =
  typeof authPluginAuthenticateGoogle.handler;
export type TAuthPluginAuthenticateOfficeJs =
  typeof authPluginAuthenticateOfficeJs.handler;
export type TAuthPluginVerifyGoogleIdToken =
  typeof authPluginVerifyGoogleIdToken.handler;
export type TAuthScimCreateScimToken = typeof authScimCreateScimToken.handler;
export type TBotsTeamsReportAction = typeof botsTeamsReportAction.handler;
export type TCollectionAgendaJobCreateMany =
  typeof collectionAgendaJobCreateMany.handler;
export type TCollectionAgendaJobFind = typeof collectionAgendaJobFind.handler;
export type TCollectionAgendaJobRemove =
  typeof collectionAgendaJobRemove.handler;
export type TCollectionAnalyticsEventAggregate =
  typeof collectionAnalyticsEventAggregate.handler;
export type TCollectionAnalyticsEventCreate =
  typeof collectionAnalyticsEventCreate.handler;
export type TCollectionAnalyticsEventCreateMany =
  typeof collectionAnalyticsEventCreateMany.handler;
export type TCollectionAnalyticsEventFind =
  typeof collectionAnalyticsEventFind.handler;
export type TCollectionAnalyticsEventGet =
  typeof collectionAnalyticsEventGet.handler;
export type TCollectionAnalyticsEventPatch =
  typeof collectionAnalyticsEventPatch.handler;
export type TCollectionAnalyticsEventRemove =
  typeof collectionAnalyticsEventRemove.handler;
export type TCollectionAnalyticsEventUpdate =
  typeof collectionAnalyticsEventUpdate.handler;
export type TCollectionAnalyticsEventUpsert =
  typeof collectionAnalyticsEventUpsert.handler;
export type TCollectionClientInfoCreate =
  typeof collectionClientInfoCreate.handler;
export type TCollectionClientInfoFind = typeof collectionClientInfoFind.handler;
export type TCollectionClientInfoGet = typeof collectionClientInfoGet.handler;
export type TCollectionClientInfoPatch =
  typeof collectionClientInfoPatch.handler;
export type TCollectionClientInfoRemove =
  typeof collectionClientInfoRemove.handler;
export type TCollectionClientInfoUpdate =
  typeof collectionClientInfoUpdate.handler;
export type TCollectionClientInfoUpsert =
  typeof collectionClientInfoUpsert.handler;
export type TCollectionDistributedLockCreate =
  typeof collectionDistributedLockCreate.handler;
export type TCollectionDistributedLockFind =
  typeof collectionDistributedLockFind.handler;
export type TCollectionDistributedLockRemove =
  typeof collectionDistributedLockRemove.handler;
export type TCollectionEmailRecordCreate =
  typeof collectionEmailRecordCreate.handler;
export type TCollectionEmailRecordCreateMany =
  typeof collectionEmailRecordCreateMany.handler;
export type TCollectionEmailRecordFind =
  typeof collectionEmailRecordFind.handler;
export type TCollectionEmailRecordPatch =
  typeof collectionEmailRecordPatch.handler;
export type TCollectionEmailRecordRemove =
  typeof collectionEmailRecordRemove.handler;
export type TCollectionFeedbackRuleCreate =
  typeof collectionFeedbackRuleCreate.handler;
export type TCollectionFeedbackRuleFind =
  typeof collectionFeedbackRuleFind.handler;
export type TCollectionFeedbackRulePatch =
  typeof collectionFeedbackRulePatch.handler;
export type TCollectionFeedbackRuleRemove =
  typeof collectionFeedbackRuleRemove.handler;
export type TCollectionFingerprintCreate =
  typeof collectionFingerprintCreate.handler;
export type TCollectionFingerprintFind =
  typeof collectionFingerprintFind.handler;
export type TCollectionFingerprintGet = typeof collectionFingerprintGet.handler;
export type TCollectionFingerprintPatch =
  typeof collectionFingerprintPatch.handler;
export type TCollectionFingerprintRemove =
  typeof collectionFingerprintRemove.handler;
export type TCollectionFingerprintUpdate =
  typeof collectionFingerprintUpdate.handler;
export type TCollectionFingerprintUpsert =
  typeof collectionFingerprintUpsert.handler;
export type TCollectionGmailAddonExecutionStateCreate =
  typeof collectionGmailAddonExecutionStateCreate.handler;
export type TCollectionGmailAddonExecutionStateGet =
  typeof collectionGmailAddonExecutionStateGet.handler;
export type TCollectionGmailAddonExecutionStateUpsert =
  typeof collectionGmailAddonExecutionStateUpsert.handler;
export type TCollectionHuntingSearchJobCreate =
  typeof collectionHuntingSearchJobCreate.handler;
export type TCollectionHuntingSearchJobFind =
  typeof collectionHuntingSearchJobFind.handler;
export type TCollectionHuntingSearchJobGet =
  typeof collectionHuntingSearchJobGet.handler;
export type TCollectionHuntingSearchJobPatch =
  typeof collectionHuntingSearchJobPatch.handler;
export type TCollectionHuntingSearchJobRemove =
  typeof collectionHuntingSearchJobRemove.handler;
export type TCollectionHuntingSearchJobResultAddHuntingSearchJobId =
  typeof collectionHuntingSearchJobResultAddHuntingSearchJobId.handler;
export type TCollectionHuntingSearchJobResultCreate =
  typeof collectionHuntingSearchJobResultCreate.handler;
export type TCollectionHuntingSearchJobResultCreateMany =
  typeof collectionHuntingSearchJobResultCreateMany.handler;
export type TCollectionHuntingSearchJobResultFind =
  typeof collectionHuntingSearchJobResultFind.handler;
export type TCollectionHuntingSearchJobResultGet =
  typeof collectionHuntingSearchJobResultGet.handler;
export type TCollectionHuntingSearchJobResultPatch =
  typeof collectionHuntingSearchJobResultPatch.handler;
export type TCollectionHuntingSearchJobResultRemove =
  typeof collectionHuntingSearchJobResultRemove.handler;
export type TCollectionIncidentBetaAggregate =
  typeof collectionIncidentBetaAggregate.handler;
export type TCollectionIncidentBetaCreate =
  typeof collectionIncidentBetaCreate.handler;
export type TCollectionIncidentBetaFind =
  typeof collectionIncidentBetaFind.handler;
export type TCollectionIncidentBetaGet =
  typeof collectionIncidentBetaGet.handler;
export type TCollectionIncidentBetaPatch =
  typeof collectionIncidentBetaPatch.handler;
export type TCollectionIncidentBetaRemove =
  typeof collectionIncidentBetaRemove.handler;
export type TCollectionIncidentBetaUpdate =
  typeof collectionIncidentBetaUpdate.handler;
export type TCollectionIncidentBetaUpsert =
  typeof collectionIncidentBetaUpsert.handler;
export type TCollectionMarkerCreate = typeof collectionMarkerCreate.handler;
export type TCollectionMarkerFind = typeof collectionMarkerFind.handler;
export type TCollectionMarkerGet = typeof collectionMarkerGet.handler;
export type TCollectionMarkerPatch = typeof collectionMarkerPatch.handler;
export type TCollectionMarkerRemove = typeof collectionMarkerRemove.handler;
export type TCollectionMarkerUpdate = typeof collectionMarkerUpdate.handler;
export type TCollectionMarkerUpsert = typeof collectionMarkerUpsert.handler;
export type TCollectionMigrationsCreate =
  typeof collectionMigrationsCreate.handler;
export type TCollectionMigrationsGet = typeof collectionMigrationsGet.handler;
export type TCollectionMigrationsPatch =
  typeof collectionMigrationsPatch.handler;
export type TCollectionNpsAnswerCreate =
  typeof collectionNpsAnswerCreate.handler;
export type TCollectionNpsAnswerFind = typeof collectionNpsAnswerFind.handler;
export type TCollectionOneTimePasswordCreate =
  typeof collectionOneTimePasswordCreate.handler;
export type TCollectionOneTimePasswordFind =
  typeof collectionOneTimePasswordFind.handler;
export type TCollectionOneTimePasswordRemove =
  typeof collectionOneTimePasswordRemove.handler;
export type TCollectionOrganizationAddFeatureForOrganization =
  typeof collectionOrganizationAddFeatureForOrganization.handler;
export type TCollectionOrganizationAddGoogleClientId =
  typeof collectionOrganizationAddGoogleClientId.handler;
export type TCollectionOrganizationCreate =
  typeof collectionOrganizationCreate.handler;
export type TCollectionOrganizationFind =
  typeof collectionOrganizationFind.handler;
export type TCollectionOrganizationGet =
  typeof collectionOrganizationGet.handler;
export type TCollectionOrganizationGetByDomain =
  typeof collectionOrganizationGetByDomain.handler;
export type TCollectionOrganizationPatch =
  typeof collectionOrganizationPatch.handler;
export type TCollectionOrganizationRemove =
  typeof collectionOrganizationRemove.handler;
export type TCollectionOrganizationRemoveFeatureFromOrganization =
  typeof collectionOrganizationRemoveFeatureFromOrganization.handler;
export type TCollectionOrganizationRemoveGoogleClientId =
  typeof collectionOrganizationRemoveGoogleClientId.handler;
export type TCollectionOrganizationOnboardingTaskCreate =
  typeof collectionOrganizationOnboardingTaskCreate.handler;
export type TCollectionOrganizationOnboardingTaskFind =
  typeof collectionOrganizationOnboardingTaskFind.handler;
export type TCollectionOrganizationOnboardingTaskPatch =
  typeof collectionOrganizationOnboardingTaskPatch.handler;
export type TCollectionOrganizationOnboardingTaskRemove =
  typeof collectionOrganizationOnboardingTaskRemove.handler;
export type TCollectionOrganizationTrainingRuleFind =
  typeof collectionOrganizationTrainingRuleFind.handler;
export type TCollectionOrganizationTrainingRuleGet =
  typeof collectionOrganizationTrainingRuleGet.handler;
export type TCollectionOrganizationTrainingRuleRemove =
  typeof collectionOrganizationTrainingRuleRemove.handler;
export type TCollectionOrganizationTrainingRuleUpsert =
  typeof collectionOrganizationTrainingRuleUpsert.handler;
export type TCollectionPluginCreate = typeof collectionPluginCreate.handler;
export type TCollectionPluginFind = typeof collectionPluginFind.handler;
export type TCollectionPluginGet = typeof collectionPluginGet.handler;
export type TCollectionPluginPatch = typeof collectionPluginPatch.handler;
export type TCollectionPluginRemove = typeof collectionPluginRemove.handler;
export type TCollectionPluginUpdate = typeof collectionPluginUpdate.handler;
export type TCollectionPluginUpsert = typeof collectionPluginUpsert.handler;
export type TCollectionQuestAggregate = typeof collectionQuestAggregate.handler;
export type TCollectionQuestCreate = typeof collectionQuestCreate.handler;
export type TCollectionQuestFind = typeof collectionQuestFind.handler;
export type TCollectionQuestGet = typeof collectionQuestGet.handler;
export type TCollectionQuestPatch = typeof collectionQuestPatch.handler;
export type TCollectionQuestRemove = typeof collectionQuestRemove.handler;
export type TCollectionQuestUpdate = typeof collectionQuestUpdate.handler;
export type TCollectionQuestUpsert = typeof collectionQuestUpsert.handler;
export type TCollectionQuestTemplateCreate =
  typeof collectionQuestTemplateCreate.handler;
export type TCollectionQuestTemplateFind =
  typeof collectionQuestTemplateFind.handler;
export type TCollectionQuestTemplateGet =
  typeof collectionQuestTemplateGet.handler;
export type TCollectionQuestTemplatePatch =
  typeof collectionQuestTemplatePatch.handler;
export type TCollectionQuestTemplateRemove =
  typeof collectionQuestTemplateRemove.handler;
export type TCollectionQuestTemplateUpdate =
  typeof collectionQuestTemplateUpdate.handler;
export type TCollectionQuestTemplateUpsert =
  typeof collectionQuestTemplateUpsert.handler;
export type TCollectionQuizModuleCreate =
  typeof collectionQuizModuleCreate.handler;
export type TCollectionQuizModuleFind = typeof collectionQuizModuleFind.handler;
export type TCollectionQuizModuleGet = typeof collectionQuizModuleGet.handler;
export type TCollectionQuizModulePatch =
  typeof collectionQuizModulePatch.handler;
export type TCollectionQuizModuleRemove =
  typeof collectionQuizModuleRemove.handler;
export type TCollectionQuizModuleUpdate =
  typeof collectionQuizModuleUpdate.handler;
export type TCollectionQuizModuleUpsert =
  typeof collectionQuizModuleUpsert.handler;
export type TCollectionQuizTemplateCreate =
  typeof collectionQuizTemplateCreate.handler;
export type TCollectionQuizTemplateFind =
  typeof collectionQuizTemplateFind.handler;
export type TCollectionQuizTemplateGet =
  typeof collectionQuizTemplateGet.handler;
export type TCollectionQuizTemplatePatch =
  typeof collectionQuizTemplatePatch.handler;
export type TCollectionQuizTemplateRemove =
  typeof collectionQuizTemplateRemove.handler;
export type TCollectionQuizTemplateUpdate =
  typeof collectionQuizTemplateUpdate.handler;
export type TCollectionRankFind = typeof collectionRankFind.handler;
export type TCollectionRefreshTokenCreate =
  typeof collectionRefreshTokenCreate.handler;
export type TCollectionRefreshTokenFind =
  typeof collectionRefreshTokenFind.handler;
export type TCollectionRefreshTokenRemove =
  typeof collectionRefreshTokenRemove.handler;
export type TCollectionTagFind = typeof collectionTagFind.handler;
export type TCollectionTagFindVectorTag =
  typeof collectionTagFindVectorTag.handler;
export type TCollectionTaskCreate = typeof collectionTaskCreate.handler;
export type TCollectionTaskCreateMany = typeof collectionTaskCreateMany.handler;
export type TCollectionTaskFind = typeof collectionTaskFind.handler;
export type TCollectionTaskGet = typeof collectionTaskGet.handler;
export type TCollectionTaskPatch = typeof collectionTaskPatch.handler;
export type TCollectionTaskRemove = typeof collectionTaskRemove.handler;
export type TCollectionTaskUpdate = typeof collectionTaskUpdate.handler;
export type TCollectionTaskUpsert = typeof collectionTaskUpsert.handler;
export type TCollectionTaskGroupCreate =
  typeof collectionTaskGroupCreate.handler;
export type TCollectionTaskGroupFind = typeof collectionTaskGroupFind.handler;
export type TCollectionTaskGroupGet = typeof collectionTaskGroupGet.handler;
export type TCollectionTaskGroupPatch = typeof collectionTaskGroupPatch.handler;
export type TCollectionTaskGroupRemove =
  typeof collectionTaskGroupRemove.handler;
export type TCollectionTaskGroupUpdate =
  typeof collectionTaskGroupUpdate.handler;
export type TCollectionTaskGroupUpsert =
  typeof collectionTaskGroupUpsert.handler;
export type TCollectionThreatAggregate =
  typeof collectionThreatAggregate.handler;
export type TCollectionThreatCreate = typeof collectionThreatCreate.handler;
export type TCollectionThreatFind = typeof collectionThreatFind.handler;
export type TCollectionThreatGet = typeof collectionThreatGet.handler;
export type TCollectionThreatPatch = typeof collectionThreatPatch.handler;
export type TCollectionThreatRemove = typeof collectionThreatRemove.handler;
export type TCollectionThreatUpdate = typeof collectionThreatUpdate.handler;
export type TCollectionThreatUpsert = typeof collectionThreatUpsert.handler;
export type TCollectionThreatObservableCreate =
  typeof collectionThreatObservableCreate.handler;
export type TCollectionThreatObservableFind =
  typeof collectionThreatObservableFind.handler;
export type TCollectionThreatObservableGet =
  typeof collectionThreatObservableGet.handler;
export type TCollectionThreatObservablePatch =
  typeof collectionThreatObservablePatch.handler;
export type TCollectionThreatObservableRemove =
  typeof collectionThreatObservableRemove.handler;
export type TCollectionThreatObservableUpdate =
  typeof collectionThreatObservableUpdate.handler;
export type TCollectionThreatObservableUpsert =
  typeof collectionThreatObservableUpsert.handler;
export type TCollectionThreatResourceFind =
  typeof collectionThreatResourceFind.handler;
export type TCollectionThreatResourceUpsert =
  typeof collectionThreatResourceUpsert.handler;
export type TCollectionThreatSimilarityGroupCreate =
  typeof collectionThreatSimilarityGroupCreate.handler;
export type TCollectionThreatSimilarityGroupFind =
  typeof collectionThreatSimilarityGroupFind.handler;
export type TCollectionThreatSimilarityGroupGet =
  typeof collectionThreatSimilarityGroupGet.handler;
export type TCollectionThreatSimilarityGroupPatch =
  typeof collectionThreatSimilarityGroupPatch.handler;
export type TCollectionThreatSimilarityGroupRemove =
  typeof collectionThreatSimilarityGroupRemove.handler;
export type TCollectionThreatSimilarityGroupUpsert =
  typeof collectionThreatSimilarityGroupUpsert.handler;
export type TCollectionTranslationCreate =
  typeof collectionTranslationCreate.handler;
export type TCollectionTranslationFind =
  typeof collectionTranslationFind.handler;
export type TCollectionTranslationGet = typeof collectionTranslationGet.handler;
export type TCollectionTranslationPatch =
  typeof collectionTranslationPatch.handler;
export type TCollectionTranslationRemove =
  typeof collectionTranslationRemove.handler;
export type TCollectionTranslationUpdate =
  typeof collectionTranslationUpdate.handler;
export type TCollectionTranslationUpsert =
  typeof collectionTranslationUpsert.handler;
export type TCollectionUserAddFeatureForUser =
  typeof collectionUserAddFeatureForUser.handler;
export type TCollectionUserAggregate = typeof collectionUserAggregate.handler;
export type TCollectionUserCreate = typeof collectionUserCreate.handler;
export type TCollectionUserDistinct = typeof collectionUserDistinct.handler;
export type TCollectionUserFind = typeof collectionUserFind.handler;
export type TCollectionUserFindAdminsByOrganizationId =
  typeof collectionUserFindAdminsByOrganizationId.handler;
export type TCollectionUserFindCoworkersByOrganizationId =
  typeof collectionUserFindCoworkersByOrganizationId.handler;
export type TCollectionUserGet = typeof collectionUserGet.handler;
export type TCollectionUserPatch = typeof collectionUserPatch.handler;
export type TCollectionUserRemove = typeof collectionUserRemove.handler;
export type TCollectionUserRemoveFeatureFromUser =
  typeof collectionUserRemoveFeatureFromUser.handler;
export type TCollectionUserUpdate = typeof collectionUserUpdate.handler;
export type TCollectionUserUpsert = typeof collectionUserUpsert.handler;
export type TCollectionUserFeedbackCreate =
  typeof collectionUserFeedbackCreate.handler;
export type TCollectionUserFeedbackFind =
  typeof collectionUserFeedbackFind.handler;
export type TCollectionUserFeedbackPatch =
  typeof collectionUserFeedbackPatch.handler;
export type TCollectionUserFeedbackRemove =
  typeof collectionUserFeedbackRemove.handler;
export type TCollectionVectorCreate = typeof collectionVectorCreate.handler;
export type TCollectionVectorFind = typeof collectionVectorFind.handler;
export type TCollectionVectorGet = typeof collectionVectorGet.handler;
export type TCollectionVectorPatch = typeof collectionVectorPatch.handler;
export type TCollectionVectorRemove = typeof collectionVectorRemove.handler;
export type TCollectionVectorUpdate = typeof collectionVectorUpdate.handler;
export type TCollectionVectorUpsert = typeof collectionVectorUpsert.handler;
export type TDataDashProxyDashRequests =
  typeof dataDashProxyDashRequests.handler;
export type TGameChallengeUpdateForUser =
  typeof gameChallengeUpdateForUser.handler;
export type TGameCycleFull = typeof gameCycleFull.handler;
export type TGameCycleUser = typeof gameCycleUser.handler;
export type TGameEmailInviteOrganizationsUnstartedUsers =
  typeof gameEmailInviteOrganizationsUnstartedUsers.handler;
export type TGameEmailSendActivationEmail =
  typeof gameEmailSendActivationEmail.handler;
export type TGameEmailSendWelcomeEmail =
  typeof gameEmailSendWelcomeEmail.handler;
export type TGameEngineGetQuestBasedOnLatestTheme =
  typeof gameEngineGetQuestBasedOnLatestTheme.handler;
export type TGameEngineGetTranslatedQuest =
  typeof gameEngineGetTranslatedQuest.handler;
export type TGameEngineSelectNextQuestTemplate =
  typeof gameEngineSelectNextQuestTemplate.handler;
export type TGameLeaderboardEnrichUserLeaderboardRows =
  typeof gameLeaderboardEnrichUserLeaderboardRows.handler;
export type TGameLeaderboardGetCountryLeaderboard =
  typeof gameLeaderboardGetCountryLeaderboard.handler;
export type TGameLeaderboardGetLeaderboard =
  typeof gameLeaderboardGetLeaderboard.handler;
export type TGameLeaderboardGetSimpleUserStarsLeaderboard =
  typeof gameLeaderboardGetSimpleUserStarsLeaderboard.handler;
export type TGameLeaderboardGetUserStarsLeaderboard =
  typeof gameLeaderboardGetUserStarsLeaderboard.handler;
export type TGameOrganizationScheduleReminderEmails =
  typeof gameOrganizationScheduleReminderEmails.handler;
export type TGameOrganizationSetDemoMode =
  typeof gameOrganizationSetDemoMode.handler;
export type TGameOrganizationUpdateAchievementAggregates =
  typeof gameOrganizationUpdateAchievementAggregates.handler;
export type TGameOrganizationUpdateCountryLeaderboardAggregates =
  typeof gameOrganizationUpdateCountryLeaderboardAggregates.handler;
export type TGameOrganizationUpdateUserCountByCountryAggregates =
  typeof gameOrganizationUpdateUserCountByCountryAggregates.handler;
export type TGameQuestDeliver = typeof gameQuestDeliver.handler;
export type TGameQuestExpire = typeof gameQuestExpire.handler;
export type TGameQuestExpireAll = typeof gameQuestExpireAll.handler;
export type TGameQuestFail = typeof gameQuestFail.handler;
export type TGameQuestGetAttachment = typeof gameQuestGetAttachment.handler;
export type TGameQuestGetFailUrl = typeof gameQuestGetFailUrl.handler;
export type TGameQuestGetResultUrl = typeof gameQuestGetResultUrl.handler;
export type TGameQuestGetSignedFailUrl =
  typeof gameQuestGetSignedFailUrl.handler;
export type TGameQuestGetSignedResultUrl =
  typeof gameQuestGetSignedResultUrl.handler;
export type TGameQuestRegister = typeof gameQuestRegister.handler;
export type TGameQuestReport = typeof gameQuestReport.handler;
export type TGameQuestReportWithMessageId =
  typeof gameQuestReportWithMessageId.handler;
export type TGameQuestTrackDelivery = typeof gameQuestTrackDelivery.handler;
export type TGameQuestTemplateCheckCompilability =
  typeof gameQuestTemplateCheckCompilability.handler;
export type TGameQuestTemplateCompileQuestTemplateEditorPreview =
  typeof gameQuestTemplateCompileQuestTemplateEditorPreview.handler;
export type TGameQuestTemplateCompileQuestTemplatePreview =
  typeof gameQuestTemplateCompileQuestTemplatePreview.handler;
export type TGameQuestTemplateCompileQuestTemplateString =
  typeof gameQuestTemplateCompileQuestTemplateString.handler;
export type TGameQuestTemplateCompileQuestToVector =
  typeof gameQuestTemplateCompileQuestToVector.handler;
export type TGameQuestTemplateGenerateFailureFunnel =
  typeof gameQuestTemplateGenerateFailureFunnel.handler;
export type TGameQuestTemplateGetDifficultyFactors =
  typeof gameQuestTemplateGetDifficultyFactors.handler;
export type TGameQuestTemplateGetExampleContext =
  typeof gameQuestTemplateGetExampleContext.handler;
export type TGameQuestTemplateUpdateStatistics =
  typeof gameQuestTemplateUpdateStatistics.handler;
export type TGameQuizActOnPreview = typeof gameQuizActOnPreview.handler;
export type TGameQuizActOnQuizObjective =
  typeof gameQuizActOnQuizObjective.handler;
export type TGameQuizPreview = typeof gameQuizPreview.handler;
export type TGameQuizSelectNextForUser =
  typeof gameQuizSelectNextForUser.handler;
export type TGameResultGet = typeof gameResultGet.handler;
export type TGameResultSelectAndPatchSecondaryObjective =
  typeof gameResultSelectAndPatchSecondaryObjective.handler;
export type TGameUserClaimAchievement = typeof gameUserClaimAchievement.handler;
export type TGameUserGetChangedRewards =
  typeof gameUserGetChangedRewards.handler;
export type TGameUserImposeDeliveryCooldown =
  typeof gameUserImposeDeliveryCooldown.handler;
export type TGameUserLegacyOnboardUser =
  typeof gameUserLegacyOnboardUser.handler;
export type TGameUserOnboardUser = typeof gameUserOnboardUser.handler;
export type TGameUserRecalculateStats = typeof gameUserRecalculateStats.handler;
export type TGameUserResetUserGame = typeof gameUserResetUserGame.handler;
export type TGameUserScheduleStatRecalculationTasksForOrganizations =
  typeof gameUserScheduleStatRecalculationTasksForOrganizations.handler;
export type TGameUserSelfOnboard = typeof gameUserSelfOnboard.handler;
export type TGameUserStart = typeof gameUserStart.handler;
export type TGameUserStartGameForOrganizationsUnstartedUsers =
  typeof gameUserStartGameForOrganizationsUnstartedUsers.handler;
export type TGameUserStartGameForUsersWithAutomaticEnrollment =
  typeof gameUserStartGameForUsersWithAutomaticEnrollment.handler;
export type TGameUserUpdateOnboardingEligibility =
  typeof gameUserUpdateOnboardingEligibility.handler;
export type TGameUserUpdatePlayerStats =
  typeof gameUserUpdatePlayerStats.handler;
export type TInfrastructureAuthCreateToken =
  typeof infrastructureAuthCreateToken.handler;
export type TInfrastructureAuthGetSigninData =
  typeof infrastructureAuthGetSigninData.handler;
export type TInfrastructureAuthResolveApiUserFromToken =
  typeof infrastructureAuthResolveApiUserFromToken.handler;
export type TInfrastructureAuthRevokeToken =
  typeof infrastructureAuthRevokeToken.handler;
export type TInfrastructureAuthVerifyTokenAgainstWhitelist =
  typeof infrastructureAuthVerifyTokenAgainstWhitelist.handler;
export type TInfrastructureDatabaseCleanup =
  typeof infrastructureDatabaseCleanup.handler;
export type TInfrastructureDatabaseRemovePreUploadedThreats =
  typeof infrastructureDatabaseRemovePreUploadedThreats.handler;
export type TInfrastructureDistributedLockAcquireLock =
  typeof infrastructureDistributedLockAcquireLock.handler;
export type TInfrastructureDistributedLockReleaseLock =
  typeof infrastructureDistributedLockReleaseLock.handler;
export type TInfrastructureDkimCreate = typeof infrastructureDkimCreate.handler;
export type TInfrastructureDkimGetSigningKey =
  typeof infrastructureDkimGetSigningKey.handler;
export type TInfrastructureHealthAlive =
  typeof infrastructureHealthAlive.handler;
export type TInfrastructureHealthReady =
  typeof infrastructureHealthReady.handler;
export type TInfrastructureHoxHashCompare =
  typeof infrastructureHoxHashCompare.handler;
export type TInfrastructureHoxHashCompareBatched =
  typeof infrastructureHoxHashCompareBatched.handler;
export type TInfrastructureHoxHashComputeFuzzyHash =
  typeof infrastructureHoxHashComputeFuzzyHash.handler;
export type TInfrastructureHoxUrlCreateShortLink =
  typeof infrastructureHoxUrlCreateShortLink.handler;
export type TInfrastructureHtmlToImageCreateImageFromHtml =
  typeof infrastructureHtmlToImageCreateImageFromHtml.handler;
export type TInfrastructureIdGenerateHumanReadableId =
  typeof infrastructureIdGenerateHumanReadableId.handler;
export type TInfrastructureJwtCreate = typeof infrastructureJwtCreate.handler;
export type TInfrastructureJwtDecode = typeof infrastructureJwtDecode.handler;
export type TInfrastructureJwtSignUrlForCurrentUser =
  typeof infrastructureJwtSignUrlForCurrentUser.handler;
export type TInfrastructureJwtVerify = typeof infrastructureJwtVerify.handler;
export type TInfrastructureJwtVerifySignedUrl =
  typeof infrastructureJwtVerifySignedUrl.handler;
export type TInfrastructureLoggerLog = typeof infrastructureLoggerLog.handler;
export type TInfrastructureMigrationBackfillOnboardingEvents =
  typeof infrastructureMigrationBackfillOnboardingEvents.handler;
export type TInfrastructureMigrationBackfillQuestMarkerStars =
  typeof infrastructureMigrationBackfillQuestMarkerStars.handler;
export type TInfrastructureMigrationBackfillUserQuestMarkerStars =
  typeof infrastructureMigrationBackfillUserQuestMarkerStars.handler;
export type TInfrastructureMigrationEnrichPreviouslyFailedThreats =
  typeof infrastructureMigrationEnrichPreviouslyFailedThreats.handler;
export type TInfrastructureMigrationSplitHops =
  typeof infrastructureMigrationSplitHops.handler;
export type TInfrastructureMigrationV175FixThreatHeaders =
  typeof infrastructureMigrationV175FixThreatHeaders.handler;
export type TInfrastructureProfileCapturePerformanceProfile =
  typeof infrastructureProfileCapturePerformanceProfile.handler;
export type TIntegrationAzureGetResourceTemplate =
  typeof integrationAzureGetResourceTemplate.handler;
export type TIntegrationAzureGetResourceTemplateUrl =
  typeof integrationAzureGetResourceTemplateUrl.handler;
export type TIntegrationBitlyGetUrl = typeof integrationBitlyGetUrl.handler;
export type TIntegrationCloudinarySignUpload =
  typeof integrationCloudinarySignUpload.handler;
export type TIntegrationDnsLookup = typeof integrationDnsLookup.handler;
export type TIntegrationDnsLookupMx = typeof integrationDnsLookupMx.handler;
export type TIntegrationDnsValidateSpf =
  typeof integrationDnsValidateSpf.handler;
export type TIntegrationEmailBuild = typeof integrationEmailBuild.handler;
export type TIntegrationEmailDeliver = typeof integrationEmailDeliver.handler;
export type TIntegrationEmailImposeDeliveryLimit =
  typeof integrationEmailImposeDeliveryLimit.handler;
export type TIntegrationEmailSend = typeof integrationEmailSend.handler;
export type TIntegrationEmailTrackDelivery =
  typeof integrationEmailTrackDelivery.handler;
export type TIntegrationGmailFetchEmailDeliveryAccessToken =
  typeof integrationGmailFetchEmailDeliveryAccessToken.handler;
export type TIntegrationGmailGetApiCredentials =
  typeof integrationGmailGetApiCredentials.handler;
export type TIntegrationGmailInsertMessage =
  typeof integrationGmailInsertMessage.handler;
export type TIntegrationGoogleCloudKmsDecryptAsymmetric =
  typeof integrationGoogleCloudKmsDecryptAsymmetric.handler;
export type TIntegrationGoogleCloudKmsGetPublicKey =
  typeof integrationGoogleCloudKmsGetPublicKey.handler;
export type TIntegrationGoogleCloudStorageDeleteFile =
  typeof integrationGoogleCloudStorageDeleteFile.handler;
export type TIntegrationGoogleCloudStorageDownloadFile =
  typeof integrationGoogleCloudStorageDownloadFile.handler;
export type TIntegrationGoogleCloudStorageGetSignedUrl =
  typeof integrationGoogleCloudStorageGetSignedUrl.handler;
export type TIntegrationGoogleCloudStorageListFiles =
  typeof integrationGoogleCloudStorageListFiles.handler;
export type TIntegrationGoogleCloudStorageUpload =
  typeof integrationGoogleCloudStorageUpload.handler;
export type TIntegrationHttpRequest = typeof integrationHttpRequest.handler;
export type TIntegrationVirustotalAugmentFetchEphemeralUrl =
  typeof integrationVirustotalAugmentFetchEphemeralUrl.handler;
export type TIntegrationZendeskCreateToken =
  typeof integrationZendeskCreateToken.handler;
export type TIntegrationZendeskRedirect =
  typeof integrationZendeskRedirect.handler;
export type TInternalDiagnosticsDebugEngineHeuristics =
  typeof internalDiagnosticsDebugEngineHeuristics.handler;
export type TInternalDiagnosticsDebugQuestEngine =
  typeof internalDiagnosticsDebugQuestEngine.handler;
export type TInternalExperimentsInitOrGetUserSplitTestCase =
  typeof internalExperimentsInitOrGetUserSplitTestCase.handler;
export type TInternalFeaturesHasFeature =
  typeof internalFeaturesHasFeature.handler;
export type TInternalFeaturesHasFeatures =
  typeof internalFeaturesHasFeatures.handler;
export type TInternalFeaturesTrackOrganizationFeatures =
  typeof internalFeaturesTrackOrganizationFeatures.handler;
export type TIntlTranslationsGetAll = typeof intlTranslationsGetAll.handler;
export type TIntlTranslationsGetCdnTranslations =
  typeof intlTranslationsGetCdnTranslations.handler;
export type TIntlTranslationsGetDatabaseSourceMessages =
  typeof intlTranslationsGetDatabaseSourceMessages.handler;
export type TIntlTranslationsGetStaticSourceMessages =
  typeof intlTranslationsGetStaticSourceMessages.handler;
export type TIntlTranslationsSyncTranslations =
  typeof intlTranslationsSyncTranslations.handler;
export type TIntlTranslationsUploadDynamicTranslations =
  typeof intlTranslationsUploadDynamicTranslations.handler;
export type TLegacyFingerprintUserUpdate =
  typeof legacyFingerprintUserUpdate.handler;
export type TLegacyMarkerFactoryCreate =
  typeof legacyMarkerFactoryCreate.handler;
export type TLegacyMarkerFactoryRemove =
  typeof legacyMarkerFactoryRemove.handler;
export type TLegacyMarkerFactoryUpdate =
  typeof legacyMarkerFactoryUpdate.handler;
export type TLegacyQuestMarkerReviewCreate =
  typeof legacyQuestMarkerReviewCreate.handler;
export type TLegacySendQuestToOrganizationCreate =
  typeof legacySendQuestToOrganizationCreate.handler;
export type TLegacySendQuestToUserCreate =
  typeof legacySendQuestToUserCreate.handler;
export type TLegacyThreatObservableTaskCreate =
  typeof legacyThreatObservableTaskCreate.handler;
export type TLegacyThreatObservableTaskUpdate =
  typeof legacyThreatObservableTaskUpdate.handler;
export type TLegacyThreatObservableTaskUpsert =
  typeof legacyThreatObservableTaskUpsert.handler;
export type TLegacyUserTagCreatorCreate =
  typeof legacyUserTagCreatorCreate.handler;
export type TOrganizationDomainAdd = typeof organizationDomainAdd.handler;
export type TOrganizationDomainRemove = typeof organizationDomainRemove.handler;
export type TOrganizationDomainUpdate = typeof organizationDomainUpdate.handler;
export type TOrganizationQuizGetModules =
  typeof organizationQuizGetModules.handler;
export type TOrganizationQuizSyncOrgModuleState =
  typeof organizationQuizSyncOrgModuleState.handler;
export type TOrganizationQuizUpsertModule =
  typeof organizationQuizUpsertModule.handler;
export type TOrganizationQuizUpsertModuleTemplate =
  typeof organizationQuizUpsertModuleTemplate.handler;
export type TPluginActionClick = typeof pluginActionClick.handler;
export type TPluginActionHandleAction = typeof pluginActionHandleAction.handler;
export type TPluginActionReportQuest = typeof pluginActionReportQuest.handler;
export type TPluginActionStart = typeof pluginActionStart.handler;
export type TPluginActionStartGame = typeof pluginActionStartGame.handler;
export type TPluginActionUpload = typeof pluginActionUpload.handler;
export type TPluginResponseUnknownUser =
  typeof pluginResponseUnknownUser.handler;
export type TQuestTemplateBenchmarkFindTemplates =
  typeof questTemplateBenchmarkFindTemplates.handler;
export type TQuestTemplateSearchFindQuestTemplatesBySearchString =
  typeof questTemplateSearchFindQuestTemplatesBySearchString.handler;
export type TSecurityValidationSanitizeHtml =
  typeof securityValidationSanitizeHtml.handler;
export type TTemplatingHandlebarsCompileTemplate =
  typeof templatingHandlebarsCompileTemplate.handler;
export type TTemplatingHandlebarsParseTemplate =
  typeof templatingHandlebarsParseTemplate.handler;
export type TThreatAnalysisAssign = typeof threatAnalysisAssign.handler;
export type TThreatAnalysisCalculateStatistics =
  typeof threatAnalysisCalculateStatistics.handler;
export type TThreatAnalysisCalculateTrendHistogram =
  typeof threatAnalysisCalculateTrendHistogram.handler;
export type TThreatAnalysisCallMlModelWithThreat =
  typeof threatAnalysisCallMlModelWithThreat.handler;
export type TThreatAnalysisGetPrioritisedListOfAnalysableThreats =
  typeof threatAnalysisGetPrioritisedListOfAnalysableThreats.handler;
export type TThreatAnalysisRateSimilarityGroup =
  typeof threatAnalysisRateSimilarityGroup.handler;
export type TThreatAnalysisRateThreat = typeof threatAnalysisRateThreat.handler;
export type TThreatCortexAnalyze = typeof threatCortexAnalyze.handler;
export type TThreatCortexGetAnalyzers = typeof threatCortexGetAnalyzers.handler;
export type TThreatCortexGetJobReport = typeof threatCortexGetJobReport.handler;
export type TThreatFeedbackSendFeedbackToUser =
  typeof threatFeedbackSendFeedbackToUser.handler;
export type TThreatFeedbackStartBatchedThreatFeedback =
  typeof threatFeedbackStartBatchedThreatFeedback.handler;
export type TThreatHuntingDeleteEmail = typeof threatHuntingDeleteEmail.handler;
export type TThreatHuntingGetSearchResults =
  typeof threatHuntingGetSearchResults.handler;
export type TThreatHuntingInitializeSettings =
  typeof threatHuntingInitializeSettings.handler;
export type TThreatHuntingRevertEmailDeletion =
  typeof threatHuntingRevertEmailDeletion.handler;
export type TThreatHuntingStartSearch = typeof threatHuntingStartSearch.handler;
export type TThreatHuntingTimeoutOldHuntingSearchJobs =
  typeof threatHuntingTimeoutOldHuntingSearchJobs.handler;
export type TThreatPipelineAssignSimilarityGroup =
  typeof threatPipelineAssignSimilarityGroup.handler;
export type TThreatPipelineEnrichThreat =
  typeof threatPipelineEnrichThreat.handler;
export type TThreatPipelineEscalate = typeof threatPipelineEscalate.handler;
export type TThreatPipelineRateAutomatically =
  typeof threatPipelineRateAutomatically.handler;
export type TThreatPipelineRunPipelineForThreats =
  typeof threatPipelineRunPipelineForThreats.handler;
export type TThreatPipelineUpdateIncidents =
  typeof threatPipelineUpdateIncidents.handler;
export type TThreatRulesEvaluateExpression =
  typeof threatRulesEvaluateExpression.handler;
export type TThreatSearchFindIncidentsBySearchString =
  typeof threatSearchFindIncidentsBySearchString.handler;
export type TThreatSearchFindThreatsBySearchString =
  typeof threatSearchFindThreatsBySearchString.handler;
export type TUserAdminActionSendQuest = typeof userAdminActionSendQuest.handler;
export type TUserBulkSendQuest = typeof userBulkSendQuest.handler;
export type TUserBulkActionFanOut = typeof userBulkActionFanOut.handler;
export type TUserEmailInviteUser = typeof userEmailInviteUser.handler;
export type TUserEnrichmentAddGeolocation =
  typeof userEnrichmentAddGeolocation.handler;
export type TUserEnrichmentPersistEvents =
  typeof userEnrichmentPersistEvents.handler;
export type TUserEnrichmentPersistEventsAndRecalculateRewards =
  typeof userEnrichmentPersistEventsAndRecalculateRewards.handler;
export type TUserNpsCreate = typeof userNpsCreate.handler;
export type TUserNpsShouldAskNpsSurvey =
  typeof userNpsShouldAskNpsSurvey.handler;
export type TUserRolesAddRole = typeof userRolesAddRole.handler;
export type TUserRolesRemoveRoles = typeof userRolesRemoveRoles.handler;
export type TUserRolesSetRole = typeof userRolesSetRole.handler;
export type TUserSearchFindUsersBySearchString =
  typeof userSearchFindUsersBySearchString.handler;
export type TUserSoftDeleteDeactivateUser =
  typeof userSoftDeleteDeactivateUser.handler;
export type TUserSoftDeleteReactivateUser =
  typeof userSoftDeleteReactivateUser.handler;

// Aliased handler function types which drop the requirement for specific context from sub-handlers.
// This enables the context types to remain specific to a single service instead of requiring full context
// of all dependent services (which hugely simplifies test mocks and better communicates the handlers dependencies).
// The downside of this is that we cannot infer the real type from THandlerFuncTree and must
// instead import handlers from the above type definitions (if needed).

const asAnyContextSubsetHandlerFunc = <C extends THandlerContext, IN, OUT>(
  f: IHandlerFunc<C, IN, OUT>
): IHandlerFunc<THandlerContext, IN, OUT> => {
  return f;
};
const adminLicensesGetOrgLicenseSetsHandler = asAnyContextSubsetHandlerFunc(
  adminLicensesGetOrgLicenseSets.handler
);
const adminLicensesListAllHandler = asAnyContextSubsetHandlerFunc(
  adminLicensesListAll.handler
);
const adminOrganizationOnboardingCompleteOnboardingTaskHandler =
  asAnyContextSubsetHandlerFunc(
    adminOrganizationOnboardingCompleteOnboardingTask.handler
  );
const adminOrganizationOnboardingGetOnboardingTaskTemplatesHandler =
  asAnyContextSubsetHandlerFunc(
    adminOrganizationOnboardingGetOnboardingTaskTemplates.handler
  );
const adminOrganizationOnboardingLaunchOrganizationHandler =
  asAnyContextSubsetHandlerFunc(
    adminOrganizationOnboardingLaunchOrganization.handler
  );
const adminOrganizationOnboardingReopenOnboardingTaskHandler =
  asAnyContextSubsetHandlerFunc(
    adminOrganizationOnboardingReopenOnboardingTask.handler
  );
const adminOrganizationOnboardingSendOnboardingInvitationToAdminsHandler =
  asAnyContextSubsetHandlerFunc(
    adminOrganizationOnboardingSendOnboardingInvitationToAdmins.handler
  );
const adminOrganizationOnboardingStartHandler = asAnyContextSubsetHandlerFunc(
  adminOrganizationOnboardingStart.handler
);
const adminScimCreateUserHandler = asAnyContextSubsetHandlerFunc(
  adminScimCreateUser.handler
);
const adminScimFindUsersHandler = asAnyContextSubsetHandlerFunc(
  adminScimFindUsers.handler
);
const adminScimGetUserHandler = asAnyContextSubsetHandlerFunc(
  adminScimGetUser.handler
);
const adminScimRemoveUserHandler = asAnyContextSubsetHandlerFunc(
  adminScimRemoveUser.handler
);
const adminScimReplaceUserHandler = asAnyContextSubsetHandlerFunc(
  adminScimReplaceUser.handler
);
const adminScimUpdateUserHandler = asAnyContextSubsetHandlerFunc(
  adminScimUpdateUser.handler
);
const adminTechnicalTestingFindTestTemplatesHandler =
  asAnyContextSubsetHandlerFunc(adminTechnicalTestingFindTestTemplates.handler);
const adminTechnicalTestingRemoveTechnicalTestingQuestsHandler =
  asAnyContextSubsetHandlerFunc(
    adminTechnicalTestingRemoveTechnicalTestingQuests.handler
  );
const adminTechnicalTestingSendTestQuestToUserHandler =
  asAnyContextSubsetHandlerFunc(
    adminTechnicalTestingSendTestQuestToUser.handler
  );
const adminUserManagementCreateUserListCsvFileHandler =
  asAnyContextSubsetHandlerFunc(
    adminUserManagementCreateUserListCsvFile.handler
  );
const adminUserManagementRunLargeUserListCsvCreationFlowHandler =
  asAnyContextSubsetHandlerFunc(
    adminUserManagementRunLargeUserListCsvCreationFlow.handler
  );
const adminUserManagementSendUserListCsvEmailHandler =
  asAnyContextSubsetHandlerFunc(
    adminUserManagementSendUserListCsvEmail.handler
  );
const analyticsCubesQueryHandler = asAnyContextSubsetHandlerFunc(
  analyticsCubesQuery.handler
);
const analyticsIngestCreateEnrichedHandler = asAnyContextSubsetHandlerFunc(
  analyticsIngestCreateEnriched.handler
);
const analyticsIngestPingHandler = asAnyContextSubsetHandlerFunc(
  analyticsIngestPing.handler
);
const analyticsIngestTrackHandler = asAnyContextSubsetHandlerFunc(
  analyticsIngestTrack.handler
);
const analyticsSinkTrackHandler = asAnyContextSubsetHandlerFunc(
  analyticsSinkTrack.handler
);
const analyticsSinkTrackDetachedHandler = asAnyContextSubsetHandlerFunc(
  analyticsSinkTrackDetached.handler
);
const authEmailSendJwtMagicLinkViaEmailHandler = asAnyContextSubsetHandlerFunc(
  authEmailSendJwtMagicLinkViaEmail.handler
);
const authEmailSendMagicLinkEmailHandler = asAnyContextSubsetHandlerFunc(
  authEmailSendMagicLinkEmail.handler
);
const authIapFindUserHandler = asAnyContextSubsetHandlerFunc(
  authIapFindUser.handler
);
const authImpersonateLoginAsOtherUserHandler = asAnyContextSubsetHandlerFunc(
  authImpersonateLoginAsOtherUser.handler
);
const authInfoGetLoginInfoHandler = asAnyContextSubsetHandlerFunc(
  authInfoGetLoginInfo.handler
);
const authJwtConsumeRefreshTokenHandler = asAnyContextSubsetHandlerFunc(
  authJwtConsumeRefreshToken.handler
);
const authJwtCreateAccessTokenHandler = asAnyContextSubsetHandlerFunc(
  authJwtCreateAccessToken.handler
);
const authJwtCreateHuntingAccessTokenHandler = asAnyContextSubsetHandlerFunc(
  authJwtCreateHuntingAccessToken.handler
);
const authJwtCreateLoginUrlHandler = asAnyContextSubsetHandlerFunc(
  authJwtCreateLoginUrl.handler
);
const authJwtCreateRefreshTokenHandler = asAnyContextSubsetHandlerFunc(
  authJwtCreateRefreshToken.handler
);
const authJwtHandleRefreshTokenHandler = asAnyContextSubsetHandlerFunc(
  authJwtHandleRefreshToken.handler
);
const authJwtLoginHandler = asAnyContextSubsetHandlerFunc(authJwtLogin.handler);
const authJwtLogoutHandler = asAnyContextSubsetHandlerFunc(
  authJwtLogout.handler
);
const authJwtVerifyAccessTokenHandler = asAnyContextSubsetHandlerFunc(
  authJwtVerifyAccessToken.handler
);
const authJwtVerifyRefreshTokenHandler = asAnyContextSubsetHandlerFunc(
  authJwtVerifyRefreshToken.handler
);
const authOtpConsumeOtpHandler = asAnyContextSubsetHandlerFunc(
  authOtpConsumeOtp.handler
);
const authOtpCreateOtpHandler = asAnyContextSubsetHandlerFunc(
  authOtpCreateOtp.handler
);
const authOtpCreateOtpLoginUrlHandler = asAnyContextSubsetHandlerFunc(
  authOtpCreateOtpLoginUrl.handler
);
const authOtpCreateOtpPayloadHandler = asAnyContextSubsetHandlerFunc(
  authOtpCreateOtpPayload.handler
);
const authOtpVerifyOtpHandler = asAnyContextSubsetHandlerFunc(
  authOtpVerifyOtp.handler
);
const authPluginAuthenticateGoogleHandler = asAnyContextSubsetHandlerFunc(
  authPluginAuthenticateGoogle.handler
);
const authPluginAuthenticateOfficeJsHandler = asAnyContextSubsetHandlerFunc(
  authPluginAuthenticateOfficeJs.handler
);
const authPluginVerifyGoogleIdTokenHandler = asAnyContextSubsetHandlerFunc(
  authPluginVerifyGoogleIdToken.handler
);
const authScimCreateScimTokenHandler = asAnyContextSubsetHandlerFunc(
  authScimCreateScimToken.handler
);
const botsTeamsReportActionHandler = asAnyContextSubsetHandlerFunc(
  botsTeamsReportAction.handler
);
const collectionAgendaJobCreateManyHandler = asAnyContextSubsetHandlerFunc(
  collectionAgendaJobCreateMany.handler
);
const collectionAgendaJobFindHandler = asAnyContextSubsetHandlerFunc(
  collectionAgendaJobFind.handler
);
const collectionAgendaJobRemoveHandler = asAnyContextSubsetHandlerFunc(
  collectionAgendaJobRemove.handler
);
const collectionAnalyticsEventAggregateHandler = asAnyContextSubsetHandlerFunc(
  collectionAnalyticsEventAggregate.handler
);
const collectionAnalyticsEventCreateHandler = asAnyContextSubsetHandlerFunc(
  collectionAnalyticsEventCreate.handler
);
const collectionAnalyticsEventCreateManyHandler = asAnyContextSubsetHandlerFunc(
  collectionAnalyticsEventCreateMany.handler
);
const collectionAnalyticsEventFindHandler = asAnyContextSubsetHandlerFunc(
  collectionAnalyticsEventFind.handler
);
const collectionAnalyticsEventGetHandler = asAnyContextSubsetHandlerFunc(
  collectionAnalyticsEventGet.handler
);
const collectionAnalyticsEventPatchHandler = asAnyContextSubsetHandlerFunc(
  collectionAnalyticsEventPatch.handler
);
const collectionAnalyticsEventRemoveHandler = asAnyContextSubsetHandlerFunc(
  collectionAnalyticsEventRemove.handler
);
const collectionAnalyticsEventUpdateHandler = asAnyContextSubsetHandlerFunc(
  collectionAnalyticsEventUpdate.handler
);
const collectionAnalyticsEventUpsertHandler = asAnyContextSubsetHandlerFunc(
  collectionAnalyticsEventUpsert.handler
);
const collectionClientInfoCreateHandler = asAnyContextSubsetHandlerFunc(
  collectionClientInfoCreate.handler
);
const collectionClientInfoFindHandler = asAnyContextSubsetHandlerFunc(
  collectionClientInfoFind.handler
);
const collectionClientInfoGetHandler = asAnyContextSubsetHandlerFunc(
  collectionClientInfoGet.handler
);
const collectionClientInfoPatchHandler = asAnyContextSubsetHandlerFunc(
  collectionClientInfoPatch.handler
);
const collectionClientInfoRemoveHandler = asAnyContextSubsetHandlerFunc(
  collectionClientInfoRemove.handler
);
const collectionClientInfoUpdateHandler = asAnyContextSubsetHandlerFunc(
  collectionClientInfoUpdate.handler
);
const collectionClientInfoUpsertHandler = asAnyContextSubsetHandlerFunc(
  collectionClientInfoUpsert.handler
);
const collectionDistributedLockCreateHandler = asAnyContextSubsetHandlerFunc(
  collectionDistributedLockCreate.handler
);
const collectionDistributedLockFindHandler = asAnyContextSubsetHandlerFunc(
  collectionDistributedLockFind.handler
);
const collectionDistributedLockRemoveHandler = asAnyContextSubsetHandlerFunc(
  collectionDistributedLockRemove.handler
);
const collectionEmailRecordCreateHandler = asAnyContextSubsetHandlerFunc(
  collectionEmailRecordCreate.handler
);
const collectionEmailRecordCreateManyHandler = asAnyContextSubsetHandlerFunc(
  collectionEmailRecordCreateMany.handler
);
const collectionEmailRecordFindHandler = asAnyContextSubsetHandlerFunc(
  collectionEmailRecordFind.handler
);
const collectionEmailRecordPatchHandler = asAnyContextSubsetHandlerFunc(
  collectionEmailRecordPatch.handler
);
const collectionEmailRecordRemoveHandler = asAnyContextSubsetHandlerFunc(
  collectionEmailRecordRemove.handler
);
const collectionFeedbackRuleCreateHandler = asAnyContextSubsetHandlerFunc(
  collectionFeedbackRuleCreate.handler
);
const collectionFeedbackRuleFindHandler = asAnyContextSubsetHandlerFunc(
  collectionFeedbackRuleFind.handler
);
const collectionFeedbackRulePatchHandler = asAnyContextSubsetHandlerFunc(
  collectionFeedbackRulePatch.handler
);
const collectionFeedbackRuleRemoveHandler = asAnyContextSubsetHandlerFunc(
  collectionFeedbackRuleRemove.handler
);
const collectionFingerprintCreateHandler = asAnyContextSubsetHandlerFunc(
  collectionFingerprintCreate.handler
);
const collectionFingerprintFindHandler = asAnyContextSubsetHandlerFunc(
  collectionFingerprintFind.handler
);
const collectionFingerprintGetHandler = asAnyContextSubsetHandlerFunc(
  collectionFingerprintGet.handler
);
const collectionFingerprintPatchHandler = asAnyContextSubsetHandlerFunc(
  collectionFingerprintPatch.handler
);
const collectionFingerprintRemoveHandler = asAnyContextSubsetHandlerFunc(
  collectionFingerprintRemove.handler
);
const collectionFingerprintUpdateHandler = asAnyContextSubsetHandlerFunc(
  collectionFingerprintUpdate.handler
);
const collectionFingerprintUpsertHandler = asAnyContextSubsetHandlerFunc(
  collectionFingerprintUpsert.handler
);
const collectionGmailAddonExecutionStateCreateHandler =
  asAnyContextSubsetHandlerFunc(
    collectionGmailAddonExecutionStateCreate.handler
  );
const collectionGmailAddonExecutionStateGetHandler =
  asAnyContextSubsetHandlerFunc(collectionGmailAddonExecutionStateGet.handler);
const collectionGmailAddonExecutionStateUpsertHandler =
  asAnyContextSubsetHandlerFunc(
    collectionGmailAddonExecutionStateUpsert.handler
  );
const collectionHuntingSearchJobCreateHandler = asAnyContextSubsetHandlerFunc(
  collectionHuntingSearchJobCreate.handler
);
const collectionHuntingSearchJobFindHandler = asAnyContextSubsetHandlerFunc(
  collectionHuntingSearchJobFind.handler
);
const collectionHuntingSearchJobGetHandler = asAnyContextSubsetHandlerFunc(
  collectionHuntingSearchJobGet.handler
);
const collectionHuntingSearchJobPatchHandler = asAnyContextSubsetHandlerFunc(
  collectionHuntingSearchJobPatch.handler
);
const collectionHuntingSearchJobRemoveHandler = asAnyContextSubsetHandlerFunc(
  collectionHuntingSearchJobRemove.handler
);
const collectionHuntingSearchJobResultAddHuntingSearchJobIdHandler =
  asAnyContextSubsetHandlerFunc(
    collectionHuntingSearchJobResultAddHuntingSearchJobId.handler
  );
const collectionHuntingSearchJobResultCreateHandler =
  asAnyContextSubsetHandlerFunc(collectionHuntingSearchJobResultCreate.handler);
const collectionHuntingSearchJobResultCreateManyHandler =
  asAnyContextSubsetHandlerFunc(
    collectionHuntingSearchJobResultCreateMany.handler
  );
const collectionHuntingSearchJobResultFindHandler =
  asAnyContextSubsetHandlerFunc(collectionHuntingSearchJobResultFind.handler);
const collectionHuntingSearchJobResultGetHandler =
  asAnyContextSubsetHandlerFunc(collectionHuntingSearchJobResultGet.handler);
const collectionHuntingSearchJobResultPatchHandler =
  asAnyContextSubsetHandlerFunc(collectionHuntingSearchJobResultPatch.handler);
const collectionHuntingSearchJobResultRemoveHandler =
  asAnyContextSubsetHandlerFunc(collectionHuntingSearchJobResultRemove.handler);
const collectionIncidentBetaAggregateHandler = asAnyContextSubsetHandlerFunc(
  collectionIncidentBetaAggregate.handler
);
const collectionIncidentBetaCreateHandler = asAnyContextSubsetHandlerFunc(
  collectionIncidentBetaCreate.handler
);
const collectionIncidentBetaFindHandler = asAnyContextSubsetHandlerFunc(
  collectionIncidentBetaFind.handler
);
const collectionIncidentBetaGetHandler = asAnyContextSubsetHandlerFunc(
  collectionIncidentBetaGet.handler
);
const collectionIncidentBetaPatchHandler = asAnyContextSubsetHandlerFunc(
  collectionIncidentBetaPatch.handler
);
const collectionIncidentBetaRemoveHandler = asAnyContextSubsetHandlerFunc(
  collectionIncidentBetaRemove.handler
);
const collectionIncidentBetaUpdateHandler = asAnyContextSubsetHandlerFunc(
  collectionIncidentBetaUpdate.handler
);
const collectionIncidentBetaUpsertHandler = asAnyContextSubsetHandlerFunc(
  collectionIncidentBetaUpsert.handler
);
const collectionMarkerCreateHandler = asAnyContextSubsetHandlerFunc(
  collectionMarkerCreate.handler
);
const collectionMarkerFindHandler = asAnyContextSubsetHandlerFunc(
  collectionMarkerFind.handler
);
const collectionMarkerGetHandler = asAnyContextSubsetHandlerFunc(
  collectionMarkerGet.handler
);
const collectionMarkerPatchHandler = asAnyContextSubsetHandlerFunc(
  collectionMarkerPatch.handler
);
const collectionMarkerRemoveHandler = asAnyContextSubsetHandlerFunc(
  collectionMarkerRemove.handler
);
const collectionMarkerUpdateHandler = asAnyContextSubsetHandlerFunc(
  collectionMarkerUpdate.handler
);
const collectionMarkerUpsertHandler = asAnyContextSubsetHandlerFunc(
  collectionMarkerUpsert.handler
);
const collectionMigrationsCreateHandler = asAnyContextSubsetHandlerFunc(
  collectionMigrationsCreate.handler
);
const collectionMigrationsGetHandler = asAnyContextSubsetHandlerFunc(
  collectionMigrationsGet.handler
);
const collectionMigrationsPatchHandler = asAnyContextSubsetHandlerFunc(
  collectionMigrationsPatch.handler
);
const collectionNpsAnswerCreateHandler = asAnyContextSubsetHandlerFunc(
  collectionNpsAnswerCreate.handler
);
const collectionNpsAnswerFindHandler = asAnyContextSubsetHandlerFunc(
  collectionNpsAnswerFind.handler
);
const collectionOneTimePasswordCreateHandler = asAnyContextSubsetHandlerFunc(
  collectionOneTimePasswordCreate.handler
);
const collectionOneTimePasswordFindHandler = asAnyContextSubsetHandlerFunc(
  collectionOneTimePasswordFind.handler
);
const collectionOneTimePasswordRemoveHandler = asAnyContextSubsetHandlerFunc(
  collectionOneTimePasswordRemove.handler
);
const collectionOrganizationAddFeatureForOrganizationHandler =
  asAnyContextSubsetHandlerFunc(
    collectionOrganizationAddFeatureForOrganization.handler
  );
const collectionOrganizationAddGoogleClientIdHandler =
  asAnyContextSubsetHandlerFunc(
    collectionOrganizationAddGoogleClientId.handler
  );
const collectionOrganizationCreateHandler = asAnyContextSubsetHandlerFunc(
  collectionOrganizationCreate.handler
);
const collectionOrganizationFindHandler = asAnyContextSubsetHandlerFunc(
  collectionOrganizationFind.handler
);
const collectionOrganizationGetHandler = asAnyContextSubsetHandlerFunc(
  collectionOrganizationGet.handler
);
const collectionOrganizationGetByDomainHandler = asAnyContextSubsetHandlerFunc(
  collectionOrganizationGetByDomain.handler
);
const collectionOrganizationPatchHandler = asAnyContextSubsetHandlerFunc(
  collectionOrganizationPatch.handler
);
const collectionOrganizationRemoveHandler = asAnyContextSubsetHandlerFunc(
  collectionOrganizationRemove.handler
);
const collectionOrganizationRemoveFeatureFromOrganizationHandler =
  asAnyContextSubsetHandlerFunc(
    collectionOrganizationRemoveFeatureFromOrganization.handler
  );
const collectionOrganizationRemoveGoogleClientIdHandler =
  asAnyContextSubsetHandlerFunc(
    collectionOrganizationRemoveGoogleClientId.handler
  );
const collectionOrganizationOnboardingTaskCreateHandler =
  asAnyContextSubsetHandlerFunc(
    collectionOrganizationOnboardingTaskCreate.handler
  );
const collectionOrganizationOnboardingTaskFindHandler =
  asAnyContextSubsetHandlerFunc(
    collectionOrganizationOnboardingTaskFind.handler
  );
const collectionOrganizationOnboardingTaskPatchHandler =
  asAnyContextSubsetHandlerFunc(
    collectionOrganizationOnboardingTaskPatch.handler
  );
const collectionOrganizationOnboardingTaskRemoveHandler =
  asAnyContextSubsetHandlerFunc(
    collectionOrganizationOnboardingTaskRemove.handler
  );
const collectionOrganizationTrainingRuleFindHandler =
  asAnyContextSubsetHandlerFunc(collectionOrganizationTrainingRuleFind.handler);
const collectionOrganizationTrainingRuleGetHandler =
  asAnyContextSubsetHandlerFunc(collectionOrganizationTrainingRuleGet.handler);
const collectionOrganizationTrainingRuleRemoveHandler =
  asAnyContextSubsetHandlerFunc(
    collectionOrganizationTrainingRuleRemove.handler
  );
const collectionOrganizationTrainingRuleUpsertHandler =
  asAnyContextSubsetHandlerFunc(
    collectionOrganizationTrainingRuleUpsert.handler
  );
const collectionPluginCreateHandler = asAnyContextSubsetHandlerFunc(
  collectionPluginCreate.handler
);
const collectionPluginFindHandler = asAnyContextSubsetHandlerFunc(
  collectionPluginFind.handler
);
const collectionPluginGetHandler = asAnyContextSubsetHandlerFunc(
  collectionPluginGet.handler
);
const collectionPluginPatchHandler = asAnyContextSubsetHandlerFunc(
  collectionPluginPatch.handler
);
const collectionPluginRemoveHandler = asAnyContextSubsetHandlerFunc(
  collectionPluginRemove.handler
);
const collectionPluginUpdateHandler = asAnyContextSubsetHandlerFunc(
  collectionPluginUpdate.handler
);
const collectionPluginUpsertHandler = asAnyContextSubsetHandlerFunc(
  collectionPluginUpsert.handler
);
const collectionQuestAggregateHandler = asAnyContextSubsetHandlerFunc(
  collectionQuestAggregate.handler
);
const collectionQuestCreateHandler = asAnyContextSubsetHandlerFunc(
  collectionQuestCreate.handler
);
const collectionQuestFindHandler = asAnyContextSubsetHandlerFunc(
  collectionQuestFind.handler
);
const collectionQuestGetHandler = asAnyContextSubsetHandlerFunc(
  collectionQuestGet.handler
);
const collectionQuestPatchHandler = asAnyContextSubsetHandlerFunc(
  collectionQuestPatch.handler
);
const collectionQuestRemoveHandler = asAnyContextSubsetHandlerFunc(
  collectionQuestRemove.handler
);
const collectionQuestUpdateHandler = asAnyContextSubsetHandlerFunc(
  collectionQuestUpdate.handler
);
const collectionQuestUpsertHandler = asAnyContextSubsetHandlerFunc(
  collectionQuestUpsert.handler
);
const collectionQuestTemplateCreateHandler = asAnyContextSubsetHandlerFunc(
  collectionQuestTemplateCreate.handler
);
const collectionQuestTemplateFindHandler = asAnyContextSubsetHandlerFunc(
  collectionQuestTemplateFind.handler
);
const collectionQuestTemplateGetHandler = asAnyContextSubsetHandlerFunc(
  collectionQuestTemplateGet.handler
);
const collectionQuestTemplatePatchHandler = asAnyContextSubsetHandlerFunc(
  collectionQuestTemplatePatch.handler
);
const collectionQuestTemplateRemoveHandler = asAnyContextSubsetHandlerFunc(
  collectionQuestTemplateRemove.handler
);
const collectionQuestTemplateUpdateHandler = asAnyContextSubsetHandlerFunc(
  collectionQuestTemplateUpdate.handler
);
const collectionQuestTemplateUpsertHandler = asAnyContextSubsetHandlerFunc(
  collectionQuestTemplateUpsert.handler
);
const collectionQuizModuleCreateHandler = asAnyContextSubsetHandlerFunc(
  collectionQuizModuleCreate.handler
);
const collectionQuizModuleFindHandler = asAnyContextSubsetHandlerFunc(
  collectionQuizModuleFind.handler
);
const collectionQuizModuleGetHandler = asAnyContextSubsetHandlerFunc(
  collectionQuizModuleGet.handler
);
const collectionQuizModulePatchHandler = asAnyContextSubsetHandlerFunc(
  collectionQuizModulePatch.handler
);
const collectionQuizModuleRemoveHandler = asAnyContextSubsetHandlerFunc(
  collectionQuizModuleRemove.handler
);
const collectionQuizModuleUpdateHandler = asAnyContextSubsetHandlerFunc(
  collectionQuizModuleUpdate.handler
);
const collectionQuizModuleUpsertHandler = asAnyContextSubsetHandlerFunc(
  collectionQuizModuleUpsert.handler
);
const collectionQuizTemplateCreateHandler = asAnyContextSubsetHandlerFunc(
  collectionQuizTemplateCreate.handler
);
const collectionQuizTemplateFindHandler = asAnyContextSubsetHandlerFunc(
  collectionQuizTemplateFind.handler
);
const collectionQuizTemplateGetHandler = asAnyContextSubsetHandlerFunc(
  collectionQuizTemplateGet.handler
);
const collectionQuizTemplatePatchHandler = asAnyContextSubsetHandlerFunc(
  collectionQuizTemplatePatch.handler
);
const collectionQuizTemplateRemoveHandler = asAnyContextSubsetHandlerFunc(
  collectionQuizTemplateRemove.handler
);
const collectionQuizTemplateUpdateHandler = asAnyContextSubsetHandlerFunc(
  collectionQuizTemplateUpdate.handler
);
const collectionRankFindHandler = asAnyContextSubsetHandlerFunc(
  collectionRankFind.handler
);
const collectionRefreshTokenCreateHandler = asAnyContextSubsetHandlerFunc(
  collectionRefreshTokenCreate.handler
);
const collectionRefreshTokenFindHandler = asAnyContextSubsetHandlerFunc(
  collectionRefreshTokenFind.handler
);
const collectionRefreshTokenRemoveHandler = asAnyContextSubsetHandlerFunc(
  collectionRefreshTokenRemove.handler
);
const collectionTagFindHandler = asAnyContextSubsetHandlerFunc(
  collectionTagFind.handler
);
const collectionTagFindVectorTagHandler = asAnyContextSubsetHandlerFunc(
  collectionTagFindVectorTag.handler
);
const collectionTaskCreateHandler = asAnyContextSubsetHandlerFunc(
  collectionTaskCreate.handler
);
const collectionTaskCreateManyHandler = asAnyContextSubsetHandlerFunc(
  collectionTaskCreateMany.handler
);
const collectionTaskFindHandler = asAnyContextSubsetHandlerFunc(
  collectionTaskFind.handler
);
const collectionTaskGetHandler = asAnyContextSubsetHandlerFunc(
  collectionTaskGet.handler
);
const collectionTaskPatchHandler = asAnyContextSubsetHandlerFunc(
  collectionTaskPatch.handler
);
const collectionTaskRemoveHandler = asAnyContextSubsetHandlerFunc(
  collectionTaskRemove.handler
);
const collectionTaskUpdateHandler = asAnyContextSubsetHandlerFunc(
  collectionTaskUpdate.handler
);
const collectionTaskUpsertHandler = asAnyContextSubsetHandlerFunc(
  collectionTaskUpsert.handler
);
const collectionTaskGroupCreateHandler = asAnyContextSubsetHandlerFunc(
  collectionTaskGroupCreate.handler
);
const collectionTaskGroupFindHandler = asAnyContextSubsetHandlerFunc(
  collectionTaskGroupFind.handler
);
const collectionTaskGroupGetHandler = asAnyContextSubsetHandlerFunc(
  collectionTaskGroupGet.handler
);
const collectionTaskGroupPatchHandler = asAnyContextSubsetHandlerFunc(
  collectionTaskGroupPatch.handler
);
const collectionTaskGroupRemoveHandler = asAnyContextSubsetHandlerFunc(
  collectionTaskGroupRemove.handler
);
const collectionTaskGroupUpdateHandler = asAnyContextSubsetHandlerFunc(
  collectionTaskGroupUpdate.handler
);
const collectionTaskGroupUpsertHandler = asAnyContextSubsetHandlerFunc(
  collectionTaskGroupUpsert.handler
);
const collectionThreatAggregateHandler = asAnyContextSubsetHandlerFunc(
  collectionThreatAggregate.handler
);
const collectionThreatCreateHandler = asAnyContextSubsetHandlerFunc(
  collectionThreatCreate.handler
);
const collectionThreatFindHandler = asAnyContextSubsetHandlerFunc(
  collectionThreatFind.handler
);
const collectionThreatGetHandler = asAnyContextSubsetHandlerFunc(
  collectionThreatGet.handler
);
const collectionThreatPatchHandler = asAnyContextSubsetHandlerFunc(
  collectionThreatPatch.handler
);
const collectionThreatRemoveHandler = asAnyContextSubsetHandlerFunc(
  collectionThreatRemove.handler
);
const collectionThreatUpdateHandler = asAnyContextSubsetHandlerFunc(
  collectionThreatUpdate.handler
);
const collectionThreatUpsertHandler = asAnyContextSubsetHandlerFunc(
  collectionThreatUpsert.handler
);
const collectionThreatObservableCreateHandler = asAnyContextSubsetHandlerFunc(
  collectionThreatObservableCreate.handler
);
const collectionThreatObservableFindHandler = asAnyContextSubsetHandlerFunc(
  collectionThreatObservableFind.handler
);
const collectionThreatObservableGetHandler = asAnyContextSubsetHandlerFunc(
  collectionThreatObservableGet.handler
);
const collectionThreatObservablePatchHandler = asAnyContextSubsetHandlerFunc(
  collectionThreatObservablePatch.handler
);
const collectionThreatObservableRemoveHandler = asAnyContextSubsetHandlerFunc(
  collectionThreatObservableRemove.handler
);
const collectionThreatObservableUpdateHandler = asAnyContextSubsetHandlerFunc(
  collectionThreatObservableUpdate.handler
);
const collectionThreatObservableUpsertHandler = asAnyContextSubsetHandlerFunc(
  collectionThreatObservableUpsert.handler
);
const collectionThreatResourceFindHandler = asAnyContextSubsetHandlerFunc(
  collectionThreatResourceFind.handler
);
const collectionThreatResourceUpsertHandler = asAnyContextSubsetHandlerFunc(
  collectionThreatResourceUpsert.handler
);
const collectionThreatSimilarityGroupCreateHandler =
  asAnyContextSubsetHandlerFunc(collectionThreatSimilarityGroupCreate.handler);
const collectionThreatSimilarityGroupFindHandler =
  asAnyContextSubsetHandlerFunc(collectionThreatSimilarityGroupFind.handler);
const collectionThreatSimilarityGroupGetHandler = asAnyContextSubsetHandlerFunc(
  collectionThreatSimilarityGroupGet.handler
);
const collectionThreatSimilarityGroupPatchHandler =
  asAnyContextSubsetHandlerFunc(collectionThreatSimilarityGroupPatch.handler);
const collectionThreatSimilarityGroupRemoveHandler =
  asAnyContextSubsetHandlerFunc(collectionThreatSimilarityGroupRemove.handler);
const collectionThreatSimilarityGroupUpsertHandler =
  asAnyContextSubsetHandlerFunc(collectionThreatSimilarityGroupUpsert.handler);
const collectionTranslationCreateHandler = asAnyContextSubsetHandlerFunc(
  collectionTranslationCreate.handler
);
const collectionTranslationFindHandler = asAnyContextSubsetHandlerFunc(
  collectionTranslationFind.handler
);
const collectionTranslationGetHandler = asAnyContextSubsetHandlerFunc(
  collectionTranslationGet.handler
);
const collectionTranslationPatchHandler = asAnyContextSubsetHandlerFunc(
  collectionTranslationPatch.handler
);
const collectionTranslationRemoveHandler = asAnyContextSubsetHandlerFunc(
  collectionTranslationRemove.handler
);
const collectionTranslationUpdateHandler = asAnyContextSubsetHandlerFunc(
  collectionTranslationUpdate.handler
);
const collectionTranslationUpsertHandler = asAnyContextSubsetHandlerFunc(
  collectionTranslationUpsert.handler
);
const collectionUserAddFeatureForUserHandler = asAnyContextSubsetHandlerFunc(
  collectionUserAddFeatureForUser.handler
);
const collectionUserAggregateHandler = asAnyContextSubsetHandlerFunc(
  collectionUserAggregate.handler
);
const collectionUserCreateHandler = asAnyContextSubsetHandlerFunc(
  collectionUserCreate.handler
);
const collectionUserDistinctHandler = asAnyContextSubsetHandlerFunc(
  collectionUserDistinct.handler
);
const collectionUserFindHandler = asAnyContextSubsetHandlerFunc(
  collectionUserFind.handler
);
const collectionUserFindAdminsByOrganizationIdHandler =
  asAnyContextSubsetHandlerFunc(
    collectionUserFindAdminsByOrganizationId.handler
  );
const collectionUserFindCoworkersByOrganizationIdHandler =
  asAnyContextSubsetHandlerFunc(
    collectionUserFindCoworkersByOrganizationId.handler
  );
const collectionUserGetHandler = asAnyContextSubsetHandlerFunc(
  collectionUserGet.handler
);
const collectionUserPatchHandler = asAnyContextSubsetHandlerFunc(
  collectionUserPatch.handler
);
const collectionUserRemoveHandler = asAnyContextSubsetHandlerFunc(
  collectionUserRemove.handler
);
const collectionUserRemoveFeatureFromUserHandler =
  asAnyContextSubsetHandlerFunc(collectionUserRemoveFeatureFromUser.handler);
const collectionUserUpdateHandler = asAnyContextSubsetHandlerFunc(
  collectionUserUpdate.handler
);
const collectionUserUpsertHandler = asAnyContextSubsetHandlerFunc(
  collectionUserUpsert.handler
);
const collectionUserFeedbackCreateHandler = asAnyContextSubsetHandlerFunc(
  collectionUserFeedbackCreate.handler
);
const collectionUserFeedbackFindHandler = asAnyContextSubsetHandlerFunc(
  collectionUserFeedbackFind.handler
);
const collectionUserFeedbackPatchHandler = asAnyContextSubsetHandlerFunc(
  collectionUserFeedbackPatch.handler
);
const collectionUserFeedbackRemoveHandler = asAnyContextSubsetHandlerFunc(
  collectionUserFeedbackRemove.handler
);
const collectionVectorCreateHandler = asAnyContextSubsetHandlerFunc(
  collectionVectorCreate.handler
);
const collectionVectorFindHandler = asAnyContextSubsetHandlerFunc(
  collectionVectorFind.handler
);
const collectionVectorGetHandler = asAnyContextSubsetHandlerFunc(
  collectionVectorGet.handler
);
const collectionVectorPatchHandler = asAnyContextSubsetHandlerFunc(
  collectionVectorPatch.handler
);
const collectionVectorRemoveHandler = asAnyContextSubsetHandlerFunc(
  collectionVectorRemove.handler
);
const collectionVectorUpdateHandler = asAnyContextSubsetHandlerFunc(
  collectionVectorUpdate.handler
);
const collectionVectorUpsertHandler = asAnyContextSubsetHandlerFunc(
  collectionVectorUpsert.handler
);
const dataDashProxyDashRequestsHandler = asAnyContextSubsetHandlerFunc(
  dataDashProxyDashRequests.handler
);
const gameChallengeUpdateForUserHandler = asAnyContextSubsetHandlerFunc(
  gameChallengeUpdateForUser.handler
);
const gameCycleFullHandler = asAnyContextSubsetHandlerFunc(
  gameCycleFull.handler
);
const gameCycleUserHandler = asAnyContextSubsetHandlerFunc(
  gameCycleUser.handler
);
const gameEmailInviteOrganizationsUnstartedUsersHandler =
  asAnyContextSubsetHandlerFunc(
    gameEmailInviteOrganizationsUnstartedUsers.handler
  );
const gameEmailSendActivationEmailHandler = asAnyContextSubsetHandlerFunc(
  gameEmailSendActivationEmail.handler
);
const gameEmailSendWelcomeEmailHandler = asAnyContextSubsetHandlerFunc(
  gameEmailSendWelcomeEmail.handler
);
const gameEngineGetQuestBasedOnLatestThemeHandler =
  asAnyContextSubsetHandlerFunc(gameEngineGetQuestBasedOnLatestTheme.handler);
const gameEngineGetTranslatedQuestHandler = asAnyContextSubsetHandlerFunc(
  gameEngineGetTranslatedQuest.handler
);
const gameEngineSelectNextQuestTemplateHandler = asAnyContextSubsetHandlerFunc(
  gameEngineSelectNextQuestTemplate.handler
);
const gameLeaderboardEnrichUserLeaderboardRowsHandler =
  asAnyContextSubsetHandlerFunc(
    gameLeaderboardEnrichUserLeaderboardRows.handler
  );
const gameLeaderboardGetCountryLeaderboardHandler =
  asAnyContextSubsetHandlerFunc(gameLeaderboardGetCountryLeaderboard.handler);
const gameLeaderboardGetLeaderboardHandler = asAnyContextSubsetHandlerFunc(
  gameLeaderboardGetLeaderboard.handler
);
const gameLeaderboardGetSimpleUserStarsLeaderboardHandler =
  asAnyContextSubsetHandlerFunc(
    gameLeaderboardGetSimpleUserStarsLeaderboard.handler
  );
const gameLeaderboardGetUserStarsLeaderboardHandler =
  asAnyContextSubsetHandlerFunc(gameLeaderboardGetUserStarsLeaderboard.handler);
const gameOrganizationScheduleReminderEmailsHandler =
  asAnyContextSubsetHandlerFunc(gameOrganizationScheduleReminderEmails.handler);
const gameOrganizationSetDemoModeHandler = asAnyContextSubsetHandlerFunc(
  gameOrganizationSetDemoMode.handler
);
const gameOrganizationUpdateAchievementAggregatesHandler =
  asAnyContextSubsetHandlerFunc(
    gameOrganizationUpdateAchievementAggregates.handler
  );
const gameOrganizationUpdateCountryLeaderboardAggregatesHandler =
  asAnyContextSubsetHandlerFunc(
    gameOrganizationUpdateCountryLeaderboardAggregates.handler
  );
const gameOrganizationUpdateUserCountByCountryAggregatesHandler =
  asAnyContextSubsetHandlerFunc(
    gameOrganizationUpdateUserCountByCountryAggregates.handler
  );
const gameQuestDeliverHandler = asAnyContextSubsetHandlerFunc(
  gameQuestDeliver.handler
);
const gameQuestExpireHandler = asAnyContextSubsetHandlerFunc(
  gameQuestExpire.handler
);
const gameQuestExpireAllHandler = asAnyContextSubsetHandlerFunc(
  gameQuestExpireAll.handler
);
const gameQuestFailHandler = asAnyContextSubsetHandlerFunc(
  gameQuestFail.handler
);
const gameQuestGetAttachmentHandler = asAnyContextSubsetHandlerFunc(
  gameQuestGetAttachment.handler
);
const gameQuestGetFailUrlHandler = asAnyContextSubsetHandlerFunc(
  gameQuestGetFailUrl.handler
);
const gameQuestGetResultUrlHandler = asAnyContextSubsetHandlerFunc(
  gameQuestGetResultUrl.handler
);
const gameQuestGetSignedFailUrlHandler = asAnyContextSubsetHandlerFunc(
  gameQuestGetSignedFailUrl.handler
);
const gameQuestGetSignedResultUrlHandler = asAnyContextSubsetHandlerFunc(
  gameQuestGetSignedResultUrl.handler
);
const gameQuestRegisterHandler = asAnyContextSubsetHandlerFunc(
  gameQuestRegister.handler
);
const gameQuestReportHandler = asAnyContextSubsetHandlerFunc(
  gameQuestReport.handler
);
const gameQuestReportWithMessageIdHandler = asAnyContextSubsetHandlerFunc(
  gameQuestReportWithMessageId.handler
);
const gameQuestTrackDeliveryHandler = asAnyContextSubsetHandlerFunc(
  gameQuestTrackDelivery.handler
);
const gameQuestTemplateCheckCompilabilityHandler =
  asAnyContextSubsetHandlerFunc(gameQuestTemplateCheckCompilability.handler);
const gameQuestTemplateCompileQuestTemplateEditorPreviewHandler =
  asAnyContextSubsetHandlerFunc(
    gameQuestTemplateCompileQuestTemplateEditorPreview.handler
  );
const gameQuestTemplateCompileQuestTemplatePreviewHandler =
  asAnyContextSubsetHandlerFunc(
    gameQuestTemplateCompileQuestTemplatePreview.handler
  );
const gameQuestTemplateCompileQuestTemplateStringHandler =
  asAnyContextSubsetHandlerFunc(
    gameQuestTemplateCompileQuestTemplateString.handler
  );
const gameQuestTemplateCompileQuestToVectorHandler =
  asAnyContextSubsetHandlerFunc(gameQuestTemplateCompileQuestToVector.handler);
const gameQuestTemplateGenerateFailureFunnelHandler =
  asAnyContextSubsetHandlerFunc(gameQuestTemplateGenerateFailureFunnel.handler);
const gameQuestTemplateGetDifficultyFactorsHandler =
  asAnyContextSubsetHandlerFunc(gameQuestTemplateGetDifficultyFactors.handler);
const gameQuestTemplateGetExampleContextHandler = asAnyContextSubsetHandlerFunc(
  gameQuestTemplateGetExampleContext.handler
);
const gameQuestTemplateUpdateStatisticsHandler = asAnyContextSubsetHandlerFunc(
  gameQuestTemplateUpdateStatistics.handler
);
const gameQuizActOnPreviewHandler = asAnyContextSubsetHandlerFunc(
  gameQuizActOnPreview.handler
);
const gameQuizActOnQuizObjectiveHandler = asAnyContextSubsetHandlerFunc(
  gameQuizActOnQuizObjective.handler
);
const gameQuizPreviewHandler = asAnyContextSubsetHandlerFunc(
  gameQuizPreview.handler
);
const gameQuizSelectNextForUserHandler = asAnyContextSubsetHandlerFunc(
  gameQuizSelectNextForUser.handler
);
const gameResultGetHandler = asAnyContextSubsetHandlerFunc(
  gameResultGet.handler
);
const gameResultSelectAndPatchSecondaryObjectiveHandler =
  asAnyContextSubsetHandlerFunc(
    gameResultSelectAndPatchSecondaryObjective.handler
  );
const gameUserClaimAchievementHandler = asAnyContextSubsetHandlerFunc(
  gameUserClaimAchievement.handler
);
const gameUserGetChangedRewardsHandler = asAnyContextSubsetHandlerFunc(
  gameUserGetChangedRewards.handler
);
const gameUserImposeDeliveryCooldownHandler = asAnyContextSubsetHandlerFunc(
  gameUserImposeDeliveryCooldown.handler
);
const gameUserLegacyOnboardUserHandler = asAnyContextSubsetHandlerFunc(
  gameUserLegacyOnboardUser.handler
);
const gameUserOnboardUserHandler = asAnyContextSubsetHandlerFunc(
  gameUserOnboardUser.handler
);
const gameUserRecalculateStatsHandler = asAnyContextSubsetHandlerFunc(
  gameUserRecalculateStats.handler
);
const gameUserResetUserGameHandler = asAnyContextSubsetHandlerFunc(
  gameUserResetUserGame.handler
);
const gameUserScheduleStatRecalculationTasksForOrganizationsHandler =
  asAnyContextSubsetHandlerFunc(
    gameUserScheduleStatRecalculationTasksForOrganizations.handler
  );
const gameUserSelfOnboardHandler = asAnyContextSubsetHandlerFunc(
  gameUserSelfOnboard.handler
);
const gameUserStartHandler = asAnyContextSubsetHandlerFunc(
  gameUserStart.handler
);
const gameUserStartGameForOrganizationsUnstartedUsersHandler =
  asAnyContextSubsetHandlerFunc(
    gameUserStartGameForOrganizationsUnstartedUsers.handler
  );
const gameUserStartGameForUsersWithAutomaticEnrollmentHandler =
  asAnyContextSubsetHandlerFunc(
    gameUserStartGameForUsersWithAutomaticEnrollment.handler
  );
const gameUserUpdateOnboardingEligibilityHandler =
  asAnyContextSubsetHandlerFunc(gameUserUpdateOnboardingEligibility.handler);
const gameUserUpdatePlayerStatsHandler = asAnyContextSubsetHandlerFunc(
  gameUserUpdatePlayerStats.handler
);
const infrastructureAuthCreateTokenHandler = asAnyContextSubsetHandlerFunc(
  infrastructureAuthCreateToken.handler
);
const infrastructureAuthGetSigninDataHandler = asAnyContextSubsetHandlerFunc(
  infrastructureAuthGetSigninData.handler
);
const infrastructureAuthResolveApiUserFromTokenHandler =
  asAnyContextSubsetHandlerFunc(
    infrastructureAuthResolveApiUserFromToken.handler
  );
const infrastructureAuthRevokeTokenHandler = asAnyContextSubsetHandlerFunc(
  infrastructureAuthRevokeToken.handler
);
const infrastructureAuthVerifyTokenAgainstWhitelistHandler =
  asAnyContextSubsetHandlerFunc(
    infrastructureAuthVerifyTokenAgainstWhitelist.handler
  );
const infrastructureDatabaseCleanupHandler = asAnyContextSubsetHandlerFunc(
  infrastructureDatabaseCleanup.handler
);
const infrastructureDatabaseRemovePreUploadedThreatsHandler =
  asAnyContextSubsetHandlerFunc(
    infrastructureDatabaseRemovePreUploadedThreats.handler
  );
const infrastructureDistributedLockAcquireLockHandler =
  asAnyContextSubsetHandlerFunc(
    infrastructureDistributedLockAcquireLock.handler
  );
const infrastructureDistributedLockReleaseLockHandler =
  asAnyContextSubsetHandlerFunc(
    infrastructureDistributedLockReleaseLock.handler
  );
const infrastructureDkimCreateHandler = asAnyContextSubsetHandlerFunc(
  infrastructureDkimCreate.handler
);
const infrastructureDkimGetSigningKeyHandler = asAnyContextSubsetHandlerFunc(
  infrastructureDkimGetSigningKey.handler
);
const infrastructureHealthAliveHandler = asAnyContextSubsetHandlerFunc(
  infrastructureHealthAlive.handler
);
const infrastructureHealthReadyHandler = asAnyContextSubsetHandlerFunc(
  infrastructureHealthReady.handler
);
const infrastructureHoxHashCompareHandler = asAnyContextSubsetHandlerFunc(
  infrastructureHoxHashCompare.handler
);
const infrastructureHoxHashCompareBatchedHandler =
  asAnyContextSubsetHandlerFunc(infrastructureHoxHashCompareBatched.handler);
const infrastructureHoxHashComputeFuzzyHashHandler =
  asAnyContextSubsetHandlerFunc(infrastructureHoxHashComputeFuzzyHash.handler);
const infrastructureHoxUrlCreateShortLinkHandler =
  asAnyContextSubsetHandlerFunc(infrastructureHoxUrlCreateShortLink.handler);
const infrastructureHtmlToImageCreateImageFromHtmlHandler =
  asAnyContextSubsetHandlerFunc(
    infrastructureHtmlToImageCreateImageFromHtml.handler
  );
const infrastructureIdGenerateHumanReadableIdHandler =
  asAnyContextSubsetHandlerFunc(
    infrastructureIdGenerateHumanReadableId.handler
  );
const infrastructureJwtCreateHandler = asAnyContextSubsetHandlerFunc(
  infrastructureJwtCreate.handler
);
const infrastructureJwtDecodeHandler = asAnyContextSubsetHandlerFunc(
  infrastructureJwtDecode.handler
);
const infrastructureJwtSignUrlForCurrentUserHandler =
  asAnyContextSubsetHandlerFunc(infrastructureJwtSignUrlForCurrentUser.handler);
const infrastructureJwtVerifyHandler = asAnyContextSubsetHandlerFunc(
  infrastructureJwtVerify.handler
);
const infrastructureJwtVerifySignedUrlHandler = asAnyContextSubsetHandlerFunc(
  infrastructureJwtVerifySignedUrl.handler
);
const infrastructureLoggerLogHandler = asAnyContextSubsetHandlerFunc(
  infrastructureLoggerLog.handler
);
const infrastructureMigrationBackfillOnboardingEventsHandler =
  asAnyContextSubsetHandlerFunc(
    infrastructureMigrationBackfillOnboardingEvents.handler
  );
const infrastructureMigrationBackfillQuestMarkerStarsHandler =
  asAnyContextSubsetHandlerFunc(
    infrastructureMigrationBackfillQuestMarkerStars.handler
  );
const infrastructureMigrationBackfillUserQuestMarkerStarsHandler =
  asAnyContextSubsetHandlerFunc(
    infrastructureMigrationBackfillUserQuestMarkerStars.handler
  );
const infrastructureMigrationEnrichPreviouslyFailedThreatsHandler =
  asAnyContextSubsetHandlerFunc(
    infrastructureMigrationEnrichPreviouslyFailedThreats.handler
  );
const infrastructureMigrationSplitHopsHandler = asAnyContextSubsetHandlerFunc(
  infrastructureMigrationSplitHops.handler
);
const infrastructureMigrationV175FixThreatHeadersHandler =
  asAnyContextSubsetHandlerFunc(
    infrastructureMigrationV175FixThreatHeaders.handler
  );
const infrastructureProfileCapturePerformanceProfileHandler =
  asAnyContextSubsetHandlerFunc(
    infrastructureProfileCapturePerformanceProfile.handler
  );
const integrationAzureGetResourceTemplateHandler =
  asAnyContextSubsetHandlerFunc(integrationAzureGetResourceTemplate.handler);
const integrationAzureGetResourceTemplateUrlHandler =
  asAnyContextSubsetHandlerFunc(integrationAzureGetResourceTemplateUrl.handler);
const integrationBitlyGetUrlHandler = asAnyContextSubsetHandlerFunc(
  integrationBitlyGetUrl.handler
);
const integrationCloudinarySignUploadHandler = asAnyContextSubsetHandlerFunc(
  integrationCloudinarySignUpload.handler
);
const integrationDnsLookupHandler = asAnyContextSubsetHandlerFunc(
  integrationDnsLookup.handler
);
const integrationDnsLookupMxHandler = asAnyContextSubsetHandlerFunc(
  integrationDnsLookupMx.handler
);
const integrationDnsValidateSpfHandler = asAnyContextSubsetHandlerFunc(
  integrationDnsValidateSpf.handler
);
const integrationEmailBuildHandler = asAnyContextSubsetHandlerFunc(
  integrationEmailBuild.handler
);
const integrationEmailDeliverHandler = asAnyContextSubsetHandlerFunc(
  integrationEmailDeliver.handler
);
const integrationEmailImposeDeliveryLimitHandler =
  asAnyContextSubsetHandlerFunc(integrationEmailImposeDeliveryLimit.handler);
const integrationEmailSendHandler = asAnyContextSubsetHandlerFunc(
  integrationEmailSend.handler
);
const integrationEmailTrackDeliveryHandler = asAnyContextSubsetHandlerFunc(
  integrationEmailTrackDelivery.handler
);
const integrationGmailFetchEmailDeliveryAccessTokenHandler =
  asAnyContextSubsetHandlerFunc(
    integrationGmailFetchEmailDeliveryAccessToken.handler
  );
const integrationGmailGetApiCredentialsHandler = asAnyContextSubsetHandlerFunc(
  integrationGmailGetApiCredentials.handler
);
const integrationGmailInsertMessageHandler = asAnyContextSubsetHandlerFunc(
  integrationGmailInsertMessage.handler
);
const integrationGoogleCloudKmsDecryptAsymmetricHandler =
  asAnyContextSubsetHandlerFunc(
    integrationGoogleCloudKmsDecryptAsymmetric.handler
  );
const integrationGoogleCloudKmsGetPublicKeyHandler =
  asAnyContextSubsetHandlerFunc(integrationGoogleCloudKmsGetPublicKey.handler);
const integrationGoogleCloudStorageDeleteFileHandler =
  asAnyContextSubsetHandlerFunc(
    integrationGoogleCloudStorageDeleteFile.handler
  );
const integrationGoogleCloudStorageDownloadFileHandler =
  asAnyContextSubsetHandlerFunc(
    integrationGoogleCloudStorageDownloadFile.handler
  );
const integrationGoogleCloudStorageGetSignedUrlHandler =
  asAnyContextSubsetHandlerFunc(
    integrationGoogleCloudStorageGetSignedUrl.handler
  );
const integrationGoogleCloudStorageListFilesHandler =
  asAnyContextSubsetHandlerFunc(integrationGoogleCloudStorageListFiles.handler);
const integrationGoogleCloudStorageUploadHandler =
  asAnyContextSubsetHandlerFunc(integrationGoogleCloudStorageUpload.handler);
const integrationHttpRequestHandler = asAnyContextSubsetHandlerFunc(
  integrationHttpRequest.handler
);
const integrationVirustotalAugmentFetchEphemeralUrlHandler =
  asAnyContextSubsetHandlerFunc(
    integrationVirustotalAugmentFetchEphemeralUrl.handler
  );
const integrationZendeskCreateTokenHandler = asAnyContextSubsetHandlerFunc(
  integrationZendeskCreateToken.handler
);
const integrationZendeskRedirectHandler = asAnyContextSubsetHandlerFunc(
  integrationZendeskRedirect.handler
);
const internalDiagnosticsDebugEngineHeuristicsHandler =
  asAnyContextSubsetHandlerFunc(
    internalDiagnosticsDebugEngineHeuristics.handler
  );
const internalDiagnosticsDebugQuestEngineHandler =
  asAnyContextSubsetHandlerFunc(internalDiagnosticsDebugQuestEngine.handler);
const internalExperimentsInitOrGetUserSplitTestCaseHandler =
  asAnyContextSubsetHandlerFunc(
    internalExperimentsInitOrGetUserSplitTestCase.handler
  );
const internalFeaturesHasFeatureHandler = asAnyContextSubsetHandlerFunc(
  internalFeaturesHasFeature.handler
);
const internalFeaturesHasFeaturesHandler = asAnyContextSubsetHandlerFunc(
  internalFeaturesHasFeatures.handler
);
const internalFeaturesTrackOrganizationFeaturesHandler =
  asAnyContextSubsetHandlerFunc(
    internalFeaturesTrackOrganizationFeatures.handler
  );
const intlTranslationsGetAllHandler = asAnyContextSubsetHandlerFunc(
  intlTranslationsGetAll.handler
);
const intlTranslationsGetCdnTranslationsHandler = asAnyContextSubsetHandlerFunc(
  intlTranslationsGetCdnTranslations.handler
);
const intlTranslationsGetDatabaseSourceMessagesHandler =
  asAnyContextSubsetHandlerFunc(
    intlTranslationsGetDatabaseSourceMessages.handler
  );
const intlTranslationsGetStaticSourceMessagesHandler =
  asAnyContextSubsetHandlerFunc(
    intlTranslationsGetStaticSourceMessages.handler
  );
const intlTranslationsSyncTranslationsHandler = asAnyContextSubsetHandlerFunc(
  intlTranslationsSyncTranslations.handler
);
const intlTranslationsUploadDynamicTranslationsHandler =
  asAnyContextSubsetHandlerFunc(
    intlTranslationsUploadDynamicTranslations.handler
  );
const legacyFingerprintUserUpdateHandler = asAnyContextSubsetHandlerFunc(
  legacyFingerprintUserUpdate.handler
);
const legacyMarkerFactoryCreateHandler = asAnyContextSubsetHandlerFunc(
  legacyMarkerFactoryCreate.handler
);
const legacyMarkerFactoryRemoveHandler = asAnyContextSubsetHandlerFunc(
  legacyMarkerFactoryRemove.handler
);
const legacyMarkerFactoryUpdateHandler = asAnyContextSubsetHandlerFunc(
  legacyMarkerFactoryUpdate.handler
);
const legacyQuestMarkerReviewCreateHandler = asAnyContextSubsetHandlerFunc(
  legacyQuestMarkerReviewCreate.handler
);
const legacySendQuestToOrganizationCreateHandler =
  asAnyContextSubsetHandlerFunc(legacySendQuestToOrganizationCreate.handler);
const legacySendQuestToUserCreateHandler = asAnyContextSubsetHandlerFunc(
  legacySendQuestToUserCreate.handler
);
const legacyThreatObservableTaskCreateHandler = asAnyContextSubsetHandlerFunc(
  legacyThreatObservableTaskCreate.handler
);
const legacyThreatObservableTaskUpdateHandler = asAnyContextSubsetHandlerFunc(
  legacyThreatObservableTaskUpdate.handler
);
const legacyThreatObservableTaskUpsertHandler = asAnyContextSubsetHandlerFunc(
  legacyThreatObservableTaskUpsert.handler
);
const legacyUserTagCreatorCreateHandler = asAnyContextSubsetHandlerFunc(
  legacyUserTagCreatorCreate.handler
);
const organizationDomainAddHandler = asAnyContextSubsetHandlerFunc(
  organizationDomainAdd.handler
);
const organizationDomainRemoveHandler = asAnyContextSubsetHandlerFunc(
  organizationDomainRemove.handler
);
const organizationDomainUpdateHandler = asAnyContextSubsetHandlerFunc(
  organizationDomainUpdate.handler
);
const organizationQuizGetModulesHandler = asAnyContextSubsetHandlerFunc(
  organizationQuizGetModules.handler
);
const organizationQuizSyncOrgModuleStateHandler = asAnyContextSubsetHandlerFunc(
  organizationQuizSyncOrgModuleState.handler
);
const organizationQuizUpsertModuleHandler = asAnyContextSubsetHandlerFunc(
  organizationQuizUpsertModule.handler
);
const organizationQuizUpsertModuleTemplateHandler =
  asAnyContextSubsetHandlerFunc(organizationQuizUpsertModuleTemplate.handler);
const pluginActionClickHandler = asAnyContextSubsetHandlerFunc(
  pluginActionClick.handler
);
const pluginActionHandleActionHandler = asAnyContextSubsetHandlerFunc(
  pluginActionHandleAction.handler
);
const pluginActionReportQuestHandler = asAnyContextSubsetHandlerFunc(
  pluginActionReportQuest.handler
);
const pluginActionStartHandler = asAnyContextSubsetHandlerFunc(
  pluginActionStart.handler
);
const pluginActionStartGameHandler = asAnyContextSubsetHandlerFunc(
  pluginActionStartGame.handler
);
const pluginActionUploadHandler = asAnyContextSubsetHandlerFunc(
  pluginActionUpload.handler
);
const pluginResponseUnknownUserHandler = asAnyContextSubsetHandlerFunc(
  pluginResponseUnknownUser.handler
);
const questTemplateBenchmarkFindTemplatesHandler =
  asAnyContextSubsetHandlerFunc(questTemplateBenchmarkFindTemplates.handler);
const questTemplateSearchFindQuestTemplatesBySearchStringHandler =
  asAnyContextSubsetHandlerFunc(
    questTemplateSearchFindQuestTemplatesBySearchString.handler
  );
const securityValidationSanitizeHtmlHandler = asAnyContextSubsetHandlerFunc(
  securityValidationSanitizeHtml.handler
);
const templatingHandlebarsCompileTemplateHandler =
  asAnyContextSubsetHandlerFunc(templatingHandlebarsCompileTemplate.handler);
const templatingHandlebarsParseTemplateHandler = asAnyContextSubsetHandlerFunc(
  templatingHandlebarsParseTemplate.handler
);
const threatAnalysisAssignHandler = asAnyContextSubsetHandlerFunc(
  threatAnalysisAssign.handler
);
const threatAnalysisCalculateStatisticsHandler = asAnyContextSubsetHandlerFunc(
  threatAnalysisCalculateStatistics.handler
);
const threatAnalysisCalculateTrendHistogramHandler =
  asAnyContextSubsetHandlerFunc(threatAnalysisCalculateTrendHistogram.handler);
const threatAnalysisCallMlModelWithThreatHandler =
  asAnyContextSubsetHandlerFunc(threatAnalysisCallMlModelWithThreat.handler);
const threatAnalysisGetPrioritisedListOfAnalysableThreatsHandler =
  asAnyContextSubsetHandlerFunc(
    threatAnalysisGetPrioritisedListOfAnalysableThreats.handler
  );
const threatAnalysisRateSimilarityGroupHandler = asAnyContextSubsetHandlerFunc(
  threatAnalysisRateSimilarityGroup.handler
);
const threatAnalysisRateThreatHandler = asAnyContextSubsetHandlerFunc(
  threatAnalysisRateThreat.handler
);
const threatCortexAnalyzeHandler = asAnyContextSubsetHandlerFunc(
  threatCortexAnalyze.handler
);
const threatCortexGetAnalyzersHandler = asAnyContextSubsetHandlerFunc(
  threatCortexGetAnalyzers.handler
);
const threatCortexGetJobReportHandler = asAnyContextSubsetHandlerFunc(
  threatCortexGetJobReport.handler
);
const threatFeedbackSendFeedbackToUserHandler = asAnyContextSubsetHandlerFunc(
  threatFeedbackSendFeedbackToUser.handler
);
const threatFeedbackStartBatchedThreatFeedbackHandler =
  asAnyContextSubsetHandlerFunc(
    threatFeedbackStartBatchedThreatFeedback.handler
  );
const threatHuntingDeleteEmailHandler = asAnyContextSubsetHandlerFunc(
  threatHuntingDeleteEmail.handler
);
const threatHuntingGetSearchResultsHandler = asAnyContextSubsetHandlerFunc(
  threatHuntingGetSearchResults.handler
);
const threatHuntingInitializeSettingsHandler = asAnyContextSubsetHandlerFunc(
  threatHuntingInitializeSettings.handler
);
const threatHuntingRevertEmailDeletionHandler = asAnyContextSubsetHandlerFunc(
  threatHuntingRevertEmailDeletion.handler
);
const threatHuntingStartSearchHandler = asAnyContextSubsetHandlerFunc(
  threatHuntingStartSearch.handler
);
const threatHuntingTimeoutOldHuntingSearchJobsHandler =
  asAnyContextSubsetHandlerFunc(
    threatHuntingTimeoutOldHuntingSearchJobs.handler
  );
const threatPipelineAssignSimilarityGroupHandler =
  asAnyContextSubsetHandlerFunc(threatPipelineAssignSimilarityGroup.handler);
const threatPipelineEnrichThreatHandler = asAnyContextSubsetHandlerFunc(
  threatPipelineEnrichThreat.handler
);
const threatPipelineEscalateHandler = asAnyContextSubsetHandlerFunc(
  threatPipelineEscalate.handler
);
const threatPipelineRateAutomaticallyHandler = asAnyContextSubsetHandlerFunc(
  threatPipelineRateAutomatically.handler
);
const threatPipelineRunPipelineForThreatsHandler =
  asAnyContextSubsetHandlerFunc(threatPipelineRunPipelineForThreats.handler);
const threatPipelineUpdateIncidentsHandler = asAnyContextSubsetHandlerFunc(
  threatPipelineUpdateIncidents.handler
);
const threatRulesEvaluateExpressionHandler = asAnyContextSubsetHandlerFunc(
  threatRulesEvaluateExpression.handler
);
const threatSearchFindIncidentsBySearchStringHandler =
  asAnyContextSubsetHandlerFunc(
    threatSearchFindIncidentsBySearchString.handler
  );
const threatSearchFindThreatsBySearchStringHandler =
  asAnyContextSubsetHandlerFunc(threatSearchFindThreatsBySearchString.handler);
const userAdminActionSendQuestHandler = asAnyContextSubsetHandlerFunc(
  userAdminActionSendQuest.handler
);
const userBulkSendQuestHandler = asAnyContextSubsetHandlerFunc(
  userBulkSendQuest.handler
);
const userBulkActionFanOutHandler = asAnyContextSubsetHandlerFunc(
  userBulkActionFanOut.handler
);
const userEmailInviteUserHandler = asAnyContextSubsetHandlerFunc(
  userEmailInviteUser.handler
);
const userEnrichmentAddGeolocationHandler = asAnyContextSubsetHandlerFunc(
  userEnrichmentAddGeolocation.handler
);
const userEnrichmentPersistEventsHandler = asAnyContextSubsetHandlerFunc(
  userEnrichmentPersistEvents.handler
);
const userEnrichmentPersistEventsAndRecalculateRewardsHandler =
  asAnyContextSubsetHandlerFunc(
    userEnrichmentPersistEventsAndRecalculateRewards.handler
  );
const userNpsCreateHandler = asAnyContextSubsetHandlerFunc(
  userNpsCreate.handler
);
const userNpsShouldAskNpsSurveyHandler = asAnyContextSubsetHandlerFunc(
  userNpsShouldAskNpsSurvey.handler
);
const userRolesAddRoleHandler = asAnyContextSubsetHandlerFunc(
  userRolesAddRole.handler
);
const userRolesRemoveRolesHandler = asAnyContextSubsetHandlerFunc(
  userRolesRemoveRoles.handler
);
const userRolesSetRoleHandler = asAnyContextSubsetHandlerFunc(
  userRolesSetRole.handler
);
const userSearchFindUsersBySearchStringHandler = asAnyContextSubsetHandlerFunc(
  userSearchFindUsersBySearchString.handler
);
const userSoftDeleteDeactivateUserHandler = asAnyContextSubsetHandlerFunc(
  userSoftDeleteDeactivateUser.handler
);
const userSoftDeleteReactivateUserHandler = asAnyContextSubsetHandlerFunc(
  userSoftDeleteReactivateUser.handler
);

export type THandlerFuncTree = Readonly<{
  admin: Readonly<{
    licenses: Readonly<{
      getOrgLicenseSets: typeof adminLicensesGetOrgLicenseSetsHandler;
      listAll: typeof adminLicensesListAllHandler;
    }>;
    organizationOnboarding: Readonly<{
      completeOnboardingTask: typeof adminOrganizationOnboardingCompleteOnboardingTaskHandler;
      getOnboardingTaskTemplates: typeof adminOrganizationOnboardingGetOnboardingTaskTemplatesHandler;
      launchOrganization: typeof adminOrganizationOnboardingLaunchOrganizationHandler;
      reopenOnboardingTask: typeof adminOrganizationOnboardingReopenOnboardingTaskHandler;
      sendOnboardingInvitationToAdmins: typeof adminOrganizationOnboardingSendOnboardingInvitationToAdminsHandler;
      start: typeof adminOrganizationOnboardingStartHandler;
    }>;
    scim: Readonly<{
      createUser: typeof adminScimCreateUserHandler;
      findUsers: typeof adminScimFindUsersHandler;
      getUser: typeof adminScimGetUserHandler;
      removeUser: typeof adminScimRemoveUserHandler;
      replaceUser: typeof adminScimReplaceUserHandler;
      updateUser: typeof adminScimUpdateUserHandler;
    }>;
    technicalTesting: Readonly<{
      findTestTemplates: typeof adminTechnicalTestingFindTestTemplatesHandler;
      removeTechnicalTestingQuests: typeof adminTechnicalTestingRemoveTechnicalTestingQuestsHandler;
      sendTestQuestToUser: typeof adminTechnicalTestingSendTestQuestToUserHandler;
    }>;
    userManagement: Readonly<{
      createUserListCsvFile: typeof adminUserManagementCreateUserListCsvFileHandler;
      runLargeUserListCsvCreationFlow: typeof adminUserManagementRunLargeUserListCsvCreationFlowHandler;
      sendUserListCsvEmail: typeof adminUserManagementSendUserListCsvEmailHandler;
    }>;
  }>;
  analytics: Readonly<{
    cubes: Readonly<{
      query: typeof analyticsCubesQueryHandler;
    }>;
    ingest: Readonly<{
      createEnriched: typeof analyticsIngestCreateEnrichedHandler;
      ping: typeof analyticsIngestPingHandler;
      track: typeof analyticsIngestTrackHandler;
    }>;
    sink: Readonly<{
      track: typeof analyticsSinkTrackHandler;
      trackDetached: typeof analyticsSinkTrackDetachedHandler;
    }>;
  }>;
  auth: Readonly<{
    email: Readonly<{
      sendJwtMagicLinkViaEmail: typeof authEmailSendJwtMagicLinkViaEmailHandler;
      sendMagicLinkEmail: typeof authEmailSendMagicLinkEmailHandler;
    }>;
    iap: Readonly<{
      findUser: typeof authIapFindUserHandler;
    }>;
    impersonate: Readonly<{
      loginAsOtherUser: typeof authImpersonateLoginAsOtherUserHandler;
    }>;
    info: Readonly<{
      getLoginInfo: typeof authInfoGetLoginInfoHandler;
    }>;
    jwt: Readonly<{
      consumeRefreshToken: typeof authJwtConsumeRefreshTokenHandler;
      createAccessToken: typeof authJwtCreateAccessTokenHandler;
      createHuntingAccessToken: typeof authJwtCreateHuntingAccessTokenHandler;
      createLoginUrl: typeof authJwtCreateLoginUrlHandler;
      createRefreshToken: typeof authJwtCreateRefreshTokenHandler;
      handleRefreshToken: typeof authJwtHandleRefreshTokenHandler;
      login: typeof authJwtLoginHandler;
      logout: typeof authJwtLogoutHandler;
      verifyAccessToken: typeof authJwtVerifyAccessTokenHandler;
      verifyRefreshToken: typeof authJwtVerifyRefreshTokenHandler;
    }>;
    otp: Readonly<{
      consumeOtp: typeof authOtpConsumeOtpHandler;
      createOtp: typeof authOtpCreateOtpHandler;
      createOtpLoginUrl: typeof authOtpCreateOtpLoginUrlHandler;
      createOtpPayload: typeof authOtpCreateOtpPayloadHandler;
      verifyOtp: typeof authOtpVerifyOtpHandler;
    }>;
    plugin: Readonly<{
      authenticateGoogle: typeof authPluginAuthenticateGoogleHandler;
      authenticateOfficeJs: typeof authPluginAuthenticateOfficeJsHandler;
      verifyGoogleIdToken: typeof authPluginVerifyGoogleIdTokenHandler;
    }>;
    scim: Readonly<{
      createScimToken: typeof authScimCreateScimTokenHandler;
    }>;
  }>;
  bots: Readonly<{
    teams: Readonly<{
      reportAction: typeof botsTeamsReportActionHandler;
    }>;
  }>;
  collection: Readonly<{
    agendaJob: Readonly<{
      createMany: typeof collectionAgendaJobCreateManyHandler;
      find: typeof collectionAgendaJobFindHandler;
      remove: typeof collectionAgendaJobRemoveHandler;
    }>;
    analyticsEvent: Readonly<{
      aggregate: typeof collectionAnalyticsEventAggregateHandler;
      create: typeof collectionAnalyticsEventCreateHandler;
      createMany: typeof collectionAnalyticsEventCreateManyHandler;
      find: typeof collectionAnalyticsEventFindHandler;
      get: typeof collectionAnalyticsEventGetHandler;
      patch: typeof collectionAnalyticsEventPatchHandler;
      remove: typeof collectionAnalyticsEventRemoveHandler;
      update: typeof collectionAnalyticsEventUpdateHandler;
      upsert: typeof collectionAnalyticsEventUpsertHandler;
    }>;
    clientInfo: Readonly<{
      create: typeof collectionClientInfoCreateHandler;
      find: typeof collectionClientInfoFindHandler;
      get: typeof collectionClientInfoGetHandler;
      patch: typeof collectionClientInfoPatchHandler;
      remove: typeof collectionClientInfoRemoveHandler;
      update: typeof collectionClientInfoUpdateHandler;
      upsert: typeof collectionClientInfoUpsertHandler;
    }>;
    distributedLock: Readonly<{
      create: typeof collectionDistributedLockCreateHandler;
      find: typeof collectionDistributedLockFindHandler;
      remove: typeof collectionDistributedLockRemoveHandler;
    }>;
    emailRecord: Readonly<{
      create: typeof collectionEmailRecordCreateHandler;
      createMany: typeof collectionEmailRecordCreateManyHandler;
      find: typeof collectionEmailRecordFindHandler;
      patch: typeof collectionEmailRecordPatchHandler;
      remove: typeof collectionEmailRecordRemoveHandler;
    }>;
    feedbackRule: Readonly<{
      create: typeof collectionFeedbackRuleCreateHandler;
      find: typeof collectionFeedbackRuleFindHandler;
      patch: typeof collectionFeedbackRulePatchHandler;
      remove: typeof collectionFeedbackRuleRemoveHandler;
    }>;
    fingerprint: Readonly<{
      create: typeof collectionFingerprintCreateHandler;
      find: typeof collectionFingerprintFindHandler;
      get: typeof collectionFingerprintGetHandler;
      patch: typeof collectionFingerprintPatchHandler;
      remove: typeof collectionFingerprintRemoveHandler;
      update: typeof collectionFingerprintUpdateHandler;
      upsert: typeof collectionFingerprintUpsertHandler;
    }>;
    gmailAddonExecutionState: Readonly<{
      create: typeof collectionGmailAddonExecutionStateCreateHandler;
      get: typeof collectionGmailAddonExecutionStateGetHandler;
      upsert: typeof collectionGmailAddonExecutionStateUpsertHandler;
    }>;
    huntingSearchJob: Readonly<{
      create: typeof collectionHuntingSearchJobCreateHandler;
      find: typeof collectionHuntingSearchJobFindHandler;
      get: typeof collectionHuntingSearchJobGetHandler;
      patch: typeof collectionHuntingSearchJobPatchHandler;
      remove: typeof collectionHuntingSearchJobRemoveHandler;
    }>;
    huntingSearchJobResult: Readonly<{
      addHuntingSearchJobId: typeof collectionHuntingSearchJobResultAddHuntingSearchJobIdHandler;
      create: typeof collectionHuntingSearchJobResultCreateHandler;
      createMany: typeof collectionHuntingSearchJobResultCreateManyHandler;
      find: typeof collectionHuntingSearchJobResultFindHandler;
      get: typeof collectionHuntingSearchJobResultGetHandler;
      patch: typeof collectionHuntingSearchJobResultPatchHandler;
      remove: typeof collectionHuntingSearchJobResultRemoveHandler;
    }>;
    incidentBeta: Readonly<{
      aggregate: typeof collectionIncidentBetaAggregateHandler;
      create: typeof collectionIncidentBetaCreateHandler;
      find: typeof collectionIncidentBetaFindHandler;
      get: typeof collectionIncidentBetaGetHandler;
      patch: typeof collectionIncidentBetaPatchHandler;
      remove: typeof collectionIncidentBetaRemoveHandler;
      update: typeof collectionIncidentBetaUpdateHandler;
      upsert: typeof collectionIncidentBetaUpsertHandler;
    }>;
    marker: Readonly<{
      create: typeof collectionMarkerCreateHandler;
      find: typeof collectionMarkerFindHandler;
      get: typeof collectionMarkerGetHandler;
      patch: typeof collectionMarkerPatchHandler;
      remove: typeof collectionMarkerRemoveHandler;
      update: typeof collectionMarkerUpdateHandler;
      upsert: typeof collectionMarkerUpsertHandler;
    }>;
    migrations: Readonly<{
      create: typeof collectionMigrationsCreateHandler;
      get: typeof collectionMigrationsGetHandler;
      patch: typeof collectionMigrationsPatchHandler;
    }>;
    npsAnswer: Readonly<{
      create: typeof collectionNpsAnswerCreateHandler;
      find: typeof collectionNpsAnswerFindHandler;
    }>;
    oneTimePassword: Readonly<{
      create: typeof collectionOneTimePasswordCreateHandler;
      find: typeof collectionOneTimePasswordFindHandler;
      remove: typeof collectionOneTimePasswordRemoveHandler;
    }>;
    organization: Readonly<{
      addFeatureForOrganization: typeof collectionOrganizationAddFeatureForOrganizationHandler;
      addGoogleClientId: typeof collectionOrganizationAddGoogleClientIdHandler;
      create: typeof collectionOrganizationCreateHandler;
      find: typeof collectionOrganizationFindHandler;
      get: typeof collectionOrganizationGetHandler;
      getByDomain: typeof collectionOrganizationGetByDomainHandler;
      patch: typeof collectionOrganizationPatchHandler;
      remove: typeof collectionOrganizationRemoveHandler;
      removeFeatureFromOrganization: typeof collectionOrganizationRemoveFeatureFromOrganizationHandler;
      removeGoogleClientId: typeof collectionOrganizationRemoveGoogleClientIdHandler;
    }>;
    organizationOnboardingTask: Readonly<{
      create: typeof collectionOrganizationOnboardingTaskCreateHandler;
      find: typeof collectionOrganizationOnboardingTaskFindHandler;
      patch: typeof collectionOrganizationOnboardingTaskPatchHandler;
      remove: typeof collectionOrganizationOnboardingTaskRemoveHandler;
    }>;
    organizationTrainingRule: Readonly<{
      find: typeof collectionOrganizationTrainingRuleFindHandler;
      get: typeof collectionOrganizationTrainingRuleGetHandler;
      remove: typeof collectionOrganizationTrainingRuleRemoveHandler;
      upsert: typeof collectionOrganizationTrainingRuleUpsertHandler;
    }>;
    plugin: Readonly<{
      create: typeof collectionPluginCreateHandler;
      find: typeof collectionPluginFindHandler;
      get: typeof collectionPluginGetHandler;
      patch: typeof collectionPluginPatchHandler;
      remove: typeof collectionPluginRemoveHandler;
      update: typeof collectionPluginUpdateHandler;
      upsert: typeof collectionPluginUpsertHandler;
    }>;
    quest: Readonly<{
      aggregate: typeof collectionQuestAggregateHandler;
      create: typeof collectionQuestCreateHandler;
      find: typeof collectionQuestFindHandler;
      get: typeof collectionQuestGetHandler;
      patch: typeof collectionQuestPatchHandler;
      remove: typeof collectionQuestRemoveHandler;
      update: typeof collectionQuestUpdateHandler;
      upsert: typeof collectionQuestUpsertHandler;
    }>;
    questTemplate: Readonly<{
      create: typeof collectionQuestTemplateCreateHandler;
      find: typeof collectionQuestTemplateFindHandler;
      get: typeof collectionQuestTemplateGetHandler;
      patch: typeof collectionQuestTemplatePatchHandler;
      remove: typeof collectionQuestTemplateRemoveHandler;
      update: typeof collectionQuestTemplateUpdateHandler;
      upsert: typeof collectionQuestTemplateUpsertHandler;
    }>;
    quizModule: Readonly<{
      create: typeof collectionQuizModuleCreateHandler;
      find: typeof collectionQuizModuleFindHandler;
      get: typeof collectionQuizModuleGetHandler;
      patch: typeof collectionQuizModulePatchHandler;
      remove: typeof collectionQuizModuleRemoveHandler;
      update: typeof collectionQuizModuleUpdateHandler;
      upsert: typeof collectionQuizModuleUpsertHandler;
    }>;
    quizTemplate: Readonly<{
      create: typeof collectionQuizTemplateCreateHandler;
      find: typeof collectionQuizTemplateFindHandler;
      get: typeof collectionQuizTemplateGetHandler;
      patch: typeof collectionQuizTemplatePatchHandler;
      remove: typeof collectionQuizTemplateRemoveHandler;
      update: typeof collectionQuizTemplateUpdateHandler;
    }>;
    rank: Readonly<{
      find: typeof collectionRankFindHandler;
    }>;
    refreshToken: Readonly<{
      create: typeof collectionRefreshTokenCreateHandler;
      find: typeof collectionRefreshTokenFindHandler;
      remove: typeof collectionRefreshTokenRemoveHandler;
    }>;
    tag: Readonly<{
      find: typeof collectionTagFindHandler;
      findVectorTag: typeof collectionTagFindVectorTagHandler;
    }>;
    task: Readonly<{
      create: typeof collectionTaskCreateHandler;
      createMany: typeof collectionTaskCreateManyHandler;
      find: typeof collectionTaskFindHandler;
      get: typeof collectionTaskGetHandler;
      patch: typeof collectionTaskPatchHandler;
      remove: typeof collectionTaskRemoveHandler;
      update: typeof collectionTaskUpdateHandler;
      upsert: typeof collectionTaskUpsertHandler;
    }>;
    taskGroup: Readonly<{
      create: typeof collectionTaskGroupCreateHandler;
      find: typeof collectionTaskGroupFindHandler;
      get: typeof collectionTaskGroupGetHandler;
      patch: typeof collectionTaskGroupPatchHandler;
      remove: typeof collectionTaskGroupRemoveHandler;
      update: typeof collectionTaskGroupUpdateHandler;
      upsert: typeof collectionTaskGroupUpsertHandler;
    }>;
    threat: Readonly<{
      aggregate: typeof collectionThreatAggregateHandler;
      create: typeof collectionThreatCreateHandler;
      find: typeof collectionThreatFindHandler;
      get: typeof collectionThreatGetHandler;
      patch: typeof collectionThreatPatchHandler;
      remove: typeof collectionThreatRemoveHandler;
      update: typeof collectionThreatUpdateHandler;
      upsert: typeof collectionThreatUpsertHandler;
    }>;
    threatObservable: Readonly<{
      create: typeof collectionThreatObservableCreateHandler;
      find: typeof collectionThreatObservableFindHandler;
      get: typeof collectionThreatObservableGetHandler;
      patch: typeof collectionThreatObservablePatchHandler;
      remove: typeof collectionThreatObservableRemoveHandler;
      update: typeof collectionThreatObservableUpdateHandler;
      upsert: typeof collectionThreatObservableUpsertHandler;
    }>;
    threatResource: Readonly<{
      find: typeof collectionThreatResourceFindHandler;
      upsert: typeof collectionThreatResourceUpsertHandler;
    }>;
    threatSimilarityGroup: Readonly<{
      create: typeof collectionThreatSimilarityGroupCreateHandler;
      find: typeof collectionThreatSimilarityGroupFindHandler;
      get: typeof collectionThreatSimilarityGroupGetHandler;
      patch: typeof collectionThreatSimilarityGroupPatchHandler;
      remove: typeof collectionThreatSimilarityGroupRemoveHandler;
      upsert: typeof collectionThreatSimilarityGroupUpsertHandler;
    }>;
    translation: Readonly<{
      create: typeof collectionTranslationCreateHandler;
      find: typeof collectionTranslationFindHandler;
      get: typeof collectionTranslationGetHandler;
      patch: typeof collectionTranslationPatchHandler;
      remove: typeof collectionTranslationRemoveHandler;
      update: typeof collectionTranslationUpdateHandler;
      upsert: typeof collectionTranslationUpsertHandler;
    }>;
    user: Readonly<{
      addFeatureForUser: typeof collectionUserAddFeatureForUserHandler;
      aggregate: typeof collectionUserAggregateHandler;
      create: typeof collectionUserCreateHandler;
      distinct: typeof collectionUserDistinctHandler;
      find: typeof collectionUserFindHandler;
      findAdminsByOrganizationId: typeof collectionUserFindAdminsByOrganizationIdHandler;
      findCoworkersByOrganizationId: typeof collectionUserFindCoworkersByOrganizationIdHandler;
      get: typeof collectionUserGetHandler;
      patch: typeof collectionUserPatchHandler;
      remove: typeof collectionUserRemoveHandler;
      removeFeatureFromUser: typeof collectionUserRemoveFeatureFromUserHandler;
      update: typeof collectionUserUpdateHandler;
      upsert: typeof collectionUserUpsertHandler;
    }>;
    userFeedback: Readonly<{
      create: typeof collectionUserFeedbackCreateHandler;
      find: typeof collectionUserFeedbackFindHandler;
      patch: typeof collectionUserFeedbackPatchHandler;
      remove: typeof collectionUserFeedbackRemoveHandler;
    }>;
    vector: Readonly<{
      create: typeof collectionVectorCreateHandler;
      find: typeof collectionVectorFindHandler;
      get: typeof collectionVectorGetHandler;
      patch: typeof collectionVectorPatchHandler;
      remove: typeof collectionVectorRemoveHandler;
      update: typeof collectionVectorUpdateHandler;
      upsert: typeof collectionVectorUpsertHandler;
    }>;
  }>;
  data: Readonly<{
    dash: Readonly<{
      proxyDashRequests: typeof dataDashProxyDashRequestsHandler;
    }>;
  }>;
  game: Readonly<{
    challenge: Readonly<{
      updateForUser: typeof gameChallengeUpdateForUserHandler;
    }>;
    cycle: Readonly<{
      full: typeof gameCycleFullHandler;
      user: typeof gameCycleUserHandler;
    }>;
    email: Readonly<{
      inviteOrganizationsUnstartedUsers: typeof gameEmailInviteOrganizationsUnstartedUsersHandler;
      sendActivationEmail: typeof gameEmailSendActivationEmailHandler;
      sendWelcomeEmail: typeof gameEmailSendWelcomeEmailHandler;
    }>;
    engine: Readonly<{
      getQuestBasedOnLatestTheme: typeof gameEngineGetQuestBasedOnLatestThemeHandler;
      getTranslatedQuest: typeof gameEngineGetTranslatedQuestHandler;
      selectNextQuestTemplate: typeof gameEngineSelectNextQuestTemplateHandler;
    }>;
    leaderboard: Readonly<{
      enrichUserLeaderboardRows: typeof gameLeaderboardEnrichUserLeaderboardRowsHandler;
      getCountryLeaderboard: typeof gameLeaderboardGetCountryLeaderboardHandler;
      getLeaderboard: typeof gameLeaderboardGetLeaderboardHandler;
      getSimpleUserStarsLeaderboard: typeof gameLeaderboardGetSimpleUserStarsLeaderboardHandler;
      getUserStarsLeaderboard: typeof gameLeaderboardGetUserStarsLeaderboardHandler;
    }>;
    organization: Readonly<{
      scheduleReminderEmails: typeof gameOrganizationScheduleReminderEmailsHandler;
      setDemoMode: typeof gameOrganizationSetDemoModeHandler;
      updateAchievementAggregates: typeof gameOrganizationUpdateAchievementAggregatesHandler;
      updateCountryLeaderboardAggregates: typeof gameOrganizationUpdateCountryLeaderboardAggregatesHandler;
      updateUserCountByCountryAggregates: typeof gameOrganizationUpdateUserCountByCountryAggregatesHandler;
    }>;
    quest: Readonly<{
      deliver: typeof gameQuestDeliverHandler;
      expire: typeof gameQuestExpireHandler;
      expireAll: typeof gameQuestExpireAllHandler;
      fail: typeof gameQuestFailHandler;
      getAttachment: typeof gameQuestGetAttachmentHandler;
      getFailUrl: typeof gameQuestGetFailUrlHandler;
      getResultUrl: typeof gameQuestGetResultUrlHandler;
      getSignedFailUrl: typeof gameQuestGetSignedFailUrlHandler;
      getSignedResultUrl: typeof gameQuestGetSignedResultUrlHandler;
      register: typeof gameQuestRegisterHandler;
      report: typeof gameQuestReportHandler;
      reportWithMessageId: typeof gameQuestReportWithMessageIdHandler;
      trackDelivery: typeof gameQuestTrackDeliveryHandler;
    }>;
    questTemplate: Readonly<{
      checkCompilability: typeof gameQuestTemplateCheckCompilabilityHandler;
      compileQuestTemplateEditorPreview: typeof gameQuestTemplateCompileQuestTemplateEditorPreviewHandler;
      compileQuestTemplatePreview: typeof gameQuestTemplateCompileQuestTemplatePreviewHandler;
      compileQuestTemplateString: typeof gameQuestTemplateCompileQuestTemplateStringHandler;
      compileQuestToVector: typeof gameQuestTemplateCompileQuestToVectorHandler;
      generateFailureFunnel: typeof gameQuestTemplateGenerateFailureFunnelHandler;
      getDifficultyFactors: typeof gameQuestTemplateGetDifficultyFactorsHandler;
      getExampleContext: typeof gameQuestTemplateGetExampleContextHandler;
      updateStatistics: typeof gameQuestTemplateUpdateStatisticsHandler;
    }>;
    quiz: Readonly<{
      actOnPreview: typeof gameQuizActOnPreviewHandler;
      actOnQuizObjective: typeof gameQuizActOnQuizObjectiveHandler;
      preview: typeof gameQuizPreviewHandler;
      selectNextForUser: typeof gameQuizSelectNextForUserHandler;
    }>;
    result: Readonly<{
      get: typeof gameResultGetHandler;
      selectAndPatchSecondaryObjective: typeof gameResultSelectAndPatchSecondaryObjectiveHandler;
    }>;
    user: Readonly<{
      claimAchievement: typeof gameUserClaimAchievementHandler;
      getChangedRewards: typeof gameUserGetChangedRewardsHandler;
      imposeDeliveryCooldown: typeof gameUserImposeDeliveryCooldownHandler;
      legacyOnboardUser: typeof gameUserLegacyOnboardUserHandler;
      onboardUser: typeof gameUserOnboardUserHandler;
      recalculateStats: typeof gameUserRecalculateStatsHandler;
      resetUserGame: typeof gameUserResetUserGameHandler;
      scheduleStatRecalculationTasksForOrganizations: typeof gameUserScheduleStatRecalculationTasksForOrganizationsHandler;
      selfOnboard: typeof gameUserSelfOnboardHandler;
      start: typeof gameUserStartHandler;
      startGameForOrganizationsUnstartedUsers: typeof gameUserStartGameForOrganizationsUnstartedUsersHandler;
      startGameForUsersWithAutomaticEnrollment: typeof gameUserStartGameForUsersWithAutomaticEnrollmentHandler;
      updateOnboardingEligibility: typeof gameUserUpdateOnboardingEligibilityHandler;
      updatePlayerStats: typeof gameUserUpdatePlayerStatsHandler;
    }>;
  }>;
  infrastructure: Readonly<{
    auth: Readonly<{
      createToken: typeof infrastructureAuthCreateTokenHandler;
      getSigninData: typeof infrastructureAuthGetSigninDataHandler;
      resolveApiUserFromToken: typeof infrastructureAuthResolveApiUserFromTokenHandler;
      revokeToken: typeof infrastructureAuthRevokeTokenHandler;
      verifyTokenAgainstWhitelist: typeof infrastructureAuthVerifyTokenAgainstWhitelistHandler;
    }>;
    database: Readonly<{
      cleanup: typeof infrastructureDatabaseCleanupHandler;
      removePreUploadedThreats: typeof infrastructureDatabaseRemovePreUploadedThreatsHandler;
    }>;
    distributedLock: Readonly<{
      acquireLock: typeof infrastructureDistributedLockAcquireLockHandler;
      releaseLock: typeof infrastructureDistributedLockReleaseLockHandler;
    }>;
    dkim: Readonly<{
      create: typeof infrastructureDkimCreateHandler;
      getSigningKey: typeof infrastructureDkimGetSigningKeyHandler;
    }>;
    health: Readonly<{
      alive: typeof infrastructureHealthAliveHandler;
      ready: typeof infrastructureHealthReadyHandler;
    }>;
    hoxHash: Readonly<{
      compare: typeof infrastructureHoxHashCompareHandler;
      compareBatched: typeof infrastructureHoxHashCompareBatchedHandler;
      computeFuzzyHash: typeof infrastructureHoxHashComputeFuzzyHashHandler;
    }>;
    hoxUrl: Readonly<{
      createShortLink: typeof infrastructureHoxUrlCreateShortLinkHandler;
    }>;
    htmlToImage: Readonly<{
      createImageFromHtml: typeof infrastructureHtmlToImageCreateImageFromHtmlHandler;
    }>;
    id: Readonly<{
      generateHumanReadableId: typeof infrastructureIdGenerateHumanReadableIdHandler;
    }>;
    jwt: Readonly<{
      create: typeof infrastructureJwtCreateHandler;
      decode: typeof infrastructureJwtDecodeHandler;
      signUrlForCurrentUser: typeof infrastructureJwtSignUrlForCurrentUserHandler;
      verify: typeof infrastructureJwtVerifyHandler;
      verifySignedUrl: typeof infrastructureJwtVerifySignedUrlHandler;
    }>;
    logger: Readonly<{
      log: typeof infrastructureLoggerLogHandler;
    }>;
    migration: Readonly<{
      backfillOnboardingEvents: typeof infrastructureMigrationBackfillOnboardingEventsHandler;
      backfillQuestMarkerStars: typeof infrastructureMigrationBackfillQuestMarkerStarsHandler;
      backfillUserQuestMarkerStars: typeof infrastructureMigrationBackfillUserQuestMarkerStarsHandler;
      enrichPreviouslyFailedThreats: typeof infrastructureMigrationEnrichPreviouslyFailedThreatsHandler;
      splitHops: typeof infrastructureMigrationSplitHopsHandler;
      v175FixThreatHeaders: typeof infrastructureMigrationV175FixThreatHeadersHandler;
    }>;
    profile: Readonly<{
      capturePerformanceProfile: typeof infrastructureProfileCapturePerformanceProfileHandler;
    }>;
  }>;
  integration: Readonly<{
    azure: Readonly<{
      getResourceTemplate: typeof integrationAzureGetResourceTemplateHandler;
      getResourceTemplateUrl: typeof integrationAzureGetResourceTemplateUrlHandler;
    }>;
    bitly: Readonly<{
      getUrl: typeof integrationBitlyGetUrlHandler;
    }>;
    cloudinary: Readonly<{
      signUpload: typeof integrationCloudinarySignUploadHandler;
    }>;
    dns: Readonly<{
      lookup: typeof integrationDnsLookupHandler;
      lookupMx: typeof integrationDnsLookupMxHandler;
      validateSpf: typeof integrationDnsValidateSpfHandler;
    }>;
    email: Readonly<{
      build: typeof integrationEmailBuildHandler;
      deliver: typeof integrationEmailDeliverHandler;
      imposeDeliveryLimit: typeof integrationEmailImposeDeliveryLimitHandler;
      send: typeof integrationEmailSendHandler;
      trackDelivery: typeof integrationEmailTrackDeliveryHandler;
    }>;
    gmail: Readonly<{
      fetchEmailDeliveryAccessToken: typeof integrationGmailFetchEmailDeliveryAccessTokenHandler;
      getApiCredentials: typeof integrationGmailGetApiCredentialsHandler;
      insertMessage: typeof integrationGmailInsertMessageHandler;
    }>;
    googleCloudKms: Readonly<{
      decryptAsymmetric: typeof integrationGoogleCloudKmsDecryptAsymmetricHandler;
      getPublicKey: typeof integrationGoogleCloudKmsGetPublicKeyHandler;
    }>;
    googleCloudStorage: Readonly<{
      deleteFile: typeof integrationGoogleCloudStorageDeleteFileHandler;
      downloadFile: typeof integrationGoogleCloudStorageDownloadFileHandler;
      getSignedUrl: typeof integrationGoogleCloudStorageGetSignedUrlHandler;
      listFiles: typeof integrationGoogleCloudStorageListFilesHandler;
      upload: typeof integrationGoogleCloudStorageUploadHandler;
    }>;
    http: Readonly<{
      request: typeof integrationHttpRequestHandler;
    }>;
    virustotalAugment: Readonly<{
      fetchEphemeralUrl: typeof integrationVirustotalAugmentFetchEphemeralUrlHandler;
    }>;
    zendesk: Readonly<{
      createToken: typeof integrationZendeskCreateTokenHandler;
      redirect: typeof integrationZendeskRedirectHandler;
    }>;
  }>;
  internal: Readonly<{
    diagnostics: Readonly<{
      debugEngineHeuristics: typeof internalDiagnosticsDebugEngineHeuristicsHandler;
      debugQuestEngine: typeof internalDiagnosticsDebugQuestEngineHandler;
    }>;
    experiments: Readonly<{
      initOrGetUserSplitTestCase: typeof internalExperimentsInitOrGetUserSplitTestCaseHandler;
    }>;
    features: Readonly<{
      hasFeature: typeof internalFeaturesHasFeatureHandler;
      hasFeatures: typeof internalFeaturesHasFeaturesHandler;
      trackOrganizationFeatures: typeof internalFeaturesTrackOrganizationFeaturesHandler;
    }>;
  }>;
  intl: Readonly<{
    translations: Readonly<{
      getAll: typeof intlTranslationsGetAllHandler;
      getCdnTranslations: typeof intlTranslationsGetCdnTranslationsHandler;
      getDatabaseSourceMessages: typeof intlTranslationsGetDatabaseSourceMessagesHandler;
      getStaticSourceMessages: typeof intlTranslationsGetStaticSourceMessagesHandler;
      syncTranslations: typeof intlTranslationsSyncTranslationsHandler;
      uploadDynamicTranslations: typeof intlTranslationsUploadDynamicTranslationsHandler;
    }>;
  }>;
  legacy: Readonly<{
    fingerprintUser: Readonly<{
      update: typeof legacyFingerprintUserUpdateHandler;
    }>;
    markerFactory: Readonly<{
      create: typeof legacyMarkerFactoryCreateHandler;
      remove: typeof legacyMarkerFactoryRemoveHandler;
      update: typeof legacyMarkerFactoryUpdateHandler;
    }>;
    questMarkerReview: Readonly<{
      create: typeof legacyQuestMarkerReviewCreateHandler;
    }>;
    sendQuestToOrganization: Readonly<{
      create: typeof legacySendQuestToOrganizationCreateHandler;
    }>;
    sendQuestToUser: Readonly<{
      create: typeof legacySendQuestToUserCreateHandler;
    }>;
    threatObservableTask: Readonly<{
      create: typeof legacyThreatObservableTaskCreateHandler;
      update: typeof legacyThreatObservableTaskUpdateHandler;
      upsert: typeof legacyThreatObservableTaskUpsertHandler;
    }>;
    userTagCreator: Readonly<{
      create: typeof legacyUserTagCreatorCreateHandler;
    }>;
  }>;
  organization: Readonly<{
    domain: Readonly<{
      add: typeof organizationDomainAddHandler;
      remove: typeof organizationDomainRemoveHandler;
      update: typeof organizationDomainUpdateHandler;
    }>;
    quiz: Readonly<{
      getModules: typeof organizationQuizGetModulesHandler;
      syncOrgModuleState: typeof organizationQuizSyncOrgModuleStateHandler;
      upsertModule: typeof organizationQuizUpsertModuleHandler;
      upsertModuleTemplate: typeof organizationQuizUpsertModuleTemplateHandler;
    }>;
  }>;
  plugin: Readonly<{
    action: Readonly<{
      click: typeof pluginActionClickHandler;
      handleAction: typeof pluginActionHandleActionHandler;
      reportQuest: typeof pluginActionReportQuestHandler;
      start: typeof pluginActionStartHandler;
      startGame: typeof pluginActionStartGameHandler;
      upload: typeof pluginActionUploadHandler;
    }>;
    response: Readonly<{
      unknownUser: typeof pluginResponseUnknownUserHandler;
    }>;
  }>;
  questTemplate: Readonly<{
    benchmark: Readonly<{
      findTemplates: typeof questTemplateBenchmarkFindTemplatesHandler;
    }>;
    search: Readonly<{
      findQuestTemplatesBySearchString: typeof questTemplateSearchFindQuestTemplatesBySearchStringHandler;
    }>;
  }>;
  security: Readonly<{
    validation: Readonly<{
      sanitizeHtml: typeof securityValidationSanitizeHtmlHandler;
    }>;
  }>;
  templating: Readonly<{
    handlebars: Readonly<{
      compileTemplate: typeof templatingHandlebarsCompileTemplateHandler;
      parseTemplate: typeof templatingHandlebarsParseTemplateHandler;
    }>;
  }>;
  threat: Readonly<{
    analysis: Readonly<{
      assign: typeof threatAnalysisAssignHandler;
      calculateStatistics: typeof threatAnalysisCalculateStatisticsHandler;
      calculateTrendHistogram: typeof threatAnalysisCalculateTrendHistogramHandler;
      callMlModelWithThreat: typeof threatAnalysisCallMlModelWithThreatHandler;
      getPrioritisedListOfAnalysableThreats: typeof threatAnalysisGetPrioritisedListOfAnalysableThreatsHandler;
      rateSimilarityGroup: typeof threatAnalysisRateSimilarityGroupHandler;
      rateThreat: typeof threatAnalysisRateThreatHandler;
    }>;
    cortex: Readonly<{
      analyze: typeof threatCortexAnalyzeHandler;
      getAnalyzers: typeof threatCortexGetAnalyzersHandler;
      getJobReport: typeof threatCortexGetJobReportHandler;
    }>;
    feedback: Readonly<{
      sendFeedbackToUser: typeof threatFeedbackSendFeedbackToUserHandler;
      startBatchedThreatFeedback: typeof threatFeedbackStartBatchedThreatFeedbackHandler;
    }>;
    hunting: Readonly<{
      deleteEmail: typeof threatHuntingDeleteEmailHandler;
      getSearchResults: typeof threatHuntingGetSearchResultsHandler;
      initializeSettings: typeof threatHuntingInitializeSettingsHandler;
      revertEmailDeletion: typeof threatHuntingRevertEmailDeletionHandler;
      startSearch: typeof threatHuntingStartSearchHandler;
      timeoutOldHuntingSearchJobs: typeof threatHuntingTimeoutOldHuntingSearchJobsHandler;
    }>;
    pipeline: Readonly<{
      assignSimilarityGroup: typeof threatPipelineAssignSimilarityGroupHandler;
      enrichThreat: typeof threatPipelineEnrichThreatHandler;
      escalate: typeof threatPipelineEscalateHandler;
      rateAutomatically: typeof threatPipelineRateAutomaticallyHandler;
      runPipelineForThreats: typeof threatPipelineRunPipelineForThreatsHandler;
      updateIncidents: typeof threatPipelineUpdateIncidentsHandler;
    }>;
    rules: Readonly<{
      evaluateExpression: typeof threatRulesEvaluateExpressionHandler;
    }>;
    search: Readonly<{
      findIncidentsBySearchString: typeof threatSearchFindIncidentsBySearchStringHandler;
      findThreatsBySearchString: typeof threatSearchFindThreatsBySearchStringHandler;
    }>;
  }>;
  user: Readonly<{
    adminAction: Readonly<{
      sendQuest: typeof userAdminActionSendQuestHandler;
    }>;
    bulk: Readonly<{
      sendQuest: typeof userBulkSendQuestHandler;
    }>;
    bulkAction: Readonly<{
      fanOut: typeof userBulkActionFanOutHandler;
    }>;
    email: Readonly<{
      inviteUser: typeof userEmailInviteUserHandler;
    }>;
    enrichment: Readonly<{
      addGeolocation: typeof userEnrichmentAddGeolocationHandler;
      persistEvents: typeof userEnrichmentPersistEventsHandler;
      persistEventsAndRecalculateRewards: typeof userEnrichmentPersistEventsAndRecalculateRewardsHandler;
    }>;
    nps: Readonly<{
      create: typeof userNpsCreateHandler;
      shouldAskNpsSurvey: typeof userNpsShouldAskNpsSurveyHandler;
    }>;
    roles: Readonly<{
      addRole: typeof userRolesAddRoleHandler;
      removeRoles: typeof userRolesRemoveRolesHandler;
      setRole: typeof userRolesSetRoleHandler;
    }>;
    search: Readonly<{
      findUsersBySearchString: typeof userSearchFindUsersBySearchStringHandler;
    }>;
    softDelete: Readonly<{
      deactivateUser: typeof userSoftDeleteDeactivateUserHandler;
      reactivateUser: typeof userSoftDeleteReactivateUserHandler;
    }>;
  }>;
}>;
