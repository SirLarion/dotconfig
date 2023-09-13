import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

import {
  EAnalyticsEvent,
  QuestState,
} from '@hox/frontend-utils/types/graphql.generated';
import { HoxIcon } from '@hox/ui/HoxIcon';
import { palette, theme, themeProp } from '@hox/ui/styles/theme';

import {
  USER_ACTIVITY_TIMELINE_EVENT_MESSAGES as INTL,
  getQuestRereportedMessage,
} from '../../intl';
import { UserActivityTimelineItemFragment } from '../../graphql/__generated__/FetchUserActivityTimeline.generated';

interface IUserActivityEventInfo {
  icon: ReactNode;
  title: ReactNode;
  event: EAnalyticsEvent | null;
}

const IconStyled = styled.div<{ $bgColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  margin-left: -2.2rem;
  margin-top: -0.2rem;
  border-radius: ${themeProp(t => t.borderRadius.default)};
  background-color: ${props => props.$bgColor};
`;

const Icon: FC<{
  icon: ReactNode;
  bgColor: string;
}> = ({ icon, bgColor }) => <IconStyled $bgColor={bgColor}>{icon}</IconStyled>;

const USER_TIMELINE_DATA: IUserActivityEventInfo[] = [
  {
    event: EAnalyticsEvent.engine_quest_started,
    icon: (
      <Icon
        bgColor={palette(p => p.accent.info.ghosted, theme)}
        icon={<HoxIcon.Mail color={palette(p => p.accent.info)} />}
      />
    ),
    title: INTL.engine_quest_started,
  },
  {
    event: EAnalyticsEvent.engine_quest_failed,
    icon: (
      <Icon
        bgColor={palette(p => p.accent.danger.ghosted, theme)}
        icon={<HoxIcon.CrossCircle color={palette(p => p.accent.danger)} />}
      />
    ),
    title: INTL.engine_quest_failed,
  },
  {
    event: EAnalyticsEvent.engine_quest_succeeded,
    icon: (
      <Icon
        bgColor={palette(p => p.accent.positive.ghosted, theme)}
        icon={<HoxIcon.CheckCircle color={palette(p => p.accent.positive)} />}
      />
    ),
    title: INTL.engine_quest_success,
  },
  {
    event: EAnalyticsEvent.engine_quest_missed,
    icon: (
      <Icon
        bgColor={palette(p => p.accent.boring.faded, theme)}
        icon={<HoxIcon.Hide color={palette(p => p.accent.boring)} />}
      />
    ),
    title: INTL.engine_quest_missed,
  },
  {
    event: EAnalyticsEvent.engine_player_rewarded,
    icon: (
      <Icon
        bgColor={palette(p => p.accent.golden.ghosted, theme)}
        icon={<HoxIcon.Star color={palette(p => p.accent.golden)} />}
      />
    ),
    title: INTL.engine_markers_viewed_player_rewarded,
  },
  {
    event: EAnalyticsEvent.user_onboarded,
    icon: (
      <Icon
        bgColor={palette(p => p.accent.bubbleGum.ghosted, theme)}
        icon={<HoxIcon.Profile color={palette(p => p.accent.bubbleGum)} />}
      />
    ),
    title: INTL.user_onboarded,
  },
];

export const USER_TIMELINE_EVENTS = USER_TIMELINE_DATA.map(d => d.event);

const PARSED_QUEST_STATES: Partial<Record<QuestState, string>> = {
  [QuestState.QUEST_STATE_SUCCESS]: 'succeeded',
  [QuestState.QUEST_STATE_FAILED]: 'failed',
  [QuestState.QUEST_STATE_MISSED]: 'missed',
};

const getParsedQuestState = (questState?: QuestState) =>
  questState && PARSED_QUEST_STATES[questState];

export const getUserActivityEventInfo = (
  event: UserActivityTimelineItemFragment
): IUserActivityEventInfo | undefined => {
  if (event.event === EAnalyticsEvent.engine_quest_rereported) {
    const questState = PARSED_QUEST_STATES?.[event.quest?.state];
    if (!questState) {
      return undefined;
    }
    return {
      event: event.event,
      icon: (
        <Icon
          bgColor={palette(p => p.accent.boring.faded, theme)}
          icon={<HoxIcon.Hide color={palette(p => p.accent.boring)} />}
        />
      ),
      title: getQuestRereportedMessage(questState),
    };
  }
  return USER_TIMELINE_DATA.find(d => d.event === event.event);
};
