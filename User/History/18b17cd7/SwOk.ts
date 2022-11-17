import {
  IIncidentSettingsQueryOrg,
  IQueryThresholdPolicySettings,
} from './models';
import { Mutation } from '../../../../utils/apollo';

interface IMutationData {
  organizations: IIncidentSettingsQueryOrg[];
}

interface IMutationVariables {
  organizationId: string;
  policySettings: IQueryThresholdPolicySettings;
}

export class OrgThresholdPolicySettingsMutation extends Mutation<
  IMutationData,
  IMutationVariables
> {}
