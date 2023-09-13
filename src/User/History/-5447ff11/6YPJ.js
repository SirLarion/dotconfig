import React from 'react';
import PropTypes from '../../../utils/propTypes';
import { connect } from 'react-redux';
import isString from 'lodash/isString';
import { withApollo } from '@apollo/client/react/hoc';

import { Row, Col } from 'react-flexbox-grid';
import { TextField, Toggle } from 'redux-form-material-ui';
import Field from 'redux-form/lib/Field';
import { normalizers } from '../../../utils/reduxFormHelpers';
import CopyToClipboardButton from '../../../components/CopyToClipboardButton';

import RemoveCircleOutline from 'material-ui/svg-icons/action/highlight-off';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';

import { formValueSelector, selectEmailTranslations } from '../selectors';

import { HtmlEditor } from '../../../components/HtmlEditor/HtmlEditor';
import { PreviewableEditor } from '../../../components/PreviewableEditor/PreviewableEditor';

import { compose, uiState } from '../../../components/higherOrderComponents';

const PROP_TYPES = {
  ui: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  fieldName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isTemplatedAttachment: PropTypes.bool.isRequired,
  removeField: PropTypes.func.isRequired,
  onPreview: PropTypes.func.isRequired,
  formValues: PropTypes.object.isRequired,
};

const UI_STATE = {
  compiledTemplate: undefined,
  compilationError: undefined,
};

const mapStateToProps = (state, { client, updateUI, fieldName }) => {
  const templateString = formValueSelector(state, `${fieldName}.content`);
  const translations = selectEmailTranslations(state);

  return {
    onPreview: () =>
      client
        .query({
          query: COMPILED_TEMPLATE_STRING_QUERY,
          variables: { templateString, translations },
        })
        .then(result =>
          updateUI({
            compiledTemplate: result.data.compiledTemplateString,
            compilationError: undefined,
          })
        )
        .catch(error =>
          updateUI({ compiledTemplate: undefined, compilationError: error })
        ),
    isTemplatedAttachment: isString(templateString),
  };
};

const renderPreview = (styles, ui) => {
  if (ui.compilationError) {
    return <p style={styles.compilationError}>{ui.compilationError.message}</p>;
  }

  return (
    <div // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: ui.compiledTemplate }}
      style={styles.previewContainer}
    />
  );
};

const AttachmentField = ({
  ui,
  styles,
  fieldName,
  index,
  isTemplatedAttachment,
  removeField,
  onPreview,
  formValues,
}) => {
  return (
    <Paper style={styles.attachmentRowContainer} zDepth={4}>
      <Row key={`${fieldName}.filename`}>
        <Col xs={12} md={7}>
          <Field
            name={`${fieldName}.filename`}
            component={TextField}
            hintText="Filename in email"
            floatingLabelText="Filename in email"
            fullWidth
          />
        </Col>
        <Col xs={1} md={1} style={{ marginTop: 'auto' }}>
          {formValues.attachments[index].isLink && isTemplatedAttachment && (
            <CopyToClipboardButton
              text={`{{ attachmentHoxUrl <<BASEURL>> "${formValues.attachments[index].filename}" }}`}
              tooltip={
                <p id="copy-translation-tooltip">
                  Copy handlebars command to place file behind link
                </p>
              }
              disabled={!formValues.attachments[index].filename}
            />
          )}
        </Col>
        {isTemplatedAttachment && (
          <Field
            key={`${fieldName}.isLink`}
            name={`${fieldName}.isLink`}
            component={Toggle}
            label="As link?"
            normalize={normalizers.boolean}
            style={{
              width: 'auto',
              display: 'inline-block',
              top: '40px',
              'margin-left': '15px',
            }}
          />
        )}
        <Col xs={12} md={2}>
          <Field
            key={`${fieldName}.doZip`}
            name={`${fieldName}.doZip`}
            component={Toggle}
            label="Zip?"
            normalize={normalizers.boolean}
            style={{ width: 'auto', display: 'inline-block', top: '40px' }}
          />
          <IconButton
            style={{ float: 'right', position: 'relative', top: '27px' }}
            onClick={() => removeField(index)}
          >
            <RemoveCircleOutline />
          </IconButton>
        </Col>
        <Col xs={12} md={12}>
          {isTemplatedAttachment ? (
            <PreviewableEditor
              editor={
                <Field
                  name={`${fieldName}.content`}
                  component={HtmlEditor}
                  width="100%"
                  height="100%"
                />
              }
              preview={renderPreview(styles, ui)}
              onPreview={onPreview}
            />
          ) : (
            <Field
              key={`${fieldName}.path`}
              name={`${fieldName}.path`}
              component={TextField}
              hintText="Path to file"
              floatingLabelText="Path to file"
              fullWidth
            />
          )}
        </Col>
      </Row>
    </Paper>
  );
};

AttachmentField.propTypes = PROP_TYPES;

export const AttachmentFieldContainer = compose(
  uiState(UI_STATE),
  withApollo,
  connect(mapStateToProps)
)(AttachmentField);
