// GENERATED, DO NOT EDIT
// This file is generated from the domain folder-file structure. To regenerate, run: npm run generate:handlertree
import { createHandlerFunc } from './handlerGenUtils';
import { THandlerFuncTree } from './handlersModel';
export { THandlerFuncTree };

import adminOrganizationOnboardingCompleteOnboardingTask from '@server/domains/admin/organizationOnboarding/completeOnboardingTask';
import adminOrganizationOnboardingGetOnboardingTaskTemplates from '@server/domains/admin/organizationOnboarding/getOnboardingTaskTemplates';
import adminOrganizationOnboardingLaunchOrganization from '@server/domains/admin/organizationOnboarding/launchOrganization';
import adminOrganizationOnboardingReopenOnboardingTask from '@server/domains/admin/organizationOnboarding/reopenOnboardingTask';
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
import analyticsCubesQuery from '@server/domains/analytics/cubes/query';
import analyticsIngestCreateEnriched from '@server/domains/analytics/ingest/createEnriched';
import analyticsIngestPing from '@server/domains/analytics/ingest/ping';
import analyticsIngestTrack from '@server/domains/analytics/ingest/track';
import analyticsSinkTrack from '@server/domains/analytics/sink/track';
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
import gameEngineCreateNewQuest from '@server/domains/game/engine/createNewQuest';
import gameEngineGetQuestBasedOnLatestTheme from '@server/domains/game/engine/getQuestBasedOnLatestTheme';
import gameEngineGetTranslatedQuest from '@server/domains/game/engine/getTranslatedQuest';
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
import legacyImportUsersCreate from '@server/domains/legacy/importUsers/create';
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

