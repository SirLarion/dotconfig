import React from 'react';
import { Autocomplete } from '../../components/Autocomplete/Autocomplete';
import { FormattedMessage } from 'react-intl';
import { Mutation } from '../../utils/apollo';
import { Button } from '../../components/ui/Button/Button';
import { FormSection } from '../../components/ui/Form/FormSection';
import { FormTextField } from '../../components/ui/Form/FormTextField';
import { Form } from '../../components/ui/Form/Form';
import { FormErrorSection } from '../../components/ui/Form/FormErrorSection';
import { FORM_ERROR } from 'final-form';
import { DangerousForm } from '../../components/ui/Form/DangerousForm';
import { StatefulContainer } from '../../components/StatefulContainer';
import get from 'lodash/get';
import { BulkQuestSendingFormField } from './BulkQuestSendingFormField';
import { Field } from '../../components/ui/Form/Field';
import { DeleteInfo, extractDomainsFromEmails } from './BulkDeleteDomainInfo';
import { EQuestOrigin } from '../../models/quest';
import { OrganizationSelector } from '../../components/OrganizationSelector/OrganizationSelectorContainer';
import { TabView } from '../../components/TabView';
import { FormControlLabel, Switch } from '@material-ui/core';
import { ExecuteBulkUserActionMutationDocument as mutation } from './__generated__/ExecuteBulkUserAction.generated';
import { ExecuteBulkUserQuestSendoutDocument as mutationSendQuest } from './__generated__/SendQuest.generated';
import { QuestSecondaryObjective } from '@hox/frontend-utils/types/graphql.generated';

enum EBulkUserActionKind {
  AUTOMATIC_START = 'AUTOMATIC_START',
  INVITE_USER = 'INVITE_USER',
  DELETE_USER = 'DELETE_USER',
  DEACTIVATE_USER = 'DEACTIVATE_USER',
  REACTIVATE_USER = 'REACTIVATE_USER',
  SEND_QUEST = 'SEND_QUEST',
  REMOVE_GAME_COOLDOWN = 'REMOVE_GAME_COOLDOWN',
}

interface IBulkUserActionsSetupProps {
  onStartExecution: (taskGroupId: string) => void;
}

interface IFormData {
  emails: string;
}

const handleSubmissionError = (error: Error) => {
  const match = error.message.match(/^(.*?)( id: ([a-z0-9-]{36}))$/);
  if (match) {
    return {
      [FORM_ERROR]: match[1],
    };
  }
  return {
    [FORM_ERROR]: error.message,
  };
};

enum ETabs {
  EMAILS_TAB = 'emails_tab',
  ORGANIZATION_TAB = 'organization_tab',
}

const onSubmit =
  (
    mutate,
    onStartExecution,
    dataKey: string,
    actionKind: EBulkUserActionKind,
    state: any
  ) =>
  (vars: IFormData) => {
    const { emails, ...rest } = vars;
    const recipientInfo =
      state.selectedTab === ETabs.ORGANIZATION_TAB
        ? { organizationId: state.organizationId }
        : {
            emails: emails
              .toLowerCase()
              .split(',')
              .map(email => email.trim()),
          };
    return mutate({
      variables: {
        ...rest,
        ...recipientInfo,
        actionKind,
        origin: EQuestOrigin.BULK_USER_ACTION,
      },
    })
      .then(({ data }) => {
        onStartExecution(get(data, `${dataKey}._id`));
      })
      .catch(handleSubmissionError);
  };

const getDuplicateEmails = (emails: string | undefined) => {
  if (!emails) {
    return [];
  }
  const emailsSplit = emails.split(',').map(email => email.trim());
  const map = new Map();
  for (const email of emailsSplit) {
    map.set(email, map.get(email) ? map.get(email) + 1 : 1);
  }
  return Array.from(map.entries())
    .filter(([email, count]) => count > 1)
    .map(([email, count]) => email);
};

const getUniqueDuplicateEmailsCount = (emails: string | undefined) =>
  getDuplicateEmails(emails).length;

const duplicateEmailsLimit = 5;

