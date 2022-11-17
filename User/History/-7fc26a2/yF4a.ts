import { useMemo } from 'react';

import { QuestOrigin } from '@hox/frontend-utils/types/graphql.generated';

import {
  FetchOrganizationActiveTestQuestsQueryVariables,
  useFetchOrganizationActiveTestQuestsQuery,
} from './__generated__/FetchOrganizationActiveTestQuests.generated';

const POLL_INTERVAL_MS = 30000;

const filter: FetchOrganizationActiveTestQuestsQueryVariables['filter'] = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  origin_eq: QuestOrigin.TECHNICAL_TEST,
};

export const usePollActiveTests = () => {
  const { data, previousData, loading, refetch } =
    useFetchOrganizationActiveTestQuestsQuery({
      pollInterval: POLL_INTERVAL_MS,
      variables: {
        filter,
      },
    });

  const { nodes: quests } = useMemo(
    () =>
      data?.currentUser?.organization.questsConnection ??
      previousData?.currentUser?.organization.questsConnection ?? {
        nodes: [],
        totalCount: 0,
      },
    [data, previousData]
  );

  return {
    loading,
    activeTests: quests,
    refetch,
  };
};
