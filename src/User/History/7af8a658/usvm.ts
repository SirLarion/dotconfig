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

export * from './__generated__/GetQuizTemplates.generated';

export class QuizTemplateQuery extends LoadingQuery<
  IQuizTemplateQueryData,
  IQuizTemplateQueryVariables
> {}
