import { ISearchToken } from '@hox/ui/Search/models';

import { IUserAction } from '../types';
import { ExportUserCSV } from '../components/ExportUserCSV';

import { GenerateUserCSVFileDocument } from './graphql/__generated__/GenerateUserCSVFile.generated';

export const exportCsv: IUserAction = {
  name: 'export_user_csv',
  mutation: GenerateUserCSVFileDocument,
  requireTwoStepVerification: true,
  // eslint-disable-next-line react/display-name
  customDialog: (
    searchTokens: ISearchToken[] | undefined,
    onActionConfirm: () => void,
    onActionCancel: () => void
  ) => {
    return (
      <ExportUserCSV
        searchTokens={searchTokens}
        onActionConfirm={onActionConfirm}
        onActionCancel={onActionCancel}
      />
    );
  },
};
