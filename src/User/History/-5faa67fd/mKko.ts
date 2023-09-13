import { gql, useQuery } from '@apollo/client';
import { IPreviewOrganization, toDropdownItem } from '.';

interface TOrgList {
  organizations: IPreviewOrganization[];
}

export const useOrganizationListData = () => {
  const { loading, data } = useQuery<TOrgList>(GET_ORGANIZATION_LIST);
  const organizations =
    data.organizations.map(org => toDropdownItem(org)) || [];
  return { loading, organizations };
};
