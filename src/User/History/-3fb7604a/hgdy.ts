/* tslint:disable */
/* eslint-disable */

export interface IAdminAuthLoginAsOtherUserSchema {
  product: 'admin';
  action: 'auth_login_as_other_user';
  organization_id: string;
  user_id: string;
}

export interface IAdminCountryLeaderboardIntroductionShownSchema {
  product: 'admin';
  action: 'country_leaderboard_introduction_shown';
  organization_id: string;
  user_agent?: string;
  user_id: string;
}

export interface IAdminGmailApiDeliveryIntroductionShownSchema {
  product: 'admin';
  action: 'gmail_api_delivery_introduction_shown';
  organization_id: string;
  user_agent?: string;
  user_id: string;
}

export interface IAdminIndustryCreatedSchema {
  product: 'admin';
  action: 'industry_created';
  industry_id: string;
  name?: string;
  organization_id: string;
  user_id: string;
}

export interface IAdminIndustryDeletedSchema {
  product: 'admin';
  action: 'industry_deleted';
  industry_id: string;
  name?: string;
  organization_id: string;
  user_id: string;
}

export interface IAdminIndustryInfoUpdatedSchema {
  product: 'admin';
  action: 'industry_info_updated';
  industry_id: string;
  name?: string;
  organization_id: string;
  user_id: string;
}

export interface IAdminJobFunctionIntroductionShownSchema {
  product: 'admin';
  action: 'job_function_introduction_shown';
  organization_id: string;
  user_agent?: string;
  user_id: string;
}

export interface IAdminKnowledgeBaseRedirectAuthenticatedSchema {
  product: 'admin';
  action: 'knowledge_base_redirect_authenticated';
  link_id?: string;
  organization_id: string;
  return_to?: string;
  user_id: string;
}

export interface IAdminLboIntroductionShownSchema {
  product: 'admin';
  action: 'lbo_introduction_shown';
  organization_id: string;
  user_agent?: string;
  user_id: string;
}

export interface IAdminNewLeaderboardsIntroductionShownSchema {
  product: 'admin';
  action: 'new_leaderboards_introduction_shown';
  organization_id: string;
  user_agent?: string;
  user_id: string;
}

export interface IAdminOrgQuizModuleUpsertedSchema {
  product: 'admin';
  action: 'org_quiz_module_upserted';
  module_id?: string;
  organization_id: string;
  state?: string;
  template_id?: string;
  user_id: string;
}

export interface IAdminOrgQuizTemplateUpsertedSchema {
  product: 'admin';
  action: 'org_quiz_template_upserted';
  organization_id: string;
  state?: string;
  template_id?: string;
  user_id: string;
}

export interface IAdminOrganizationDeletedSchema {
  product: 'admin';
  action: 'organization_deleted';
  organization_id: string;
  user_id: string;
}

export interface IAdminOrganizationFeaturesSnapshotSchema {
  product: 'admin';
  action: 'organization_features_snapshot';
  feature_flags?: string;
  features_enabled?: string;
  organization_id: string;
  tag_blacklist?: string;
  user_id: string;
}

export interface IAdminOrganizationOnboardingCompletedSchema {
  product: 'admin';
  action: 'organization_onboarding_completed';
  organization_id: string;
  user_id: string;
}

export interface IAdminOrganizationOnboardingStartedSchema {
  product: 'admin';
  action: 'organization_onboarding_started';
  organization_id: string;
  user_id: string;
}

export interface IAdminOrganizationOnboardingTaskCompletedSchema {
  product: 'admin';
  action: 'organization_onboarding_task_completed';
  organization_id: string;
  organization_onboarding_task_id?: string;
  user_id: string;
}

export interface IAdminOrganizationOnboardingTaskCreatedSchema {
  product: 'admin';
  action: 'organization_onboarding_task_created';
  organization_id: string;
  organization_onboarding_task_id?: string;
  user_id: string;
}

export interface IAdminOrganizationTrainingRuleUpdatedSchema {
  product: 'admin';
  action: 'organization_training_rule_updated';
  deactivation_reason?: string;
  enabled?: boolean;
  organization_id: string;
  rule_type?: string;
  target?: string;
  user_id: string;
}

export interface IAdminOrganizatonFeatureFlagAddedSchema {
  product: 'admin';
  action: 'organizaton_feature_flag_added';
  feature_flag_name?: string;
  organization_id: string;
  user_id: string;
}

export interface IAdminOrganizatonFeatureFlagRemovedSchema {
  product: 'admin';
  action: 'organizaton_feature_flag_removed';
  feature_flag_name?: string;
  organization_id: string;
  user_id: string;
}

export interface IAdminSatIntroductionShownSchema {
  product: 'admin';
  action: 'sat_introduction_shown';
  organization_id: string;
  user_agent?: string;
  user_id: string;
}

export interface IAdminShieldIntroductionShownSchema {
  product: 'admin';
  action: 'shield_introduction_shown';
  organization_id: string;
  user_agent?: string;
  user_id: string;
}

export interface IAdminTrainingManagementIntroductionShownSchema {
  product: 'admin';
  action: 'training_management_introduction_shown';
  organization_id: string;
  user_agent?: string;
  user_id: string;
}

export interface IAdminUserCreatedSchema {
  product: 'admin';
  action: 'user_created';
  organization_id: string;
  user_id: string;
}

export interface IAdminUserDeletedSchema {
  product: 'admin';
  action: 'user_deleted';
  organization_id: string;
  user_id: string;
}

export interface IAdminUserInfoUpdatedSchema {
  product: 'admin';
  action: 'user_info_updated';
  active?: boolean;
  city?: string;
  country?: string;
  department?: string;
  domain?: string;
  has_enforced_anonymity?: boolean;
  job_function?: string;
  mode?: string;
  organization_id: string;
  properties_active?: boolean;
  properties_city?: string;
  properties_country?: string;
  properties_department?: string;
  properties_has_enforced_anonymity?: boolean;
  properties_job_function?: string;
  properties_mode?: string;
  properties_site?: string;
  properties_spicy_mode_enabled?: boolean;
  site?: string;
  spicy_mode_enabled?: boolean;
  user_id: string;
}

export interface IAdminUserManagementColumnCustomizationSeenSchema {
  product: 'admin';
  action: 'user_management_column_customization_seen';
  organization_id: string;
  user_agent?: string;
  user_id: string;
}

export interface IAdminUserManagementColumnLayoutChangedSchema {
  product: 'admin';
  action: 'user_management_column_layout_changed';
  columns?: string;
  is_custom_layout?: boolean;
  layout?: string;
  organization_id: string;
  user_agent?: string;
  user_id: string;
}

export interface IAdminUserRoleChangedSchema {
  product: 'admin';
  action: 'user_role_changed';
  organization_id: string;
  user_id: string;
  user_role?: string;
}

export interface IAdminUserSoftDeleteCancelledSchema {
  product: 'admin';
  action: 'user_soft_delete_cancelled';
  organization_id: string;
  user_id: string;
}

export interface IAdminUserSoftDeletedSchema {
  product: 'admin';
  action: 'user_soft_deleted';
  organization_id: string;
  user_id: string;
}

export interface ICustomerFeatureContactSalesClickedSchema {
  product: 'customer';
  action: 'feature_contact_sales_clicked';
  anonymous_id?: string;
  feature?: string;
  organization_id: string;
  user_agent?: string;
  user_id: string;
}

export interface IInsightsBmReportLoadedSchema {
  product: 'insights';
  action: 'bm_report_loaded';
  organization_id: string;
  report_apply_timeframe?: boolean;
  report_end_date?: string;
  report_loading_time_seconds?: number;
  report_organization_id?: string;
  report_quest_tag?: string;
  report_start_date?: string;
  report_view_name?: string;
  user_id: string;
  user_agent?: string;
  user_role?: 'SUPER_ADMIN' | 'ADMIN';
}

export interface IInsightsCxoReportLoadedSchema {
  product: 'insights';
  action: 'cxo_report_loaded';
  organization_id: string;
  user_id: string;
  user_role?: string;
  user_agent?: string;
  report_end_date?: string;
  report_timeframe?: string;
  report_organization_id?: string;
  report_loading_time_seconds?: number;
  training_data_onboarded_only?: boolean;
}

export interface ILegacySegmentPagesSchema {
  product: 'legacy_segment';
  action: 'pages';
  anonymous_id?: string;
  application_name?: string;
  context_campaign_content?: string;
  context_campaign_medium?: string;
  context_campaign_name?: string;
  context_campaign_source?: string;
  organization_id: string;
  page_title?: string;
  path?: string;
  quest_id?: string;
  quest_state?: string;
  quest_tag?: string;
  referrer?: string;
  search?: string;
  title?: string;
  url?: string;
  user_agent?: string;
  user_id: string;
}

export interface ILegacySegmentSessionStartedSchema {
  product: 'legacy_segment';
  action: 'session_started';
  anonymous_id?: string;
  application_name?: string;
  organization_id: string;
  start_date?: string;
  user_agent?: string;
  user_id: string;
}

export interface ILegacySegmentSsoLoginFailedSchema {
  product: 'legacy_segment';
  action: 'sso_login_failed';
  anonymous_id?: string;
  message?: string;
  organization_id: string;
  user_id: string;
}

export interface ILegacySegmentSsoLoginSucceededSchema {
  product: 'legacy_segment';
  action: 'sso_login_succeeded';
  organization_id: string;
  user_id: string;
}

export interface ILegacySegmentSsoRedirectToStartPageSchema {
  product: 'legacy_segment';
  action: 'sso_redirect_to_start_page';
  new_user?: boolean;
  organization_created_at?: string;
  organization_created_by?: string;
  organization_default_ui_language?: string;
  organization_id: string;
  organization_sso_authn_context?: string;
  organization_sso_identifier_format?: string;
  organization_stats_player_count?: number;
  organization_stats_player_level_current_avg?: number;
  organization_stats_player_level_current_max?: number;
  organization_stats_player_level_current_min?: number;
  organization_stats_player_level_current_std_dev_pop?: number;
  organization_stats_player_level_current_std_dev_samp?: number;
  organization_stats_player_level_current_sum?: number;
  organization_stats_player_level_next_avg?: number;
  organization_stats_player_level_next_max?: number;
  organization_stats_player_level_next_min?: number;
  organization_stats_player_level_next_std_dev_pop?: number;
  organization_stats_player_level_next_std_dev_samp?: number;
  organization_stats_player_level_next_sum?: number;
  organization_stats_player_level_xp_avg?: number;
  organization_stats_player_level_xp_max?: number;
  organization_stats_player_level_xp_min?: number;
  organization_stats_player_level_xp_std_dev_pop?: number;
  organization_stats_player_level_xp_std_dev_samp?: number;
  organization_stats_player_level_xp_sum?: number;
  organization_stats_player_stars_avg?: number;
  organization_stats_player_stars_max?: number;
  organization_stats_player_stars_min?: number;
  organization_stats_player_stars_std_dev_pop?: number;
  organization_stats_player_stars_std_dev_samp?: number;
  organization_stats_player_stars_sum?: number;
  organization_stats_player_stats_failed_avg?: number;
  organization_stats_player_stats_failed_max?: number;
  organization_stats_player_stats_failed_min?: number;
  organization_stats_player_stats_failed_std_dev_pop?: number;
  organization_stats_player_stats_failed_std_dev_samp?: number;
  organization_stats_player_stats_failed_sum?: number;
  organization_stats_player_stats_success_avg?: number;
  organization_stats_player_stats_success_max?: number;
  organization_stats_player_stats_success_min?: number;
  organization_stats_player_stats_success_std_dev_pop?: number;
  organization_stats_player_stats_success_std_dev_samp?: number;
  organization_stats_player_stats_success_sum?: number;
  organization_stats_player_stats_total_avg?: number;
  organization_stats_player_stats_total_max?: number;
  organization_stats_player_stats_total_min?: number;
  organization_stats_player_stats_total_std_dev_pop?: number;
  organization_stats_player_stats_total_std_dev_samp?: number;
  organization_stats_player_stats_total_sum?: number;
  organization_stats_zxcvbn_guesses_avg?: number;
  organization_stats_zxcvbn_guesses_max?: number;
  organization_stats_zxcvbn_guesses_min?: number;
  organization_stats_zxcvbn_guesses_std_dev_pop?: number;
  organization_stats_zxcvbn_guesses_std_dev_samp?: number;
  organization_stats_zxcvbn_guesses_sum?: number;
  organization_stats_zxcvbn_score_avg?: number;
  organization_stats_zxcvbn_score_max?: number;
  organization_stats_zxcvbn_score_min?: number;
  organization_stats_zxcvbn_score_std_dev_pop?: number;
  organization_stats_zxcvbn_score_std_dev_samp?: number;
  organization_stats_zxcvbn_score_sum?: number;
  organization_tags?: string;
  organization_updated_at?: string;
  organization_updated_by?: string;
  profile_city?: string;
  profile_country?: string;
  profile_site?: string;
  user_id: string;
}

export interface ILegacySegmentWaitForInvitationShownSchema {
  product: 'legacy_segment';
  action: 'wait_for_invitation_shown';
  anonymous_id?: string;
  organization_id: string;
  user_id: string;
}

export interface IPluginAfterReportingJoinDialogAcceptedSchema {
  product: 'plugin';
  action: 'after_reporting_join_dialog_accepted';
  organization_id: string;
  user_id: string;
}

export interface IPluginCallApiUrlCommandCreatedSchema {
  product: 'plugin';
  action: 'call_api_url_command_created';
  end_point?: string;
  organization_id: string;
  user_id: string;
}

export interface IPluginChromeExtensionClickedSchema {
  product: 'plugin';
  action: 'chrome_extension_clicked';
  button_position?: string;
  organization_id: string;
  user_id: string;
}

export interface IPluginClickedSchema {
  product: 'plugin';
  action: 'clicked';
  office_js_api_name?: string;
  organization_id: string;
  plugin_api_version?: string;
  user_id: string;
}

export interface IPluginCloseButtonClickedSchema {
  product: 'plugin';
  action: 'close_button_clicked';
  organization_id: string;
  user_id: string;
}

export interface IPluginDeleteEmailButtonClickedSchema {
  product: 'plugin';
  action: 'delete_email_button_clicked';
  organization_id: string;
  user_id: string;
}

export interface IPluginExternalThreatAnalyzedSchema {
  product: 'plugin';
  action: 'external_threat_analyzed';
  organization_id: string;
  previous_step_timestamp?: string;
  rated_by_user_id?: string;
  rated_by_user_organization_id?: string;
  threat_id?: string;
  threat_reported_severity?: string;
  threat_severity?: string;
  user_id: string;
}

export interface IPluginExternalThreatAutomaticallyRatedSchema {
  product: 'plugin';
  action: 'external_threat_automatically_rated';
  automatic_rating_rule?: string;
  organization_id: string;
  threat_id?: string;
  threat_reported_severity?: string;
  threat_severity?: string;
  thret_id?: string;
  user_id: string;
}

export interface IPluginExternalThreatClickedSchema {
  product: 'plugin';
  action: 'external_threat_clicked';
  organization_id: string;
  user_id: string;
}

export interface IPluginExternalThreatDeletedSchema {
  product: 'plugin';
  action: 'external_threat_deleted';
  actor_id?: string;
  organization_id: string;
  threat_id?: string;
  user_id: string;
}

export interface IPluginExternalThreatDownloadedSchema {
  product: 'plugin';
  action: 'external_threat_downloaded';
  organization_id: string;
  user_id: string;
}

