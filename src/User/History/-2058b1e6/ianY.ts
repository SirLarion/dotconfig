import { TAnalyticsEvent } from '@hox/analytics/types/analytics';

export enum EServerEvent {
  INSIGHTS_CXO_REPORT_LOADED = 'insights_cxo_report_loaded',
  INSIGHTS_BM_REPORT_LOADED = 'insights_bm_report_loaded',

  LEGACY_PLUGIN_STARTED = 'legacyPlugin_started',

  PLUGIN_CLICKED = 'plugin_clicked',
  PLUGIN_CHROME_EXTENSION_CLICKED = 'plugin_chrome_extension_clicked',
  PLUGIN_THREAT_FROM_HOXHUNT_CLICKED = 'plugin_threatFromHoxhunt_clicked',
  PLUGIN_EXTERNAL_THREAT_IOC_MODEL_RISK_SCORE_CALCULATED = 'plugin_external_threat_ioc_model_risk_score_calculated',
  PLUGIN_EXTERNAL_THREAT_IOC_FLAG_CREATED = 'plugin_external_threat_ioc_flag_created',
  PLUGIN_EXTERNAL_THREAT_CLICKED = 'plugin_externalThreat_clicked',
  PLUGIN_EXTERNAL_THREAT_UPLOADED = 'plugin_externalThreat_uploaded',
  PLUGIN_EXTERNAL_THREAT_PRE_UPLOADED = 'plugin_externalThreat_pre_uploaded',
  PLUGIN_EXTERNAL_THREAT_DOWNLOADED = 'plugin_externalThreat_downloaded',
  PLUGIN_EXTERNAL_THREAT_ANALYZED = 'plugin_externalThreat_analyzed',
  PLUGIN_EXTERNAL_THREAT_RATING_INHERITED = 'plugin_external_threat_rating_inherited',
  PLUGIN_EXTERNAL_THREAT_AUTOMATICALLY_RATED = 'plugin_external_threat_automatically_rated',
  PLUGIN_EXTERNAL_THREAT_DELETED = 'plugin_externalThreat_deleted',
  PLUGIN_EXTERNAL_THREAT_REPORT_OPTIONS_SHOWN = 'plugin_externalThreat_reportOptions_shown',
  PLUGIN_EXTERNAL_THREAT_REPORT_OPTIONS_YES_BUTTON_CLICKED = 'plugin_externalThreat_reportOptions_yesButton_clicked',
  PLUGIN_EXTERNAL_THREAT_REPORT_OPTIONS_NO_BUTTON_CLICKED = 'plugin_externalThreat_reportOptions_noButton_clicked',
  PLUGIN_EXTERNAL_THREAT_USER_REQUESTED_FEEDBACK = 'plugin_external_user_requested_feedback',

  PLUGIN_FEEDBACK_RULE_PASSED = 'plugin_feedback_rule_passed',

  PLUGIN_EXTERNAL_THREAT_REPORT_MODIFIERS_REPLIED_TO_EMAIL = 'plugin_externalThreat_reportModifiers_repliedToEmail',
  PLUGIN_EXTERNAL_THREAT_REPORT_MODIFIERS_DOWNLOADED_FILE = 'plugin_externalThreat_reportModifiers_downloadedFile',
  PLUGIN_EXTERNAL_THREAT_REPORT_MODIFIERS_OPENED_ATTACHMENT = 'plugin_externalThreat_reportModifiers_openedAttachment',
  PLUGIN_EXTERNAL_THREAT_REPORT_MODIFIERS_VISITED_LINK = 'plugin_externalThreat_reportModifiers_visitedLink',
  PLUGIN_EXTERNAL_THREAT_REPORT_MODIFIERS_ENTERED_CREDENTIALS = 'plugin_externalThreat_reportModifiers_enteredCredentials',
  PLUGIN_EXTERNAL_THREAT_REPORT_MODIFIERS_FORWARDED_EMAIL = 'plugin_externalThreat_reportModifiers_forwardedEmail',

  PLUGIN_CLOSE_BUTTON_CLICKED = 'plugin_closeButton_clicked',
  PLUGIN_DELETE_EMAIL_BUTTON_CLICKED = 'plugin_deleteEmailButton_clicked',

  PLUGIN_AFTER_REPORTING_JOIN_DIALOG_ACCEPTED = 'plugin_afterReporting_joinDialog_accepted',
  PLUGIN_WAIT_FOR_INVITATION_SHOWN = 'plugin_waitForInvitation_shown',
  PLUGIN_SAFE_HOX_EMAIL_CLICKED = 'plugin_safeHoxEmail_clicked',
  PLUGIN_SAFE_EXTERNAL_EMAIL_CLICKED = 'plugin_safe_external_email_clicked',
  PLUGIN_SAFE_EXTERNAL_SIMULATION_CLICKED = 'plugin_safe_external_simulation_clicked',
  PLUGIN_START_GAME_DIALOG_CLICKED = 'plugin_startGameDialog_clicked',
  PLUGIN_GAME_STARTED_DIALOG_CLICKED = 'plugin_gameStartedDialog_clicked',
  PLUGIN_CALL_API_URL_COMMAND_CREATED = 'plugin_callApiUrlCommand_created',

  PLUGIN_MOVE_TO_TRASH_MENU_OPTION_CLICKED = 'plugin_moveToTrashMenuOption_clicked',
  PLUGIN_REPORT_THREAT_MENU_OPTION_CLICKED = 'plugin_reportThreatMenuOption_clicked',
  PLUGIN_REPORT_AS_NOT_SPAM_MENU_OPTION_CLICKED = 'plugin_markAsValidMenuOption_clicked',
  PLUGIN_USER_REQUESTED_FEEDBACK_FROM_SECURITY_TEAM = 'plugin_user_requested_feedback_from_security_team',

  ENGINE_QUEST_CREATED = 'engine_quest_created',
  ENGINE_QUEST_STARTED = 'engine_quest_started',
  ENGINE_QUEST_ERROR = 'engine_quest_error',
  ENGINE_QUEST_SUCCEEDED = 'engine_quest_succeeded',
  ENGINE_QUEST_REMOVED = 'engine_quest_removed',
  ENGINE_QUEST_FAILED = 'engine_quest_failed',
  ENGINE_QUEST_SAFE_FAILED = 'engine_quest_safe_failed',
  ENGINE_QUEST_MISSED = 'engine_quest_missed',
  ENGINE_QUEST_FILE_DOWNLOADED = 'engine_quest_file_downloaded',
  ENGINE_QUEST_FAIL_FUNNEL_STEP_REACHED = 'engine_quest_fail_funnel_step_reached',
  ENGINE_QUEST_FAILED_BY_ATP = 'engine_quest_failedByAtp',
  ENGINE_QUEST_REREPORTED = 'engine_quest_rereported',
  ENGINE_QUEST_REFAILED = 'engine_quest_refailed',
  ENGINE_QUEST_SECONDARY_OBJECTIVES_SELECTED = 'engine_quest_secondary_objectives_selected',
  ENGINE_PLAYER_REWARDED = 'engine_player_rewarded',
  ENGINE_PLAYER_REWARDED_QUIZ = 'engine_player_rewarded_quiz',
  ENGINE_MARKERS_VIEWED_PLAYER_REWARDED = 'engine_markers_viewed_player_rewarded',
  ENGINE_WEEKLY_REPORT_EMAIL_SENT = 'engine_weeklyReportEmail_sent',
  ENGINE_INVITE_EMAIL_SENT = 'engine_inviteEmail_sent',
  ENGINE_AUTOMATIC_REMINDER_SENT = 'engine_automatic_reminder_sent',
  ENGINE_PROMOTION_EMAIL_SENT = 'engine_promotionEmail_sent',
  ENGINE_THREAT_FEEDBACK_SENT = 'engine_threat_feedback_sent',
  ENGINE_GAME_STARTED = 'engine_game_started',
  ENGINE_GAME_STARTED_BY_FORCE = 'engine_game_startedByForce',
  ENGINE_QUEST_SELECTED = 'engine_quest_selected',
  ENGINE_NO_QUEST_SELECTED = 'engine_no_quests_found',

  STARS_REWARDED = 'stars_rewarded',

  ENGINE_VECTOR_DELIVERY_CONFIRMED = 'engine_vector_delivery_confirmed',
  ENGINE_VECTOR_DELIVERY_FAILED = 'engine_vector_delivery_failed',

  GAME_QUIZ_COMPLETED = 'game_quiz_completed',
  GAME_QUIZ_SENT_TO_USER = 'game_quiz_sent_to_user',

  SSO_REDIRECTED_TO_START_PAGE = 'sso_redirectToStartPage',
  SSO_LOGIN_SUCCEEDED = 'sso_login_succeeded',
  SSO_LOGIN_FAILED = 'sso_login_failed',

  USER_CREATED = 'user_created',
  USER_DELETED = 'user_deleted',
  USER_INFO_UPDATED = 'user_info_updated',
  USER_SOFT_DELETED = 'user_soft_deleted',
  USER_SOFT_DELETE_CANCELLED = 'user_soft_delete_cancelled',
  USER_ONBOARDED = 'user_onboarded',

  INDUSTRY_CREATED = 'industry_created',
  INDUSTRY_INFO_UPDATED = 'industry_info_updated',
  INDUSTRY_DELETED = 'industry_deleted',

  ORGANIZATION_FEATURE_FLAG_ADDED = 'organization_feature_flag_added',
  ORGANIZATION_FEATURE_FLAG_REMOVED = 'organization_feature_flag_removed',
  ORGANIZATION_FEATURES_SNAPSHOT = 'organization_features_snapshot',

  RESPONSE_INCIDENT_CREATED = 'response_incident_created',
  RESPONSE_INCIDENT_ESCALATED = 'response_incident_escalated',
  RESPONSE_INCIDENT_CLOSED = 'response_incident_closed',
  RESPONSE_INCIDENT_REOPENED = 'response_incident_reopened',
  RESPONSE_INCIDENT_NOTE_CREATED = 'response_incident_note_created',
  RESPONSE_INCIDENT_NOTE_EDITED = 'response_incident_note_edited',
  RESPONSE_INCIDENT_NOTE_DELETED = 'response_incident_note_deleted',
  RESPONSE_INCIDENT_CLASSIFICATION_CHANGED = 'response_incident_classification_changed',
  RESPONSE_ORGANIZATION_THREAT_ANALYSIS_PRIORITY_ASSIGNED = 'response_organization_threat_analysis_priority_assigned',
  RESPONSE_THREAT_ADDED_TO_INCIDENT = 'response_threat_added_to_incident',
  RESPONSE_THREAT_ADDED_TO_SIMILARITY_GROUP = 'response_threat_added_to_similarity_group',

