import { graphql } from '@apollo/client/react/hoc';
import MuiGravatar from '../../components/MuiGravatar';

import { getUserInitials, getUserEmailAddress } from '../../models/userGetters';

const currentUserQueryConf = {
  props: ({ data: { currentUser = {} } }) => ({
    email: getUserEmailAddress(currentUser),
    initials: getUserInitials(currentUser),
  }),
};

export default graphql(CURRENT_USER_QUERY, currentUserQueryConf)(MuiGravatar);
