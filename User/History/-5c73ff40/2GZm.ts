import { LoadingQuery } from '../../../../components/LoadingQuery';

import { IQueryOrg } from './models';
import { Mutation } from '../../../../utils/apollo';

interface IQueryData {
  _id: string;
  organizations: IQueryOrg[];
}

interface IQueryVariables {
  organizationId: string;
}

export class OrganizationSettingsQuery extends LoadingQuery<
  IQueryData,
  IQueryVariables
> {}

interface ISaveOrganizationSettingsMutationData {
  updateOrganization: IQueryData;
}

interface ISaveOrganizationSettingsMutationVariables {
  organization: Partial<IQueryOrg>;
}

export class OrganizationSettingsMutation extends Mutation<
  ISaveOrganizationSettingsMutationData,
  ISaveOrganizationSettingsMutationVariables
> {}
