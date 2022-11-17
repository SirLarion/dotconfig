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

export const SaveOrganizationSettings = gql`
  mutation SaveOrgSettings($id: ID!, $organization: OrganizationInput!) {
    updateOrganization(organizationId: $id, organization: $organization) {
      _id
      ...OrganizationSettings
    }
  }
  ${OrganizationSettingsFragment}
`;

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
