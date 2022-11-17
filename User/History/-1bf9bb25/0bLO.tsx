import React, { FC } from 'react';
import styled from 'styled-components';

import { Checkbox } from '@hox/ui/Checkbox';
import { HoxIcon } from '@hox/ui/HoxIcon';
import { Body, ButtonText } from '@hox/ui/Text';
import { Tooltip } from '@hox/ui/Tooltip';

import { AVAILABLE_COLUMNS } from '../../../../views/UserManagementBeta/columnCustomization/constants/columns';
import { TColumnId } from '../../../../views/UserManagementBeta/types';

export interface ICSVColumnSelectorProps {}

const StyledCSVColumnSelector = styled.div`
  width: 100%;
  padding: 0 1rem 1rem 1rem;
`;

const ColumnSelect = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 22rem;
  flex-wrap: wrap;
  > :not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

const SelectedColumnItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const BLACKLISTED_COLUMNS = ['last10Quests'];

export const CSVColumnSelector: FC<ICSVColumnSelectorProps> = ({
  selectedColumnIds,
  setSelectedColumnIds
  ...restProps
}) => {
  const columnItemOnClick = (colId: TColumnId) =>
    setSelectedColumnIds(currentlySelected =>
      currentlySelected.includes(colId)
        ? without([colId as TColumnId], currentlySelected)
        : [...currentlySelected, colId]
    );
  return (
    <StyledCSVColumnSelector {...restProps}>
      <ColumnSelect>
        {Object.entries(AVAILABLE_COLUMNS).map(
          ([colId, { label, tooltip }]) => (
            <SelectedColumnItem
              key={colId}
              onClick={() => columnItemOnClick(colId as TColumnId)}
            >
              <Checkbox
                checked={selectedColumnIds.includes(colId as TColumnId)}
                disabled={disabled}
              />
              <Body>{label}</Body>
              {tooltip && (
                <Tooltip
                  zIndex={100}
                  position="right"
                  tooltipBoxChildren={<ButtonText>{tooltip}</ButtonText>}
                >
                  <HoxIcon.QuestionCircle faded size={1.25} />
                </Tooltip>
              )}
            </SelectedColumnItem>
          )
        )}
      </ColumnSelect>
    </StyledCSVColumnSelector>
  );
};
