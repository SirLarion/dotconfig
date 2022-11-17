import { graphql } from '@apollo/client/react/hoc';
import { compose } from 'recompose';
import DeleteThreatMenuItemView from './DeleteThreatMenuItemView';
import { DeleteThreatDocument } from './__generated__/DeleteThreat.generated';

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
  graphql(DeleteThreatDocument, { props: mapMutatorsToProps })
)(DeleteThreatMenuItemView);