const showDuplicateEmailsMessage = (emails: string | undefined) => {
  const uniqueDuplicateEmailsCount = getUniqueDuplicateEmailsCount(emails);
  if (
    uniqueDuplicateEmailsCount > 0 &&
    uniqueDuplicateEmailsCount <= duplicateEmailsLimit
  ) {
    return (
      <FormattedMessage
        id="app.components.bulkActions.duplicateEmailsMessageSmallAmount"
        defaultMessage="The following email addresses appear more than once: {emails}"
        description="Note shown to the user telling the duplicate email addresses in the emails field"
        values={{
          emails: getDuplicateEmails(emails).join(', '),
        }}
      />
    );
  } else if (uniqueDuplicateEmailsCount > duplicateEmailsLimit) {
    return (
      <FormattedMessage
        id="app.components.bulkActions.duplicateEmailsMessageLargeAmount"
        defaultMessage="There are {uniqueDuplicateEmailsCount} email addresses that appear more than once"
        description="Note shown to the user telling that there are a certain amount of duplicate emails in the emails field."
        values={{
          uniqueDuplicateEmailsCount,
        }}
      />
    );
  }
};

const MARKERS_OVERRIDE = [QuestSecondaryObjective.MARKERS];

// Markers override is a toggle that controls a field of type QuestSecondaryObjective[]
// Hacky conversion from boolean => [QuestSecondaryObjective.MARKERS] and back until
// BUA gets stronger overrides
const formatMarkersOverride = (value: QuestSecondaryObjective[] | null) =>
  value === MARKERS_OVERRIDE;

const parseMarkersOverride = (value: QuestSecondaryObjective[] | null) =>
  value ? MARKERS_OVERRIDE : null;

interface IMutationMappingConfig {
  mutation: any;
  actionKind: EBulkUserActionKind;
  renderExtraArguments?: () => React.ReactNode;
  dataKey: string;
  notAllowedForOrganization?: boolean;
}

const actionConfigs: IMutationMappingConfig[] = [
  {
    mutation,
    actionKind: EBulkUserActionKind.AUTOMATIC_START,
    dataKey: 'executeBulkUserAction',
  },
  {
    mutation,
    actionKind: EBulkUserActionKind.INVITE_USER,
    dataKey: 'executeBulkUserAction',
  },
  {
    mutation,
    actionKind: EBulkUserActionKind.DELETE_USER,
    dataKey: 'executeBulkUserAction',
    notAllowedForOrganization: true,
  },
  {
    mutation,
    actionKind: EBulkUserActionKind.DEACTIVATE_USER,
    dataKey: 'executeBulkUserAction',
    notAllowedForOrganization: true,
  },
  {
    mutation,
    actionKind: EBulkUserActionKind.REACTIVATE_USER,
    dataKey: 'executeBulkUserAction',
  },
  {
    mutation,
    actionKind: EBulkUserActionKind.REMOVE_GAME_COOLDOWN,
    dataKey: 'executeBulkUserAction',
  },
  {
    mutation: mutationSendQuest,
    actionKind: EBulkUserActionKind.SEND_QUEST,
    renderExtraArguments: () => (
      <FormSection>
        <Field
          required
          component={BulkQuestSendingFormField}
          name="questTags"
        />

        <Field
          name="preventDuplicates"
          type="checkbox"
          format={v => !!v}
          render={({ input }) => (
            <FormControlLabel
              control={<Switch {...input} />}
              label={
                <FormattedMessage
                  id="app.form.preventDuplicateQuests"
                  defaultMessage="Prevent duplicates"
                  description="Text for checkbox allowing the user to decide whether quest is sent if the target user has already received it"
                />
              }
            />
          )}
        />
        <Field
          name="secondaryObjectiveOverrides.secondaryObjectives"
          type="checkbox"
          format={formatMarkersOverride}
          parse={parseMarkersOverride}
          render={({ input }) => (
            <FormControlLabel
              control={<Switch {...input} />}
              label={
                <FormattedMessage
                  id="app.form.forceMicroTraining"
                  defaultMessage="Force microtraining"
                  description="Text for checkbox allowing the user force quest to be sent with microtraining"
                />
              }
            />
          )}
        />
      </FormSection>
    ),
    dataKey: 'sendQuestsToEmails',
  },
];

const getEmailsFormattedMessage = (operationName, userCount) => {
  return (
    <FormattedMessage
      id="app.dangerousAction.confirmMessage"
      defaultMessage="Are you sure you want to commit {operationName} to up to {userCount}?"
      description="Warning text shown above a button that performs an action that requires careful thought"
      values={{
        operationName,
        userCount,
      }}
    />
  );
};

const getOrganizationFormattedMessage = (operationName, organizationName) => {
  return (
    <FormattedMessage
      id="app.dangerousAction.confirmMessageOrganization"
      defaultMessage="Are you sure you want to commit {operationName} on organization {organizationName}?"
      description="Warning text shown above a button that performs a dangerous action on an organization"
      values={{
        operationName,
        organizationName,
      }}
    />
  );
};

