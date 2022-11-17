import { SUPPORTED_LOCALE } from '../../../../../types/graphql.generated';

import {
  useQuestTemplateQuery,
  useQuestTemplatePreviewQuery,
  QuestTemplateQuery,
  QuestTemplatePreviewQuery,
} from './graphql/__generated__/QuestTemplateQuery.generated';

export type TQuestTemplate = QuestTemplateQuery['questTemplates'][number];
export type TQuestTemplatePreview =
  QuestTemplatePreviewQuery['questTemplates'][number]['preview'];

export const useQuestTemplatePreview = (
  questId: string,
  language?: SUPPORTED_LOCALE
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
