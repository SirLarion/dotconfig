import { LoadingQuery } from '../../../../components/LoadingQuery';
import { Mutation } from '../../../../utils/apollo';

import { TQueryThreatSettings } from './models';

interface IMutationVariables {
  id: string;
  organization: TQueryThreatSettings;
}

interface IQueryData {
  organizations: TQueryThreatSettings[];
}

interface IQueryVariables {
  organizationId: string;
}

export class OrgThreatSettingsMutation extends Mutation<
  IQueryData,
  IMutationVariables
> {}

export class OrgThreatSettingsQuery extends LoadingQuery<
  IQueryData,
  IQueryVariables
> {}
