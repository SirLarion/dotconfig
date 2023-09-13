import React, { FC } from 'react';
import styled from 'styled-components';
import { reverse } from 'ramda';

import { palette } from '@hox/ui/styles/theme';

import { QuestState } from '../../../../../../types/graphql.generated';

const BAR_HEIGHT_REM = 1.375;
const MISSED_BAR_HEIGHT_REM = 0.375;

const { QUEST_STATE_SUCCESS, QUEST_STATE_FAILED, QUEST_STATE_MISSED } =
  QuestState;

type TState =
  | typeof QUEST_STATE_SUCCESS
  | typeof QUEST_STATE_FAILED
  | typeof QUEST_STATE_MISSED;

type TLast10QuestsBarPropertiesMap = {
  [value in TState]: {
    height: number;
    color: string;
    borderColor: string;
  };
};

const last10QuestsBarPropertiesMap: TLast10QuestsBarPropertiesMap = {
  [QuestState.QUEST_STATE_SUCCESS]: {
    height: BAR_HEIGHT_REM,
    color: palette(p => p.accent.positive),
    borderColor: palette(p => p.accent.positive.ghosted),
  },
  [QuestState.QUEST_STATE_FAILED]: {
    height: BAR_HEIGHT_REM,
    color: palette(p => p.accent.danger),
    borderColor: palette(p => p.accent.danger.ghosted),
  },
  [QuestState.QUEST_STATE_MISSED]: {
    height: MISSED_BAR_HEIGHT_REM,
    color: palette(p => p.accent.boring.dimmed),
    borderColor: palette(p => p.accent.boring.ghosted),
  },
};

const StyledLast10QuestsGraph = styled.div`
  display: flex;
  align-items: flex-end;

  > :not(:last-child) {
    margin-right: 0.313rem;
  }
`;

const Bar = styled.span<{
  $color: string;
  $height: number;
  $borderColor: string;
}>`
  display: block;
  width: ${MISSED_BAR_HEIGHT_REM}rem;
  border-radius: 0.5rem;
  height: ${props => `${props.$height}rem` || '1.5rem'};
  background: ${props => props.$color};
  box-shadow: 0 0 0 0.125rem ${props => props.$borderColor};
`;

export const Last10QuestsGraph: FC<{
  last10Quests: Array<string | null>;
}> = ({ last10Quests, ...restProps }) => {
  return (
    <StyledLast10QuestsGraph {...restProps}>
      {reverse(last10Quests).map((questState, index) => {
        const { color, borderColor, height } =
          last10QuestsBarPropertiesMap[questState as TState];
        return (
          <Bar
            key={index}
            $color={color}
            $height={height}
            $borderColor={borderColor}
          />
        );
      })}
    </StyledLast10QuestsGraph>
  );
};
