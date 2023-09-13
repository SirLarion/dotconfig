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
