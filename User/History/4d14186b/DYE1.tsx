import React, { useCallback, useState } from 'react';
import get from 'lodash/get';
import { useHistory } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Intl } from '../../../utils/clientIntl';
import { Button as LegacyButton } from '../../../components/ui/Button/Button';
import { ButtonIcon } from '../../../components/ui/ButtonIcon/ButtonIcon';
import AddOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {
  useCreateOrganizationMutation,
  CreateOrganizationMutationVariables,
} from './__generated__/CreateOrganization.generated';
import { ModalPortal } from '@hox/ui/ModalPortal';
import { Modal } from '@hox/ui/Modal';
import { Blocks } from '@hox/ui/Blocks';
import { FormContainer, FormInputContainer, FormSection } from '@hox/ui/Form';
import Input from '@hox/ui/Input';
import { Heading4, SmallText } from '@hox/ui/Text';
import {
  EmailEnvironment,
  OrganizationInput,
  Region,
} from '@hox/frontend-utils/types/graphql.generated';
import { Dropdown } from '@hox/ui/Dropdown';
import { Button } from '@hox/ui/Button';
import { useToast } from '@hox/ui/ToastHub';
import isFQDN from 'validator/lib/isFQDN';

import {
  useFormValidation,
  TValidationRules,
} from '@hox/frontend-utils/hooks/useFormValidation';

type TFormValues = {
  name?: string;
  domainName?: string;
  emailEnvironment?: EmailEnvironment;
  region?: Region;
};

const emailEnvironmentDropdownItems = Object.values(EmailEnvironment).map(
  value => ({
    id: value,
    value,
  })
);

const regionDropdownItems = Object.values(Region).map(value => ({
  id: value,
  value,
}));

const getDefaultFormValues = (): TFormValues => ({
  name: '',
  domainName: '',
  emailEnvironment: undefined,
  region: undefined,
});

const getEmailEnvironmentSpecificDefaults = (
  emailEnvironment: EmailEnvironment | undefined
): Partial<OrganizationInput> => {
  switch (emailEnvironment) {
    case EmailEnvironment.microsoft:
      const msBlocklist = [
        { categoryName: 'email environment', name: 'gmail' },
        { categoryName: 'payload', name: 'attachment' },
      ];
      return {
        tagBlacklist: msBlocklist,
        spicyModeTagBlacklist: msBlocklist,
        plugin: {
          officejs: {
            allowedDomains: [
              {
                name: 'outlook.office365.com',
              },
            ],
          },
        },
      };
    case EmailEnvironment.google:
      const googleBlocklist = [
        { categoryName: 'email environment', name: 'microsoft' },
        { categoryName: 'payload', name: 'attachment' },
      ];
      return {
        tagBlacklist: googleBlocklist,
        spicyModeTagBlacklist: googleBlocklist,
      };
    default:
      return {};
  }
};

const mapOrgToMutationVars = ({
  name,
  domainName,
  emailEnvironment,
  region,
}: TFormValues): CreateOrganizationMutationVariables => {
  const emailEnvironmentSpecificDefaultValues =
    getEmailEnvironmentSpecificDefaults(emailEnvironment);
  return {
    organization: {
      name,
      domains: [{ name: domainName }],
      emailEnvironment,
      region,
      ...emailEnvironmentSpecificDefaultValues,
    },
  };
};

const validationRules: TValidationRules = {
  name: [
    {
      message: 'Cannot be empty',
      predicate: (str: string) => str && str.length > 0,
    },
  ],
  domainName: [
    {
      message: 'Cannot be empty',
      predicate: (str: string) => str && str.length > 0,
    },
    {
      message: 'Must be a valid domain name',
      predicate: isFQDN,
    },
  ],
  emailEnvironment: [],
  region: [],
};

export const CreateOrganizationButton: React.FC = ({ ...restProps }) => {
  const history = useHistory();
  const { createToast } = useToast();

  const [isDialogOpen, setDialogOpen] = useState(false);

  const openDialog = useCallback(() => setDialogOpen(true), [setDialogOpen]);
  const closeDialog = useCallback(() => setDialogOpen(false), [setDialogOpen]);

  const { handleChange, setFieldValues, values, isValid, errors } =
    useFormValidation(validationRules, getDefaultFormValues(), {
      validateInitialState: true,
    });

  const [mutate, { loading }] = useCreateOrganizationMutation({
    onCompleted: data => {
      createToast({
        type: 'positive',
        message: 'Organization created!',
        timeout: 5000,
      });
      history.push(
        `/organizations/edit/${get(data, 'createOrganization._id')}`
      );
    },
    onError: error => {
      createToast({
        type: 'error',
        message: error.message,
        timeout: 5000,
      });
    },
  });

  const createOrganization = useCallback(() => {
    mutate({
      variables: mapOrgToMutationVars(values),
    });
  }, [mutate, values]);

  return (
    <>
      {isDialogOpen && (
        <ModalPortal>
          <Modal>
            <FormContainer>
              <Heading4>Create new organization</Heading4>

              <FormSection>
                <Blocks.Row>
                  <FormInputContainer size="medium">
                    <Input
                      fullWidth
                      onChange={handleChange}
                      type="text"
                      name="name"
                      placeholder="Enter something"
                      label="Name (required)"
                    />
                  </FormInputContainer>
                  <FormInputContainer size="medium">
                    <Input
                      fullWidth
                      onChange={handleChange}
                      name="domainName"
                      type="text"
                      placeholder="company.org"
                      label="Primary email domain (required)"
                    />
                  </FormInputContainer>
                </Blocks.Row>
                <Blocks.Row>
                  <FormInputContainer size="medium">
                    <SmallText>Email environment</SmallText>
                    <Dropdown
                      items={emailEnvironmentDropdownItems}
                      initialSelected={emailEnvironmentDropdownItems.find(
                        item => item.value === values.emailEnvironment
                      )}
                      onChange={selectedEnvironment => {
                        if (Array.isArray(selectedEnvironment)) {
                          return;
                        }

                        setFieldValues({
                          emailEnvironment:
                            selectedEnvironment.value as EmailEnvironment,
                        });
                      }}
                    />
                  </FormInputContainer>

                  <FormInputContainer size="medium">
                    <SmallText>Region</SmallText>
                    <Dropdown
                      items={regionDropdownItems}
                      initialSelected={regionDropdownItems.find(
                        item => item.value === values.region
                      )}
                      onChange={selectedRegion => {
                        if (Array.isArray(selectedRegion)) {
                          return;
                        }

                        setFieldValues({
                          region: selectedRegion.value as Region,
                        });
                      }}
                    />
                  </FormInputContainer>
                </Blocks.Row>
              </FormSection>
              <Blocks.Row justifyContent="flex-end">
                <Button outlined onClick={closeDialog}>
                  Cancel
                </Button>
                <Button
                  disabled={!isValid || loading}
                  onClick={createOrganization}
                >
                  Create organization
                </Button>
              </Blocks.Row>
            </FormContainer>
          </Modal>
        </ModalPortal>
      )}
      <LegacyButton variant="text" color="secondary" onClick={openDialog}>
        <ButtonIcon>
          <AddOutlineIcon />
        </ButtonIcon>
        <FormattedMessage {...Intl.actionAdd} />
      </LegacyButton>
    </>
  );
};
