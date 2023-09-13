import { Mutation } from '../../utils/apollo';

interface IPartialGQLTaskGroup {
  _id: string;
}

interface IImportUsersMutationData {
  uploadUsersCsv: IPartialGQLTaskGroup;
}

interface IImportUsersMutationVariables {
  file: File;
  organizationId: string;
}

export class ImportUsersMutation extends Mutation<
  IImportUsersMutationData,
  IImportUsersMutationVariables
> {}
