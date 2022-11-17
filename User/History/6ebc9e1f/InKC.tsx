import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { without } from 'ramda';

import { Checkbox } from '@hox/ui/Checkbox';
import { HoxIcon } from '@hox/ui/HoxIcon';
import { palette } from '@hox/ui/styles/theme';
import { Body, ButtonText } from '@hox/ui/Text';
import { Tooltip } from '@hox/ui/Tooltip';

import { TColumnId } from '../../../types';
import { AVAILABLE_COLUMNS } from '../../constants/columns';

export interface ILayoutPreviewProps {
  selectedColumnIds: TColumnId[];
  setSelectedColumnIds: React.Dispatch<React.SetStateAction<TColumnId[]>>;
  maxColumnCount?: number;
  custom?: boolean;
}

const StyledLayoutPreview = styled.div`
  padding: 2rem 3rem;
  overflow-y: auto;

  > :nth-child(2):not(:last-child) {
    border-right: 1px solid ${palette(p => p.background.base.level(-3))};
  }
`;

const ColumnSelect = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

export const ColumnLayoutPreview: FC<ILayoutPreviewProps> = ({
  selectedColumnIds,
  setSelectedColumnIds,
  maxColumnCount,
  custom,
  ...restProps
}) => {
  const selectedColumns = selectedColumnIds.map(col => AVAILABLE_COLUMNS[col]);

  const maxColumnsSelected = !!(
    maxColumnCount && selectedColumns.length >= maxColumnCount
  );

  const columnItemOnClick = (colId: TColumnId) =>
    setSelectedColumnIds(currentlySelected =>
      currentlySelected.includes(colId)
        ? without([colId as TColumnId], currentlySelected)
        : [...currentlySelected, colId]
    );

  return (
    <StyledLayoutPreview {...restProps}>
      <ColumnSelect>
        {!custom
          ? selectedColumns.map(col => (
              <SelectedColumnItem $disabled key={col.id}>
                <Checkbox checked disabled />
                <Body>{col.label}</Body>
                {col.tooltip && (
                  <Tooltip
                    zIndex={100}
                    position="right"
                    tooltipBoxChildren={<ButtonText>{col.tooltip}</ButtonText>}
                  >
                    <HoxIcon.QuestionCircle faded size={1.25} />
                  </Tooltip>
                )}
              </SelectedColumnItem>
            ))
          : Object.entries(AVAILABLE_COLUMNS).map(
              ([colId, { label, tooltip }]) => {
                const disabled =
                  maxColumnsSelected &&
                  !selectedColumnIds.includes(colId as TColumnId);

                return (
                  <SelectedColumnItem
                    key={colId}
                    $disabled={disabled}
                    onClick={() =>
                      !disabled && columnItemOnClick(colId as TColumnId)
                    }
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
    </StyledLayoutPreview>
  );
};
