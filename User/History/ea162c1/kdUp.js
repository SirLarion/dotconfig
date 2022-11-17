import { graphql } from '@apollo/client/react/hoc';
import { compose } from 'recompose';
import omit from 'lodash/omit';
import { mapProps } from 'recompose';

import { getUserCountryCode } from '../../models/userGetters';
import {
  GetCurrentUserLocationDocument,
  SetCurrentUserLocationDocument,
} from './__generated__/UserLocation.generated';
import LocationSelector from '../../components/LocationSelector';

const currentUserQueryConf = {
  props: ({ data: { currentUser = {} } }) => {
    return {
      value: getUserCountryCode(currentUser),
      userId: currentUser._id,
    };
  },
};

const updateUserMutationConf = {
  props: ({ mutate, ownProps }) => {
    const getUser = country => {
      return { user: { _id: ownProps.userId, profile: { country } } };
    };
    return {
      onChange: country => mutate({ variables: getUser(country) }),
    };
  },
};

export default compose(
  graphql(GetCurrentUserLocationDocument, currentUserQueryConf),
  graphql(SetCurrentUserLocationDocument, updateUserMutationConf),
  mapProps(props => omit(props, ['userId']))
)(LocationSelector);
