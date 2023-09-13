import React, { FC } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { TValidationErrors } from '@hox/frontend-utils/hooks/useFormValidation';
import Input from '@hox/ui/Input';

import { USER_DETAILS_BASIC_INFO_INTL as INTL } from '../../../../intl';
import { TUserFormFields } from '../../lib';
import { Blocks } from '../UserDetailsEditBlocks';

interface IUserInformationSection {
  handleChange: (event: React.BaseSyntheticEvent) => void;
  errors: TValidationErrors<TUserFormFields>;
  values: TUserFormFields;
  scimProvisioned: boolean;
}

export const UserInformationSection: FC<IUserInformationSection> = ({
  handleChange,
  errors,
  values,
  scimProvisioned,
}) => {
  const intl = useIntl();

  return (
    <Blocks.Section>
      <Blocks.Heading data-test-id="admin-user-details-edit-basic-info-title">
        <FormattedMessage {...INTL.userDetails.userInformationTitle} />
      </Blocks.Heading>
      <Blocks.Row>
        <Input
          label={intl.formatMessage(INTL.userDetails.firstNamePlaceholder)}
          name="firstName"
          type="text"
          defaultValue={values.firstName || undefined}
          onChange={handleChange}
          disabled={scimProvisioned}
          iconAlign="start"
          icon={scimProvisioned ? 'Lock' : undefined}
          errors={errors.firstName.map(error => ({ error }))}
        />
        <Input
          name="lastName"
          type="text"
          label={intl.formatMessage(INTL.userDetails.lastNamePlaceholder)}
          defaultValue={values.lastName || undefined}
          onChange={handleChange}
          disabled={scimProvisioned}
          iconAlign="start"
          icon={scimProvisioned ? 'Lock' : undefined}
          placeholder={intl.formatMessage(INTL.userDetails.lastNamePlaceholder)}
          errors={errors.lastName.map(error => error)}
        />
        <Input
          name="email"
          type="text"
          label={intl.formatMessage(INTL.userDetails.emailPlaceholder)}
          defaultValue={values.email || undefined}
          disabled={scimProvisioned}
          iconAlign="start"
          icon={scimProvisioned ? 'Lock' : undefined}
          onChange={handleChange}
          placeholder={intl.formatMessage(INTL.userDetails.emailPlaceholder)}
          errors={errors.email.map(error => error)}
        />
      </Blocks.Row>
    </Blocks.Section>
  );
};
