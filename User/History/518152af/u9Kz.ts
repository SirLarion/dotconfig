import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import * as R from 'ramda';

import { dailyOnboardedUserTotalRiskScoreCubeAggregateOrderByFields } from '@hox/frontend-utils/types/graphql.generated';

import { TGroupUnit } from '../models';
import { dateToISODate } from '../utils/date';
import {
  GetTopRiskCountriesQuery,
  GetTopRiskDepartmentsQuery,
  GetTopRiskCountriesQueryVariables,
  GetTopRiskDepartmentsQueryVariables,
  GetTopRiskDepartmentsDocument,
  GetTopRiskCountriesDocument,
} from './__generated__/query.generated';
import { TGroupType, useQueryState } from './useQueryState';

const NULL_NAME = 'NULL';

// GQL seems to return amount -1 nodes if querying after a cursor
const OFFSET_FOR_GQL_BUG = 1;

////////////
// Aliases

type TQueryResults =
  | GetTopRiskCountriesQuery
  | GetTopRiskDepartmentsQuery
  | undefined;
type TQueryVars =
  | GetTopRiskCountriesQueryVariables
  | GetTopRiskDepartmentsQueryVariables;

type TOrder = dailyOnboardedUserTotalRiskScoreCubeAggregateOrderByFields;

interface IPageInfo {
  hasNextPage: boolean;
  startCursor?: string;
  endCursor?: string;
}

const INITIAL_PAGE_INFO: IPageInfo = {
  hasNextPage: true,
  startCursor: '',
  endCursor: '',
};

/////////////
// Helpers

const cubeMerge = R.ifElse(Array.isArray, R.concat, R.mergeRight);

const getConcatenatedResults = (
  prevData: TQueryResults,
  data: TQueryResults
): TQueryResults => {
  // assoc before merge to avoid having to mergeDeep twice, as that creates some
  // unexpected behavior
  return R.assoc(
    'cube',
    R.mergeDeepWith(cubeMerge, prevData?.cube, data?.cube),
    data
  );
};

const queryResultsToList = (
  data: TQueryResults,
  group: TGroupType
): TGroupUnit[] =>
  R.pipe(
    R.pathOr([], ['cube', 'edges']),
    R.map(edge => ({
      name: R.pathOr(NULL_NAME, ['node', 'dimensions', group], edge),
      userCount: R.pathOr(0, ['node', 'countDistinct', 'userId'], edge),
      group,
    }))
  )(data);

const isNullMember = (member: TGroupUnit) => member.name === NULL_NAME;

const getResultPageInfo = (data: TQueryResults): IPageInfo =>
  R.pathOr(
    { ...INITIAL_PAGE_INFO, hasNextPage: false },
    ['cube', 'pageInfo'],
    data
  );

const getQueryForGroup = (group: TGroupType) => {
  switch (group) {
    case 'department':
      return GetTopRiskDepartmentsDocument;
    case 'country':
      return GetTopRiskCountriesDocument;
    case 'org':
      return GetTopRiskCountriesDocument;
    default:
      return GetTopRiskCountriesDocument;
  }
};

///////////
// Hooks

export const useSortedGroupMembers = (group: TGroupType, amount: number) => {
  const { endDate, riskType, orgId } = useQueryState();
  // const endString = useMemo(() => endDate && dateToISODate(endDate), [endDate]);

  const [pageData, setPageData] = useState<TQueryResults>(undefined);
  const [pageInfo, setPageInfo] = useState(INITIAL_PAGE_INFO);

  // const query = useMemo(() => getQueryForGroup(group), [group]);

  const org = useMemo(() => orgId || '', [orgId]);

  const {
    data,
    loading: dataLoading,
    error,
    // refetch,
  } = { data: undefined, loading: false, error: null, refetch: null };
  // useQuery<TQueryResults, TQueryVars>(query, {
  //   variables: {
  //     org,
  //     date: endString,
  //     amount,
  //     order: `avg__${riskType}Risk_desc` as TOrder,
  //   },
  //   // 'dataLoading' is only updated after a refetch when this is true
  //   notifyOnNetworkStatusChange: true,

  //   // Caching is temporarily disabled for this query as there is currently no way
  //   // to tell Apollo that using i.e. GET_TOP_RISK_DEPARTMENTS vs. GET_TOP_RISK_COUNTRIES
  //   // is not the same thing
  //   fetchPolicy: 'no-cache',
  // });

  // const isPageUpdated = useMemo(
  //   () => R.eqProps('endCursor', pageInfo, getResultPageInfo(data)),
  //   [pageInfo, data]
  // );

  const fetchNext = () => data;
  // useCallback(
  //   (num?: number) => {
  //     if (dataLoading || !isPageUpdated) {
  //       return;
  //     }
  //     refetch({ cursor: pageInfo.endCursor, amount: num || amount });
  //   },
  //   [refetch, dataLoading, pageInfo, isPageUpdated, amount]
  // );

  const groupData = useMemo(
    () => queryResultsToList(pageData, group),
    [pageData, group]
  );

  const nullMember = useMemo(
    () => R.find(isNullMember, groupData),
    [groupData]
  );

  const nonNullMembers = useMemo(
    () => R.reject(isNullMember, groupData),
    [groupData]
  );

  // helper used to display loading indicators in components that use
  // the hook
  const loading = useMemo(() => {
    return (
      dataLoading ||
      (!dataLoading && nonNullMembers.length < amount && pageInfo.hasNextPage)
    );
  }, [amount, dataLoading, nonNullMembers.length, pageInfo.hasNextPage]);

  // Keep the 'finished product' empty until all 'amount' of members have been
  // fetched (if that many are available)
  const groupMembers = useMemo(
    () =>
      nonNullMembers.length >= amount || !pageInfo.hasNextPage
        ? nonNullMembers
        : [],
    [nonNullMembers, amount, pageInfo.hasNextPage]
  );

  // Clear cache when orgId, riskType or endDate is changed
  useEffect(() => {
    setPageData(undefined);
    setPageInfo(INITIAL_PAGE_INFO);
  }, [org, riskType, endDate]);

  // NOTE: Queries are turned off, uncomment the useEffect call to turn back on
  //       If possible, remove this cursed demon rather than turning back on
  // useEffect(() => {
  //   const lenMembers = nonNullMembers.length;
  //   // pageInfo is outdated => new data has been queryed
  //   if (!dataLoading && !isPageUpdated) {
  //     setPageData(getConcatenatedResults(pageData, data));
  //     setPageInfo(getResultPageInfo(data));
  //   }

  //   // Try to fetch more groupMembers if there are less than 'amount'
  //   if (!dataLoading && pageInfo.hasNextPage && lenMembers < amount) {
  //     fetchNext(amount - lenMembers + OFFSET_FOR_GQL_BUG);
  //   }
  // }, [
  //   pageData,
  //   setPageData,
  //   pageInfo,
  //   setPageInfo,
  //   data,
  //   dataLoading,
  //   amount,
  //   fetchNext,
  //   nonNullMembers.length,
  //   isPageUpdated,
  // ]);

  return {
    groupMembers,
    nullMember,
    pageInfo,
    fetchNext,
    error,
    loading,
  };
};
