import { expect } from 'chai';
import * as sinon from 'sinon';
import { getSchema, getApolloClient } from '../../../utils/testUtils';

import {
  markerListQueryConf,
  deleteMarkerMutationConf,
} from '../MarkerListContainer';
import {
  DeleteMarkerDocument,
  GetMarkerListDocument,
} from '../__generated__/MarkerList.generated';

const overrides = {
  resolvers: {
    RootQuery: {
      markers: () => [
        {
          _id: 'asd',
          tag: 'asd',
          title: {
            id: 'msgx',
            defaultMessage: 'defx',
          },
          description: {
            id: 'msgy',
            defaultMessage: 'defy',
          },
        },
      ],
    },
    RootMutation: {
      deleteMarker: () => ({ _id: 'marker' }),
    },
  },
};

describe('MarkerList', () => {
  describe('MARKER_QUERY', () => {
    const schema = getSchema(overrides);
    const client = getApolloClient({ schema });

    it('should return valid data ', async () => {
      const result = await client.query<any>({
        query: GetMarkerListDocument,
      });
      expect(result.data.markers.length).eql(1);
      expect(result.data.markers[0].__typename).eql('Marker');
    });
  });

  describe('DELETE_MARKER_MUTATION', () => {
    const schema = getSchema(overrides);
    const client = getApolloClient({ schema });

    it('should mutate marker', async () => {
      const result = await client.mutate<any>({
        mutation: DeleteMarkerDocument,
        variables: { markerId: 'mockId' },
      });

      expect(result.data.deleteMarker.__typename).eql('Marker');
    });
  });

  describe('markerListQueryConf', () => {
    it('should map query results to props', () => {
      expect(
        markerListQueryConf.props({ data: { loading: true, markers: 'asd' } })
      ).eql({ isLoading: true, markers: 'asd' });

      expect(markerListQueryConf.props({})).eql({
        isLoading: false,
        markers: [],
      });
    });
  });

  describe('deleteMarkerMutationConf', () => {
    it('should update client cache', () => {
      const mutate = sinon.spy();
      const proxy = {
        readQuery: sinon.stub().returns({ markers: [{ _id: 'markerId' }] }),
        writeQuery: sinon.spy(),
      };
      const mutationResult = {
        data: { deleteMarker: { _id: 'markerId' } },
      };

      const { deleteMarker } = deleteMarkerMutationConf.props({
        mutate,
      });

      deleteMarker('markerId');

      const { variables, update } = mutate.firstCall.args[0];
      expect(variables).eql({ markerId: 'markerId' });

      update(proxy, mutationResult);

      expect(proxy.readQuery.calledOnce).eql(true);
      expect(proxy.writeQuery.calledOnce).eql(true);
      expect(proxy.writeQuery.firstCall.args[0].data).eql({
        markers: [],
      });
    });
  });
});
