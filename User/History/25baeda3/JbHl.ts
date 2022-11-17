//////////////////////////
// TOTAL RISK TIMESERIES

  query GetTimeseriesForDepartment(
    $name: String!
    $org: String!
    $startDate: Timestamp!
    $endDate: Timestamp!
  ) {
    cube: dailyOnboardedUserTotalRiskScoreCubeAggregate(
      filter: {
        department_eq: $name
        organizationId_eq: $org
        timestamp_gte: $startDate
        timestamp_lte: $endDate
      }
      orderBy: [dimensions__timestamp_asc]
    ) {
      edges {
        cursor
        node {
          ...AggregateFunction
          dimensions {
            department
            timestamp
          }
        }
      }
      ...PageInfo
    }
  }


  query GetTimeseriesForCountry(
    $name: String!
    $org: String!
    $startDate: Timestamp!
    $endDate: Timestamp!
  ) {
    cube: dailyOnboardedUserTotalRiskScoreCubeAggregate(
      filter: {
        country_eq: $name
        organizationId_eq: $org
        timestamp_gte: $startDate
        timestamp_lte: $endDate
      }
      orderBy: [dimensions__timestamp_asc]
    ) {
      edges {
        cursor
        node {
          ...AggregateFunction
          dimensions {
            country
            timestamp
          }
        }
      }
      ...PageInfo
    }
  }


  query GetTimeseriesForOrganization(
    $org: String!
    $startDate: Timestamp!
    $endDate: Timestamp!
  ) {
    cube: dailyOnboardedUserTotalRiskScoreCubeAggregate(
      filter: {
        organizationId_eq: $org
        timestamp_gte: $startDate
        timestamp_lte: $endDate
      }
      orderBy: [dimensions__timestamp_asc]
    ) {
      edges {
        cursor
        node {
          ...AggregateFunction
          dimensions {
            organizationId
            timestamp
          }
        }
      }
      ...PageInfo
    }
  }


//////////////////////////////
// AWARENESS RISK TIMESERIES

  query GetAwarenessTimeseriesForDepartment(
    $name: String!
    $org: String!
    $startDate: Timestamp!
    $endDate: Timestamp!
  ) {
    cube: dailyOnboardedUserAwarenessRiskScoreCubeAggregate(
      filter: {
        department_eq: $name
        organizationId_eq: $org
        timestamp_gte: $startDate
        timestamp_lte: $endDate
      }
      orderBy: [dimensions__timestamp_asc]
    ) {
      edges {
        cursor
        node {
          ...AggregateAwarenessFunction
          dimensions {
            department
            timestamp
          }
        }
      }
    }
  }


  query GetAwarenessTimeseriesForCountry(
    $name: String!
    $org: String!
    $startDate: Timestamp!
    $endDate: Timestamp!
  ) {
    cube: dailyOnboardedUserAwarenessRiskScoreCubeAggregate(
      filter: {
        country_eq: $name
        organizationId_eq: $org
        timestamp_gte: $startDate
        timestamp_lte: $endDate
      }
      orderBy: [dimensions__timestamp_asc]
    ) {
      edges {
        cursor
        node {
          ...AggregateAwarenessFunction
          dimensions {
            country
            timestamp
          }
        }
      }
    }
  }


  query GetAwarenessTimeseriesForOrganization(
    $org: String!
    $startDate: Timestamp!
    $endDate: Timestamp!
  ) {
    cube: dailyOnboardedUserAwarenessRiskScoreCubeAggregate(
      filter: {
        organizationId_eq: $org
        timestamp_gte: $startDate
        timestamp_lte: $endDate
      }
      orderBy: [dimensions__timestamp_asc]
    ) {
      edges {
        cursor
        node {
          ...AggregateAwarenessFunction
          dimensions {
            organizationId
            timestamp
          }
        }
      }
    }
  }


