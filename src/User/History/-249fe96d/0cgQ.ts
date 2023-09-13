import { graphql } from '@apollo/client/react/hoc';
import { compose } from 'recompose';
import DeleteThreatMenuItemView from './DeleteThreatMenuItemView';

const mapMutatorsToProps = ({ mutate, ownProps: { threatId } }) => {
  return {
    deleteThreat: () =>
      mutate({
        variables: { threatId },
        refetchQueries: ['RateThreatContainerQuery', 'ThreatWorkQueueQuery'],
      }),
  };
};

export const DeleteThreatMenuItemContainer = compose(
  graphql(DeleteThreatMutation, { props: mapMutatorsToProps })
)(DeleteThreatMenuItemView);