export interface IPluginExternalThreatFeedbackRequestedSchema {
  product: 'plugin';
  action: 'external_threat_feedback_requested';
  organization_id: string;
  threat_id?: string;
  user_id: string;
}

export interface IPluginExternalThreatIocFlagCreatedSchema {
  product: 'plugin';
  action: 'external_threat_ioc_flag_created';
  ioc_flag_name?: string;
  ioc_model_id?: string;
  organization_id: string;
  threat_id?: string;
  user_id: string;
}

export interface IPluginExternalThreatPreUploadedSchema {
  product: 'plugin';
  action: 'external_threat_pre_uploaded';
  invoked_from_folder?: string;
  organization_id: string;
  threat_id?: string;
  threat_received_at?: string;
  threat_reported_severity?: string;
  user_agent?: string;
  user_id: string;
}

export interface IPluginExternalThreatRatingInheritedSchema {
  product: 'plugin';
  action: 'external_threat_rating_inherited';
  organization_id: string;
  threat_id?: string;
  threat_reported_severity?: string;
  threat_severity?: string;
  user_id: string;
}

export interface IPluginExternalThreatReportModifiersDownloadedFileSchema {
  product: 'plugin';
  action: 'external_threat_report_modifiers_downloaded_file';
  organization_id: string;
  user_id: string;
}

export interface IPluginExternalThreatReportModifiersEnteredCredentialsSchema {
  product: 'plugin';
  action: 'external_threat_report_modifiers_entered_credentials';
  organization_id: string;
  user_id: string;
}

export interface IPluginExternalThreatReportModifiersForwardedEmailSchema {
  product: 'plugin';
  action: 'external_threat_report_modifiers_forwarded_email';
  organization_id: string;
  user_agent?: string;
  user_id: string;
}

export interface IPluginExternalThreatReportModifiersOpenedAttachmentSchema {
  product: 'plugin';
  action: 'external_threat_report_modifiers_opened_attachment';
  organization_id: string;
  user_id: string;
}

export interface IPluginExternalThreatReportModifiersRepliedToEmailSchema {
  product: 'plugin';
  action: 'external_threat_report_modifiers_replied_to_email';
  organization_id: string;
  user_id: string;
}

export interface IPluginExternalThreatReportModifiersVisitedLinkSchema {
  product: 'plugin';
  action: 'external_threat_report_modifiers_visited_link';
  organization_id: string;
  user_id: string;
}

export interface IPluginExternalThreatReportOptionsNoButtonClickedSchema {
  product: 'plugin';
  action: 'external_threat_report_options_no_button_clicked';
  organization_id: string;
  user_id: string;
}

export interface IPluginExternalThreatReportOptionsShownSchema {
  product: 'plugin';
  action: 'external_threat_report_options_shown';
  organization_id: string;
  user_id: string;
}

export interface IPluginExternalThreatReportOptionsYesButtonClickedSchema {
  product: 'plugin';
  action: 'external_threat_report_options_yes_button_clicked';
  organization_id: string;
  user_id: string;
}

export interface IPluginExternalThreatUploadedSchema {
  product: 'plugin';
  action: 'external_threat_uploaded';
  invoked_from_folder?: string;
  organization_id: string;
  threat_id?: string;
  threat_received_at?: string;
  threat_reported_severity?: string;
  user_agent?: string;
  user_id: string;
}

export interface IPluginFeedbackRulePassedSchema {
  product: 'plugin';
  action: 'feedback_rule_passed';
  feedback_rule_id?: string;
  feedback_rule_user_message?: string;
  organization_id: string;
  user_id: string;
}

export interface IPluginLegacyPluginStartedSchema {
  product: 'plugin';
  action: 'legacy_plugin_started';
  anonymous_id?: string;
  organization_id: string;
  user_id: string;
}

export interface IPluginMoveToTrashMenuOptionClickedSchema {
  product: 'plugin';
  action: 'move_to_trash_menu_option_clicked';
  organization_id: string;
  user_id: string;
}

export interface IPluginReportAsNotSpamMenuOptionClickedSchema {
  product: 'plugin';
  action: 'report_as_not_spam_menu_option_clicked';
  organization_id: string;
  user_id: string;
}

export interface IPluginReportThreatMenuOptionClickedSchema {
  product: 'plugin';
  action: 'report_threat_menu_option_clicked';
  organization_id: string;
  user_id: string;
}

export interface IPluginSafeExternalEmailClickedSchema {
  product: 'plugin';
  action: 'safe_external_email_clicked';
  organization_id: string;
  user_agent?: string;
  user_id: string;
}

export interface IPluginSafeExternalSimulationClickedSchema {
  product: 'plugin';
  action: 'safe_external_simulation_clicked';
  organization_id: string;
  user_agent?: string;
  user_id: string;
}

export interface IPluginSafeHoxEmailClickedSchema {
  product: 'plugin';
  action: 'safe_hox_email_clicked';
  organization_id: string;
  user_id: string;
}

export interface IPluginStartGameDialogClickedSchema {
  product: 'plugin';
  action: 'start_game_dialog_clicked';
  organization_id: string;
  user_id: string;
}

export interface IPluginThreatFromHoxhuntClickedSchema {
  product: 'plugin';
  action: 'threat_from_hoxhunt_clicked';
  organization_id: string;
  user_id: string;
}

export interface IPluginUserRequestedFeedbackFromSecurityTeamSchema {
  product: 'plugin';
  action: 'user_requested_feedback_from_security_team';
  organization_id: string;
  user_agent?: string;
  user_id: string;
}

export interface IResponseApplicationSearchDataClickedSchema {
  product: 'response';
  action: 'application_search_data_clicked';
  anonymous_id?: string;
  organization_id: string;
  user_agent?: string;
  user_id: string;
}

export interface IResponseApplicationSearchDataQuerySubmittedSchema {
  product: 'response';
  action: 'application_search_data_query_submitted';
  anonymous_id?: string;
  organization_id: string;
  query?: string;
  user_agent?: string;
  user_id: string;
}

export interface IResponseApplicationSearchEmailClickedSchema {
  product: 'response';
  action: 'application_search_email_clicked';
  anonymous_id?: string;
  organization_id: string;
  user_agent?: string;
  user_id: string;
}

export interface IResponseApplicationSearchEmailFilterListItemClickedSchema {
  product: 'response';
  action: 'application_search_email_filter_list_item_clicked';
  anonymous_id?: string;
  organization_id: string;
  to_state?: string;
  token_key?: string;
  token_value?: string;
  user_agent?: string;
  user_id: string;
}

export interface IResponseApplicationSearchEmailFilterListToggleSchema {
  product: 'response';
  action: 'application_search_email_filter_list_toggle';
  anonymous_id?: string;
  organization_id: string;
  user_agent?: string;
  user_id: string;
}

export interface IResponseApplicationSearchEmailQuerySubmittedSchema {
  product: 'response';
  action: 'application_search_email_query_submitted';
  anonymous_id?: string;
  organization_id: string;
  sort?: string;
  user_agent?: string;
  user_id: string;
}

export interface IResponseApplicationSearchIncidentClickedSchema {
  product: 'response';
  action: 'application_search_incident_clicked';
  anonymous_id?: string;
  organization_id: string;
  user_agent?: string;
  user_id: string;
}

export interface IResponseApplicationSearchIncidentFilterListItemClickedSchema {
  product: 'response';
  action: 'application_search_incident_filter_list_item_clicked';
  anonymous_id?: string;
  organization_id: string;
  to_state?: string;
  token_key?: string;
  token_value?: string;
  user_agent?: string;
  user_id: string;
}

export interface IResponseApplicationSearchIncidentFilterListToggleSchema {
  product: 'response';
  action: 'application_search_incident_filter_list_toggle';
  anonymous_id?: string;
  organization_id: string;
  user?: string;
  user_agent?: string;
  user_id: string;
}

export interface IResponseApplicationSearchIncidentQuerySubmittedSchema {
  product: 'response';
  action: 'application_search_incident_query_submitted';
  anonymous_id?: string;
  organization_id: string;
  sort?: string;
  user_agent?: string;
  user_id: string;
}

export interface IResponseFeedbackRuleActivatedSchema {
  product: 'response';
  action: 'feedback_rule_activated';
  feedback_rule_id?: string;
  organization_id: string;
  user_id: string;
}

export interface IResponseFeedbackRuleCreatedSchema {
  product: 'response';
  action: 'feedback_rule_created';
  feedback_rule_condition?: string;
  feedback_rule_id?: string;
  organization_id: string;
  user_id: string;
}

export interface IResponseFeedbackRuleDeactivatedSchema {
  product: 'response';
  action: 'feedback_rule_deactivated';
  feedback_rule_id?: string;
  organization_id: string;
  user_id: string;
}

export interface IResponseFeedbackRuleDeletedSchema {
  product: 'response';
  action: 'feedback_rule_deleted';
  feedback_rule_condition?: string;
  feedback_rule_id?: string;
  organization_id: string;
  user_id: string;
}

export interface IResponseFeedbackRuleUpdatedSchema {
  product: 'response';
  action: 'feedback_rule_updated';
  feedback_rule_condition?: string;
  feedback_rule_id?: string;
  organization_id: string;
  user_id: string;
}

export interface IResponseIncidentClassificationChangedSchema {
  product: 'response';
  action: 'incident_classification_changed';
  classification?: string;
  incident_id?: string;
  maliciousness_probability?: number;
  organization_id: string;
  user_id: string;
}

export interface IResponseIncidentClassifiedBySocSchema {
  product: 'response';
  action: 'incident_classified_by_soc';
  incident_id?: string;
  organization_id: string;
  soc_classification?: string;
  user_id: string;
}

export interface IResponseIncidentClosedSchema {
  product: 'response';
  action: 'incident_closed';
  incident_id?: string;
  organization_id: string;
  user_id: string;
}

export interface IResponseIncidentCreatedSchema {
  product: 'response';
  action: 'incident_created';
  incident_id?: string;
  organization_id: string;
  policy_name?: string;
  properties_incident_id?: string;
  properties_policy_name?: string;
  user_id: string;
}

export interface IResponseIncidentEscalatedSchema {
  product: 'response';
  action: 'incident_escalated';
  escalation_rules_email_template_body?: string;
  escalation_rules_email_template_subject?: string;
  escalation_rules_enabled?: boolean;
  escalation_rules_policy_name?: string;
  escalation_rules_policy_settings_creation_threshold?: number;
  escalation_rules_require_malicious_hoxhunt_rating?: boolean;
  escalation_rules_use_custom_email_template?: boolean;
  incident_id?: string;
  organization_id: string;
  user_id: string;
}

export interface IResponseIncidentNoteCreatedSchema {
  product: 'response';
  action: 'incident_note_created';
  incident_id?: string;
  note_id?: string;
  organization_id: string;
  user_id: string;
}

export interface IResponseIncidentNoteDeletedSchema {
  product: 'response';
  action: 'incident_note_deleted';
  incident_id?: string;
  note_id?: string;
  organization_id: string;
  user_id: string;
}

export interface IResponseIncidentNoteEditedSchema {
  product: 'response';
  action: 'incident_note_edited';
  incident_id?: string;
  note_id?: string;
  organization_id: string;
  user_id: string;
}

export interface IResponseIncidentReopenedSchema {
  product: 'response';
  action: 'incident_reopened';
  incident_id?: string;
  organization_id: string;
  user_id: string;
}

export interface IResponseMarketingContentShownSchema {
  product: 'response';
  action: 'marketing_content_shown';
  marketing_feature_shown?: string;
  organization_id: string;
  user_agent?: string;
  user_id: string;
}

export interface IResponseMarketingPageDemoRequestedSchema {
  product: 'response';
  action: 'marketing_page_demo_requested';
  marketing_page_name?: string;
  organization_id: string;
  user_agent?: string;
  user_id: string;
}

export interface IResponseOrganizationThreatAnalysisPriorityAssignedSchema {
  product: 'response';
  action: 'organization_threat_analysis_priority_assigned';
  organization_id: string;
  threat_analysis_priority?: string;
  user_id: string;
}

export interface IResponseThreatAddedToIncidentSchema {
  product: 'response';
  action: 'threat_added_to_incident';
  incident_id?: string;
  organization_id: string;
  threat_id?: string;
  user_id: string;
}

export interface IResponseThreatAddedToSimilarityGroupSchema {
  product: 'response';
  action: 'threat_added_to_similarity_group';
  group_id?: string;
  organization_id: string;
  similarity_score?: number;
  threat_id?: string;
  user_id: string;
}

export interface IResponseThreatHuntingEmailDeletionFailedSchema {
  product: 'response';
  action: 'threat_hunting_email_deletion_failed';
  hunting_search_job_result_id?: string;
  organization_id: string;
  user_id: string;
}

export interface IResponseThreatHuntingEmailDeletionSuccessSchema {
  product: 'response';
  action: 'threat_hunting_email_deletion_success';
  deleted_from_folder?: string;
  hunting_search_job_result_id?: string;
  organization_id: string;
  user_id: string;
}

export interface IResponseThreatHuntingEmailRevertFailedSchema {
  product: 'response';
  action: 'threat_hunting_email_revert_failed';
  hunting_search_job_result_id?: string;
  organization_id: string;
  user_id: string;
}

export interface IResponseThreatHuntingEmailRevertSuccessSchema {
  product: 'response';
  action: 'threat_hunting_email_revert_success';
  hunting_search_job_result_id?: string;
  organization_id: string;
  user_id: string;
}

export interface IResponseThreatHuntingGetSearchResultsCompleteSchema {
  product: 'response';
  action: 'threat_hunting_get_search_results_complete';
  hunting_search_execution_time_seconds?: number;
  hunting_search_job_id?: string;
  incident_id?: string;
  organization_id: string;
  user_id: string;
}

export interface IResponseThreatHuntingGetSearchResultsFailedSchema {
  product: 'response';
  action: 'threat_hunting_get_search_results_failed';
  hunting_search_job_id?: string;
  incident_id?: string;
  organization_id: string;
  user_id: string;
}

export interface IResponseThreatHuntingSearchResultCreatedSchema {
  product: 'response';
  action: 'threat_hunting_search_result_created';
  hunting_search_job_id?: string;
  hunting_search_job_result_id?: string;
  organization_id: string;
  user_id: string;
}

export interface IResponseThreatHuntingSearchStartedSchema {
  product: 'response';
  action: 'threat_hunting_search_started';
  hunting_search_job_id?: string;
  incident_id?: string;
  organization_id: string;
  user_id: string;
}

export interface IResponseThreatHuntingStartSearchFailedSchema {
  product: 'response';
  action: 'threat_hunting_start_search_failed';
  hunting_search_job_id?: string;
  incident_id?: string;
  organization_id: string;
  user_id: string;
}

export interface IResponseThreatResourceMarkedMaliciousSchema {
  product: 'response';
  action: 'threat_resource_marked_malicious';
  organization_id: string;
  threat_id?: string;
  threat_resource_hash?: string;
  threat_resource_type?: string;
  user_id: string;
}

export interface IResponseThreatResourceMarkedNotMaliciousSchema {
  product: 'response';
  action: 'threat_resource_marked_not_malicious';
  organization_id: string;
  threat_id?: string;
  threat_resource_hash?: string;
  threat_resource_type?: string;
  user_id: string;
}

