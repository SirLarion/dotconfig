import React, { FC, useEffect, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import {
  TValidationRules,
  useFormValidation,
} from '@hox/frontend-utils/hooks/useFormValidation';
import Input from '@hox/ui/Input';
import { Heading4 } from '@hox/ui/Text';

import { BUTTON_INTL } from '../../../../../../../intl/generic';
import { Blocks } from '../../../../../components/Blocks';
import { useDomainContext } from '../../hooks/useDomainContext';
import { ViewExampleButton } from '../ViewExampleButton';

import { useUpdateGeneralOrganizationInfo } from './hooks/useUpdateGeneralOrganizationInfo';

const VALIDATION_RULES: TValidationRules = {
  contextOrgName: [],
  street: [],
  city: [],
  postCode: [],
};

const INTL = {
  inputLabel: {
    organizationName: (
      <FormattedMessage
        id="app.admin.settings.domainContext.contextOrg.generalInfo.organizationName.input.label"
        defaultMessage="Organization name"
        description="Label for organization name input"
      />
    ),
    street: (
      <FormattedMessage
        id="app.admin.settings.domainContext.contextOrg.generalInfo.street.input.label"
        defaultMessage="Street"
        description="Label for street input"
      />
    ),
    city: (
      <FormattedMessage
        id="app.admin.settings.domainContext.contextOrg.generalInfo.city.input.label"
        defaultMessage="City"
        description="Label for city input"
      />
    ),
    postCode: (
      <FormattedMessage
        id="app.admin.settings.domainContext.contextOrg.generalInfo.zipCode.input.label"
        defaultMessage="ZIP code"
        description="Label for post code input"
      />
    ),
  },
};

export const GeneralOrganizationInfo: FC = ({ ...restProps }) => {
  const { domain } = useDomainContext();
  const { updateGeneralOrganizationInfo } = useUpdateGeneralOrganizationInfo();

  const contextOrganization = domain?.context?.organization;

  const memoizedInitialValues = useMemo(
    () => ({
      contextOrgName: contextOrganization?.name || '',
      street: contextOrganization?.postAddress?.street || '',
      city: contextOrganization?.postAddress?.city || '',
      postCode: contextOrganization?.postAddress?.postCode || '',
    }),
    [contextOrganization]
  );

  const { values, isTouched, handleChange, resetFormValidationState } =
    useFormValidation(VALIDATION_RULES, memoizedInitialValues);

  useEffect(() => {
    resetFormValidationState(memoizedInitialValues);
  }, [memoizedInitialValues, resetFormValidationState]);

  return (
    <Blocks.Card {...restProps}>
      <Blocks.Column>
        <Heading4>General</Heading4>

        <Input
          name="contextOrgName"
          label={INTL.inputLabel.organizationName}
          value={values.contextOrgName}
          onChange={handleChange}
        />
        <ViewExampleButton previewImage={'/preview_company_name.png'} />
        <Heading4>Post address</Heading4>
        <Blocks.Row>
          <Input
            name="street"
            label={INTL.inputLabel.street}
            value={values.street}
            onChange={handleChange}
          />
          <Input
            name="city"
            label={INTL.inputLabel.city}
            value={values.city}
            onChange={handleChange}
          />
          <Input
            name="postCode"
            label={INTL.inputLabel.postCode}
            value={values.postCode}
            onChange={handleChange}
          />
        </Blocks.Row>
        <Blocks.Row justifyContent="flex-end">
          {isTouched && (
            <Blocks.SecondaryButton onClick={() => resetFormValidationState()}>
              {BUTTON_INTL.cancel}
            </Blocks.SecondaryButton>
          )}

          <Blocks.PrimaryButton
            disabled={!isTouched}
            onClick={() =>
              updateGeneralOrganizationInfo({
                name: values.contextOrgName,
                postAddress: {
                  street: values.street,
                  city: values.city,
                  postCode: values.postCode,
                },
              })
            }
          >
            {BUTTON_INTL.save}
          </Blocks.PrimaryButton>
        </Blocks.Row>
      </Blocks.Column>
    </Blocks.Card>
  );
};
