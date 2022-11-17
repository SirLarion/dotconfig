import React, { FC } from 'react';
import styled from 'styled-components';

import { Dropdown, IDropdownItem } from '@hox/ui/Dropdown';
import { InputBase } from '@hox/ui/InputBase';
import { LoadingIndicator } from '@hox/ui/LoadingIndicator';

import { useQueryState } from '../../../../hooks/useQueryState';
import { useGetOrganizationsQuery } from 'hooks/__generated__/query.generated';
// import { useGetOrganizations } from '../hooks/useGetOrganizations';

export interface IOrgDropdownProps {}

const StyledOrgDropdown = styled.div`
  width: 13rem;
`;

const StyledPlaceholder = styled(InputBase)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const isDropdownItem = (value: unknown): value is IDropdownItem =>
  !!value && !Array.isArray(value) && !!(value as IDropdownItem).value;

// TODO: refactor DropdownSelector to a generalized component and use it here
// as well
export const OrgDropdown: FC<IOrgDropdownProps> = ({ ...restProps }) => {
  const { orgId, setOrgId } = useQueryState();
  const { organizations, loading } = useGetOrganizationsQuery();
  const dropdownItems: IDropdownItem[] = organizations.map(({ _id, name }) => ({
    id: _id,
    value: name,
    displayValue: name,
  }));
  return (
    <StyledOrgDropdown {...restProps}>
      {loading ? (
        <StyledPlaceholder>
          <LoadingIndicator />
        </StyledPlaceholder>
      ) : (
        <Dropdown
          items={dropdownItems}
          initialSelected={dropdownItems.find(item => item.id === orgId)}
          onChange={item => isDropdownItem(item) && setOrgId(item.id || orgId)}
          sortItems={false}
          numMenuItems={15}
        />
      )}
    </StyledOrgDropdown>
  );
};
