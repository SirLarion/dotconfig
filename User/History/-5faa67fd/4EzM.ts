import { toDropdownItem } from '.';
import { useGetOrganizationListQuery } from './__generated__/GetOrganizationList.generated';

export const useOrganizationListData = () => {
  const { loading, data } = useGetOrganizationListQuery();
  const organizations =
    data.organizations.map(org => toDropdownItem(org)) || [];
  return { loading, organizations };
};
