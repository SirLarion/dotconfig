import { useMemo } from 'react';
import * as R from 'ramda';

import { IRecommendationDatum } from '../models';
import { dateToISODate /*getDateOrYesterday*/ } from '../utils/date';

import { useQueryState } from './useQueryState';
import {
  useGetTopRecommendationsQuery,
  GetTopRecommendationsQuery,
} from './__generated__/query.generated';

type TQueryResults = GetTopRecommendationsQuery;

const mapResultsToRecommendations = (
  data?: TQueryResults
): IRecommendationDatum[] =>
  R.pipe(
    R.pathOr([], ['cube', 'edges']),
    R.map(edge => {
      const node: Partial<IRecommendationDatum> = R.propOr({}, 'node', edge);
      if (node.flag && node.recommendation) {
        return {
          organizationId: node.organizationId || '',
          department: node.department || '',
          timestamp: node.timestamp || dateToISODate(new Date()),
          country: node.country || '',
          flag: node.flag,
          flagCause: node.flagCause || '',
          causeMagnitude: node.causeMagnitude || 0,
          flagEffect: node.flagEffect || '',
          effectMagnitude: node.effectMagnitude || 0,
          recommendation: node.recommendation,
        } as IRecommendationDatum;
      } else {
        return {} as IRecommendationDatum;
      }
    }),
    R.reject(R.isEmpty)
  )(data);

const takeTopRecommendations = (
  data: IRecommendationDatum[],
  amount: number
): IRecommendationDatum[] =>
  // gotta love ramda typing
  R.pipe<
    IRecommendationDatum[],
    IRecommendationDatum[],
    IRecommendationDatum[]
  >(
    R.filter(
      (d: IRecommendationDatum) => d.country !== '' || d.department !== ''
    ),
    R.take(amount)
  )(data);

export const usePrioritizedRecommendations = () => {
  // const { orgId, endDate } = useQueryState();

  // Recommendations for today have a timestamp for yesterday
  // const date = useMemo(
  //   () => dateToISODate(getDateOrYesterday(endDate)),
  //   [endDate]
  // );

  // NOTE: Queries are turned off, uncommment hook call to turn back on
  const { data, loading } = { data: undefined, loading: false };
  //  useGetTopRecommendationsQuery({
  //   variables: {
  //     orgId,
  //     date,
  //   },
  // });

  const recommendations = useMemo(
    () => mapResultsToRecommendations(data),
    [data]
  );

  const top3Recommendations = useMemo(
    () => takeTopRecommendations(recommendations, 3),
    [recommendations]
  );

  return {
    recommendations,
    top3Recommendations,
    loading,
  };
};
