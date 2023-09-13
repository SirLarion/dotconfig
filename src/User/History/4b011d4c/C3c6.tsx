import React from 'react';
import styled from 'styled-components';
import { pathOr } from 'ramda';
import { IntlShape, MessageDescriptor } from 'react-intl';

import { USER_MANAGEMENT_INTL } from '../intl';
import { TFilter, TFilterKey } from '../recoil/lib';

import { GetDistinct } from './graphql/__generated__/GetDistinct.generated';

const DISPLAYABLE_FILTER_KEYS: TFilterKey[] = [
  'department',
  'site',
  'country',
  'role',
  'notActivated',
  'notReacted',
];

const FilterTag = styled.span`
  text-transform: capitalize;
`;

const FILTER_KEY_TITLE_MAPPING: Record<TFilterKey, MessageDescriptor> = {
  department: USER_MANAGEMENT_INTL.filter.dropdownFilters.department,
  site: USER_MANAGEMENT_INTL.filter.dropdownFilters.site,
  country: USER_MANAGEMENT_INTL.filter.dropdownFilters.country,
  notActivated:
    USER_MANAGEMENT_INTL.filter.toggleFilters.tagLabels.notActivated,
  notReacted: USER_MANAGEMENT_INTL.filter.toggleFilters.tagLabels.notReacted,
  role: USER_MANAGEMENT_INTL.filter.dropdownFilters.role,
  search: USER_MANAGEMENT_INTL.filter.dropdownFilters.role,
};

export const getFilterContent = (filter: string): [TFilterKey, string] =>
  filter.split(':', 2) as [TFilterKey, string];

export const titleForFilterKey = (key: TFilterKey, intl: IntlShape) =>
  intl.formatMessage(FILTER_KEY_TITLE_MAPPING[key]);

const isToggleFilter = (item: string | boolean) => typeof item === 'boolean';

const ensureArray = (item: unknown | unknown[]) =>
  !Array.isArray(item) ? [item] : item;

export const getAppliedFilters = (filter: TFilter, intl: IntlShape) => {
  const appliedGqlFilters = DISPLAYABLE_FILTER_KEYS.filter(key => !!filter[key])
    .map(key =>
      ensureArray(pathOr([], [key], filter)).map(item => ({
        id: `${key}:${item}`,
        value: (
          <FilterTag>
            {isToggleFilter(item)
              ? titleForFilterKey(key, intl)
              : `${titleForFilterKey(key, intl)}: ${item}`}
          </FilterTag>
        ),
      }))
    )
    .flat();

  return appliedGqlFilters;
};

export const getFormattedDropdownItems = (items: string[] | undefined) =>
  items
    ? items.map(item => ({
        id: item,
        value: item,
      }))
    : [];

export const getDistinct = (data: GetDistinct | undefined) => {
  const organization = data?.currentUser?.organization;
  if (!organization) {
    return {};
  }
  const { departments, sites, countries } = organization;
  return { departments, sites, countries };
};
