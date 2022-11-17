import React from 'react';
import PropTypes from '../../utils/propTypes';
import { StatefulContainer } from '../../components/StatefulContainer/';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { FormattedMessage } from 'react-intl';

import injectStyles from '../../components/higherOrderComponents/injectStyles';

const Styles = ({ zIndex }) => ({
  dialog: {
    zIndex: zIndex.popover + 1,
  },
});

const PROP_TYPES = {
  children: PropTypes.func.isRequired,
  confirmAction: PropTypes.func,
  confirmText: PropTypes.string,
  confirmLink: PropTypes.shape({
    href: PropTypes.string,
    download: PropTypes.bool,
  }),
  title: PropTypes.node,
  message: PropTypes.node,
  styles: PropTypes.object,
};

const noop = () => {};

const defaultTitle = (
  <FormattedMessage
    id="app.components.dangerzone.title"
    defaultMessage="Confirm action"
    description="label for dialog for confirming dangerous activities"
  />
);

const DangerZone = ({
  confirmText = 'DANGERZONE',
  confirmAction = noop,
  confirmLink = {},
  title = defaultTitle,
  message,
  styles,
  children,
}) => (
  <StatefulContainer>
    {({ open = false, currentText = '' }, setState) => (
      <div>
        <Dialog
          open={open}
          overlayStyle={styles.dialogOverlay}
          style={styles.dialog}
          title={<div>{title}</div>}
        >
          <DialogContent>
            {message && <DialogContentText>{message}</DialogContentText>}
            <TextField
              name="confirm"
              autoFocus
              autoComplete="off"
              fullWidth
              floatingLabelText={
                <FormattedMessage
                  id="app.components.dangerzone.placeholder"
                  defaultMessage="Type in {confirmText} to confirm action"
                  values={{
                    confirmText,
                  }}
                  description="Danger zone action confirmation button label"
                />
              }
              value={currentText}
              onChange={e => setState({ currentText: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <RaisedButton
              secondary
              onClick={() => {
                setState({ open: false, currentText: '' });
              }}
              label={
                <FormattedMessage
                  id="app.action.cancel"
                  defaultMessage="Cancel"
                  description="A label for a Button that cancels the current action"
                />
              }
            />
            <a
              href={confirmLink.href}
              download={confirmLink.download}
              style={{
                pointerEvents: currentText !== confirmText ? 'none' : 'initial',
              }}
            >
              <RaisedButton
                primary
                onClick={() => {
                  setState({ open: false, currentText: '' });
                  confirmAction();
                }}
                disabled={currentText !== confirmText}
                label={
                  <FormattedMessage
                    id="app.components.dangerzone.confirm"
                    defaultMessage="Confirm"
                    description="Danger zone action confirmation button label"
                  />
                }
              />
            </a>
          </DialogActions>
        </Dialog>
        {children(() => setState({ open: true }))}
      </div>
    )}
  </StatefulContainer>
);

DangerZone.propTypes = PROP_TYPES;

export default injectStyles(Styles)(DangerZone);
