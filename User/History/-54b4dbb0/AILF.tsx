import React from 'react';
import randomColor from 'randomcolor';
import md5 from 'md5';
import { createStyles, Theme } from '@material-ui/core/styles';
import { gql } from '@apollo/client';
import get from 'lodash/get';
import { Query } from '../../../utils/apollo';
import { createStyleProvider } from '../../../components/ui/Style/createStyled';
import {
  getUserInitials,
  getUserEmailAddress,
  getUsername,
} from '../../../models/userGetters';
import { GetCurrentUserAvatarDocument } from './__generated__/GetCurrentUserAvatar.generated';

export interface IUserAvatarProps {
  fullName: string;
  initials: string;
  email: string;
  luminosity?: RandomColorOptions['luminosity'];
  size?: number;
}

const Styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      fontFamily: theme.facelift.fontFamily,
      color: theme.facelift.palette.white,
      alignItems: 'center',
      fontWeight: 'bold',
      fontSize: '1rem',
      margin: '20px',
    },
    avatar: {
      textTransform: 'uppercase',
      borderRadius: '50%',
      overflow: 'hidden',
      userSelect: 'none',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      width: 40,
      height: 40,
      color: '#000000',
      fontSize: '1.2rem',
    },
    name: {
      textTransform: 'capitalize',
      alignSelf: 'center',
      marginLeft: '22px',
    },
    image: {
      position: 'absolute',
      alignSelf: 'center',
      left: 0,
      top: 0,
    },
  });

const StyleProvider = createStyleProvider(Styles);

const getGravatarUrl = ({ email = 'not@found.hoxhunt.com', size }) =>
  `https://www.gravatar.com/avatar/${md5(email)}?s=${size}&d=blank`;

export const UserAvatarView: React.SFC<IUserAvatarProps> = ({
  fullName,
  initials,
  email,
  luminosity = 'light',
  size = 40,
}) => (
  <StyleProvider>
    {styles => (
      <div className={styles.classes.root}>
        <div
          className={styles.classes.avatar}
          data-test-id="profile-initials"
          style={{ backgroundColor: randomColor({ seed: email, luminosity }) }}
        >
          {initials}
          <img
            alt=""
            src={getGravatarUrl({ email, size })}
            className={styles.classes.image}
          />
        </div>
        <span data-test-id="profile-name" className={styles.classes.name}>
          {fullName}
        </span>
      </div>
    )}
  </StyleProvider>
);

export const CURRENT_USER_QUERY = gql``;

export const UserAvatar: React.SFC = () => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data }) => {
      const currentUser = get(data, 'currentUser');
      const props = {
        fullName: getUsername(currentUser),
        email: getUserEmailAddress(currentUser),
        initials: getUserInitials(currentUser),
      };
      return <UserAvatarView {...props} />;
    }}
  </Query>
);