export enum EHandlerSignature {
  ADMIN_ORGANIZATION_ONBOARDING_COMPLETE_ONBOARDING_TASK = 'admin.organizationOnboarding.completeOnboardingTask',
  ADMIN_ORGANIZATION_ONBOARDING_GET_ONBOARDING_TASK_TEMPLATES = 'admin.organizationOnboarding.getOnboardingTaskTemplates',
  ADMIN_ORGANIZATION_ONBOARDING_LAUNCH_ORGANIZATION = 'admin.organizationOnboarding.launchOrganization',
  ADMIN_ORGANIZATION_ONBOARDING_REOPEN_ONBOARDING_TASK = 'admin.organizationOnboarding.reopenOnboardingTask',
  ADMIN_ORGANIZATION_ONBOARDING_START = 'admin.organizationOnboarding.start',
  ADMIN_SCIM_CREATE_USER = 'admin.scim.createUser',
  ADMIN_SCIM_FIND_USERS = 'admin.scim.findUsers',
  ADMIN_SCIM_GET_USER = 'admin.scim.getUser',
  ADMIN_SCIM_REMOVE_USER = 'admin.scim.removeUser',
  ADMIN_SCIM_REPLACE_USER = 'admin.scim.replaceUser',
  ADMIN_SCIM_UPDATE_USER = 'admin.scim.updateUser',
  ADMIN_TECHNICAL_TESTING_FIND_TEST_TEMPLATES = 'admin.technicalTesting.findTestTemplates',
  ADMIN_TECHNICAL_TESTING_REMOVE_TECHNICAL_TESTING_QUESTS = 'admin.technicalTesting.removeTechnicalTestingQuests',
  ADMIN_TECHNICAL_TESTING_SEND_TEST_QUEST_TO_USER = 'admin.technicalTesting.sendTestQuestToUser',
  ANALYTICS_CUBES_QUERY = 'analytics.cubes.query',
  ANALYTICS_INGEST_CREATE_ENRICHED = 'analytics.ingest.createEnriched',
  ANALYTICS_INGEST_PING = 'analytics.ingest.ping',
  ANALYTICS_INGEST_TRACK = 'analytics.ingest.track',
  ANALYTICS_SINK_TRACK = 'analytics.sink.track',
  AUTH_EMAIL_SEND_JWT_MAGIC_LINK_VIA_EMAIL = 'auth.email.sendJwtMagicLinkViaEmail',
  AUTH_EMAIL_SEND_MAGIC_LINK_EMAIL = 'auth.email.sendMagicLinkEmail',
  AUTH_IAP_FIND_USER = 'auth.iap.findUser',
  AUTH_IMPERSONATE_LOGIN_AS_OTHER_USER = 'auth.impersonate.loginAsOtherUser',
  AUTH_INFO_GET_LOGIN_INFO = 'auth.info.getLoginInfo',
  AUTH_JWT_CONSUME_REFRESH_TOKEN = 'auth.jwt.consumeRefreshToken',
  AUTH_JWT_CREATE_ACCESS_TOKEN = 'auth.jwt.createAccessToken',
  AUTH_JWT_CREATE_HUNTING_ACCESS_TOKEN = 'auth.jwt.createHuntingAccessToken',
  AUTH_JWT_CREATE_LOGIN_URL = 'auth.jwt.createLoginUrl',
  AUTH_JWT_CREATE_REFRESH_TOKEN = 'auth.jwt.createRefreshToken',
  AUTH_JWT_HANDLE_REFRESH_TOKEN = 'auth.jwt.handleRefreshToken',
  AUTH_JWT_LOGIN = 'auth.jwt.login',
  AUTH_JWT_LOGOUT = 'auth.jwt.logout',
  AUTH_JWT_VERIFY_ACCESS_TOKEN = 'auth.jwt.verifyAccessToken',
  AUTH_JWT_VERIFY_REFRESH_TOKEN = 'auth.jwt.verifyRefreshToken',
  AUTH_OTP_CONSUME_OTP = 'auth.otp.consumeOtp',
  AUTH_OTP_CREATE_OTP = 'auth.otp.createOtp',
  AUTH_OTP_CREATE_OTP_LOGIN_URL = 'auth.otp.createOtpLoginUrl',
  AUTH_OTP_CREATE_OTP_PAYLOAD = 'auth.otp.createOtpPayload',
  AUTH_OTP_VERIFY_OTP = 'auth.otp.verifyOtp',
  AUTH_PLUGIN_AUTHENTICATE_GOOGLE = 'auth.plugin.authenticateGoogle',
  AUTH_PLUGIN_AUTHENTICATE_OFFICE_JS = 'auth.plugin.authenticateOfficeJs',
  AUTH_PLUGIN_VERIFY_GOOGLE_ID_TOKEN = 'auth.plugin.verifyGoogleIdToken',
  AUTH_SCIM_CREATE_SCIM_TOKEN = 'auth.scim.createScimToken',
  BOTS_TEAMS_REPORT_ACTION = 'bots.teams.reportAction',
  COLLECTION_AGENDA_JOB_CREATE_MANY = 'collection.agendaJob.createMany',
  COLLECTION_AGENDA_JOB_FIND = 'collection.agendaJob.find',
  COLLECTION_AGENDA_JOB_REMOVE = 'collection.agendaJob.remove',
  COLLECTION_ANALYTICS_EVENT_AGGREGATE = 'collection.analyticsEvent.aggregate',
  COLLECTION_ANALYTICS_EVENT_CREATE = 'collection.analyticsEvent.create',
  COLLECTION_ANALYTICS_EVENT_CREATE_MANY = 'collection.analyticsEvent.createMany',
  COLLECTION_ANALYTICS_EVENT_FIND = 'collection.analyticsEvent.find',
  COLLECTION_ANALYTICS_EVENT_GET = 'collection.analyticsEvent.get',
  COLLECTION_ANALYTICS_EVENT_PATCH = 'collection.analyticsEvent.patch',
  COLLECTION_ANALYTICS_EVENT_REMOVE = 'collection.analyticsEvent.remove',
  COLLECTION_ANALYTICS_EVENT_UPDATE = 'collection.analyticsEvent.update',
  COLLECTION_ANALYTICS_EVENT_UPSERT = 'collection.analyticsEvent.upsert',
  COLLECTION_CLIENT_INFO_CREATE = 'collection.clientInfo.create',
  COLLECTION_CLIENT_INFO_FIND = 'collection.clientInfo.find',
  COLLECTION_CLIENT_INFO_GET = 'collection.clientInfo.get',
  COLLECTION_CLIENT_INFO_PATCH = 'collection.clientInfo.patch',
  COLLECTION_CLIENT_INFO_REMOVE = 'collection.clientInfo.remove',
  COLLECTION_CLIENT_INFO_UPDATE = 'collection.clientInfo.update',
  COLLECTION_CLIENT_INFO_UPSERT = 'collection.clientInfo.upsert',
  COLLECTION_DISTRIBUTED_LOCK_CREATE = 'collection.distributedLock.create',
  COLLECTION_DISTRIBUTED_LOCK_FIND = 'collection.distributedLock.find',
  COLLECTION_DISTRIBUTED_LOCK_REMOVE = 'collection.distributedLock.remove',
  COLLECTION_EMAIL_RECORD_CREATE = 'collection.emailRecord.create',
  COLLECTION_EMAIL_RECORD_CREATE_MANY = 'collection.emailRecord.createMany',
  COLLECTION_EMAIL_RECORD_FIND = 'collection.emailRecord.find',
  COLLECTION_EMAIL_RECORD_PATCH = 'collection.emailRecord.patch',
  COLLECTION_EMAIL_RECORD_REMOVE = 'collection.emailRecord.remove',
  COLLECTION_FEEDBACK_RULE_CREATE = 'collection.feedbackRule.create',
  COLLECTION_FEEDBACK_RULE_FIND = 'collection.feedbackRule.find',
  COLLECTION_FEEDBACK_RULE_PATCH = 'collection.feedbackRule.patch',
  COLLECTION_FEEDBACK_RULE_REMOVE = 'collection.feedbackRule.remove',
  COLLECTION_FINGERPRINT_CREATE = 'collection.fingerprint.create',
  COLLECTION_FINGERPRINT_FIND = 'collection.fingerprint.find',
  COLLECTION_FINGERPRINT_GET = 'collection.fingerprint.get',
  COLLECTION_FINGERPRINT_PATCH = 'collection.fingerprint.patch',
  COLLECTION_FINGERPRINT_REMOVE = 'collection.fingerprint.remove',
  COLLECTION_FINGERPRINT_UPDATE = 'collection.fingerprint.update',
  COLLECTION_FINGERPRINT_UPSERT = 'collection.fingerprint.upsert',
  COLLECTION_GMAIL_ADDON_EXECUTION_STATE_CREATE = 'collection.gmailAddonExecutionState.create',
  COLLECTION_GMAIL_ADDON_EXECUTION_STATE_GET = 'collection.gmailAddonExecutionState.get',
  COLLECTION_GMAIL_ADDON_EXECUTION_STATE_UPSERT = 'collection.gmailAddonExecutionState.upsert',
  COLLECTION_HUNTING_SEARCH_JOB_CREATE = 'collection.huntingSearchJob.create',
  COLLECTION_HUNTING_SEARCH_JOB_FIND = 'collection.huntingSearchJob.find',
  COLLECTION_HUNTING_SEARCH_JOB_GET = 'collection.huntingSearchJob.get',
  COLLECTION_HUNTING_SEARCH_JOB_PATCH = 'collection.huntingSearchJob.patch',
  COLLECTION_HUNTING_SEARCH_JOB_REMOVE = 'collection.huntingSearchJob.remove',
  COLLECTION_HUNTING_SEARCH_JOB_RESULT_CREATE = 'collection.huntingSearchJobResult.create',
  COLLECTION_HUNTING_SEARCH_JOB_RESULT_CREATE_MANY = 'collection.huntingSearchJobResult.createMany',
  COLLECTION_HUNTING_SEARCH_JOB_RESULT_FIND = 'collection.huntingSearchJobResult.find',
  COLLECTION_HUNTING_SEARCH_JOB_RESULT_GET = 'collection.huntingSearchJobResult.get',
  COLLECTION_HUNTING_SEARCH_JOB_RESULT_PATCH = 'collection.huntingSearchJobResult.patch',
  COLLECTION_HUNTING_SEARCH_JOB_RESULT_REMOVE = 'collection.huntingSearchJobResult.remove',
  COLLECTION_INCIDENT_BETA_AGGREGATE = 'collection.incidentBeta.aggregate',
  COLLECTION_INCIDENT_BETA_CREATE = 'collection.incidentBeta.create',
  COLLECTION_INCIDENT_BETA_FIND = 'collection.incidentBeta.find',
  COLLECTION_INCIDENT_BETA_GET = 'collection.incidentBeta.get',
  COLLECTION_INCIDENT_BETA_PATCH = 'collection.incidentBeta.patch',
  COLLECTION_INCIDENT_BETA_REMOVE = 'collection.incidentBeta.remove',
  COLLECTION_INCIDENT_BETA_UPDATE = 'collection.incidentBeta.update',
  COLLECTION_INCIDENT_BETA_UPSERT = 'collection.incidentBeta.upsert',
  COLLECTION_MARKER_CREATE = 'collection.marker.create',
  COLLECTION_MARKER_FIND = 'collection.marker.find',
  COLLECTION_MARKER_GET = 'collection.marker.get',
  COLLECTION_MARKER_PATCH = 'collection.marker.patch',
  COLLECTION_MARKER_REMOVE = 'collection.marker.remove',
  COLLECTION_MARKER_UPDATE = 'collection.marker.update',
  COLLECTION_MARKER_UPSERT = 'collection.marker.upsert',
  COLLECTION_MIGRATIONS_CREATE = 'collection.migrations.create',
  COLLECTION_MIGRATIONS_GET = 'collection.migrations.get',
  COLLECTION_MIGRATIONS_PATCH = 'collection.migrations.patch',
  COLLECTION_NPS_ANSWER_CREATE = 'collection.npsAnswer.create',
  COLLECTION_NPS_ANSWER_FIND = 'collection.npsAnswer.find',
  COLLECTION_ONE_TIME_PASSWORD_CREATE = 'collection.oneTimePassword.create',
  COLLECTION_ONE_TIME_PASSWORD_FIND = 'collection.oneTimePassword.find',
  COLLECTION_ONE_TIME_PASSWORD_REMOVE = 'collection.oneTimePassword.remove',
  COLLECTION_ORGANIZATION_ADD_FEATURE_FOR_ORGANIZATION = 'collection.organization.addFeatureForOrganization',
  COLLECTION_ORGANIZATION_ADD_GOOGLE_CLIENT_ID = 'collection.organization.addGoogleClientId',
  COLLECTION_ORGANIZATION_CREATE = 'collection.organization.create',
  COLLECTION_ORGANIZATION_FIND = 'collection.organization.find',
  COLLECTION_ORGANIZATION_GET = 'collection.organization.get',
  COLLECTION_ORGANIZATION_GET_BY_DOMAIN = 'collection.organization.getByDomain',
  COLLECTION_ORGANIZATION_PATCH = 'collection.organization.patch',
  COLLECTION_ORGANIZATION_REMOVE = 'collection.organization.remove',
  COLLECTION_ORGANIZATION_REMOVE_FEATURE_FROM_ORGANIZATION = 'collection.organization.removeFeatureFromOrganization',
  COLLECTION_ORGANIZATION_REMOVE_GOOGLE_CLIENT_ID = 'collection.organization.removeGoogleClientId',
  COLLECTION_ORGANIZATION_ONBOARDING_TASK_CREATE = 'collection.organizationOnboardingTask.create',
  COLLECTION_ORGANIZATION_ONBOARDING_TASK_FIND = 'collection.organizationOnboardingTask.find',
  COLLECTION_ORGANIZATION_ONBOARDING_TASK_PATCH = 'collection.organizationOnboardingTask.patch',
  COLLECTION_ORGANIZATION_ONBOARDING_TASK_REMOVE = 'collection.organizationOnboardingTask.remove',
  COLLECTION_ORGANIZATION_TRAINING_RULE_FIND = 'collection.organizationTrainingRule.find',
  COLLECTION_ORGANIZATION_TRAINING_RULE_GET = 'collection.organizationTrainingRule.get',
  COLLECTION_ORGANIZATION_TRAINING_RULE_REMOVE = 'collection.organizationTrainingRule.remove',
  COLLECTION_ORGANIZATION_TRAINING_RULE_UPSERT = 'collection.organizationTrainingRule.upsert',
  COLLECTION_PLUGIN_CREATE = 'collection.plugin.create',
  COLLECTION_PLUGIN_FIND = 'collection.plugin.find',
  COLLECTION_PLUGIN_GET = 'collection.plugin.get',
  COLLECTION_PLUGIN_PATCH = 'collection.plugin.patch',
  COLLECTION_PLUGIN_REMOVE = 'collection.plugin.remove',
  COLLECTION_PLUGIN_UPDATE = 'collection.plugin.update',
  COLLECTION_PLUGIN_UPSERT = 'collection.plugin.upsert',
  COLLECTION_QUEST_AGGREGATE = 'collection.quest.aggregate',
  COLLECTION_QUEST_CREATE = 'collection.quest.create',
  COLLECTION_QUEST_FIND = 'collection.quest.find',
  COLLECTION_QUEST_GET = 'collection.quest.get',
  COLLECTION_QUEST_PATCH = 'collection.quest.patch',
  COLLECTION_QUEST_REMOVE = 'collection.quest.remove',
  COLLECTION_QUEST_UPDATE = 'collection.quest.update',
  COLLECTION_QUEST_UPSERT = 'collection.quest.upsert',
  COLLECTION_QUEST_TEMPLATE_CREATE = 'collection.questTemplate.create',
  COLLECTION_QUEST_TEMPLATE_FIND = 'collection.questTemplate.find',
  COLLECTION_QUEST_TEMPLATE_GET = 'collection.questTemplate.get',
  COLLECTION_QUEST_TEMPLATE_PATCH = 'collection.questTemplate.patch',
  COLLECTION_QUEST_TEMPLATE_REMOVE = 'collection.questTemplate.remove',
  COLLECTION_QUEST_TEMPLATE_UPDATE = 'collection.questTemplate.update',
  COLLECTION_QUEST_TEMPLATE_UPSERT = 'collection.questTemplate.upsert',
  COLLECTION_QUIZ_MODULE_CREATE = 'collection.quizModule.create',
  COLLECTION_QUIZ_MODULE_FIND = 'collection.quizModule.find',
  COLLECTION_QUIZ_MODULE_GET = 'collection.quizModule.get',
  COLLECTION_QUIZ_MODULE_PATCH = 'collection.quizModule.patch',
  COLLECTION_QUIZ_MODULE_REMOVE = 'collection.quizModule.remove',
  COLLECTION_QUIZ_MODULE_UPDATE = 'collection.quizModule.update',
  COLLECTION_QUIZ_MODULE_UPSERT = 'collection.quizModule.upsert',
  COLLECTION_QUIZ_TEMPLATE_CREATE = 'collection.quizTemplate.create',
  COLLECTION_QUIZ_TEMPLATE_FIND = 'collection.quizTemplate.find',
  COLLECTION_QUIZ_TEMPLATE_GET = 'collection.quizTemplate.get',
  COLLECTION_QUIZ_TEMPLATE_PATCH = 'collection.quizTemplate.patch',
  COLLECTION_QUIZ_TEMPLATE_REMOVE = 'collection.quizTemplate.remove',
  COLLECTION_QUIZ_TEMPLATE_UPDATE = 'collection.quizTemplate.update',
  COLLECTION_RANK_FIND = 'collection.rank.find',
  COLLECTION_REFRESH_TOKEN_CREATE = 'collection.refreshToken.create',
  COLLECTION_REFRESH_TOKEN_FIND = 'collection.refreshToken.find',
  COLLECTION_REFRESH_TOKEN_REMOVE = 'collection.refreshToken.remove',
  COLLECTION_TAG_FIND = 'collection.tag.find',
  COLLECTION_TAG_FIND_VECTOR_TAG = 'collection.tag.findVectorTag',
  COLLECTION_TASK_CREATE = 'collection.task.create',
  COLLECTION_TASK_CREATE_MANY = 'collection.task.createMany',
  COLLECTION_TASK_FIND = 'collection.task.find',
  COLLECTION_TASK_GET = 'collection.task.get',
  COLLECTION_TASK_PATCH = 'collection.task.patch',
  COLLECTION_TASK_REMOVE = 'collection.task.remove',
  COLLECTION_TASK_UPDATE = 'collection.task.update',
  COLLECTION_TASK_UPSERT = 'collection.task.upsert',
  COLLECTION_TASK_GROUP_CREATE = 'collection.taskGroup.create',
  COLLECTION_TASK_GROUP_FIND = 'collection.taskGroup.find',
  COLLECTION_TASK_GROUP_GET = 'collection.taskGroup.get',
  COLLECTION_TASK_GROUP_PATCH = 'collection.taskGroup.patch',
  COLLECTION_TASK_GROUP_REMOVE = 'collection.taskGroup.remove',
  COLLECTION_TASK_GROUP_UPDATE = 'collection.taskGroup.update',
  COLLECTION_TASK_GROUP_UPSERT = 'collection.taskGroup.upsert',
  COLLECTION_THREAT_AGGREGATE = 'collection.threat.aggregate',
  COLLECTION_THREAT_CREATE = 'collection.threat.create',
  COLLECTION_THREAT_FIND = 'collection.threat.find',
  COLLECTION_THREAT_GET = 'collection.threat.get',
  COLLECTION_THREAT_PATCH = 'collection.threat.patch',
  COLLECTION_THREAT_REMOVE = 'collection.threat.remove',
  COLLECTION_THREAT_UPDATE = 'collection.threat.update',
  COLLECTION_THREAT_UPSERT = 'collection.threat.upsert',
  COLLECTION_THREAT_OBSERVABLE_CREATE = 'collection.threatObservable.create',
  COLLECTION_THREAT_OBSERVABLE_FIND = 'collection.threatObservable.find',
  COLLECTION_THREAT_OBSERVABLE_GET = 'collection.threatObservable.get',
  COLLECTION_THREAT_OBSERVABLE_PATCH = 'collection.threatObservable.patch',
  COLLECTION_THREAT_OBSERVABLE_REMOVE = 'collection.threatObservable.remove',
  COLLECTION_THREAT_OBSERVABLE_UPDATE = 'collection.threatObservable.update',
  COLLECTION_THREAT_OBSERVABLE_UPSERT = 'collection.threatObservable.upsert',
  COLLECTION_THREAT_RESOURCE_FIND = 'collection.threatResource.find',
  COLLECTION_THREAT_RESOURCE_UPSERT = 'collection.threatResource.upsert',
  COLLECTION_THREAT_SIMILARITY_GROUP_CREATE = 'collection.threatSimilarityGroup.create',
  COLLECTION_THREAT_SIMILARITY_GROUP_FIND = 'collection.threatSimilarityGroup.find',
  COLLECTION_THREAT_SIMILARITY_GROUP_GET = 'collection.threatSimilarityGroup.get',
  COLLECTION_THREAT_SIMILARITY_GROUP_PATCH = 'collection.threatSimilarityGroup.patch',
  COLLECTION_THREAT_SIMILARITY_GROUP_REMOVE = 'collection.threatSimilarityGroup.remove',
  COLLECTION_THREAT_SIMILARITY_GROUP_UPSERT = 'collection.threatSimilarityGroup.upsert',
  COLLECTION_TRANSLATION_CREATE = 'collection.translation.create',
  COLLECTION_TRANSLATION_FIND = 'collection.translation.find',
  COLLECTION_TRANSLATION_GET = 'collection.translation.get',
  COLLECTION_TRANSLATION_PATCH = 'collection.translation.patch',
  COLLECTION_TRANSLATION_REMOVE = 'collection.translation.remove',
  COLLECTION_TRANSLATION_UPDATE = 'collection.translation.update',
  COLLECTION_TRANSLATION_UPSERT = 'collection.translation.upsert',
  COLLECTION_USER_ADD_FEATURE_FOR_USER = 'collection.user.addFeatureForUser',
  COLLECTION_USER_AGGREGATE = 'collection.user.aggregate',
  COLLECTION_USER_CREATE = 'collection.user.create',
  COLLECTION_USER_DISTINCT = 'collection.user.distinct',
  COLLECTION_USER_FIND = 'collection.user.find',
  COLLECTION_USER_FIND_ADMINS_BY_ORGANIZATION_ID = 'collection.user.findAdminsByOrganizationId',
  COLLECTION_USER_FIND_COWORKERS_BY_ORGANIZATION_ID = 'collection.user.findCoworkersByOrganizationId',
  COLLECTION_USER_GET = 'collection.user.get',
  COLLECTION_USER_PATCH = 'collection.user.patch',
  COLLECTION_USER_REMOVE = 'collection.user.remove',
  COLLECTION_USER_REMOVE_FEATURE_FROM_USER = 'collection.user.removeFeatureFromUser',
  COLLECTION_USER_UPDATE = 'collection.user.update',
  COLLECTION_USER_UPSERT = 'collection.user.upsert',
  COLLECTION_USER_FEEDBACK_CREATE = 'collection.userFeedback.create',
  COLLECTION_USER_FEEDBACK_FIND = 'collection.userFeedback.find',
  COLLECTION_USER_FEEDBACK_PATCH = 'collection.userFeedback.patch',
  COLLECTION_USER_FEEDBACK_REMOVE = 'collection.userFeedback.remove',
  COLLECTION_VECTOR_CREATE = 'collection.vector.create',
  COLLECTION_VECTOR_FIND = 'collection.vector.find',
  COLLECTION_VECTOR_GET = 'collection.vector.get',
  COLLECTION_VECTOR_PATCH = 'collection.vector.patch',
  COLLECTION_VECTOR_REMOVE = 'collection.vector.remove',
  COLLECTION_VECTOR_UPDATE = 'collection.vector.update',
  COLLECTION_VECTOR_UPSERT = 'collection.vector.upsert',
  DATA_DASH_PROXY_DASH_REQUESTS = 'data.dash.proxyDashRequests',
  GAME_CHALLENGE_UPDATE_FOR_USER = 'game.challenge.updateForUser',
  GAME_CYCLE_FULL = 'game.cycle.full',
  GAME_CYCLE_USER = 'game.cycle.user',
  GAME_EMAIL_INVITE_ORGANIZATIONS_UNSTARTED_USERS = 'game.email.inviteOrganizationsUnstartedUsers',
  GAME_EMAIL_SEND_ACTIVATION_EMAIL = 'game.email.sendActivationEmail',
  GAME_EMAIL_SEND_WELCOME_EMAIL = 'game.email.sendWelcomeEmail',
  GAME_ENGINE_CREATE_NEW_QUEST = 'game.engine.createNewQuest',
  GAME_ENGINE_GET_QUEST_BASED_ON_LATEST_THEME = 'game.engine.getQuestBasedOnLatestTheme',
  GAME_ENGINE_GET_TRANSLATED_QUEST = 'game.engine.getTranslatedQuest',
  GAME_LEADERBOARD_GET_COUNTRY_LEADERBOARD = 'game.leaderboard.getCountryLeaderboard',
  GAME_LEADERBOARD_GET_LEADERBOARD = 'game.leaderboard.getLeaderboard',
  GAME_LEADERBOARD_GET_SIMPLE_USER_STARS_LEADERBOARD = 'game.leaderboard.getSimpleUserStarsLeaderboard',
  GAME_LEADERBOARD_GET_USER_STARS_LEADERBOARD = 'game.leaderboard.getUserStarsLeaderboard',
  GAME_ORGANIZATION_SCHEDULE_REMINDER_EMAILS = 'game.organization.scheduleReminderEmails',
  GAME_ORGANIZATION_SET_DEMO_MODE = 'game.organization.setDemoMode',
  GAME_ORGANIZATION_UPDATE_ACHIEVEMENT_AGGREGATES = 'game.organization.updateAchievementAggregates',
  GAME_ORGANIZATION_UPDATE_COUNTRY_LEADERBOARD_AGGREGATES = 'game.organization.updateCountryLeaderboardAggregates',
  GAME_ORGANIZATION_UPDATE_USER_COUNT_BY_COUNTRY_AGGREGATES = 'game.organization.updateUserCountByCountryAggregates',
  GAME_QUEST_DELIVER = 'game.quest.deliver',
  GAME_QUEST_EXPIRE = 'game.quest.expire',
  GAME_QUEST_EXPIRE_ALL = 'game.quest.expireAll',
  GAME_QUEST_FAIL = 'game.quest.fail',
  GAME_QUEST_GET_ATTACHMENT = 'game.quest.getAttachment',
  GAME_QUEST_GET_FAIL_URL = 'game.quest.getFailUrl',
  GAME_QUEST_GET_RESULT_URL = 'game.quest.getResultUrl',
  GAME_QUEST_GET_SIGNED_FAIL_URL = 'game.quest.getSignedFailUrl',
  GAME_QUEST_GET_SIGNED_RESULT_URL = 'game.quest.getSignedResultUrl',
  GAME_QUEST_REGISTER = 'game.quest.register',
  GAME_QUEST_REPORT = 'game.quest.report',
  GAME_QUEST_REPORT_WITH_MESSAGE_ID = 'game.quest.reportWithMessageId',
  GAME_QUEST_TRACK_DELIVERY = 'game.quest.trackDelivery',
  GAME_QUEST_TEMPLATE_CHECK_COMPILABILITY = 'game.questTemplate.checkCompilability',
  GAME_QUEST_TEMPLATE_COMPILE_QUEST_TEMPLATE_PREVIEW = 'game.questTemplate.compileQuestTemplatePreview',
  GAME_QUEST_TEMPLATE_COMPILE_QUEST_TEMPLATE_STRING = 'game.questTemplate.compileQuestTemplateString',
  GAME_QUEST_TEMPLATE_COMPILE_QUEST_TO_VECTOR = 'game.questTemplate.compileQuestToVector',
  GAME_QUEST_TEMPLATE_GENERATE_FAILURE_FUNNEL = 'game.questTemplate.generateFailureFunnel',
  GAME_QUEST_TEMPLATE_GET_DIFFICULTY_FACTORS = 'game.questTemplate.getDifficultyFactors',
  GAME_QUEST_TEMPLATE_GET_EXAMPLE_CONTEXT = 'game.questTemplate.getExampleContext',
  GAME_QUEST_TEMPLATE_UPDATE_STATISTICS = 'game.questTemplate.updateStatistics',
  GAME_QUIZ_ACT_ON_PREVIEW = 'game.quiz.actOnPreview',
  GAME_QUIZ_ACT_ON_QUIZ_OBJECTIVE = 'game.quiz.actOnQuizObjective',
  GAME_QUIZ_PREVIEW = 'game.quiz.preview',
  GAME_QUIZ_SELECT_NEXT_FOR_USER = 'game.quiz.selectNextForUser',
  GAME_RESULT_GET = 'game.result.get',
  GAME_RESULT_SELECT_AND_PATCH_SECONDARY_OBJECTIVE = 'game.result.selectAndPatchSecondaryObjective',
  GAME_USER_CLAIM_ACHIEVEMENT = 'game.user.claimAchievement',
  GAME_USER_GET_CHANGED_REWARDS = 'game.user.getChangedRewards',
  GAME_USER_IMPOSE_DELIVERY_COOLDOWN = 'game.user.imposeDeliveryCooldown',
  GAME_USER_LEGACY_ONBOARD_USER = 'game.user.legacyOnboardUser',
  GAME_USER_ONBOARD_USER = 'game.user.onboardUser',
  GAME_USER_RECALCULATE_STATS = 'game.user.recalculateStats',
  GAME_USER_RESET_USER_GAME = 'game.user.resetUserGame',
  GAME_USER_SELF_ONBOARD = 'game.user.selfOnboard',
  GAME_USER_START = 'game.user.start',
  GAME_USER_START_GAME_FOR_ORGANIZATIONS_UNSTARTED_USERS = 'game.user.startGameForOrganizationsUnstartedUsers',
  GAME_USER_START_GAME_FOR_USERS_WITH_AUTOMATIC_ENROLLMENT = 'game.user.startGameForUsersWithAutomaticEnrollment',
  GAME_USER_UPDATE_ONBOARDING_ELIGIBILITY = 'game.user.updateOnboardingEligibility',
  GAME_USER_UPDATE_PLAYER_STATS = 'game.user.updatePlayerStats',
  INFRASTRUCTURE_AUTH_CREATE_TOKEN = 'infrastructure.auth.createToken',
  INFRASTRUCTURE_AUTH_GET_SIGNIN_DATA = 'infrastructure.auth.getSigninData',
  INFRASTRUCTURE_AUTH_RESOLVE_API_USER_FROM_TOKEN = 'infrastructure.auth.resolveApiUserFromToken',
  INFRASTRUCTURE_AUTH_REVOKE_TOKEN = 'infrastructure.auth.revokeToken',
  INFRASTRUCTURE_AUTH_VERIFY_TOKEN_AGAINST_WHITELIST = 'infrastructure.auth.verifyTokenAgainstWhitelist',
  INFRASTRUCTURE_DATABASE_CLEANUP = 'infrastructure.database.cleanup',
  INFRASTRUCTURE_DATABASE_REMOVE_PRE_UPLOADED_THREATS = 'infrastructure.database.removePreUploadedThreats',
  INFRASTRUCTURE_DISTRIBUTED_LOCK_ACQUIRE_LOCK = 'infrastructure.distributedLock.acquireLock',
  INFRASTRUCTURE_DISTRIBUTED_LOCK_RELEASE_LOCK = 'infrastructure.distributedLock.releaseLock',
  INFRASTRUCTURE_DKIM_CREATE = 'infrastructure.dkim.create',
  INFRASTRUCTURE_DKIM_GET_SIGNING_KEY = 'infrastructure.dkim.getSigningKey',
  INFRASTRUCTURE_HEALTH_ALIVE = 'infrastructure.health.alive',
  INFRASTRUCTURE_HEALTH_READY = 'infrastructure.health.ready',
  INFRASTRUCTURE_HOX_HASH_COMPARE = 'infrastructure.hoxHash.compare',
  INFRASTRUCTURE_HOX_HASH_COMPARE_BATCHED = 'infrastructure.hoxHash.compareBatched',
  INFRASTRUCTURE_HOX_HASH_COMPUTE_FUZZY_HASH = 'infrastructure.hoxHash.computeFuzzyHash',
  INFRASTRUCTURE_HOX_URL_CREATE_SHORT_LINK = 'infrastructure.hoxUrl.createShortLink',
  INFRASTRUCTURE_HTML_TO_IMAGE_CREATE_IMAGE_FROM_HTML = 'infrastructure.htmlToImage.createImageFromHtml',
  INFRASTRUCTURE_ID_GENERATE_HUMAN_READABLE_ID = 'infrastructure.id.generateHumanReadableId',
  INFRASTRUCTURE_JWT_CREATE = 'infrastructure.jwt.create',
  INFRASTRUCTURE_JWT_DECODE = 'infrastructure.jwt.decode',
  INFRASTRUCTURE_JWT_SIGN_URL_FOR_CURRENT_USER = 'infrastructure.jwt.signUrlForCurrentUser',
  INFRASTRUCTURE_JWT_VERIFY = 'infrastructure.jwt.verify',
  INFRASTRUCTURE_JWT_VERIFY_SIGNED_URL = 'infrastructure.jwt.verifySignedUrl',
  INFRASTRUCTURE_LOGGER_LOG = 'infrastructure.logger.log',
  INFRASTRUCTURE_MIGRATION_BACKFILL_ONBOARDING_EVENTS = 'infrastructure.migration.backfillOnboardingEvents',
  INFRASTRUCTURE_MIGRATION_BACKFILL_QUEST_MARKER_STARS = 'infrastructure.migration.backfillQuestMarkerStars',
  INFRASTRUCTURE_MIGRATION_BACKFILL_USER_QUEST_MARKER_STARS = 'infrastructure.migration.backfillUserQuestMarkerStars',
  INFRASTRUCTURE_MIGRATION_ENRICH_PREVIOUSLY_FAILED_THREATS = 'infrastructure.migration.enrichPreviouslyFailedThreats',
  INFRASTRUCTURE_MIGRATION_SPLIT_HOPS = 'infrastructure.migration.splitHops',
  INFRASTRUCTURE_MIGRATION_V175_FIX_THREAT_HEADERS = 'infrastructure.migration.v175FixThreatHeaders',
  INFRASTRUCTURE_PROFILE_CAPTURE_PERFORMANCE_PROFILE = 'infrastructure.profile.capturePerformanceProfile',
  INTEGRATION_AZURE_GET_RESOURCE_TEMPLATE = 'integration.azure.getResourceTemplate',
  INTEGRATION_AZURE_GET_RESOURCE_TEMPLATE_URL = 'integration.azure.getResourceTemplateUrl',
  INTEGRATION_BITLY_GET_URL = 'integration.bitly.getUrl',
  INTEGRATION_CLOUDINARY_SIGN_UPLOAD = 'integration.cloudinary.signUpload',
  INTEGRATION_DNS_LOOKUP = 'integration.dns.lookup',
  INTEGRATION_DNS_LOOKUP_MX = 'integration.dns.lookupMx',
  INTEGRATION_DNS_VALIDATE_SPF = 'integration.dns.validateSpf',
  INTEGRATION_EMAIL_BUILD = 'integration.email.build',
  INTEGRATION_EMAIL_DELIVER = 'integration.email.deliver',
  INTEGRATION_EMAIL_IMPOSE_DELIVERY_LIMIT = 'integration.email.imposeDeliveryLimit',
  INTEGRATION_EMAIL_SEND = 'integration.email.send',
  INTEGRATION_EMAIL_TRACK_DELIVERY = 'integration.email.trackDelivery',
  INTEGRATION_GMAIL_FETCH_EMAIL_DELIVERY_ACCESS_TOKEN = 'integration.gmail.fetchEmailDeliveryAccessToken',
  INTEGRATION_GMAIL_GET_API_CREDENTIALS = 'integration.gmail.getApiCredentials',
  INTEGRATION_GMAIL_INSERT_MESSAGE = 'integration.gmail.insertMessage',
  INTEGRATION_GOOGLE_CLOUD_KMS_DECRYPT_ASYMMETRIC = 'integration.googleCloudKms.decryptAsymmetric',
  INTEGRATION_GOOGLE_CLOUD_KMS_GET_PUBLIC_KEY = 'integration.googleCloudKms.getPublicKey',
  INTEGRATION_GOOGLE_CLOUD_STORAGE_DELETE_FILE = 'integration.googleCloudStorage.deleteFile',
  INTEGRATION_GOOGLE_CLOUD_STORAGE_DOWNLOAD_FILE = 'integration.googleCloudStorage.downloadFile',
  INTEGRATION_GOOGLE_CLOUD_STORAGE_GET_SIGNED_URL = 'integration.googleCloudStorage.getSignedUrl',
  INTEGRATION_GOOGLE_CLOUD_STORAGE_LIST_FILES = 'integration.googleCloudStorage.listFiles',
  INTEGRATION_GOOGLE_CLOUD_STORAGE_UPLOAD = 'integration.googleCloudStorage.upload',
  INTEGRATION_HTTP_REQUEST = 'integration.http.request',
  INTEGRATION_VIRUSTOTAL_AUGMENT_FETCH_EPHEMERAL_URL = 'integration.virustotalAugment.fetchEphemeralUrl',
  INTEGRATION_ZENDESK_CREATE_TOKEN = 'integration.zendesk.createToken',
  INTEGRATION_ZENDESK_REDIRECT = 'integration.zendesk.redirect',
  INTERNAL_DIAGNOSTICS_DEBUG_ENGINE_HEURISTICS = 'internal.diagnostics.debugEngineHeuristics',
  INTERNAL_EXPERIMENTS_INIT_OR_GET_USER_SPLIT_TEST_CASE = 'internal.experiments.initOrGetUserSplitTestCase',
  INTERNAL_FEATURES_HAS_FEATURE = 'internal.features.hasFeature',
  INTERNAL_FEATURES_HAS_FEATURES = 'internal.features.hasFeatures',
  INTERNAL_FEATURES_TRACK_ORGANIZATION_FEATURES = 'internal.features.trackOrganizationFeatures',
  INTL_TRANSLATIONS_GET_ALL = 'intl.translations.getAll',
  INTL_TRANSLATIONS_GET_CDN_TRANSLATIONS = 'intl.translations.getCdnTranslations',
  INTL_TRANSLATIONS_GET_DATABASE_SOURCE_MESSAGES = 'intl.translations.getDatabaseSourceMessages',
  INTL_TRANSLATIONS_GET_STATIC_SOURCE_MESSAGES = 'intl.translations.getStaticSourceMessages',
  INTL_TRANSLATIONS_SYNC_TRANSLATIONS = 'intl.translations.syncTranslations',
  INTL_TRANSLATIONS_UPLOAD_DYNAMIC_TRANSLATIONS = 'intl.translations.uploadDynamicTranslations',
  LEGACY_FINGERPRINT_USER_UPDATE = 'legacy.fingerprintUser.update',
  LEGACY_IMPORT_USERS_CREATE = 'legacy.importUsers.create',
  LEGACY_MARKER_FACTORY_CREATE = 'legacy.markerFactory.create',
  LEGACY_MARKER_FACTORY_REMOVE = 'legacy.markerFactory.remove',
  LEGACY_MARKER_FACTORY_UPDATE = 'legacy.markerFactory.update',
  LEGACY_QUEST_MARKER_REVIEW_CREATE = 'legacy.questMarkerReview.create',
  LEGACY_SEND_QUEST_TO_ORGANIZATION_CREATE = 'legacy.sendQuestToOrganization.create',
  LEGACY_SEND_QUEST_TO_USER_CREATE = 'legacy.sendQuestToUser.create',
  LEGACY_THREAT_OBSERVABLE_TASK_CREATE = 'legacy.threatObservableTask.create',
  LEGACY_THREAT_OBSERVABLE_TASK_UPDATE = 'legacy.threatObservableTask.update',
  LEGACY_THREAT_OBSERVABLE_TASK_UPSERT = 'legacy.threatObservableTask.upsert',
  LEGACY_USER_TAG_CREATOR_CREATE = 'legacy.userTagCreator.create',
  ORGANIZATION_DOMAIN_UPDATE = 'organization.domain.update',
  ORGANIZATION_QUIZ_GET_MODULES = 'organization.quiz.getModules',
  ORGANIZATION_QUIZ_SYNC_ORG_MODULE_STATE = 'organization.quiz.syncOrgModuleState',
  ORGANIZATION_QUIZ_UPSERT_MODULE = 'organization.quiz.upsertModule',
  ORGANIZATION_QUIZ_UPSERT_MODULE_TEMPLATE = 'organization.quiz.upsertModuleTemplate',
  PLUGIN_ACTION_CLICK = 'plugin.action.click',
  PLUGIN_ACTION_HANDLE_ACTION = 'plugin.action.handleAction',
  PLUGIN_ACTION_REPORT_QUEST = 'plugin.action.reportQuest',
  PLUGIN_ACTION_START = 'plugin.action.start',
  PLUGIN_ACTION_START_GAME = 'plugin.action.startGame',
  PLUGIN_ACTION_UPLOAD = 'plugin.action.upload',
  PLUGIN_RESPONSE_UNKNOWN_USER = 'plugin.response.unknownUser',
  QUEST_TEMPLATE_BENCHMARK_FIND_TEMPLATES = 'questTemplate.benchmark.findTemplates',
  QUEST_TEMPLATE_SEARCH_FIND_QUEST_TEMPLATES_BY_SEARCH_STRING = 'questTemplate.search.findQuestTemplatesBySearchString',
  SECURITY_VALIDATION_SANITIZE_HTML = 'security.validation.sanitizeHtml',
  TEMPLATING_HANDLEBARS_COMPILE_TEMPLATE = 'templating.handlebars.compileTemplate',
  TEMPLATING_HANDLEBARS_PARSE_TEMPLATE = 'templating.handlebars.parseTemplate',
  THREAT_ANALYSIS_ASSIGN = 'threat.analysis.assign',
  THREAT_ANALYSIS_CALCULATE_STATISTICS = 'threat.analysis.calculateStatistics',
  THREAT_ANALYSIS_CALCULATE_TREND_HISTOGRAM = 'threat.analysis.calculateTrendHistogram',
  THREAT_ANALYSIS_CALL_ML_MODEL_WITH_THREAT = 'threat.analysis.callMlModelWithThreat',
  THREAT_ANALYSIS_GET_PRIORITISED_LIST_OF_ANALYSABLE_THREATS = 'threat.analysis.getPrioritisedListOfAnalysableThreats',
  THREAT_ANALYSIS_RATE_SIMILARITY_GROUP = 'threat.analysis.rateSimilarityGroup',
  THREAT_ANALYSIS_RATE_THREAT = 'threat.analysis.rateThreat',
  THREAT_CORTEX_ANALYZE = 'threat.cortex.analyze',
  THREAT_CORTEX_GET_ANALYZERS = 'threat.cortex.getAnalyzers',
  THREAT_CORTEX_GET_JOB_REPORT = 'threat.cortex.getJobReport',
  THREAT_FEEDBACK_SEND_FEEDBACK_TO_USER = 'threat.feedback.sendFeedbackToUser',
  THREAT_FEEDBACK_START_BATCHED_THREAT_FEEDBACK = 'threat.feedback.startBatchedThreatFeedback',
  THREAT_HUNTING_DELETE_EMAIL = 'threat.hunting.deleteEmail',
  THREAT_HUNTING_GET_SEARCH_RESULTS = 'threat.hunting.getSearchResults',
  THREAT_HUNTING_INITIALIZE_SETTINGS = 'threat.hunting.initializeSettings',
  THREAT_HUNTING_REVERT_EMAIL_DELETION = 'threat.hunting.revertEmailDeletion',
  THREAT_HUNTING_START_SEARCH = 'threat.hunting.startSearch',
  THREAT_HUNTING_TIMEOUT_OLD_HUNTING_SEARCH_JOBS = 'threat.hunting.timeoutOldHuntingSearchJobs',
  THREAT_PIPELINE_ASSIGN_SIMILARITY_GROUP = 'threat.pipeline.assignSimilarityGroup',
  THREAT_PIPELINE_ENRICH_THREAT = 'threat.pipeline.enrichThreat',
  THREAT_PIPELINE_ESCALATE = 'threat.pipeline.escalate',
  THREAT_PIPELINE_RATE_AUTOMATICALLY = 'threat.pipeline.rateAutomatically',
  THREAT_PIPELINE_RUN_PIPELINE_FOR_THREATS = 'threat.pipeline.runPipelineForThreats',
  THREAT_PIPELINE_UPDATE_INCIDENTS = 'threat.pipeline.updateIncidents',
  THREAT_RULES_EVALUATE_EXPRESSION = 'threat.rules.evaluateExpression',
  THREAT_SEARCH_FIND_INCIDENTS_BY_SEARCH_STRING = 'threat.search.findIncidentsBySearchString',
  THREAT_SEARCH_FIND_THREATS_BY_SEARCH_STRING = 'threat.search.findThreatsBySearchString',
  USER_ADMIN_ACTION_SEND_QUEST = 'user.adminAction.sendQuest',
  USER_BULK_SEND_QUEST = 'user.bulk.sendQuest',
  USER_BULK_ACTION_FAN_OUT = 'user.bulkAction.fanOut',
  USER_EMAIL_INVITE_USER = 'user.email.inviteUser',
  USER_ENRICHMENT_ADD_GEOLOCATION = 'user.enrichment.addGeolocation',
  USER_ENRICHMENT_PERSIST_EVENTS = 'user.enrichment.persistEvents',
  USER_ENRICHMENT_PERSIST_EVENTS_AND_RECALCULATE_REWARDS = 'user.enrichment.persistEventsAndRecalculateRewards',
  USER_NPS_CREATE = 'user.nps.create',
  USER_NPS_SHOULD_ASK_NPS_SURVEY = 'user.nps.shouldAskNpsSurvey',
  USER_ROLES_ADD_ROLE = 'user.roles.addRole',
  USER_ROLES_REMOVE_ROLES = 'user.roles.removeRoles',
  USER_ROLES_SET_ROLE = 'user.roles.setRole',
  USER_SEARCH_FIND_USERS_BY_SEARCH_STRING = 'user.search.findUsersBySearchString',
  USER_SOFT_DELETE_DEACTIVATE_USER = 'user.softDelete.deactivateUser',
  USER_SOFT_DELETE_REACTIVATE_USER = 'user.softDelete.reactivateUser',
}

