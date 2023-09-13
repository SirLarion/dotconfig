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

import { getComboFieldComponents, isBlacklisted } from './lib';

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

const IndentedColumnItem = styled(SelectedColumnItem)`
  margin-left: 1.5rem;
`;

export const CSVColumnSelector: FC<ICSVColumnSelectorProps> = ({
  selectedColumnIds,
  setSelectedColumnIds,
  ...restProps
}) => {
  const columnItemOnClick = (colId: TColumnId, comboIds?: TColumnId[]) =>
    setSelectedColumnIds(currentlySelected =>
      currentlySelected.includes(colId)
        ? without([colId, ...(comboIds || [])], currentlySelected)
        : [...currentlySelected, ...(comboIds || []), colId]
    );

  const comboFieldComponents = getComboFieldComponents();

  return (
    <StyledCSVColumnSelector {...restProps}>
      <ColumnSelect>
        {Object.entries(AVAILABLE_COLUMNS).map(
          ([, { id, label, tooltip, comboField }]) => {
            if (comboFieldComponents.includes(id)) {
              return;
            }
            const disabled = isBlacklisted(id);

            return (
              <>
                <SelectedColumnItem
                  key={id}
                  $disabled={disabled}
                  onClick={() => !disabled && columnItemOnClick(id)}
                >
                  <Checkbox
                    checked={selectedColumnIds.includes(id)}
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
                {comboField &&
                  comboField.map(comboId => {
                    const { label: comboLabel, tooltip: comboTooltip } =
                      AVAILABLE_COLUMNS[comboId];
                    const comboDisabled = isBlacklisted(comboId);

                    return (
                      <IndentedColumnItem
                        key={comboId}
                        $disabled={comboDisabled}
                        onClick={() =>
                          !comboDisabled && columnItemOnClick(comboId)
                        }
                      >
                        <Checkbox
                          checked={selectedColumnIds.includes(comboId)}
                          disabled={comboDisabled}
                        />
                        <Body>{comboLabel}</Body>
                        {comboTooltip && (
                          <Tooltip
                            zIndex={100}
                            position="right"
                            tooltipBoxChildren={
                              <ButtonText>{comboTooltip}</ButtonText>
                            }
                          >
                            <HoxIcon.QuestionCircle faded size={1.25} />
                          </Tooltip>
                        )}
                      </IndentedColumnItem>
                    );
                  })}
              </>
            );
          }
        )}
      </ColumnSelect>
    </StyledCSVColumnSelector>
  );
};