export interface IResponseUserReceivedSocClassifiedThreatFeedbackSchema {
  product: 'response';
  action: 'user_received_soc_classified_threat_feedback';
  classification?: string;
  organization_id: string;
  threat_id?: string;
  user_id: string;
}

export interface ITrainingAwarenessMomentFinishedSchema {
  product: 'training';
  action: 'awareness_moment_finished';
  organization_id: string;
  quiz_tag?: string;
  seconds_to_answer?: number;
  seconds_to_proceed_after_result?: number;
  stars_awarded?: number;
  user_agent?: string;
  user_id: string;
}

export interface ITrainingAwarenessMomentLearningCardSeenSchema {
  product: 'training';
  action: 'awareness_moment_learning_card_seen';
  organization_id: string;
  quiz_tag?: string;
  user_agent?: string;
  user_id: string;
}

export interface ITrainingAwarenessMomentSkippedSchema {
  product: 'training';
  action: 'awareness_moment_skipped';
  organization_id: string;
  quiz_tag?: string;
  user_agent?: string;
  user_id: string;
}

export interface ITrainingAwarenessMomentStartedSchema {
  product: 'training';
  action: 'awareness_moment_started';
  organization_id: string;
  quiz_tag?: string;
  user_agent?: string;
  user_id: string;
}

export interface ITrainingChallengeCompletedSchema {
  product: 'training';
  action: 'challenge_completed';
  anonymous_id?: string;
  challenge_name?: string;
  organization_id: string;
  score?: number;
  user_agent?: string;
  user_id: string;
}

export interface ITrainingChallengeExitedSchema {
  product: 'training';
  action: 'challenge_exited';
  anonymous_id?: string;
  challenge_name?: string;
  organization_id: string;
  user_agent?: string;
  user_id: string;
}

export interface ITrainingChallengeSchema {
  product: 'training';
  action: 'challenge';
  anonymous_id?: string;
  challenge_name?: string;
  organization_id: string;
  score?: number;
  user_id: string;
}

export interface ITrainingChallengeStartedSchema {
  product: 'training';
  action: 'challenge_started';
  anonymous_id?: string;
  challenge_name?: string;
  organization_id: string;
  user_agent?: string;
  user_id: string;
}

export interface ITrainingEngineAutomaticReminderSentSchema {
  product: 'training';
  action: 'engine_automatic_reminder_sent';
  automatic_reminder_emails_sent?: number;
  organization_id: string;
  stats_missed?: number;
  user_id: string;
}

export interface ITrainingEngineGameStartedByForceSchema {
  product: 'training';
  action: 'engine_game_started_by_force';
  organization_id: string;
  user_id: string;
}

export interface ITrainingEngineGameStartedSchema {
  product: 'training';
  action: 'engine_game_started';
  anonymous_id?: string;
  organization_id: string;
  user_id: string;
}

export interface ITrainingEngineInviteEmailSentSchema {
  product: 'training';
  action: 'engine_invite_email_sent';
  organization_id: string;
  stats_missed?: number;
  user_id: string;
}

export interface ITrainingEngineMarkersViewedPlayerRewardedSchema {
  product: 'training';
  action: 'engine_markers_viewed_player_rewarded';
  organization_id: string;
  quest_difficulty?: number;
  quest_id?: string;
  quest_language?: string;
  quest_origin?: string;
  quest_tag?: string;
  quest_tags?: string;
  quest_type?: string;
  tag?: string;
  user_id: string;
}

export interface ITrainingEngineNoQuestSelectedSchema {
  product: 'training';
  action: 'engine_no_quest_selected';
  organization_id: string;
  user_id: string;
}

export interface ITrainingEnginePlayerRewardedQuizSchema {
  product: 'training';
  action: 'engine_player_rewarded_quiz';
  organization_id: string;
  quest_difficulty?: number;
  quest_id?: string;
  quest_language?: string;
  quest_origin?: string;
  quest_tag?: string;
  quest_tags?: string;
  quest_type?: string;
  stars?: number;
  stats_failed?: number;
  stats_missed?: number;
  stats_success?: number;
  stats_total?: number;
  user_id: string;
  xp?: number;
}

export interface ITrainingEnginePlayerRewardedSchema {
  product: 'training';
  action: 'engine_player_rewarded';
  organization_id: string;
  quest_difficulty?: number;
  quest_id?: string;
  quest_language?: string;
  quest_origin?: string;
  quest_tag?: string;
  quest_tags?: string;
  quest_type?: string;
  stars?: number;
  stats_failed?: number;
  stats_missed?: number;
  stats_success?: number;
  stats_total?: number;
  user_id: string;
  xp?: number;
}

export interface ITrainingEnginePromotionEmailSentSchema {
  product: 'training';
  action: 'engine_promotion_email_sent';
  organization_id: string;
  user_id: string;
}

export interface ITrainingEngineQuestCreatedSchema {
  product: 'training';
  action: 'engine_quest_created';
  organization_id: string;
  quest_difficulty?: number;
  quest_id?: string;
  quest_language?: string;
  quest_origin?: string;
  quest_tag?: string;
  quest_tags?: string;
  quest_type?: string;
  starts_at?: string;
  user_id: string;
  user_tz?: string;
}

export interface ITrainingEngineQuestErrorSchema {
  product: 'training';
  action: 'engine_quest_error';
  error_source?: string;
  heuristics_veto?: string;
  language_code?: string;
  organization_id: string;
  quest_difficulty?: number;
  quest_id?: string;
  quest_language?: string;
  quest_origin?: string;
  quest_tag?: string;
  quest_tags?: string;
  quest_type?: string;
  user_id: string;
}

export interface ITrainingEngineQuestFailFunnelStepReachedSchema {
  product: 'training';
  action: 'engine_quest_fail_funnel_step_reached';
  file_name?: string;
  organization_id: string;
  quest_difficulty?: number;
  quest_fail_funnel_step_id?: string;
  quest_id?: string;
  quest_language?: string;
  quest_origin?: string;
  quest_tag?: string;
  quest_tags?: string;
  quest_type?: string;
  quest_user_action?: string;
  user_id: string;
}

export interface ITrainingEngineQuestFailedByAtpSchema {
  product: 'training';
  action: 'engine_quest_failed_by_atp';
  organization_id: string;
  quest_id?: string;
  user_id: string;
}

export interface ITrainingEngineQuestFailedSchema {
  product: 'training';
  action: 'engine_quest_failed';
  is_safe_fail?: boolean;
  organization_id: string;
  quest_difficulty?: number;
  quest_failure_condition?: string;
  quest_id?: string;
  quest_language?: string;
  quest_origin?: string;
  quest_tag?: string;
  quest_tags?: string;
  quest_type?: string;
  quest_user_action?: string;
  timed_out?: boolean;
  user_agent?: string;
  user_id: string;
}

export interface ITrainingEngineQuestFileDownloadedSchema {
  product: 'training';
  action: 'engine_quest_file_downloaded';
  file_name?: string;
  organization_id: string;
  quest_tag?: string;
  quest_type?: string;
  user_id: string;
}

export interface ITrainingEngineQuestMissedSchema {
  product: 'training';
  action: 'engine_quest_missed';
  is_first_miss?: boolean;
  organization_id: string;
  quest_difficulty?: number;
  quest_id?: string;
  quest_language?: string;
  quest_origin?: string;
  quest_tag?: string;
  quest_tags?: string;
  quest_type?: string;
  user_id: string;
}

export interface ITrainingEngineQuestRefailedSchema {
  product: 'training';
  action: 'engine_quest_refailed';
  organization_id: string;
  quest_difficulty?: number;
  quest_id?: string;
  quest_language?: string;
  quest_origin?: string;
  quest_tag?: string;
  quest_tags?: string;
  quest_type?: string;
  quest_user_action?: string;
  user_id: string;
}

export interface ITrainingEngineQuestRemovedSchema {
  product: 'training';
  action: 'engine_quest_removed';
  action_source?: string;
  organization_id: string;
  quest_difficulty?: number;
  quest_id?: string;
  quest_language?: string;
  quest_origin?: string;
  quest_tag?: string;
  quest_tags?: string;
  quest_type?: string;
  user_id: string;
}

export interface ITrainingEngineQuestRereportedSchema {
  product: 'training';
  action: 'engine_quest_rereported';
  organization_id: string;
  quest_difficulty?: number;
  quest_id?: string;
  quest_language?: string;
  quest_origin?: string;
  quest_tag?: string;
  quest_tags?: string;
  quest_type?: string;
  user_id: string;
}

export interface ITrainingEngineQuestSafeFailedSchema {
  product: 'training';
  action: 'engine_quest_safe_failed';
  organization_id: string;
  quest_difficulty?: number;
  quest_id?: string;
  quest_language?: string;
  quest_origin?: string;
  quest_tag?: string;
  quest_tags?: string;
  quest_type?: string;
  user_id: string;
}

export interface ITrainingEngineQuestSecondaryObjectivesSelectedSchema {
  product: 'training';
  action: 'engine_quest_secondary_objectives_selected';
  organization_id: string;
  quest_difficulty?: number;
  quest_id?: string;
  quest_language?: string;
  quest_origin?: string;
  quest_secondary_objectives?: string;
  quest_tag?: string;
  quest_tags?: string;
  quest_type?: string;
  user_id: string;
}

export interface ITrainingEngineQuestSelectedSchema {
  product: 'training';
  action: 'engine_quest_selected';
  organization_id: string;
  quest_cooldown?: string;
  quest_cooldown_name?: string;
  quest_tag?: string;
  selection_meta?: string;
  selection_strategy?: string;
  user_id: string;
}

export interface ITrainingEngineQuestStartedSchema {
  product: 'training';
  action: 'engine_quest_started';
  coworker_ids?: string;
  language_code?: string;
  organization_id: string;
  quest_difficulty?: number;
  quest_id?: string;
  quest_language?: string;
  quest_origin?: string;
  quest_tag?: string;
  quest_tags?: string;
  quest_type?: string;
  starts_at?: string;
  user_id: string;
  user_tz?: string;
  vector_id?: string;
}

export interface ITrainingEngineQuestSucceededSchema {
  product: 'training';
  action: 'engine_quest_succeeded';
  organization_id: string;
  quest_difficulty?: number;
  quest_id?: string;
  quest_language?: string;
  quest_origin?: string;
  quest_tag?: string;
  quest_tags?: string;
  quest_type?: string;
  reporting_speed?: number;
  user_agent?: string;
  user_id: string;
}

export interface ITrainingEngineThreatFeedbackSentSchema {
  product: 'training';
  action: 'engine_threat_feedback_sent';
  organization_id: string;
  threat_count?: number;
  threat_id?: string;
  threat_ids?: string;
  user_id: string;
}

export interface ITrainingEngineVectorDeliveryConfirmedSchema {
  product: 'training';
  action: 'engine_vector_delivery_confirmed';
  organization_id: string;
  quest_id?: string;
  source_property?: string;
  user_id: string;
  vector_id?: string;
  vector_state?: string;
}

export interface ITrainingEngineVectorDeliveryFailedSchema {
  product: 'training';
  action: 'engine_vector_delivery_failed';
  organization_id: string;
  quest_id?: string;
  source_property?: string;
  user_id: string;
  vector_id?: string;
  vector_state?: string;
}

export interface ITrainingEngineWeeklyReportEmailSentSchema {
  product: 'training';
  action: 'engine_weekly_report_email_sent';
  organization_id: string;
  user_id: string;
}

export interface ITrainingFirstTimeRanksSeenSchema {
  product: 'training';
  action: 'first_time_ranks_seen';
  organization_id: string;
  user_agent?: string;
  user_id: string;
}

export interface ITrainingGameOnboardingTutorialCompletedSchema {
  product: 'training';
  action: 'game_onboarding_tutorial_completed';
  organization_id: string;
  user_id: string;
}

export interface ITrainingGameQuizCompletedSchema {
  product: 'training';
  action: 'game_quiz_completed';
  correct_answer_count?: number;
  correct_answer_percentage?: number;
  organization_id: string;
  quest_difficulty?: number;
  quest_id?: string;
  quest_language?: string;
  quest_origin?: string;
  quest_tag?: string;
  quest_tags?: string;
  quest_type?: string;
  quiz_type?: string;
  total_correct_answer_count?: number;
  user_id: string;
}

export interface ITrainingGameQuizSentToUserSchema {
  product: 'training';
  action: 'game_quiz_sent_to_user';
  organization_id: string;
  quest_difficulty?: number;
  quest_id?: string;
  quest_language?: string;
  quest_origin?: string;
  quest_tag?: string;
  quest_tags?: string;
  quest_type?: string;
  user_id: string;
}

export interface ITrainingGameStartedSchema {
  product: 'training';
  action: 'game_started';
  organization_id: string;
  user_id: string;
}

export interface ITrainingInstantFeedbackErrorCardShownSchema {
  product: 'training';
  action: 'instant_feedback_error_card_shown';
  organization_id: string;
  threat_id?: string;
  user_agent?: string;
  user_id: string;
}

export interface ITrainingInstantFeedbackPageShownSchema {
  product: 'training';
  action: 'instant_feedback_page_shown';
  organization_id: string;
  threat_id?: string;
  user_agent?: string;
  user_id: string;
}

export interface ITrainingInstantFeedbackThreatIocsShownSchema {
  product: 'training';
  action: 'instant_feedback_threat_iocs_shown';
  ioc_feature_name?: string;
  organization_id: string;
  threat_id?: string;
  user_agent?: string;
  user_id: string;
}

export interface ITrainingInstantFeedbackThreatRatingShownSchema {
  product: 'training';
  action: 'instant_feedback_threat_rating_shown';
  organization_id: string;
  threat_id?: string;
  user_agent?: string;
  user_id: string;
}

export interface ITrainingInstantFeedbackThreatRiskCardShownSchema {
  product: 'training';
  action: 'instant_feedback_threat_risk_card_shown';
  ioc_maliciousness_skull_number?: number;
  organization_id: string;
  threat_id?: string;
  user_agent?: string;
  user_id: string;
}

export interface ITrainingInstantFeedbackTimeoutErrorCardShownSchema {
  product: 'training';
  action: 'instant_feedback_timeout_error_card_shown';
  organization_id: string;
  threat_id?: string;
  user_agent?: string;
  user_id: string;
}

export interface ITrainingInviteSentSchema {
  product: 'training';
  action: 'invite_sent';
  organization_id: string;
  user_id: string;
}

export interface ITrainingJobFunctionAnsweredSchema {
  product: 'training';
  action: 'job_function_answered';
  job_function?: string;
  organization_id: string;
  user_agent?: string;
  user_id: string;
}

export interface ITrainingLabsOnboardingMessageClosedSchema {
  product: 'training';
  action: 'labs_onboarding_message_closed';
  anonymous_id?: string;
  organization_id: string;
  user_agent?: string;
  user_id: string;
}

export interface ITrainingNpsAnswerCreatedSchema {
  product: 'training';
  action: 'nps_answer_created';
  nps_text_feedback?: string;
  nps_value?: number;
  organization_id: string;
  timestamp?: string;
  user_id: string;
  user_role?: string;
}

export interface ITrainingNpsGtwoButtonClickedSchema {
  product: 'training';
  action: 'nps_gtwo_button_clicked';
  experiment?: string;
  organization_id: string;
  user_agent?: string;
  user_id: string;
}

export interface ITrainingPluginExternalThreatIocModelRiskScoreCalculatedSchema {
  product: 'training';
  action: 'plugin_external_threat_ioc_model_risk_score_calculated';
  ioc_model_id?: string;
  maliciousness_probability?: number;
  organization_id: string;
  threat_id?: string;
  user_id: string;
}

