import { IPreviewOrganization, toDropdownItem } from '.';
import { useGetOrganizationListQuery } from './__generated__/GetOrganizationList.generated';

interface IOrgList {
  organizations: IPreviewOrganization[];
}

export const useOrganizationListData = () => {
  const { loading, data } = useQuery<IOrgList>(GET_ORGANIZATION_LIST);
  const organizations =
    data.organizations.map(org => toDropdownItem(org)) || [];
  return { loading, organizations };
};
