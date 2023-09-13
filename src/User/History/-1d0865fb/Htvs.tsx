import React, { FC } from 'react';
import { MessageDescriptor } from 'react-intl';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import { SUPPORTED_LOCALE } from '@hox/frontend-utils/types/graphql.generated';

import { FiltersContainer } from '../../../../components/FiltersContainerNew';
import { QUEST_TEMPLATE_PREVIEW_INTL } from '../../../../views/TrainingManagementBeta/questTemplate/intl';
import {
  appliedFilters,
  gqlVariables,
  questTemplateTagFilter,
  TFilterKey,
} from '../../../../views/TrainingManagementBeta/recoil/filters';
import { questListState } from '../../recoil';
import { getDefaultFilters } from '../filters/lib';
import { QuestList } from '../QuestList';

const FILTER_KEY_TAG_MAPPING: Record<TFilterKey, MessageDescriptor> = {
  language: QUEST_TEMPLATE_PREVIEW_INTL.filter.dropdownFilters.language,
  difficulty: QUEST_TEMPLATE_PREVIEW_INTL.filter.dropdownFilters.difficulty,
  jobFunction: QUEST_TEMPLATE_PREVIEW_INTL.filter.dropdownFilters.jobFunction,
  category: QUEST_TEMPLATE_PREVIEW_INTL.filter.dropdownFilters.category,
  active: QUEST_TEMPLATE_PREVIEW_INTL.filter.dropdownFilters.active,
};

export const QuestListPage: FC = () => {
  const filters = useRecoilValue(questListState.filters);

  const [selectedLanguage] = filters?.language ?? [];

  const [searchString, setSearchString] = useRecoilState(
    questTemplateTagFilter
  );

  const currentFilters = useRecoilValue(appliedFilters);
  const clearAllFilters = useResetRecoilState(appliedFilters);
  const gqlVars = useRecoilValue(gqlVariables);

  return (
    <>
      <FiltersContainer
        filters={getDefaultFilters()}
        currentFilters={currentFilters}
        clearAllFilters={clearAllFilters}
        keyToTagMappings={FILTER_KEY_TAG_MAPPING}
      />
      <QuestList
        {...gqlVars}
        language={selectedLanguage as SUPPORTED_LOCALE}
        searchString={searchString}
        setSearchString={setSearchString}
      />
    </>
  );
};
