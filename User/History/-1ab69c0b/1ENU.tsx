import React from 'react';

import { ISearchToken } from '@hox/ui/Search/models';

import { ExportUserCSV } from '../components/ExportUserCSV';
import { IUserAction } from '../types';

import { GenerateUserCSVFileDocument } from './graphql/__generated__/GenerateUserCSVFile.generated';

export const exportCsv: IUserAction = {
  name: 'export_user_csv',
  mutation: GenerateUserCSVFileDocument,
  requireTwoStepVerification: true,
  // eslint-disable-next-line react/display-name
  customDialog: ({
    searchTokens: ISearchToken[] | undefined,
    onActionCancel: () => void,
    onActionFinish: () => void
}) => (
    <ExportUserCSV
      searchTokens={searchTokens}
      onActionFinish={onActionFinish}
      onActionCancel={onActionCancel}
    />
  ),
};
