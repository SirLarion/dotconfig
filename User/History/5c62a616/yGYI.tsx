import React, { FC, SyntheticEvent, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import * as R from 'ramda';
import { FormattedMessage } from 'react-intl';
import { Route, useHistory, useRouteMatch } from 'react-router-dom';
import { SetterOrUpdater } from 'recoil';

import { useOnMount } from '@hox/frontend-utils/hooks/useOnMount';
import { debounce } from '@hox/frontend-utils/ramda';
import {
  QuestTemplate_sort,
  SUPPORTED_LOCALE,
} from '@hox/frontend-utils/types/graphql.generated';
import { LoadingIndicator } from '@hox/ui/LoadingIndicator';
import { Pagination } from '@hox/ui/Table/components/Pagination';

import {
  CenterContent,
  GridList,
  TSortDirection,
} from '../../../../components/GridList';
import { Layout } from '../../../../components/Layout';
import {
  NoResultsFound,
  NoResultsFoundIntl,
} from '../../../../components/NoResultsFound';
import { TRAINING_MANAGEMENT_PATH_BETA } from '../../../../layouts/paths';
import { QuestTemplatePreview } from '../../questTemplate/Preview/index';
import { TTagBlacklistItem } from '../../types';

import { QuestListHeader } from './components/QuestListHeader';
import { QuestListRow } from './components/QuestListRow';
import { QuestListToolbar } from './components/QuestListToolbar';
import { getSortMapping, TSortableColumn } from './lib';
import { useOrganizationQuestTemplates } from './useOrganizationQuestTemplates';

const SEARCH_DEBOUNCE = 500;

const QuestListSearchTips = {
  searchWith: (
    <FormattedMessage
      id="app.admin.searchTips.trySearchingWithTwoOptions"
      defaultMessage="Try searching with quest tag"
      description="todo"
    />
  ),
};

const StyledNoResultsFound = styled(NoResultsFound)`
  margin-top: 2rem;
`;

export interface IQuestListProps {
  filter?: Record<string, unknown>;
  search?: string;
  sortArgs?: QuestTemplate_sort[];
  language?: SUPPORTED_LOCALE;
  showStatusColumn?: boolean;
  searchString?: string;
  setSearchString?: SetterOrUpdater<string>;
}

export const QuestList: FC<IQuestListProps> = ({
  filter,
  search,
  showStatusColumn,
  sortArgs,
  searchString,
  setSearchString,
  language = SUPPORTED_LOCALE.en,
  ...restProps
}) => {
  const history = useHistory();
  const { path } = useRouteMatch();
  const queryParams = window.location.search;

  const {
    loading,
    setSort,
    organization,
    questTemplates,
    questTemplatesTotalCount,
    pagination,
  } = useOrganizationQuestTemplates({
    filter,
    search,
    sortArgs,
    language,
  });

  const searched = searchString && searchString.length > 0;

  const noSearchResultsFound =
    !loading && searched && R.isEmpty(questTemplates);

  const tagBlacklist = useMemo(
    () => R.path<TTagBlacklistItem[]>(['tagBlacklist'], organization) ?? [],
    [organization]
  );

  const toggleSortHandler = (
    columnKey: TSortableColumn,
    direction: TSortDirection
  ) => {
    const newSort = getSortMapping(columnKey, direction);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setSort(({ [columnKey]: _ }) => ({
      ...(newSort && { [columnKey]: newSort }),
    }));
  };

  useOnMount(() => {
    toggleSortHandler('publishedAt', 'DESC');
  });

  const handleOpenQuestTemplatePreview = (rowId?: string) => {
    rowId &&
      history.push(`${TRAINING_MANAGEMENT_PATH_BETA}/${rowId}`, {
        queryParams,
      });
  };

  const setDebouncedSearch = useMemo(
    () =>
      debounce(
        (value: string) => setSearchString && setSearchString(value),
        SEARCH_DEBOUNCE
      ),
    [setSearchString]
  );

  const handleSearchChange = useCallback(
    (event: SyntheticEvent) => {
      pagination.reset();
      setDebouncedSearch((event.target as HTMLInputElement).value);
    },
    [setDebouncedSearch, pagination]
  );

  return (
    <>
      <Layout.Content>
        <QuestListToolbar
          loading={loading}
          questTemplatesTotalCount={questTemplatesTotalCount}
          handleSearchChange={handleSearchChange}
          hideCountAndSearch={false}
        >
          <Pagination
            pageIndex={pagination.currentPageIndex}
            currentPageSize={questTemplates.length}
            pageSize={pagination.pageSize}
            nextPage={pagination.nextPage}
            previousPage={pagination.previousPage}
          />
        </QuestListToolbar>
        <GridList
          loading={loading}
          loadingIndicator={
            <CenterContent>
              <LoadingIndicator />
            </CenterContent>
          }
          header={
            <QuestListHeader
              onColumnSortToggle={toggleSortHandler}
              showStatusColumn={showStatusColumn}
              initialColumnSortState={{ publishedAt: 'DESC' }}
            />
          }
          {...restProps}
        >
          {!R.isEmpty(questTemplates) && !loading ? (
            questTemplates.map(template => (
              <QuestListRow
                key={template._id}
                onClick={templateId =>
                  handleOpenQuestTemplatePreview(templateId)
                }
                questTemplate={template}
                tagBlacklist={tagBlacklist}
                showStatusColumn={showStatusColumn}
              />
            ))
          ) : (
            <Layout.Content>
              {noSearchResultsFound && (
                <StyledNoResultsFound
                  search={searchString}
                  searchTips={[
                    QuestListSearchTips.searchWith,
                    NoResultsFoundIntl.searchTips.checkSpelling,
                  ]}
                />
              )}
            </Layout.Content>
          )}
        </GridList>

        <Route
          path={`${path}/:questId`}
          render={props => (
            <QuestTemplatePreview selectedLanguage={language} {...props} />
          )}
        />
      </Layout.Content>
    </>
  );
};
