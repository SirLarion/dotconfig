  fragment AggregateFunction on dailyOnboardedUserTotalRiskScoreCubeAggregateAggregate {
    avg {
      awarenessRisk
      behaviorRisk
      attackRisk
      totalRisk
    }
  }

  fragment AggregateAwarenessFunction on dailyOnboardedUserAwarenessRiskScoreCubeAggregateAggregate {
    avg {
      inactivityRisk
      missRisk
      failRisk
      markerRisk
    }
  }

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

  fragment AggregateAttackFunction on dailyUserAttackRiskScoreCubeAggregateAggregate {
    avg {
      miscellaneous
      maliciousFiles
      maliciousUrl
      impersonationEmail
    }
  }

  fragment UserCount on dailyOnboardedUserTotalRiskScoreCubeAggregateAggregate {
    countDistinct {
      userId
    }
  }

  fragment PageInfo on dailyOnboardedUserTotalRiskScoreCubeAggregateAggregateConnection {
    pageInfo {
      hasNextPage
      startCursor
      endCursor
    }
  }