import { all } from 'ramda';

import { QuestState } from '@hox/frontend-utils/types/graphql.generated';
import { TestQuestFieldsFragment } from './hooks/__generated__/FetchOrganizationActiveTestQuests.generated';

const { QUEST_STATE_FAILED, QUEST_STATE_MISSED, QUEST_STATE_SUCCESS } =
  QuestState;

const END_QUEST_STATES = [
  QUEST_STATE_SUCCESS,
  QUEST_STATE_FAILED,
  QUEST_STATE_MISSED,
];

// TODO: Update with real deals
export const expectedTestQuestStateMap: Record<string, QuestState> = {
  ['hox.quest.bootcamp.0']: QuestState.QUEST_STATE_STARTED,
  ['hox.quest.bootcamp.4']: QuestState.QUEST_STATE_NOT_STARTED,
  ['hox.quest.bootcamp.2.en']: QuestState.QUEST_STATE_NOT_STARTED,
  ['hox.quest.bootcamp.3.fi']: QuestState.QUEST_STATE_STARTED,
};

export const getMicrotrainingStatus = (testCase: TestQuestFieldsFragment) => {
  const secondary = testCase.objectives.secondary;
  return all(o => !!o.completedAt, secondary);
};

export const isPendingTestQuest = (state: QuestState) =>
  !END_QUEST_STATES.includes(state);

export const TOAST_TIMEOUT_MS = {
  SUCCESS: 4000,
  ERROR: 8000,
};