export interface ITrainingQuestSecondaryObjectivesSelectedSchema {
  product: 'training';
  action: 'quest_secondary_objectives_selected';
  organization_id: string;
  quest_difficulty?: number;
  quest_id?: string;
  quest_language?: string;
  quest_origin?: string;
  quest_secondary_objectives?: string;
  quest_tag?: string;
  quest_tags?: string;
  quest_type?: string;
  user_id: string;
}

export interface ITrainingQuestTemplateCreatedSchema {
  product: 'training';
  action: 'quest_template_created';
  is_active?: boolean;
  language?: string;
  line_count?: number;
  main_theme?: string;
  organization_id: string;
  quest_tag?: string;
  quest_template_id?: string;
  user_id: string;
}

export interface ITrainingQuestTemplateStatusChangedSchema {
  product: 'training';
  action: 'quest_template_status_changed';
  is_active?: boolean;
  organization_id: string;
  quest_tag?: string;
  quest_template_id?: string;
  user_id: string;
}

export interface ITrainingQuestTemplateUpdatedSchema {
  product: 'training';
  action: 'quest_template_updated';
  is_active?: boolean;
  language?: string;
  line_count?: number;
  main_theme?: string;
  organization_id: string;
  quest_tag?: string;
  quest_template_id?: string;
  user_id: string;
}

export interface ITrainingQuizModuleRemovedSchema {
  product: 'training';
  action: 'quiz_module_removed';
  module_id?: string;
  organization_id: string;
  user_id: string;
}

export interface ITrainingQuizModuleUpsertedSchema {
  product: 'training';
  action: 'quiz_module_upserted';
  module_id?: string;
  name?: string;
  organization_id: string;
  state?: string;
  tag?: string;
  template_ids?: string;
  user_id: string;
}

export interface ITrainingQuizTemplateRemovedSchema {
  product: 'training';
  action: 'quiz_template_removed';
  organization_id: string;
  template_id?: string;
  user_id: string;
}

export interface ITrainingQuizTemplateUpsertedSchema {
  product: 'training';
  action: 'quiz_template_upserted';
  name?: string;
  organization_id: string;
  state?: string;
  tag?: string;
  template_id?: string;
  user_id: string;
}

export interface ITrainingReportedThreatsModalSeenSchema {
  product: 'training';
  action: 'reported_threats_modal_seen';
  organization_id: string;
  user_agent?: string;
  user_id: string;
}

export interface ITrainingResultPageReviewMarkersFinishedSchema {
  product: 'training';
  action: 'result_page_review_markers_finished';
  anonymous_id?: string;
  give_star?: boolean;
  marker_viewing_id?: string;
  num_vector_indicators?: number;
  organization_id: string;
  quest_id?: string;
  quest_tag?: string;
  result_flow_view?: boolean;
  step_count?: number;
  total_time_in_seconds?: number;
  user_agent?: string;
  user_id: string;
}

export interface ITrainingResultPageReviewMarkersStartedSchema {
  product: 'training';
  action: 'result_page_review_markers_started';
  anonymous_id?: string;
  give_star?: boolean;
  marker_viewing_id?: string;
  num_vector_indicators?: number;
  organization_id: string;
  quest_id?: string;
  quest_tag?: string;
  result_flow_view?: boolean;
  step_count?: number;
  user_agent?: string;
  user_id: string;
}

export interface ITrainingResultPageScoreAnimatedSchema {
  product: 'training';
  action: 'result_page_score_animated';
  anonymous_id?: string;
  organization_id: string;
  quest_id?: string;
  quest_tag?: string;
  user_agent?: string;
  user_id: string;
}

export interface ITrainingResultReviewMarkersFinishedSchema {
  product: 'training';
  action: 'result_review_markers_finished';
  anonymous_id?: string;
  completion_percentage?: number;
  give_star?: boolean;
  organization_id: string;
  quest_tag?: string;
  reason?: string;
  seconds_per_step?: number;
  total_steps?: number;
  total_time_in_seconds?: number;
  user_agent?: string;
  user_id: string;
}

export interface ITrainingResultReviewMarkersSchema {
  product: 'training';
  action: 'result_review_markers';
  anonymous_id?: string;
  give_star?: boolean;
  organization_id: string;
  quest_tag?: string;
  user_agent?: string;
  user_id: string;
}

export interface ITrainingSpicyModeModalSeenSchema {
  product: 'training';
  action: 'spicy_mode_modal_seen';
  organization_id: string;
  user_agent?: string;
  user_id: string;
}

export interface ITrainingStarsRewardedSchema {
  product: 'training';
  action: 'stars_rewarded';
  max_star_count?: number;
  organization_id: string;
  quest_id?: string;
  source_event_for_reward?: string;
  star_count?: number;
  star_reward_type?: string;
  stars_rewarded_time?: string;
  user_id: string;
}

export interface ITrainingTrainingEngineQuestFailFunnelStepReachedSchema {
  product: 'training';
  action: 'training_engine_quest_fail_funnel_step_reached';
  file_name?: string;
  organization_id: string;
  quest_fail_funnel_step_id?: string;
  quest_id?: string;
  quest_type?: string;
  quest_user_action?: string;
  user_id: string;
}

export interface ITrainingUserFeedbackCreatedSchema {
  product: 'training';
  action: 'user_feedback_created';
  organization_id: string;
  threat_id?: string;
  user_feedback_feature?: string;
  user_feedback_score?: string;
  user_feedback_tags?: string;
  user_id: string;
}

export interface ITrainingUserFeedbackDeletedSchema {
  product: 'training';
  action: 'user_feedback_deleted';
  organization_id: string;
  threat_id?: string;
  user_feedback_feature?: string;
  user_id: string;
}

export interface ITrainingUserFeedbackUpdatedSchema {
  product: 'training';
  action: 'user_feedback_updated';
  organization_id: string;
  threat_id?: string;
  user_feedback_feature?: string;
  user_feedback_score?: string;
  user_feedback_tags?: string;
  user_id: string;
}

export interface ITrainingUserOnboardedSchema {
  product: 'training';
  action: 'user_onboarded';
  organization_id: string;
  user_id: string;
}

export type TAnalyticsEventSchema =
  | IAdminAuthLoginAsOtherUserSchema
  | IAdminCountryLeaderboardIntroductionShownSchema
  | IAdminGmailApiDeliveryIntroductionShownSchema
  | IAdminIndustryCreatedSchema
  | IAdminIndustryDeletedSchema
  | IAdminIndustryInfoUpdatedSchema
  | IAdminJobFunctionIntroductionShownSchema
  | IAdminKnowledgeBaseRedirectAuthenticatedSchema
  | IAdminLboIntroductionShownSchema
  | IAdminNewLeaderboardsIntroductionShownSchema
  | IAdminOrgQuizModuleUpsertedSchema
  | IAdminOrgQuizTemplateUpsertedSchema
  | IAdminOrganizationDeletedSchema
  | IAdminOrganizationFeaturesSnapshotSchema
  | IAdminOrganizationOnboardingCompletedSchema
  | IAdminOrganizationOnboardingStartedSchema
  | IAdminOrganizationOnboardingTaskCompletedSchema
  | IAdminOrganizationOnboardingTaskCreatedSchema
  | IAdminOrganizationTrainingRuleUpdatedSchema
  | IAdminOrganizatonFeatureFlagAddedSchema
  | IAdminOrganizatonFeatureFlagRemovedSchema
  | IAdminSatIntroductionShownSchema
  | IAdminShieldIntroductionShownSchema
  | IAdminTrainingManagementIntroductionShownSchema
  | IAdminUserCreatedSchema
  | IAdminUserDeletedSchema
  | IAdminUserInfoUpdatedSchema
  | IAdminUserManagementColumnCustomizationSeenSchema
  | IAdminUserManagementColumnLayoutChangedSchema
  | IAdminUserRoleChangedSchema
  | IAdminUserSoftDeleteCancelledSchema
  | IAdminUserSoftDeletedSchema
  | ICustomerFeatureContactSalesClickedSchema
  | IInsightsBmReportLoadedSchema
  | IInsightsCxoReportLoadedSchema
  | ILegacySegmentPagesSchema
  | ILegacySegmentSessionStartedSchema
  | ILegacySegmentSsoLoginFailedSchema
  | ILegacySegmentSsoLoginSucceededSchema
  | ILegacySegmentSsoRedirectToStartPageSchema
  | ILegacySegmentWaitForInvitationShownSchema
  | IPluginAfterReportingJoinDialogAcceptedSchema
  | IPluginCallApiUrlCommandCreatedSchema
  | IPluginChromeExtensionClickedSchema
  | IPluginClickedSchema
  | IPluginCloseButtonClickedSchema
  | IPluginDeleteEmailButtonClickedSchema
  | IPluginExternalThreatAnalyzedSchema
  | IPluginExternalThreatAutomaticallyRatedSchema
  | IPluginExternalThreatClickedSchema
  | IPluginExternalThreatDeletedSchema
  | IPluginExternalThreatDownloadedSchema
  | IPluginExternalThreatFeedbackRequestedSchema
  | IPluginExternalThreatIocFlagCreatedSchema
  | IPluginExternalThreatPreUploadedSchema
  | IPluginExternalThreatRatingInheritedSchema
  | IPluginExternalThreatReportModifiersDownloadedFileSchema
  | IPluginExternalThreatReportModifiersEnteredCredentialsSchema
  | IPluginExternalThreatReportModifiersForwardedEmailSchema
  | IPluginExternalThreatReportModifiersOpenedAttachmentSchema
  | IPluginExternalThreatReportModifiersRepliedToEmailSchema
  | IPluginExternalThreatReportModifiersVisitedLinkSchema
  | IPluginExternalThreatReportOptionsNoButtonClickedSchema
  | IPluginExternalThreatReportOptionsShownSchema
  | IPluginExternalThreatReportOptionsYesButtonClickedSchema
  | IPluginExternalThreatUploadedSchema
  | IPluginFeedbackRulePassedSchema
  | IPluginLegacyPluginStartedSchema
  | IPluginMoveToTrashMenuOptionClickedSchema
  | IPluginReportAsNotSpamMenuOptionClickedSchema
  | IPluginReportThreatMenuOptionClickedSchema
  | IPluginSafeExternalEmailClickedSchema
  | IPluginSafeExternalSimulationClickedSchema
  | IPluginSafeHoxEmailClickedSchema
  | IPluginStartGameDialogClickedSchema
  | IPluginThreatFromHoxhuntClickedSchema
  | IPluginUserRequestedFeedbackFromSecurityTeamSchema
  | IResponseApplicationSearchDataClickedSchema
  | IResponseApplicationSearchDataQuerySubmittedSchema
  | IResponseApplicationSearchEmailClickedSchema
  | IResponseApplicationSearchEmailFilterListItemClickedSchema
  | IResponseApplicationSearchEmailFilterListToggleSchema
  | IResponseApplicationSearchEmailQuerySubmittedSchema
  | IResponseApplicationSearchIncidentClickedSchema
  | IResponseApplicationSearchIncidentFilterListItemClickedSchema
  | IResponseApplicationSearchIncidentFilterListToggleSchema
  | IResponseApplicationSearchIncidentQuerySubmittedSchema
  | IResponseFeedbackRuleActivatedSchema
  | IResponseFeedbackRuleCreatedSchema
  | IResponseFeedbackRuleDeactivatedSchema
  | IResponseFeedbackRuleDeletedSchema
  | IResponseFeedbackRuleUpdatedSchema
  | IResponseIncidentClassificationChangedSchema
  | IResponseIncidentClassifiedBySocSchema
  | IResponseIncidentClosedSchema
  | IResponseIncidentCreatedSchema
  | IResponseIncidentEscalatedSchema
  | IResponseIncidentNoteCreatedSchema
  | IResponseIncidentNoteDeletedSchema
  | IResponseIncidentNoteEditedSchema
  | IResponseIncidentReopenedSchema
  | IResponseMarketingContentShownSchema
  | IResponseMarketingPageDemoRequestedSchema
  | IResponseOrganizationThreatAnalysisPriorityAssignedSchema
  | IResponseThreatAddedToIncidentSchema
  | IResponseThreatAddedToSimilarityGroupSchema
  | IResponseThreatHuntingEmailDeletionFailedSchema
  | IResponseThreatHuntingEmailDeletionSuccessSchema
  | IResponseThreatHuntingEmailRevertFailedSchema
  | IResponseThreatHuntingEmailRevertSuccessSchema
  | IResponseThreatHuntingGetSearchResultsCompleteSchema
  | IResponseThreatHuntingGetSearchResultsFailedSchema
  | IResponseThreatHuntingSearchResultCreatedSchema
  | IResponseThreatHuntingSearchStartedSchema
  | IResponseThreatHuntingStartSearchFailedSchema
  | IResponseThreatResourceMarkedMaliciousSchema
  | IResponseThreatResourceMarkedNotMaliciousSchema
  | IResponseUserReceivedSocClassifiedThreatFeedbackSchema
  | ITrainingAwarenessMomentFinishedSchema
  | ITrainingAwarenessMomentLearningCardSeenSchema
  | ITrainingAwarenessMomentSkippedSchema
  | ITrainingAwarenessMomentStartedSchema
  | ITrainingChallengeCompletedSchema
  | ITrainingChallengeExitedSchema
  | ITrainingChallengeSchema
  | ITrainingChallengeStartedSchema
  | ITrainingEngineAutomaticReminderSentSchema
  | ITrainingEngineGameStartedByForceSchema
  | ITrainingEngineGameStartedSchema
  | ITrainingEngineInviteEmailSentSchema
  | ITrainingEngineMarkersViewedPlayerRewardedSchema
  | ITrainingEngineNoQuestSelectedSchema
  | ITrainingEnginePlayerRewardedQuizSchema
  | ITrainingEnginePlayerRewardedSchema
  | ITrainingEnginePromotionEmailSentSchema
  | ITrainingEngineQuestCreatedSchema
  | ITrainingEngineQuestErrorSchema
  | ITrainingEngineQuestFailFunnelStepReachedSchema
  | ITrainingEngineQuestFailedByAtpSchema
  | ITrainingEngineQuestFailedSchema
  | ITrainingEngineQuestFileDownloadedSchema
  | ITrainingEngineQuestMissedSchema
  | ITrainingEngineQuestRefailedSchema
  | ITrainingEngineQuestRemovedSchema
  | ITrainingEngineQuestRereportedSchema
  | ITrainingEngineQuestSafeFailedSchema
  | ITrainingEngineQuestSecondaryObjectivesSelectedSchema
  | ITrainingEngineQuestSelectedSchema
  | ITrainingEngineQuestStartedSchema
  | ITrainingEngineQuestSucceededSchema
  | ITrainingEngineThreatFeedbackSentSchema
  | ITrainingEngineVectorDeliveryConfirmedSchema
  | ITrainingEngineVectorDeliveryFailedSchema
  | ITrainingEngineWeeklyReportEmailSentSchema
  | ITrainingFirstTimeRanksSeenSchema
  | ITrainingGameOnboardingTutorialCompletedSchema
  | ITrainingGameQuizCompletedSchema
  | ITrainingGameQuizSentToUserSchema
  | ITrainingGameStartedSchema
  | ITrainingInstantFeedbackErrorCardShownSchema
  | ITrainingInstantFeedbackPageShownSchema
  | ITrainingInstantFeedbackThreatIocsShownSchema
  | ITrainingInstantFeedbackThreatRatingShownSchema
  | ITrainingInstantFeedbackThreatRiskCardShownSchema
  | ITrainingInstantFeedbackTimeoutErrorCardShownSchema
  | ITrainingInviteSentSchema
  | ITrainingJobFunctionAnsweredSchema
  | ITrainingLabsOnboardingMessageClosedSchema
  | ITrainingNpsAnswerCreatedSchema
  | ITrainingNpsGtwoButtonClickedSchema
  | ITrainingPluginExternalThreatIocModelRiskScoreCalculatedSchema
  | ITrainingQuestSecondaryObjectivesSelectedSchema
  | ITrainingQuestTemplateCreatedSchema
  | ITrainingQuestTemplateStatusChangedSchema
  | ITrainingQuestTemplateUpdatedSchema
  | ITrainingQuizModuleRemovedSchema
  | ITrainingQuizModuleUpsertedSchema
  | ITrainingQuizTemplateRemovedSchema
  | ITrainingQuizTemplateUpsertedSchema
  | ITrainingReportedThreatsModalSeenSchema
  | ITrainingResultPageReviewMarkersFinishedSchema
  | ITrainingResultPageReviewMarkersStartedSchema
  | ITrainingResultPageScoreAnimatedSchema
  | ITrainingResultReviewMarkersFinishedSchema
  | ITrainingResultReviewMarkersSchema
  | ITrainingSpicyModeModalSeenSchema
  | ITrainingStarsRewardedSchema
  | ITrainingTrainingEngineQuestFailFunnelStepReachedSchema
  | ITrainingUserFeedbackCreatedSchema
  | ITrainingUserFeedbackDeletedSchema
  | ITrainingUserFeedbackUpdatedSchema
  | ITrainingUserOnboardedSchema;

