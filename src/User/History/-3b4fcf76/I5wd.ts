import { IIcuMessage } from '../../models/common';
import { LoadingQuery } from '../../components/LoadingQuery';

interface IQuizModuleFragment {
  quizTemplateIds: string[];
  name: IIcuMessage;
  _id: string;
}

interface IQuizModuleQueryData {
  quizModules: IQuizModuleFragment[];
}

interface IQuizModuleQueryVariables {}

export class QuizModuleQuery extends LoadingQuery<
  IQuizModuleQueryData,
  IQuizModuleQueryVariables
> {}
