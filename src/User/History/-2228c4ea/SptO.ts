import { useTheme } from 'styled-components';
import { mergeDeepRight } from 'ramda';

import { TTheme } from '@hox/ui/styles/theme';

import { ANALYTICS_METRICS } from '../constants';
import { useGetOrgAnalyticsQuery } from '../graphql/__generated__/GetOrgAnalytics.generated';
import {
  extractIdAndNodes,
  getDelta,
  getDeltaSentimentByMetric,
  getGraphColorsByMetric,
  mapTimeframeToGqlVariables,
  nodeToDatapoint,
} from '../lib';
import { IAnalyticsQueryVariables, TGroupedAnalytics } from '../types';

import { data } from './mock.json';

export const useAnalyticsQuery = (
  paramVariables?: IAnalyticsQueryVariables
) => {
  const variables = mergeDeepRight(
    mapTimeframeToGqlVariables('month'),
    paramVariables || {}
  );
  const theme = useTheme() as TTheme;
  const colors = getGraphColorsByMetric(theme);
  const deltaSentiments = getDeltaSentimentByMetric();

  const { loading, error } = useGetOrgAnalyticsQuery({
    variables,
  });

  const { id, org } = extractIdAndNodes(data);

  const analytics: TGroupedAnalytics | undefined =
    // loading || error
    false
      ? undefined
      : ANALYTICS_METRICS.reduce(
          (acc, metric) => ({
            ...acc,
            [metric]: {
              series: [
                {
                  id,
                  style: {
                    fill: 'gradient',
                    color: colors[metric]?.base,
                  },
                  data: org.nodes.map(nodeToDatapoint(metric)),
                },
                {
                  id: 'industry',
                  style: {
                    line: 'dashed',
                    fill: 'none',
                    color: colors[metric]?.dimmed,
                  },
                  // TODO: add industry comparison data
                  data: [],
                },
              ],
              latestValue: {
                primary: org.lastNode[metric],
                // TODO: add industry comparison data
                secondary: undefined,
              },
              delta: {
                value: getDelta(
                  org.firstNode[metric] || 0,
                  org.lastNode[metric] || 0
                ),
                text: `in the last ${timeframe}`,
                sentiment: deltaSentiments[metric],
              },
            },
          }),
          {} as TGroupedAnalytics
        );

  return { analytics, loading, error };
};
