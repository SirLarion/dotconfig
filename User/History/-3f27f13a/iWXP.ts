import { useCallback, useEffect, useMemo, useState } from 'react';
import { Serie } from '@nivo/line';
import * as R from 'ramda';

import { TGroupType, useQueryState } from '../../../hooks/useQueryState';
import { useRiskTimeseries } from '../../../hooks/useRiskTimeseries';
import {
  getGraphMaxScore,
  getGraphSerieIDs,
  graphableDataLength,
} from '../../../utils/graph';

type TVariables = {
  group: TGroupType;
  name: string | undefined;
};

const FETCHED_DATAPOINTS_PER_ITERATION = 2;

// Compare current data iteration to full dataset and get the next iteration
const getNextIterationData = (currentData: Serie[], fullData: Serie[]) => {
  return fullData.map(fullSerie => {
    const currentSerie = R.find(R.propEq('id', fullSerie.id), currentData);
    return {
      ...fullSerie,
      data: R.slice(
        0,
        FETCHED_DATAPOINTS_PER_ITERATION +
          (currentSerie ? currentSerie.data.length : 0),
        fullSerie.data
      ),
    };
  });
};

// Helper hook to fetch data for all selected members of the chosen group
// (or whole org if nothing selected)
const useFullGraphData = () => {
  const { selection, group, orgId, riskType, startDate, endDate } =
    useQueryState();

  const getVariables = useCallback(
    (name?: string): TVariables =>
      group && selection && name
        ? { group, name }
        : { group: 'org', name: orgId },
    [group, orgId, selection]
  );

  const initial = getVariables(selection?.[0]);

  const {
    timeseriesGraphData,
    factorsGraphData,
    fetchMore,
    loading: serieLoading,
    factorsLoading,
    latest: latestSelected,
  } = useRiskTimeseries(initial.group, initial.name);

  const [data, setData] = useState(timeseriesGraphData);
  const [cacheQueryState, setCacheQueryState] = useState({
    riskType,
    startDate,
    endDate,
  });

  const serieIDs = useMemo(() => getGraphSerieIDs(data), [data]);

  const nextSelected = useMemo(
    () => R.head(R.without(serieIDs, selection || [])),
    [serieIDs, selection]
  );

  const deselected = useMemo(
    () => R.without(selection || [], serieIDs),
    [serieIDs, selection]
  );

  const isAllFetched = useMemo(
    () => R.equals((selection || []) as string[], serieIDs),
    [selection, serieIDs]
  );

  const isUpdatedLatest = useMemo(() => {
    const latestId = R.propOr('', 'id', R.head(timeseriesGraphData));
    return R.or(
      R.isEmpty(timeseriesGraphData),
      R.or(
        R.includes(latestId, serieIDs),
        !R.includes(latestId, selection || [])
      )
    );
  }, [timeseriesGraphData, serieIDs, selection]);

  const isChangedRiskOrTime = useMemo(
    () => !R.equals({ riskType, startDate, endDate }, cacheQueryState),
    [cacheQueryState, riskType, startDate, endDate]
  );

  const fetchNextSerie = useCallback(
    () => fetchMore(getVariables(nextSelected)),
    [fetchMore, getVariables, nextSelected]
  );

  const concatSerie = useCallback(
    () => setData(R.concat(data, timeseriesGraphData)),
    [data, timeseriesGraphData]
  );

  const removeDeselectedSeries = useCallback(() => {
    setData(R.filter(s => !R.includes(s.id, deselected), data));
  }, [data, deselected]);

  const cleanCache = useCallback(() => {
    setData([]);
    setCacheQueryState({ riskType, startDate, endDate });
  }, [riskType, startDate, endDate]);

  // Fetch data for all selected units iteratively
  useEffect(() => {
    // riskType or timeframe has changed
    if (isChangedRiskOrTime) {
      cleanCache();
    }

    // something has been deselected
    if (!R.isEmpty(deselected)) {
      removeDeselectedSeries();
    }

    // setData hasn't been called after fetching new serie
    if (!serieLoading && !isUpdatedLatest) {
      concatSerie();
    }

    // all series have not been fetched
    if (!serieLoading && !isAllFetched) {
      fetchNextSerie();
    }
  }, [
    isUpdatedLatest,
    isChangedRiskOrTime,
    serieLoading,
    isAllFetched,
    deselected,
    concatSerie,
    removeDeselectedSeries,
    cleanCache,
    fetchNextSerie,
  ]);

  return {
    data,
    factors: factorsGraphData,
    loading: !isAllFetched || factorsLoading,
    latestSelected,
  };
};

// Main hook

export const useHistoryGraphState = () => {
  const { selection, group } = useQueryState();

  const {
    data: fullData,
    factors,
    loading,
    latestSelected,
  } = useFullGraphData();

  const maxScore = useMemo(() => getGraphMaxScore(fullData), [fullData]);

  // Don't animate on initial page open
  const [cacheData, setCacheData] = useState<Serie[]>(fullData);

  const isNotUpdated = useMemo(
    () =>
      group &&
      selection &&
      !loading &&
      !R.eqBy(graphableDataLength, cacheData, fullData),
    [cacheData, fullData, group, loading, selection]
  );

  useEffect(() => {
    if (isNotUpdated) {
      const nextIteration = getNextIterationData(cacheData, fullData);

      // Set timeout only if there's more data to get from hook
      if (!R.eqBy(graphableDataLength, cacheData, nextIteration)) {
        setTimeout(() => {
          setCacheData(nextIteration);
        }, 1);
      }
    } else {
      if (!R.eqBy(graphableDataLength, cacheData, fullData)) {
        setCacheData(fullData);
      }
    }
  }, [cacheData, setCacheData, fullData, isNotUpdated]);

  return {
    cacheData,
    factors,
    latestSelected,
    maxScore,
    loading,
  };
};
