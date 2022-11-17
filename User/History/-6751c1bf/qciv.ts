import { gql, useMutation } from '@apollo/client';
import { assocPath, prop, uniqBy } from 'ramda';

import {
  FetchCurrentOrganizationTrainingRulesDocument,
  FetchCurrentOrganizationTrainingRulesQuery,
} from '../../../hooks/graphql/__generated__/FetchCurrentOrganizationTrainingRules.generated';
import { TTrainingRule } from '../../../hooks/useTrainingRules';

import {
  UpsertTrainingRule,
  UpsertTrainingRuleVariables,
} from './__generated__/UpsertTrainingRule';

export const UPSERT_TRAINING_RULE = gql`
  mutation UpsertTrainingRule(
    $organizationId: ID!
    $enabled: Boolean!
    $target: String!
    $deactivationReason: DeactivationReason
    $comment: String
  ) {
    upsertOrganizationTrainingRule(
      input: {
        organizationId: $organizationId
        type: QUEST_TEMPLATE
        enabled: $enabled
        deactivationReason: $deactivationReason
        target: $target
        comment: $comment
      }
    ) {
      _id
      target
      enabled
      history {
        timestamp
        user {
          _id
          profile {
            firstName
            lastName
          }
        }
        deactivationReason
        comment
        enabled
      }
    }
  }
`;

export const useUpsertTrainingRule = () => {
  const [mutate] = useMutation<UpsertTrainingRule, UpsertTrainingRuleVariables>(
    UPSERT_TRAINING_RULE,
    {
      update: (cache, { data }) => {
        const cachedTrainingRules = cache.readQuery({
          query: FetchCurrentOrganizationTrainingRulesDocument,
        }) as FetchCurrentOrganizationTrainingRulesQuery;

        const upsertOrganizationTrainingRule =
          data?.upsertOrganizationTrainingRule as TTrainingRule;

        const updatedNodes =
          cachedTrainingRules.currentUser?.organization.trainingRules.nodes.concat(
            [upsertOrganizationTrainingRule]
          ) ?? [];

        const uniqueNodes = uniqBy(prop('_id'), updatedNodes);

        const updatedTrainingRules = assocPath(
          ['currentUser', 'organization', 'trainingRules'],
          { totalCount: uniqueNodes.length, nodes: uniqueNodes },
          cachedTrainingRules
        );

        cache.writeQuery({
          query: FetchCurrentOrganizationTrainingRulesDocument,
          data: updatedTrainingRules,
        });
      },
    }
  );

  return { mutate };
};
