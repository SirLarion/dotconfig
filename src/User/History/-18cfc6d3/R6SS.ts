import { LoadingQuery } from '../../../../components/LoadingQuery';

import { IIncidentSettingsQueryOrg } from './models';

interface IQueryData {
  organizations: IIncidentSettingsQueryOrg[];
}

interface IQueryVariables {
  organizationId: string;
}

export class OrgIncidentSettingsQuery extends LoadingQuery<
  IQueryData,
  IQueryVariables
> {}