const getDangerMessage = ({
  selectedTab,
  operationName,
  userCount,
  organizationName,
}) =>
  selectedTab === ETabs.EMAILS_TAB
    ? getEmailsFormattedMessage(operationName, userCount)
    : getOrganizationFormattedMessage(operationName, organizationName);

class BulkUserActionsSetup extends React.Component<IBulkUserActionsSetupProps> {
  public render() {
    return (
      <StatefulContainer
        defaultState={{
          userSelectedAction: null,
          actionKind: EBulkUserActionKind.AUTOMATIC_START,
          selectedTab: ETabs.EMAILS_TAB,
        }}
      >
        {(state, setState) => {
          const action = actionConfigs.find(
            a => a.actionKind === state.actionKind
          );
          return (
            <React.Fragment>
              <Mutation mutation={action.mutation}>
                {mutate => (
                  <Form
                    data-test-id="general-form"
                    onSubmit={onSubmit(
                      mutate,
                      this.props.onStartExecution,
                      action.dataKey,
                      action.actionKind,
                      state
                    )}
                    render={({
                      handleSubmit,
                      hasSubmitErrors,
                      invalid,
                      submitError,
                      submitting,
                      values,
                    }) => (
                      <DangerousForm
                        onSubmit={handleSubmit}
                        confirmText={action.actionKind}
                        message={
                          action.actionKind === 'DELETE_USER' ? (
                            <React.Fragment>
                              {values.emails && (
                                <DeleteInfo
                                  values={extractDomainsFromEmails(values)}
                                />
                              )}
                            </React.Fragment>
                          ) : (
                            getDangerMessage({
                              selectedTab: state.selectedTab,
                              operationName: action.actionKind,
                              userCount: values.emails
                                ? values.emails.split(', ').length
                                : 0,
                              organizationName: state.organizationName,
                            })
                          )
                        }
                      >
                        <FormSection>
                          <TabView
                            onTabChange={selectedTab => {
                              setState({ selectedTab: selectedTab.id });
                            }}
                            tabs={[
                              {
                                id: ETabs.EMAILS_TAB,
                                name: 'Selected emails',
                              },
                              {
                                id: ETabs.ORGANIZATION_TAB,
                                name: 'Whole organization',
                                disabled:
                                  state.actionKind ===
                                  EBulkUserActionKind.DELETE_USER,
                              },
                            ]}
                          />
                        </FormSection>

                        <Autocomplete
                          onChange={actionKind => {
                            // note(Anssi): check issue https://github.com/hoxhunt/hox/issues/6313
                            // userSelectedAction allows us to validate that user has selected action.
                            // <Mutation> expects valid GQL mutation as parameter and null/undefined does not qualify.
                            setState({
                              actionKind,
                              userSelectedAction: actionKind,
                            });
                            if (
                              actionKind === EBulkUserActionKind.DELETE_USER
                            ) {
                              setState({ selectedTab: ETabs.EMAILS_TAB });
                            }
                          }}
                          label={
                            <FormattedMessage
                              id="app.components.bulkActions.action"
                              defaultMessage="Select Action"
                              description="Label for a dropdown that allows selection of an action to be run"
                            />
                          }
                          items={Object.keys(EBulkUserActionKind)}
                        />

                        {state.selectedTab === ETabs.EMAILS_TAB ? (
                          <FormSection>
                            <FormTextField
                              name="emails"
                              label="Emails"
                              required={state.selectedTab === ETabs.EMAILS_TAB}
                            />
                            {showDuplicateEmailsMessage(values.emails)}
                          </FormSection>
                        ) : (
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
                            value={state.organizationId}
                          />
                        )}

                        <FormSection>
                          {action.renderExtraArguments &&
                            action.renderExtraArguments()}
                        </FormSection>

                        <FormErrorSection
                          hasErrors={hasSubmitErrors}
                          errors={[submitError]}
                        />
                        <FormSection>
                          <Button
                            disabled={
                              state.userSelectedAction == null ||
                              (invalid && !hasSubmitErrors) ||
                              submitting ||
                              (state.selectedTab === ETabs.ORGANIZATION_TAB &&
                                !state.organizationId)
                            }
                            type="submit"
                            color="primary"
                          >
                            <FormattedMessage
                              id="app.components.bulkActions.submit"
                              defaultMessage="Execute Action"
                              description="Label shown on a button that executes a chosen bulk user action on a set of users"
                            />
                          </Button>
                        </FormSection>
                      </DangerousForm>
                    )}
                  />
                )}
              </Mutation>
            </React.Fragment>
          );
        }}
      </StatefulContainer>
    );
  }
}

export default BulkUserActionsSetup;
