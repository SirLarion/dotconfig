import { graphql } from '@apollo/client/react/hoc';
import get from 'lodash/get';
import { compose } from '../../components/higherOrderComponents';
import { withMutationState } from '../../components/higherOrderComponents/withMutationState';

import {
  GetMarkerListDocument,
  DeleteMarkerDocument,
} from './__generated__/MarkerList.generated';
import { MarkerList } from './MarkerListView';

export const deleteMarkerMutationConf = {
  props: ({ mutate = (conf: any) => null }) => ({
    deleteMarker: markerId =>
      mutate({
        variables: { markerId },
        update: (proxy, { data: { deleteMarker } }) => {
          const queryDef = {
            query: GetMarkerListDocument,
          };
          const data = proxy.readQuery(queryDef);
          data.markers = data.markers.filter(
            ({ _id }) => _id !== deleteMarker._id
          );
          proxy.writeQuery({ ...queryDef, data });
        },
      }),
  }),
};

export const markerListQueryConf = {
  props: props => ({
    isLoading: get(props.data, 'loading', false),
    markers: get(props.data, 'markers', []),
  }),
};

export const MarkerListContainer = compose(
  graphql(GetMarkerListDocument, markerListQueryConf),
  graphql(DeleteMarkerDocument, deleteMarkerMutationConf),
  withMutationState({ handlerName: 'deleteMarker' })
)(MarkerList);
