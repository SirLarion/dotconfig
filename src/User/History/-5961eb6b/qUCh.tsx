import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import get from 'lodash/get';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { SandboxedIframe } from '../../components/SandboxedIFrame';
import { gql } from '@apollo/client';
import { RelativeLoading } from '../../components/Loading';
import { Query } from '../../utils/apollo';

const DialogContentTextStyle = styled.div`
  font-size: 16px;
  display: flex;
  flex-direction: row;
  font-weight: none;
  padding-bottom: 0.5rem;
  > :first-child {
    font-weight: bold;
    padding-right: 0.25rem;
  }
`;

const DialogContentWrapper = styled.div`
  padding-top: 1rem;
  min-width: 550px;
  height: 350px;
`;

const File = styled.span`
  margin-right: 3px;
`;

interface IPreviewProps {
  tag: string;
  toggleOpen: () => void;
}

const GET_QUEST_TEMPLATE_PREVIEW = gql`
  query GetQuestTemplatePreview($tag: String!) {
    questTemplates(filter: { tag_eq: $tag }) {
      preview {
        html
        attachments {
          filename
        }
        from {
          address
          name
        }
        subject
      }
    }
  }
`;

const getSubject = data =>
  get(data, ['questTemplates', 0, 'preview', 'subject']);
const getFrom = data =>
  get(data, ['questTemplates', 0, 'preview', 'from', 0, 'address']);
const getAttachments = data =>
  get(data, ['questTemplates', 0, 'preview', 'attachments'], []);
const getHtml = data => get(data, ['questTemplates', 0, 'preview', 'html']);

const getQuestPreviewProps = data => ({
  subject: getSubject(data),
  from: getFrom(data),
  attachments: getAttachments(data),
  html: getHtml(data),
});

export const QuestPreviewDialogContent: FC<IPreviewProps> = ({
  toggleOpen,
  tag,
}) => {
  return (
    <Query
      query={GET_QUEST_TEMPLATE_PREVIEW}
      variables={{
        tag,
      }}
    >
      {({ loading, error, data }) => {
        const { subject, from, attachments, html } = getQuestPreviewProps(data);
        return (
          <React.Fragment>
            <DialogContent>
              <DialogContentTextStyle>
                <DialogContentText>Tag</DialogContentText>
                <DialogContentText>{tag}</DialogContentText>
              </DialogContentTextStyle>
              <DialogContentTextStyle>
                <DialogContentText>
                  <FormattedMessage
                    id="app.reports.questTable.subjectLabel"
                    defaultMessage="Subject"
                    description="Label for subject -field in email preview"
                  />
                </DialogContentText>
                <DialogContentText>{subject}</DialogContentText>
              </DialogContentTextStyle>
              <DialogContentTextStyle>
                <DialogContentText>
                  <FormattedMessage
                    id="app.reports.questTable.fromLabel"
                    defaultMessage="From"
                    description="Label for from -field in email preview"
                  />
                </DialogContentText>
                <DialogContentText>{from}</DialogContentText>
              </DialogContentTextStyle>
              {attachments.length > 0 && (
                <DialogContentTextStyle>
                  <DialogContentText>
                    <FormattedMessage
                      id="app.reports.questTable.attachmentsLabel"
                      defaultMessage="Attachments"
                      description="Label for attachments -field in email preview"
                    />
                  </DialogContentText>
                  <DialogContentText>
                    {attachments.map(file => (
                      <File>{file.filename}</File>
                    ))}
                  </DialogContentText>
                </DialogContentTextStyle>
              )}
              <DialogContentText>
                <DialogContentWrapper>
                  {loading ? (
                    <RelativeLoading />
                  ) : (
                    <SandboxedIframe srcDoc={html} />
                  )}
                </DialogContentWrapper>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={toggleOpen} color="primary">
                <FormattedMessage
                  id="app.reports.questTable.closeButton"
                  defaultMessage="Close"
                  description="Label for close button"
                />
              </Button>
            </DialogActions>
          </React.Fragment>
        );
      }}
    </Query>
  );
};
