import { IIncidentSettingsQueryOrg, IQueryIncidentSettings } from './models';
import { Mutation } from '../../../../utils/apollo';

interface IMutationData {
  organizations: IIncidentSettingsQueryOrg[];
}

interface IMutationVariables {
  organizationId: string;
  incidentSettings: IQueryIncidentSettings;
}

export class OrgIncidentSettingsMutation extends Mutation<
  IMutationData,
  IMutationVariables
> {}
