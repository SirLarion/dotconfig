import {
  GetTimeseriesForCountryDocument,
  GetTimeseriesForDepartmentDocument,
  GetTimeseriesForOrganizationDocument,
  GetAwarenessTimeseriesForCountryDocument,
  GetAwarenessTimeseriesForDepartmentDocument,
  GetAwarenessTimeseriesForOrganizationDocument,
  GetBehaviorTimeseriesForCountryDocument,
  GetBehaviorTimeseriesForDepartmentDocument,
  GetBehaviorTimeseriesForOrganizationDocument,
  GetAttackTimeseriesForCountryDocument,
  GetAttackTimeseriesForDepartmentDocument,
  GetAttackTimeseriesForOrganizationDocument,
} from './__generated__/query.generated';

type Query = typeof GetTimeseriesForCountryDocument;

type TGroupQueries = {
  country: Query;
  department: Query;
  org: Query;
};

type TQueryIndex = {
  total: TGroupQueries;
  awareness: TGroupQueries;
  behavior: TGroupQueries;
  attack: TGroupQueries;
};

export const timeseriesQueries: TQueryIndex = {
  total: {
    country: GetTimeseriesForCountryDocument,
    department: GetTimeseriesForDepartmentDocument,
    org: GetTimeseriesForOrganizationDocument,
  },
  awareness: {
    country: GetAwarenessTimeseriesForCountryDocument,
    department: GetAwarenessTimeseriesForDepartmentDocument,
    org: GetAwarenessTimeseriesForOrganizationDocument,
  },
  behavior: {
    country: GetBehaviorTimeseriesForCountryDocument,
    department: GetBehaviorTimeseriesForDepartmentDocument,
    org: GetBehaviorTimeseriesForOrganizationDocument,
  },
  attack: {
    country: GetAttackTimeseriesForCountryDocument,
    department: GetAttackTimeseriesForDepartmentDocument,
    org: GetAttackTimeseriesForOrganizationDocument,
  },
};
