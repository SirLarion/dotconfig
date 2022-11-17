import React, {
  FC,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { MutationTuple, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { splitEvery } from 'ramda';
import { useHistory } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useCurrentUser } from '@hox/frontend-utils/hooks/useCurrentUser';
import { useOnMount } from '@hox/frontend-utils/hooks/useOnMount';

import { CreateUserInput } from '../../graphql/__generated__/globalTypes';
import { userImportPaths } from '../../layouts/paths';

import {
  ImportUserMutationResult,
  ImportUserMutationVariables,
  ImportUserMutation,
} from './graphql/__generated__/ImportUser.generated';
import { ImportInProgress } from './components/ImportInProgress';
import { UserImportLayout } from './components/Layout';
import { createdUserIdsState, updatedUserIdsState } from './recoil/atoms';
import {
  allUsersAsListSelector,
  importErrorsSelector,
} from './recoil/selectors';
import { IImportableUser, TImportError } from './lib';

const ANIMATION_TIMEOUT_MS = 500;

type TImportProgress = {
  created: string[];
  updated: string[];
  errors: TImportError[];
};

const BATCH_SIZE = 250;

const toMutationPayload =
  (organizationId: string) =>
  (user: IImportableUser): CreateUserInput => ({
    organizationId,
    emails: [
      {
        address: user.email,
        verified: true,
      },
    ],
    game: {
      mode: user.gameMode,
    },
    profile: {
      firstName: user.firstName,
      lastName: user.lastName,
      country: user.country,
      department: user.department,
      site: user.site,
      city: user.city,
      isAnonymous: user.isAnonymous,
      locale: {
        ui: user.language,
        quests: user.questLanguages,
      },
    },
  });

type TUserImportBatchArgs = {
  users: IImportableUser[];
  organizationId: string;
  mutate: MutationTuple<AdminImportUser, AdminImportUserVariables>[0];
  // mutable import progress, will be flushed to recoil after import completes
  progress: MutableRefObject<TImportProgress>;
};

type TUserImportArgs = TUserImportBatchArgs & {
  setProcessedUsersCount: React.Dispatch<React.SetStateAction<number>>;
};

//
// Run a single import batch
// Results will be saved to mutable TImportProgress
async function importUserBatch({
  users,
  organizationId,
  mutate,
  progress,
}: TUserImportBatchArgs) {
  try {
    const results = await Promise.all(
      users.map(toMutationPayload(organizationId)).map(user =>
        mutate({
          variables: {
            user,
          },
        })
      )
    );

    results.forEach(({ data, errors }, index) => {
      if (Array.isArray(errors) && errors.length > 0) {
        progress.current.errors.push({
          userId: users[index].id,
          errors: errors.map(error => error.message),
        });
      }

      if (data != null) {
        if (data.upsertUser.inserted) {
          progress.current.created.push(users[index].id);
        }
        if (data.upsertUser.updated) {
          progress.current.updated.push(users[index].id);
        }
      }
    });
  } catch (error) {
    // A non graphql error, most probably a timeout. Set all users to error state
    const importErrors: TImportError[] = users.map(user => ({
      userId: user.id,
      errors: [error as string],
    }));
    progress.current.errors.push.apply(progress, importErrors);
  }
}

async function importUsersInBatches({
  users,
  progress,
  setProcessedUsersCount,
  ...rest
}: TUserImportArgs) {
  for (const currentBatch of splitEvery(BATCH_SIZE, users)) {
    await importUserBatch({
      users: currentBatch,
      progress,
      ...rest,
    });
    setProcessedUsersCount(current => current + currentBatch.length);
  }
}

export const UserImportProgressView: FC = () => {
  const history = useHistory();
  const { organization } = useCurrentUser();
  const users = useRecoilValue(allUsersAsListSelector);
  const [mutate] = useMutation<AdminImportUser, AdminImportUserVariables>(
    IMPORT_USER_MUTATION,
    { errorPolicy: 'all' }
  );

  const progress = useRef<TImportProgress>({
    created: [],
    updated: [],
    errors: [],
  });

  const setCreatedUsers = useSetRecoilState(createdUserIdsState);
  const setUpdatedUsers = useSetRecoilState(updatedUserIdsState);
  const setImportErrors = useSetRecoilState(importErrorsSelector);

  const [processedUsersCount, setProcessedUsersCount] = useState(0);

  const haveAllUsersBeenProcessed = processedUsersCount === users.length;

  // Initiate the import when the view first mounts
  useOnMount(() => {
    importUsersInBatches({
      users,
      mutate,
      organizationId: organization._id,
      setProcessedUsersCount,
      progress,
    });
  });

  useEffect(() => {
    if (!haveAllUsersBeenProcessed) {
      return;
    }

    setCreatedUsers(progress.current.created);
    setUpdatedUsers(progress.current.updated);
    setImportErrors(progress.current.errors);

    // Give progress bar time to animate to 100% before changing view
    const timeout = setTimeout(() => {
      history.replace(userImportPaths.result);
    }, ANIMATION_TIMEOUT_MS);

    return () => clearTimeout(timeout);
  }, [
    history,
    haveAllUsersBeenProcessed,
    setCreatedUsers,
    setUpdatedUsers,
    setImportErrors,
  ]);

  return (
    <UserImportLayout.Content>
      <ImportInProgress
        userCount={users.length}
        processedCount={processedUsersCount}
      />
    </UserImportLayout.Content>
  );
};
