import React, { useState } from 'react';
import * as R from 'ramda';
import AddOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { FieldArray } from 'react-final-form-arrays';
import { FormattedMessage } from 'react-intl';
import { GraphQLError } from 'graphql';

import { PanelForm } from '../../../../components/ui/PanelForm/PanelForm';
import { FormSection } from '../../../../components/ui/Form/FormSection';
import { Button } from '../../../../components/ui/Button/Button';

import { IDomainsFormProps } from './models';
import { DomainContextForms } from '../../../../modules/CreateEditOrganization/components/Domains/DomainContextForms';
import { Headline } from '../../../../components/ui/Typography/Typography';
import { createStyleProvider } from '../../../../components/ui/Style/createStyled';
import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import { Intl } from '../intl';

import { Field } from '../../../../components/ui/Form/Field';
import { LanguageSelector } from '../../../../components/LanguageSelector';
import { FormDomainField } from '../../../../components/ui/Form/FormDomainField';
import { required } from '../../../../components/ui/Form/lib/validators';
import { MultiLanguageSelector } from '../../../../components/MultiLanguageSelector';
import { ESupportedLocales } from '../../../../i18n';

import { useRemoveDomainMutation } from './__generated__/OrganizationDomains.generated';
import { Dialog } from 'material-ui';

// note(Anssi): we need to access un-submitted values in order to provide dynamic UX
const getAllowedSimulationLanguages = (formProps: any, index: number) => {
  const fieldPath = ['values', 'domains', index, 'allowedSimulationLanguages'];
  const allowedSimulationLanguages = R.path<ESupportedLocales[]>(
    fieldPath,
    formProps
  );

  if (allowedSimulationLanguages && allowedSimulationLanguages.length > 0) {
    return allowedSimulationLanguages;
  }
  // the return value is consumed by another form field
  // if we don't return undefined, the value might be interpreted as valid, even when it's null
  return undefined;
};

const Styles = (theme: Theme) =>
  createStyles({
    domainRow: {
      lineHeight: '72px',
    },
    emptyDomainsText: {
      textAlign: 'center',
      color: theme.palette.text.hint,
    },
    languageDropdown: {
      marginLeft: '10px',
    },
  });

const StyleProvider = createStyleProvider(Styles);

export const DomainsForm: React.SFC<IDomainsFormProps> = ({
  organizationId,
  domains,
  intl,
  onSubmit,
}) => {
  const [removeDomain] = useRemoveDomainMutation();
  const [error, setError] = useState<GraphQLError | undefined>(undefined);
  return (
    <StyleProvider>
      {style => (
        <React.Fragment>
          {error && (
            <Dialog>
              <ErrorCard />
            </Dialog>
          )}
          <PanelForm
            title="Email domains"
            onSubmit={(val: { domains: IDomainsFormProps['domains'] }) =>
              onSubmit(val.domains)
            }
            initialValues={{ domains }}
            renderFields={formProps => (
              <FieldArray name="domains">
                {({ fields }) => (
                  <FormSection>
                    {fields.map((fieldName, i) => (
                      <div key={fieldName} className={style.classes.domainRow}>
                        <FormDomainField
                          validate={required}
                          name={`${fieldName}.name`}
                          label={<FormattedMessage {...intl.domain} />}
                          fullWidth={false}
                        />
                        <Field
                          validate={required}
                          name={`${fieldName}.defaultUiLanguage`}
                          label="Default Ui Language"
                          render={({ input }) => (
                            <LanguageSelector
                              {...input}
                              classes={{
                                root: style.classes.languageDropdown,
                              }}
                              label={
                                <FormattedMessage {...Intl.defaultUILanguage} />
                              }
                            />
                          )}
                        />
                        &nbsp;&nbsp;
                        <Button
                          variant="outlined"
                          onClick={() =>
                            removeDomain({
                              variables: { domainName: domains[i].name },
                            }).then(({ data, errors }) => {
                              if (!data) {
                                setError(errors[0]);
                              }
                            })
                          }
                        >
                          <FormattedMessage {...intl.actionRemove} />
                        </Button>
                        <Field
                          name={`${fieldName}.defaultSimulationLanguages`}
                          label="Default Simulation Languages"
                          render={({ input }) => (
                            <MultiLanguageSelector
                              {...input}
                              items={getAllowedSimulationLanguages(
                                formProps,
                                i
                              )}
                              label={
                                <FormattedMessage
                                  id="app.form.defaultSimulationLanguageSelector.label"
                                  defaultMessage="Default Simulation Languages"
                                  description="Label for selecting default email simulation languages for new users added to an organization"
                                />
                              }
                              hintText={
                                <FormattedMessage
                                  id="app.form.defaultSimulationLanguageSelector.hintText"
                                  defaultMessage="Select default simulation languages for new users"
                                  description="Hint text for selecting default simulation languages for new users added to an organization."
                                />
                              }
                              fullWidth
                            />
                          )}
                        />
                        <Field
                          name={`${fieldName}.allowedSimulationLanguages`}
                          label="Allowed Simulation Languages"
                          render={({ input }) => (
                            <MultiLanguageSelector
                              {...input}
                              label={
                                <FormattedMessage
                                  id="app.form.allowedSimulationLanguagesSelector.label"
                                  defaultMessage="Allowed Simulation Languages"
                                  description="Label for selecting allowed email simulation languages for all users in an organization."
                                />
                              }
                              hintText={
                                <FormattedMessage
                                  id="app.form.allowedSimulationLanguagesSelector.hintText"
                                  defaultMessage="If left empty, all languages supported by Hoxhunt are allowed"
                                  description="Hint text for selecting allowed simulation languages for all users in an organization."
                                />
                              }
                              fullWidth
                            />
                          )}
                        />
                      </div>
                    ))}
                    <Button
                      variant="text"
                      color="secondary"
                      onClick={() => fields.push({})}
                    >
                      <AddOutlineIcon />
                      &nbsp;&nbsp;
                      <FormattedMessage {...intl.actionAdd} />
                    </Button>
                  </FormSection>
                )}
              </FieldArray>
            )}
          />
          {domains.length ? (
            <DomainContextForms
              domains={domains}
              onSubmit={onSubmit}
              organizationId={organizationId}
            />
          ) : (
            <Headline className={style.classes.emptyDomainsText}>
              <FormattedMessage
                data-test-id="domains-empty-info-text"
                {...intl.addDomainsInfoText}
              />
            </Headline>
          )}
        </React.Fragment>
      )}
    </StyleProvider>
  );
};
