import { gql, useMutation } from '@apollo/client';
import { assocPath, prop, uniqBy } from 'ramda';

import {
  FetchCurrentOrganizationTrainingRulesDocument,
  FetchCurrentOrganizationTrainingRulesQuery,
} from '../../../hooks/graphql/__generated__/FetchCurrentOrganizationTrainingRules.generated';
import { TTrainingRule } from '../../../hooks/useTrainingRules';

import {
  useUpsertTrainingRuleMutation,
  UpsertTrainingRule,
  UpsertTrainingRuleVariables,
} from './graphql/__generated__/UpsertTrainingRule.generated';

export const useUpsertTrainingRule = () => {
  const [mutate] = useUpsertTrainingRuleMutation({
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
  });

  return { mutate };
};