//////////////////////////////
// BEHAVIOR RISK TIMESERIES

  query GetBehaviorTimeseriesForDepartment(
    $name: String!
    $org: String!
    $startDate: Timestamp!
    $endDate: Timestamp!
  ) {
    cube: dailyUserBehaviorRiskScoreCubeAggregate(
      filter: {
        department_eq: $name
        organizationId_eq: $org
        timestamp_gte: $startDate
        timestamp_lte: $endDate
      }
      orderBy: [dimensions__timestamp_asc]
    ) {
      edges {
        cursor
        node {
          ...AggregateBehaviorFunction
          dimensions {
            department
            timestamp
          }
        }
      }
    }
  }

  query GetBehaviorTimeseriesForCountry(
    $name: String!
    $org: String!
    $startDate: Timestamp!
    $endDate: Timestamp!
  ) {
    cube: dailyUserBehaviorRiskScoreCubeAggregate(
      filter: {
        country_eq: $name
        organizationId_eq: $org
        timestamp_gte: $startDate
        timestamp_lte: $endDate
      }
      orderBy: [dimensions__timestamp_asc]
    ) {
      edges {
        cursor
        node {
          ...AggregateBehaviorFunction
          dimensions {
            country
            timestamp
          }
        }
      }
    }
  }


  query GetBehaviorTimeseriesForOrganization(
    $org: String!
    $startDate: Timestamp!
    $endDate: Timestamp!
  ) {
    cube: dailyUserBehaviorRiskScoreCubeAggregate(
      filter: {
        organizationId_eq: $org
        timestamp_gte: $startDate
        timestamp_lte: $endDate
      }
      orderBy: [dimensions__timestamp_asc]
    ) {
      edges {
        cursor
        node {
          ...AggregateBehaviorFunction
          dimensions {
            organizationId
            timestamp
          }
        }
      }
    }
  }


//////////////////////////////
// ATTACK RISK TIMESERIES

  query GetAttackTimeseriesForDepartment(
    $name: String!
    $org: String!
    $startDate: Timestamp!
    $endDate: Timestamp!
  ) {
    cube: dailyUserAttackRiskScoreCubeAggregate(
      filter: {
        department_eq: $name
        organizationId_eq: $org
        timestamp_gte: $startDate
        timestamp_lte: $endDate
      }
      orderBy: [dimensions__timestamp_asc]
    ) {
      edges {
        cursor
        node {
          ...AggregateAttackFunction
          dimensions {
            department
            timestamp
          }
        }
      }
    }
  }

  query GetAttackTimeseriesForCountry(
    $name: String!
    $org: String!
    $startDate: Timestamp!
    $endDate: Timestamp!
  ) {
    cube: dailyUserAttackRiskScoreCubeAggregate(
      filter: {
        country_eq: $name
        organizationId_eq: $org
        timestamp_gte: $startDate
        timestamp_lte: $endDate
      }
      orderBy: [dimensions__timestamp_asc]
    ) {
      edges {
        cursor
        node {
          ...AggregateAttackFunction
          dimensions {
            country
            timestamp
          }
        }
      }
    }
  }

  query GetAttackTimeseriesForOrganization(
    $org: String!
    $startDate: Timestamp!
    $endDate: Timestamp!
  ) {
    cube: dailyUserAttackRiskScoreCubeAggregate(
      filter: {
        organizationId_eq: $org
        timestamp_gte: $startDate
        timestamp_lte: $endDate
      }
      orderBy: [dimensions__timestamp_asc]
    ) {
      edges {
        cursor
        node {
          ...AggregateAttackFunction
          dimensions {
            organizationId
            timestamp
          }
        }
      }
    }
  }


//////////////////////////
// TOP RISK BY DIMENSION

  query GetTopRiskCountries(
    $org: String!
    $date: Timestamp!
    $amount: Int!
    $order: dailyOnboardedUserTotalRiskScoreCubeAggregateOrderByFields!
    $cursor: String
  ) {
    cube: dailyOnboardedUserTotalRiskScoreCubeAggregate(
      filter: { timestamp_eq: $date, organizationId_eq: $org }
      orderBy: [$order]
      first: $amount
      after: $cursor
    ) {
      edges {
        cursor
        node {
          ...UserCount
          ...AggregateFunction
          dimensions {
            country
          }
        }
      }
      ...PageInfo
    }
  }

  query GetTopRiskDepartments(
    $org: String!
    $date: Timestamp!
    $amount: Int!
    $order: dailyOnboardedUserTotalRiskScoreCubeAggregateOrderByFields!
    $cursor: String
  ) {
    cube: dailyOnboardedUserTotalRiskScoreCubeAggregate(
      filter: { timestamp_eq: $date, organizationId_eq: $org }
      orderBy: [$order]
      first: $amount
      after: $cursor
    ) {
      edges {
        cursor
        node {
          ...UserCount
          ...AggregateFunction
          dimensions {
            department
          }
        }
      }
      ...PageInfo
    }
  }

/////////////////////
// RECOMMENDATIONS

  query GetTopRecommendations($orgId: String!, $date: Timestamp!) {
    cube: dailyRecommendationsCube(
      filter: { timestamp_eq: $date, organizationId_eq: $orgId }
      orderBy: [priority_desc]
    ) {
      edges {
        node {
          organizationId
          department
          country
          timestamp
          flag
          flagCause
          causeMagnitude
          flagEffect
          effectMagnitude
          recommendation
          priority
        }
      }
    }
  }

/////////
// MISC

  query GetOrganizations($id: ID) {
    organizations(filter: { _id_eq: $id }, sort: [name_ASC]) {
      _id
      name
    }
  }