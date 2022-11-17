import { Mutation } from '../../utils/apollo';
import { EQuestOrigin } from '../../models/quest';

interface IData {}

interface IVariables {
  emails: string[];
  questTags: string[];
  origin: EQuestOrigin;
}

export class SendQuestsToEmailsMutation extends Mutation<IData, IVariables> {}