export interface IAdminAuthLoginAsOtherUser {
  product: 'admin';
  action: 'auth_login_as_other_user';
  organizationId: string;
  userId: string;
}

export interface IAdminCountryLeaderboardIntroductionShown {
  product: 'admin';
  action: 'country_leaderboard_introduction_shown';
  organizationId: string;
  userAgent?: string;
  userId: string;
}

export interface IAdminGmailApiDeliveryIntroductionShown {
  product: 'admin';
  action: 'gmail_api_delivery_introduction_shown';
  organizationId: string;
  userAgent?: string;
  userId: string;
}

export interface IAdminIndustryCreated {
  product: 'admin';
  action: 'industry_created';
  industryId?: string;
  name?: string;
  organizationId: string;
  userId: string;
}

export interface IAdminIndustryDeleted {
  product: 'admin';
  action: 'industry_deleted';
  industryId?: string;
  name?: string;
  organizationId: string;
  userId: string;
}

export interface IAdminIndustryInfoUpdated {
  product: 'admin';
  action: 'industry_info_updated';
  industryId?: string;
  name?: string;
  organizationId: string;
  userId: string;
}

export interface IAdminJobFunctionIntroductionShown {
  product: 'admin';
  action: 'job_function_introduction_shown';
  organizationId: string;
  userAgent?: string;
  userId: string;
}

export interface IAdminKnowledgeBaseRedirectAuthenticated {
  product: 'admin';
  action: 'knowledge_base_redirect_authenticated';
  linkId?: string;
  organizationId: string;
  returnTo?: string;
  userId: string;
}

export interface IAdminLboIntroductionShown {
  product: 'admin';
  action: 'lbo_introduction_shown';
  organizationId: string;
  userAgent?: string;
  userId: string;
}

export interface IAdminNewLeaderboardsIntroductionShown {
  product: 'admin';
  action: 'new_leaderboards_introduction_shown';
  organizationId: string;
  userAgent?: string;
  userId: string;
}

export interface IAdminOrgQuizModuleUpserted {
  product: 'admin';
  action: 'org_quiz_module_upserted';
  moduleId?: string;
  organizationId: string;
  state?: string;
  templateId?: string;
  userId: string;
}

export interface IAdminOrgQuizTemplateUpserted {
  product: 'admin';
  action: 'org_quiz_template_upserted';
  organizationId: string;
  state?: string;
  templateId?: string;
  userId: string;
}

export interface IAdminOrganizationDeleted {
  product: 'admin';
  action: 'organization_deleted';
  organizationId: string;
  userId: string;
}

export interface IAdminOrganizationFeaturesSnapshot {
  product: 'admin';
  action: 'organization_features_snapshot';
  featureFlags?: string;
  featuresEnabled?: string;
  organizationId: string;
  tagBlacklist?: string;
  userId: string;
}

export interface IAdminOrganizationOnboardingCompleted {
  product: 'admin';
  action: 'organization_onboarding_completed';
  organizationId: string;
  userId: string;
}

export interface IAdminOrganizationOnboardingStarted {
  product: 'admin';
  action: 'organization_onboarding_started';
  organizationId: string;
  userId: string;
}

export interface IAdminOrganizationOnboardingTaskCompleted {
  product: 'admin';
  action: 'organization_onboarding_task_completed';
  organizationId: string;
  organizationOnboardingTaskId?: string;
  userId: string;
}

export interface IAdminOrganizationOnboardingTaskCreated {
  product: 'admin';
  action: 'organization_onboarding_task_created';
  organizationId: string;
  organizationOnboardingTaskId?: string;
  userId: string;
}

export interface IAdminOrganizationTrainingRuleUpdated {
  product: 'admin';
  action: 'organization_training_rule_updated';
  deactivationReason?: string;
  enabled?: boolean;
  organizationId: string;
  ruleType?: string;
  target?: string;
  userId: string;
}

export interface IAdminOrganizatonFeatureFlagAdded {
  product: 'admin';
  action: 'organizaton_feature_flag_added';
  featureFlagName?: string;
  organizationId: string;
  userId: string;
}

export interface IAdminOrganizatonFeatureFlagRemoved {
  product: 'admin';
  action: 'organizaton_feature_flag_removed';
  featureFlagName?: string;
  organizationId: string;
  userId: string;
}

export interface IAdminSatIntroductionShown {
  product: 'admin';
  action: 'sat_introduction_shown';
  organizationId: string;
  userAgent?: string;
  userId: string;
}

export interface IAdminShieldIntroductionShown {
  product: 'admin';
  action: 'shield_introduction_shown';
  organizationId: string;
  userAgent?: string;
  userId: string;
}

export interface IAdminTrainingManagementIntroductionShown {
  product: 'admin';
  action: 'training_management_introduction_shown';
  organizationId: string;
  userAgent?: string;
  userId: string;
}

export interface IAdminUserCreated {
  product: 'admin';
  action: 'user_created';
  organizationId: string;
  userId: string;
}

export interface IAdminUserDeleted {
  product: 'admin';
  action: 'user_deleted';
  organizationId: string;
  userId: string;
}

export interface IAdminUserInfoUpdated {
  product: 'admin';
  action: 'user_info_updated';
  active?: boolean;
  city?: string;
  country?: string;
  department?: string;
  domain?: string;
  hasEnforcedAnonymity?: boolean;
  jobFunction?: string;
  mode?: string;
  organizationId: string;
  propertiesActive?: boolean;
  propertiesCity?: string;
  propertiesCountry?: string;
  propertiesDepartment?: string;
  propertiesHasEnforcedAnonymity?: boolean;
  propertiesJobFunction?: string;
  propertiesMode?: string;
  propertiesSite?: string;
  propertiesSpicyModeEnabled?: boolean;
  site?: string;
  spicyModeEnabled?: boolean;
  userId: string;
}

export interface IAdminUserManagementColumnCustomizationSeen {
  product: 'admin';
  action: 'user_management_column_customization_seen';
  organizationId: string;
  userAgent?: string;
  userId: string;
}

export interface IAdminUserManagementColumnLayoutChanged {
  product: 'admin';
  action: 'user_management_column_layout_changed';
  columns?: string;
  isCustomLayout?: boolean;
  layout?: string;
  organizationId: string;
  userAgent?: string;
  userId: string;
}

export interface IAdminUserRoleChanged {
  product: 'admin';
  action: 'user_role_changed';
  organizationId: string;
  userId: string;
  userRole?: string;
}

export interface IAdminUserSoftDeleteCancelled {
  product: 'admin';
  action: 'user_soft_delete_cancelled';
  organizationId: string;
  userId: string;
}

export interface IAdminUserSoftDeleted {
  product: 'admin';
  action: 'user_soft_deleted';
  organizationId: string;
  userId: string;
}

export interface ICustomerFeatureContactSalesClicked {
  product: 'customer';
  action: 'feature_contact_sales_clicked';
  anonymousId?: string;
  feature?: string;
  organizationId: string;
  userAgent?: string;
  userId: string;
}

export interface IInsightsBmReportLoaded {
  product: 'insights';
  action: 'bm_report_loaded';
  organizationId: string;
  reportApplyTimeframe?: boolean;
  reportEndDate?: string;
  reportLoadingTimeSeconds?: number;
  reportOrganizationId?: string;
  reportQuestTag?: string;
  reportStartDate?: string;
  reportViewName?: string;
  userId: string;
  userAgent?: string;
  userRole?: 'SUPER_ADMIN' | 'ADMIN';
}

export interface IInsightsCxoReportLoaded {
  product: 'insights';
  action: 'cxo_report_loaded';
  organizationId: string;
  userId: string;
  userRole?: string;
  userAgent?: string;
  reportEndDate?: string;
  reportTimeframe?: string;
  reportOrganizationId?: string;
  reportLoadingTimeSeconds?: number;
  trainingDataOnboardedOnly?: boolean;
}

export interface ILegacySegmentPages {
  product: 'legacy_segment';
  action: 'pages';
  anonymousId?: string;
  applicationName?: string;
  contextCampaignContent?: string;
  contextCampaignMedium?: string;
  contextCampaignName?: string;
  contextCampaignSource?: string;
  organizationId: string;
  pageTitle?: string;
  path?: string;
  questId?: string;
  questState?: string;
  questTag?: string;
  referrer?: string;
  search?: string;
  title?: string;
  url?: string;
  userAgent?: string;
  userId: string;
}

export interface ILegacySegmentSessionStarted {
  product: 'legacy_segment';
  action: 'session_started';
  anonymousId?: string;
  applicationName?: string;
  organizationId: string;
  startDate?: string;
  userAgent?: string;
  userId: string;
}

export interface ILegacySegmentSsoLoginFailed {
  product: 'legacy_segment';
  action: 'sso_login_failed';
  anonymousId?: string;
  message?: string;
  organizationId: string;
  userId: string;
}

export interface ILegacySegmentSsoLoginSucceeded {
  product: 'legacy_segment';
  action: 'sso_login_succeeded';
  organizationId: string;
  userId: string;
}

export interface ILegacySegmentSsoRedirectToStartPage {
  product: 'legacy_segment';
  action: 'sso_redirect_to_start_page';
  newUser?: boolean;
  organizationCreatedAt?: string;
  organizationCreatedBy?: string;
  organizationDefaultUiLanguage?: string;
  organizationId: string;
  organizationSsoAuthnContext?: string;
  organizationSsoIdentifierFormat?: string;
  organizationStatsPlayerCount?: number;
  organizationStatsPlayerLevelCurrentAvg?: number;
  organizationStatsPlayerLevelCurrentMax?: number;
  organizationStatsPlayerLevelCurrentMin?: number;
  organizationStatsPlayerLevelCurrentStdDevPop?: number;
  organizationStatsPlayerLevelCurrentStdDevSamp?: number;
  organizationStatsPlayerLevelCurrentSum?: number;
  organizationStatsPlayerLevelNextAvg?: number;
  organizationStatsPlayerLevelNextMax?: number;
  organizationStatsPlayerLevelNextMin?: number;
  organizationStatsPlayerLevelNextStdDevPop?: number;
  organizationStatsPlayerLevelNextStdDevSamp?: number;
  organizationStatsPlayerLevelNextSum?: number;
  organizationStatsPlayerLevelXpAvg?: number;
  organizationStatsPlayerLevelXpMax?: number;
  organizationStatsPlayerLevelXpMin?: number;
  organizationStatsPlayerLevelXpStdDevPop?: number;
  organizationStatsPlayerLevelXpStdDevSamp?: number;
  organizationStatsPlayerLevelXpSum?: number;
  organizationStatsPlayerStarsAvg?: number;
  organizationStatsPlayerStarsMax?: number;
  organizationStatsPlayerStarsMin?: number;
  organizationStatsPlayerStarsStdDevPop?: number;
  organizationStatsPlayerStarsStdDevSamp?: number;
  organizationStatsPlayerStarsSum?: number;
  organizationStatsPlayerStatsFailedAvg?: number;
  organizationStatsPlayerStatsFailedMax?: number;
  organizationStatsPlayerStatsFailedMin?: number;
  organizationStatsPlayerStatsFailedStdDevPop?: number;
  organizationStatsPlayerStatsFailedStdDevSamp?: number;
  organizationStatsPlayerStatsFailedSum?: number;
  organizationStatsPlayerStatsSuccessAvg?: number;
  organizationStatsPlayerStatsSuccessMax?: number;
  organizationStatsPlayerStatsSuccessMin?: number;
  organizationStatsPlayerStatsSuccessStdDevPop?: number;
  organizationStatsPlayerStatsSuccessStdDevSamp?: number;
  organizationStatsPlayerStatsSuccessSum?: number;
  organizationStatsPlayerStatsTotalAvg?: number;
  organizationStatsPlayerStatsTotalMax?: number;
  organizationStatsPlayerStatsTotalMin?: number;
  organizationStatsPlayerStatsTotalStdDevPop?: number;
  organizationStatsPlayerStatsTotalStdDevSamp?: number;
  organizationStatsPlayerStatsTotalSum?: number;
  organizationStatsZxcvbnGuessesAvg?: number;
  organizationStatsZxcvbnGuessesMax?: number;
  organizationStatsZxcvbnGuessesMin?: number;
  organizationStatsZxcvbnGuessesStdDevPop?: number;
  organizationStatsZxcvbnGuessesStdDevSamp?: number;
  organizationStatsZxcvbnGuessesSum?: number;
  organizationStatsZxcvbnScoreAvg?: number;
  organizationStatsZxcvbnScoreMax?: number;
  organizationStatsZxcvbnScoreMin?: number;
  organizationStatsZxcvbnScoreStdDevPop?: number;
  organizationStatsZxcvbnScoreStdDevSamp?: number;
  organizationStatsZxcvbnScoreSum?: number;
  organizationTags?: string;
  organizationUpdatedAt?: string;
  organizationUpdatedBy?: string;
  profileCity?: string;
  profileCountry?: string;
  profileSite?: string;
  userId: string;
}

export interface ILegacySegmentWaitForInvitationShown {
  product: 'legacy_segment';
  action: 'wait_for_invitation_shown';
  anonymousId?: string;
  organizationId: string;
  userId: string;
}

export interface IPluginAfterReportingJoinDialogAccepted {
  product: 'plugin';
  action: 'after_reporting_join_dialog_accepted';
  organizationId: string;
  userId: string;
}

export interface IPluginCallApiUrlCommandCreated {
  product: 'plugin';
  action: 'call_api_url_command_created';
  endPoint?: string;
  organizationId: string;
  userId: string;
}

export interface IPluginChromeExtensionClicked {
  product: 'plugin';
  action: 'chrome_extension_clicked';
  buttonPosition?: string;
  organizationId: string;
  userId: string;
}

