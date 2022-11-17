import { useFetchTabQuestTemplateCountQuery } from '../../TrainingManagement/hooks/graphql/__generated__/FetchTabQuestTemplateCount.generated';

export const useTabQuestCount = (variables: {
  filter?: Record<string, unknown>;
  search?: string;
}) => {
  const { loading, data } = useFetchTabQuestTemplateCountQuery({
    variables,
  });

  const questCount =
    data?.currentUser?.organization.questTemplatesConnection.totalCount;

  return { loading, questCount };
};
