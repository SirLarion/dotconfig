import React, { FC, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { ESupportedLocales } from '@hox/frontend-utils/i18n';

import { FiltersContainer } from '../../../../components/FiltersContainer';
import { useFormattedQuestListFilters } from '../../hooks/useFormattedQuestListFilters';
import {
  formatFiltersToGqlFilters,
  useQuestListFilters,
} from '../../hooks/useQuestListFilters';
import { questListState } from '../../recoil';
import { TQuestList, TQuestListInitialQueryCriteria } from '../../types';
import { QuestList } from '../QuestList';
import { IQuestListFilterDropdown } from '../QuestListFilterDropdown';

export const QuestListPage: FC<{
  Filters: Array<FC<IQuestListFilterDropdown>>;
  initialQueryCriteria: TQuestListInitialQueryCriteria;
  listPath: TQuestList;
}> = ({
  Filters,
  listPath,
  initialQueryCriteria: { filter, search, sort },
}) => {
  const { handleFilterChange, resetAllFilters, handleRemoveFilter } =
    useQuestListFilters();

  const filters = useRecoilValue(questListState.filters);

  const [selectedLanguage] = filters?.language ?? [];
  const [searchString, setSearchString] = useState<string>();

  const queryFilters = useMemo(() => {
    return formatFiltersToGqlFilters(filters, searchString);
  }, [filters, searchString]);

  const { formattedFilters: appliedFilters } =
    useFormattedQuestListFilters(filters);
  const combinedFilters = useMemo(
    () => ({ ...filter, ...queryFilters }),
    [filter, queryFilters]
  );
  return (
    <>
      <FiltersContainer
        appliedFilters={appliedFilters}
        clearAllFilters={resetAllFilters}
        onRemoveFilter={id => handleRemoveFilter(id)}
      >
        {Filters.map((Filter, index) => (
          <Filter
            key={index}
            searchFilters={filters}
            handleFilterChange={handleFilterChange}
          />
        ))}
      </FiltersContainer>
      <QuestList
        sortArgs={sort}
        filters={combinedFilters}
        search={search}
        language={selectedLanguage as ESupportedLocales}
        listPath={listPath}
        searchString={searchString}
        setSearchString={setSearchString}
        showStatusColumn={listPath === 'latest'}
      />
    </>
  );
};