export interface IPluginClicked {
  product: 'plugin';
  action: 'clicked';
  officeJsApiName?: string;
  organizationId: string;
  pluginApiVersion?: string;
  userId: string;
}

export interface IPluginCloseButtonClicked {
  product: 'plugin';
  action: 'close_button_clicked';
  organizationId: string;
  userId: string;
}

export interface IPluginDeleteEmailButtonClicked {
  product: 'plugin';
  action: 'delete_email_button_clicked';
  organizationId: string;
  userId: string;
}

export interface IPluginExternalThreatAnalyzed {
  product: 'plugin';
  action: 'external_threat_analyzed';
  organizationId: string;
  previousStepTimestamp?: string;
  ratedByUserId?: string;
  ratedByUserOrganizationId?: string;
  threatId?: string;
  threatReportedSeverity?: string;
  threatSeverity?: string;
  userId: string;
}

export interface IPluginExternalThreatAutomaticallyRated {
  product: 'plugin';
  action: 'external_threat_automatically_rated';
  automaticRatingRule?: string;
  organizationId: string;
  threatId?: string;
  threatReportedSeverity?: string;
  threatSeverity?: string;
  thretId?: string;
  userId: string;
}

export interface IPluginExternalThreatClicked {
  product: 'plugin';
  action: 'external_threat_clicked';
  organizationId: string;
  userId: string;
}

export interface IPluginExternalThreatDeleted {
  product: 'plugin';
  action: 'external_threat_deleted';
  actorId?: string;
  organizationId: string;
  threatId?: string;
  userId: string;
}

export interface IPluginExternalThreatDownloaded {
  product: 'plugin';
  action: 'external_threat_downloaded';
  organizationId: string;
  userId: string;
}

export interface IPluginExternalThreatFeedbackRequested {
  product: 'plugin';
  action: 'external_threat_feedback_requested';
  organizationId: string;
  threatId?: string;
  userId: string;
}

export interface IPluginExternalThreatIocFlagCreated {
  product: 'plugin';
  action: 'external_threat_ioc_flag_created';
  iocFlagName?: string;
  iocModelId?: string;
  organizationId: string;
  threatId?: string;
  userId: string;
}

export interface IPluginExternalThreatPreUploaded {
  product: 'plugin';
  action: 'external_threat_pre_uploaded';
  invokedFromFolder?: string;
  organizationId: string;
  threatId?: string;
  threatReceivedAt?: string;
  threatReportedSeverity?: string;
  userAgent?: string;
  userId: string;
}

export interface IPluginExternalThreatRatingInherited {
  product: 'plugin';
  action: 'external_threat_rating_inherited';
  organizationId: string;
  threatId?: string;
  threatReportedSeverity?: string;
  threatSeverity?: string;
  userId: string;
}

export interface IPluginExternalThreatReportModifiersDownloadedFile {
  product: 'plugin';
  action: 'external_threat_report_modifiers_downloaded_file';
  organizationId: string;
  userId: string;
}

export interface IPluginExternalThreatReportModifiersEnteredCredentials {
  product: 'plugin';
  action: 'external_threat_report_modifiers_entered_credentials';
  organizationId: string;
  userId: string;
}

export interface IPluginExternalThreatReportModifiersForwardedEmail {
  product: 'plugin';
  action: 'external_threat_report_modifiers_forwarded_email';
  organizationId: string;
  userAgent?: string;
  userId: string;
}

export interface IPluginExternalThreatReportModifiersOpenedAttachment {
  product: 'plugin';
  action: 'external_threat_report_modifiers_opened_attachment';
  organizationId: string;
  userId: string;
}

export interface IPluginExternalThreatReportModifiersRepliedToEmail {
  product: 'plugin';
  action: 'external_threat_report_modifiers_replied_to_email';
  organizationId: string;
  userId: string;
}

export interface IPluginExternalThreatReportModifiersVisitedLink {
  product: 'plugin';
  action: 'external_threat_report_modifiers_visited_link';
  organizationId: string;
  userId: string;
}

export interface IPluginExternalThreatReportOptionsNoButtonClicked {
  product: 'plugin';
  action: 'external_threat_report_options_no_button_clicked';
  organizationId: string;
  userId: string;
}

export interface IPluginExternalThreatReportOptionsShown {
  product: 'plugin';
  action: 'external_threat_report_options_shown';
  organizationId: string;
  userId: string;
}

export interface IPluginExternalThreatReportOptionsYesButtonClicked {
  product: 'plugin';
  action: 'external_threat_report_options_yes_button_clicked';
  organizationId: string;
  userId: string;
}

export interface IPluginExternalThreatUploaded {
  product: 'plugin';
  action: 'external_threat_uploaded';
  invokedFromFolder?: string;
  organizationId: string;
  threatId?: string;
  threatReceivedAt?: string;
  threatReportedSeverity?: string;
  userAgent?: string;
  userId: string;
}

export interface IPluginFeedbackRulePassed {
  product: 'plugin';
  action: 'feedback_rule_passed';
  feedbackRuleId?: string;
  feedbackRuleUserMessage?: string;
  organizationId: string;
  userId: string;
}

export interface IPluginLegacyPluginStarted {
  product: 'plugin';
  action: 'legacy_plugin_started';
  anonymousId?: string;
  organizationId: string;
  userId: string;
}

export interface IPluginMoveToTrashMenuOptionClicked {
  product: 'plugin';
  action: 'move_to_trash_menu_option_clicked';
  organizationId: string;
  userId: string;
}

export interface IPluginReportAsNotSpamMenuOptionClicked {
  product: 'plugin';
  action: 'report_as_not_spam_menu_option_clicked';
  organizationId: string;
  userId: string;
}

export interface IPluginReportThreatMenuOptionClicked {
  product: 'plugin';
  action: 'report_threat_menu_option_clicked';
  organizationId: string;
  userId: string;
}

export interface IPluginSafeExternalEmailClicked {
  product: 'plugin';
  action: 'safe_external_email_clicked';
  organizationId: string;
  userAgent?: string;
  userId: string;
}

export interface IPluginSafeExternalSimulationClicked {
  product: 'plugin';
  action: 'safe_external_simulation_clicked';
  organizationId: string;
  userAgent?: string;
  userId: string;
}

export interface IPluginSafeHoxEmailClicked {
  product: 'plugin';
  action: 'safe_hox_email_clicked';
  organizationId: string;
  userId: string;
}

export interface IPluginStartGameDialogClicked {
  product: 'plugin';
  action: 'start_game_dialog_clicked';
  organizationId: string;
  userId: string;
}

export interface IPluginThreatFromHoxhuntClicked {
  product: 'plugin';
  action: 'threat_from_hoxhunt_clicked';
  organizationId: string;
  userId: string;
}

export interface IPluginUserRequestedFeedbackFromSecurityTeam {
  product: 'plugin';
  action: 'user_requested_feedback_from_security_team';
  organizationId: string;
  userAgent?: string;
  userId: string;
}

export interface IResponseApplicationSearchDataClicked {
  product: 'response';
  action: 'application_search_data_clicked';
  anonymousId?: string;
  organizationId: string;
  userAgent?: string;
  userId: string;
}

export interface IResponseApplicationSearchDataQuerySubmitted {
  product: 'response';
  action: 'application_search_data_query_submitted';
  anonymousId?: string;
  organizationId: string;
  query?: string;
  userAgent?: string;
  userId: string;
}

export interface IResponseApplicationSearchEmailClicked {
  product: 'response';
  action: 'application_search_email_clicked';
  anonymousId?: string;
  organizationId: string;
  userAgent?: string;
  userId: string;
}

export interface IResponseApplicationSearchEmailFilterListItemClicked {
  product: 'response';
  action: 'application_search_email_filter_list_item_clicked';
  anonymousId?: string;
  organizationId: string;
  toState?: string;
  tokenKey?: string;
  tokenValue?: string;
  userAgent?: string;
  userId: string;
}

export interface IResponseApplicationSearchEmailFilterListToggle {
  product: 'response';
  action: 'application_search_email_filter_list_toggle';
  anonymousId?: string;
  organizationId: string;
  userAgent?: string;
  userId: string;
}

export interface IResponseApplicationSearchEmailQuerySubmitted {
  product: 'response';
  action: 'application_search_email_query_submitted';
  anonymousId?: string;
  organizationId: string;
  sort?: string;
  userAgent?: string;
  userId: string;
}

export interface IResponseApplicationSearchIncidentClicked {
  product: 'response';
  action: 'application_search_incident_clicked';
  anonymousId?: string;
  organizationId: string;
  userAgent?: string;
  userId: string;
}

export interface IResponseApplicationSearchIncidentFilterListItemClicked {
  product: 'response';
  action: 'application_search_incident_filter_list_item_clicked';
  anonymousId?: string;
  organizationId: string;
  toState?: string;
  tokenKey?: string;
  tokenValue?: string;
  userAgent?: string;
  userId: string;
}

export interface IResponseApplicationSearchIncidentFilterListToggle {
  product: 'response';
  action: 'application_search_incident_filter_list_toggle';
  anonymousId?: string;
  organizationId: string;
  user?: string;
  userAgent?: string;
  userId: string;
}

export interface IResponseApplicationSearchIncidentQuerySubmitted {
  product: 'response';
  action: 'application_search_incident_query_submitted';
  anonymousId?: string;
  organizationId: string;
  sort?: string;
  userAgent?: string;
  userId: string;
}

export interface IResponseFeedbackRuleActivated {
  product: 'response';
  action: 'feedback_rule_activated';
  feedbackRuleId?: string;
  organizationId: string;
  userId: string;
}

export interface IResponseFeedbackRuleCreated {
  product: 'response';
  action: 'feedback_rule_created';
  feedbackRuleCondition?: string;
  feedbackRuleId?: string;
  organizationId: string;
  userId: string;
}

export interface IResponseFeedbackRuleDeactivated {
  product: 'response';
  action: 'feedback_rule_deactivated';
  feedbackRuleId?: string;
  organizationId: string;
  userId: string;
}

export interface IResponseFeedbackRuleDeleted {
  product: 'response';
  action: 'feedback_rule_deleted';
  feedbackRuleCondition?: string;
  feedbackRuleId?: string;
  organizationId: string;
  userId: string;
}

export interface IResponseFeedbackRuleUpdated {
  product: 'response';
  action: 'feedback_rule_updated';
  feedbackRuleCondition?: string;
  feedbackRuleId?: string;
  organizationId: string;
  userId: string;
}

export interface IResponseIncidentClassificationChanged {
  product: 'response';
  action: 'incident_classification_changed';
  classification?: string;
  incidentId?: string;
  maliciousnessProbability?: number;
  organizationId: string;
  userId: string;
}

export interface IResponseIncidentClassifiedBySoc {
  product: 'response';
  action: 'incident_classified_by_soc';
  incidentId?: string;
  organizationId: string;
  socClassification?: string;
  userId: string;
}

export interface IResponseIncidentClosed {
  product: 'response';
  action: 'incident_closed';
  incidentId?: string;
  organizationId: string;
  userId: string;
}

export interface IResponseIncidentCreated {
  product: 'response';
  action: 'incident_created';
  incidentId?: string;
  organizationId: string;
  policyName?: string;
  propertiesIncidentId?: string;
  propertiesPolicyName?: string;
  userId: string;
}

export interface IResponseIncidentEscalated {
  product: 'response';
  action: 'incident_escalated';
  escalationRulesEmailTemplateBody?: string;
  escalationRulesEmailTemplateSubject?: string;
  escalationRulesEnabled?: boolean;
  escalationRulesPolicyName?: string;
  escalationRulesPolicySettingsCreationThreshold?: number;
  escalationRulesRequireMaliciousHoxhuntRating?: boolean;
  escalationRulesUseCustomEmailTemplate?: boolean;
  incidentId?: string;
  organizationId: string;
  userId: string;
}

export interface IResponseIncidentNoteCreated {
  product: 'response';
  action: 'incident_note_created';
  incidentId?: string;
  noteId?: string;
  organizationId: string;
  userId: string;
}

export interface IResponseIncidentNoteDeleted {
  product: 'response';
  action: 'incident_note_deleted';
  incidentId?: string;
  noteId?: string;
  organizationId: string;
  userId: string;
}

export interface IResponseIncidentNoteEdited {
  product: 'response';
  action: 'incident_note_edited';
  incidentId?: string;
  noteId?: string;
  organizationId: string;
  userId: string;
}

export interface IResponseIncidentReopened {
  product: 'response';
  action: 'incident_reopened';
  incidentId?: string;
  organizationId: string;
  userId: string;
}

export interface IResponseMarketingContentShown {
  product: 'response';
  action: 'marketing_content_shown';
  marketingFeatureShown?: string;
  organizationId: string;
  userAgent?: string;
  userId: string;
}

export interface IResponseMarketingPageDemoRequested {
  product: 'response';
  action: 'marketing_page_demo_requested';
  marketingPageName?: string;
  organizationId: string;
  userAgent?: string;
  userId: string;
}

export interface IResponseOrganizationThreatAnalysisPriorityAssigned {
  product: 'response';
  action: 'organization_threat_analysis_priority_assigned';
  organizationId: string;
  threatAnalysisPriority?: string;
  userId: string;
}

export interface IResponseThreatAddedToIncident {
  product: 'response';
  action: 'threat_added_to_incident';
  incidentId?: string;
  organizationId: string;
  threatId?: string;
  userId: string;
}

export interface IResponseThreatAddedToSimilarityGroup {
  product: 'response';
  action: 'threat_added_to_similarity_group';
  groupId?: string;
  organizationId: string;
  similarityScore?: number;
  threatId?: string;
  userId: string;
}

export interface IResponseThreatHuntingEmailDeletionFailed {
  product: 'response';
  action: 'threat_hunting_email_deletion_failed';
  huntingSearchJobResultId?: string;
  organizationId: string;
  userId: string;
}

export interface IResponseThreatHuntingEmailDeletionSuccess {
  product: 'response';
  action: 'threat_hunting_email_deletion_success';
  deletedFromFolder?: string;
  huntingSearchJobResultId?: string;
  organizationId: string;
  userId: string;
}

export interface IResponseThreatHuntingEmailRevertFailed {
  product: 'response';
  action: 'threat_hunting_email_revert_failed';
  huntingSearchJobResultId?: string;
  organizationId: string;
  userId: string;
}

export interface IResponseThreatHuntingEmailRevertSuccess {
  product: 'response';
  action: 'threat_hunting_email_revert_success';
  huntingSearchJobResultId?: string;
  organizationId: string;
  userId: string;
}

export interface IResponseThreatHuntingGetSearchResultsComplete {
  product: 'response';
  action: 'threat_hunting_get_search_results_complete';
  huntingSearchExecutionTimeSeconds?: number;
  huntingSearchJobId?: string;
  incidentId?: string;
  organizationId: string;
  userId: string;
}

export interface IResponseThreatHuntingGetSearchResultsFailed {
  product: 'response';
  action: 'threat_hunting_get_search_results_failed';
  huntingSearchJobId?: string;
  incidentId?: string;
  organizationId: string;
  userId: string;
}

export interface IResponseThreatHuntingSearchResultCreated {
  product: 'response';
  action: 'threat_hunting_search_result_created';
  huntingSearchJobId?: string;
  huntingSearchJobResultId?: string;
  organizationId: string;
  userId: string;
}

