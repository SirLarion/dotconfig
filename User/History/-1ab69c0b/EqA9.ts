import { IUserAction } from '../types';

import { GenerateUserCSVFileDocument } from './graphql/__generated__/GenerateUserCSVFile.generated';

export const exportCsv: IUserAction = {
  name: 'export_user_csv',
  mutation: GenerateUserCSVFileDocument,
  requireTwoStepVerification: true,
  customDialog: (
    searchTokens: ISearchToken[] | undefined,
    onActionConfirm: () => void,
    onActionCancel: () => void
  ) => (
    <SetUserProperties
      searchTokens={searchTokens}
      onActionConfirm={onActionConfirm}
      onActionCancel={onActionCancel}
    />
  ),
};
