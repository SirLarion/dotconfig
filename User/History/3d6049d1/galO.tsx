import React, { FC, useCallback } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';

import { Checkbox } from '@hox/ui/Checkbox';
import { SmallText } from '@hox/ui/Text';

import { SortIndicator } from '../../../../../components/GridList';
import {
  TSortableUserListColumn,
  useUserListSort,
} from '../../../hooks/useUserListSort';
import { userListState } from '../../../recoil';
import { TColumnConfig } from '../../../types';
import { userListGridStyles } from '../UserListRow';

const StyledUserListHeader = styled.div`
  ${userListGridStyles};
  padding-top: 0;
  padding-bottom: 0.5rem;

  > div {
    align-self: center;
    user-select: none;
    padding: 0;
  }
`;

const SortableColumn = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  > :first-child:not(:last-child) {
    margin-right: 0.25rem;
  }
`;

export interface IUserListHeader {
  columns: TColumnConfig[];
}

export const UserListHeader: FC<IUserListHeader> = ({
  columns,
  ...restProps
}) => {
  const totalCount = useRecoilValue(userListState.totalCount);
  const [allSelected, setAllSelected] = useRecoilState(
    userListState.allSelected
  );
  const [selectedIds, setSelectedIds] = useRecoilState(
    userListState.selectedIds
  );

  const { toggleSort, sortState } = useUserListSort();

  const handleSelectionToggle = useCallback(() => {
    if (!allSelected && totalCount > 0) {
      setAllSelected(true);
    } else {
      setAllSelected(false);
    }
    setSelectedIds([]);
  }, [totalCount, allSelected, setAllSelected, setSelectedIds]);

  return (
    <StyledUserListHeader {...restProps}>
      <Checkbox checked={allSelected} onChange={handleSelectionToggle} />
      {columns.map(column =>
        column.sortable ? (
          <SortableColumn
            key={column.id}
            onClick={() => toggleSort(column.id as TSortableUserListColumn)}
          >
            <SmallText dimmed>{column.label}</SmallText>
            <SortIndicator sortDirection={sortState[column.id] || 'NONE'} />
          </SortableColumn>
        ) : (
          <SmallText key={column.id} dimmed>
            {column.label}
          </SmallText>
        )
      )}
    </StyledUserListHeader>
  );
};
