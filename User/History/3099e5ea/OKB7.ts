import { DocumentNode } from '@apollo/client';

import { ISearchToken } from '@hox/ui/Search/models';

export type TUserActionView =
  | 'confirm'
  | 'progress'
  | 'result'
  | 'custom'
  | 'error';

export type TUserActionName =
  | 'invite_user'
  | 'soft_delete_user'
  | 'reactivate_user'
  | 'automatically_start'
  | 'set_user_properties'
  | 'export_user_csv';

export interface IUserAction {
  name: TUserActionName;
  mutation: DocumentNode;
  requireTwoStepVerification: boolean;
  customDialog?: ({
    searchTokens: ISearchToken[] | undefined,
    onActionCancel: () => void,
    onActionConfirm?: () => void,
    onActionFinish?: () => void
  }) => React.ReactNode;
}

export type TUserActionResult = {
  taskGroup?: {
    _id: string;
    estimatedTotalTaskCount: number;
  };
};
