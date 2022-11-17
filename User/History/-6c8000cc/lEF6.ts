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
    country: GET_TIMESERIES_FOR_COUNTRY,
    department: GET_TIMESERIES_FOR_DEPARTMENT,
    org: GET_TIMESERIES_FOR_ORG,
  },
  awareness: {
    country: GET_AWARENESS_TIMESERIES_FOR_COUNTRY,
    department: GET_AWARENESS_TIMESERIES_FOR_DEPARTMENT,
    org: GET_AWARENESS_TIMESERIES_FOR_ORG,
  },
  behavior: {
    country: GET_BEHAVIOR_TIMESERIES_FOR_COUNTRY,
    department: GET_BEHAVIOR_TIMESERIES_FOR_DEPARTMENT,
    org: GET_BEHAVIOR_TIMESERIES_FOR_ORG,
  },
  attack: {
    country: GET_ATTACK_TIMESERIES_FOR_COUNTRY,
    department: GET_ATTACK_TIMESERIES_FOR_DEPARTMENT,
    org: GET_ATTACK_TIMESERIES_FOR_ORG,
  },
};
