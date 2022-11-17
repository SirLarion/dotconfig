import { defineMessages } from '@server/intl';
import { EThreatUserModifier } from '@server/lib/typedSchemas/Threat/models';

// @i18n-meta group:appEmails
export default defineMessages({
  resetPasswordSubject: {
    id: 'emailTemplates.resetPassword.subject',
    defaultMessage: 'How to reset your password at Hoxhunt ({site})',
    description: 'Reset password email Subject',
  },
  resetPasswordHeadline: {
    id: 'emailTemplates.resetPassword.headline',
    defaultMessage: 'Hello,',
    description: 'Reset password email Greeting',
  },
  resetPasswordClickMsg: {
    id: 'emailTemplates.resetPassword.click',
    defaultMessage: 'To reset your password, simply click the button below.',
    description:
      'Reset password email Text to instruct the user to click a button to go to the reset password page',
  },
  resetPasswordButtonText: {
    id: 'emailTemplates.resetPassword.urlName',
    defaultMessage: 'Set new password',
    description:
      'Reset password email Title for a button that takes the user to the reset password page',
  },
  hello: {
    id: 'emailTemplates.general.hello',
    defaultMessage: 'Hello!',
    description: 'A greeting!',
  },
  hiUser: {
    id: 'emailTemplates.general.hello',
    defaultMessage: 'Hi, {firstName}',
    description: 'A greeting with the first name of the recipient',
  },
  magicLinkText: {
    id: 'emailTemplates.magicLinkLogin.text',
    defaultMessage:
      'You asked us to send you a magic link to signin to your Hoxhunt dashboard. Here you go.',
    description:
      'Magic link login email text informing the receiver that the email contains a link which can be used to sign in to the service',
  },
  magicLinkButtonText: {
    id: 'emailTemplates.magicLinkLogin.ctaText',
    defaultMessage: 'Click here to sign in',
    description:
      'Magic link login email button that can be used to login to the service',
  },
  magicLinkCopyLinkText: {
    id: 'emailTemplates.magicLinkLogin.copyLinkText',
    defaultMessage: 'Or copy this url to your browser',
    description:
      'Magic link login email text instructing the user that she can copy the login link and paste it to browser manually.',
  },
  organizationOnboardingButtonText: {
    id: 'emailTemplates.organizationOnboarding.ctaText',
    defaultMessage: 'Start onboarding',
    description:
      'A cta to an admin user to log in and start self-service onboarding their organization',
  },
  firstQuestBannerTitle: {
    id: 'emailTemplates.firstQuestBanner.title',
    defaultMessage: 'This is a simulated threat',
    description:
      'When a user receives their first simulated email, there is a banner in the email that tells them how to react',
  },
  clickReportButton: {
    id: 'emailTemplates.general.clickReportButton',
    defaultMessage: 'Click the "Report this email" button',
    description:
      'Text that encourages the user to click Report this email -button',
  },
  firstQuestBannerTrouble: {
    id: 'emailTemplates.firstQuestBanner.trouble',
    defaultMessage:
      'Having trouble? Contact your system administrator or send a message to {supportEmail}',
    description:
      'When a user receives their first simulated email, there is a banner in the email that tells them how to react',
  },
  welcomeSubject: {
    id: 'emailTemplates.welcome.subject',
    defaultMessage: 'Welcome to Hoxhunt Cybersecurity training, {firstName}',
    description: 'Subject for the welcome email a new user receives',
  },
  welcomeSimulationStartedHeading: {
    id: 'emailTemplates.welcome.simulationStartedHeading',
    defaultMessage: 'Hoxhunt simulation has started!',
    description: 'The main heading for the welcome email a new user receives',
  },
  welcomeWhatIsHoxHuntText: {
    id: 'emailTemplates.welcome.whatIsHoxHuntText',
    defaultMessage:
      'Hoxhunt is a virtual simulation in which you receive simulated threat emails. Your job is to identify and report these emails.',
    description: 'Hoxhunt simulation introduction body',
  },
  welcomeWhatIsHoxHuntPrompt: {
    id: 'emailTemplates.welcome.whatIsHoxHuntPrompt',
    defaultMessage:
      'Actually, there should already be one simulated threat email in your inbox.',
    description:
      'A body text tempting a user to check their email for the first simulated attack.',
  },
  welcomeIntroductionHeading: {
    id: 'emailTemplates.welcome.introductionHeading',
    defaultMessage: "Let's start",
    description: 'Heading for instruction steps for a new user.',
  },
  welcomeIntroductionEstimate: {
    id: 'emailTemplates.welcome.introductionEstimate',
    defaultMessage: 'Time estimate: 1 minute',
    description:
      'Estimated time it takes for a user to complete introduction quest steps.',
  },
  welcomeIntroductionFindEmail: {
    id: 'emailTemplates.welcome.introductionFindEmail',
    defaultMessage: 'Open email with the title',
    description:
      'Text asking a user to find and open a particular email in their inbox. The title of the email directly follows this text.',
  },
  welcomeWhyHoxHuntSubheading: {
    id: 'emailTemplates.welcome.whyHoxHuntSubheading',
    defaultMessage: 'Why Hoxhunt?',
    description: 'Subheading line for Hoxhunt motivational text',
  },
  welcomeWhyHoxHuntText: {
    id: 'emailTemplates.welcome.whyHoxHuntText',
    defaultMessage:
      "Every day, an increasing number of criminals target companies with malicious intent. Some of them are doing it to steal information, others to hold the companies' data hostage. Some do it just for fun. Damages from these attacks are measured in the millions.",
    description: 'Introduction text to cyber attacks',
  },
  welcomeWhyHoxHuntVectorText: {
    id: 'emailTemplates.welcome.whyHoxHuntVectorText',
    defaultMessage:
      "90 % of these attacks start with targeting the company's employees, that is: You.",
    description:
      'An individual paragraph detailing that cyber attacks usually start with malicious emails attempting to trick the employees.',
  },
  welcomeWhyHoxHuntVectorTeaser: {
    id: 'emailTemplates.welcome.whyHoxHuntVectorTeaser',
    defaultMessage:
      'By using Hoxhunt you will learn how to detect and report these threats which would cause the whole company unnecessary harm.',
    description:
      'Let the user know that by using Hoxhunt, they can improve their awareness and become safer employees.',
  },
  welcomeWhyHoxHuntWantMore: {
    id: 'emailTemplates.welcome.whyHoxHuntWantMore',
    defaultMessage:
      "Want to know more? Find the first simulated threat and report it! Afterwards you'll have access to our knowledge base about cyber security, the service and more.",
    description:
      'Give the user a peek into some types of information available to the users of the service.',
  },
  generalHavingTroubleText: {
    id: 'emailTemplates.general.havingTroubleText',
    defaultMessage:
      'P.S. Having trouble or missing the report button? Contact your system administrator or',
    description:
      'Inform the user on what they can do if they run into trouble during the introduction quest.',
  },
  generalTroubleKnowledgeBase: {
    id: 'emailTemplates.general.trouble.knowledgeBase.intro',
    defaultMessage: 'P.S. Having trouble?',
    description:
      'Inform the user on what they can do if they run into trouble. First section of text, which is followed by link to Knowledge base.',
  },
  generalTroubleKnowledgeBaseLink: {
    id: 'emailTemplates.general.trouble.knowledgeBase.link',
    defaultMessage: 'Please see this website for more information and help.',
    description:
      'Inform the user on what they can do if they run into trouble. Second section, which is a link to Knowledge Base article',
  },
  generalContactHoxHunt: {
    id: 'emailTemplates.general.contactHoxHunt',
    defaultMessage: 'contact Hoxhunt',
    description: 'Hyperlink to contact Hoxhunt.',
  },
  promotionEmailSubject: {
    id: 'emailTemplates.promotionEmail.subject',
    defaultMessage: 'Welcome to Hoxhunt!',
    description:
      'Subject of an email that encourages the user to start Hoxhunt',
  },
  promotionEmailYouveBeenInvitedHeading: {
    id: 'emailTemplates.promotionEmail.youveBeenInvitedHeading',
    defaultMessage: "You've been invited to join Hoxhunt!",
    description:
      'Heading of an email that tries to persuade the user to join Hoxhunt',
  },
  promotionEmailWhatIsHoxHuntTeaser: {
    id: 'emailTemplates.promotionEmail.whatIsHoxHuntTeaser',
    defaultMessage:
      'Hoxhunt is a gamified cybersecurity training that works by sending you simulated phishing attacks. In Hoxhunt you and your collagues get to learn by doing how to avoid the traps that cost other companies millions of dollars.',
    description: 'Text that promotes Hoxhunt by telling what it is.',
  },
  promotionEmailFirstStepHeading: {
    id: 'emailTemplates.promotionEmail.firstStepHeading',
    defaultMessage: 'First step',
    description: 'Heading that tells the user it is the first step.',
  },
  promotionEmailClickTheButtonText: {
    id: 'emailTemplates.promotionEmail.clickTheButtonText',
    defaultMessage:
      "You'll receive a short onboarding package – and we'll send you your first simulated threat.",
    description:
      'Text that tells the user what happens if they click the Report this email -button',
  },
  threatReportFeedbackGreeting: {
    id: 'emailTemplates.threatReportFeedback.greeting',
    defaultMessage:
      "Hi {firstName}! Recently, you reported {reportCount} possibly malicious emails to us. Awesome! You've helped secure your place of work, and those around you!",
    description:
      'Greeting of the user in the first paragraph on an email that is sent to a user who has reported suspicious email messages recently',
  },
  threatReportFeedbackFrom: {
    id: 'emailTemplates.threatReportFeedback.from',
    defaultMessage: 'From',
    description:
      'A text that is shown before and email address of the sender. This is the from field that is used in email clients when displaying who the email is from.',
  },
  threatReportFeedbackEmailSubject: {
    id: 'emailTemplates.threatReportFeedback.emailSubject',
    defaultMessage: 'Email subject',
    description:
      'Text that is shown before an email subject in a feedback. The actual subject of the email follows this message.',
  },
  threatReportFeedbackUnknownEmailSubject: {
    id: 'emailTemplates.threatReportFeedback.emailSubjectUnknown',
    defaultMessage: 'No subject',
    description: 'Text that is shown if the email has no subject.',
  },
  threatFeedbackUnknownSender: {
    id: 'emailTemplates.threatReportFeedback.unknownSender',
    defaultMessage: 'Unknown sender',
    description:
      'When the email is missing the sender we display this message as the sender instead in the email.',
  },
  threatReportFeedbackHello: {
    id: 'emailTemplates.threatReportFeedback.hello',
    defaultMessage: 'Hi {firstName}!',
    description:
      'Greeting of the user in the first paragraph on an email that is sent to a user who has reported suspicious email messages recently',
  },
  threatReportFeedbackCount: {
    id: 'emailTemplates.threatReportFeedback.count',
    defaultMessage:
      "Thank you for reporting {reportCount} possibly malicious email to us. Awesome! You've helped secure your place of work, and those around you!",
    description:
      'First paragraph on an email that is sent to a user who has reported suspicious email messages recently',
  },
  threatReportFeedbackAnalysis: {
    id: 'emailTemplates.threatReportFeedback.analysis',
    defaultMessage:
      "We have now analysed the email and forwarded the information to the {organizationName} security team. Here's what we thought about it.",
    description:
      'Header text before a rating that our threat analysts have given to threat email that the user has reported',
  },
  threatReportFeedbackThreatListHeader: {
    id: 'emailTemplates.threatReportFeedback.threatListHeader',
    defaultMessage: "Here's what we thought about the emails:",
    description:
      "Header paragraph that precedes a table summarizing a user's reports on an email that is sent to a user who has reported suspicious email messages recently",
  },
  threatReportFeedbackCategory: {
    id: 'emailTemplates.threatReportFeedback.category',
    defaultMessage: 'Category',
    description: "Label text for a field that contains a threat's category",
  },
  threatReportFeedbackCategoryDescriptionHeading: {
    id: 'emailTemplates.threatReportFeedback.categoryDescriptionHeading',
    defaultMessage:
      "Emails you report to us get tagged with a category. Here's what the categories we encountered this time mean:",
    description:
      'Header for a section that provides descriptions of threat categories on an email that is sent to a user who has reported suspicious email messages recently',
  },
  threatReporteFeedbackClassificationMalicious: {
    id: 'emailTemplates.threatReportFeedback.classification.malicious',
    defaultMessage:
      'We have rated this email as malicious with high confidence. The email includes a malicious attachment or link, or techniques practically only used by attackers to make you believe that you need to act upon the email. Do not click the links, download attachments, or reply.',
    description:
      'Description of the emails that are classified as malicious by Hoxhunt',
  },
  threatReportFeedbackCategoryCompromisedEmailDescriptionNew: {
    id: 'emailTemplates.threatReportFeedback.category.compromisedEmailDescriptionNew',
    defaultMessage:
      "The sender's email account has been hacked. The attacker used the hacked account to send malicious emails to seem more reliable by using someone else's identity with better chances to succeed.",
    description: 'Description of the Compromised Email threat category',
  },
  threatReportFeedbackCategoryFalsePositiveDescription: {
    id: 'emailTemplates.threatReportFeedback.category.falsePositiveDescription',
    defaultMessage:
      'False positive emails are not dangerous or spam, but may have elements that are similar to the elements in malicious emails. However, the content such as: links, attachments or sender address are not dangerous.',
    description: 'Description of the False Positive threat category',
  },
  threatReportFeedbackCategoryPhishingDescription: {
    id: 'emailTemplates.threatReportFeedback.category.phishingDescription',
    defaultMessage:
      'The email can look authentic, but it is dangerous and has malicious intent. The goal of phishing emails is to make you believe that you need to take action to click on a link, open an attachment, or give away personal information.',
    description: 'Description of the Phishing threat category',
  },
  threatReportFeedbackCategorySpamDescription: {
    id: 'emailTemplates.threatReportFeedback.category.spamDescription',
    defaultMessage:
      'Spam emails are typically advertising and sent to a large target audience. Spam can be event invitations, newsletters and other emails that do not ask you to take immediate action.',
    description: 'Description of the Spam threat category',
  },
  threatReportFeedbackCategorySpearPhishingDescription: {
    id: 'emailTemplates.threatReportFeedback.category.spearPhishingDescription',
    defaultMessage:
      'The email targeted an individual, group or company. It may contain detailed information that can make the attack extremely convincing. Attackers create targeted attacks to increase the likelihood their victims will act on the malicious message.',
    description: 'Description of the Spear Phishing threat category',
  },
  threatFeedbackMalicious: {
    id: 'emailTemplates.threatReportFeedback.category.malicious',
    defaultMessage: 'Malicious',
    description:
      'This is an email category that indicates that the email was malicious e.g. phishing emails.',
  },
  threatFeedbackFalsePositive: {
    id: 'emailTemplates.threatReportFeedback.category.falsePositive',
    defaultMessage: 'False positive',
    description:
      'This is an email category that indicates that the email was false positive/not malicious e.g. user reported it as phishing but it acutally is not.',
  },
  threatFeedbackSpam: {
    id: 'emailTemplates.threatReportFeedback.category.spam',
    defaultMessage: 'Spam',
    description:
      'This is an email category that indicates that the email was spam e.g. unwanted advertising emails',
  },
  threatReportFeedbackLearnMore: {
    id: 'emailTemplates.threatReportFeedback.learnMore',
    defaultMessage: 'Learn more about the email at the result page.',
    description:
      'Header for a button taking the user to the result page where they are able to see more information about a threat email they have reported',
  },
  threatReportFeedbackResultPage: {
    id: 'emailTemplates.threatReportFeedback.resultPage',
    defaultMessage: 'Go to Result Page',
    description:
      'Button text taking the user to the result page where they are able to see more information about a threat email they have reported',
  },
  emailDeleteNotificationGreeting: {
    id: 'emailTemplates.emailDeleteNotification.greeting',
    defaultMessage:
      'A malicious email has been deleted from your {folderName} folder by your security team.',
    description:
      'DNT the variable - Header sentence in a message informing the user that an email has been deleted from their inbox',
  },
  emailDeleteNotificationThanks: {
    id: 'emailTemplates.emailDeleteNotification.thanks',
    defaultMessage:
      'The deleted item was a part of a larger phishing attack against your organisation. Thanks to reports by your colleagues the attack was identified and mitigated.',
    description:
      'Follow-up sentence in a message informing the user that an email has been deleted from their inbox',
  },
  emailDeleteNotificationMistakeHeader: {
    id: 'emailTemplates.emailDeleteNotification.mistakeHeader',
    defaultMessage: "Doesn't sound right?",
    description:
      'Header sentence in a message informing the user that an email has been deleted from their inbox. For a case where the email shouldnt have been deleted',
  },
  emailDeleteNotificationMistakeDescription: {
    id: 'emailTemplates.emailDeleteNotification.mistakeDescription',
    defaultMessage:
      'If you think the email was wrongly deleted, it is still recoverable. Make sure the email is safe by confirming that the sender is legitimate through another channel, before interacting with potentially malicious messages.',
    description:
      'Follow-up sentence in a message informing the user that an email has been deleted from their inbox. For a case where the email shouldnt have been deleted',
  },
  emailDeleteNotificationRecover: {
    id: 'emailTemplates.emailDeleteNotification.recover',
    defaultMessage:
      'The deleted email was moved to Recoverable Items section in the Deleted Items folder. You can recover the email yourself in the next 30 days.',
    description:
      'Use the proper terms for Recoverable Items and Deleted Items or DNT. How to recover an email that has been deleted from their inbox. For a case where the email shouldnt have been deleted.',
  },
  emailDeleteNotificationProtectHeader: {
    id: 'emailTemplates.emailDeleteNotification.protectHeader',
    defaultMessage: 'Protect you organisation!',
    description:
      'Header sentence in a message informing the user that an email has been deleted from their inbox',
  },
  emailDeleteNotificationProtectDescription: {
    id: 'emailTemplates.emailDeleteNotification.protectDescription',
    defaultMessage:
      'By reporting suspicious emails with the Hoxhunt plugin, you can help warn your colleagues about incoming attacks!',
    description:
      'Follow-up sentence in a message informing the user that an email has been deleted from their inbox',
  },
  questMissedSubject: {
    id: 'emailTemplates.questMissed.subject',
    defaultMessage: '{firstName} you missed our simulated threat!',
    description:
      'Subject of an email that informs the user that he/she has missed a quest',
  },
  questMissedReviewMissed: {
    id: 'emailTemplates.questMissed.reviewMissed',
    defaultMessage: 'Review missed quest',
    description: 'Text in an email on a button that links to a missed quest',
  },
  hoxHuntTeam: {
    id: 'emailTemplates.general.hoxHuntTeam',
    defaultMessage: 'Hoxhunt Team',
    description: 'Then sender of email commnuniques',
  },
  [EThreatUserModifier.REPLIED_TO_EMAIL]: {
    id: 'app.modules.incident.type.repliedToEmail',
    defaultMessage: 'User replied to the email',
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
    id: 'app.modules.incident.type.userMarkedAsSpam',
    defaultMessage: 'User marked as spam',
    description:
      'Type label for an incident where user has acted on threat she or he reported',
  },
  [EThreatUserModifier.FORWARDED_EMAIL]: {
    id: 'app.modules.incident.type.forwardedEmail',
    defaultMessage: 'User forwarded the email',
    description:
      'Type label for an incident where user has acted on threat she or he reported',
  },
  promotionEmailHeyUser: {
    id: 'emailTemplates.promotionEmail.heyUser',
    defaultMessage: 'Hey {firstName},',
    description: 'Heading that greets the user in the promotion email.',
  },
  promotionEmailCompanyInvites: {
    id: 'emailTemplates.promotionEmail.companyInvites',
    defaultMessage: '{organization} invites you to join Hoxhunt!',
    description: 'Heading that welcomes the user to join Hoxhunt training.',
  },
  promotionEmailHoxhuntIs: {
    id: 'emailTemplates.promotionEmail.hoxhuntIs',
    defaultMessage: 'Hoxhunt is a cyber security training that will help you:',
    description:
      'Text that explains very briefly what Hoxhunt is and what is the obejctive. This is followed by a short list of objectives for the training.',
  },
  promotionEmailRecognizeEmails: {
    id: 'emailTemplates.promotionEmail.trainingObjective1',
    defaultMessage: 'Recognize malicious emails',
    description:
      'List item that explains one of the objectives of the training.',
  },
  promotionEmailKeepYourDataSafe: {
    id: 'emailTemplates.promotionEmail.trainingObjective2',
    defaultMessage: 'Increase your awareness about cyber attacks',
    description:
      'List item that explains one of the objectives of the training.',
  },
  promotionEmailOutsmart: {
    id: 'emailTemplates.promotionEmail.trainingObjective3',
    defaultMessage: 'Protect your information',
    description:
      'List item that explains one of the objectives of the training.',
  },
  promotionEmailStartByClicking: {
    id: 'emailTemplates.promotionEmail.startByClicking',
    defaultMessage: 'Start simply by clicking the Hoxhunt button',
    description:
      'Heading to guide the user on how to start the training by clicking a button in their email client.',
  },
  promotionEmailStartByClickingGmail: {
    id: 'emailTemplates.promotionEmail.startByClickingGmail',
    defaultMessage: 'To start:',
    description:
      'Heading to guide the user on how to start the training by clicking a button in their email client.',
  },
  promotionEmailYouReceive: {
    id: 'emailTemplates.promotionEmail.youReceive',
    defaultMessage:
      'You will receive a short starting package in your email inbox.',
    description:
      'Information text on what happens after the training is started via clicking the Hoxhunt button in their email client.',
  },
  gmailInstructionClickButton: {
    id: 'emailTemplates.promotionEmail.gmailInstructionClickButton',
    defaultMessage:
      'Click the Hoxhunt button located in your Gmail (see image below for where to find the Hoxhunt button in your Gmail)',
    description:
      'A step instructing user to click the Hoxhunt button on the screen. Below the step is an image with locations for the button',
  },
  gmailInstructionAuthorize: {
    id: 'emailTemplates.promotionEmail.gmailInstructionAuthorize',
    defaultMessage: 'Click "Authorize access" to give permission to the plugin',
    description:
      'A step instructing user to authorize access to the Hoxhunt plugin',
  },
  gmailInstructionClickReport: {
    id: 'emailTemplates.promotionEmail.gmailInstructionClickReport',
    defaultMessage: 'Press "Report" to receive your starter package',
    description:
      'A step instructing user to click button that says "Report". Do not translate the word "Report" (the button is never translated)',
  },
  gmailInstructionClickReportWelcome: {
    id: 'emailTemplates.welcomeEmail.gmailInstructionClickReport',
    defaultMessage: 'Press "Report" to get on-boarded to the training',
    description:
      'A step instructing user to click button that says "Report". Do not translate the word "Report" (the button is never translated)',
  },
  welcomeEmailWelcomeUser: {
    id: 'emailTemplates.welcomeEmail.welcomeUser',
    defaultMessage:
      '{firstName}, your Hoxhunt cyber security training will now begin',
    description:
      'Welcome heading at the beginning of an email, telling the user that the training has started',
  },
  welcomeEmailHappyToKnow: {
    id: 'emailTemplates.welcomeEmail.happyToKnow',
    defaultMessage: '{organization} is happy to have you onboard!',
    description:
      'Greeting text for the user for starting the Hoxhunt training.',
  },
  welcomeEmailWillSendSimulatedThreats: {
    id: 'emailTemplates.welcomeEmail.willSendSimulatedThreats',
    defaultMessage:
      'Hoxhunt will send you simulated threats that look like malicious emails. Your task is to report all suspicious emails that you receive in your inbox. When you report a Hoxhunt simulated threat you will be rewarded in the training.',
    description:
      'Short text telling briefly how the training works, how you participate and that you are rewarded within the training.',
  },
  welcomeEmailFirstSimulatedThreat: {
    id: 'emailTemplates.welcomeEmail.firstSimulatedThreat',
    defaultMessage: 'Start by reporting your first simulated threat',
    description:
      'Instruction text, what is the first thing to do in the training.',
  },
  welcomeEmailOpenEmail: {
    id: 'emailTemplates.welcomeEmail.openEmail',
    defaultMessage:
      '1. Find the email titled “DHL Shipping Notification: 796689711” from your inbox.',
    description:
      'First of two steps on how to report the first simulated threat.',
  },
  welcomeEmailReportEmail: {
    id: 'emailTemplates.welcomeEmail.reportEmail',
    defaultMessage:
      '2. Report the email with the "Report this email" Hoxhunt button.',
    description:
      'Second of two steps on how to report the first simulated threat.',
  },
  firstQuestBannerSimulatedThreat: {
    id: 'emailTemplates.firstQuestBanner.simulatedThreat',
    defaultMessage: 'This is a simulated threat',
    description:
      'Information text at the banner of an email to tell the user this is a simulated threat/email.',
  },
  firstQuestBannerOpenEmail: {
    id: 'emailTemplates.firstQuestBanner.openEmail',
    defaultMessage:
      '1. Open email with the title “DHL Shipping Notification: 796689711”.',
    description:
      'First step of instructions for the user how to report the email. Followed by the second step.',
  },
  firstQuestBannerReportEmail: {
    id: 'emailTemplates.firstQuestBanner.reportEmail',
    defaultMessage:
      '2. Click the “Report this email” button from your email client.',
    description:
      'Second and last step of instructions for the user on how to report the email.',
  },
  knowledgeBaseQuestionsLink: {
    id: 'emailTemplates.general.knowledgeBaseQuestionsLink',
    defaultMessage: 'Questions or need help?',
    description:
      'Text for a link that leads to knowledge base, where the user can find helpful information when running into trouble',
  },
  emailGreetingHappyHunting: {
    id: 'emailTemplates.general.happyHuntingGreeting',
    defaultMessage: 'Happy hunting!',
    description: 'Greetings text at the end of an email.',
  },
  welcomeEmailSubject: {
    id: 'emailTemplates.welcomeEmail.subject',
    defaultMessage: '{firstName}, now your Hoxhunt training begins',
    description: 'Subject for the welcome email, that a new user receives.',
  },
  promotionSubject: {
    id: 'emailTemplates.promotionEmail.subject2',
    defaultMessage: '{organization} invites you to Hoxhunt',
    description:
      'Subject of an invitation email that encourages the user to start Hoxhunt training.',
  },
});
