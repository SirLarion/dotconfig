import { QuestState } from '@hox/frontend-utils/types/graphql.generated';

const { QUEST_STATE_FAILED, QUEST_STATE_MISSED, QUEST_STATE_SUCCESS } =
  QuestState;

const END_QUEST_STATES = [
  QUEST_STATE_SUCCESS,
  QUEST_STATE_FAILED,
  QUEST_STATE_MISSED,
];

// TODO: Validate if using microtraining status is necessary for quests
// that are failed on purpose
export const expectedTestQuestStateMap: Record<string, QuestState> = {
  ['hox.quest.bootcamp.0']: QuestState.QUEST_STATE_SUCCESS,
  ['hox.quest.bootcamp.4']: QuestState.QUEST_STATE_SUCCESS,
  ['hox.quest.bootcamp.2.en']: QuestState.QUEST_STATE_FAILED,
  ['hox.quest.bootcamp.3.fi']: QuestState.QUEST_STATE_FAILED,
};

export const isPendingTestQuest = (state: QuestState) =>
  !END_QUEST_STATES.includes(state);

export const TOAST_TIMEOUT_MS = {
  SUCCESS: 4000,
  ERROR: 8000,
};
