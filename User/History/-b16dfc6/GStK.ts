import { gql, useQuery } from '@apollo/client';

import { ESupportedLocales } from '@hox/frontend-utils/i18n';

import {
  QuestTemplatePreviewQuery,
  QuestTemplatePreviewQuery_questTemplates,
} from './__generated__/QuestTemplatePreviewQuery';
import {
  QuestTemplateQuery,
  QuestTemplateQuery_questTemplates,
} from './__generated__/QuestTemplateQuery';

export interface IQuestTemplate extends QuestTemplateQuery_questTemplates {}
export type TQuestTemplatePreview =
  QuestTemplatePreviewQuery_questTemplates['preview'];

export const useQuestTemplatePreview = (
  questId: string,
  language?: ESupportedLocales
) => {
  const { data: templateData, loading: templateLoading } =
    useQuery<QuestTemplateQuery>(QUEST_TEMPLATE_QUERY, {
      variables: {
        questId,
      },
    });

  const { data: previewData, loading: previewLoading } =
    useQuery<QuestTemplatePreviewQuery>(QUEST_TEMPLATE_PREVIEW_QUERY, {
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
