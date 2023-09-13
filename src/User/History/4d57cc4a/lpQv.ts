import { IIncidentSettingsQueryOrg, IQueryPolicySettings } from './models';
import { Mutation } from '../../../../utils/apollo';

interface IMutationData {
  organizations: IIncidentSettingsQueryOrg[];
}

interface IMutationVariables {
  organizationId: string;
  policySettings: IQueryPolicySettings;
}

export class OrgIncidentPolicySettingsMutation extends Mutation<
  IMutationData,
  IMutationVariables
> {}
