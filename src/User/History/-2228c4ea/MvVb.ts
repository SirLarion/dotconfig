import { useTheme } from 'styled-components';
import { head, last, mergeDeepRight } from 'ramda';

import { useCurrentUser } from '@hox/frontend-utils/hooks/useCurrentUser';
import { TTagType } from '@hox/ui/DeltaTag';
import { TTheme } from '@hox/ui/styles/theme';

import { ANALYTICS_METRICS } from '../constants';
import { useGetIndustryAnalyticsQuery } from '../graphql/__generated__/GetIndustryAnalytics.generated';
import { useGetOrgAnalyticsQuery } from '../graphql/__generated__/GetOrgAnalytics.generated';
import { getDeltaLabelText } from '../intl';
import {
  extractIdAndNodes,
  getDeltas,
  getDeltaSentimentByMetric,
  getGraphColorsByMetric,
  isMetricVisualized,
  mapTimeframeToGqlVariables,
  nodeToDatapoint,
} from '../lib';
import {
  IAnalyticsQueryVariables,
  TAnalyticsTimeframe,
  TGroupedAnalytics,
} from '../types';

const getValueAdjustedSentiment = (sentiment: TTagType, value?: number) => {
  if (!value) {
    return 'neutral';
  }

  if (sentiment === 'positive' && value < 0) {
    return 'negative';
  }

  if (sentiment === 'negative' && value < 0) {
    return 'positive';
  }

  return sentiment;
};

export const useAnalyticsQuery = (
  timeframe: TAnalyticsTimeframe,
  paramVariables?: IAnalyticsQueryVariables
) => {
  const variables = mergeDeepRight(
    mapTimeframeToGqlVariables(timeframe),
    paramVariables || {}
  );
  const theme = useTheme() as TTheme;
  const colors = getGraphColorsByMetric(theme);
  const deltaSentiments = getDeltaSentimentByMetric();

  const {
    data: orgData,
    loading: orgLoading,
    error: orgError,
  } = useGetOrgAnalyticsQuery({
    variables,
  });

  const {
    data: industryData,
    loading: industryLoading,
    error: industryError,
  } = useGetIndustryAnalyticsQuery({ variables });

  const loading = orgLoading || industryLoading;

  const error =
    orgError || industryError ? { orgError, industryError } : undefined;

  const { id, nodes: orgNodes } = extractIdAndNodes(orgData);
  const { nodes: industryNodes } = extractIdAndNodes(industryData);

  // The nodes are sorted ascending by timestamp. Thus getting the delta
  // can be done by getting the first and last node
  const getDeltaByMetric = getDeltas(head(orgNodes), last(orgNodes));

  const analytics: TGroupedAnalytics | undefined =
    loading || error
      ? undefined
      : ANALYTICS_METRICS.reduce(
          (acc, metric) => ({
            ...acc,
            [metric]: {
              series: isMetricVisualized(metric)
                ? [
                    {
                      id,
                      style: {
                        fill: 'gradient',
                        color: colors[metric]?.base,
                      },
                      data: orgNodes.map(nodeToDatapoint(metric)),
                    },
                    {
                      id: 'industry',
                      style: {
                        line: 'dashed',
                        fill: 'none',
                        color: colors[metric]?.dimmed,
                      },
                      data: industryNodes.map(nodeToDatapoint(metric)),
                    },
                  ]
                : undefined,
              latestValue: {
                primary: last(orgNodes)?.[metric],
                secondary: last(industryNodes)?.[metric],
              },
              delta: {
                value: getDeltaByMetric(metric),
                text: getDeltaLabelText(timeframe),
                sentiment: getValueAdjustedSentiment(
                  deltaSentiments[metric],
                  getDeltaByMetric(metric)
                ),
              },
            },
          }),
          {} as TGroupedAnalytics
        );

  return { analytics, loading, error, industry };
};
