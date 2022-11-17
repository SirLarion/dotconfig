import React, { FC } from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { IDropdownItem } from '@hox/ui/Dropdown';
import { SmallText } from '@hox/ui/Text';
import { Tooltip } from '@hox/ui/Tooltip';

import { USER_GAME_MODE } from '../../../../../types/graphql.generated';
import { organizationImportSettingsState } from '../../../../../views/UserImport/recoil/atoms';
import {
  IImportableUser,
  IUserImportRow,
  IUserImportTableCellProps,
} from '../../../../UserImport/lib';
import { selectUserGameMode } from '../../../recoil/selectors';
import {
  CellStyled,
  CellText,
  DefaultValueCellText,
  UserImportDropdown,
} from '../cells/components/index';

const GameModeCell = styled(CellStyled)<IGameModeCellProps>`
  padding-right: 2rem;
  box-sizing: border-box;

  > :first-child {
    flex: 0 0 100%;
  }
`;

const StyledTooltip = styled(Tooltip)`
  > :first-child {
    flex-grow: 1;
  }
`;
interface IGameModeCellProps {
  $editable?: boolean;
  $isValid?: boolean;
}

export type TGameModeCellValue = {
  user: Pick<IImportableUser, 'gameMode'>;
  errors: Pick<IUserImportRow['errors'], 'gameMode'>;
};

const gameModeCellValueOptions: IDropdownItem[] = [
  {
    value: USER_GAME_MODE.INTENSIVE,
  },
  {
    value: USER_GAME_MODE.REPORT_ONLY,
  },
];

export const UserImportGameModeCell: FC<
  IUserImportTableCellProps<TGameModeCellValue>
> = ({ cell, rowId, rowFocus, rowValue }) => {
  const intl = useIntl();
  const {
    user: { gameMode },
    errors,
  } = rowValue;
  const [error] = errors.gameMode || [];
  const { defaultGameMode } = useRecoilValue(organizationImportSettingsState);

  const setGameMode = useSetRecoilState(selectUserGameMode(rowId));

  const handleOnChange = (
    selected: IDropdownItem | IDropdownItem[] | undefined
  ) => {
    if (Array.isArray(selected) || !selected) {
      return;
    }
    setGameMode(selected.value as USER_GAME_MODE);
  };

  return (
    <GameModeCell {...cell.getCellProps()}>
      <StyledTooltip
        width={12}
        disabled={!error}
        tooltipBoxChildren={
          error ? <SmallText>{intl.formatMessage(error)}</SmallText> : null
        }
      >
        {rowFocus ? (
          <UserImportDropdown
            small
            $isValid={!error}
            items={gameModeCellValueOptions}
            initialSelected={{ value: gameMode } as IDropdownItem}
            onChange={selected => handleOnChange(selected)}
          />
        ) : (
          <>
            {gameMode ? (
              <CellText $isValid={!error}>{gameMode}</CellText>
            ) : (
              <DefaultValueCellText>{defaultGameMode}</DefaultValueCellText>
            )}
          </>
        )}
      </StyledTooltip>
    </GameModeCell>
  );
};
