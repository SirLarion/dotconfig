import React, { FC } from 'react';
import { useIntl } from 'react-intl';
import { useRecoilState } from 'recoil';

import {
  AdvancedDropdown,
  asDropdownItem,
  TAdvancedDropdownItem,
} from '../../../../components/AdvancedDropdown';
import { useGetCurrentOrganizationCitiesQuery } from '../../hooks/graphql/__generated__/GetCurrentOrganizationCities.generated';
import { USER_MANAGEMENT_INTL } from '../../intl';
import { countryFilter } from '../../recoil/filters';

export const CountryFilter: FC = () => {
  const intl = useIntl();
  const { data } = useGetCurrentOrganizationCitiesQuery();

  const uniqueCities = data?.currentUser?.organization.cities ?? [];
  const [selectedCountries, setSelectedCountries] =
    useRecoilState(countryFilter);

  const setCountryFilter = React.useCallback(
    (items: TAdvancedDropdownItem[]) => {
      setSelectedCountries(items.map(item => item.id));
    },
    [setSelectedCountries]
  );

  return (
    <AdvancedDropdown
      placeholder={intl.formatMessage(
        USER_MANAGEMENT_INTL.filter.dropdownFilters.country
      )}
      items={uniqueCities.map(asDropdownItem)}
      selectedItems={selectedCountries.map(asDropdownItem)}
      onChange={setCountryFilter}
    />
  );
};
