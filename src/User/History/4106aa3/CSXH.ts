import { without } from 'ramda';
import { useIntl } from 'react-intl';
import { useRecoilState } from 'recoil';

import { userListState } from '../recoil';

import { GetDistinct } from './__generated__/GetDistinct';
import {
  getAppliedFilters,
  getDistinct,
  getFilterContent,
  getFormattedDropdownItems,
} from './useUserListFilters.lib';

export const useUserListFilters = () => {
  const intl = useIntl();
  const { data } = useQuery<GetDistinct>(GET_DISTINCT_QUERY);
  const { departments, sites, countries } = getDistinct(data);

  const [filter, setFilters] = useRecoilState(userListState.filter);

  const resetFilters = () =>
    setFilters(currentFilters => ({
      ...userListState.filterDefaults,
      search: currentFilters.search,
    }));

  const removeFilter = (filterId: string) => {
    const [filterKey, filterValue] = getFilterContent(filterId);
    setFilters(currentFilters => {
      const thisFilter = currentFilters[filterKey];
      return {
        ...currentFilters,
        [filterKey]: Array.isArray(thisFilter)
          ? without([filterValue], thisFilter)
          : undefined,
      };
    });
  };

  const departmentItems = getFormattedDropdownItems(departments);
  const siteItems = getFormattedDropdownItems(sites);
  const countryItems = getFormattedDropdownItems(countries);
  const appliedFilters = getAppliedFilters(filter, intl);

  return {
    appliedFilters,
    resetFilters,
    removeFilter,
    departmentItems,
    siteItems,
    countryItems,
  };
};