import React from 'react';
import { css } from 'styled-components';
import { useRecoilValue } from 'recoil';

import { AVAILABLE_COLUMNS } from '../columnCustomization/constants/columns';
import { columnLayoutState } from '../columnCustomization/recoil';
import { TQueryUser } from '../types';

export const useUserListLayout = (users: TQueryUser[]) => {
  const columnSelection = useRecoilValue(columnLayoutState.appliedColumnLayout);

  const columns = columnSelection.map(col => AVAILABLE_COLUMNS[col]);

  const rows = users.map(user => ({
    userId: user._id,
    columns: columns.map(col => <div key={col.id}>{col.node({ user })}</div>),
  }));

  const columnWidths = css`
    grid-template-columns: 4rem ${columns
        .map(({ minWidth, maxWidth }) => `minmax(${minWidth}, ${maxWidth})`)
        .join(' ')} 4rem;
  `;

  return {
    rows,
    columns,
    columnWidths,
  };
};
