import React from 'react';

import { SetUserProperties } from '../components/SetUserProperties';
import { IUserAction } from '../types';

import { SetUserPropertiesDocument } from './graphql/__generated__/SetUserProperties.generated';

export const setUserProperties: IUserAction = {
  name: 'set_user_properties',
  mutation: SetUserPropertiesDocument,
  requireTwoStepVerification: false,
  // eslint-disable-next-line react/display-name
  customDialog: ({ searchTokens, onActionConfirm, onActionCancel }) => (
    <SetUserProperties
      searchTokens={searchTokens}
      onActionConfirm={onActionConfirm}
      onActionCancel={onActionCancel}
    />
  ),
};
