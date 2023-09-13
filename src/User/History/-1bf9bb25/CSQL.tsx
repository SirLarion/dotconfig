import React, { FC } from 'react';
import styled from 'styled-components';

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

const BLACKLISTED_COLUMNS = ['last10Quests'];

export const CSVColumnSelector: FC<ICSVColumnSelectorProps> = ({
  ...restProps
}) => {
  return (
    <StyledCSVColumnSelector {...restProps}>
      <ColumnSelect>
        {Object.entries(AVAILABLE_COLUMNS).map(
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
    </StyledCSVColumnSelector>
  );
};
