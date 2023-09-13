import { IUserAction } from '../types';

import { DeactivateUsersDocument } from './graphql/__generated__/DeactivateUsers.generated';

export const deactivateUsers: IUserAction = {
  name: 'soft_delete_user',
  mutation: DeactivateUsersDocument,
  requireTwoStepVerification: true,
};
