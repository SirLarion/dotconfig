import React from 'react';

import { ExportUserCSV } from '../components/ExportUserCSV';
import { IUserAction } from '../types';

import { GenerateUserCSVFileDocument } from './graphql/__generated__/GenerateUserCSVFile.generated';

export const exportCsv: IUserAction = {
  name: 'export_user_csv',
  mutation: GenerateUserCSVFileDocument,
  requireTwoStepVerification: true,
  // eslint-disable-next-line react/display-name
  customDialog: ({ searchTokens, onActionCancel, onActionFinish }) => (
    <ExportUserCSV
      searchTokens={searchTokens}
      onActionFinish={onActionFinish}
      onActionCancel={onActionCancel}
    />
  ),
};
