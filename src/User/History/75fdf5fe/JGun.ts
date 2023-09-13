import {
  array,
  custom,
  nullable,
  or,
  string,
  stringLiterals,
} from '@recoiljs/refine';
import { complement, isEmpty, isNil, last, without } from 'ramda';
import { atom, DefaultValue, RecoilState, selector } from 'recoil';
import { syncEffect } from 'recoil-sync';

import { supportedLanguages } from '@hox/frontend-utils/i18n';
import { QuestTemplate_filter } from '@hox/frontend-utils/types/graphql.generated';

import { TFilterTag } from '../../../components/FiltersContainerNew';
import { categoryItems } from '../components/filters/CategoryFilter';
import { jobFunctions } from '../components/filters/JobFunctionFilter';
import { MULTI_LINGUAL_LABEL } from '../components/filters/LanguageFilter';
import { TRAINING_MANAGEMENT_INTL } from '../intl';
import { EXPERT_MODE_TAG, SPICY_MODE_FILTER } from '../lib';

const isNotNil = complement(isNil);
const isNotEmpty = complement(isEmpty);

const stringOrNull = or(
  string(),
  custom(val => val === null)
);

const DIFFICULTY_FILTER_KEY = 'attributes__difficultyEstimate_in';
const LANGUAGE_FILTER_KEY = 'attributes__language_in';

const TAG_CONTAINS_KEY = 'tag_contains';
const TAGS_FILTER_KEY = 'tags__value_in';
const SPICY_MODE_FILTER_KEY = 'tags__value_eq';

const ACTIVE_FILTER_SEARCH = 'is:active';
const NOT_ACTIVE_FILTER_SEARCH = 'not:active';

export const categoryFilter = atom<string[]>({
  key: 'training-management-filter-category',
  default: [],
  effects: [syncEffect({ refine: array(stringOrNull), itemKey: 'category' })],
});

export const difficultyFilter = atom<string[]>({
  key: 'training-management-filter-difficulty',
  default: [],
  effects: [syncEffect({ refine: array(stringOrNull), itemKey: 'difficulty' })],
});

export const languageFilter = atom<string[]>({
  key: 'training-management-filter-language',
  default: [],
  effects: [syncEffect({ refine: array(stringOrNull), itemKey: 'language' })],
});

export const jobFunctionFilter = atom<string[]>({
  key: 'training-management-filter-jobFunction',
  default: [],
  effects: [
    syncEffect({ refine: array(stringOrNull), itemKey: 'jobFunction' }),
  ],
});

export const questTemplateTagFilter = atom<string>({
  key: 'training-management-filter-questTemplateTag',
  default: '',
  effects: [syncEffect({ refine: string(), itemKey: 'search' })],
});

export type TActive = 'active' | 'not active';

export const activeFilter = atom<TActive | undefined>({
  key: 'training-management-filter-active',
  default: undefined,
  effects: [
    syncEffect({
      refine: nullable(
        stringLiterals({
          active: 'active',
          'not active': 'not active',
        })
      ),
      itemKey: 'active',
    }),
  ],
});

type TDifficultyLevel = 1 | 2 | 3 | 4;

export const allFilters = [
  {
    key: 'category',
    atom: categoryFilter,
    displayValueMapper: (id: string) =>
      categoryItems.find(item => item.id === id)?.displayValue || id,
  },
  {
    key: 'difficulty',
    atom: difficultyFilter,
    displayValueMapper: (id: string) =>
      id === 'spicyMode'
        ? TRAINING_MANAGEMENT_INTL.spicyMode.title
        : TRAINING_MANAGEMENT_INTL.difficultyLevel[
            parseInt(id) as TDifficultyLevel
          ],
  },
  {
    key: 'language',
    atom: languageFilter,
    displayValueMapper: (id: string) =>
      supportedLanguages.find(item => item.code === id)?.name ||
      MULTI_LINGUAL_LABEL,
  },
  {
    key: 'jobFunction',
    atom: jobFunctionFilter,
    displayValueMapper: (id: string) =>
      jobFunctions.find(item => item.id === last(id.split(':')))
        ?.displayValue || id,
  },
  {
    key: 'active',
    atom: activeFilter,
    displayValueMapper: (id: string) => id,
  },
] as const;

export type TFilterKey = typeof allFilters[number]['key'];

export type TPersistedFilters = {
  categories?: string[];
  difficulties?: string[];
  languages?: string[];
  jobFunctions?: string[];
  questTemplateTag?: string;
  active?: TActive;
};

export const appliedFilters = selector<Array<TFilterTag<TFilterKey>>>({
  key: 'training-management-filters-currently-applied',
  get: ({ get, getCallback }) => {
    return allFilters
      .flatMap(filter => {
        const currentFilter = get<unknown>(filter.atom) as string[] | undefined;

        if (currentFilter === undefined) {
          return [];
        }

        if (Array.isArray(currentFilter)) {
          return currentFilter.map<TFilterTag<TFilterKey>>(filterValue => ({
            key: filter.key,
            value: filterValue,
            displayValue: filter.displayValueMapper(filterValue),
            onRemove: getCallback(({ set }) => () => {
              set(
                filter.atom as RecoilState<string[]>,
                without([filterValue], currentFilter)
              );
            }),
          }));
        }

        return {
          key: filter.key,
          value: `${currentFilter}`,
          onRemove: getCallback(({ reset }) => () => {
            return reset(filter.atom);
          }),
        };
      })
      .filter(val => val !== undefined);
  },
  set: ({ reset }, newValue) => {
    if (newValue instanceof DefaultValue) {
      allFilters.forEach(filter => reset(filter.atom));
    } else {
      throw new Error(
        'appliedFilters selector set can only be used to reset filters'
      );
    }
  },
});