  THREAT_HUNTING_SEARCH_STARTED = 'threat_hunting_search_started',
  THREAT_HUNTING_START_SEARCH_FAILED = 'threat_hunting_start_search_failed',
  THREAT_HUNTING_GET_SEARCH_RESULTS_COMPLETE = 'threat_hunting_get_search_results_complete',
  THREAT_HUNTING_GET_SEARCH_RESULTS_FAILED = 'threat_hunting_get_search_results_failed',
  THREAT_HUNTING_EMAIL_DELETION_SUCCESS = 'threat_hunting_email_deletion_success',
  THREAT_HUNTING_EMAIL_DELETION_FAILED = 'threat_hunting_email_deletion_failed',
  THREAT_HUNTING_EMAIL_REVERT_SUCCESS = 'threat_hunting_email_revert_success',
  THREAT_HUNTING_EMAIL_REVERT_FAILED = 'threat_hunting_email_revert_failed',
  THREAT_HUNTING_SEARCH_RESULT_CREATED = 'threat_hunting_search_result_created',

  FEEDBACK_RULE_CREATED = 'feedback_rule_created',
  FEEDBACK_RULE_UPDATED = 'feedback_rule_updated',
  FEEDBACK_RULE_DELETED = 'feedback_rule_deleted',
  FEEDBACK_RULE_ACTIVATED = 'feedback_rule_activated',
  FEEDBACK_RULE_DEACTIVATED = 'feedback_rule_deactivated',

  USER_FEEDBACK_CREATED = 'user_feedback_created',
  USER_FEEDBACK_UPDATED = 'user_feedback_updated',
  USER_FEEDBACK_DELETED = 'user_feedback_deleted',
  USER_RECEIVED_SOC_CLASSIFIED_THREAT_FEEDBACK = 'user_received_soc_classified_threat_feedback',

  THREAT_RESOURCE_MARKED_MALICIOUS = 'threat_resource_marked_malicious',
  THREAT_RESOURCE_MARKED_NOT_MALICIOUS = 'threat_resource_marked_not_malicious',

  AUTH_LOGIN_AS_OTHER_USER = 'auth_login_as_other_user',

  QUEST_TEMPLATE_CREATED = 'training_quest_template_created',
  QUEST_TEMPLATE_UPDATED = 'training_quest_template_updated',
  QUEST_TEMPLATE_STATUS_CHANGED = 'training_quest_template_status_changed',
  TRAINING_NPS_ANSWER_CREATED = 'training_nps_answer_created',

  ADMIN_ORGANIZATION_TRAINING_RULE_UPDATED = 'admin_organization_training_rule_updated',
  ADMIN_KNOWLEDGE_BASE_REDIRECT_AUTHENTICATED = 'admin_knowledge_base_redirect_authenticated',
  ADMIN_ORG_QUIZ_MODULE_UPSERTED = 'admin_org_quiz_module_upserted',
  ADMIN_ORG_QUIZ_TEMPLATE_UPSERTED = 'admin_org_quiz_template_upserted',

  TRAINING_QUIZ_TEMPLATE_UPSERTED = 'training_quiz_template_upserted',
  TRAINING_QUIZ_TEMPLATE_REMOVED = 'training_quiz_template_removed',

  TRAINING_QUIZ_MODULE_UPSERTED = 'training_quiz_module_upserted',
  TRAINING_QUIZ_MODULE_REMOVED = 'training_quiz_module_removed',
  ADMIN_USER_ROLE_CHANGED = 'admin_user_role_changed',
  ADMIN_ORGANIZATION_DELETED = 'admin_organization_deleted',

  ADMIN_ORGANIZATION_ONBOARDING_TASK_CREATED = 'admin_organization_onboarding_task_created',
  ADMIN_ORGANIZATION_ONBOARDING_TASK_COMPLETED = 'admin_organization_onboarding_task_completed',
  ADMIN_ORGANIZATION_ONBOARDING_COMPLETED = 'admin_organization_onboarding_completed',
  ADMIN_ORGANIZATION_ONBOARDING_STARTED = 'admin_organization_onboarding_started',
}

/**
 * Events belonging to requireOrganizationIdAnalyticsServerEvents do not need require user enrichment
 * because they are events that are not done by any real user as they are handled by the task runner or super admin.
 * This is why they require organizationId specified explicitly as it cannot be inferred from the user itself.
 */
export const requireOrganizationIdAnalyticsServerEvents: EServerEvent[] = [
  EServerEvent.RESPONSE_INCIDENT_CREATED,
  EServerEvent.RESPONSE_INCIDENT_ESCALATED,
  EServerEvent.RESPONSE_ORGANIZATION_THREAT_ANALYSIS_PRIORITY_ASSIGNED,
  EServerEvent.RESPONSE_THREAT_ADDED_TO_INCIDENT,
  EServerEvent.RESPONSE_THREAT_ADDED_TO_SIMILARITY_GROUP,
  EServerEvent.ADMIN_ORGANIZATION_ONBOARDING_TASK_CREATED,
  EServerEvent.ADMIN_ORGANIZATION_ONBOARDING_TASK_COMPLETED,
  EServerEvent.ADMIN_ORGANIZATION_ONBOARDING_COMPLETED,
  EServerEvent.ADMIN_ORGANIZATION_ONBOARDING_STARTED,
  EServerEvent.RESPONSE_INCIDENT_CLASSIFICATION_CHANGED,
];

/**
 * Any server events that are to be persisted, need to be added to this array.
 */
export const adminAnalyticsServerEvents: EServerEvent[] = [
  EServerEvent.ENGINE_QUEST_STARTED,
  EServerEvent.ENGINE_QUEST_ERROR,
  EServerEvent.ENGINE_QUEST_SUCCEEDED,
  EServerEvent.ENGINE_QUEST_FAILED,
  EServerEvent.ENGINE_QUEST_MISSED,
  EServerEvent.ENGINE_QUEST_FILE_DOWNLOADED,
  EServerEvent.ENGINE_QUEST_FAIL_FUNNEL_STEP_REACHED,
  EServerEvent.ENGINE_QUEST_SAFE_FAILED,
  EServerEvent.ENGINE_QUEST_REMOVED,
  EServerEvent.ENGINE_MARKERS_VIEWED_PLAYER_REWARDED,
  EServerEvent.ENGINE_THREAT_FEEDBACK_SENT,
  EServerEvent.PLUGIN_EXTERNAL_THREAT_UPLOADED,
  EServerEvent.PLUGIN_EXTERNAL_THREAT_ANALYZED,
  EServerEvent.PLUGIN_EXTERNAL_THREAT_RATING_INHERITED,
  EServerEvent.PLUGIN_EXTERNAL_THREAT_AUTOMATICALLY_RATED,
  EServerEvent.PLUGIN_EXTERNAL_THREAT_DELETED,
  EServerEvent.USER_CREATED,
  EServerEvent.USER_DELETED,
  EServerEvent.USER_INFO_UPDATED,
  EServerEvent.USER_SOFT_DELETED,
  EServerEvent.USER_SOFT_DELETE_CANCELLED,
  EServerEvent.INDUSTRY_CREATED,
  EServerEvent.INDUSTRY_INFO_UPDATED,
  EServerEvent.INDUSTRY_DELETED,
  EServerEvent.RESPONSE_INCIDENT_CLOSED,
  EServerEvent.RESPONSE_INCIDENT_REOPENED,
  EServerEvent.RESPONSE_INCIDENT_CREATED,
  EServerEvent.RESPONSE_INCIDENT_ESCALATED,
  EServerEvent.RESPONSE_INCIDENT_NOTE_CREATED,
  EServerEvent.RESPONSE_INCIDENT_NOTE_EDITED,
  EServerEvent.RESPONSE_INCIDENT_NOTE_DELETED,
  EServerEvent.AUTH_LOGIN_AS_OTHER_USER,
  EServerEvent.QUEST_TEMPLATE_CREATED,
  EServerEvent.QUEST_TEMPLATE_UPDATED,
  EServerEvent.QUEST_TEMPLATE_STATUS_CHANGED,
  ...requireOrganizationIdAnalyticsServerEvents,
];

export enum EClientEvent {
  RESULT_PAGE_REVIEW_MARKERS_STARTED = 'resultPage_reviewMarkers_started',
  RESULT_PAGE_REVIEW_MARKERS_FINISHED = 'resultPage_reviewMarkers_finished',
  RESULT_PAGE_SCORE_ANIMATED = 'resultPage_score_animated',

  FEATURE_CONTACT_SALES_CLICKED = 'feature_contact_sales_clicked',

  CHALLENGE_STARTED = 'challenge_started',
  CHALLENGE_COMPLETED = 'challenge_completed',
  CHALLENGE_EXITED = 'challenge_exited',

  LABS_ONBOARDING_MESSAGE_CLOSED = 'labs_onboardingMessage_closed',

  GAME_ONBOARDING_TUTORIAL_COMPLETED = 'game_onboarding_tutorial_completed',

  PAGE_VIEW = 'page_view',
  SESSION_STARTED = 'session_started',

  ADMIN_SHIELD_INTRODUCTION_SHOWN = 'admin_shield_introduction_shown',
  ADMIN_TRAINING_MANAGEMENT_INTRODUCTION_SHOWN = 'admin_training_management_introduction_shown',
  ADMIN_JOB_FUNCTION_INTRODUCTION_SHOWN = 'admin_job_function_introduction_shown',
  ADMIN_COUNTRY_LEADERBOARD_INTRODUCTION_SHOWN = 'admin_country_leaderboard_introduction_shown',
  ADMIN_USER_MANAGEMENT_COLUMN_LAYOUT_CHANGED = 'admin_user_management_column_layout_changed',
  ADMIN_GMAIL_API_DELIVERY_INTRODUCTION_SHOWN = 'admin_gmail_api_delivery_introduction_shown',
  ADMIN_USER_MANAGEMENT_COLUMN_CUSTOMIZATION_SEEN = 'admin_user_management_column_customization_seen',
  ADMIN_SAT_INTRODUCTION_SHOWN = 'admin_sat_introduction_shown',
  ADMIN_LBO_INTRODUCTION_SHOWN = 'admin_lbo_introduction_shown',
  ADMIN_NEW_LEADERBOARDS_INTRODUCTION_SHOWN = 'admin_new_leaderboards_introduction_shown',

