import { graphql, OptionProps } from '@apollo/client/react/hoc';
import { AppView, IAppViewProps } from './AppView';
import compose from 'lodash/flowRight';
import { withState, withHandlers } from 'recompose';
import get from 'lodash/get';
import { EUserGameMode } from '../../models/user';

export interface IQueryResult {
  currentUser: {
    _id: string;
    roles: string[];
    game: {
      mode: EUserGameMode;
    };
  };
}

export const appContainer = compose(
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
