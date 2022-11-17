import React, { FC } from 'react';
import styled from 'styled-components';

import { HoxIcon } from '@hox/ui/HoxIcon';
import { palette } from '@hox/ui/styles/theme';
import { SmallTextStrong } from '@hox/ui/Text';

import { QuestState as EQuestState } from '../../../../../types/graphql.generated';
import { USER_QUEST_PREVIEW_INTL as INTL } from '../intl';

const StyledQuestState = styled.div`
  display: flex;
  align-items: center;

  > :first-child {
    margin-right: 0.5rem;
    width: 1.25rem;
  }
`;

const assertUnreachable = (x: never): never => {
  throw new Error(`Encountered unexpected value that should not exist: ${x}`);
};

export interface IQuestStateProps {
  questState: EQuestState;
}

export const QuestState: FC<IQuestStateProps> = ({ questState }) => {
  const {
    QUEST_STATE_ERROR,
    QUEST_STATE_FAILED,
    QUEST_STATE_MISSED,
    QUEST_STATE_NOT_STARTED,
    QUEST_STATE_STARTED,
    QUEST_STATE_SUCCESS,
  } = EQuestState;
  switch (questState) {
    case QUEST_STATE_ERROR:
      return (
        <StyledQuestState>
          <HoxIcon.AttentionCircle color={palette(p => p.accent.danger)} />
          <SmallTextStrong>{INTL.questState.error}</SmallTextStrong>
        </StyledQuestState>
      );
    case QUEST_STATE_FAILED:
      return (
        <StyledQuestState>
          <HoxIcon.CrossCircle color={palette(p => p.accent.danger)} />
          <SmallTextStrong>{INTL.questState.failed}</SmallTextStrong>
        </StyledQuestState>
      );
    case QUEST_STATE_MISSED:
      return (
        <StyledQuestState>
          <HoxIcon.Hide color={palette(p => p.accent.boring)} />
          <SmallTextStrong>{INTL.questState.missed}</SmallTextStrong>
        </StyledQuestState>
      );
    case QUEST_STATE_NOT_STARTED:
      return (
        <StyledQuestState>
          <HoxIcon.MailSpam />
          <SmallTextStrong>{INTL.questState.notStarted}</SmallTextStrong>
        </StyledQuestState>
      );
    case QUEST_STATE_STARTED:
      return (
        <StyledQuestState>
          <HoxIcon.MailReported />
          <SmallTextStrong>{INTL.questState.started}</SmallTextStrong>
        </StyledQuestState>
      );
    case QUEST_STATE_SUCCESS:
      return (
        <StyledQuestState>
          <HoxIcon.CheckCircle color={palette(p => p.accent.positive)} />
          <SmallTextStrong>{INTL.questState.success}</SmallTextStrong>
        </StyledQuestState>
      );
    default:
      return assertUnreachable(questState);
  }
};
