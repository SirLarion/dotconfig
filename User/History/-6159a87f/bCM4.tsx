import React from 'react';
import { FormattedMessage } from 'react-intl';
import { graphql } from '@apollo/client/react/hoc';
import compose from 'lodash/flowRight';
import get from 'lodash/get';
import { Checkbox } from '../../components/Checkbox/Checkbox';
import { mapProps } from 'recompose';

import omit from 'lodash/omit';

interface ICurrentUserProps {
  data?: {
    currentUser?: {
      _id?: string;
      profile: {
        isAnonymous: boolean;
      };
    };
  };
}

export const currentUserQueryConf = {
  props: ({ data: { currentUser } }: ICurrentUserProps) => {
    return {
      value: get(currentUser, 'profile.isAnonymous'),
      userId: get(currentUser, '_id'),
    };
  },
};

const getUserInput =
  (userId: string, profileFieldName: string) => (profileFieldValue: any) => {
    return {
      user: { _id: userId, profile: { [profileFieldName]: profileFieldValue } },
    };
  };

const updateCurrentUserPublicUser =
  (currentUserQueryDef: { query: string; variables?: any }) =>
  (proxy: any, mutationResult: any) => {
    const queryData = proxy.readQuery(currentUserQueryDef);
    const publicCurrentUser = {
      ...queryData.publicCurrentUser,
      profile: mutationResult.data.updateUser.profile,
    };
    proxy.writeQuery({
      ...currentUserQueryDef,
      data: { ...queryData, publicCurrentUser },
    });
  };

const callMutate =
  (mutate, currentUserQueryDef: { query: any; variables?: any }) => userInput =>
    mutate({
      variables: userInput,
      update: updateCurrentUserPublicUser(currentUserQueryDef),
    });

const mutateUserProfile = (
  mutate: (...args: any[]) => void,
  userId: string,
  profileFieldName: string
) =>
  compose(
    callMutate(mutate, { query: CURRENT_USER_QUERY }),
    getUserInput(userId, profileFieldName)
  );

export const updateUserMutationConf = {
  props: ({ mutate, ownProps }) => {
    return {
      onChange: mutateUserProfile(mutate, ownProps.userId, 'isAnonymous'),
      label: (
        <FormattedMessage
          id="app.form.anonymousModeToggle.label"
          defaultMessage="Anonymous mode"
          description="A form control where users can toggle whether they appear as anonymised or not"
        />
      ),
    };
  },
};

export const AnonymousModeSetter = compose(
  graphql(CURRENT_USER_QUERY, currentUserQueryConf),
  graphql(UPDATE_USER_ANONYMITY, updateUserMutationConf),
  mapProps(props => omit(props, ['userId']))
)(Checkbox);
