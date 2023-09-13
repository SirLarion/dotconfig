import PropTypes from '../../utils/propTypes';
import { QuestTemplateListDocument as GetQuestTemplates } from '../QuestTemplateList/__generated__/GetQuestTemplatesQuery.generated';
import { graphql } from '@apollo/client/react/hoc';
import { withRouter } from 'react-router-dom';
import reduxForm from 'redux-form/lib/reduxForm';
import ReduxFormActions from 'redux-form/lib/actions';

import { connect } from 'react-redux';
import { lib as notificationsLib } from '../../utils/notification';
import {
  transformInitialValues,
  formDataToSubmittable,
  initialQuestTemplateValues,
} from './lib';

import {
  FORM_NAME,
  formValueSelector,
  getFormValues,
  selectActiveMarkers,
  selectActiveMarkersAsArray,
  selectAttachments,
  selectEmailTranslations,
} from './selectors';
import {
  compose,
  injectProps,
  injectStyles,
  uiState,
} from '../../components/higherOrderComponents';

import QuestTemplateEditorView from './QuestTemplateEditorView';
import Styles from './styles';
import {
  CreateQuestTemplateDocument,
  GetQuestTemplatesDocument,
  ToggleQuestTemplatePublicationStatusDocument,
  UpdateQuestTemplateDocument,
} from './graphql/__generated__/QuestTemplates.generated';

const UI_STATE = {
  currentSubPage: 'questInfo',
  isImportDialogOpen: false,
};

const PROP_TYPES = {
  match: PropTypes.shape({
    params: {
      questTemplateId: PropTypes.string,
    },
  }).isRequired,
};

export const mapPropsToQueryOpts = ({ match }) => {
  return {
    variables: {
      id: match.params.questTemplateId || null,
    },
  };
};

export const mapQueryResultToProps = ({
  data: { loading, questTemplates: [questTemplate] = [], markers },
}) => {
  return {
    isLoading: loading,
    questTemplate,
    allMarkers: markers,
  };
};

export const propInjector = ({ match, questTemplate = {} }) => {
  const isCreateMode = match.params.questTemplateId === 'create';
  const initialValues = isCreateMode
    ? initialQuestTemplateValues
    : transformInitialValues(questTemplate);
  return {
    isCreateMode,
    initialValues,
  };
};

export const mapStateToProps = (state, { allMarkers }) => {
  const {
    tag,
    valid,
    cooldown,
    emailTemplate = {},
  } = formValueSelector(state, 'tag', 'valid', 'cooldown', 'emailTemplate');
  const { email: { attachments } = {}, translations } = emailTemplate;
  const { from, general, subject, attachment, embedded } = selectActiveMarkers(
    state,
    allMarkers
  );
  const formValues = {
    tag,
    valid,
    cooldown,
    attachments,
    markers: {
      from,
      general,
      subject,
      attachment,
      embedded,
    },
    emailTemplate: {
      translations,
    },
  };

  return {
    getValues: () => getFormValues(state),
    formValues,
    markerCount: selectActiveMarkersAsArray(state, allMarkers).length,
    attachmentCount: selectAttachments(state).length,
    translationCount: selectEmailTranslations(state).length,
  };
};

const setValues = dispatch => values => {
  dispatch(ReduxFormActions.initialize(FORM_NAME, values, true));
};
export const mapDispatchToProps = dispatch => {
  return {
    onImportSubmit: setValues(dispatch),
  };
};

const getMutation = (
  questTemplateId,
  isCreateMode,
  values,
  {
    createQuestTemplate,
    updateQuestTemplate,
    toggleQuestTemplatePublicationStatus,
  }
) => {
  if (isCreateMode) {
    return createQuestTemplate;
  }
  return args =>
    toggleQuestTemplatePublicationStatus({
      variables: {
        questTemplateId,
        isActive: values.isActive,
      },
    }).then(() => updateQuestTemplate(args));
};

const onSubmit = (
  values,
  dispatch,
  {
    history,
    isCreateMode,
    createQuestTemplate,
    updateQuestTemplate,
    toggleQuestTemplatePublicationStatus,
    match,
  }
) => {
  const mutation = getMutation(
    match.params.questTemplateId,
    isCreateMode,
    values,
    {
      createQuestTemplate,
      updateQuestTemplate,
      toggleQuestTemplatePublicationStatus,
    }
  );
  return mutation({
    variables: {
      questTemplateId: match.params.questTemplateId,
      questTemplate: formDataToSubmittable(values),
    },
    update: async (store, result) => {
      if (isCreateMode) {
        const data = store.readQuery({ query: GetQuestTemplates });
        // In the case of creation, activate the template after if the active was selected
        if (values.isActive) {
          await toggleQuestTemplatePublicationStatus({
            variables: {
              questTemplateId: result.data.createQuestTemplate._id,
              isActive: values.isActive,
            },
          });
        }
        data.questTemplates.push({
          ...result.data.createQuestTemplate,
          isActive: values.isActive,
        });
        store.writeQuery({ query: GetQuestTemplates, data });
      }
    },
  })
    .then(response => {
      notificationsLib.showPrebuiltNotification(dispatch, 'success');
      if (isCreateMode) {
        history.push(
          `/questTemplates/${response.data.createQuestTemplate._id}`
        );
      }
    })
    .catch(error => {
      console.error(
        error
      ); /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
      notificationsLib.showTextNotification(dispatch, 'error', error.message);
      return error;
    });
};

const QuestTemplateEditorContainer = compose(
  withRouter,
  uiState(UI_STATE),
  graphql(GetQuestTemplatesDocument, {
    options: mapPropsToQueryOpts,
    props: mapQueryResultToProps,
  }),
  graphql(CreateQuestTemplateDocument, {
    name: 'createQuestTemplate',
  }),
  graphql(UpdateQuestTemplateDocument, {
    name: 'updateQuestTemplate',
  }),
  graphql(ToggleQuestTemplatePublicationStatusDocument, {
    name: 'toggleQuestTemplatePublicationStatus',
  }),
  injectProps(propInjector),
  connect(mapStateToProps, mapDispatchToProps),
  injectStyles(Styles),
  reduxForm({
    form: FORM_NAME,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    onSubmit,
  })
)(QuestTemplateEditorView);

QuestTemplateEditorContainer.propTypes = PROP_TYPES;

export default QuestTemplateEditorContainer;
