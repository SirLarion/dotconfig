import { useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';

import { QuestTemplate_sort } from '@hox/frontend-utils/types/graphql.generated';

import { usePagination } from '../../../../common/utils';
import { useEffectSkipInitial } from '../../../../hooks/useEffectSkipInitial';
import { questListState } from '../../../../views/TrainingManagement/recoil';
import { useFetchCurrentOrgQuestTemplatesQuery } from '../../../TrainingManagement/components/QuestList/__generated__/FetchCurrentOrgQuestTemplates.generated';

import { IQuestListProps } from '.';

export const ITEMS_PER_PAGE = 100;

interface IUseOrganizationQuestTemplates
  extends Pick<
    IQuestListProps,
    'search' | 'sortArgs' | 'language' | 'filter'
  > {}

export const useOrganizationQuestTemplates = ({
  filter,
  search,
  sortArgs,
  language,
}: IUseOrganizationQuestTemplates) => {
  const [sort, setSort] = useState<Record<string, QuestTemplate_sort>>({
    publishedAt: 'DESC',
  });

  const [currentPageIndex, setCurrentPageIndex] = useRecoilState(
    questListState.currentPageIndex
  );

  const variables = useMemo(() => {
    return {
      skip: ITEMS_PER_PAGE * currentPageIndex,
      first: ITEMS_PER_PAGE,
      sort: [...Object.values(sort), ...(sortArgs ? sortArgs : [])],
      filter,
      search,
      language,
    };
  }, [filter, language, search, sort, sortArgs, currentPageIndex]);

  const { data, loading, fetchMore } = useFetchCurrentOrgQuestTemplatesQuery({
    // Use query results even if one template fails to load
    errorPolicy: 'all',
    variables,
  });

  const organization = data?.currentUser?.organization;

  const qtConnection =
    data?.currentUser?.organization?.questTemplatesConnection;

  const questTemplates = useMemo(() => {
    return qtConnection?.nodes || [];
  }, [qtConnection]);

  const questTemplatesCurrentCount = questTemplates.length;
  const questTemplatesTotalCount = qtConnection?.totalCount;
  const hasMoreQuestTemplates = !!qtConnection?.pageInfo?.hasNextPage;

  const pagination = usePagination({
    pageSize: ITEMS_PER_PAGE,
    totalItemCount: questTemplatesTotalCount || 0,
    currentPageIndex,
    setPageIndex: setCurrentPageIndex,
  });

  useEffectSkipInitial(() => {
    setCurrentPageIndex(0);
  }, [filter, setCurrentPageIndex]);

  return {
    loading,
    sort,
    setSort,
    organization,
    questTemplates,
    questTemplatesCurrentCount,
    questTemplatesTotalCount,
    hasMoreQuestTemplates,
    fetchMore,
    pagination,
  };
};