  RESPONSE_APPLICATION_SEARCH_INCIDENT_CLICKED = 'response_application_search_incident_clicked',
  RESPONSE_APPLICATION_SEARCH_INCIDENT_FILTER_LIST_TOGGLE = 'response_application_search_incident_filter_list_toggle',
  RESPONSE_APPLICATION_SEARCH_INCIDENT_FILTER_LIST_ITEM_CLICKED = 'response_application_search_incident_filter_list_item_clicked',
  RESPONSE_APPLICATION_SEARCH_INCIDENT_QUERY_SUBMITTED = 'response_application_search_incident_query_submitted',

  RESPONSE_APPLICATION_SEARCH_EMAIL_CLICKED = 'response_application_search_email_clicked',
  RESPONSE_APPLICATION_SEARCH_EMAIL_FILTER_LIST_TOGGLE = 'response_application_search_email_filter_list_toggle',
  RESPONSE_APPLICATION_SEARCH_EMAIL_FILTER_LIST_ITEM_CLICKED = 'response_application_search_email_filter_list_item_clicked',
  RESPONSE_APPLICATION_SEARCH_EMAIL_QUERY_SUBMITTED = 'response_application_search_email_query_submitted',
  RESPONSE_MARKETING_CONTENT_SHOWN = 'response_marketing_content_shown',

  RESPONSE_APPLICATION_SEARCH_DATA_CLICKED = 'response_application_search_data_clicked',
  RESPONSE_APPLICATION_SEARCH_DATA_QUERY_SUBMITTED = 'response_application_search_data_query_submitted',

  RESPONSE_MARKETING_PAGE_DEMO_REQUESTED = 'response_marketing_page_demo_requested',

  INSTANT_FEEDBACK_ERROR_CARD_SHOWN = 'instant_feedback_error_card_shown',
  INSTANT_FEEDBACK_TIMEOUT_ERROR_CARD_SHOWN = 'instant_feedback_timeout_error_card_shown',
  INSTANT_FEEDBACK_THREAT_RISK_CARD_SHOWN = 'instant_feedback_threat_risk_card_shown',
  INSTANT_FEEDBACK_THREAT_IOCS_SHOWN = 'instant_feedback_threat_iocs_shown',
  INSTANT_FEEDBACK_PAGE_SHOWN = 'instant_feedback_page_shown',
  INSTANT_FEEDBACK_THREAT_RATING_SHOWN = 'instant_feedback_threat_rating_shown',

  TRAINING_NPS_GTWO_BUTTON_CLICKED = 'training_nps_gtwo_button_clicked',

  TRAINING_JOB_FUNCTION_ANSWERED = 'training_job_function_answered',
  TRAINING_REPORTED_THREATS_MODAL_SEEN = 'training_reported_threats_modal_seen',
  TRAINING_AWARENESS_MOMENT_STARTED = 'training_awareness_moment_started',
  TRAINING_AWARENESS_MOMENT_FINISHED = 'training_awareness_moment_finished',
  TRAINING_AWARENESS_MOMENT_SKIPPED = 'training_awareness_moment_skipped',
  TRAINING_AWARENESS_MOMENT_LEARNING_CARD_SEEN = 'training_awareness_moment_learning_card_seen',
  TRAINING_SPICY_MODE_MODAL_SEEN = 'training_spicy_mode_modal_seen',

  TRAINING_FIRST_TIME_RANKS_SEEN = 'training_first_time_ranks_seen',
}

export type EEvent = EServerEvent | EClientEvent;

/**
 * Any event that are to be persisted in the user.events need to be added to this array.
 */

export const userPersistedEvents: EEvent[] = [
  EServerEvent.PLUGIN_EXTERNAL_THREAT_UPLOADED,
  EClientEvent.INSTANT_FEEDBACK_PAGE_SHOWN,
  EClientEvent.ADMIN_SHIELD_INTRODUCTION_SHOWN,
  EClientEvent.ADMIN_JOB_FUNCTION_INTRODUCTION_SHOWN,
  EClientEvent.ADMIN_TRAINING_MANAGEMENT_INTRODUCTION_SHOWN,
  EClientEvent.ADMIN_COUNTRY_LEADERBOARD_INTRODUCTION_SHOWN,
  EClientEvent.ADMIN_GMAIL_API_DELIVERY_INTRODUCTION_SHOWN,
  EClientEvent.ADMIN_USER_MANAGEMENT_COLUMN_CUSTOMIZATION_SEEN,
  EClientEvent.ADMIN_SAT_INTRODUCTION_SHOWN,
  EClientEvent.ADMIN_LBO_INTRODUCTION_SHOWN,
  EClientEvent.ADMIN_NEW_LEADERBOARDS_INTRODUCTION_SHOWN,
  EClientEvent.RESULT_PAGE_REVIEW_MARKERS_FINISHED,
  EClientEvent.RESULT_PAGE_SCORE_ANIMATED,

  EClientEvent.LABS_ONBOARDING_MESSAGE_CLOSED,
  EClientEvent.GAME_ONBOARDING_TUTORIAL_COMPLETED,
  EClientEvent.TRAINING_REPORTED_THREATS_MODAL_SEEN,
  EClientEvent.TRAINING_AWARENESS_MOMENT_STARTED,
  EClientEvent.TRAINING_AWARENESS_MOMENT_FINISHED,
  EClientEvent.TRAINING_FIRST_TIME_RANKS_SEEN,
  EServerEvent.USER_ONBOARDED,
];

