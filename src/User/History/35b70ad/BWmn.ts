import { LoadingQuery } from '../../../../components/LoadingQuery';

import { IDomainQueryOrg } from './models';

interface IQueryData {
  organizations: IDomainQueryOrg[];
}

interface IQueryVariables {
  organizationId: string;
}

export class OrgDomainQuery extends LoadingQuery<IQueryData, IQueryVariables> {}
