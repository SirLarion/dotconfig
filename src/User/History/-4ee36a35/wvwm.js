import { connect } from 'react-redux';
import { withApollo } from '@apollo/client/react/hoc';
import { formDataToSubmittable } from '../lib';
import { compose, uiState } from '../../../components/higherOrderComponents';
import * as R from 'ramda';

import EmailTemplateView from './EmailTemplateView';

import {
  selectActiveMarkersAsArray,
  getFormValues,
  selectActiveMarkers,
  selectTargetedOrganizations,
} from '../selectors';
import { updatePreviewOrganization } from '../../../utils/previewOrganization/previewOrganizationActions';

const UI_STATE = {
  isMarkerReviewActive: false,
  builtQuest: {},
  buildError: undefined,
};

const onPreview = (state, client, updateUI) => () => {
  const { emailTemplate } = formDataToSubmittable(getFormValues(state));
  const organizationIdForContext = getCurrentPreviewOrgId(state);
  return client
    .query({
      query: QUEST_TEMPLATE_PREVIEW_QUERY,
      variables: { emailTemplate, organizationIdForContext },
    })
    .then(result =>
      updateUI({
        builtQuest: result.data.compiledQuestTemplateEmail,
        buildError: undefined,
      })
    )
    .catch(error => updateUI({ builtQuest: undefined, buildError: error }));
};

const getCurrentPreviewOrgId = state =>
  R.path(['previewOrganization', 'id'], state);

const getForOrganizations = state => selectTargetedOrganizations(state);

export const mapDispatchToProps = dispatch => {
  return {
    updatePreviewOrganization: organizationId =>
      dispatch(updatePreviewOrganization(organizationId)),
  };
};

export const mapStateToProps = (state, { client, updateUI, allMarkers }) => {
  return {
    onPreview: onPreview(state, client, updateUI),
    onMarkerReviewFinished: () => updateUI({ isMarkerReviewActive: false }),
    reviewMarkers: () => updateUI({ isMarkerReviewActive: true }),
    questMarkerMessages: selectActiveMarkersAsArray(state, allMarkers),
    questMarkers: selectActiveMarkers(state, allMarkers),
    currentPreviewOrgId: getCurrentPreviewOrgId(state),
    forOrganizations: getForOrganizations(state),
  };
};

export const EmailTemplateContainer = compose(
  withApollo,
  uiState(UI_STATE),
  connect(mapStateToProps, mapDispatchToProps)
)(EmailTemplateView);
