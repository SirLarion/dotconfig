export const useToggleQuestTemplateSoftDeletion = () => {
  const [toggleQTSoftDeletion, { error, data }] = useMutation(
    TOGGLE_QUEST_TEMPLATE_SOFT_DELETION
  );

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
