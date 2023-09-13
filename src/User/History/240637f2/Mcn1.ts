import { LoadingQuery } from '../../components/LoadingQuery';

export type TQtFilter = {
  tag_starts_with?: string;
};

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
  >;
