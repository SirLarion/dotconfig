import React, { Dispatch, FC, SetStateAction } from 'react';
import styled, { css } from 'styled-components';
import { without } from 'ramda';

import { Checkbox } from '@hox/ui/Checkbox';
import { HoxIcon } from '@hox/ui/HoxIcon';
import { palette } from '@hox/ui/styles/theme';
import { Body, ButtonText } from '@hox/ui/Text';
import { Tooltip } from '@hox/ui/Tooltip';

import { AVAILABLE_COLUMNS } from '../../../../views/UserManagementBeta/columnCustomization/constants/columns';
import { TColumnId } from '../../../../views/UserManagementBeta/types';

export interface ICSVColumnSelectorProps {
  selectedColumnIds: TColumnId[];
  setSelectedColumnIds: Dispatch<SetStateAction<TColumnId[]>>;
}

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

const SelectedColumnItem = styled.div<{ $disabled?: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;

  ${({ $disabled }) => {
    if ($disabled) {
      return css`
        cursor: not-allowed;
        > :nth-child(2) {
          color: ${palette(p => p.foreground.input.disabled)};
        }
      `;
    }
  }}

  > :first-child {
    margin-right: 1rem;
  }

  > :nth-child(2) {
    margin-right: 0.25rem;
  }
`;

const BLACKLISTED_COLUMNS = ['last10Quests'];

export const CSVColumnSelector: FC<ICSVColumnSelectorProps> = ({
  selectedColumnIds,
  setSelectedColumnIds,
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
          ([colId, { label, tooltip }]) => {
            const disabled = BLACKLISTED_COLUMNS.includes(colId);

            return (
              <SelectedColumnItem
                key={colId}
                $disabled={disabled}
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
            );
          }
        )}
      </ColumnSelect>
    </StyledCSVColumnSelector>
  );
};
