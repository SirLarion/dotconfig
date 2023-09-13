import { gql, useQuery } from '@apollo/client';

import { ESupportedLocales } from '@hox/frontend-utils/i18n';

import {
  useQuestTemplatePreviewQuery,
  QuestTemplatePreviewQuery,
  QuestTemplatePreviewQuery_questTemplates,
} from './graphql/__generated__/QuestTemplatePreviewQuery';
import {
  useQuestTemplateQuery,
  QuestTemplateQuery,
  QuestTemplateQuery_questTemplates,
} from './graphql/__generated__/QuestTemplateQuery';

export interface IQuestTemplate extends QuestTemplateQuery_questTemplates {}
export type TQuestTemplatePreview =
  QuestTemplatePreviewQuery_questTemplates['preview'];

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
