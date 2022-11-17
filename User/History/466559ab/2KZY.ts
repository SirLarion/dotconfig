import { AgendaJobs, IAgendaJob } from '@server/collections/agendaJobs';
import {
  AnalyticsEvents,
  IAnalyticsEvent,
} from '@server/collections/analyticsEvents';
import { ClientInfos, IClientInfo } from '@server/collections/clientInfos';
import {
  DistributedLocks,
  IDistributedLock,
} from '@server/collections/distributedLocks';
import { EmailRecords, IEmailRecord } from '@server/collections/emailRecord';
import { FeedbackRules } from '@server/collections/feedbackRules';
import { Fingerprints } from '@server/collections/Fingerprints';
import {
  GmailAddonExecutionStates,
  IGmailAddonExecutionState,
} from '@server/collections/gmailAddonExecutionState';
import { HuntingSearchJobResults } from '@server/collections/huntingSearchJobResults';
import { HuntingSearchJobs } from '@server/collections/huntingSearchJobs';
import { IIncidentBeta, IncidentsBeta } from '@server/collections/incidentBeta';
import { Industries } from '@server/collections/industry';
import { IMarker, Markers } from '@server/collections/markers';
import { Migrations } from '@server/collections/migrations';
import { NpsAnswers } from '@server/collections/npsAnswers';
import {
  IOneTimePassword,
  OneTimePasswords,
} from '@server/collections/oneTimePassword';
import { OrganizationOnboardingTasks } from '@server/collections/organizationOnboardingTasks';
import {
  IOrganization,
  Organizations,
} from '@server/collections/organizations';
import {
  IOrganizationTrainingRule,
  OrganizationTrainingRules,
} from '@server/collections/organizationTrainingRules';
import { IPlugin, Plugins } from '@server/collections/plugins';
import { Quests } from '@server/collections/quests';
import { QuestTemplates } from '@server/collections/questTemplates';
import { QuizModules } from '@server/collections/quizModule';
import { QuizTemplates } from '@server/collections/quizTemplate';
import { RefreshTokens } from '@server/collections/refreshTokens/collection';
import { TaskGroups } from '@server/collections/taskGroups';
import { Tasks } from '@server/collections/tasks';
import {
  ThreatObservables,
  TThreatObservable,
} from '@server/collections/threatObservables';
import {
  IThreatResource,
  ThreatResources,
} from '@server/collections/threatResources';
import { IThreat, Threats } from '@server/collections/threats';
import {
  IThreatSimilarityGroup,
  ThreatSimilarityGroups,
} from '@server/collections/threatSimilarityGroups';
import { TrainingPackages } from '@server/collections/trainingPackages';
import { Translations } from '@server/collections/translations';
import {
  IUserFeedback,
  UserFeedbacks,
} from '@server/collections/userFeedbacks';
import { Users } from '@server/collections/users';
import { Vectors } from '@server/collections/vectors';
import { TCollection } from '@server/domains/collection/lib/mongo/collection';
import {
  IFingerprint,
  INpsAnswer,
  IQuizModule,
  IQuizTemplate,
  IRefreshToken,
} from '@server/lib/typedSchemas';
import { IFeedbackRule } from '@server/lib/typedSchemas/FeedbackRule/models';
import { IHuntingSearchJob } from '@server/lib/typedSchemas/HuntingSearchJob/models';
import { IHuntingSearchJobResult } from '@server/lib/typedSchemas/HuntingSearchJobResult/models';
import {
  IIndustry,
  Industry,
} from '@server/lib/typedSchemas/Industry/Industry';
import { IMigration } from '@server/lib/typedSchemas/Migration/Migration';
import { IOrganizationOnboardingTask } from '@server/lib/typedSchemas/OrganizationOnboarding/OrganizationOnboardingTask';
import { IQuest } from '@server/lib/typedSchemas/Quest/Quest';
import { IQuestTemplate } from '@server/lib/typedSchemas/QuestTemplate/QuestTemplate';
import { ITask } from '@server/lib/typedSchemas/Task/models';
import { ITaskGroup } from '@server/lib/typedSchemas/TaskGroup/models';
import { ITrainingPackage } from '@server/lib/typedSchemas/TrainingPackage/TrainingPackage';
import { ITranslation } from '@server/lib/typedSchemas/Translation/Translation';
import { IUser } from '@server/lib/typedSchemas/User/User';
import { IVector } from '@server/lib/typedSchemas/Vector/models';

