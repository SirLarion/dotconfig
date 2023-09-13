import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { Serie } from '@nivo/line';
import * as R from 'ramda';

import { IRiskDataPoint, IRiskScore, TRiskFactors } from '../models';
import { dateToISODate, getDateOrYesterday } from '../utils/date';
import { timestampToISO } from '../utils/graph';
import { calculateDelta } from '../utils/score';

import {
  GetTimeseriesForCountryQuery,
  GetTimeseriesForDepartmentQuery,
  GetTimeseriesForOrganizationQuery,
  GetTimeseriesForDepartmentQueryVariables,
  GetTimeseriesForOrganizationQueryVariables,
} from './__generated__/query.generated';
import { timeseriesQueries } from './types';
import { TGroupType, TRiskType, useQueryState } from './useQueryState';

////////////
// Aliases

type TQueryResults =
  | GetTimeseriesForDepartmentQuery
  | GetTimeseriesForCountryQuery
  | GetTimeseriesForOrganizationQuery;

// These two cover all cases of variables
type TQueryVars =
  | GetTimeseriesForDepartmentQueryVariables
  | GetTimeseriesForOrganizationQueryVariables;

interface ITimeseriesPoint extends Omit<IRiskDataPoint, 'score' | 'startDate'> {
  score: IRiskScore;
}

export interface IFactorsDataPoint extends TRiskFactors {
  timestamp: string;
}

type TTimeseries = ITimeseriesPoint[];

/////////////
// Helpers

const mapResultsToTimeseries = (
  results: TQueryResults | undefined,
  group: TGroupType
): TTimeseries => {
  return R.pipe(
    R.pathOr([], ['cube', 'edges']),
    R.map(edge => {
      const groupDimensionName = group === 'org' ? 'organizationId' : group;
      const dimensions = R.pathOr(undefined, ['node', 'dimensions'], edge);
      const riskScores = R.pathOr(0, ['node', 'avg'], edge);
      return {
        name: R.propOr('', groupDimensionName, dimensions),
        group,
        endDate: R.propOr('', 'timestamp', dimensions),
        score: {
          awareness: R.propOr(0, 'awarenessRisk', riskScores),
          behavior: R.propOr(0, 'behaviorRisk', riskScores),
          attack: R.propOr(0, 'attackRisk', riskScores),
          total: R.propOr(0, 'totalRisk', riskScores),
        },
      } as ITimeseriesPoint;
    })
  )(results);
};

// Nivo expects Serie[] instead of Serie, thus - array
const mapTimeseriesToGraphableData = (
  data: TTimeseries,
  riskType: TRiskType
): Serie[] => {
  const serie = {
    id: data[0]?.name || '',
    data: data.map(({ score, endDate }) => ({
      x: timestampToISO(endDate),
      y: score[riskType],
    })),
  };
  return !R.isEmpty(data) ? [serie] : [];
};

const toMergedSerie = (series: Serie[]) =>
  R.reduce(
    R.mergeWith(R.ifElse(Array.isArray, R.concat, R.identity)),
    {} as Serie,
    series
  );

const mapResultsToFactors = (
  data: TQueryResults | undefined
): IFactorsDataPoint[] => {
  return R.pipe(
    R.pathOr([], ['cube', 'edges']),
    R.map(edge => {
      const timestamp: string = R.pathOr(
        '',
        ['node', 'dimensions', 'timestamp'],
        edge
      );
      const riskFactors = R.pipe(
        R.pathOr({}, ['node', 'avg']),
        R.dissoc('__typename'),
        R.dissoc('totalRisk')
      )(edge) as TRiskFactors;
      return { timestamp, ...riskFactors };
    })
  )(data);
};

const mapFactorsToSeries = (factors: IFactorsDataPoint[]) => {
  return R.pipe(
    R.map((factorsData: IFactorsDataPoint) => {
      const timestamp = factorsData.timestamp;
      return R.pipe(
        R.dissoc('timestamp'),
        R.mapObjIndexed((value, key) => ({
          id: key,
          data: [{ x: timestampToISO(timestamp), y: value }],
        })),
        R.values
      )(factorsData) as Serie[];
    }),
    R.flatten,
    R.groupBy(R.propOr('', 'id')),
    R.values,
    R.map(toMergedSerie)
  )(factors);
};

