import { LoadingQuery } from '../../components/LoadingQuery';

interface IQuestTemplateFragment {
  tag: string;
}

interface IQuestTemplateQueryData {
  questTemplates: IQuestTemplateFragment[];
}

interface IQuestTemplateQueryVariables {}

export class QuestTemplateQuery extends LoadingQuery<
  IQuestTemplateQueryData,
  IQuestTemplateQueryVariables
> {}