export interface IResponseThreatHuntingSearchStarted {
  product: 'response';
  action: 'threat_hunting_search_started';
  huntingSearchJobId?: string;
  incidentId?: string;
  organizationId: string;
  userId: string;
}

export interface IResponseThreatHuntingStartSearchFailed {
  product: 'response';
  action: 'threat_hunting_start_search_failed';
  huntingSearchJobId?: string;
  incidentId?: string;
  organizationId: string;
  userId: string;
}

export interface IResponseThreatResourceMarkedMalicious {
  product: 'response';
  action: 'threat_resource_marked_malicious';
  organizationId: string;
  threatId?: string;
  threatResourceHash?: string;
  threatResourceType?: string;
  userId: string;
}

export interface IResponseThreatResourceMarkedNotMalicious {
  product: 'response';
  action: 'threat_resource_marked_not_malicious';
  organizationId: string;
  threatId?: string;
  threatResourceHash?: string;
  threatResourceType?: string;
  userId: string;
}

export interface IResponseUserReceivedSocClassifiedThreatFeedback {
  product: 'response';
  action: 'user_received_soc_classified_threat_feedback';
  classification?: string;
  organizationId: string;
  threatId?: string;
  userId: string;
}

export interface ITrainingAwarenessMomentFinished {
  product: 'training';
  action: 'awareness_moment_finished';
  organizationId: string;
  quizTag?: string;
  secondsToAnswer?: number;
  secondsToProceedAfterResult?: number;
  starsAwarded?: number;
  userAgent?: string;
  userId: string;
}

export interface ITrainingAwarenessMomentLearningCardSeen {
  product: 'training';
  action: 'awareness_moment_learning_card_seen';
  organizationId: string;
  quizTag?: string;
  userAgent?: string;
  userId: string;
}

export interface ITrainingAwarenessMomentSkipped {
  product: 'training';
  action: 'awareness_moment_skipped';
  organizationId: string;
  quizTag?: string;
  userAgent?: string;
  userId: string;
}

export interface ITrainingAwarenessMomentStarted {
  product: 'training';
  action: 'awareness_moment_started';
  organizationId: string;
  quizTag?: string;
  userAgent?: string;
  userId: string;
}

export interface ITrainingChallenge {
  product: 'training';
  action: 'challenge';
  anonymousId?: string;
  challengeName?: string;
  organizationId: string;
  score?: number;
  userId: string;
}

export interface ITrainingChallengeCompleted {
  product: 'training';
  action: 'challenge_completed';
  anonymousId?: string;
  challengeName?: string;
  organizationId: string;
  score?: number;
  userAgent?: string;
  userId: string;
}

export interface ITrainingChallengeExited {
  product: 'training';
  action: 'challenge_exited';
  anonymousId?: string;
  challengeName?: string;
  organizationId: string;
  userAgent?: string;
  userId: string;
}

export interface ITrainingChallengeStarted {
  product: 'training';
  action: 'challenge_started';
  anonymousId?: string;
  challengeName?: string;
  organizationId: string;
  userAgent?: string;
  userId: string;
}

export interface ITrainingEngineAutomaticReminderSent {
  product: 'training';
  action: 'engine_automatic_reminder_sent';
  automaticReminderEmailsSent?: number;
  organizationId: string;
  statsMissed?: number;
  userId: string;
}

export interface ITrainingEngineGameStarted {
  product: 'training';
  action: 'engine_game_started';
  anonymousId?: string;
  organizationId: string;
  userId: string;
}

export interface ITrainingEngineGameStartedByForce {
  product: 'training';
  action: 'engine_game_started_by_force';
  organizationId: string;
  userId: string;
}

export interface ITrainingEngineInviteEmailSent {
  product: 'training';
  action: 'engine_invite_email_sent';
  organizationId: string;
  statsMissed?: number;
  userId: string;
}

export interface ITrainingEngineMarkersViewedPlayerRewarded {
  product: 'training';
  action: 'engine_markers_viewed_player_rewarded';
  organizationId: string;
  questDifficulty?: number;
  questId?: string;
  questLanguage?: string;
  questOrigin?: string;
  questTag?: string;
  questTags?: string;
  questType?: string;
  tag?: string;
  userId: string;
}

export interface ITrainingEngineNoQuestSelected {
  product: 'training';
  action: 'engine_no_quest_selected';
  organizationId: string;
  userId: string;
}

export interface ITrainingEnginePlayerRewarded {
  product: 'training';
  action: 'engine_player_rewarded';
  organizationId: string;
  questDifficulty?: number;
  questId?: string;
  questLanguage?: string;
  questOrigin?: string;
  questTag?: string;
  questTags?: string;
  questType?: string;
  stars?: number;
  statsFailed?: number;
  statsMissed?: number;
  statsSuccess?: number;
  statsTotal?: number;
  userId: string;
  xp?: number;
}

export interface ITrainingEnginePlayerRewardedQuiz {
  product: 'training';
  action: 'engine_player_rewarded_quiz';
  organizationId: string;
  questDifficulty?: number;
  questId?: string;
  questLanguage?: string;
  questOrigin?: string;
  questTag?: string;
  questTags?: string;
  questType?: string;
  stars?: number;
  statsFailed?: number;
  statsMissed?: number;
  statsSuccess?: number;
  statsTotal?: number;
  userId: string;
  xp?: number;
}

export interface ITrainingEnginePromotionEmailSent {
  product: 'training';
  action: 'engine_promotion_email_sent';
  organizationId: string;
  userId: string;
}

export interface ITrainingEngineQuestCreated {
  product: 'training';
  action: 'engine_quest_created';
  organizationId: string;
  questDifficulty?: number;
  questId?: string;
  questLanguage?: string;
  questOrigin?: string;
  questTag?: string;
  questTags?: string;
  questType?: string;
  startsAt?: string;
  userId: string;
  userTz?: string;
}

export interface ITrainingEngineQuestError {
  product: 'training';
  action: 'engine_quest_error';
  errorSource?: string;
  heuristicsVeto?: string;
  languageCode?: string;
  organizationId: string;
  questDifficulty?: number;
  questId?: string;
  questLanguage?: string;
  questOrigin?: string;
  questTag?: string;
  questTags?: string;
  questType?: string;
  userId: string;
}

export interface ITrainingEngineQuestFailFunnelStepReached {
  product: 'training';
  action: 'engine_quest_fail_funnel_step_reached';
  fileName?: string;
  organizationId: string;
  questDifficulty?: number;
  questFailFunnelStepId?: string;
  questId?: string;
  questLanguage?: string;
  questOrigin?: string;
  questTag?: string;
  questTags?: string;
  questType?: string;
  questUserAction?: string;
  userId: string;
}

export interface ITrainingEngineQuestFailed {
  product: 'training';
  action: 'engine_quest_failed';
  isSafeFail?: boolean;
  organizationId: string;
  questDifficulty?: number;
  questFailureCondition?: string;
  questId?: string;
  questLanguage?: string;
  questOrigin?: string;
  questTag?: string;
  questTags?: string;
  questType?: string;
  questUserAction?: string;
  timedOut?: boolean;
  userAgent?: string;
  userId: string;
}

export interface ITrainingEngineQuestFailedByAtp {
  product: 'training';
  action: 'engine_quest_failed_by_atp';
  organizationId: string;
  questId?: string;
  userId: string;
}

export interface ITrainingEngineQuestFileDownloaded {
  product: 'training';
  action: 'engine_quest_file_downloaded';
  fileName?: string;
  organizationId: string;
  questTag?: string;
  questType?: string;
  userId: string;
}

export interface ITrainingEngineQuestMissed {
  product: 'training';
  action: 'engine_quest_missed';
  isFirstMiss?: boolean;
  organizationId: string;
  questDifficulty?: number;
  questId?: string;
  questLanguage?: string;
  questOrigin?: string;
  questTag?: string;
  questTags?: string;
  questType?: string;
  userId: string;
}

export interface ITrainingEngineQuestRefailed {
  product: 'training';
  action: 'engine_quest_refailed';
  organizationId: string;
  questDifficulty?: number;
  questId?: string;
  questLanguage?: string;
  questOrigin?: string;
  questTag?: string;
  questTags?: string;
  questType?: string;
  questUserAction?: string;
  userId: string;
}

export interface ITrainingEngineQuestRemoved {
  product: 'training';
  action: 'engine_quest_removed';
  actionSource?: string;
  organizationId: string;
  questDifficulty?: number;
  questId?: string;
  questLanguage?: string;
  questOrigin?: string;
  questTag?: string;
  questTags?: string;
  questType?: string;
  userId: string;
}

export interface ITrainingEngineQuestRereported {
  product: 'training';
  action: 'engine_quest_rereported';
  organizationId: string;
  questDifficulty?: number;
  questId?: string;
  questLanguage?: string;
  questOrigin?: string;
  questTag?: string;
  questTags?: string;
  questType?: string;
  userId: string;
}

export interface ITrainingEngineQuestSafeFailed {
  product: 'training';
  action: 'engine_quest_safe_failed';
  organizationId: string;
  questDifficulty?: number;
  questId?: string;
  questLanguage?: string;
  questOrigin?: string;
  questTag?: string;
  questTags?: string;
  questType?: string;
  userId: string;
}

export interface ITrainingEngineQuestSecondaryObjectivesSelected {
  product: 'training';
  action: 'engine_quest_secondary_objectives_selected';
  organizationId: string;
  questDifficulty?: number;
  questId?: string;
  questLanguage?: string;
  questOrigin?: string;
  questSecondaryObjectives?: string;
  questTag?: string;
  questTags?: string;
  questType?: string;
  userId: string;
}

export interface ITrainingEngineQuestSelected {
  product: 'training';
  action: 'engine_quest_selected';
  organizationId: string;
  questCooldown?: string;
  questCooldownName?: string;
  questTag?: string;
  selectionMeta?: string;
  selectionStrategy?: string;
  userId: string;
}

export interface ITrainingEngineQuestStarted {
  product: 'training';
  action: 'engine_quest_started';
  coworkerIds?: string;
  languageCode?: string;
  organizationId: string;
  questDifficulty?: number;
  questId?: string;
  questLanguage?: string;
  questOrigin?: string;
  questTag?: string;
  questTags?: string;
  questType?: string;
  startsAt?: string;
  userId: string;
  userTz?: string;
  vectorId?: string;
}

export interface ITrainingEngineQuestSucceeded {
  product: 'training';
  action: 'engine_quest_succeeded';
  organizationId: string;
  questDifficulty?: number;
  questId?: string;
  questLanguage?: string;
  questOrigin?: string;
  questTag?: string;
  questTags?: string;
  questType?: string;
  reportingSpeed?: number;
  userAgent?: string;
  userId: string;
}

export interface ITrainingEngineThreatFeedbackSent {
  product: 'training';
  action: 'engine_threat_feedback_sent';
  organizationId: string;
  threatCount?: number;
  threatId?: string;
  threatIds?: string;
  userId: string;
}

export interface ITrainingEngineVectorDeliveryConfirmed {
  product: 'training';
  action: 'engine_vector_delivery_confirmed';
  organizationId: string;
  questId?: string;
  sourceProperty?: string;
  userId: string;
  vectorId?: string;
  vectorState?: string;
}

export interface ITrainingEngineVectorDeliveryFailed {
  product: 'training';
  action: 'engine_vector_delivery_failed';
  organizationId: string;
  questId?: string;
  sourceProperty?: string;
  userId: string;
  vectorId?: string;
  vectorState?: string;
}

export interface ITrainingEngineWeeklyReportEmailSent {
  product: 'training';
  action: 'engine_weekly_report_email_sent';
  organizationId: string;
  userId: string;
}

export interface ITrainingFirstTimeRanksSeen {
  product: 'training';
  action: 'first_time_ranks_seen';
  organizationId: string;
  userAgent?: string;
  userId: string;
}

export interface ITrainingGameOnboardingTutorialCompleted {
  product: 'training';
  action: 'game_onboarding_tutorial_completed';
  organizationId: string;
  userId: string;
}

export interface ITrainingGameQuizCompleted {
  product: 'training';
  action: 'game_quiz_completed';
  correctAnswerCount?: number;
  correctAnswerPercentage?: number;
  organizationId: string;
  questDifficulty?: number;
  questId?: string;
  questLanguage?: string;
  questOrigin?: string;
  questTag?: string;
  questTags?: string;
  questType?: string;
  quizType?: string;
  totalCorrectAnswerCount?: number;
  userId: string;
}

export interface ITrainingGameQuizSentToUser {
  product: 'training';
  action: 'game_quiz_sent_to_user';
  organizationId: string;
  questDifficulty?: number;
  questId?: string;
  questLanguage?: string;
  questOrigin?: string;
  questTag?: string;
  questTags?: string;
  questType?: string;
  userId: string;
}

export interface ITrainingGameStarted {
  product: 'training';
  action: 'game_started';
  organizationId: string;
  userId: string;
}

export interface ITrainingInstantFeedbackErrorCardShown {
  product: 'training';
  action: 'instant_feedback_error_card_shown';
  organizationId: string;
  threatId?: string;
  userAgent?: string;
  userId: string;
}

export interface ITrainingInstantFeedbackPageShown {
  product: 'training';
  action: 'instant_feedback_page_shown';
  organizationId: string;
  threatId?: string;
  userAgent?: string;
  userId: string;
}

export interface ITrainingInstantFeedbackThreatIocsShown {
  product: 'training';
  action: 'instant_feedback_threat_iocs_shown';
  iocFeatureName?: string;
  organizationId: string;
  threatId?: string;
  userAgent?: string;
  userId: string;
}

export interface ITrainingInstantFeedbackThreatRatingShown {
  product: 'training';
  action: 'instant_feedback_threat_rating_shown';
  organizationId: string;
  threatId?: string;
  userAgent?: string;
  userId: string;
}

export interface ITrainingInstantFeedbackThreatRiskCardShown {
  product: 'training';
  action: 'instant_feedback_threat_risk_card_shown';
  iocMaliciousnessSkullNumber?: number;
  organizationId: string;
  threatId?: string;
  userAgent?: string;
  userId: string;
}

export interface ITrainingInstantFeedbackTimeoutErrorCardShown {
  product: 'training';
  action: 'instant_feedback_timeout_error_card_shown';
  organizationId: string;
  threatId?: string;
  userAgent?: string;
  userId: string;
}

export interface ITrainingInviteSent {
  product: 'training';
  action: 'invite_sent';
  organizationId: string;
  userId: string;
}

export interface ITrainingJobFunctionAnswered {
  product: 'training';
  action: 'job_function_answered';
  jobFunction?: string;
  organizationId: string;
  userAgent?: string;
  userId: string;
}

export interface ITrainingLabsOnboardingMessageClosed {
  product: 'training';
  action: 'labs_onboarding_message_closed';
  anonymousId?: string;
  organizationId: string;
  userAgent?: string;
  userId: string;
}

export interface ITrainingNpsAnswerCreated {
  product: 'training';
  action: 'nps_answer_created';
  npsTextFeedback?: string;
  npsValue?: number;
  organizationId: string;
  timestamp?: string;
  userId: string;
  userRole?: string;
}

export interface ITrainingNpsGtwoButtonClicked {
  product: 'training';
  action: 'nps_gtwo_button_clicked';
  experiment?: string;
  organizationId: string;
  userAgent?: string;
  userId: string;
}

