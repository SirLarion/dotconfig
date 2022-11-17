import React from 'react';
import isEmail from 'validator/lib/isEmail';
import { gql } from '@apollo/client';

import { FormSection } from '../../components/ui/Form/FormSection';
import { PanelForm } from '../../components/ui/PanelForm/PanelForm';
import { FormTextField } from '../../components/ui/Form/FormTextField';
import { Button } from '../../components/ui/Button/Button';
import { Field } from 'react-final-form';
import { OrganizationSelector } from '../../components/OrganizationSelector/OrganizationSelectorContainer';
import { FORM_ERROR } from 'final-form';
import { FormattedMessage } from 'react-intl';
import { useMutation, MutationFunction } from '../../hooks/useMutation';

const parseEmails = emails => {
  if (!emails) {
    return [];
  }

  return emails.split(',').map(mail => mail.trim());
};

const mapToPayload = (organizationId, emails) =>
  parseEmails(emails).map(email => ({
    emails: [
      {
        address: email,
        verified: true,
      },
    ],
    organizationId,
  }));

const validateEmails = (emails: string) => {
  const invalidEmails = parseEmails(emails).filter(email => !isEmail(email));

  return invalidEmails.length > 0
    ? `${invalidEmails.length} faulty emails: ${invalidEmails.join(', ')}`
    : undefined;
};

const createOnSubmit = (mutate: MutationFunction) => values =>
  new Promise(resolve => {
    const { organization, emails } = values;

    mutate({
      variables: {
        users: mapToPayload(organization, emails),
      },
    })
      // Mark succesful submission with empty resolve
      .then(() => resolve(undefined))
      // Errors need be resolved in FORM_ERROR instead of rejecting
      .catch(error => {
        return resolve({
          [FORM_ERROR]: error.message,
        });
      });
  });

export const AddUsersByEmail = () => {
  const [mutate] = useMutation(addUsersMutation);
  return (
    <PanelForm
      onSubmit={createOnSubmit(mutate)}
      title={
        <FormattedMessage
          id="app.components.addUsersByEmail.title"
          defaultMessage="By Email"
          description="Title for a page that allows adding users by email addresses"
        />
      }
      renderFields={() => (
        <FormSection>
          <Field required name="organization" label="Organization">
            {({ input }) => (
              <OrganizationSelector
                {...input}
                floatingLabelText={
                  <FormattedMessage
                    id="app.form.organizationLabel"
                    defaultMessage="Organization"
                    description="Label for a field that is used to select an organization"
                  />
                }
              />
            )}
          </Field>
          <FormTextField
            required
            name="emails"
            label="Comma separated emails"
            validate={validateEmails}
          />
        </FormSection>
      )}
      renderFooter={({ invalid, submitting, hasSubmitErrors }) => (
        <React.Fragment>
          <Button
            color="secondary"
            disabled={(invalid && !hasSubmitErrors) || submitting}
            type="submit"
          >
            <FormattedMessage
              id="app.components.addUsers.submitButton"
              defaultMessage="Add users"
              description="Label shown on a button that adds users to the system"
            />
          </Button>
        </React.Fragment>
      )}
    />
  );
};
