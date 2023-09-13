import { defineMessages } from 'react-intl';
import { Intl as ClientIntl } from '../../../utils/clientIntl';
import { EIncidentPolicyName } from '../../../models/incident';
import { EThreatUserModifier } from '../../../models/threat';

export const IncidentTypesIntl = defineMessages({
  label: {
    id: 'app.modules.incident.type',
    defaultMessage: 'Incident type',
    description: 'Incidents can be created from different circumstances',
  },
  [EIncidentPolicyName.CAMPAIGN]: {
    id: 'app.modules.incident.type.campaign',
    defaultMessage: 'Campaign',
    description:
      'Type label for an incident where a lot of similar phish emails have been reported',
  },
  [EIncidentPolicyName.BUSINESS_EMAIL_COMPROMISE]: {
    id: 'app.modules.incident.type.bec',
    defaultMessage: 'Business email compromise',
    description:
      'Type label for an incident where an organization email has been compromised',
  },
  [EIncidentPolicyName.USER_ACTED_ON_THREAT]: {
    id: 'app.modules.incident.type.userActedOnThreat',
    defaultMessage: 'User acted on threat',
    description:
      'Type label for an incident where user has acted on threat she or he reported',
  },
  [EThreatUserModifier.REPLIED_TO_EMAIL]: {
    id: 'app.modules.incident.type.repliedToEmail',
    defaultMessage: 'User replied to an email',
    description:
      'Type label for an incident where user has acted on threat she or he reported',
  },
  [EThreatUserModifier.DOWNLOADED_FILE]: {
    id: 'app.modules.incident.type.downloadedFile',
    defaultMessage: 'User has downloaded a file',
    description:
      'Type label for an incident where user has acted on threat she or he reported',
  },
  [EThreatUserModifier.OPENED_ATTACHMENT]: {
    id: 'app.modules.incident.type.openedAttachment',
    defaultMessage: 'User has opened an attachment',
    description:
      'Type label for an incident where user has acted on threat she or he reported',
  },
  [EThreatUserModifier.VISITED_LINK]: {
    id: 'app.modules.incident.type.visitedLink',
    defaultMessage: 'User has visited a link',
    description:
      'Type label for an incident where user has acted on threat she or he reported',
  },
  [EThreatUserModifier.ENTERED_CREDENTIALS]: {
    id: 'app.modules.incident.type.enteredCredentials',
    defaultMessage: 'User has entered credentials',
    description:
      'Type label for an incident where user has acted on threat she or he reported',
  },
  [EThreatUserModifier.OTHER]: {
    id: 'app.modules.incident.type.other',
    defaultMessage: 'Some other unspecified risky behaviour',
    description:
      'Type label for an incident where user has acted on threat she or he reported',
  },
  [EThreatUserModifier.USER_MARKED_AS_SPAM]: {
    id: 'app.modules.incident.type.markedAsSpam',
    defaultMessage: 'User marked as spam',
    description:
      'Type label for an incident where user has acted on threat she or he reported',
  },
  [EIncidentPolicyName.USER_ACTED_ON_THREAT]: {
    id: 'app.modules.threat.type.userActedOnThreat',
    defaultMessage: 'User acted on threat',
    description:
      'Type label for an incident where user has acted on threat she or he reported',
  },
  [EThreatUserModifier.REPLIED_TO_EMAIL]: {
    id: 'app.modules.threat.type.repliedToEmail',
    defaultMessage: 'User replied to an email',
    description:
      'Type label for an incident where user has replied to a risky email she or he reported',
  },
  [EThreatUserModifier.DOWNLOADED_FILE]: {
    id: 'app.modules.threat.type.downloadedFile',
    defaultMessage: 'User has downloaded a file',
    description:
      'Type label for an incident where user has downloaded a suspicious file on an email she or he reported',
  },
  [EThreatUserModifier.OPENED_ATTACHMENT]: {
    id: 'app.modules.threat.type.openedAttachment',
    defaultMessage: 'User has opened an attachment',
    description:
      'Type label for an incident where user has opened a risky attachment on an email she or he reported',
  },
  [EThreatUserModifier.VISITED_LINK]: {
    id: 'app.modules.threat.type.visitedLink',
    defaultMessage: 'User has visited a link',
    description:
      'Type label for an incident where user has visited a suspicious link on an email she or he reported',
  },
  [EThreatUserModifier.ENTERED_CREDENTIALS]: {
    id: 'app.modules.threat.type.enteredCredentials',
    defaultMessage: 'User has entered credentials',
    description:
      'Type label for an incident where user has entered their credentials to a risky source on an email she or he reported',
  },
  [EThreatUserModifier.OTHER]: {
    id: 'app.modules.threat.type.other',
    defaultMessage: 'Some other unspecified risky behaviour',
    description:
      'Type label for an incident where user has acted in some other way to a risky email',
  },
});

