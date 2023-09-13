import React, {
  Dispatch,
  FC,
  SetStateAction,
  SyntheticEvent,
  useCallback,
  useMemo,
  useState,
} from 'react';
import styled from 'styled-components';
import * as R from 'ramda';
import { FormattedMessage } from 'react-intl';
import { Route, useHistory, useRouteMatch } from 'react-router-dom';

import { debounce } from '@hox/frontend-utils/ramda';
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
import { TRAINING_MANAGEMENT_PATH } from '../../../../layouts/paths';
import {
  QuestTemplate_sort,
  SUPPORTED_LOCALE,
} from '../../../../types/graphql.generated';
import { QuestTemplatePreview } from '../../questTemplate/Preview/index';
import { TQuestList, TTagBlacklistItem } from '../../types';

import { QuestListHeader } from './components/QuestListHeader';
import { QuestListRow } from './components/QuestListRow';
import { QuestListToolbar } from './components/QuestListToolbar';
import { getSortMapping } from './lib';
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
  filters?: Record<string, unknown>;
  listPath: TQuestList;
  search?: string;
  sortArgs?: QuestTemplate_sort[];
  language?: SUPPORTED_LOCALE;
  showStatusColumn?: boolean;
  searchString?: string;
  setSearchString?: Dispatch<SetStateAction<string | undefined>>;
}

export const QuestList: FC<IQuestListProps> = ({
  filters,
  search,
  listPath,
  showStatusColumn,
  sortArgs,
  searchString,
  setSearchString,
  language = SUPPORTED_LOCALE.en,
  ...restProps
}) => {
  const history = useHistory();
  const { path } = useRouteMatch();

  const {
    loading,
    sort,
    setSort,
    organization,
    questTemplates,
    questTemplatesTotalCount,
    pagination,
  } = useOrganizationQuestTemplates({
    filters,
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

  const [columnSortStates, setColumnSortStates] = useState<{
    [key: string]: TSortDirection;
  }>({});

  const toggleSortHandler = (columnKey: string, direction: TSortDirection) => {
    const newSort = getSortMapping(columnKey, direction);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [columnKey]: _, ...rest } = sort;
    setSort({
      ...rest,
      ...(newSort && { [columnKey]: newSort }),
    });
  };

  const handleOpenQuestTemplatePreview = (rowId?: string) => {
    rowId && history.push(`${TRAINING_MANAGEMENT_PATH}/${rowId}`);
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
          listPath={listPath}
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
              columnSortStates={columnSortStates}
              setColumnSortStates={setColumnSortStates}
              onColumnSortToggle={toggleSortHandler}
              showStatusColumn={showStatusColumn}
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
