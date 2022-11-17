import { graphql } from '@apollo/client/react/hoc';
import MuiGravatar from '../../components/MuiGravatar';
import { GetCurrentUserAvatarDocument } from './__generated__/GetCurrentUserAvatar.generated';

import { getUserInitials, getUserEmailAddress } from '../../models/userGetters';

const currentUserQueryConf = {
  props: ({ data: { currentUser = {} } }) => ({
    email: getUserEmailAddress(currentUser),
    initials: getUserInitials(currentUser),
  }),
};

export default graphql(
  GetCurrentUserAvatarDocument,
  currentUserQueryConf
)(MuiGravatar);
