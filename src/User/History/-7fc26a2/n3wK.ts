import { useMemo } from 'react';
import { gql, useQuery } from '@apollo/client';

import {} from '@frontend-utils/src/graphql/__generated__/globalTypes';

import { testQuestFieldsFragment } from '../graphql/fragments';

import {
  OrganizationActiveTestsQuery,
  OrganizationActiveTestsQueryVariables,
} from './__generated__/OrganizationActiveTestsQuery';

const ACTIVE_TESTS_QUERY = gql`
  query OrganizationActiveTestsQuery($filter: Quest_filter) {
    currentUser {
      _id
      organization {
        _id
        questsConnection(filter: $filter) {
          totalCount
          nodes {
            _id
            ...TestQuestFieldsFragment
          }
        }
      }
    }
  }
  ${testQuestFieldsFragment}
`;

const POLL_INTERVAL_MS = 30000;
const TECHNICAL_TEST_ORIGIN_VALUE = 'TECHNICAL_TEST';

const filter: OrganizationActiveTestsQueryVariables['filter'] = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  origin_eq: TECHNICAL_TEST_ORIGIN_VALUE,
};

export const usePollActiveTests = () => {
  const { data, previousData, loading, refetch } = useQuery<
    OrganizationActiveTestsQuery,
    OrganizationActiveTestsQueryVariables
  >(ACTIVE_TESTS_QUERY, {
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
