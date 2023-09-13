import React, { FC, useEffect, useMemo, useState } from 'react';
import { partition } from 'ramda';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';

import { useOnMount } from '@hox/frontend-utils/hooks/useOnMount';
import { Body } from '@hox/ui/Text';

import { userImportPaths } from '../../layouts/paths';

import { ImportUsersFooter } from './components/ImportUsersFooter';
import { UserImportLayout } from './components/Layout';
import { ManualImportBox } from './components/ManualImportBox';
import { userEmailsImportState } from './components/ManualImportBox/recoil/atoms';
import { useCurrentUserOrganizationDefaultSettingsQuery } from './components/UserImportTable/graphql/__generated__/CurrentUserOrganizationDefaultSettings.generated';
import { USER_IMPORT_INTL as INTL } from './lib/intl';
import { getEmailValidator } from './lib/validation';
import { selectedUsersState, userImportMethodState } from './recoil/atoms';
import { getUserEmails, setUserImportRowsSelector } from './recoil/selectors';
import {
  EUserImportMethod,
  generateUserImportId,
  IImportableUser,
} from './lib';

const capitalize = (str: string) => {
  const head = str.substring(0, 1);
  const rest = str.substring(1);
  return head.toUpperCase().concat(rest);
};

// split and join returns the same string if it does not contain given character
const maybeHyphenCapitalize = (str: string) =>
  str.split('-').map(capitalize).join('-');

const emailsToUsers = (emails: string[]): IImportableUser[] =>
  emails.map(email => {
    const [lhs] = email.split('@');
    const [firstName, lastName, ...rest] = lhs.split('.');

    // split always returns the whole string as first element if its unable to find more
    const hasOnlyFirstAndLastName = lastName != null && rest.length === 0;
    const id = generateUserImportId();

    if (hasOnlyFirstAndLastName) {
      return {
        id,
        email,
        firstName: capitalize(firstName),
        lastName: maybeHyphenCapitalize(lastName),
      };
    } else {
      return { email, id };
    }
  });

export const UserImportEmailAdditionView: FC = () => {
  const { data } = useCurrentUserOrganizationDefaultSettingsQuery();

  const [didSaveUsers, setDidSaveUsers] = useState(false);
  const setImportMethod = useSetRecoilState(userImportMethodState);
  const globalUserEmails = useRecoilValue(getUserEmails);
  const userEmails = useRecoilValue(userEmailsImportState);
  const history = useHistory();

  // Ensure that the import method is set correctly if user directly navigates to the URL
  useOnMount(() => {
    setImportMethod(EUserImportMethod.COPY_AND_PASTE);
  });
  useEffect(() => {
    if (didSaveUsers && globalUserEmails.length > 0) {
      history.push(userImportPaths.review);
    }
  }, [didSaveUsers, globalUserEmails, history]);

  const allowedEmailDomains = data?.currentUser?.organization.domains.map(
    domain => domain.name
  );
  const [validEmails, invalidEmails] = useMemo(
    () => partition(getEmailValidator(allowedEmailDomains), userEmails),
    [userEmails, allowedEmailDomains]
  );
  const nextDisabled = validEmails.length === 0 || invalidEmails.length > 0;

  const saveUsers = useRecoilCallback(({ reset, set }) => async () => {
    reset(selectedUsersState);
    set(setUserImportRowsSelector, emailsToUsers(userEmails));
  });

  return (
    <UserImportLayout.Content>
      {allowedEmailDomains && (
        <Body dimmed>
          <FormattedMessage
            id="app.admin.userImport.allowedDomains"
            defaultMessage="Allowed domains: "
            description="Title for text showing a list of allowed email domains"
          />
          <Body>{allowedEmailDomains.join(', ')}</Body>
        </Body>
      )}
      <ManualImportBox allowedEmailDomains={allowedEmailDomains} />

      <ImportUsersFooter
        nextStepButtonDisabled={nextDisabled}
        nextStepButtonText={INTL.steps.review}
        previousStepButtonText={INTL.steps.chooseMethod}
        previousStepUrl={userImportPaths.root}
        nextStepButtonOnClick={() => {
          saveUsers();
          setDidSaveUsers(true);
        }}
      />
    </UserImportLayout.Content>
  );
};