const formIntl = defineMessages({
  organizationSettings: {
    id: 'app.page.organizationSettings',
    defaultMessage: 'Organization settings',
    description: 'A page title for Organization settings page',
  },
  createSuccess: {
    id: 'app.notification.organization.createSuccess',
    defaultMessage: 'Organization created successfully!',
    description: 'Notification for orgnization creation success',
  },
  createFailure: {
    id: 'app.notification.error.organization.create',
    defaultMessage: 'Organization creation failed',
    description: 'Notification for organization creation failure',
  },
  actionUpdateOrganization: {
    id: 'app.form.editOrganization.button',
    defaultMessage: 'Update Organization',
    description: 'Action text (e.g. for a button) to Update Organization',
  },
  organizationNameHint: {
    id: 'app.form.organizationName.hintText',
    defaultMessage: 'Organization Name',
    description: 'Organization Name hintText',
  },
  organizationName: {
    id: 'app.form.organizationName.floatingLabelText',
    defaultMessage: 'Organization Name',
    description: 'Label for Organization Name input',
  },
  emailEnvironment: {
    id: 'app.form.emailEnvironment.floatingLabelText',
    defaultMessage: 'Email Environment',
    description: 'Label for Email Environment selector',
  },
  region: {
    id: 'app.form.region.floatingLabelText',
    defaultMessage: 'Region',
    description: 'Label for Region selector',
  },
  defaultUILanguage: {
    id: 'app.form.organizationDefaultUiLanguage.floatingLabelText',
    defaultMessage: 'Default UI Language',
    description: "Label for Organization's default ui language input",
  },
  privateSmtpConnectionString: {
    id: 'app.form.privateSmtpConnectionString.floatingLabelText',
    defaultMessage: 'Private SMTP Connection String',
    description: 'Input field for a SMTP Connection String',
  },
  customHiddenEmailBodyIdentifier: {
    id: 'app.form.customHiddenEmailBodyIdentifier.floatingLabelText',
    defaultMessage: 'Custom string to identify Hoxhunt simulations',
    description:
      'Input field for a custom string that will be added to all Hoxhunt simulations',
  },
  customEmailDisclaimer: {
    id: 'app.form.customEmailDisclaimer.floatingLabelText',
    defaultMessage: 'Custom header in the "Results"-page',
    description: 'Input field for a custom email header in the "Results"-page',
  },
  emailDomainsHint: {
    id: 'app.form.organizationEmailDomains.hintText',
    defaultMessage: 'Email Domains (separate with comma)',
    description: 'Email Domains hintText',
  },
  emailDomains: {
    id: 'app.form.organizationEmailDomains.floatingLabelText',
    defaultMessage: 'Email Domains (separate with comma)',
    description: 'Email Domains floatingLabelText',
  },
  samlConsumerUrl: {
    id: 'app.form.organizationSamlConsumerURL.labelText',
    defaultMessage: 'SAML consumer URL',
    description: 'Lable for SAML consumer URL for organizations',
  },
  navSettings: {
    id: 'app.form.organizationSettings',
    defaultMessage: 'General Settings',
    description:
      'Navigation tab for editing organization settings in edit organization page',
  },
  navDomains: {
    id: 'app.form.organizationEmailDomainsSettings',
    defaultMessage: 'Email Domains',
    description:
      "Navigation tab for editing organization's email domains in edit organization page",
  },
  navHdr: {
    id: 'app.form.organizationHdrSettings',
    defaultMessage: 'HDR',
    description:
      "Navigation tab for editing organization's HRD (Human Detection and Response) settings in edit organization page",
  },
  navThreats: {
    id: 'app.form.organizationThreatSettings',
    defaultMessage: 'Threats',
    description:
      "Navigation tab for editing organization's threat reporting settings in edit organization page",
  },
  navScim: {
    id: 'app.form.organizationScimSettings',
    defaultMessage: 'AD provisioning',
    description:
      "Navigation tab for editing organization's AD provisioning settings (automated user federation) in edit organization page",
  },
  navOnboarding: {
    id: 'app.form.organizationOnboarding',
    defaultMessage: 'Onboarding',
    description:
      "Navigation tab for changing organization's onboarding status in edit organization page",
  },
  navDemo: {
    id: 'app.form.demoMode',
    defaultMessage: 'POC mode',
    description: '',
  },
  navLicenses: {
    id: 'app.form.licenses.title',
    defaultMessage: 'Licenses',
    description: 'Title for a section about licenses',
  },
  scimAuthToken: {
    id: 'app.form.organizationScimAuthToken',
    defaultMessage: 'SCIM authentication token',
    description:
      'Label for newly created organization SCIM authentication token',
  },
  scimEndpoint: {
    id: 'app.form.organizationScimEndpoint',
    defaultMessage: 'SCIM endpoint url',
    description:
      'Label for SCIM endpoint url that is used by organization AD system',
  },
  scimAuthTokenSet: {
    id: 'app.form.organizationScimAuthTokenSet',
    defaultMessage: 'SCIM authentication token is set',
    description: 'Label for SCIM authentication token is set',
  },
  scimAuthTokenNotSet: {
    id: 'app.form.organizationScimAuthTokenNotSet',
    defaultMessage: 'SCIM authentication token is not set',
    description: 'Label for SCIM authentication token is not set',
  },
  scimAuthTokenInfo: {
    id: 'app.form.organizationScimAuthTokenInfo',
    defaultMessage:
      'Authentication token will disappear after page reload, so remember to copy it to clipboard!',
    description:
      'Message for informing user that the newly created token will not be shown again',
  },
  createNewScimTokenTitle: {
    id: 'app.form.createNewScimTokenTitle',
    defaultMessage: 'Create new SCIM authentication token',
    description: 'Label for dialog for creating new SCIM authentication token',
  },
  createNewScimTokenMessage: {
    id: 'app.form.createNewScimTokenMessage',
    defaultMessage:
      'This action will immediately stop SCIM provisioning associated to existing token for this organization. New token must be provided to the organization admin to continue automated user federation. Ensure that the token change has been communicated to the organization well in advance.',
    description:
      'Message indicating that the action will stop automated user federation via SCIM immediately',
  },
  createNewScimTokenButton: {
    id: 'app.form.createNewScimTokenButton',
    defaultMessage: 'Create new token',
    description:
      'Button to create new SCIM authentication token for the organization',
  },
  pluginOfficeJsCertName: {
    id: 'app.form.pluginOfficeJsCertName',
    defaultMessage: 'Exchange Self-Signed Certificate',
    description:
      'Description field for text input. Exchange is a product name do not translate. Certificate refers to digital key used to sign tokens.',
  },
  incidentTemplateSelectorLabel: {
    id: 'app.form.incidentTemplateSelectorLabel',
    defaultMessage: 'Select a template',
    description:
      'A label on a selector to change the selected incident template in edit organization page',
  },
  addDomainsInfoText: {
    id: 'app.form.editOrganizationDomains.emptyInfo',
    defaultMessage: 'Add some domains to edit context info',
    description:
      'An info text informing the user to add a domain to edit context for it.',
  },
  orgDefaultGameMode: {
    id: 'app.form.defaultGameMode.label',
    defaultMessage: 'Default Game Mode',
    description: 'Selector for selecting a default game mode',
  },
  orgFirstQuestTagExplanation: {
    id: 'app.form.firstQuestTag.explanation',
    defaultMessage:
      'The quest that will be sent first to starting users. Due to technical reasons the quest tag must start with "hox.quest.bootcamp.0".',
    description: 'Selector for selecting the tag of first quest',
  },
  orgFirstQuestTagLabel: {
    id: 'app.form.firstQuestTag.label',
    defaultMessage: 'Tag of first quest',
    description: 'Selector for selecting the tag of first quest',
  },
  [`${EIncidentPolicyName.CAMPAIGN}Description`]: {
    id: 'app.modules.incident.type.campaign.description',
    defaultMessage:
      '"Campaign" incidents are created when a threat is reported enough times',
    description:
      'Helper text that describes how the campaign incident policy works',
  },
  [`${EIncidentPolicyName.BUSINESS_EMAIL_COMPROMISE}Description`]: {
    id: 'app.modules.incident.type.bec.description',
    defaultMessage:
      '"Business email compromise" incidents are created when a threat originates from a domain that belongs to the organization',
    description:
      'Helper text that describes how the business email compromise incident policy works',
  },
  [`${EIncidentPolicyName.USER_ACTED_ON_THREAT}Description`]: {
    id: 'app.modules.incident.type.userActedOnThreat.description',
    defaultMessage:
      '"User acted on threat" incidents are created when the threat report indicates that the user acted on the threat',
    description:
      'Helper text that describes how the user acted on threat incident policy works',
  },
  [`${EThreatUserModifier.REPLIED_TO_EMAIL}Description`]: {
    id: 'app.modules.incident.type.repliedToEmail.description',
    defaultMessage:
      '"User replied to en email" incidents are created when the threat report indicates that the user replied to an email',
    description:
      'Helper text that describes how the user acted on threat incident policy works',
  },
  [`${EThreatUserModifier.DOWNLOADED_FILE}Description`]: {
    id: 'app.modules.incident.type.downloadedFile.description',
    defaultMessage:
      '"User downloaded a file" incidents are created when user downloads a suspicious file',
    description:
      'Helper text that describes how the user acted on threat incident policy works',
  },
  [`${EThreatUserModifier.OPENED_ATTACHMENT}Description`]: {
    id: 'app.modules.incident.type.openedAttachment.description',
    defaultMessage:
      '"User opened an attachment" incidents are created when user opened an attachment',
    description:
      'Helper text that describes how the user acted on threat incident policy works',
  },
  [`${EThreatUserModifier.VISITED_LINK}Description`]: {
    id: 'app.modules.incident.type.visitedLink.description',
    defaultMessage:
      '"User visited a link" incidents are created when user clicks a link in a threat email',
    description:
      'Helper text that describes how the user acted on threat incident policy works',
  },
  [`${EThreatUserModifier.ENTERED_CREDENTIALS}Description`]: {
    id: 'app.modules.incident.type.enteredCredentials.description',
    defaultMessage:
      '"User entered credentials" incidents are created when user enters personal credentials',
    description:
      'Helper text that describes how the user acted on threat incident policy works',
  },
  [`${EThreatUserModifier.OTHER}Description`]: {
    id: 'app.modules.incident.type.other.description',
    defaultMessage:
      '"Other threat" incidents are created when there is some other unspecified and risky behaviour by the user',
    description:
      'Helper text that describes how the user acted on threat incident policy works',
  },

  [`${EIncidentPolicyName.USER_ACTED_ON_THREAT}Description`]: {
    id: 'app.modules.threat.type.userActedOnThreat.description',
    defaultMessage:
      '"User acted on threat" incidents are created when the threat report indicates that the user acted on the threat',
    description:
      'Helper text that describes how the user acted on threat incident policy works',
  },
  [`${EThreatUserModifier.REPLIED_TO_EMAIL}Description`]: {
    id: 'app.modules.threat.type.repliedToEmail.description',
    defaultMessage:
      '"User replied to en email" incidents are created when user replied to a suspicious email',
    description:
      'Helper text that describes that user has replied to a suspicious email',
  },
  [`${EThreatUserModifier.DOWNLOADED_FILE}Description`]: {
    id: 'app.modules.threat.type.downloadedFile.description',
    defaultMessage:
      '"User downloaded a file" incidents are created when user downloads a suspicious file',
    description:
      'Helper text that indicates that user has downloaded a suspicious file',
  },
  [`${EThreatUserModifier.OPENED_ATTACHMENT}Description`]: {
    id: 'app.modules.threat.type.openedAttachment.description',
    defaultMessage:
      '"User opened an attachment" incidents are created when user opened an attachment',
    description:
      'Helper text that notifies that user has opened a suspicious attachment',
  },
  [`${EThreatUserModifier.VISITED_LINK}Description`]: {
    id: 'app.modules.threat.type.visitedLink.description',
    defaultMessage:
      '"User visited a link" incidents are created when user clicks a link in a threat email',
    description:
      'Helper text that notifies that user has visited a suspicious link',
  },
  [`${EThreatUserModifier.ENTERED_CREDENTIALS}Description`]: {
    id: 'app.modules.threat.type.enteredCredentials.description',
    defaultMessage:
      '"User entered credentials" incidents are created when user enters personal credentials',
    description:
      'Helper text that notifies that user has entered credentials to a suspicious source',
  },
  [`${EThreatUserModifier.OTHER}Description`]: {
    id: 'app.modules.threat.type.other.description',
    defaultMessage:
      '"Other threat" incidents are created when there is some other unspecified and risky behaviour by the user',
    description:
      'Helper text that describes that user has acted on a suspicious email with unspecified risky behaviour',
  },
});

export const Intl = Object.assign({}, ClientIntl, IncidentTypesIntl, formIntl);
