import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { isNil, mergeDeepRight } from 'ramda';
import { FormattedMessage } from 'react-intl';
import { useSetRecoilState } from 'recoil';

import { useFormValidation } from '@hox/frontend-utils/hooks/useFormValidation';
import { Button } from '@hox/ui/Button';
import { HoxIcon } from '@hox/ui/HoxIcon';
import { palette } from '@hox/ui/styles/theme';
import { useToast } from '@hox/ui/ToastHub';

import { DividerCard } from '../../../../components/DividerCard';
import { InfoBlock } from '../../../../components/InfoBlock';
import { SoftDeleteUserButton } from '../../../../components/SingleUserActions/SoftDelete';
import { UndoSoftDeleteButton } from '../../../../components/SingleUserActions/UndoSoftDelete';
import { BUTTON_INTL } from '../../../../intl/generic';
import {
  UserDetailsFragment,
  UserDetailsOrganizationInfoFragment,
} from '../../graphql/__generated__/FetchUserDetails.generated';
import { useUpdateUserBasicInfoMutation } from '../../graphql/__generated__/UpdateUserBasicInfo.generated';
import { useUpdateUserEmailAddressMutation } from '../../graphql/__generated__/UpdateUserEmailAddress.generated';
import { useUpdateUserRoleMutation } from '../../graphql/__generated__/UpdateUserRole.generated';
import { EUserRole, getMostRelevantRole } from '../../lib';
import { editingUserState } from '../../recoil/atoms';

import { DepartmentAndSiteSection } from './components/DepartmentAndSiteSection';
import { GameSettingsSection } from './components/GameSettingsSection';
import { LanguageSection } from './components/LanguageSection';
import { LocationSection } from './components/LocationSection';
import { RoleSection } from './components/RoleSection';
import { UserInformationSection } from './components/UserInformationSection';
import {
  getFormFieldsFromUser,
  getSubmittable,
  userWithUpdatedRoles,
} from './lib';
import { getFormValidationRules } from './validation';

const TOAST_TIMEOUT = 5000;

const Footer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;

  // Buttons
  > :first-child {
    > :not(:last-child) {
      margin-right: 1rem;
    }
  }
`;

const LockIconStyled = styled(HoxIcon.Lock)`
  margin: 0 0.5rem;
`;

const InfoBlockStyled = styled(InfoBlock)`
  > div {
    display: flex;
  }
`;

export const UserDetailsEdit: FC<{
  user: UserDetailsFragment;
  organization: UserDetailsOrganizationInfoFragment;
}> = ({ user, organization }) => {
  const { createToast } = useToast();
  const setEditingUserState = useSetRecoilState(editingUserState);

  const { handleChange, setFieldValues, values, isValid, isTouched, errors } =
    useFormValidation(
      getFormValidationRules(organization),
      getFormFieldsFromUser(user)
    );

  const scimProvisioned = user.scim?.lastProvisionedAt !== undefined;

  const [mutate, { loading: isSubmittingBasicInfo }] =
    useUpdateUserBasicInfoMutation();

  const [mutateRole, { loading: isSubmittingRoles }] =
    useUpdateUserRoleMutation();

  const [mutateEmail, { loading: isSubmittingEmail }] =
    useUpdateUserEmailAddressMutation();

  const currentRole = getMostRelevantRole(user.roles as EUserRole[]);
  const [role, setRole] = useState(currentRole);

  const isSubmitting = isSubmittingBasicInfo || isSubmittingRoles;

  const canSaveForm =
    (isValid && isTouched && !isSubmitting) ||
    (isValid && role !== currentRole && !isSubmitting);

  const saveUserRoles = (
    user: UserDetailsFragment
  ): Promise<UserDetailsFragment> =>
    new Promise((resolve, reject) => {
      if (currentRole === role) {
        resolve(user);

        return;
      }
      mutateRole({
        variables: {
          organizationId: organization?._id,
          userId: user._id,
          role,
        },
      })
        .then(res =>
          resolve(userWithUpdatedRoles(user, res.data?.setRoleForUser.roles))
        )
        .catch(reject);
    });

  const saveUserBasicInfo = (user: UserDetailsFragment) =>
    new Promise((resolve, reject) => {
      if (!isTouched || !isValid) {
        resolve(user);

        return;
      }
      Promise.all([
        mutate({ variables: getSubmittable(user, values) }),
        mutateEmail({
          variables: {
            organizationId: organization?._id,
            userId: user._id,
            emailAddress: user.emails[0].address,
          },
        }),
      ])
        .then(res =>
          resolve(mergeDeepRight(res[1].data?.updated, res[0].data?.updated))
        )
        .catch(reject);
    });

  return (
    <DividerCard>
      {scimProvisioned && (
        <InfoBlockStyled>
          <FormattedMessage
            id="app.admin.user.edit.scimManagedUser.disclaimer"
            defaultMessage="Fields with {icon} are automatically synced with your
                  organization and cannot be edited from Hoxhunt Admin."
            description="Text explaining the admin that some of the user's information cannot be edited"
            values={{
              icon: <LockIconStyled color={palette(p => p.cta.primary)} />,
            }}
          />
        </InfoBlockStyled>
      )}
      <UserInformationSection
        errors={errors}
        handleChange={handleChange}
        values={values}
        scimProvisioned={scimProvisioned}
      />

      <RoleSection role={role} setRole={setRole} />

      <LocationSection
        scimProvisioned={scimProvisioned}
        handleChange={handleChange}
        values={values}
      />

      <DepartmentAndSiteSection
        values={values}
        errors={errors}
        handleChange={handleChange}
        scimProvisioned={scimProvisioned}
      />

      <LanguageSection
        values={values}
        errors={errors}
        setFieldValues={setFieldValues}
        user={user}
        organization={organization}
        scimProvisioned={scimProvisioned}
      />

      <GameSettingsSection
        values={values}
        setIsAnonymous={isAnonymous => setFieldValues({ isAnonymous })}
        setGameMode={gameMode => setFieldValues({ gameMode })}
      />
      <Footer>
        <div>
          <Button outlined onClick={() => setEditingUserState(false)}>
            {BUTTON_INTL.cancel}
          </Button>
          <Button
            disabled={!canSaveForm}
            onClick={() => {
              saveUserRoles(user)
                .then(saveUserBasicInfo)
                .then(() => {
                  setEditingUserState(false);
                  createToast({
                    type: 'positive',
                    title: (
                      <FormattedMessage
                        id="app.admin.userDetails.saveSuccess"
                        defaultMessage="User info updated"
                        description="Message to show user when user info is saved succesfully"
                      />
                    ),
                    timeout: TOAST_TIMEOUT,
                  });
                })
                .catch(() => {
                  createToast({
                    type: 'error',
                    title: (
                      <FormattedMessage
                        id="app.admin.userDetails.saveFailed"
                        defaultMessage="Failed to save user info"
                        description="Message to show user when user info save operation is failed"
                      />
                    ),
                    timeout: TOAST_TIMEOUT,
                  });
                });
            }}
          >
            {BUTTON_INTL.save}
          </Button>
        </div>
        {!user.willBeHardDeletedAt ? (
          <SoftDeleteUserButton
            disabled={!isNil(user.scim)}
            userId={user._id}
            organizationId={organization._id}
          />
        ) : (
          <UndoSoftDeleteButton
            disabled={!isNil(user.scim)}
            userId={user._id}
            organizationId={organization._id}
          />
        )}
      </Footer>
    </DividerCard>
  );
};
