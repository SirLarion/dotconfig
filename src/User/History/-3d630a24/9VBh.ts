import { Mutation } from '../../../../utils/apollo';
import { prop } from 'ramda';
import { omitTypeNames } from '../../../../utils/graphqlHelpers';

export interface IMutationData {
  token: string;
}

interface IMutationVariables {
  id: string;
}

export const getMutationDataFrom = (data: any): IMutationData =>
  omitTypeNames(prop('createOrganizationScimToken', data));

export class OrgScimSettingsMutation extends Mutation<
  IMutationData,
  IMutationVariables
> {}
