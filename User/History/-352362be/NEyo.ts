import { graphql, OptionProps } from '@apollo/client/react/hoc';
import { AppView, IAppViewProps } from './AppView';
import compose from 'lodash/flowRight';
import { withState, withHandlers } from 'recompose';
import get from 'lodash/get';
import { EUserGameMode } from '../../models/user';
import { GetAppUserDocument as GET_APP_USER } from './__generated__/GetAppUser.generated';

export interface IQueryResult {
  currentUser: {
    _id: string;
    roles: string[];
    game: {
      mode: EUserGameMode;
    };
  };
}

type IPropsFromGQL = Pick<
  IAppViewProps,
  'isLoading' | 'currentUserIsLoggedIn' | 'currentUserRoles'
>;

const mapQueryResultToProps = (
  props: OptionProps<{}, IQueryResult>
): IPropsFromGQL => {
  const {
    data: { loading: isLoading, currentUser },
  } = props;
  const currentUserIsLoggedIn = !!currentUser;

  return {
    isLoading,
    currentUserIsLoggedIn,
    currentUserRoles: get(currentUser, 'roles', []),
  };
};

export const appContainer = compose(
  graphql(GET_APP_USER, {
    props: mapQueryResultToProps,
  }),
  withState('isNavigationDrawerOpen', 'setNavigationDrawerState', false),
  withHandlers({
    openNavigationDrawer:
      ({ setNavigationDrawerState }) =>
      () =>
        setNavigationDrawerState(true),
    closeNavigationDrawer:
      ({ setNavigationDrawerState }) =>
      () =>
        setNavigationDrawerState(false),
  })
);

export const App = appContainer(AppView);