export const eventDescriptions: { [key in EEvent]: string } = {
  [EServerEvent.INSIGHTS_CXO_REPORT_LOADED]:
    'CxO report was loaded in Insights',
  [EServerEvent.INSIGHTS_BM_REPORT_LOADED]: 'BM report was loaded in Insights',
  [EServerEvent.LEGACY_PLUGIN_STARTED]: 'Old Office plugin has been activated',
  [EServerEvent.PLUGIN_CLICKED]: 'Plugin has been clicked for any reason',
  [EServerEvent.PLUGIN_CHROME_EXTENSION_CLICKED]:
    'Chrome extension has been clicked, separate event to track button position that was used',
  [EServerEvent.PLUGIN_THREAT_FROM_HOXHUNT_CLICKED]:
    'Plugin clicked, while email from HoxHunt active',
  [EServerEvent.PLUGIN_EXTERNAL_THREAT_IOC_MODEL_RISK_SCORE_CALCULATED]:
    'Maliciousness probability has been calculated for an uploaded threat',
  [EServerEvent.PLUGIN_EXTERNAL_THREAT_IOC_FLAG_CREATED]:
    'Threat indicator (flag) was created for a threat',
  [EServerEvent.PLUGIN_EXTERNAL_THREAT_CLICKED]:
    'Plugin clicked, while external threat active',
  [EServerEvent.PLUGIN_EXTERNAL_THREAT_UPLOADED]:
    'User has decided to upload threat email to HoxHunt',
  [EServerEvent.PLUGIN_EXTERNAL_THREAT_PRE_UPLOADED]:
    'User has decided to (pre) upload threat email to HoxHunt',
  [EServerEvent.PLUGIN_EXTERNAL_THREAT_ANALYZED]:
    'HoxHunt has analyzed and rated an user uploaded threat email',
  [EServerEvent.PLUGIN_EXTERNAL_THREAT_RATING_INHERITED]:
    "The threat inherited the rating from it's similaritygroup",
  [EServerEvent.PLUGIN_EXTERNAL_THREAT_AUTOMATICALLY_RATED]:
    'The threat was automatically rated based on one of the autoamtic rating rules',
  [EServerEvent.PLUGIN_EXTERNAL_THREAT_DELETED]:
    'The threat has been deleted from the system',
  [EServerEvent.PLUGIN_EXTERNAL_THREAT_DOWNLOADED]:
    'Plugin has finished downloading an external threat',
  [EServerEvent.PLUGIN_EXTERNAL_THREAT_REPORT_OPTIONS_SHOWN]:
    "Plugin has shown users report/don't report options",
  [EServerEvent.PLUGIN_EXTERNAL_THREAT_REPORT_OPTIONS_YES_BUTTON_CLICKED]:
    'User has accepted to report an external threat',
  [EServerEvent.PLUGIN_EXTERNAL_THREAT_REPORT_OPTIONS_NO_BUTTON_CLICKED]:
    'User has refused to report an external threat',
  [EServerEvent.PLUGIN_EXTERNAL_THREAT_REPORT_MODIFIERS_REPLIED_TO_EMAIL]:
    'User reported that they replied to a suspicious email',
  [EServerEvent.PLUGIN_EXTERNAL_THREAT_REPORT_MODIFIERS_DOWNLOADED_FILE]:
    'User reported that they downloaded a file from a suspicious email',
  [EServerEvent.PLUGIN_EXTERNAL_THREAT_REPORT_MODIFIERS_OPENED_ATTACHMENT]:
    'User reported that they opened an attachment from a suspicious email',
  [EServerEvent.PLUGIN_EXTERNAL_THREAT_REPORT_MODIFIERS_VISITED_LINK]:
    'User reported that they visited a link in a suspicious email',
  [EServerEvent.PLUGIN_EXTERNAL_THREAT_REPORT_MODIFIERS_ENTERED_CREDENTIALS]:
    'User reported that they entered their credentials to a suspicous website',
  [EServerEvent.PLUGIN_EXTERNAL_THREAT_REPORT_MODIFIERS_FORWARDED_EMAIL]:
    'User reported that they forwarded an suspicious email',
  [EServerEvent.PLUGIN_EXTERNAL_THREAT_USER_REQUESTED_FEEDBACK]:
    "User clicked the 'I want feedback' toggle button on plugin",
  [EServerEvent.PLUGIN_FEEDBACK_RULE_PASSED]:
    'Feedback rule condition passed for an email',
  [EServerEvent.PLUGIN_CLOSE_BUTTON_CLICKED]:
    'User clicked a button that closes the plugin',
  [EServerEvent.PLUGIN_DELETE_EMAIL_BUTTON_CLICKED]:
    'User clicked a button that deletes the email and then closes the plugin',
  [EServerEvent.PLUGIN_AFTER_REPORTING_JOIN_DIALOG_ACCEPTED]:
    'User has seen Join HoxHunt -dialog after reporting and accepted',
  [EServerEvent.PLUGIN_WAIT_FOR_INVITATION_SHOWN]:
    'User has been shown Wait for invitation -message in the plugin',
  [EServerEvent.PLUGIN_SAFE_HOX_EMAIL_CLICKED]:
    'User has clicked the Hox-button on safe email from HoxHunt',
  [EServerEvent.PLUGIN_SAFE_EXTERNAL_EMAIL_CLICKED]:
    'User has clicked the Hox-button on email labeled as safe by their organization',
  [EServerEvent.PLUGIN_SAFE_EXTERNAL_SIMULATION_CLICKED]:
    'User has clicked the Hox-button on email labeled as a phising simulation not sent by Hoxhunt by their organization',
  [EServerEvent.PLUGIN_START_GAME_DIALOG_CLICKED]:
    'User has clicked start game dialog',
  [EServerEvent.PLUGIN_GAME_STARTED_DIALOG_CLICKED]:
    'User has clicked game started dialog',
  [EServerEvent.PLUGIN_CALL_API_URL_COMMAND_CREATED]:
    'Call API url command has been created (plugin)',
  [EServerEvent.PLUGIN_MOVE_TO_TRASH_MENU_OPTION_CLICKED]:
    'User selected Move to trash option from threat reporting menu',
  [EServerEvent.PLUGIN_REPORT_THREAT_MENU_OPTION_CLICKED]:
    'User selected Report threat option from threat reporting menu',
  [EServerEvent.PLUGIN_REPORT_AS_NOT_SPAM_MENU_OPTION_CLICKED]:
    'User selected Report as not spam option from threat reporting menu',
  [EServerEvent.PLUGIN_USER_REQUESTED_FEEDBACK_FROM_SECURITY_TEAM]:
    'User requested feedback from their organzations security team via the forwarded threat',
  [EServerEvent.ENGINE_QUEST_CREATED]:
    'Engine has created a quest for the user',
  [EServerEvent.ENGINE_QUEST_STARTED]:
    'Engine has started the quest for the user',
  [EServerEvent.ENGINE_QUEST_ERROR]:
    'There has been an error with the quest delivery',
  [EServerEvent.ENGINE_QUEST_SUCCEEDED]:
    'User has successfully reported a quest',
  [EServerEvent.ENGINE_QUEST_FAILED]: 'User has failed in a quest',
  [EServerEvent.ENGINE_QUEST_REMOVED]: 'Quest was removed',
  [EServerEvent.ENGINE_QUEST_SAFE_FAILED]:
    'User would have failed their first quest but was given quarter',
  [EServerEvent.ENGINE_QUEST_MISSED]: 'User has missed a quest',
  [EServerEvent.ENGINE_QUEST_FILE_DOWNLOADED]:
    'User has downloaded a file linked in a quest',
  [EServerEvent.ENGINE_QUEST_FAIL_FUNNEL_STEP_REACHED]:
    'User reached next step in landing page or attachment fail funnel',
  [EServerEvent.ENGINE_QUEST_FAILED_BY_ATP]:
    'Microsoft Safe Links (ATP) has visited the fail link',
  [EServerEvent.ENGINE_QUEST_REREPORTED]: 'User has reported a quest again',
  [EServerEvent.ENGINE_QUEST_REFAILED]: 'User has failed a quest again',
  [EServerEvent.ENGINE_QUEST_SECONDARY_OBJECTIVES_SELECTED]:
    'Secondary objectives (markers or quiz) selected for quest',
  [EServerEvent.ENGINE_PLAYER_REWARDED]:
    'Engine has rewarded the player for a successful reporting',
  [EServerEvent.ENGINE_PLAYER_REWARDED_QUIZ]:
    'Engine has rewarded the player for a successful completion of a quiz',
  [EServerEvent.ENGINE_MARKERS_VIEWED_PLAYER_REWARDED]:
    'Engine has rewarded the player for watching the markers on a quest',
  [EServerEvent.ENGINE_WEEKLY_REPORT_EMAIL_SENT]:
    'Weekly report email has been sent to the user',
  [EServerEvent.ENGINE_INVITE_EMAIL_SENT]: 'Invite email has been sent',
  [EServerEvent.ENGINE_AUTOMATIC_REMINDER_SENT]:
    'Automatic reminder has been sent',
  [EServerEvent.ENGINE_PROMOTION_EMAIL_SENT]:
    'Email, that encourages the user to use HoxHunt, has been sent',
  [EServerEvent.ENGINE_THREAT_FEEDBACK_SENT]:
    'Feedback from external threat has been sent to the user',
  [EServerEvent.ENGINE_GAME_STARTED]:
    'Game has been started for the user (new onboarding)',
  [EServerEvent.ENGINE_GAME_STARTED_BY_FORCE]:
    'Game has been forced to start for a user without user action (new onboarding)',
  [EServerEvent.ENGINE_QUEST_SELECTED]:
    'Game engine has run and has selected a quest',
  [EServerEvent.ENGINE_NO_QUEST_SELECTED]:
    'Game engine has run and could not find a quest to send to the user',
  [EServerEvent.ENGINE_VECTOR_DELIVERY_CONFIRMED]:
    'Vector delivery was confirmed be the deliverer',
  [EServerEvent.ENGINE_VECTOR_DELIVERY_FAILED]:
    'Vector delivery encountered an error',
  [EServerEvent.STARS_REWARDED]: 'Stars were rewarded to a player',
  [EServerEvent.GAME_QUIZ_COMPLETED]: 'User has completed a quiz',
  [EServerEvent.GAME_QUIZ_SENT_TO_USER]:
    'A quiz has been sent to user. Quiz may be "sent" to many places: web, email IM etc.',
  [EServerEvent.SSO_REDIRECTED_TO_START_PAGE]:
    'User has been redirected to start page from SSO',
  [EServerEvent.SSO_LOGIN_SUCCEEDED]:
    'User has successfully logged in with SSO',
  [EServerEvent.SSO_LOGIN_FAILED]:
    'User has failed in a login attempt with SSO',
  [EServerEvent.USER_CREATED]: 'User was created',
  [EServerEvent.USER_DELETED]: 'User was deleted',
  [EServerEvent.USER_INFO_UPDATED]:
    "User's country, department, city or site was updated",
  [EServerEvent.USER_SOFT_DELETED]: 'User was soft deleted',
  [EServerEvent.USER_ONBOARDED]: 'User was onboarded',
  [EServerEvent.USER_SOFT_DELETE_CANCELLED]:
    "User's soft deletion was cancelled",
  [EServerEvent.INDUSTRY_CREATED]: 'Industry was created',
  [EServerEvent.INDUSTRY_INFO_UPDATED]: 'Industry info was changed',
  [EServerEvent.INDUSTRY_DELETED]: 'Industry was deleted',
  [EServerEvent.ORGANIZATION_FEATURE_FLAG_ADDED]:
    'Feature flag was added for an organization',
  [EServerEvent.ORGANIZATION_FEATURE_FLAG_REMOVED]:
    'Feature flag was removed from an organization',
  [EServerEvent.ORGANIZATION_FEATURES_SNAPSHOT]:
    'Daily snapshot of organization features',
  [EServerEvent.RESPONSE_INCIDENT_CLASSIFICATION_CHANGED]:
    'Classification changed for an incident',
  [EServerEvent.RESPONSE_INCIDENT_NOTE_CREATED]:
    'New incident note was created',
  [EServerEvent.RESPONSE_INCIDENT_NOTE_EDITED]: 'Incident note was edited',
  [EServerEvent.RESPONSE_INCIDENT_NOTE_DELETED]: 'Incident note was deleted',
  [EServerEvent.RESPONSE_INCIDENT_CREATED]: 'New incident was created',
  [EServerEvent.RESPONSE_INCIDENT_REOPENED]: 'Incident was reopened',
  [EServerEvent.RESPONSE_INCIDENT_CLOSED]: 'Incident was closed',
  [EServerEvent.RESPONSE_INCIDENT_ESCALATED]: 'Incident was escalated',
  [EServerEvent.RESPONSE_ORGANIZATION_THREAT_ANALYSIS_PRIORITY_ASSIGNED]:
    'Threat analysis priority setting was set for an organization',
  [EServerEvent.RESPONSE_THREAT_ADDED_TO_INCIDENT]:
    'Threat was added to an incident',
  [EServerEvent.RESPONSE_THREAT_ADDED_TO_SIMILARITY_GROUP]:
    'Threat was added to a similarity group',
  [EClientEvent.RESPONSE_MARKETING_CONTENT_SHOWN]:
    'User viewed marketing content at response page',
  [EServerEvent.THREAT_HUNTING_SEARCH_STARTED]:
    'Threat hunting search started successfully',
  [EServerEvent.THREAT_HUNTING_START_SEARCH_FAILED]:
    'Threat hunting start search failed',
  [EServerEvent.THREAT_HUNTING_GET_SEARCH_RESULTS_COMPLETE]:
    'Threat hunting search results were fetched succesfully',
  [EServerEvent.THREAT_HUNTING_GET_SEARCH_RESULTS_FAILED]:
    'Threat hunting fail when trying to get search results',
  [EServerEvent.THREAT_HUNTING_EMAIL_DELETION_SUCCESS]:
    'Threat hunting email deletion successfully completed',
  [EServerEvent.THREAT_HUNTING_EMAIL_DELETION_FAILED]:
    'Threat hunting email deletion failed',
  [EServerEvent.THREAT_HUNTING_EMAIL_REVERT_SUCCESS]:
    'Threat hunting email revertion failed',
  [EServerEvent.THREAT_HUNTING_EMAIL_REVERT_FAILED]:
    'Threat hunting email revertion completed successfully',
  [EServerEvent.THREAT_HUNTING_SEARCH_RESULT_CREATED]:
    'Threat hunting search result created',
  [EServerEvent.THREAT_RESOURCE_MARKED_NOT_MALICIOUS]:
    'A threat link/attachment has been marked as not malicious by an analyst',
  [EServerEvent.THREAT_RESOURCE_MARKED_MALICIOUS]:
    'A threat link/attachment has been marked as malicious by an analyst',
  [EServerEvent.FEEDBACK_RULE_CREATED]:
    'A feedback rule configured in response was created',
  [EServerEvent.FEEDBACK_RULE_UPDATED]:
    'A feedback rule configured in response was updated',
  [EServerEvent.FEEDBACK_RULE_DELETED]:
    'A feedback rule configured in response was deleted',
  [EServerEvent.FEEDBACK_RULE_ACTIVATED]:
    'A feedback rule configured in response was activated',
  [EServerEvent.FEEDBACK_RULE_DEACTIVATED]:
    'A feedback rule configured in response was deactivated',
  [EServerEvent.USER_FEEDBACK_CREATED]: 'User left feedback on our feature',
  [EServerEvent.USER_FEEDBACK_UPDATED]: 'User updated feedback on our feature',
  [EServerEvent.USER_FEEDBACK_DELETED]: 'User feedback was deleted',
  [EServerEvent.USER_RECEIVED_SOC_CLASSIFIED_THREAT_FEEDBACK]:
    'User received feedback for a threat that their soc-operator gave a classification for',
  [EServerEvent.AUTH_LOGIN_AS_OTHER_USER]:
    'User logged in as other user (impersonatation)',
  [EServerEvent.QUEST_TEMPLATE_CREATED]: 'New quest template was created',
  [EServerEvent.QUEST_TEMPLATE_UPDATED]: 'Quest template was updated',
  [EServerEvent.QUEST_TEMPLATE_STATUS_CHANGED]:
    'Quest template active state was changed',
  [EServerEvent.TRAINING_NPS_ANSWER_CREATED]:
    'User has submitted new net promoter score via survey',
  [EServerEvent.ADMIN_ORGANIZATION_TRAINING_RULE_UPDATED]:
    'Admin has updated game engine targeting rules',
  [EServerEvent.ADMIN_KNOWLEDGE_BASE_REDIRECT_AUTHENTICATED]:
    'User has succesfully been authenticated and redirect to knowledge base',
  [EServerEvent.ADMIN_ORG_QUIZ_MODULE_UPSERTED]:
    "Admin has updated a Quiz Module's settings for the org",
  [EServerEvent.ADMIN_ORG_QUIZ_TEMPLATE_UPSERTED]:
    "Admin has updated a Quiz Template's settings for the org",
  [EServerEvent.TRAINING_QUIZ_TEMPLATE_UPSERTED]:
    'Quiz template has been upserted',
  [EServerEvent.TRAINING_QUIZ_TEMPLATE_REMOVED]:
    'Quiz template has been removed',
  [EServerEvent.TRAINING_QUIZ_MODULE_UPSERTED]: 'Quiz module has been upserted',
  [EServerEvent.TRAINING_QUIZ_MODULE_REMOVED]: 'Quiz module has been removed',
  [EServerEvent.ADMIN_USER_ROLE_CHANGED]: 'User role has changed',
  [EServerEvent.ADMIN_ORGANIZATION_DELETED]:
    'Customer organization has been deleted',
  [EServerEvent.ADMIN_ORGANIZATION_ONBOARDING_TASK_CREATED]:
    'Organization onboarding task created',
  [EServerEvent.ADMIN_ORGANIZATION_ONBOARDING_TASK_COMPLETED]:
    'Organization onboarding task completed',
  [EServerEvent.ADMIN_ORGANIZATION_ONBOARDING_COMPLETED]:
    'Organization onboarding completed',
  [EServerEvent.ADMIN_ORGANIZATION_ONBOARDING_STARTED]:
    'Organization onboarding started',
  [EClientEvent.RESULT_PAGE_REVIEW_MARKERS_STARTED]:
    'User has started to review markers in the result page',
  [EClientEvent.RESULT_PAGE_REVIEW_MARKERS_FINISHED]:
    'User has finished reviewing markers in the result page',
  [EClientEvent.RESULT_PAGE_SCORE_ANIMATED]:
    'Score number has been animated (for example 0->1700) on the result page',
  [EClientEvent.FEATURE_CONTACT_SALES_CLICKED]:
    'An admin has clicked the "contact sales" button on a feature their organization has not purchased',

  [EClientEvent.CHALLENGE_STARTED]: 'User has started a challenge',
  [EClientEvent.CHALLENGE_COMPLETED]: 'User has completed a challenge',
  [EClientEvent.CHALLENGE_EXITED]: 'User has exited a challenge',

  [EClientEvent.LABS_ONBOARDING_MESSAGE_CLOSED]:
    'User has closed labs onboarding message',
  [EClientEvent.GAME_ONBOARDING_TUTORIAL_COMPLETED]:
    'User has completed the onboarding tutorial for the game',

  [EClientEvent.PAGE_VIEW]: 'User opened page',
  [EClientEvent.SESSION_STARTED]: 'User started session',
  [EClientEvent.ADMIN_SHIELD_INTRODUCTION_SHOWN]:
    'User is shown shield introduction in admin',
  [EClientEvent.ADMIN_JOB_FUNCTION_INTRODUCTION_SHOWN]:
    'User is shown job function introduction in admin',
  [EClientEvent.ADMIN_TRAINING_MANAGEMENT_INTRODUCTION_SHOWN]:
    'User is shown training management introduction in admin',
  [EClientEvent.ADMIN_COUNTRY_LEADERBOARD_INTRODUCTION_SHOWN]:
    'User is shown country leaderboard introduction in admin',
  [EClientEvent.ADMIN_GMAIL_API_DELIVERY_INTRODUCTION_SHOWN]:
    'User is shown gmail api delivery introduction in admin',
  [EClientEvent.ADMIN_SAT_INTRODUCTION_SHOWN]:
    'User is shown sat delivery introduction in admin',
  [EClientEvent.ADMIN_LBO_INTRODUCTION_SHOWN]:
    'User is shown lbo delivery introduction in admin',
  [EClientEvent.ADMIN_NEW_LEADERBOARDS_INTRODUCTION_SHOWN]:
    'User is shown new leaderboards introduction in admin',
  [EClientEvent.RESPONSE_APPLICATION_SEARCH_INCIDENT_CLICKED]:
    'Search bar was clicked in response app incidents view',
  [EClientEvent.RESPONSE_APPLICATION_SEARCH_INCIDENT_FILTER_LIST_ITEM_CLICKED]:
    'Search filters list item was clicked on or off in incidents view',
  [EClientEvent.RESPONSE_APPLICATION_SEARCH_INCIDENT_QUERY_SUBMITTED]:
    'Incidents search query was submitted in response app',
  [EClientEvent.RESPONSE_APPLICATION_SEARCH_INCIDENT_FILTER_LIST_TOGGLE]:
    'Search filters list was toggled in response app incidents view',
  [EClientEvent.RESPONSE_APPLICATION_SEARCH_EMAIL_CLICKED]:
    'Search bar was clicked in response app emails view',
  [EClientEvent.RESPONSE_APPLICATION_SEARCH_EMAIL_FILTER_LIST_ITEM_CLICKED]:
    'Search filters list item was clicked on or off in emails view',
  [EClientEvent.RESPONSE_APPLICATION_SEARCH_EMAIL_QUERY_SUBMITTED]:
    'Emails search query was submitted in response app',
  [EClientEvent.RESPONSE_APPLICATION_SEARCH_EMAIL_FILTER_LIST_TOGGLE]:
    'Search filters list was toggled in response app emails view',
  [EClientEvent.RESPONSE_APPLICATION_SEARCH_DATA_CLICKED]:
    'Data/headers search box was clicked',
  [EClientEvent.RESPONSE_APPLICATION_SEARCH_DATA_QUERY_SUBMITTED]:
    'Data/headers search query was submitted',
  [EClientEvent.RESPONSE_MARKETING_PAGE_DEMO_REQUESTED]:
    'User requested demo from reponse marketing pages',
  [EClientEvent.INSTANT_FEEDBACK_ERROR_CARD_SHOWN]:
    'Instant feedback query errored and error card was shown',
  [EClientEvent.INSTANT_FEEDBACK_TIMEOUT_ERROR_CARD_SHOWN]:
    'Instant feedback page was shown but the data was not available in 30 seconds',
  [EClientEvent.INSTANT_FEEDBACK_THREAT_RISK_CARD_SHOWN]:
    'Instant feedback overall threat risk card was shown',
  [EClientEvent.INSTANT_FEEDBACK_THREAT_IOCS_SHOWN]:
    'Instant feedback ML threat features (iocs) was shown to user',
  [EClientEvent.INSTANT_FEEDBACK_PAGE_SHOWN]:
    'Instant feedback landing page was shown',
  [EClientEvent.INSTANT_FEEDBACK_THREAT_RATING_SHOWN]:
    'Threat rating has been shown for user in the instant feedback page',
  [EClientEvent.TRAINING_NPS_GTWO_BUTTON_CLICKED]:
    'User has clicked button in nps survey that takes them to G2 review site',
  [EClientEvent.TRAINING_JOB_FUNCTION_ANSWERED]:
    'User has given an answer to Job Function -field',
  [EClientEvent.TRAINING_REPORTED_THREATS_MODAL_SEEN]:
    'User has seen the reported threats modal in the game app',
  [EClientEvent.TRAINING_SPICY_MODE_MODAL_SEEN]:
    'User has seen the Spicy Mode modal in the game app',
  [EClientEvent.TRAINING_AWARENESS_MOMENT_FINISHED]:
    'User has answered an awareness moment and received the result',
  [EClientEvent.TRAINING_AWARENESS_MOMENT_STARTED]:
    'User has been shown a new awareness moment',
  [EClientEvent.TRAINING_AWARENESS_MOMENT_SKIPPED]:
    'User skipped an awareness moment',
  [EClientEvent.TRAINING_AWARENESS_MOMENT_LEARNING_CARD_SEEN]:
    'User has seen a learning card',
  [EClientEvent.TRAINING_FIRST_TIME_RANKS_SEEN]: 'User has been shown ranks',
  [EClientEvent.ADMIN_USER_MANAGEMENT_COLUMN_LAYOUT_CHANGED]:
    'User has changed their user management table column layout',
  [EClientEvent.ADMIN_USER_MANAGEMENT_COLUMN_CUSTOMIZATION_SEEN]:
    'User has been shown column customization',
};

