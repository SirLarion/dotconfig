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
  getDelta,
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

const getValueAdjustedSentiment = (sentiment: TTagType, value: number) => {
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
  const user = useCurrentUser();
  const industryId = user.organization.industry?._id || '';

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
  } = useGetIndustryAnalyticsQuery({ variables: { ...variables, industryId } });

  const loading = orgLoading || industryLoading;

  const error =
    orgError || industryError ? { orgError, industryError } : undefined;

  const { id, nodes } = extractIdAndNodes(orgData);
  const { nodes: industryNodes } = extractIdAndNodes(industryData);

  const getDelta = getDeltaByMetric(head(nodes), last(nodes));

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
                      data: nodes.map(nodeToDatapoint(metric)),
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
                primary: last(nodes)?.[metric],
                secondary: last(industryNodes)?.[metric],
              },
              delta: {
                value: getDelta(
                  head(nodes)?.[metric] || undefined,
                  last(nodes)?.[metric] || undefined
                ),
                text: getDeltaLabelText(timeframe),
                sentiment: getValueAdjustedSentiment(
                  deltaSentiments[metric],
                  getDelta(
                    head(nodes)?.[metric] || undefined,
                    last(nodes)?.[metric] || undefined
                  )
                ),
              },
            },
          }),
          {} as TGroupedAnalytics
        );

  return { analytics, loading, error };
};