export const handlerTree: THandlerFuncTree = Object.freeze({
  admin: Object.freeze({
    organizationOnboarding: {
      completeOnboardingTask: createHandlerFunc(
        ['admin', 'organizationOnboarding', 'completeOnboardingTask'],
        adminOrganizationOnboardingCompleteOnboardingTask
      ),
      getOnboardingTaskTemplates: createHandlerFunc(
        ['admin', 'organizationOnboarding', 'getOnboardingTaskTemplates'],
        adminOrganizationOnboardingGetOnboardingTaskTemplates
      ),
      launchOrganization: createHandlerFunc(
        ['admin', 'organizationOnboarding', 'launchOrganization'],
        adminOrganizationOnboardingLaunchOrganization
      ),
      reopenOnboardingTask: createHandlerFunc(
        ['admin', 'organizationOnboarding', 'reopenOnboardingTask'],
        adminOrganizationOnboardingReopenOnboardingTask
      ),
      start: createHandlerFunc(
        ['admin', 'organizationOnboarding', 'start'],
        adminOrganizationOnboardingStart
      ),
    },
    scim: {
      createUser: createHandlerFunc(
        ['admin', 'scim', 'createUser'],
        adminScimCreateUser
      ),
      findUsers: createHandlerFunc(
        ['admin', 'scim', 'findUsers'],
        adminScimFindUsers
      ),
      getUser: createHandlerFunc(
        ['admin', 'scim', 'getUser'],
        adminScimGetUser
      ),
      removeUser: createHandlerFunc(
        ['admin', 'scim', 'removeUser'],
        adminScimRemoveUser
      ),
      replaceUser: createHandlerFunc(
        ['admin', 'scim', 'replaceUser'],
        adminScimReplaceUser
      ),
      updateUser: createHandlerFunc(
        ['admin', 'scim', 'updateUser'],
        adminScimUpdateUser
      ),
    },
    technicalTesting: {
      findTestTemplates: createHandlerFunc(
        ['admin', 'technicalTesting', 'findTestTemplates'],
        adminTechnicalTestingFindTestTemplates
      ),
      removeTechnicalTestingQuests: createHandlerFunc(
        ['admin', 'technicalTesting', 'removeTechnicalTestingQuests'],
        adminTechnicalTestingRemoveTechnicalTestingQuests
      ),
      sendTestQuestToUser: createHandlerFunc(
        ['admin', 'technicalTesting', 'sendTestQuestToUser'],
        adminTechnicalTestingSendTestQuestToUser
      ),
    },
  }),
  analytics: Object.freeze({
    cubes: {
      query: createHandlerFunc(
        ['analytics', 'cubes', 'query'],
        analyticsCubesQuery
      ),
    },
    ingest: {
      createEnriched: createHandlerFunc(
        ['analytics', 'ingest', 'createEnriched'],
        analyticsIngestCreateEnriched
      ),
      ping: createHandlerFunc(
        ['analytics', 'ingest', 'ping'],
        analyticsIngestPing
      ),
      track: createHandlerFunc(
        ['analytics', 'ingest', 'track'],
        analyticsIngestTrack
      ),
    },
    sink: {
      track: createHandlerFunc(
        ['analytics', 'sink', 'track'],
        analyticsSinkTrack
      ),
    },
  }),
  auth: Object.freeze({
    email: {
      sendJwtMagicLinkViaEmail: createHandlerFunc(
        ['auth', 'email', 'sendJwtMagicLinkViaEmail'],
        authEmailSendJwtMagicLinkViaEmail
      ),
      sendMagicLinkEmail: createHandlerFunc(
        ['auth', 'email', 'sendMagicLinkEmail'],
        authEmailSendMagicLinkEmail
      ),
    },
    iap: {
      findUser: createHandlerFunc(['auth', 'iap', 'findUser'], authIapFindUser),
    },
    impersonate: {
      loginAsOtherUser: createHandlerFunc(
        ['auth', 'impersonate', 'loginAsOtherUser'],
        authImpersonateLoginAsOtherUser
      ),
    },
    info: {
      getLoginInfo: createHandlerFunc(
        ['auth', 'info', 'getLoginInfo'],
        authInfoGetLoginInfo
      ),
    },
    jwt: {
      consumeRefreshToken: createHandlerFunc(
        ['auth', 'jwt', 'consumeRefreshToken'],
        authJwtConsumeRefreshToken
      ),
      createAccessToken: createHandlerFunc(
        ['auth', 'jwt', 'createAccessToken'],
        authJwtCreateAccessToken
      ),
      createHuntingAccessToken: createHandlerFunc(
        ['auth', 'jwt', 'createHuntingAccessToken'],
        authJwtCreateHuntingAccessToken
      ),
      createLoginUrl: createHandlerFunc(
        ['auth', 'jwt', 'createLoginUrl'],
        authJwtCreateLoginUrl
      ),
      createRefreshToken: createHandlerFunc(
        ['auth', 'jwt', 'createRefreshToken'],
        authJwtCreateRefreshToken
      ),
      handleRefreshToken: createHandlerFunc(
        ['auth', 'jwt', 'handleRefreshToken'],
        authJwtHandleRefreshToken
      ),
      login: createHandlerFunc(['auth', 'jwt', 'login'], authJwtLogin),
      logout: createHandlerFunc(['auth', 'jwt', 'logout'], authJwtLogout),
      verifyAccessToken: createHandlerFunc(
        ['auth', 'jwt', 'verifyAccessToken'],
        authJwtVerifyAccessToken
      ),
      verifyRefreshToken: createHandlerFunc(
        ['auth', 'jwt', 'verifyRefreshToken'],
        authJwtVerifyRefreshToken
      ),
    },
    otp: {
      consumeOtp: createHandlerFunc(
        ['auth', 'otp', 'consumeOtp'],
        authOtpConsumeOtp
      ),
      createOtp: createHandlerFunc(
        ['auth', 'otp', 'createOtp'],
        authOtpCreateOtp
      ),
      createOtpLoginUrl: createHandlerFunc(
        ['auth', 'otp', 'createOtpLoginUrl'],
        authOtpCreateOtpLoginUrl
      ),
      createOtpPayload: createHandlerFunc(
        ['auth', 'otp', 'createOtpPayload'],
        authOtpCreateOtpPayload
      ),
      verifyOtp: createHandlerFunc(
        ['auth', 'otp', 'verifyOtp'],
        authOtpVerifyOtp
      ),
    },
    plugin: {
      authenticateGoogle: createHandlerFunc(
        ['auth', 'plugin', 'authenticateGoogle'],
        authPluginAuthenticateGoogle
      ),
      authenticateOfficeJs: createHandlerFunc(
        ['auth', 'plugin', 'authenticateOfficeJs'],
        authPluginAuthenticateOfficeJs
      ),
      verifyGoogleIdToken: createHandlerFunc(
        ['auth', 'plugin', 'verifyGoogleIdToken'],
        authPluginVerifyGoogleIdToken
      ),
    },
    scim: {
      createScimToken: createHandlerFunc(
        ['auth', 'scim', 'createScimToken'],
        authScimCreateScimToken
      ),
    },
  }),
  bots: Object.freeze({
    teams: {
      reportAction: createHandlerFunc(
        ['bots', 'teams', 'reportAction'],
        botsTeamsReportAction
      ),
    },
  }),
  collection: Object.freeze({
    agendaJob: {
      createMany: createHandlerFunc(
        ['collection', 'agendaJob', 'createMany'],
        collectionAgendaJobCreateMany
      ),
      find: createHandlerFunc(
        ['collection', 'agendaJob', 'find'],
        collectionAgendaJobFind
      ),
      remove: createHandlerFunc(
        ['collection', 'agendaJob', 'remove'],
        collectionAgendaJobRemove
      ),
    },
    analyticsEvent: {
      aggregate: createHandlerFunc(
        ['collection', 'analyticsEvent', 'aggregate'],
        collectionAnalyticsEventAggregate
      ),
      create: createHandlerFunc(
        ['collection', 'analyticsEvent', 'create'],
        collectionAnalyticsEventCreate
      ),
      createMany: createHandlerFunc(
        ['collection', 'analyticsEvent', 'createMany'],
        collectionAnalyticsEventCreateMany
      ),
      find: createHandlerFunc(
        ['collection', 'analyticsEvent', 'find'],
        collectionAnalyticsEventFind
      ),
      get: createHandlerFunc(
        ['collection', 'analyticsEvent', 'get'],
        collectionAnalyticsEventGet
      ),
      patch: createHandlerFunc(
        ['collection', 'analyticsEvent', 'patch'],
        collectionAnalyticsEventPatch
      ),
      remove: createHandlerFunc(
        ['collection', 'analyticsEvent', 'remove'],
        collectionAnalyticsEventRemove
      ),
      update: createHandlerFunc(
        ['collection', 'analyticsEvent', 'update'],
        collectionAnalyticsEventUpdate
      ),
      upsert: createHandlerFunc(
        ['collection', 'analyticsEvent', 'upsert'],
        collectionAnalyticsEventUpsert
      ),
    },
    clientInfo: {
      create: createHandlerFunc(
        ['collection', 'clientInfo', 'create'],
        collectionClientInfoCreate
      ),
      find: createHandlerFunc(
        ['collection', 'clientInfo', 'find'],
        collectionClientInfoFind
      ),
      get: createHandlerFunc(
        ['collection', 'clientInfo', 'get'],
        collectionClientInfoGet
      ),
      patch: createHandlerFunc(
        ['collection', 'clientInfo', 'patch'],
        collectionClientInfoPatch
      ),
      remove: createHandlerFunc(
        ['collection', 'clientInfo', 'remove'],
        collectionClientInfoRemove
      ),
      update: createHandlerFunc(
        ['collection', 'clientInfo', 'update'],
        collectionClientInfoUpdate
      ),
      upsert: createHandlerFunc(
        ['collection', 'clientInfo', 'upsert'],
        collectionClientInfoUpsert
      ),
    },
    distributedLock: {
      create: createHandlerFunc(
        ['collection', 'distributedLock', 'create'],
        collectionDistributedLockCreate
      ),
      find: createHandlerFunc(
        ['collection', 'distributedLock', 'find'],
        collectionDistributedLockFind
      ),
      remove: createHandlerFunc(
        ['collection', 'distributedLock', 'remove'],
        collectionDistributedLockRemove
      ),
    },
    emailRecord: {
      create: createHandlerFunc(
        ['collection', 'emailRecord', 'create'],
        collectionEmailRecordCreate
      ),
      createMany: createHandlerFunc(
        ['collection', 'emailRecord', 'createMany'],
        collectionEmailRecordCreateMany
      ),
      find: createHandlerFunc(
        ['collection', 'emailRecord', 'find'],
        collectionEmailRecordFind
      ),
      patch: createHandlerFunc(
        ['collection', 'emailRecord', 'patch'],
        collectionEmailRecordPatch
      ),
      remove: createHandlerFunc(
        ['collection', 'emailRecord', 'remove'],
        collectionEmailRecordRemove
      ),
    },
    feedbackRule: {
      create: createHandlerFunc(
        ['collection', 'feedbackRule', 'create'],
        collectionFeedbackRuleCreate
      ),
      find: createHandlerFunc(
        ['collection', 'feedbackRule', 'find'],
        collectionFeedbackRuleFind
      ),
      patch: createHandlerFunc(
        ['collection', 'feedbackRule', 'patch'],
        collectionFeedbackRulePatch
      ),
      remove: createHandlerFunc(
        ['collection', 'feedbackRule', 'remove'],
        collectionFeedbackRuleRemove
      ),
    },
    fingerprint: {
      create: createHandlerFunc(
        ['collection', 'fingerprint', 'create'],
        collectionFingerprintCreate
      ),
      find: createHandlerFunc(
        ['collection', 'fingerprint', 'find'],
        collectionFingerprintFind
      ),
      get: createHandlerFunc(
        ['collection', 'fingerprint', 'get'],
        collectionFingerprintGet
      ),
      patch: createHandlerFunc(
        ['collection', 'fingerprint', 'patch'],
        collectionFingerprintPatch
      ),
      remove: createHandlerFunc(
        ['collection', 'fingerprint', 'remove'],
        collectionFingerprintRemove
      ),
      update: createHandlerFunc(
        ['collection', 'fingerprint', 'update'],
        collectionFingerprintUpdate
      ),
      upsert: createHandlerFunc(
        ['collection', 'fingerprint', 'upsert'],
        collectionFingerprintUpsert
      ),
    },
    gmailAddonExecutionState: {
      create: createHandlerFunc(
        ['collection', 'gmailAddonExecutionState', 'create'],
        collectionGmailAddonExecutionStateCreate
      ),
      get: createHandlerFunc(
        ['collection', 'gmailAddonExecutionState', 'get'],
        collectionGmailAddonExecutionStateGet
      ),
      upsert: createHandlerFunc(
        ['collection', 'gmailAddonExecutionState', 'upsert'],
        collectionGmailAddonExecutionStateUpsert
      ),
    },
    huntingSearchJob: {
      create: createHandlerFunc(
        ['collection', 'huntingSearchJob', 'create'],
        collectionHuntingSearchJobCreate
      ),
      find: createHandlerFunc(
        ['collection', 'huntingSearchJob', 'find'],
        collectionHuntingSearchJobFind
      ),
      get: createHandlerFunc(
        ['collection', 'huntingSearchJob', 'get'],
        collectionHuntingSearchJobGet
      ),
      patch: createHandlerFunc(
        ['collection', 'huntingSearchJob', 'patch'],
        collectionHuntingSearchJobPatch
      ),
      remove: createHandlerFunc(
        ['collection', 'huntingSearchJob', 'remove'],
        collectionHuntingSearchJobRemove
      ),
    },
    huntingSearchJobResult: {
      create: createHandlerFunc(
        ['collection', 'huntingSearchJobResult', 'create'],
        collectionHuntingSearchJobResultCreate
      ),
      createMany: createHandlerFunc(
        ['collection', 'huntingSearchJobResult', 'createMany'],
        collectionHuntingSearchJobResultCreateMany
      ),
      find: createHandlerFunc(
        ['collection', 'huntingSearchJobResult', 'find'],
        collectionHuntingSearchJobResultFind
      ),
      get: createHandlerFunc(
        ['collection', 'huntingSearchJobResult', 'get'],
        collectionHuntingSearchJobResultGet
      ),
      patch: createHandlerFunc(
        ['collection', 'huntingSearchJobResult', 'patch'],
        collectionHuntingSearchJobResultPatch
      ),
      remove: createHandlerFunc(
        ['collection', 'huntingSearchJobResult', 'remove'],
        collectionHuntingSearchJobResultRemove
      ),
    },
    incidentBeta: {
      aggregate: createHandlerFunc(
        ['collection', 'incidentBeta', 'aggregate'],
        collectionIncidentBetaAggregate
      ),
      create: createHandlerFunc(
        ['collection', 'incidentBeta', 'create'],
        collectionIncidentBetaCreate
      ),
      find: createHandlerFunc(
        ['collection', 'incidentBeta', 'find'],
        collectionIncidentBetaFind
      ),
      get: createHandlerFunc(
        ['collection', 'incidentBeta', 'get'],
        collectionIncidentBetaGet
      ),
      patch: createHandlerFunc(
        ['collection', 'incidentBeta', 'patch'],
        collectionIncidentBetaPatch
      ),
      remove: createHandlerFunc(
        ['collection', 'incidentBeta', 'remove'],
        collectionIncidentBetaRemove
      ),
      update: createHandlerFunc(
        ['collection', 'incidentBeta', 'update'],
        collectionIncidentBetaUpdate
      ),
      upsert: createHandlerFunc(
        ['collection', 'incidentBeta', 'upsert'],
        collectionIncidentBetaUpsert
      ),
    },
    marker: {
      create: createHandlerFunc(
        ['collection', 'marker', 'create'],
        collectionMarkerCreate
      ),
      find: createHandlerFunc(
        ['collection', 'marker', 'find'],
        collectionMarkerFind
      ),
      get: createHandlerFunc(
        ['collection', 'marker', 'get'],
        collectionMarkerGet
      ),
      patch: createHandlerFunc(
        ['collection', 'marker', 'patch'],
        collectionMarkerPatch
      ),
      remove: createHandlerFunc(
        ['collection', 'marker', 'remove'],
        collectionMarkerRemove
      ),
      update: createHandlerFunc(
        ['collection', 'marker', 'update'],
        collectionMarkerUpdate
      ),
      upsert: createHandlerFunc(
        ['collection', 'marker', 'upsert'],
        collectionMarkerUpsert
      ),
    },
    migrations: {
      create: createHandlerFunc(
        ['collection', 'migrations', 'create'],
        collectionMigrationsCreate
      ),
      get: createHandlerFunc(
        ['collection', 'migrations', 'get'],
        collectionMigrationsGet
      ),
      patch: createHandlerFunc(
        ['collection', 'migrations', 'patch'],
        collectionMigrationsPatch
      ),
    },
    npsAnswer: {
      create: createHandlerFunc(
        ['collection', 'npsAnswer', 'create'],
        collectionNpsAnswerCreate
      ),
      find: createHandlerFunc(
        ['collection', 'npsAnswer', 'find'],
        collectionNpsAnswerFind
      ),
    },
    oneTimePassword: {
      create: createHandlerFunc(
        ['collection', 'oneTimePassword', 'create'],
        collectionOneTimePasswordCreate
      ),
      find: createHandlerFunc(
        ['collection', 'oneTimePassword', 'find'],
        collectionOneTimePasswordFind
      ),
      remove: createHandlerFunc(
        ['collection', 'oneTimePassword', 'remove'],
        collectionOneTimePasswordRemove
      ),
    },
    organization: {
      addFeatureForOrganization: createHandlerFunc(
        ['collection', 'organization', 'addFeatureForOrganization'],
        collectionOrganizationAddFeatureForOrganization
      ),
      addGoogleClientId: createHandlerFunc(
        ['collection', 'organization', 'addGoogleClientId'],
        collectionOrganizationAddGoogleClientId
      ),
      create: createHandlerFunc(
        ['collection', 'organization', 'create'],
        collectionOrganizationCreate
      ),
      find: createHandlerFunc(
        ['collection', 'organization', 'find'],
        collectionOrganizationFind
      ),
      get: createHandlerFunc(
        ['collection', 'organization', 'get'],
        collectionOrganizationGet
      ),
      getByDomain: createHandlerFunc(
        ['collection', 'organization', 'getByDomain'],
        collectionOrganizationGetByDomain
      ),
      patch: createHandlerFunc(
        ['collection', 'organization', 'patch'],
        collectionOrganizationPatch
      ),
      remove: createHandlerFunc(
        ['collection', 'organization', 'remove'],
        collectionOrganizationRemove
      ),
      removeFeatureFromOrganization: createHandlerFunc(
        ['collection', 'organization', 'removeFeatureFromOrganization'],
        collectionOrganizationRemoveFeatureFromOrganization
      ),
      removeGoogleClientId: createHandlerFunc(
        ['collection', 'organization', 'removeGoogleClientId'],
        collectionOrganizationRemoveGoogleClientId
      ),
    },
    organizationOnboardingTask: {
      create: createHandlerFunc(
        ['collection', 'organizationOnboardingTask', 'create'],
        collectionOrganizationOnboardingTaskCreate
      ),
      find: createHandlerFunc(
        ['collection', 'organizationOnboardingTask', 'find'],
        collectionOrganizationOnboardingTaskFind
      ),
      patch: createHandlerFunc(
        ['collection', 'organizationOnboardingTask', 'patch'],
        collectionOrganizationOnboardingTaskPatch
      ),
      remove: createHandlerFunc(
        ['collection', 'organizationOnboardingTask', 'remove'],
        collectionOrganizationOnboardingTaskRemove
      ),
    },
    organizationTrainingRule: {
      find: createHandlerFunc(
        ['collection', 'organizationTrainingRule', 'find'],
        collectionOrganizationTrainingRuleFind
      ),
      get: createHandlerFunc(
        ['collection', 'organizationTrainingRule', 'get'],
        collectionOrganizationTrainingRuleGet
      ),
      remove: createHandlerFunc(
        ['collection', 'organizationTrainingRule', 'remove'],
        collectionOrganizationTrainingRuleRemove
      ),
      upsert: createHandlerFunc(
        ['collection', 'organizationTrainingRule', 'upsert'],
        collectionOrganizationTrainingRuleUpsert
      ),
    },
    plugin: {
      create: createHandlerFunc(
        ['collection', 'plugin', 'create'],
        collectionPluginCreate
      ),
      find: createHandlerFunc(
        ['collection', 'plugin', 'find'],
        collectionPluginFind
      ),
      get: createHandlerFunc(
        ['collection', 'plugin', 'get'],
        collectionPluginGet
      ),
      patch: createHandlerFunc(
        ['collection', 'plugin', 'patch'],
        collectionPluginPatch
      ),
      remove: createHandlerFunc(
        ['collection', 'plugin', 'remove'],
        collectionPluginRemove
      ),
      update: createHandlerFunc(
        ['collection', 'plugin', 'update'],
        collectionPluginUpdate
      ),
      upsert: createHandlerFunc(
        ['collection', 'plugin', 'upsert'],
        collectionPluginUpsert
      ),
    },
    quest: {
      aggregate: createHandlerFunc(
        ['collection', 'quest', 'aggregate'],
        collectionQuestAggregate
      ),
      create: createHandlerFunc(
        ['collection', 'quest', 'create'],
        collectionQuestCreate
      ),
      find: createHandlerFunc(
        ['collection', 'quest', 'find'],
        collectionQuestFind
      ),
      get: createHandlerFunc(
        ['collection', 'quest', 'get'],
        collectionQuestGet
      ),
      patch: createHandlerFunc(
        ['collection', 'quest', 'patch'],
        collectionQuestPatch
      ),
      remove: createHandlerFunc(
        ['collection', 'quest', 'remove'],
        collectionQuestRemove
      ),
      update: createHandlerFunc(
        ['collection', 'quest', 'update'],
        collectionQuestUpdate
      ),
      upsert: createHandlerFunc(
        ['collection', 'quest', 'upsert'],
        collectionQuestUpsert
      ),
    },
    questTemplate: {
      create: createHandlerFunc(
        ['collection', 'questTemplate', 'create'],
        collectionQuestTemplateCreate
      ),
      find: createHandlerFunc(
        ['collection', 'questTemplate', 'find'],
        collectionQuestTemplateFind
      ),
      get: createHandlerFunc(
        ['collection', 'questTemplate', 'get'],
        collectionQuestTemplateGet
      ),
      patch: createHandlerFunc(
        ['collection', 'questTemplate', 'patch'],
        collectionQuestTemplatePatch
      ),
      remove: createHandlerFunc(
        ['collection', 'questTemplate', 'remove'],
        collectionQuestTemplateRemove
      ),
      update: createHandlerFunc(
        ['collection', 'questTemplate', 'update'],
        collectionQuestTemplateUpdate
      ),
      upsert: createHandlerFunc(
        ['collection', 'questTemplate', 'upsert'],
        collectionQuestTemplateUpsert
      ),
    },
    quizModule: {
      create: createHandlerFunc(
        ['collection', 'quizModule', 'create'],
        collectionQuizModuleCreate
      ),
      find: createHandlerFunc(
        ['collection', 'quizModule', 'find'],
        collectionQuizModuleFind
      ),
      get: createHandlerFunc(
        ['collection', 'quizModule', 'get'],
        collectionQuizModuleGet
      ),
      patch: createHandlerFunc(
        ['collection', 'quizModule', 'patch'],
        collectionQuizModulePatch
      ),
      remove: createHandlerFunc(
        ['collection', 'quizModule', 'remove'],
        collectionQuizModuleRemove
      ),
      update: createHandlerFunc(
        ['collection', 'quizModule', 'update'],
        collectionQuizModuleUpdate
      ),
      upsert: createHandlerFunc(
        ['collection', 'quizModule', 'upsert'],
        collectionQuizModuleUpsert
      ),
    },
    quizTemplate: {
      create: createHandlerFunc(
        ['collection', 'quizTemplate', 'create'],
        collectionQuizTemplateCreate
      ),
      find: createHandlerFunc(
        ['collection', 'quizTemplate', 'find'],
        collectionQuizTemplateFind
      ),
      get: createHandlerFunc(
        ['collection', 'quizTemplate', 'get'],
        collectionQuizTemplateGet
      ),
      patch: createHandlerFunc(
        ['collection', 'quizTemplate', 'patch'],
        collectionQuizTemplatePatch
      ),
      remove: createHandlerFunc(
        ['collection', 'quizTemplate', 'remove'],
        collectionQuizTemplateRemove
      ),
      update: createHandlerFunc(
        ['collection', 'quizTemplate', 'update'],
        collectionQuizTemplateUpdate
      ),
    },
    rank: {
      find: createHandlerFunc(
        ['collection', 'rank', 'find'],
        collectionRankFind
      ),
    },
    refreshToken: {
      create: createHandlerFunc(
        ['collection', 'refreshToken', 'create'],
        collectionRefreshTokenCreate
      ),
      find: createHandlerFunc(
        ['collection', 'refreshToken', 'find'],
        collectionRefreshTokenFind
      ),
      remove: createHandlerFunc(
        ['collection', 'refreshToken', 'remove'],
        collectionRefreshTokenRemove
      ),
    },
    tag: {
      find: createHandlerFunc(['collection', 'tag', 'find'], collectionTagFind),
      findVectorTag: createHandlerFunc(
        ['collection', 'tag', 'findVectorTag'],
        collectionTagFindVectorTag
      ),
    },
    task: {
      create: createHandlerFunc(
        ['collection', 'task', 'create'],
        collectionTaskCreate
      ),
      createMany: createHandlerFunc(
        ['collection', 'task', 'createMany'],
        collectionTaskCreateMany
      ),
      find: createHandlerFunc(
        ['collection', 'task', 'find'],
        collectionTaskFind
      ),
      get: createHandlerFunc(['collection', 'task', 'get'], collectionTaskGet),
      patch: createHandlerFunc(
        ['collection', 'task', 'patch'],
        collectionTaskPatch
      ),
      remove: createHandlerFunc(
        ['collection', 'task', 'remove'],
        collectionTaskRemove
      ),
      update: createHandlerFunc(
        ['collection', 'task', 'update'],
        collectionTaskUpdate
      ),
      upsert: createHandlerFunc(
        ['collection', 'task', 'upsert'],
        collectionTaskUpsert
      ),
    },
    taskGroup: {
      create: createHandlerFunc(
        ['collection', 'taskGroup', 'create'],
        collectionTaskGroupCreate
      ),
      find: createHandlerFunc(
        ['collection', 'taskGroup', 'find'],
        collectionTaskGroupFind
      ),
      get: createHandlerFunc(
        ['collection', 'taskGroup', 'get'],
        collectionTaskGroupGet
      ),
      patch: createHandlerFunc(
        ['collection', 'taskGroup', 'patch'],
        collectionTaskGroupPatch
      ),
      remove: createHandlerFunc(
        ['collection', 'taskGroup', 'remove'],
        collectionTaskGroupRemove
      ),
      update: createHandlerFunc(
        ['collection', 'taskGroup', 'update'],
        collectionTaskGroupUpdate
      ),
      upsert: createHandlerFunc(
        ['collection', 'taskGroup', 'upsert'],
        collectionTaskGroupUpsert
      ),
    },
    threat: {
      aggregate: createHandlerFunc(
        ['collection', 'threat', 'aggregate'],
        collectionThreatAggregate
      ),
      create: createHandlerFunc(
        ['collection', 'threat', 'create'],
        collectionThreatCreate
      ),
      find: createHandlerFunc(
        ['collection', 'threat', 'find'],
        collectionThreatFind
      ),
      get: createHandlerFunc(
        ['collection', 'threat', 'get'],
        collectionThreatGet
      ),
      patch: createHandlerFunc(
        ['collection', 'threat', 'patch'],
        collectionThreatPatch
      ),
      remove: createHandlerFunc(
        ['collection', 'threat', 'remove'],
        collectionThreatRemove
      ),
      update: createHandlerFunc(
        ['collection', 'threat', 'update'],
        collectionThreatUpdate
      ),
      upsert: createHandlerFunc(
        ['collection', 'threat', 'upsert'],
        collectionThreatUpsert
      ),
    },
    threatObservable: {
      create: createHandlerFunc(
        ['collection', 'threatObservable', 'create'],
        collectionThreatObservableCreate
      ),
      find: createHandlerFunc(
        ['collection', 'threatObservable', 'find'],
        collectionThreatObservableFind
      ),
      get: createHandlerFunc(
        ['collection', 'threatObservable', 'get'],
        collectionThreatObservableGet
      ),
      patch: createHandlerFunc(
        ['collection', 'threatObservable', 'patch'],
        collectionThreatObservablePatch
      ),
      remove: createHandlerFunc(
        ['collection', 'threatObservable', 'remove'],
        collectionThreatObservableRemove
      ),
      update: createHandlerFunc(
        ['collection', 'threatObservable', 'update'],
        collectionThreatObservableUpdate
      ),
      upsert: createHandlerFunc(
        ['collection', 'threatObservable', 'upsert'],
        collectionThreatObservableUpsert
      ),
    },
    threatResource: {
      find: createHandlerFunc(
        ['collection', 'threatResource', 'find'],
        collectionThreatResourceFind
      ),
      upsert: createHandlerFunc(
        ['collection', 'threatResource', 'upsert'],
        collectionThreatResourceUpsert
      ),
    },
    threatSimilarityGroup: {
      create: createHandlerFunc(
        ['collection', 'threatSimilarityGroup', 'create'],
        collectionThreatSimilarityGroupCreate
      ),
      find: createHandlerFunc(
        ['collection', 'threatSimilarityGroup', 'find'],
        collectionThreatSimilarityGroupFind
      ),
      get: createHandlerFunc(
        ['collection', 'threatSimilarityGroup', 'get'],
        collectionThreatSimilarityGroupGet
      ),
      patch: createHandlerFunc(
        ['collection', 'threatSimilarityGroup', 'patch'],
        collectionThreatSimilarityGroupPatch
      ),
      remove: createHandlerFunc(
        ['collection', 'threatSimilarityGroup', 'remove'],
        collectionThreatSimilarityGroupRemove
      ),
      upsert: createHandlerFunc(
        ['collection', 'threatSimilarityGroup', 'upsert'],
        collectionThreatSimilarityGroupUpsert
      ),
    },
    translation: {
      create: createHandlerFunc(
        ['collection', 'translation', 'create'],
        collectionTranslationCreate
      ),
      find: createHandlerFunc(
        ['collection', 'translation', 'find'],
        collectionTranslationFind
      ),
      get: createHandlerFunc(
        ['collection', 'translation', 'get'],
        collectionTranslationGet
      ),
      patch: createHandlerFunc(
        ['collection', 'translation', 'patch'],
        collectionTranslationPatch
      ),
      remove: createHandlerFunc(
        ['collection', 'translation', 'remove'],
        collectionTranslationRemove
      ),
      update: createHandlerFunc(
        ['collection', 'translation', 'update'],
        collectionTranslationUpdate
      ),
      upsert: createHandlerFunc(
        ['collection', 'translation', 'upsert'],
        collectionTranslationUpsert
      ),
    },
    user: {
      addFeatureForUser: createHandlerFunc(
        ['collection', 'user', 'addFeatureForUser'],
        collectionUserAddFeatureForUser
      ),
      aggregate: createHandlerFunc(
        ['collection', 'user', 'aggregate'],
        collectionUserAggregate
      ),
      create: createHandlerFunc(
        ['collection', 'user', 'create'],
        collectionUserCreate
      ),
      distinct: createHandlerFunc(
        ['collection', 'user', 'distinct'],
        collectionUserDistinct
      ),
      find: createHandlerFunc(
        ['collection', 'user', 'find'],
        collectionUserFind
      ),
      findAdminsByOrganizationId: createHandlerFunc(
        ['collection', 'user', 'findAdminsByOrganizationId'],
        collectionUserFindAdminsByOrganizationId
      ),
      findCoworkersByOrganizationId: createHandlerFunc(
        ['collection', 'user', 'findCoworkersByOrganizationId'],
        collectionUserFindCoworkersByOrganizationId
      ),
      get: createHandlerFunc(['collection', 'user', 'get'], collectionUserGet),
      patch: createHandlerFunc(
        ['collection', 'user', 'patch'],
        collectionUserPatch
      ),
      remove: createHandlerFunc(
        ['collection', 'user', 'remove'],
        collectionUserRemove
      ),
      removeFeatureFromUser: createHandlerFunc(
        ['collection', 'user', 'removeFeatureFromUser'],
        collectionUserRemoveFeatureFromUser
      ),
      update: createHandlerFunc(
        ['collection', 'user', 'update'],
        collectionUserUpdate
      ),
      upsert: createHandlerFunc(
        ['collection', 'user', 'upsert'],
        collectionUserUpsert
      ),
    },
    userFeedback: {
      create: createHandlerFunc(
        ['collection', 'userFeedback', 'create'],
        collectionUserFeedbackCreate
      ),
      find: createHandlerFunc(
        ['collection', 'userFeedback', 'find'],
        collectionUserFeedbackFind
      ),
      patch: createHandlerFunc(
        ['collection', 'userFeedback', 'patch'],
        collectionUserFeedbackPatch
      ),
      remove: createHandlerFunc(
        ['collection', 'userFeedback', 'remove'],
        collectionUserFeedbackRemove
      ),
    },
    vector: {
      create: createHandlerFunc(
        ['collection', 'vector', 'create'],
        collectionVectorCreate
      ),
      find: createHandlerFunc(
        ['collection', 'vector', 'find'],
        collectionVectorFind
      ),
      get: createHandlerFunc(
        ['collection', 'vector', 'get'],
        collectionVectorGet
      ),
      patch: createHandlerFunc(
        ['collection', 'vector', 'patch'],
        collectionVectorPatch
      ),
      remove: createHandlerFunc(
        ['collection', 'vector', 'remove'],
        collectionVectorRemove
      ),
      update: createHandlerFunc(
        ['collection', 'vector', 'update'],
        collectionVectorUpdate
      ),
      upsert: createHandlerFunc(
        ['collection', 'vector', 'upsert'],
        collectionVectorUpsert
      ),
    },
  }),
  data: Object.freeze({
    dash: {
      proxyDashRequests: createHandlerFunc(
        ['data', 'dash', 'proxyDashRequests'],
        dataDashProxyDashRequests
      ),
    },
  }),
  game: Object.freeze({
    challenge: {
      updateForUser: createHandlerFunc(
        ['game', 'challenge', 'updateForUser'],
        gameChallengeUpdateForUser
      ),
    },
    cycle: {
      full: createHandlerFunc(['game', 'cycle', 'full'], gameCycleFull),
      user: createHandlerFunc(['game', 'cycle', 'user'], gameCycleUser),
    },
    email: {
      inviteOrganizationsUnstartedUsers: createHandlerFunc(
        ['game', 'email', 'inviteOrganizationsUnstartedUsers'],
        gameEmailInviteOrganizationsUnstartedUsers
      ),
      sendActivationEmail: createHandlerFunc(
        ['game', 'email', 'sendActivationEmail'],
        gameEmailSendActivationEmail
      ),
      sendWelcomeEmail: createHandlerFunc(
        ['game', 'email', 'sendWelcomeEmail'],
        gameEmailSendWelcomeEmail
      ),
    },
    engine: {
      createNewQuest: createHandlerFunc(
        ['game', 'engine', 'createNewQuest'],
        gameEngineCreateNewQuest
      ),
      getQuestBasedOnLatestTheme: createHandlerFunc(
        ['game', 'engine', 'getQuestBasedOnLatestTheme'],
        gameEngineGetQuestBasedOnLatestTheme
      ),
      getTranslatedQuest: createHandlerFunc(
        ['game', 'engine', 'getTranslatedQuest'],
        gameEngineGetTranslatedQuest
      ),
    },
    leaderboard: {
      getCountryLeaderboard: createHandlerFunc(
        ['game', 'leaderboard', 'getCountryLeaderboard'],
        gameLeaderboardGetCountryLeaderboard
      ),
      getLeaderboard: createHandlerFunc(
        ['game', 'leaderboard', 'getLeaderboard'],
        gameLeaderboardGetLeaderboard
      ),
      getSimpleUserStarsLeaderboard: createHandlerFunc(
        ['game', 'leaderboard', 'getSimpleUserStarsLeaderboard'],
        gameLeaderboardGetSimpleUserStarsLeaderboard
      ),
      getUserStarsLeaderboard: createHandlerFunc(
        ['game', 'leaderboard', 'getUserStarsLeaderboard'],
        gameLeaderboardGetUserStarsLeaderboard
      ),
    },
    organization: {
      scheduleReminderEmails: createHandlerFunc(
        ['game', 'organization', 'scheduleReminderEmails'],
        gameOrganizationScheduleReminderEmails
      ),
      setDemoMode: createHandlerFunc(
        ['game', 'organization', 'setDemoMode'],
        gameOrganizationSetDemoMode
      ),
      updateAchievementAggregates: createHandlerFunc(
        ['game', 'organization', 'updateAchievementAggregates'],
        gameOrganizationUpdateAchievementAggregates
      ),
      updateCountryLeaderboardAggregates: createHandlerFunc(
        ['game', 'organization', 'updateCountryLeaderboardAggregates'],
        gameOrganizationUpdateCountryLeaderboardAggregates
      ),
      updateUserCountByCountryAggregates: createHandlerFunc(
        ['game', 'organization', 'updateUserCountByCountryAggregates'],
        gameOrganizationUpdateUserCountByCountryAggregates
      ),
    },
    quest: {
      deliver: createHandlerFunc(
        ['game', 'quest', 'deliver'],
        gameQuestDeliver
      ),
      expire: createHandlerFunc(['game', 'quest', 'expire'], gameQuestExpire),
      expireAll: createHandlerFunc(
        ['game', 'quest', 'expireAll'],
        gameQuestExpireAll
      ),
      fail: createHandlerFunc(['game', 'quest', 'fail'], gameQuestFail),
      getAttachment: createHandlerFunc(
        ['game', 'quest', 'getAttachment'],
        gameQuestGetAttachment
      ),
      getFailUrl: createHandlerFunc(
        ['game', 'quest', 'getFailUrl'],
        gameQuestGetFailUrl
      ),
      getResultUrl: createHandlerFunc(
        ['game', 'quest', 'getResultUrl'],
        gameQuestGetResultUrl
      ),
      getSignedFailUrl: createHandlerFunc(
        ['game', 'quest', 'getSignedFailUrl'],
        gameQuestGetSignedFailUrl
      ),
      getSignedResultUrl: createHandlerFunc(
        ['game', 'quest', 'getSignedResultUrl'],
        gameQuestGetSignedResultUrl
      ),
      register: createHandlerFunc(
        ['game', 'quest', 'register'],
        gameQuestRegister
      ),
      report: createHandlerFunc(['game', 'quest', 'report'], gameQuestReport),
      reportWithMessageId: createHandlerFunc(
        ['game', 'quest', 'reportWithMessageId'],
        gameQuestReportWithMessageId
      ),
      trackDelivery: createHandlerFunc(
        ['game', 'quest', 'trackDelivery'],
        gameQuestTrackDelivery
      ),
    },
    questTemplate: {
      checkCompilability: createHandlerFunc(
        ['game', 'questTemplate', 'checkCompilability'],
        gameQuestTemplateCheckCompilability
      ),
      compileQuestTemplatePreview: createHandlerFunc(
        ['game', 'questTemplate', 'compileQuestTemplatePreview'],
        gameQuestTemplateCompileQuestTemplatePreview
      ),
      compileQuestTemplateString: createHandlerFunc(
        ['game', 'questTemplate', 'compileQuestTemplateString'],
        gameQuestTemplateCompileQuestTemplateString
      ),
      compileQuestToVector: createHandlerFunc(
        ['game', 'questTemplate', 'compileQuestToVector'],
        gameQuestTemplateCompileQuestToVector
      ),
      generateFailureFunnel: createHandlerFunc(
        ['game', 'questTemplate', 'generateFailureFunnel'],
        gameQuestTemplateGenerateFailureFunnel
      ),
      getDifficultyFactors: createHandlerFunc(
        ['game', 'questTemplate', 'getDifficultyFactors'],
        gameQuestTemplateGetDifficultyFactors
      ),
      getExampleContext: createHandlerFunc(
        ['game', 'questTemplate', 'getExampleContext'],
        gameQuestTemplateGetExampleContext
      ),
      updateStatistics: createHandlerFunc(
        ['game', 'questTemplate', 'updateStatistics'],
        gameQuestTemplateUpdateStatistics
      ),
    },
    quiz: {
      actOnPreview: createHandlerFunc(
        ['game', 'quiz', 'actOnPreview'],
        gameQuizActOnPreview
      ),
      actOnQuizObjective: createHandlerFunc(
        ['game', 'quiz', 'actOnQuizObjective'],
        gameQuizActOnQuizObjective
      ),
      preview: createHandlerFunc(['game', 'quiz', 'preview'], gameQuizPreview),
      selectNextForUser: createHandlerFunc(
        ['game', 'quiz', 'selectNextForUser'],
        gameQuizSelectNextForUser
      ),
    },
    result: {
      get: createHandlerFunc(['game', 'result', 'get'], gameResultGet),
      selectAndPatchSecondaryObjective: createHandlerFunc(
        ['game', 'result', 'selectAndPatchSecondaryObjective'],
        gameResultSelectAndPatchSecondaryObjective
      ),
    },
    user: {
      claimAchievement: createHandlerFunc(
        ['game', 'user', 'claimAchievement'],
        gameUserClaimAchievement
      ),
      getChangedRewards: createHandlerFunc(
        ['game', 'user', 'getChangedRewards'],
        gameUserGetChangedRewards
      ),
      imposeDeliveryCooldown: createHandlerFunc(
        ['game', 'user', 'imposeDeliveryCooldown'],
        gameUserImposeDeliveryCooldown
      ),
      legacyOnboardUser: createHandlerFunc(
        ['game', 'user', 'legacyOnboardUser'],
        gameUserLegacyOnboardUser
      ),
      onboardUser: createHandlerFunc(
        ['game', 'user', 'onboardUser'],
        gameUserOnboardUser
      ),
      recalculateStats: createHandlerFunc(
        ['game', 'user', 'recalculateStats'],
        gameUserRecalculateStats
      ),
      resetUserGame: createHandlerFunc(
        ['game', 'user', 'resetUserGame'],
        gameUserResetUserGame
      ),
      selfOnboard: createHandlerFunc(
        ['game', 'user', 'selfOnboard'],
        gameUserSelfOnboard
      ),
      start: createHandlerFunc(['game', 'user', 'start'], gameUserStart),
      startGameForOrganizationsUnstartedUsers: createHandlerFunc(
        ['game', 'user', 'startGameForOrganizationsUnstartedUsers'],
        gameUserStartGameForOrganizationsUnstartedUsers
      ),
      startGameForUsersWithAutomaticEnrollment: createHandlerFunc(
        ['game', 'user', 'startGameForUsersWithAutomaticEnrollment'],
        gameUserStartGameForUsersWithAutomaticEnrollment
      ),
      updateOnboardingEligibility: createHandlerFunc(
        ['game', 'user', 'updateOnboardingEligibility'],
        gameUserUpdateOnboardingEligibility
      ),
      updatePlayerStats: createHandlerFunc(
        ['game', 'user', 'updatePlayerStats'],
        gameUserUpdatePlayerStats
      ),
    },
  }),
  infrastructure: Object.freeze({
    auth: {
      createToken: createHandlerFunc(
        ['infrastructure', 'auth', 'createToken'],
        infrastructureAuthCreateToken
      ),
      getSigninData: createHandlerFunc(
        ['infrastructure', 'auth', 'getSigninData'],
        infrastructureAuthGetSigninData
      ),
      resolveApiUserFromToken: createHandlerFunc(
        ['infrastructure', 'auth', 'resolveApiUserFromToken'],
        infrastructureAuthResolveApiUserFromToken
      ),
      revokeToken: createHandlerFunc(
        ['infrastructure', 'auth', 'revokeToken'],
        infrastructureAuthRevokeToken
      ),
      verifyTokenAgainstWhitelist: createHandlerFunc(
        ['infrastructure', 'auth', 'verifyTokenAgainstWhitelist'],
        infrastructureAuthVerifyTokenAgainstWhitelist
      ),
    },
    database: {
      cleanup: createHandlerFunc(
        ['infrastructure', 'database', 'cleanup'],
        infrastructureDatabaseCleanup
      ),
      removePreUploadedThreats: createHandlerFunc(
        ['infrastructure', 'database', 'removePreUploadedThreats'],
        infrastructureDatabaseRemovePreUploadedThreats
      ),
    },
    distributedLock: {
      acquireLock: createHandlerFunc(
        ['infrastructure', 'distributedLock', 'acquireLock'],
        infrastructureDistributedLockAcquireLock
      ),
      releaseLock: createHandlerFunc(
        ['infrastructure', 'distributedLock', 'releaseLock'],
        infrastructureDistributedLockReleaseLock
      ),
    },
    dkim: {
      create: createHandlerFunc(
        ['infrastructure', 'dkim', 'create'],
        infrastructureDkimCreate
      ),
      getSigningKey: createHandlerFunc(
        ['infrastructure', 'dkim', 'getSigningKey'],
        infrastructureDkimGetSigningKey
      ),
    },
    health: {
      alive: createHandlerFunc(
        ['infrastructure', 'health', 'alive'],
        infrastructureHealthAlive
      ),
      ready: createHandlerFunc(
        ['infrastructure', 'health', 'ready'],
        infrastructureHealthReady
      ),
    },
    hoxHash: {
      compare: createHandlerFunc(
        ['infrastructure', 'hoxHash', 'compare'],
        infrastructureHoxHashCompare
      ),
      compareBatched: createHandlerFunc(
        ['infrastructure', 'hoxHash', 'compareBatched'],
        infrastructureHoxHashCompareBatched
      ),
      computeFuzzyHash: createHandlerFunc(
        ['infrastructure', 'hoxHash', 'computeFuzzyHash'],
        infrastructureHoxHashComputeFuzzyHash
      ),
    },
    hoxUrl: {
      createShortLink: createHandlerFunc(
        ['infrastructure', 'hoxUrl', 'createShortLink'],
        infrastructureHoxUrlCreateShortLink
      ),
    },
    htmlToImage: {
      createImageFromHtml: createHandlerFunc(
        ['infrastructure', 'htmlToImage', 'createImageFromHtml'],
        infrastructureHtmlToImageCreateImageFromHtml
      ),
    },
    id: {
      generateHumanReadableId: createHandlerFunc(
        ['infrastructure', 'id', 'generateHumanReadableId'],
        infrastructureIdGenerateHumanReadableId
      ),
    },
    jwt: {
      create: createHandlerFunc(
        ['infrastructure', 'jwt', 'create'],
        infrastructureJwtCreate
      ),
      decode: createHandlerFunc(
        ['infrastructure', 'jwt', 'decode'],
        infrastructureJwtDecode
      ),
      signUrlForCurrentUser: createHandlerFunc(
        ['infrastructure', 'jwt', 'signUrlForCurrentUser'],
        infrastructureJwtSignUrlForCurrentUser
      ),
      verify: createHandlerFunc(
        ['infrastructure', 'jwt', 'verify'],
        infrastructureJwtVerify
      ),
      verifySignedUrl: createHandlerFunc(
        ['infrastructure', 'jwt', 'verifySignedUrl'],
        infrastructureJwtVerifySignedUrl
      ),
    },
    logger: {
      log: createHandlerFunc(
        ['infrastructure', 'logger', 'log'],
        infrastructureLoggerLog
      ),
    },
    migration: {
      backfillOnboardingEvents: createHandlerFunc(
        ['infrastructure', 'migration', 'backfillOnboardingEvents'],
        infrastructureMigrationBackfillOnboardingEvents
      ),
      backfillQuestMarkerStars: createHandlerFunc(
        ['infrastructure', 'migration', 'backfillQuestMarkerStars'],
        infrastructureMigrationBackfillQuestMarkerStars
      ),
      backfillUserQuestMarkerStars: createHandlerFunc(
        ['infrastructure', 'migration', 'backfillUserQuestMarkerStars'],
        infrastructureMigrationBackfillUserQuestMarkerStars
      ),
      enrichPreviouslyFailedThreats: createHandlerFunc(
        ['infrastructure', 'migration', 'enrichPreviouslyFailedThreats'],
        infrastructureMigrationEnrichPreviouslyFailedThreats
      ),
      splitHops: createHandlerFunc(
        ['infrastructure', 'migration', 'splitHops'],
        infrastructureMigrationSplitHops
      ),
      v175FixThreatHeaders: createHandlerFunc(
        ['infrastructure', 'migration', 'v175FixThreatHeaders'],
        infrastructureMigrationV175FixThreatHeaders
      ),
    },
    profile: {
      capturePerformanceProfile: createHandlerFunc(
        ['infrastructure', 'profile', 'capturePerformanceProfile'],
        infrastructureProfileCapturePerformanceProfile
      ),
    },
  }),
  integration: Object.freeze({
    azure: {
      getResourceTemplate: createHandlerFunc(
        ['integration', 'azure', 'getResourceTemplate'],
        integrationAzureGetResourceTemplate
      ),
      getResourceTemplateUrl: createHandlerFunc(
        ['integration', 'azure', 'getResourceTemplateUrl'],
        integrationAzureGetResourceTemplateUrl
      ),
    },
    bitly: {
      getUrl: createHandlerFunc(
        ['integration', 'bitly', 'getUrl'],
        integrationBitlyGetUrl
      ),
    },
    cloudinary: {
      signUpload: createHandlerFunc(
        ['integration', 'cloudinary', 'signUpload'],
        integrationCloudinarySignUpload
      ),
    },
    dns: {
      lookup: createHandlerFunc(
        ['integration', 'dns', 'lookup'],
        integrationDnsLookup
      ),
      lookupMx: createHandlerFunc(
        ['integration', 'dns', 'lookupMx'],
        integrationDnsLookupMx
      ),
      validateSpf: createHandlerFunc(
        ['integration', 'dns', 'validateSpf'],
        integrationDnsValidateSpf
      ),
    },
    email: {
      build: createHandlerFunc(
        ['integration', 'email', 'build'],
        integrationEmailBuild
      ),
      deliver: createHandlerFunc(
        ['integration', 'email', 'deliver'],
        integrationEmailDeliver
      ),
      imposeDeliveryLimit: createHandlerFunc(
        ['integration', 'email', 'imposeDeliveryLimit'],
        integrationEmailImposeDeliveryLimit
      ),
      send: createHandlerFunc(
        ['integration', 'email', 'send'],
        integrationEmailSend
      ),
      trackDelivery: createHandlerFunc(
        ['integration', 'email', 'trackDelivery'],
        integrationEmailTrackDelivery
      ),
    },
    gmail: {
      fetchEmailDeliveryAccessToken: createHandlerFunc(
        ['integration', 'gmail', 'fetchEmailDeliveryAccessToken'],
        integrationGmailFetchEmailDeliveryAccessToken
      ),
      getApiCredentials: createHandlerFunc(
        ['integration', 'gmail', 'getApiCredentials'],
        integrationGmailGetApiCredentials
      ),
      insertMessage: createHandlerFunc(
        ['integration', 'gmail', 'insertMessage'],
        integrationGmailInsertMessage
      ),
    },
    googleCloudKms: {
      decryptAsymmetric: createHandlerFunc(
        ['integration', 'googleCloudKms', 'decryptAsymmetric'],
        integrationGoogleCloudKmsDecryptAsymmetric
      ),
      getPublicKey: createHandlerFunc(
        ['integration', 'googleCloudKms', 'getPublicKey'],
        integrationGoogleCloudKmsGetPublicKey
      ),
    },
    googleCloudStorage: {
      deleteFile: createHandlerFunc(
        ['integration', 'googleCloudStorage', 'deleteFile'],
        integrationGoogleCloudStorageDeleteFile
      ),
      downloadFile: createHandlerFunc(
        ['integration', 'googleCloudStorage', 'downloadFile'],
        integrationGoogleCloudStorageDownloadFile
      ),
      getSignedUrl: createHandlerFunc(
        ['integration', 'googleCloudStorage', 'getSignedUrl'],
        integrationGoogleCloudStorageGetSignedUrl
      ),
      listFiles: createHandlerFunc(
        ['integration', 'googleCloudStorage', 'listFiles'],
        integrationGoogleCloudStorageListFiles
      ),
      upload: createHandlerFunc(
        ['integration', 'googleCloudStorage', 'upload'],
        integrationGoogleCloudStorageUpload
      ),
    },
    http: {
      request: createHandlerFunc(
        ['integration', 'http', 'request'],
        integrationHttpRequest
      ),
    },
    virustotalAugment: {
      fetchEphemeralUrl: createHandlerFunc(
        ['integration', 'virustotalAugment', 'fetchEphemeralUrl'],
        integrationVirustotalAugmentFetchEphemeralUrl
      ),
    },
    zendesk: {
      createToken: createHandlerFunc(
        ['integration', 'zendesk', 'createToken'],
        integrationZendeskCreateToken
      ),
      redirect: createHandlerFunc(
        ['integration', 'zendesk', 'redirect'],
        integrationZendeskRedirect
      ),
    },
  }),
  internal: Object.freeze({
    diagnostics: {
      debugEngineHeuristics: createHandlerFunc(
        ['internal', 'diagnostics', 'debugEngineHeuristics'],
        internalDiagnosticsDebugEngineHeuristics
      ),
    },
    experiments: {
      initOrGetUserSplitTestCase: createHandlerFunc(
        ['internal', 'experiments', 'initOrGetUserSplitTestCase'],
        internalExperimentsInitOrGetUserSplitTestCase
      ),
    },
    features: {
      hasFeature: createHandlerFunc(
        ['internal', 'features', 'hasFeature'],
        internalFeaturesHasFeature
      ),
      hasFeatures: createHandlerFunc(
        ['internal', 'features', 'hasFeatures'],
        internalFeaturesHasFeatures
      ),
      trackOrganizationFeatures: createHandlerFunc(
        ['internal', 'features', 'trackOrganizationFeatures'],
        internalFeaturesTrackOrganizationFeatures
      ),
    },
  }),
  intl: Object.freeze({
    translations: {
      getAll: createHandlerFunc(
        ['intl', 'translations', 'getAll'],
        intlTranslationsGetAll
      ),
      getCdnTranslations: createHandlerFunc(
        ['intl', 'translations', 'getCdnTranslations'],
        intlTranslationsGetCdnTranslations
      ),
      getDatabaseSourceMessages: createHandlerFunc(
        ['intl', 'translations', 'getDatabaseSourceMessages'],
        intlTranslationsGetDatabaseSourceMessages
      ),
      getStaticSourceMessages: createHandlerFunc(
        ['intl', 'translations', 'getStaticSourceMessages'],
        intlTranslationsGetStaticSourceMessages
      ),
      syncTranslations: createHandlerFunc(
        ['intl', 'translations', 'syncTranslations'],
        intlTranslationsSyncTranslations
      ),
      uploadDynamicTranslations: createHandlerFunc(
        ['intl', 'translations', 'uploadDynamicTranslations'],
        intlTranslationsUploadDynamicTranslations
      ),
    },
  }),
  legacy: Object.freeze({
    fingerprintUser: {
      update: createHandlerFunc(
        ['legacy', 'fingerprintUser', 'update'],
        legacyFingerprintUserUpdate
      ),
    },
    importUsers: {
      create: createHandlerFunc(
        ['legacy', 'importUsers', 'create'],
        legacyImportUsersCreate
      ),
    },
    markerFactory: {
      create: createHandlerFunc(
        ['legacy', 'markerFactory', 'create'],
        legacyMarkerFactoryCreate
      ),
      remove: createHandlerFunc(
        ['legacy', 'markerFactory', 'remove'],
        legacyMarkerFactoryRemove
      ),
      update: createHandlerFunc(
        ['legacy', 'markerFactory', 'update'],
        legacyMarkerFactoryUpdate
      ),
    },
    questMarkerReview: {
      create: createHandlerFunc(
        ['legacy', 'questMarkerReview', 'create'],
        legacyQuestMarkerReviewCreate
      ),
    },
    sendQuestToOrganization: {
      create: createHandlerFunc(
        ['legacy', 'sendQuestToOrganization', 'create'],
        legacySendQuestToOrganizationCreate
      ),
    },
    sendQuestToUser: {
      create: createHandlerFunc(
        ['legacy', 'sendQuestToUser', 'create'],
        legacySendQuestToUserCreate
      ),
    },
    threatObservableTask: {
      create: createHandlerFunc(
        ['legacy', 'threatObservableTask', 'create'],
        legacyThreatObservableTaskCreate
      ),
      update: createHandlerFunc(
        ['legacy', 'threatObservableTask', 'update'],
        legacyThreatObservableTaskUpdate
      ),
      upsert: createHandlerFunc(
        ['legacy', 'threatObservableTask', 'upsert'],
        legacyThreatObservableTaskUpsert
      ),
    },
    userTagCreator: {
      create: createHandlerFunc(
        ['legacy', 'userTagCreator', 'create'],
        legacyUserTagCreatorCreate
      ),
    },
  }),
  organization: Object.freeze({
    domain: {
      update: createHandlerFunc(
        ['organization', 'domain', 'update'],
        organizationDomainUpdate
      ),
    },
    quiz: {
      getModules: createHandlerFunc(
        ['organization', 'quiz', 'getModules'],
        organizationQuizGetModules
      ),
      syncOrgModuleState: createHandlerFunc(
        ['organization', 'quiz', 'syncOrgModuleState'],
        organizationQuizSyncOrgModuleState
      ),
      upsertModule: createHandlerFunc(
        ['organization', 'quiz', 'upsertModule'],
        organizationQuizUpsertModule
      ),
      upsertModuleTemplate: createHandlerFunc(
        ['organization', 'quiz', 'upsertModuleTemplate'],
        organizationQuizUpsertModuleTemplate
      ),
    },
  }),
  plugin: Object.freeze({
    action: {
      click: createHandlerFunc(
        ['plugin', 'action', 'click'],
        pluginActionClick
      ),
      handleAction: createHandlerFunc(
        ['plugin', 'action', 'handleAction'],
        pluginActionHandleAction
      ),
      reportQuest: createHandlerFunc(
        ['plugin', 'action', 'reportQuest'],
        pluginActionReportQuest
      ),
      start: createHandlerFunc(
        ['plugin', 'action', 'start'],
        pluginActionStart
      ),
      startGame: createHandlerFunc(
        ['plugin', 'action', 'startGame'],
        pluginActionStartGame
      ),
      upload: createHandlerFunc(
        ['plugin', 'action', 'upload'],
        pluginActionUpload
      ),
    },
    response: {
      unknownUser: createHandlerFunc(
        ['plugin', 'response', 'unknownUser'],
        pluginResponseUnknownUser
      ),
    },
  }),
  questTemplate: Object.freeze({
    benchmark: {
      findTemplates: createHandlerFunc(
        ['questTemplate', 'benchmark', 'findTemplates'],
        questTemplateBenchmarkFindTemplates
      ),
    },
    search: {
      findQuestTemplatesBySearchString: createHandlerFunc(
        ['questTemplate', 'search', 'findQuestTemplatesBySearchString'],
        questTemplateSearchFindQuestTemplatesBySearchString
      ),
    },
  }),
  security: Object.freeze({
    validation: {
      sanitizeHtml: createHandlerFunc(
        ['security', 'validation', 'sanitizeHtml'],
        securityValidationSanitizeHtml
      ),
    },
  }),
  templating: Object.freeze({
    handlebars: {
      compileTemplate: createHandlerFunc(
        ['templating', 'handlebars', 'compileTemplate'],
        templatingHandlebarsCompileTemplate
      ),
      parseTemplate: createHandlerFunc(
        ['templating', 'handlebars', 'parseTemplate'],
        templatingHandlebarsParseTemplate
      ),
    },
  }),
  threat: Object.freeze({
    analysis: {
      assign: createHandlerFunc(
        ['threat', 'analysis', 'assign'],
        threatAnalysisAssign
      ),
      calculateStatistics: createHandlerFunc(
        ['threat', 'analysis', 'calculateStatistics'],
        threatAnalysisCalculateStatistics
      ),
      calculateTrendHistogram: createHandlerFunc(
        ['threat', 'analysis', 'calculateTrendHistogram'],
        threatAnalysisCalculateTrendHistogram
      ),
      callMlModelWithThreat: createHandlerFunc(
        ['threat', 'analysis', 'callMlModelWithThreat'],
        threatAnalysisCallMlModelWithThreat
      ),
      getPrioritisedListOfAnalysableThreats: createHandlerFunc(
        ['threat', 'analysis', 'getPrioritisedListOfAnalysableThreats'],
        threatAnalysisGetPrioritisedListOfAnalysableThreats
      ),
      rateSimilarityGroup: createHandlerFunc(
        ['threat', 'analysis', 'rateSimilarityGroup'],
        threatAnalysisRateSimilarityGroup
      ),
      rateThreat: createHandlerFunc(
        ['threat', 'analysis', 'rateThreat'],
        threatAnalysisRateThreat
      ),
    },
    cortex: {
      analyze: createHandlerFunc(
        ['threat', 'cortex', 'analyze'],
        threatCortexAnalyze
      ),
      getAnalyzers: createHandlerFunc(
        ['threat', 'cortex', 'getAnalyzers'],
        threatCortexGetAnalyzers
      ),
      getJobReport: createHandlerFunc(
        ['threat', 'cortex', 'getJobReport'],
        threatCortexGetJobReport
      ),
    },
    feedback: {
      sendFeedbackToUser: createHandlerFunc(
        ['threat', 'feedback', 'sendFeedbackToUser'],
        threatFeedbackSendFeedbackToUser
      ),
      startBatchedThreatFeedback: createHandlerFunc(
        ['threat', 'feedback', 'startBatchedThreatFeedback'],
        threatFeedbackStartBatchedThreatFeedback
      ),
    },
    hunting: {
      deleteEmail: createHandlerFunc(
        ['threat', 'hunting', 'deleteEmail'],
        threatHuntingDeleteEmail
      ),
      getSearchResults: createHandlerFunc(
        ['threat', 'hunting', 'getSearchResults'],
        threatHuntingGetSearchResults
      ),
      initializeSettings: createHandlerFunc(
        ['threat', 'hunting', 'initializeSettings'],
        threatHuntingInitializeSettings
      ),
      revertEmailDeletion: createHandlerFunc(
        ['threat', 'hunting', 'revertEmailDeletion'],
        threatHuntingRevertEmailDeletion
      ),
      startSearch: createHandlerFunc(
        ['threat', 'hunting', 'startSearch'],
        threatHuntingStartSearch
      ),
      timeoutOldHuntingSearchJobs: createHandlerFunc(
        ['threat', 'hunting', 'timeoutOldHuntingSearchJobs'],
        threatHuntingTimeoutOldHuntingSearchJobs
      ),
    },
    pipeline: {
      assignSimilarityGroup: createHandlerFunc(
        ['threat', 'pipeline', 'assignSimilarityGroup'],
        threatPipelineAssignSimilarityGroup
      ),
      enrichThreat: createHandlerFunc(
        ['threat', 'pipeline', 'enrichThreat'],
        threatPipelineEnrichThreat
      ),
      escalate: createHandlerFunc(
        ['threat', 'pipeline', 'escalate'],
        threatPipelineEscalate
      ),
      rateAutomatically: createHandlerFunc(
        ['threat', 'pipeline', 'rateAutomatically'],
        threatPipelineRateAutomatically
      ),
      runPipelineForThreats: createHandlerFunc(
        ['threat', 'pipeline', 'runPipelineForThreats'],
        threatPipelineRunPipelineForThreats
      ),
      updateIncidents: createHandlerFunc(
        ['threat', 'pipeline', 'updateIncidents'],
        threatPipelineUpdateIncidents
      ),
    },
    rules: {
      evaluateExpression: createHandlerFunc(
        ['threat', 'rules', 'evaluateExpression'],
        threatRulesEvaluateExpression
      ),
    },
    search: {
      findIncidentsBySearchString: createHandlerFunc(
        ['threat', 'search', 'findIncidentsBySearchString'],
        threatSearchFindIncidentsBySearchString
      ),
      findThreatsBySearchString: createHandlerFunc(
        ['threat', 'search', 'findThreatsBySearchString'],
        threatSearchFindThreatsBySearchString
      ),
    },
  }),
  user: Object.freeze({
    adminAction: {
      sendQuest: createHandlerFunc(
        ['user', 'adminAction', 'sendQuest'],
        userAdminActionSendQuest
      ),
    },
    bulk: {
      sendQuest: createHandlerFunc(
        ['user', 'bulk', 'sendQuest'],
        userBulkSendQuest
      ),
    },
    bulkAction: {
      fanOut: createHandlerFunc(
        ['user', 'bulkAction', 'fanOut'],
        userBulkActionFanOut
      ),
    },
    email: {
      inviteUser: createHandlerFunc(
        ['user', 'email', 'inviteUser'],
        userEmailInviteUser
      ),
    },
    enrichment: {
      addGeolocation: createHandlerFunc(
        ['user', 'enrichment', 'addGeolocation'],
        userEnrichmentAddGeolocation
      ),
      persistEvents: createHandlerFunc(
        ['user', 'enrichment', 'persistEvents'],
        userEnrichmentPersistEvents
      ),
      persistEventsAndRecalculateRewards: createHandlerFunc(
        ['user', 'enrichment', 'persistEventsAndRecalculateRewards'],
        userEnrichmentPersistEventsAndRecalculateRewards
      ),
    },
    nps: {
      create: createHandlerFunc(['user', 'nps', 'create'], userNpsCreate),
      shouldAskNpsSurvey: createHandlerFunc(
        ['user', 'nps', 'shouldAskNpsSurvey'],
        userNpsShouldAskNpsSurvey
      ),
    },
    roles: {
      addRole: createHandlerFunc(
        ['user', 'roles', 'addRole'],
        userRolesAddRole
      ),
      removeRoles: createHandlerFunc(
        ['user', 'roles', 'removeRoles'],
        userRolesRemoveRoles
      ),
      setRole: createHandlerFunc(
        ['user', 'roles', 'setRole'],
        userRolesSetRole
      ),
    },
    search: {
      findUsersBySearchString: createHandlerFunc(
        ['user', 'search', 'findUsersBySearchString'],
        userSearchFindUsersBySearchString
      ),
    },
    softDelete: {
      deactivateUser: createHandlerFunc(
        ['user', 'softDelete', 'deactivateUser'],
        userSoftDeleteDeactivateUser
      ),
      reactivateUser: createHandlerFunc(
        ['user', 'softDelete', 'reactivateUser'],
        userSoftDeleteReactivateUser
      ),
    },
  }),
});
