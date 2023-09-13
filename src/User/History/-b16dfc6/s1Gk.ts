import { ESupportedLocales } from '@hox/frontend-utils/i18n';

import {
  useQuestTemplateQuery,
  useQuestTemplatePreviewQuery,
  QuestTemplateQuery,
  QuestTemplatePreviewQuery,
} from './graphql/__generated__/QuestTemplateQuery.generated';

export interface IQuestTemplate extends QuestTemplateQuery_questTemplates {}
export type TQuestTemplatePreview =
  QuestTemplatePreviewQuery['questTemplates']['preview'];

export const useQuestTemplatePreview = (
  questId: string,
  language?: ESupportedLocales
) => {
  const { data: templateData, loading: templateLoading } =
    useQuestTemplateQuery({
      variables: {
        questId,
      },
    });

  const { data: previewData, loading: previewLoading } =
    useQuestTemplatePreviewQuery({
      variables: {
        questId,
        language,
      },
    });

  const questTemplate = templateData?.questTemplates[0];
  const questTemplatePreview = previewData?.questTemplates[0].preview;

  return {
    questTemplate,
    questTemplatePreview,
    templateLoading,
    previewLoading,
  };
};
