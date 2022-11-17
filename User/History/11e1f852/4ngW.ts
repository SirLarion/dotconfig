import { graphql } from '@apollo/client/react/hoc';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import reduxForm from 'redux-form/lib/reduxForm';
import get from 'lodash/get';
import { compose } from 'recompose';
import { IMarker } from '../../models/marker';
import {
  createNotificationFromText,
  createPrebuildNotification,
} from '../../utils/notification/lib';
import {
  GetSingleMarkerDocument,
  CreateOrUpdateMarkerDocument,
} from './__generated__/SingleMarker.generated';

import { MarkerView } from './MarkerView';
import { makeSubmittable, FORM_NAME } from './lib';

const mapDispatchToProps = dispatch => {
  return {
    showSuccessNotification: () =>
      dispatch(createPrebuildNotification('success')),
    showErrorNotification: error =>
      dispatch(createNotificationFromText('error', error.message)),
  };
};

export const redirToNewMarker = (history, newMarker) =>
  history.push(`/markers/${newMarker._id}`);

interface IQueryConfData {
  markers?: IMarker[];
  loading?: boolean;
}

interface IQueryConfProps {
  data?: IQueryConfData;
}

export const queryConf = {
  options: ({ match }) => ({
    variables: {
      id: match.params.markerId,
    },
  }),
  props: ({ data = {} }: IQueryConfProps) => {
    const marker = get(data, 'markers.0', {});
    return {
      marker,
      initialValues: marker,
      isLoading: get(data, 'loading', true),
    };
  },
};

export const saveMarkerMutationConf = {
  props: ({
    mutate,
    ownProps: { history, showSuccessNotification, showErrorNotification },
  }) => {
    return {
      onSubmit: markerInput => {
        const marker = makeSubmittable(markerInput);
        mutate({ variables: { marker } })
          .then(({ data: { createOrUpdateMarker } }) => {
            if (marker._id !== undefined) {
              showSuccessNotification();
            } else {
              redirToNewMarker(history, createOrUpdateMarker);
            }
          })
          .catch(showErrorNotification);
      },
    };
  },
};

export const wrapWithContainer = compose(
  withRouter,
  connect(null, mapDispatchToProps),
  graphql(GetSingleMarkerDocument, queryConf),
  graphql(CreateOrUpdateMarkerDocument, saveMarkerMutationConf),
  reduxForm({
    form: FORM_NAME,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
  })
);

export default wrapWithContainer(MarkerView);
