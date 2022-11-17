import { ReactNode } from 'react';

import { QuestState } from '@hox/frontend-utils/types/graphql.generated';

const {
  QUEST_STATE_ERROR,
  QUEST_STATE_FAILED,
  QUEST_STATE_MISSED,
  QUEST_STATE_NOT_STARTED,
  QUEST_STATE_STARTED,
  QUEST_STATE_SUCCESS,
} = QuestState;

export const QUEST_STATE_INTL: {
  [key in QuestState]: ReactNode;
} = {
  [QUEST_STATE_ERROR]: 'Error',
  [QUEST_STATE_FAILED]: 'Failed',
  [QUEST_STATE_MISSED]: 'Missed',
  [QUEST_STATE_NOT_STARTED]: 'Not sent',
  [QUEST_STATE_STARTED]: 'Sent',
  [QUEST_STATE_SUCCESS]: 'Success',
};

export const MICROTRAINING_INTL = '+ microtraining';
