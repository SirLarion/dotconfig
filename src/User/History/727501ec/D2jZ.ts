import { Mutation } from '../../utils/apollo';

import { ITaskGroup } from '../../models/common';
import { EQuestOrigin } from '../../models/quest';

interface ISendQuestToOrganizationMutationData {
  taskGroup: ITaskGroup;
}

interface ISendQuestToOrganizationMutationVariables {
  organizationId: string;
  templateTag: string;
  origin: EQuestOrigin;
}

export class SendQuestToOrganizationMutation extends Mutation<
  ISendQuestToOrganizationMutationData,
  ISendQuestToOrganizationMutationVariables
> {}
