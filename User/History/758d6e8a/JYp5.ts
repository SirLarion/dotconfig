import { useToggleQuestTemplateSoftDeletionMutation } from './graphql/__generated__/QuestTemplates.generated';

export const useToggleQuestTemplateSoftDeletion = () => {
  const [toggleQTSoftDeletion, { error, data }] =
    useToggleQuestTemplateSoftDeletionMutation();

  const toggleQTDeletion = questTemplateId => {
    try {
      toggleQTSoftDeletion({
        variables: { questTemplateId },
      });
    } catch (error) {}
  };

  return {
    toggleQTDeletion,
    error,
    data,
  };
};