const getQueriesForGroup = (group: TGroupType, riskType: TRiskType) => ({
  baseQuery: timeseriesQueries['total'][group],
  factorsQuery: timeseriesQueries[riskType][group],
});

const getNthScore = (n: number, data: TTimeseries) =>
  R.pipe<TTimeseries, ITimeseriesPoint | undefined, IRiskScore | undefined>(
    R.nth(n),
    R.propOr(undefined, 'score')
  )(data);

const getScoreBy = (
  type: 'min' | 'max',
  riskType: TRiskType,
  data: TTimeseries
) => {
  const fn = type === 'min' ? R.min : R.max;
  const value = type === 'min' ? Infinity : 0;
  return R.pipe(
    R.map(t => R.pathOr(value, ['score', riskType], t)),
    R.reduce(fn, value) as (n: number[]) => number
  )(data);
};

const isNoName: (name?: string) => boolean = R.or(R.isNil, R.isEmpty);

/////////
// Hook

export const useRiskTimeseries = (group: TGroupType, name?: string) => {
  const { startDate, endDate, riskType, orgId } = useQueryState();

  const realEndDate = useMemo(() => getDateOrYesterday(endDate), [endDate]);

  const startString = useMemo(() => dateToISODate(startDate), [startDate]);
  const endString = useMemo(() => dateToISODate(realEndDate), [realEndDate]);

  /*const { baseQuery, factorsQuery } = */ useMemo(
    () => getQueriesForGroup(group, riskType),
    [group, riskType]
  );

  // const variables = {
  //   name: name || '',
  //   org: orgId,
  //   startDate: startString,
  //   endDate: endString,
  // };

  const {
    data,
    loading,
    error,
    refetch: fetchMore,
  } = { data: undefined, loading: false, error: null, refetch: null };
  // useQuery<TQueryResults, TQueryVars>(baseQuery, {
  //   variables,
  //   skip: isNoName(name) && group !== 'org',
  // });

  const {
    data: factorsData,
    loading: factorsLoading,
    error: factorsError,
  } = { data: undefined, loading: false, error: null };
  // useQuery<TQueryResults, TQueryVars>(factorsQuery, {
  //   variables,
  //   skip: riskType === 'total',
  // });

  const timeseriesData = useMemo(
    () => (!loading && !error ? mapResultsToTimeseries(data, group) : []),
    [loading, error, data, group]
  );

  const timeseriesGraphData = useMemo(
    () =>
      !loading && !error
        ? mapTimeseriesToGraphableData(timeseriesData, riskType)
        : [],
    [loading, error, timeseriesData, riskType]
  );

  const factors = useMemo(
    () =>
      !factorsLoading && !factorsError
        ? mapResultsToFactors(riskType === 'total' ? data : factorsData)
        : [],
    [data, factorsData, factorsError, factorsLoading, riskType]
  );

  const factorsGraphData = useMemo(
    () => (!factorsLoading && !factorsError ? mapFactorsToSeries(factors) : []),
    [factors, factorsError, factorsLoading]
  );

  const minScore = useMemo(
    () => getScoreBy('min', riskType, timeseriesData),
    [riskType, timeseriesData]
  );
  const maxScore = useMemo(
    () => getScoreBy('max', riskType, timeseriesData),
    [riskType, timeseriesData]
  );

  const startScore = useMemo(
    () => getNthScore(0, timeseriesData)?.[riskType],
    [riskType, timeseriesData]
  );
  const endScore = useMemo(
    () => getNthScore(-1, timeseriesData)?.[riskType],
    [riskType, timeseriesData]
  );

  const latest: IRiskDataPoint = useMemo(
    () => ({
      name: name || orgId || '',
      group,
      score: endScore,
      delta: endScore && calculateDelta(startScore || 0, endScore),
      startDate: startString,
      endDate: endString,
      loading,
    }),
    [startScore, endScore, startString, endString, group, name, orgId, loading]
  );

  return {
    timeseriesGraphData,
    factorsGraphData,
    fetchMore,
    minScore,
    maxScore,
    startScore,
    endScore,
    latest,
    loading,
    factorsLoading,
  };
};
