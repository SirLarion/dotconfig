type TGroupQueries = {
  country: DocumentNode;
  department: DocumentNode;
  org: DocumentNode;
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
