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
import { cityFilter } from '../../recoil/filters';

export const CityFilter: FC = () => {
  const intl = useIntl();
  const { data } = useGetCurrentOrganizationCitiesQuery();

  const uniqueCities = data?.currentUser?.organization.cities ?? [];
  const [selectedCities, setSelectedCities] = useRecoilState(cityFilter);

  const setCityFilter = React.useCallback(
    (items: TAdvancedDropdownItem[]) => {
      setSelectedCities(items.map(item => item.id));
    },
    [setSelectedCities]
  );

  return (
    <AdvancedDropdown
      placeholder={intl.formatMessage(
        USER_MANAGEMENT_INTL.filter.dropdownFilters.city
      )}
      items={uniqueCities.map(asDropdownItem)}
      selectedItems={selectedCities.map(asDropdownItem)}
      onChange={setCityFilter}
    />
  );
};
