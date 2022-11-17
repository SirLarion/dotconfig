import { LoadingQuery } from '../../../../components/LoadingQuery';

import { TQueryThreatSettings } from './models';

interface IQueryData {
  organizations: TQueryThreatSettings[];
}

interface IQueryVariables {
  organizationId: string;
}

export class OrgThreatSettingsQuery extends LoadingQuery<
  IQueryData,
  IQueryVariables
> {}
