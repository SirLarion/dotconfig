import React from 'react';
import Grid from '@material-ui/core/Grid/Grid';

import { FormattedMessage } from 'react-intl';
import { StatefulContainer } from '../../components/StatefulContainer';

import {
  Panel,
  PanelHeader,
  PanelContent,
} from '../../components/ui/Panel/Panel';
import { Button } from '../../components/ui/Button/Button';
import { OrganizationSelector } from '../../components/OrganizationSelector/OrganizationSelectorContainer';
import { QuestTemplateSelector } from '../../components/QuestTemplateSelector/QuestTemplateSelector';
import { dangerousAction } from '../../components/higherOrderComponents';
import { SendQuestToOrganizationMutation } from '../../modules/QuestDebugger/SendQuestToOrganizationMutation';
import { sendQuestToOrganizationDocument } from './__generated__/SendQuestToOrganization.generated';
import { EQuestOrigin } from '../../models/quest';

const DangerousButton = dangerousAction(Button);

export const SendQuestToOrganizationView = ({
  onSend,
  setState,
  state: { organizationId, organizationName, templateTag },
}) => (
  <Panel>
    <PanelHeader
      title={
        <FormattedMessage
          id="app.components.sendQuestToOrganization.title"
          defaultMessage="Send Quest To Organization"
          description="Title for a panel that allows sending quests to all users of an organization"
        />
      }
    />
    <PanelContent>
      <Grid container spacing={10}>
        <Grid item xs={12}>
          <OrganizationSelector
            floatingLabelText={
              <FormattedMessage
                id="app.form.organizationLabel"
                defaultMessage="Organization"
                description="Label for a field that is used to select an organization"
              />
            }
            mapNewValue={({ _id, name }) => ({
              organizationId: _id,
              organizationName: name,
            })}
            onChange={setState}
            value={organizationId}
          />
        </Grid>

        <Grid item xs={12}>
          <QuestTemplateSelector
            onChange={tag => setState({ templateTag: tag })}
          />
        </Grid>

        <Grid item xs={12}>
          <DangerousButton
            disabled={!organizationId || !templateTag}
            color="secondary"
            confirmText={organizationName}
            message={
              <FormattedMessage
                id="app.components.sendQuestToOrganization.danger"
                defaultMessage="You're about to send the quest {templateTag} to all users of {organizationName}. Type the name of the organization in the text field to proceed."
                description="Warning text shown above a button that performs an action that requires careful thought"
                values={{
                  organizationName,
                  templateTag,
                }}
              />
            }
            onClick={onSend}
          >
            <FormattedMessage
              id="app.components.sendQuestToOrganization.sendQuest"
              defaultMessage="Send Quest to All Users"
              description="Label for a button that is used to send a quest to all users of an organization"
            />
          </DangerousButton>
        </Grid>
      </Grid>
    </PanelContent>
  </Panel>
);

export const SendQuestToOrganization = () => (
  <StatefulContainer>
    {(state, setState) => (
      <SendQuestToOrganizationMutation
        mutation={SendQuestToOrganizationDocument}
        variables={{
          templateTag: state.templateTag,
          organizationId: state.organizationId,
          origin: EQuestOrigin.DEBUG,
        }}
      >
        {(mutate, result) => (
          <SendQuestToOrganizationView
            onSend={mutate}
            setState={setState}
            state={state}
          />
        )}
      </SendQuestToOrganizationMutation>
    )}
  </StatefulContainer>
);