// These are used to map the current events to the new events
// If these types break you've likely not generated a new event schema
// or haven't defined the key in above events. These should be temporarily
// and can be refactored away once Segment integration has been removed.
//
// New schema can be generated with "yarn gen:analytics eventschema create" from workspace root
export const eventToProductActionMap: {
  [key in EEvent]: Pick<TAnalyticsEvent, 'product' | 'action'>;
} = {
  [EServerEvent.ADMIN_ORGANIZATION_DELETED]: {
    product: 'admin',
    action: 'organization_deleted',
  },
  [EServerEvent.ADMIN_ORGANIZATION_TRAINING_RULE_UPDATED]: {
    product: 'admin',
    action: 'organization_training_rule_updated',
  },
  [EServerEvent.ADMIN_KNOWLEDGE_BASE_REDIRECT_AUTHENTICATED]: {
    product: 'admin',
    action: 'knowledge_base_redirect_authenticated',
  },
  [EServerEvent.ADMIN_ORG_QUIZ_MODULE_UPSERTED]: {
    product: 'admin',
    action: 'org_quiz_module_upserted',
  },
  [EServerEvent.ADMIN_ORG_QUIZ_TEMPLATE_UPSERTED]: {
    product: 'admin',
    action: 'org_quiz_template_upserted',
  },
  [EServerEvent.ADMIN_USER_ROLE_CHANGED]: {
    product: 'admin',
    action: 'user_role_changed',
  },
  [EClientEvent.ADMIN_USER_MANAGEMENT_COLUMN_CUSTOMIZATION_SEEN]: {
    product: 'admin',
    action: 'user_management_column_customization_seen',
  },
  [EClientEvent.ADMIN_USER_MANAGEMENT_COLUMN_LAYOUT_CHANGED]: {
    product: 'admin',
    action: 'user_management_column_layout_changed',
  },
  [EServerEvent.AUTH_LOGIN_AS_OTHER_USER]: {
    product: 'admin',
    action: 'auth_login_as_other_user',
  },
  [EClientEvent.CHALLENGE_COMPLETED]: {
    product: 'training',
    action: 'challenge',
  },
  [EClientEvent.CHALLENGE_EXITED]: {
    product: 'training',
    action: 'challenge',
  },
  [EClientEvent.CHALLENGE_STARTED]: {
    product: 'training',
    action: 'challenge',
  },
  [EServerEvent.INSIGHTS_CXO_REPORT_LOADED]: {
    product: 'insights',
    action: 'cxo_report_loaded',
  },
  [EServerEvent.INSIGHTS_BM_REPORT_LOADED]: {
    product: 'insights',
    action: 'bm_report_loaded',
  },
  [EServerEvent.ENGINE_QUEST_CREATED]: {
    product: 'training',
    action: 'engine_quest_created',
  },
  [EServerEvent.ENGINE_GAME_STARTED]: {
    product: 'training',
    action: 'engine_game_started',
  },
  [EServerEvent.ENGINE_GAME_STARTED_BY_FORCE]: {
    product: 'training',
    action: 'engine_game_started_by_force',
  },
  [EServerEvent.ENGINE_INVITE_EMAIL_SENT]: {
    product: 'training',
    action: 'engine_invite_email_sent',
  },
  [EServerEvent.ENGINE_AUTOMATIC_REMINDER_SENT]: {
    product: 'training',
    action: 'engine_automatic_reminder_sent',
  },
  [EServerEvent.ENGINE_MARKERS_VIEWED_PLAYER_REWARDED]: {
    product: 'training',
    action: 'engine_markers_viewed_player_rewarded',
  },
  [EServerEvent.ENGINE_PLAYER_REWARDED]: {
    product: 'training',
    action: 'engine_player_rewarded',
  },
  [EServerEvent.ENGINE_PLAYER_REWARDED_QUIZ]: {
    product: 'training',
    action: 'engine_player_rewarded_quiz',
  },
  [EServerEvent.ENGINE_PROMOTION_EMAIL_SENT]: {
    product: 'training',
    action: 'engine_promotion_email_sent',
  },
  [EServerEvent.ENGINE_QUEST_CREATED]: {
    product: 'training',
    action: 'engine_quest_created',
  },
  [EServerEvent.ENGINE_QUEST_ERROR]: {
    product: 'training',
    action: 'engine_quest_error',
  },
  [EServerEvent.ENGINE_QUEST_FAILED]: {
    product: 'training',
    action: 'engine_quest_failed',
  },
  [EServerEvent.ENGINE_QUEST_FAILED_BY_ATP]: {
    product: 'training',
    action: 'engine_quest_failed_by_atp',
  },
  [EServerEvent.ENGINE_QUEST_FILE_DOWNLOADED]: {
    product: 'training',
    action: 'engine_quest_file_downloaded',
  },
  [EServerEvent.ENGINE_QUEST_FAIL_FUNNEL_STEP_REACHED]: {
    product: 'training',
    action: 'engine_quest_fail_funnel_step_reached',
  },
  [EServerEvent.ENGINE_QUEST_MISSED]: {
    product: 'training',
    action: 'engine_quest_missed',
  },
  [EServerEvent.ENGINE_QUEST_REFAILED]: {
    product: 'training',
    action: 'engine_quest_refailed',
  },
  [EServerEvent.ENGINE_QUEST_SECONDARY_OBJECTIVES_SELECTED]: {
    product: 'training',
    action: 'engine_quest_secondary_objectives_selected',
  },
  [EServerEvent.ENGINE_QUEST_REMOVED]: {
    product: 'training',
    action: 'engine_quest_removed',
  },
  [EServerEvent.ENGINE_QUEST_REREPORTED]: {
    product: 'training',
    action: 'engine_quest_rereported',
  },
  [EServerEvent.ENGINE_QUEST_SAFE_FAILED]: {
    product: 'training',
    action: 'engine_quest_safe_failed',
  },
  [EServerEvent.ENGINE_QUEST_STARTED]: {
    product: 'training',
    action: 'engine_quest_started',
  },
  [EServerEvent.ENGINE_QUEST_SUCCEEDED]: {
    product: 'training',
    action: 'engine_quest_succeeded',
  },
  [EServerEvent.ENGINE_THREAT_FEEDBACK_SENT]: {
    product: 'training',
    action: 'engine_threat_feedback_sent',
  },
  [EServerEvent.ENGINE_VECTOR_DELIVERY_CONFIRMED]: {
    product: 'training',
    action: 'engine_vector_delivery_confirmed',
  },
  [EServerEvent.ENGINE_VECTOR_DELIVERY_FAILED]: {
    product: 'training',
    action: 'engine_vector_delivery_failed',
  },
  [EServerEvent.ENGINE_WEEKLY_REPORT_EMAIL_SENT]: {
    product: 'training',
    action: 'engine_weekly_report_email_sent',
  },
  [EServerEvent.ENGINE_QUEST_SELECTED]: {
    product: 'training',
    action: 'engine_quest_selected',
  },
  [EServerEvent.ENGINE_NO_QUEST_SELECTED]: {
    product: 'training',
    action: 'engine_no_quest_selected',
  },
  [EServerEvent.STARS_REWARDED]: {
    product: 'training',
    action: 'stars_rewarded',
  },
  [EServerEvent.TRAINING_NPS_ANSWER_CREATED]: {
    product: 'training',
    action: 'nps_answer_created',
  },
  [EClientEvent.FEATURE_CONTACT_SALES_CLICKED]: {
    product: 'customer',
    action: 'feature_contact_sales_clicked',
  },
  [EClientEvent.GAME_ONBOARDING_TUTORIAL_COMPLETED]: {
    product: 'training',
    action: 'game_onboarding_tutorial_completed',
  },
  [EClientEvent.INSTANT_FEEDBACK_ERROR_CARD_SHOWN]: {
    product: 'training',
    action: 'instant_feedback_error_card_shown',
  },
  [EClientEvent.INSTANT_FEEDBACK_TIMEOUT_ERROR_CARD_SHOWN]: {
    product: 'training',
    action: 'instant_feedback_timeout_error_card_shown',
  },
  [EClientEvent.INSTANT_FEEDBACK_THREAT_RISK_CARD_SHOWN]: {
    product: 'training',
    action: 'instant_feedback_threat_risk_card_shown',
  },
  [EClientEvent.INSTANT_FEEDBACK_THREAT_IOCS_SHOWN]: {
    product: 'training',
    action: 'instant_feedback_threat_iocs_shown',
  },
  [EClientEvent.INSTANT_FEEDBACK_PAGE_SHOWN]: {
    product: 'training',
    action: 'instant_feedback_page_shown',
  },
  [EClientEvent.INSTANT_FEEDBACK_THREAT_RATING_SHOWN]: {
    product: 'training',
    action: 'instant_feedback_threat_rating_shown',
  },
  [EClientEvent.LABS_ONBOARDING_MESSAGE_CLOSED]: {
    product: 'training',
    action: 'labs_onboarding_message_closed',
  },
  [EServerEvent.LEGACY_PLUGIN_STARTED]: {
    product: 'plugin',
    action: 'legacy_plugin_started',
  },
  [EClientEvent.PAGE_VIEW]: {
    product: 'legacy_segment',
    action: 'pages',
  },
  [EServerEvent.PLUGIN_AFTER_REPORTING_JOIN_DIALOG_ACCEPTED]: {
    product: 'plugin',
    action: 'after_reporting_join_dialog_accepted',
  },
  [EServerEvent.PLUGIN_CALL_API_URL_COMMAND_CREATED]: {
    product: 'plugin',
    action: 'call_api_url_command_created',
  },
  [EServerEvent.PLUGIN_CLICKED]: {
    product: 'plugin',
    action: 'clicked',
  },
  [EServerEvent.PLUGIN_CHROME_EXTENSION_CLICKED]: {
    product: 'plugin',
    action: 'chrome_extension_clicked',
  },
  [EServerEvent.PLUGIN_CLOSE_BUTTON_CLICKED]: {
    product: 'plugin',
    action: 'close_button_clicked',
  },
  [EServerEvent.PLUGIN_DELETE_EMAIL_BUTTON_CLICKED]: {
    product: 'plugin',
    action: 'delete_email_button_clicked',
  },
  [EServerEvent.PLUGIN_EXTERNAL_THREAT_ANALYZED]: {
    product: 'plugin',
    action: 'external_threat_analyzed',
  },
  [EServerEvent.PLUGIN_EXTERNAL_THREAT_CLICKED]: {
    product: 'plugin',
    action: 'external_threat_clicked',
  },
  [EServerEvent.PLUGIN_EXTERNAL_THREAT_DELETED]: {
    product: 'plugin',
    action: 'external_threat_deleted',
  },
  [EServerEvent.PLUGIN_EXTERNAL_THREAT_RATING_INHERITED]: {
    product: 'plugin',
    action: 'external_threat_rating_inherited',
  },
  [EServerEvent.PLUGIN_EXTERNAL_THREAT_AUTOMATICALLY_RATED]: {
    product: 'plugin',
    action: 'external_threat_automatically_rated',
  },
  [EServerEvent.PLUGIN_EXTERNAL_THREAT_IOC_FLAG_CREATED]: {
    product: 'plugin',
    action: 'external_threat_ioc_flag_created',
  },
  [EServerEvent.PLUGIN_EXTERNAL_THREAT_IOC_MODEL_RISK_SCORE_CALCULATED]: {
    product: 'training',
    action: 'plugin_external_threat_ioc_model_risk_score_calculated',
  },
  [EServerEvent.PLUGIN_EXTERNAL_THREAT_REPORT_MODIFIERS_DOWNLOADED_FILE]: {
    product: 'plugin',
    action: 'external_threat_report_modifiers_downloaded_file',
  },
  [EServerEvent.PLUGIN_EXTERNAL_THREAT_REPORT_MODIFIERS_ENTERED_CREDENTIALS]: {
    product: 'plugin',
    action: 'external_threat_report_modifiers_entered_credentials',
  },
  [EServerEvent.PLUGIN_EXTERNAL_THREAT_REPORT_MODIFIERS_FORWARDED_EMAIL]: {
    product: 'plugin',
    action: 'external_threat_report_modifiers_forwarded_email',
  },
  [EServerEvent.PLUGIN_EXTERNAL_THREAT_REPORT_MODIFIERS_OPENED_ATTACHMENT]: {
    product: 'plugin',
    action: 'external_threat_report_modifiers_opened_attachment',
  },
  [EServerEvent.PLUGIN_EXTERNAL_THREAT_REPORT_MODIFIERS_REPLIED_TO_EMAIL]: {
    product: 'plugin',
    action: 'external_threat_report_modifiers_replied_to_email',
  },
  [EServerEvent.PLUGIN_EXTERNAL_THREAT_REPORT_MODIFIERS_VISITED_LINK]: {
    product: 'plugin',
    action: 'external_threat_report_modifiers_visited_link',
  },
  [EServerEvent.PLUGIN_EXTERNAL_THREAT_REPORT_OPTIONS_NO_BUTTON_CLICKED]: {
    product: 'plugin',
    action: 'external_threat_report_options_no_button_clicked',
  },
  [EServerEvent.PLUGIN_EXTERNAL_THREAT_REPORT_OPTIONS_SHOWN]: {
    product: 'plugin',
    action: 'external_threat_report_options_shown',
  },
  [EServerEvent.PLUGIN_EXTERNAL_THREAT_REPORT_OPTIONS_YES_BUTTON_CLICKED]: {
    product: 'plugin',
    action: 'external_threat_report_options_yes_button_clicked',
  },
  [EServerEvent.PLUGIN_EXTERNAL_THREAT_UPLOADED]: {
    product: 'plugin',
    action: 'external_threat_uploaded',
  },
  [EServerEvent.PLUGIN_EXTERNAL_THREAT_PRE_UPLOADED]: {
    product: 'plugin',
    action: 'external_threat_pre_uploaded',
  },
  [EServerEvent.PLUGIN_EXTERNAL_THREAT_DOWNLOADED]: {
    product: 'plugin',
    action: 'external_threat_downloaded',
  },
  [EServerEvent.PLUGIN_EXTERNAL_THREAT_USER_REQUESTED_FEEDBACK]: {
    product: 'plugin',
    action: 'external_threat_feedback_requested',
  },
  [EServerEvent.PLUGIN_FEEDBACK_RULE_PASSED]: {
    product: 'plugin',
    action: 'feedback_rule_passed',
  },
  [EServerEvent.PLUGIN_MOVE_TO_TRASH_MENU_OPTION_CLICKED]: {
    product: 'plugin',
    action: 'move_to_trash_menu_option_clicked',
  },
  [EServerEvent.PLUGIN_REPORT_THREAT_MENU_OPTION_CLICKED]: {
    product: 'plugin',
    action: 'report_threat_menu_option_clicked',
  },
  [EServerEvent.PLUGIN_REPORT_AS_NOT_SPAM_MENU_OPTION_CLICKED]: {
    product: 'plugin',
    action: 'report_as_not_spam_menu_option_clicked',
  },
  [EServerEvent.PLUGIN_SAFE_HOX_EMAIL_CLICKED]: {
    product: 'plugin',
    action: 'safe_hox_email_clicked',
  },
  [EServerEvent.PLUGIN_SAFE_EXTERNAL_EMAIL_CLICKED]: {
    product: 'plugin',
    action: 'safe_external_email_clicked',
  },
  [EServerEvent.PLUGIN_SAFE_EXTERNAL_SIMULATION_CLICKED]: {
    product: 'plugin',
    action: 'safe_external_simulation_clicked',
  },
  [EServerEvent.PLUGIN_START_GAME_DIALOG_CLICKED]: {
    product: 'plugin',
    action: 'start_game_dialog_clicked',
  },
  [EServerEvent.PLUGIN_GAME_STARTED_DIALOG_CLICKED]: {
    product: 'plugin',
    action: 'start_game_dialog_clicked',
  },
  [EServerEvent.PLUGIN_THREAT_FROM_HOXHUNT_CLICKED]: {
    product: 'plugin',
    action: 'threat_from_hoxhunt_clicked',
  },
  [EServerEvent.PLUGIN_WAIT_FOR_INVITATION_SHOWN]: {
    product: 'legacy_segment',
    action: 'wait_for_invitation_shown',
  },
  [EServerEvent.PLUGIN_USER_REQUESTED_FEEDBACK_FROM_SECURITY_TEAM]: {
    product: 'plugin',
    action: 'user_requested_feedback_from_security_team',
  },
  [EServerEvent.GAME_QUIZ_COMPLETED]: {
    product: 'training',
    action: 'game_quiz_completed',
  },
  [EServerEvent.GAME_QUIZ_SENT_TO_USER]: {
    product: 'training',
    action: 'game_quiz_sent_to_user',
  },
  [EClientEvent.ADMIN_SHIELD_INTRODUCTION_SHOWN]: {
    product: 'admin',
    action: 'shield_introduction_shown',
  },
  [EClientEvent.ADMIN_JOB_FUNCTION_INTRODUCTION_SHOWN]: {
    product: 'admin',
    action: 'job_function_introduction_shown',
  },
  [EClientEvent.ADMIN_TRAINING_MANAGEMENT_INTRODUCTION_SHOWN]: {
    product: 'admin',
    action: 'training_management_introduction_shown',
  },
  [EClientEvent.ADMIN_COUNTRY_LEADERBOARD_INTRODUCTION_SHOWN]: {
    product: 'admin',
    action: 'country_leaderboard_introduction_shown',
  },
  [EClientEvent.ADMIN_GMAIL_API_DELIVERY_INTRODUCTION_SHOWN]: {
    product: 'admin',
    action: 'gmail_api_delivery_introduction_shown',
  },
  [EClientEvent.ADMIN_SAT_INTRODUCTION_SHOWN]: {
    product: 'admin',
    action: 'sat_introduction_shown',
  },
  [EClientEvent.ADMIN_LBO_INTRODUCTION_SHOWN]: {
    product: 'admin',
    action: 'lbo_introduction_shown',
  },
  [EClientEvent.ADMIN_NEW_LEADERBOARDS_INTRODUCTION_SHOWN]: {
    product: 'admin',
    action: 'new_leaderboards_introduction_shown',
  },
  [EClientEvent.RESPONSE_APPLICATION_SEARCH_DATA_CLICKED]: {
    product: 'response',
    action: 'application_search_data_clicked',
  },
  [EClientEvent.RESPONSE_APPLICATION_SEARCH_DATA_QUERY_SUBMITTED]: {
    product: 'response',
    action: 'application_search_data_query_submitted',
  },
  [EClientEvent.RESPONSE_APPLICATION_SEARCH_EMAIL_CLICKED]: {
    product: 'response',
    action: 'application_search_email_clicked',
  },
  [EClientEvent.RESPONSE_APPLICATION_SEARCH_EMAIL_FILTER_LIST_ITEM_CLICKED]: {
    product: 'response',
    action: 'application_search_email_filter_list_item_clicked',
  },
  [EClientEvent.RESPONSE_APPLICATION_SEARCH_EMAIL_FILTER_LIST_TOGGLE]: {
    product: 'response',
    action: 'application_search_email_filter_list_toggle',
  },
  [EClientEvent.RESPONSE_APPLICATION_SEARCH_EMAIL_QUERY_SUBMITTED]: {
    product: 'response',
    action: 'application_search_email_query_submitted',
  },
  [EClientEvent.RESPONSE_APPLICATION_SEARCH_INCIDENT_CLICKED]: {
    product: 'response',
    action: 'application_search_incident_clicked',
  },
  [EClientEvent.RESPONSE_APPLICATION_SEARCH_INCIDENT_FILTER_LIST_ITEM_CLICKED]:
    {
      product: 'response',
      action: 'application_search_incident_filter_list_item_clicked',
    },
  [EClientEvent.RESPONSE_APPLICATION_SEARCH_INCIDENT_FILTER_LIST_TOGGLE]: {
    product: 'response',
    action: 'application_search_incident_filter_list_toggle',
  },
  [EClientEvent.RESPONSE_APPLICATION_SEARCH_INCIDENT_QUERY_SUBMITTED]: {
    product: 'response',
    action: 'application_search_incident_query_submitted',
  },
  [EServerEvent.RESPONSE_INCIDENT_CLOSED]: {
    product: 'response',
    action: 'incident_closed',
  },
  [EServerEvent.RESPONSE_INCIDENT_CREATED]: {
    product: 'response',
    action: 'incident_created',
  },
  [EServerEvent.RESPONSE_INCIDENT_ESCALATED]: {
    product: 'response',
    action: 'incident_escalated',
  },
  [EServerEvent.RESPONSE_INCIDENT_NOTE_CREATED]: {
    product: 'response',
    action: 'incident_note_created',
  },
  [EServerEvent.RESPONSE_INCIDENT_NOTE_DELETED]: {
    product: 'response',
    action: 'incident_note_deleted',
  },
  [EServerEvent.RESPONSE_INCIDENT_NOTE_EDITED]: {
    product: 'response',
    action: 'incident_note_edited',
  },
  [EServerEvent.RESPONSE_INCIDENT_REOPENED]: {
    product: 'response',
    action: 'incident_reopened',
  },
  [EServerEvent.RESPONSE_INCIDENT_CLASSIFICATION_CHANGED]: {
    product: 'response',
    action: 'incident_classification_changed',
  },
  [EServerEvent.RESPONSE_ORGANIZATION_THREAT_ANALYSIS_PRIORITY_ASSIGNED]: {
    product: 'response',
    action: 'organization_threat_analysis_priority_assigned',
  },
  [EServerEvent.RESPONSE_THREAT_ADDED_TO_INCIDENT]: {
    product: 'response',
    action: 'threat_added_to_incident',
  },
  [EServerEvent.RESPONSE_THREAT_ADDED_TO_SIMILARITY_GROUP]: {
    product: 'response',
    action: 'threat_added_to_similarity_group',
  },
  [EClientEvent.RESPONSE_MARKETING_CONTENT_SHOWN]: {
    product: 'response',
    action: 'marketing_content_shown',
  },
  [EClientEvent.RESPONSE_MARKETING_PAGE_DEMO_REQUESTED]: {
    product: 'response',
    action: 'marketing_page_demo_requested',
  },
  [EClientEvent.RESULT_PAGE_REVIEW_MARKERS_FINISHED]: {
    product: 'training',
    action: 'result_page_review_markers_finished',
  },
  [EClientEvent.RESULT_PAGE_REVIEW_MARKERS_STARTED]: {
    product: 'training',
    action: 'result_page_review_markers_started',
  },
  [EClientEvent.RESULT_PAGE_SCORE_ANIMATED]: {
    product: 'training',
    action: 'result_page_score_animated',
  },
  [EServerEvent.SSO_LOGIN_FAILED]: {
    product: 'legacy_segment',
    action: 'sso_login_failed',
  },
  [EServerEvent.SSO_LOGIN_SUCCEEDED]: {
    product: 'legacy_segment',
    action: 'sso_login_succeeded',
  },
  [EServerEvent.SSO_REDIRECTED_TO_START_PAGE]: {
    product: 'legacy_segment',
    action: 'sso_redirect_to_start_page',
  },
  [EServerEvent.THREAT_HUNTING_EMAIL_DELETION_FAILED]: {
    product: 'response',
    action: 'threat_hunting_email_deletion_failed',
  },
  [EServerEvent.THREAT_HUNTING_EMAIL_DELETION_SUCCESS]: {
    product: 'response',
    action: 'threat_hunting_email_deletion_success',
  },
  [EServerEvent.THREAT_HUNTING_EMAIL_REVERT_FAILED]: {
    product: 'response',
    action: 'threat_hunting_email_revert_failed',
  },
  [EServerEvent.THREAT_HUNTING_EMAIL_REVERT_SUCCESS]: {
    product: 'response',
    action: 'threat_hunting_email_revert_success',
  },
  [EServerEvent.THREAT_HUNTING_GET_SEARCH_RESULTS_COMPLETE]: {
    product: 'response',
    action: 'threat_hunting_get_search_results_complete',
  },
  [EServerEvent.THREAT_HUNTING_GET_SEARCH_RESULTS_FAILED]: {
    product: 'response',
    action: 'threat_hunting_get_search_results_failed',
  },
  [EServerEvent.THREAT_HUNTING_SEARCH_RESULT_CREATED]: {
    product: 'response',
    action: 'threat_hunting_search_result_created',
  },
  [EServerEvent.THREAT_HUNTING_SEARCH_STARTED]: {
    product: 'response',
    action: 'threat_hunting_search_started',
  },
  [EServerEvent.THREAT_HUNTING_START_SEARCH_FAILED]: {
    product: 'response',
    action: 'threat_hunting_start_search_failed',
  },
  [EServerEvent.THREAT_RESOURCE_MARKED_MALICIOUS]: {
    product: 'response',
    action: 'threat_resource_marked_malicious',
  },
  [EServerEvent.THREAT_RESOURCE_MARKED_NOT_MALICIOUS]: {
    product: 'response',
    action: 'threat_resource_marked_not_malicious',
  },
  [EServerEvent.FEEDBACK_RULE_CREATED]: {
    product: 'response',
    action: 'feedback_rule_created',
  },
  [EServerEvent.FEEDBACK_RULE_UPDATED]: {
    product: 'response',
    action: 'feedback_rule_updated',
  },
  [EServerEvent.FEEDBACK_RULE_DELETED]: {
    product: 'response',
    action: 'feedback_rule_deleted',
  },
  [EServerEvent.FEEDBACK_RULE_ACTIVATED]: {
    product: 'response',
    action: 'feedback_rule_activated',
  },
  [EServerEvent.FEEDBACK_RULE_DEACTIVATED]: {
    product: 'response',
    action: 'feedback_rule_deactivated',
  },
  [EServerEvent.USER_FEEDBACK_CREATED]: {
    product: 'training',
    action: 'user_feedback_created',
  },
  [EServerEvent.USER_FEEDBACK_UPDATED]: {
    product: 'training',
    action: 'user_feedback_updated',
  },
  [EServerEvent.USER_FEEDBACK_DELETED]: {
    product: 'training',
    action: 'user_feedback_deleted',
  },
  [EServerEvent.USER_RECEIVED_SOC_CLASSIFIED_THREAT_FEEDBACK]: {
    product: 'response',
    action: 'user_received_soc_classified_threat_feedback',
  },
  [EServerEvent.ORGANIZATION_FEATURE_FLAG_ADDED]: {
    product: 'admin',
    action: 'organizaton_feature_flag_added',
  },
  [EServerEvent.ORGANIZATION_FEATURE_FLAG_REMOVED]: {
    product: 'admin',
    action: 'organizaton_feature_flag_removed',
  },
  [EServerEvent.ORGANIZATION_FEATURES_SNAPSHOT]: {
    product: 'admin',
    action: 'organization_features_snapshot',
  },
  [EServerEvent.USER_CREATED]: {
    product: 'admin',
    action: 'user_created',
  },
  [EServerEvent.USER_DELETED]: {
    product: 'admin',
    action: 'user_deleted',
  },
  [EServerEvent.USER_SOFT_DELETED]: {
    product: 'admin',
    action: 'user_soft_deleted',
  },
  [EServerEvent.USER_SOFT_DELETE_CANCELLED]: {
    product: 'admin',
    action: 'user_soft_delete_cancelled',
  },
  [EServerEvent.USER_INFO_UPDATED]: {
    product: 'admin',
    action: 'user_info_updated',
  },
  [EServerEvent.USER_ONBOARDED]: {
    product: 'training',
    action: 'user_onboarded',
  },
  [EServerEvent.INDUSTRY_CREATED]: {
    product: 'admin',
    action: 'industry_created',
  },
  [EServerEvent.INDUSTRY_INFO_UPDATED]: {
    product: 'admin',
    action: 'industry_info_updated',
  },
  [EServerEvent.INDUSTRY_DELETED]: {
    product: 'admin',
    action: 'industry_deleted',
  },
  [EClientEvent.SESSION_STARTED]: {
    product: 'legacy_segment',
    action: 'session_started',
  },
  [EServerEvent.QUEST_TEMPLATE_CREATED]: {
    product: 'training',
    action: 'quest_template_created',
  },
  [EServerEvent.QUEST_TEMPLATE_UPDATED]: {
    product: 'training',
    action: 'quest_template_updated',
  },
  [EServerEvent.QUEST_TEMPLATE_STATUS_CHANGED]: {
    product: 'training',
    action: 'quest_template_status_changed',
  },
  [EClientEvent.TRAINING_NPS_GTWO_BUTTON_CLICKED]: {
    product: 'training',
    action: 'nps_gtwo_button_clicked',
  },
  [EClientEvent.TRAINING_JOB_FUNCTION_ANSWERED]: {
    product: 'training',
    action: 'job_function_answered',
  },
  [EClientEvent.TRAINING_REPORTED_THREATS_MODAL_SEEN]: {
    product: 'training',
    action: 'reported_threats_modal_seen',
  },
  [EClientEvent.TRAINING_SPICY_MODE_MODAL_SEEN]: {
    product: 'training',
    action: 'spicy_mode_modal_seen',
  },
  [EClientEvent.TRAINING_AWARENESS_MOMENT_FINISHED]: {
    product: 'training',
    action: 'awareness_moment_finished',
  },
  [EClientEvent.TRAINING_AWARENESS_MOMENT_STARTED]: {
    product: 'training',
    action: 'awareness_moment_started',
  },
  [EClientEvent.TRAINING_AWARENESS_MOMENT_SKIPPED]: {
    product: 'training',
    action: 'awareness_moment_skipped',
  },
  [EClientEvent.TRAINING_AWARENESS_MOMENT_LEARNING_CARD_SEEN]: {
    product: 'training',
    action: 'awareness_moment_learning_card_seen',
  },
  [EClientEvent.TRAINING_FIRST_TIME_RANKS_SEEN]: {
    product: 'training',
    action: 'first_time_ranks_seen',
  },
  [EServerEvent.TRAINING_QUIZ_TEMPLATE_UPSERTED]: {
    product: 'training',
    action: 'quiz_template_upserted',
  },
  [EServerEvent.TRAINING_QUIZ_TEMPLATE_REMOVED]: {
    product: 'training',
    action: 'quiz_template_removed',
  },
  [EServerEvent.TRAINING_QUIZ_MODULE_UPSERTED]: {
    product: 'training',
    action: 'quiz_module_upserted',
  },
  [EServerEvent.TRAINING_QUIZ_MODULE_REMOVED]: {
    product: 'training',
    action: 'quiz_module_removed',
  },
  [EServerEvent.ADMIN_ORGANIZATION_ONBOARDING_TASK_CREATED]: {
    product: 'admin',
    action: 'organization_onboarding_task_created',
  },
  [EServerEvent.ADMIN_ORGANIZATION_ONBOARDING_TASK_COMPLETED]: {
    product: 'admin',
    action: 'organization_onboarding_task_completed',
  },
  [EServerEvent.ADMIN_ORGANIZATION_ONBOARDING_COMPLETED]: {
    product: 'admin',
    action: 'organization_onboarding_completed',
  },
  [EServerEvent.ADMIN_ORGANIZATION_ONBOARDING_STARTED]: {
    product: 'admin',
    action: 'organization_onboarding_started',
  },
};
