import { IMongoParams } from '@server/domains/collection/lib/mongo/lib/models';
import { IQuestTemplate } from '@server/lib/typedSchemas/QuestTemplate/QuestTemplate';

export const clampSelectorToTestTemplates = (
  params: IMongoParams<IQuestTemplate>
) => {
  const selectorParam = params?.selector || {};
  return {
    ...params,
    selector: {
      $and: [selectorParam, { 'tags.value': 'mode:technical test' }],
    },
  };
};
