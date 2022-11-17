import { ELicenseSet } from '@server/domains/admin/licenses/lib/listAll.models';
import { Decorators, Factory } from '@server/lib/typedSimpleSchema';
import {
  INTERNET_SAFETY_CHALLENGE,
  LABS,
  NO_WELCOME_EMAIL,
  PASSWORDS_CHALLENGE,
  REMOTE_WORK_CHALLENGE,
  SOCIAL_MEDIA_CHALLENGE,
  UNFAMILIAR_VISITOR_CHALLENGE,
  UNKNOWN_DEVICES,
} from '@server/tags/features';

import BaseSchema from '../Base';
import { FeatureTag, ITag, Tag } from '../Tag';

import * as OrgModels from './models';
import { OrgAggregates } from './OrgAggregates';
import { OrgApiSettings } from './OrgApiSettings';
import { OrgAutomaticEnrollmentSettingsSchema } from './OrgAutomaticEnrollmentSettings';
import { OrgDeliverySchema } from './OrgDelivery';
import { OrgDomainSchema } from './OrgDomainConfig';
import OrgEmailDomainMapping from './OrgEmailDomainMapping';
import OrgGame from './OrgGame';
import { OrgImagesSchema } from './OrgImages';
import { IncidentSettings } from './OrgIncidentSettings';
import { OrgLicenseSetSettings } from './OrgLicenseSetSettings';
import { OrgNotificationsSchema } from './OrgNotifications';
import { OrgPlugin } from './OrgPlugin';
import { OrgPluginRedirectSchema } from './OrgPluginRedirect';
import { OrgQuizSettingsSchema } from './OrgQuizSettings';
import { OrgResultsSchema } from './OrgResults';
import { OrgScimSchema } from './OrgScim';
import { OrgSSOSettingsSchema } from './OrgSSOSettings';
import { OrgThreatSettingsSchema } from './OrgThreatSettings';

const DEFAULT_FEATURE_NAMES = [
  LABS,
  PASSWORDS_CHALLENGE,
  UNKNOWN_DEVICES,
  SOCIAL_MEDIA_CHALLENGE,
  REMOTE_WORK_CHALLENGE,
  UNFAMILIAR_VISITOR_CHALLENGE,
  INTERNET_SAFETY_CHALLENGE,
  NO_WELCOME_EMAIL,
];

const DEFAULT_FEATURES = DEFAULT_FEATURE_NAMES.map(featureName => ({
  categoryName: 'features' as const,
  name: featureName,
}));

