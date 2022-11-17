import { gql } from '@apollo/client';

export const AGGREGATE_FUNCTION = gql`
  fragment AggregateFunction on dailyOnboardedUserTotalRiskScoreCubeAggregateAggregate {
    avg {
      awarenessRisk
      behaviorRisk
      attackRisk
      totalRisk
    }
  }
`;

export const AGGREGATE_AWARENESS_FUNCTION = gql`
  fragment AggregateAwarenessFunction on dailyOnboardedUserAwarenessRiskScoreCubeAggregateAggregate {
    avg {
      inactivityRisk
      missRisk
      failRisk
      markerRisk
    }
  }
`;

export const AGGREGATE_BEHAVIOR_FUNCTION = gql`
  fragment AggregateBehaviorFunction on dailyUserBehaviorRiskScoreCubeAggregateAggregate {
    avg {
      malwareFactor
      threatManagementFactor
      anonymousLoginFactor
      unfamiliarLocationFactor
      dataGovernanceFactor
      mcasAlertAnubisDetectionVelocityFactor
      mcasAlertAnubisDetectionNewCountryFactor
    }
  }
`;

export const AGGREGATE_ATTACK_FUNCTION = gql`
  fragment AggregateAttackFunction on dailyUserAttackRiskScoreCubeAggregateAggregate {
    avg {
      miscellaneous
      maliciousFiles
      maliciousUrl
      impersonationEmail
    }
  }
`;

export const USER_COUNT = gql`
  fragment UserCount on dailyOnboardedUserTotalRiskScoreCubeAggregateAggregate {
    countDistinct {
      userId
    }
  }
`;

export const PAGE_INFO = gql`
  fragment PageInfo on dailyOnboardedUserTotalRiskScoreCubeAggregateAggregateConnection {
    pageInfo {
      hasNextPage
      startCursor
      endCursor
    }
  }
`;
