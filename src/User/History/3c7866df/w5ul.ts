import { complement, isEmpty, isNil, without } from 'ramda';
import { atom, DefaultValue, RecoilState, selector } from 'recoil';

import { User_filter } from '@hox/frontend-utils/types/graphql.generated';
import { FREE_FORM_TOKEN } from '@hox/ui/Search';

const isNotNil = complement(isNil);
const isNotEmpty = complement(isEmpty);

const DEPARTMENT_FILTER_KEY = 'profile__department_in';
const COUNTRY_FILTER_KEY = 'profile__country_in';
const SITE_FILTER_KEY = 'profile__site_in';
const TRAINING_ACTIVE_KEY = 'game__active_eq';
const SCIM_PROVISIONING_KEY = 'scim__lastProvisionedAt_exists';

export const departmentFilter = atom<string[]>({
  key: 'user-management-filter-department',
  default: [],
});

export const countryFilter = atom<string[]>({
  key: 'user-management-filter-country',
  default: [],
});

export const siteFilter = atom<string[]>({
  key: 'user-management-filter-site',
  default: [],
});

export const cityFilter = atom<string[]>({
  key: 'user-management-filter-city',
  default: [],
});

export type TTrainingStatus = 'active' | 'not active';

export const trainingStatusFilter = atom<TTrainingStatus | undefined>({
  key: 'user-management-filter-training-status',
  default: undefined,
});

export type TAllowedRole = 'admin' | 'user' | 'soc-operator';

export const roleFilter = atom<TAllowedRole | undefined>({
  key: 'user-management-filter-role',
  default: undefined,
});

export type TScimProvisioningStatus = 'enabled' | 'disabled';

export const scimProvisioningFilter = atom<TScimProvisioningStatus | undefined>(
  {
    key: 'user-management-filter-scim-provisioning',
    default: undefined,
  }
);

export const searchStringFilter = atom<string>({
  key: 'user-management-filter-search-string',
  default: '',
});

/**
 * All filters excluding the freetext search. Used for filter tags
 */
export const allFilters = [
  {
    key: 'department',
    atom: departmentFilter,
  },
  {
    key: 'country',
    atom: countryFilter,
  },
  {
    key: 'site',
    atom: siteFilter,
  },
  {
    key: 'trainingStatus',
    atom: trainingStatusFilter,
  },
  {
    key: 'role',
    atom: roleFilter,
  },
  {
    key: 'scim',
    atom: scimProvisioningFilter,
  },
] as const;

export type TFilterKey = typeof allFilters[number]['key'];

type TPersistedFilters = {
  departments?: string[];
  countries?: string[];
  sites?: string[];
  roles?: TAllowedRole;
  trainingStatus?: TTrainingStatus;
  scim?: TScimProvisioningStatus;
};

type TFilterTag = {
  key: TFilterKey;
  value: string;
  onRemove: () => void;
};

/**
 * Get a list of all currently applied filters
 */
export const appliedFilters = selector<TFilterTag[]>({
  key: 'user-management-filters-currently-applied',
  get: ({ get, getCallback }) => {
    return allFilters
      .flatMap(filter => {
        const currentFilter = get<unknown>(filter.atom) as
          | string[]
          | boolean
          | TAllowedRole
          | undefined;

        if (currentFilter === undefined) {
          return [];
        }

        if (Array.isArray(currentFilter)) {
          return currentFilter.map<TFilterTag>(filterValue => ({
            key: filter.key,
            value: filterValue,
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

/**
 * Get / Set an object presentation of filters for URL persistence
 */
export const queryParamFilters = selector<TPersistedFilters>({
  key: 'user-management-query-param-filters-selector',
  set: ({ set }, newFilters) => {
    if (newFilters instanceof DefaultValue) {
      return;
    }
    newFilters.departments && set(departmentFilter, newFilters.departments);
    newFilters.countries && set(countryFilter, newFilters.countries);
    newFilters.sites && set(siteFilter, newFilters.sites);
    newFilters.cities && set(cityFilter, newFilters.cities);
    newFilters.roles && set(roleFilter, newFilters.roles);
    newFilters.trainingStatus &&
      set(trainingStatusFilter, newFilters.trainingStatus);
  },
  get: ({ get }) => {
    const departments = get(departmentFilter);
    const countries = get(countryFilter);
    const sites = get(siteFilter);
    const cities = get(cityFilter);
    const roles = get(roleFilter);
    const trainingStatus = get(trainingStatusFilter);

    return {
      departments,
      countries,
      sites,
      cities,
      roles,
      trainingStatus,
    };
  },
});

/**
 * Transform selected filter values into a GQL compliant User_filter for use in queries
 */
export const gqlFilter = selector<User_filter>({
  key: 'user-management-filter-gql',
  get: ({ get }) => {
    const selectedDepartments = get(departmentFilter);
    const selectedCountries = get(countryFilter);
    const selectedSites = get(siteFilter);
    const trainingStatus = get(trainingStatusFilter);
    const scimProvisioning = get(scimProvisioningFilter);

    return {
      ...(isNotEmpty(selectedDepartments) && {
        [DEPARTMENT_FILTER_KEY]: selectedDepartments,
      }),
      ...(isNotEmpty(selectedCountries) && {
        [COUNTRY_FILTER_KEY]: selectedCountries,
      }),
      ...(isNotEmpty(selectedSites) && {
        [SITE_FILTER_KEY]: selectedSites,
      }),
      ...(isNotNil(trainingStatus) && {
        [TRAINING_ACTIVE_KEY]: trainingStatus === 'active',
      }),
      ...(isNotNil(scimProvisioning) && {
        [SCIM_PROVISIONING_KEY]: scimProvisioning === 'enabled',
      }),
    };
  },
});

/**
 * Build GQL search string from internal filters
 * Used in conjunction with gqlFilter to build full query params
 */
export const gqlSearch = selector<string>({
  key: 'user-management-filter-gql-search',
  get: ({ get }) => {
    const selectedRole = get(roleFilter);
    const searchString = get(searchStringFilter);

    return [
      selectedRole ? `role:${selectedRole}` : '',
      searchString ? `${FREE_FORM_TOKEN}:${searchString}` : '',
    ]
      .join(' ')
      .trim();
  },
});