export default class Organization
  extends BaseSchema
  implements OrgModels.IOrganization
{
  @Decorators.simpleSchema({
    type: String,
    optional: false,
    min: 2,
    max: 128,
  })
  public name: string;

  @Decorators.simpleSchema({
    type: String,
    optional: true,
    allowedValues: Object.values(OrgModels.EOrgRegion),
  })
  public region: OrgModels.EOrgRegion;

  @Decorators.simpleSchema({
    type: String,
    // TODO(PS): Change once migration is done
    optional: true,
    allowedValues: Object.values(OrgModels.EOrgEmailEnvironment),
  })
  public emailEnvironment?: OrgModels.EOrgEmailEnvironment;

  @Decorators.simpleSchema({
    type: Array,
    defaultValue: [],
  })
  @Decorators.elementType(OrgEmailDomainMapping)
  public emailDomainMappings: OrgModels.IEmailDomainMapping[];

  @Decorators.simpleSchema({
    type: Array,
    defaultValue: [],
  })
  @Decorators.elementType(OrgDomainSchema)
  public domains: OrgModels.IDomain[];

  @Decorators.simpleSchema({
    type: OrgDeliverySchema,
    defaultValue: {},
  })
  public delivery: OrgModels.IDelivery;

  @Decorators.simpleSchema({
    type: OrgGame,
    defaultValue: {},
  })
  public game: OrgModels.IOrgGame;

  @Decorators.simpleSchema({
    type: OrgImagesSchema,
    defaultValue: {},
  })
  public images: OrgModels.IImages;

  @Decorators.simpleSchema({
    type: OrgResultsSchema,
    defaultValue: {},
  })
  public results: OrgModels.IResults;

  @Decorators.simpleSchema({
    type: OrgPluginRedirectSchema,
    defaultValue: {},
  })
  public pluginRedirect: OrgModels.IPluginRedirect;

  @Decorators.simpleSchema({
    type: OrgPlugin,
    defaultValue: {},
  })
  public plugin: OrgModels.IPlugin;

  @Decorators.simpleSchema({
    type: Object,
    blackbox: true,
    defaultValue: {},
  })
  public stats: {};

  @Decorators.simpleSchema({
    type: OrgSSOSettingsSchema,
    defaultValue: {},
  })
  public sso: OrgModels.ISSOSettings;

  @Decorators.simpleSchema({
    type: OrgNotificationsSchema,
    defaultValue: {},
  })
  public notifications: OrgModels.INotifications;

  @Decorators.simpleSchema({
    type: Array,
    defaultValue: [],
  })
  @Decorators.elementType(Tag)
  public tags: ITag[] = [];

  @Decorators.simpleSchema({
    type: Array,
    defaultValue: DEFAULT_FEATURES,
  })
  @Decorators.elementType(FeatureTag)
  public features: Array<ITag<'features'>> = DEFAULT_FEATURES;

  @Decorators.simpleSchema({
    type: Array,
    defaultValue: [],
  })
  @Decorators.elementType(Tag)
  public tagBlacklist: ITag[] = [];

  @Decorators.simpleSchema({
    type: Array,
    defaultValue: [],
  })
  @Decorators.elementType(Tag)
  public spicyModeTagBlacklist: ITag[] = [];

  @Decorators.simpleSchema({
    type: Boolean,
    defaultValue: true,
  })
  public sendThreatFeedback = true;

  @Decorators.simpleSchema({
    type: Boolean,
    defaultValue: true,
  })
  public askNPSSurvey = true;

  @Decorators.simpleSchema({
    type: IncidentSettings,
    defaultValue: {},
  })
  public incidentSettings: OrgModels.IIncidentSettings;

  @Decorators.simpleSchema({
    type: OrgThreatSettingsSchema,
    defaultValue: {},
  })
  public threatSettings: OrgModels.IThreatSettings;

  @Decorators.simpleSchema({
    type: OrgApiSettings,
    defaultValue: {},
  })
  public apiSettings: OrgApiSettings;

  @Decorators.simpleSchema({
    type: OrgScimSchema,
    optional: true,
  })
  public scim: OrgModels.IOrgScim;

  @Decorators.simpleSchema({
    type: OrgQuizSettingsSchema,
    defaultValue: {},
  })
  public quizSettings: OrgModels.IQuizSettings;

  @Decorators.simpleSchema({
    type: OrgAutomaticEnrollmentSettingsSchema,
    optional: true,
  })
  public automaticEnrollmentSettings: OrgModels.IAutomaticEnrollmentSettings;

  @Decorators.simpleSchema({
    type: Boolean,
    defaultValue: true,
    optional: true,
  })
  public hideZendeskWidget = true;

  @Decorators.simpleSchema({
    type: OrgAggregates,
    defaultValue: {},
  })
  public aggregates: OrgModels.IOrgAggregates;

  @Decorators.simpleSchema({
    type: Date,
    optional: true,
  })
  public onboardingStartedAt: Date;

  @Decorators.simpleSchema({
    type: Date,
    optional: true,
  })
  public onboardingCompletedAt: Date;

  @Decorators.simpleSchema({
    type: Array,
    defaultValue: Object.values(ELicenseSet).reduce(
      (acc, setName) => acc.concat({ setName, isEnabled: false }),
      [] as OrgModels.ILicenseSetSettings[]
    ),
  })
  @Decorators.elementType(OrgLicenseSetSettings)
  public licenseSettings: OrgModels.ILicenseSetSettings[];
}

export const OrganizationSchema = Factory.simpleSchemaFactory(
  Organization.prototype
);
