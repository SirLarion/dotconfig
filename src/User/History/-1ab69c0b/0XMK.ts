import { IUserAction } from '../types';

import { GenerateUserCSVFileDocument } from './graphql/__generated__/GenerateUserCSVFile.generated';

export const exportCsv: IUserAction = {
  name: 'export_user_csv',
  mutation: GenerateUserCSVFileDocument,
  requireTwoStepVerification: true,
};