export const persistedFilters = selector<TPersistedFilters>({
  key: 'training-management-persisted-filters-selector',
  set: ({ set }, newFilters) => {
    if (newFilters instanceof DefaultValue) {
      return;
    }
    set(categoryFilter, newFilters.categories || []);
    set(difficultyFilter, newFilters.difficulties || []);
    set(jobFunctionFilter, newFilters.jobFunctions || []);
    set(languageFilter, newFilters.languages || []);
    set(activeFilter, newFilters.active);
  },
  get: ({ get }) => {
    const categories = get(categoryFilter);
    const difficulties = get(difficultyFilter);
    const jobFunctions = get(jobFunctionFilter);
    const languages = get(languageFilter);
    const active = get(activeFilter);

    return {
      categories,
      difficulties,
      jobFunctions,
      languages,
      active,
    };
  },
});

const getActiveFilter = (activeState: TActive | undefined) => {
  if (!activeState) {
    return activeState;
  }

  if (activeState === 'active') {
    return ACTIVE_FILTER_SEARCH;
  }

  return NOT_ACTIVE_FILTER_SEARCH;
};

export const gqlVariables = selector<QuestTemplate_filter>({
  key: 'training-management-filter-gql',
  get: ({ get }) => {
    const selectedCategories = get(categoryFilter);
    const selectedDifficulties = get(difficultyFilter);
    const selectedJobFunctions = get(jobFunctionFilter);
    const selectedLanguages = get(languageFilter);
    const questTemplateTag = get(questTemplateTagFilter);
    const active = get(activeFilter);

    const hasSpicyMode = selectedDifficulties.includes(SPICY_MODE_FILTER);

    const sanitizedDifficultyFilters =
      selectedDifficulties.filter(v => v !== SPICY_MODE_FILTER) || [];

    return {
      filter: {
        ...(isNotEmpty(selectedCategories) && {
          [TAGS_FILTER_KEY]: selectedCategories,
        }),
        ...(isNotEmpty(sanitizedDifficultyFilters) && {
          [DIFFICULTY_FILTER_KEY]: sanitizedDifficultyFilters.map(v =>
            parseInt(v)
          ),
        }),
        ...(isNotEmpty(selectedJobFunctions) && {
          [TAGS_FILTER_KEY]: selectedJobFunctions,
        }),
        ...(isNotEmpty(selectedLanguages) && {
          [LANGUAGE_FILTER_KEY]: [null, ...selectedLanguages],
        }),
        ...(hasSpicyMode && {
          [SPICY_MODE_FILTER_KEY]: EXPERT_MODE_TAG,
        }),
        ...(isNotNil(questTemplateTag) &&
          questTemplateTag.length > 0 && {
            [TAG_CONTAINS_KEY]: questTemplateTag,
          }),
      },
      search: getActiveFilter(active),
    };
  },
});

export const toGqlFilter = (filters: TPersistedFilters | undefined) => {
  if (!filters) {
    return {};
  }

  const {
    categories: selectedCategories,
    difficulties,
    jobFunctions: selectedJobFunctions,
    languages,
    questTemplateTag,
    active,
  } = filters;

  const selectedDifficulties = difficulties || [];
  const selectedLanguages = languages || [];
  const selectedQuestTemplateTag = questTemplateTag || '';

  const hasSpicyMode = selectedDifficulties.includes(SPICY_MODE_FILTER);

  const sanitizedDifficultyFilters =
    selectedDifficulties.filter(v => v !== SPICY_MODE_FILTER) || [];

  return {
    ...(isNotEmpty(selectedCategories) && {
      [TAGS_FILTER_KEY]: selectedCategories,
    }),
    ...(isNotEmpty(sanitizedDifficultyFilters) && {
      [DIFFICULTY_FILTER_KEY]: sanitizedDifficultyFilters.map(v => parseInt(v)),
    }),
    ...(isNotEmpty(selectedJobFunctions) && {
      [TAGS_FILTER_KEY]: selectedJobFunctions,
    }),
    ...(isNotEmpty(selectedLanguages) && {
      [LANGUAGE_FILTER_KEY]: [null, ...selectedLanguages],
    }),
    ...(hasSpicyMode && {
      [SPICY_MODE_FILTER_KEY]: EXPERT_MODE_TAG,
    }),
    ...(isNotNil(questTemplateTag) &&
      selectedQuestTemplateTag.length > 0 && {
        [TAG_CONTAINS_KEY]: questTemplateTag,
      }),
    ...(isNotNil(active) && getActiveFilter(active)),
  };
};
