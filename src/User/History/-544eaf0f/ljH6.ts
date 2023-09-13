import { ComponentType } from 'react';
import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';
import { EClientEvent, persistedClientEvents } from '../../../models/analytics';
import { UserEventsFragment } from '../../../types/userFragments';
import { IEventSaverProp } from '../models';

interface IWithCurrentUserEventsProps {
  currentUserData: {
    currentUser: {
      _id: string;
      events: Array<{ eventName: EClientEvent; eventCount: number }>;
    };
  };
}

// Current user query
const eventSaverQuery = gql`
  ${UserEventsFragment}
`;

const eventSaverQueryConf = {
  name: 'currentUserData',
};

const withCurrentUserData = graphql<
  any,
  IWithCurrentUserEventsProps,
  {},
  IWithCurrentUserEventsProps
>(eventSaverQuery, eventSaverQueryConf);

// Events mutation
export const saveEvents =
  (mutate, currentUser) => (eventNames: EClientEvent[]) => {
    const uiEvents = eventNames
      .filter(eventName => persistedClientEvents.indexOf(eventName) !== -1)
      .map(eventName => ({ eventName }));
    if (uiEvents.length > 0) {
      mutate({
        variables: {
          uiEvents,
        },
      });
    }
  };

const addEventsMutationConf = {
  name: 'eventMutation',
  props: ({ eventMutation, ownProps }) => ({
    saveUiEvent: eventName =>
      saveEvents(
        eventMutation,
        ownProps.currentUserData.currentUser
      )([eventName]),
  }),
};

export const withEventSaver = <TProps>(
  Component: ComponentType<TProps & IEventSaverProp>
): ComponentType<Omit<TProps & IEventSaverProp, keyof IEventSaverProp>> =>
  withCurrentUserData(
    graphql(addEventMutation, addEventsMutationConf)(Component)
  );