export interface ITrainingPluginExternalThreatIocModelRiskScoreCalculated {
  product: 'training';
  action: 'plugin_external_threat_ioc_model_risk_score_calculated';
  iocModelId?: string;
  maliciousnessProbability?: number;
  organizationId: string;
  threatId?: string;
  userId: string;
}

export interface ITrainingQuestSecondaryObjectivesSelected {
  product: 'training';
  action: 'quest_secondary_objectives_selected';
  organizationId: string;
  questDifficulty?: number;
  questId?: string;
  questLanguage?: string;
  questOrigin?: string;
  questSecondaryObjectives?: string;
  questTag?: string;
  questTags?: string;
  questType?: string;
  userId: string;
}

export interface ITrainingQuestTemplateCreated {
  product: 'training';
  action: 'quest_template_created';
  isActive?: boolean;
  language?: string;
  lineCount?: number;
  mainTheme?: string;
  organizationId: string;
  questTag?: string;
  questTemplateId?: string;
  userId: string;
}

export interface ITrainingQuestTemplateStatusChanged {
  product: 'training';
  action: 'quest_template_status_changed';
  isActive?: boolean;
  organizationId: string;
  questTag?: string;
  questTemplateId?: string;
  userId: string;
}

export interface ITrainingQuestTemplateUpdated {
  product: 'training';
  action: 'quest_template_updated';
  isActive?: boolean;
  language?: string;
  lineCount?: number;
  mainTheme?: string;
  organizationId: string;
  questTag?: string;
  questTemplateId?: string;
  userId: string;
}

export interface ITrainingQuizModuleRemoved {
  product: 'training';
  action: 'quiz_module_removed';
  moduleId?: string;
  organizationId: string;
  userId: string;
}

export interface ITrainingQuizModuleUpserted {
  product: 'training';
  action: 'quiz_module_upserted';
  moduleId?: string;
  name?: string;
  organizationId: string;
  state?: string;
  tag?: string;
  templateIds?: string;
  userId: string;
}

export interface ITrainingQuizTemplateRemoved {
  product: 'training';
  action: 'quiz_template_removed';
  organizationId: string;
  templateId?: string;
  userId: string;
}

export interface ITrainingQuizTemplateUpserted {
  product: 'training';
  action: 'quiz_template_upserted';
  name?: string;
  organizationId: string;
  state?: string;
  tag?: string;
  templateId?: string;
  userId: string;
}

export interface ITrainingReportedThreatsModalSeen {
  product: 'training';
  action: 'reported_threats_modal_seen';
  organizationId: string;
  userAgent?: string;
  userId: string;
}

export interface ITrainingResultPageReviewMarkersFinished {
  product: 'training';
  action: 'result_page_review_markers_finished';
  anonymousId?: string;
  giveStar?: boolean;
  markerViewingId?: string;
  numVectorIndicators?: number;
  organizationId: string;
  questId?: string;
  questTag?: string;
  resultFlowView?: boolean;
  stepCount?: number;
  totalTimeInSeconds?: number;
  userAgent?: string;
  userId: string;
}

export interface ITrainingResultPageReviewMarkersStarted {
  product: 'training';
  action: 'result_page_review_markers_started';
  anonymousId?: string;
  giveStar?: boolean;
  markerViewingId?: string;
  numVectorIndicators?: number;
  organizationId: string;
  questId?: string;
  questTag?: string;
  resultFlowView?: boolean;
  stepCount?: number;
  userAgent?: string;
  userId: string;
}

export interface ITrainingResultPageScoreAnimated {
  product: 'training';
  action: 'result_page_score_animated';
  anonymousId?: string;
  organizationId: string;
  questId?: string;
  questTag?: string;
  userAgent?: string;
  userId: string;
}

export interface ITrainingResultReviewMarkers {
  product: 'training';
  action: 'result_review_markers';
  anonymousId?: string;
  giveStar?: boolean;
  organizationId: string;
  questTag?: string;
  userAgent?: string;
  userId: string;
}

export interface ITrainingResultReviewMarkersFinished {
  product: 'training';
  action: 'result_review_markers_finished';
  anonymousId?: string;
  completionPercentage?: number;
  giveStar?: boolean;
  organizationId: string;
  questTag?: string;
  reason?: string;
  secondsPerStep?: number;
  totalSteps?: number;
  totalTimeInSeconds?: number;
  userAgent?: string;
  userId: string;
}

export interface ITrainingSpicyModeModalSeen {
  product: 'training';
  action: 'spicy_mode_modal_seen';
  organizationId: string;
  userAgent?: string;
  userId: string;
}

export interface ITrainingStarsRewarded {
  product: 'training';
  action: 'stars_rewarded';
  maxStarCount?: number;
  organizationId: string;
  questId?: string;
  sourceEventForReward?: string;
  starCount?: number;
  starRewardType?: string;
  starsRewardedTime?: string;
  userId: string;
}

export interface ITrainingTrainingEngineQuestFailFunnelStepReached {
  product: 'training';
  action: 'training_engine_quest_fail_funnel_step_reached';
  fileName?: string;
  organizationId: string;
  questFailFunnelStepId?: string;
  questId?: string;
  questType?: string;
  questUserAction?: string;
  userId: string;
}

export interface ITrainingUserFeedbackCreated {
  product: 'training';
  action: 'user_feedback_created';
  organizationId: string;
  threatId?: string;
  userFeedbackFeature?: string;
  userFeedbackScore?: string;
  userFeedbackTags?: string;
  userId: string;
}

export interface ITrainingUserFeedbackDeleted {
  product: 'training';
  action: 'user_feedback_deleted';
  organizationId: string;
  threatId?: string;
  userFeedbackFeature?: string;
  userId: string;
}

export interface ITrainingUserFeedbackUpdated {
  product: 'training';
  action: 'user_feedback_updated';
  organizationId: string;
  threatId?: string;
  userFeedbackFeature?: string;
  userFeedbackScore?: string;
  userFeedbackTags?: string;
  userId: string;
}

export interface ITrainingUserOnboarded {
  product: 'training';
  action: 'user_onboarded';
  organizationId: string;
  userId: string;
}

export type TAnalyticsEvent =
  | IAdminAuthLoginAsOtherUser
  | IAdminCountryLeaderboardIntroductionShown
  | IAdminGmailApiDeliveryIntroductionShown
  | IAdminIndustryCreated
  | IAdminIndustryDeleted
  | IAdminIndustryInfoUpdated
  | IAdminJobFunctionIntroductionShown
  | IAdminKnowledgeBaseRedirectAuthenticated
  | IAdminLboIntroductionShown
  | IAdminNewLeaderboardsIntroductionShown
  | IAdminOrgQuizModuleUpserted
  | IAdminOrgQuizTemplateUpserted
  | IAdminOrganizationDeleted
  | IAdminOrganizationFeaturesSnapshot
  | IAdminOrganizationOnboardingCompleted
  | IAdminOrganizationOnboardingStarted
  | IAdminOrganizationOnboardingTaskCompleted
  | IAdminOrganizationOnboardingTaskCreated
  | IAdminOrganizationTrainingRuleUpdated
  | IAdminOrganizatonFeatureFlagAdded
  | IAdminOrganizatonFeatureFlagRemoved
  | IAdminSatIntroductionShown
  | IAdminShieldIntroductionShown
  | IAdminTrainingManagementIntroductionShown
  | IAdminUserCreated
  | IAdminUserDeleted
  | IAdminUserInfoUpdated
  | IAdminUserManagementColumnCustomizationSeen
  | IAdminUserManagementColumnLayoutChanged
  | IAdminUserRoleChanged
  | IAdminUserSoftDeleteCancelled
  | IAdminUserSoftDeleted
  | ICustomerFeatureContactSalesClicked
  | IInsightsBmReportLoaded
  | IInsightsCxoReportLoaded
  | ILegacySegmentPages
  | ILegacySegmentSessionStarted
  | ILegacySegmentSsoLoginFailed
  | ILegacySegmentSsoLoginSucceeded
  | ILegacySegmentSsoRedirectToStartPage
  | ILegacySegmentWaitForInvitationShown
  | IPluginAfterReportingJoinDialogAccepted
  | IPluginCallApiUrlCommandCreated
  | IPluginChromeExtensionClicked
  | IPluginClicked
  | IPluginCloseButtonClicked
  | IPluginDeleteEmailButtonClicked
  | IPluginExternalThreatAnalyzed
  | IPluginExternalThreatAutomaticallyRated
  | IPluginExternalThreatClicked
  | IPluginExternalThreatDeleted
  | IPluginExternalThreatDownloaded
  | IPluginExternalThreatFeedbackRequested
  | IPluginExternalThreatIocFlagCreated
  | IPluginExternalThreatPreUploaded
  | IPluginExternalThreatRatingInherited
  | IPluginExternalThreatReportModifiersDownloadedFile
  | IPluginExternalThreatReportModifiersEnteredCredentials
  | IPluginExternalThreatReportModifiersForwardedEmail
  | IPluginExternalThreatReportModifiersOpenedAttachment
  | IPluginExternalThreatReportModifiersRepliedToEmail
  | IPluginExternalThreatReportModifiersVisitedLink
  | IPluginExternalThreatReportOptionsNoButtonClicked
  | IPluginExternalThreatReportOptionsShown
  | IPluginExternalThreatReportOptionsYesButtonClicked
  | IPluginExternalThreatUploaded
  | IPluginFeedbackRulePassed
  | IPluginLegacyPluginStarted
  | IPluginMoveToTrashMenuOptionClicked
  | IPluginReportAsNotSpamMenuOptionClicked
  | IPluginReportThreatMenuOptionClicked
  | IPluginSafeExternalEmailClicked
  | IPluginSafeExternalSimulationClicked
  | IPluginSafeHoxEmailClicked
  | IPluginStartGameDialogClicked
  | IPluginThreatFromHoxhuntClicked
  | IPluginUserRequestedFeedbackFromSecurityTeam
  | IResponseApplicationSearchDataClicked
  | IResponseApplicationSearchDataQuerySubmitted
  | IResponseApplicationSearchEmailClicked
  | IResponseApplicationSearchEmailFilterListItemClicked
  | IResponseApplicationSearchEmailFilterListToggle
  | IResponseApplicationSearchEmailQuerySubmitted
  | IResponseApplicationSearchIncidentClicked
  | IResponseApplicationSearchIncidentFilterListItemClicked
  | IResponseApplicationSearchIncidentFilterListToggle
  | IResponseApplicationSearchIncidentQuerySubmitted
  | IResponseFeedbackRuleActivated
  | IResponseFeedbackRuleCreated
  | IResponseFeedbackRuleDeactivated
  | IResponseFeedbackRuleDeleted
  | IResponseFeedbackRuleUpdated
  | IResponseIncidentClassificationChanged
  | IResponseIncidentClassifiedBySoc
  | IResponseIncidentClosed
  | IResponseIncidentCreated
  | IResponseIncidentEscalated
  | IResponseIncidentNoteCreated
  | IResponseIncidentNoteDeleted
  | IResponseIncidentNoteEdited
  | IResponseIncidentReopened
  | IResponseMarketingContentShown
  | IResponseMarketingPageDemoRequested
  | IResponseOrganizationThreatAnalysisPriorityAssigned
  | IResponseThreatAddedToIncident
  | IResponseThreatAddedToSimilarityGroup
  | IResponseThreatHuntingEmailDeletionFailed
  | IResponseThreatHuntingEmailDeletionSuccess
  | IResponseThreatHuntingEmailRevertFailed
  | IResponseThreatHuntingEmailRevertSuccess
  | IResponseThreatHuntingGetSearchResultsComplete
  | IResponseThreatHuntingGetSearchResultsFailed
  | IResponseThreatHuntingSearchResultCreated
  | IResponseThreatHuntingSearchStarted
  | IResponseThreatHuntingStartSearchFailed
  | IResponseThreatResourceMarkedMalicious
  | IResponseThreatResourceMarkedNotMalicious
  | IResponseUserReceivedSocClassifiedThreatFeedback
  | ITrainingAwarenessMomentFinished
  | ITrainingAwarenessMomentLearningCardSeen
  | ITrainingAwarenessMomentSkipped
  | ITrainingAwarenessMomentStarted
  | ITrainingChallenge
  | ITrainingChallengeCompleted
  | ITrainingChallengeExited
  | ITrainingChallengeStarted
  | ITrainingEngineAutomaticReminderSent
  | ITrainingEngineGameStarted
  | ITrainingEngineGameStartedByForce
  | ITrainingEngineInviteEmailSent
  | ITrainingEngineMarkersViewedPlayerRewarded
  | ITrainingEngineNoQuestSelected
  | ITrainingEnginePlayerRewarded
  | ITrainingEnginePlayerRewardedQuiz
  | ITrainingEnginePromotionEmailSent
  | ITrainingEngineQuestCreated
  | ITrainingEngineQuestError
  | ITrainingEngineQuestFailFunnelStepReached
  | ITrainingEngineQuestFailed
  | ITrainingEngineQuestFailedByAtp
  | ITrainingEngineQuestFileDownloaded
  | ITrainingEngineQuestMissed
  | ITrainingEngineQuestRefailed
  | ITrainingEngineQuestRemoved
  | ITrainingEngineQuestRereported
  | ITrainingEngineQuestSafeFailed
  | ITrainingEngineQuestSecondaryObjectivesSelected
  | ITrainingEngineQuestSelected
  | ITrainingEngineQuestStarted
  | ITrainingEngineQuestSucceeded
  | ITrainingEngineThreatFeedbackSent
  | ITrainingEngineVectorDeliveryConfirmed
  | ITrainingEngineVectorDeliveryFailed
  | ITrainingEngineWeeklyReportEmailSent
  | ITrainingFirstTimeRanksSeen
  | ITrainingGameOnboardingTutorialCompleted
  | ITrainingGameQuizCompleted
  | ITrainingGameQuizSentToUser
  | ITrainingGameStarted
  | ITrainingInstantFeedbackErrorCardShown
  | ITrainingInstantFeedbackPageShown
  | ITrainingInstantFeedbackThreatIocsShown
  | ITrainingInstantFeedbackThreatRatingShown
  | ITrainingInstantFeedbackThreatRiskCardShown
  | ITrainingInstantFeedbackTimeoutErrorCardShown
  | ITrainingInviteSent
  | ITrainingJobFunctionAnswered
  | ITrainingLabsOnboardingMessageClosed
  | ITrainingNpsAnswerCreated
  | ITrainingNpsGtwoButtonClicked
  | ITrainingPluginExternalThreatIocModelRiskScoreCalculated
  | ITrainingQuestSecondaryObjectivesSelected
  | ITrainingQuestTemplateCreated
  | ITrainingQuestTemplateStatusChanged
  | ITrainingQuestTemplateUpdated
  | ITrainingQuizModuleRemoved
  | ITrainingQuizModuleUpserted
  | ITrainingQuizTemplateRemoved
  | ITrainingQuizTemplateUpserted
  | ITrainingReportedThreatsModalSeen
  | ITrainingResultPageReviewMarkersFinished
  | ITrainingResultPageReviewMarkersStarted
  | ITrainingResultPageScoreAnimated
  | ITrainingResultReviewMarkers
  | ITrainingResultReviewMarkersFinished
  | ITrainingSpicyModeModalSeen
  | ITrainingStarsRewarded
  | ITrainingTrainingEngineQuestFailFunnelStepReached
  | ITrainingUserFeedbackCreated
  | ITrainingUserFeedbackDeleted
  | ITrainingUserFeedbackUpdated
  | ITrainingUserOnboarded;
