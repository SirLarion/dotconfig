import { LoadingQuery } from '../../components/LoadingQuery';

interface IQuizTemplateFragment {
  _id: string;
  tag: string;
}

interface IQuizTemplateQueryData {
  quizTemplates: IQuizTemplateFragment[];
}

interface IQuizTemplateQueryVariables {
  quizTemplateIds: string[];
}
export class QuizTemplateQuery extends LoadingQuery<
  IQuizTemplateQueryData,
  IQuizTemplateQueryVariables
> {}
