import { LoadingQuery } from '../../../../components/LoadingQuery';

import { TScimSettings } from './models';

interface IQueryData {
  organizations: TScimSettings[];
  app: {
    publicSettings: {
      scimEndpoint: string;
    };
  };
}

interface IQueryVariables {
  organizationId: string;
}

export class OrgScimSettingsQuery extends LoadingQuery<
  IQueryData,
  IQueryVariables
> {}