export type TCollectionSchema<R> = R extends TCollection<infer U> ? U : unknown;
export type TCollectionSchemas = TCollectionSchema<
  ICollections[keyof ICollections]
>;

export interface ICollections {
  agendaJob: TCollection<IAgendaJob>;
  analyticsEvent: TCollection<IAnalyticsEvent>;
  threatObservable: TCollection<TThreatObservable>;
  translation: TCollection<ITranslation>;
  questTemplate: TCollection<IQuestTemplate>;
  threat: TCollection<IThreat>;
  user: TCollection<IUser>;
  quest: TCollection<IQuest>;
  quizTemplate: TCollection<IQuizTemplate>;
  quizModule: TCollection<IQuizModule>;
  marker: TCollection<IMarker>;
  organizationOnboardingTask: TCollection<IOrganizationOnboardingTask>;
  organization: TCollection<IOrganization>;
  organizationTrainingRule: TCollection<IOrganizationTrainingRule>;
  industry: TCollection<IIndustry>;
  vector: TCollection<IVector>;
  fingerprint: TCollection<IFingerprint>;
  task: TCollection<ITask<any, any>>;
  taskGroup: TCollection<ITaskGroup>;
  threatSimilarityGroup: TCollection<IThreatSimilarityGroup>;
  incidentBeta: TCollection<IIncidentBeta>;
  clientInfo: TCollection<IClientInfo>;
  plugin: TCollection<IPlugin>;
  distributedLock: TCollection<IDistributedLock>;
  oneTimePassword: TCollection<IOneTimePassword>;
  emailRecord: TCollection<IEmailRecord>;
  huntingSearchJob: TCollection<IHuntingSearchJob>;
  huntingSearchJobResult: TCollection<IHuntingSearchJobResult>;
  npsAnswer: TCollection<INpsAnswer>;
  threatResource: TCollection<IThreatResource>;
  migrations: TCollection<IMigration>;
  gmailAddonExecutionState: TCollection<IGmailAddonExecutionState>;
  feedbackRule: TCollection<IFeedbackRule>;
  userFeedback: TCollection<IUserFeedback>;
  refreshToken: TCollection<IRefreshToken>;
  trainingPackage: TCollection<ITrainingPackage>;
}

// Exported for test access for now
export const collections: ICollections = {
  agendaJob: AgendaJobs,
  analyticsEvent: AnalyticsEvents,
  threatObservable: ThreatObservables,
  translation: Translations,
  questTemplate: QuestTemplates,
  threat: Threats,
  user: Users,
  quest: Quests,
  quizTemplate: QuizTemplates,
  quizModule: QuizModules,
  marker: Markers,
  organization: Organizations,
  organizationTrainingRule: OrganizationTrainingRules,
  organizationOnboardingTask: OrganizationOnboardingTasks,
  industry: Industries,
  vector: Vectors,
  fingerprint: Fingerprints,
  task: Tasks,
  taskGroup: TaskGroups,
  threatSimilarityGroup: ThreatSimilarityGroups,
  incidentBeta: IncidentsBeta,
  clientInfo: ClientInfos,
  plugin: Plugins,
  distributedLock: DistributedLocks,
  oneTimePassword: OneTimePasswords,
  emailRecord: EmailRecords,
  huntingSearchJob: HuntingSearchJobs,
  huntingSearchJobResult: HuntingSearchJobResults,
  npsAnswer: NpsAnswers,
  threatResource: ThreatResources,
  migrations: Migrations,
  gmailAddonExecutionState: GmailAddonExecutionStates,
  feedbackRule: FeedbackRules,
  userFeedback: UserFeedbacks,
  refreshToken: RefreshTokens,
  trainingPackage: TrainingPackages,
};
