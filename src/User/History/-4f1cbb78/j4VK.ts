import * as R from 'ramda';
import { useGetDemoTemplatesQuery } from './__generated__/GetDemoTemplates.generated';

export const useDemoModeRequiredContext = () => {
  const { data, loading } = useGetDemoTemplatesQuery();

  const templates = data?.demoQuestTemplates || [];

  const activeTags = R.pluck('tag', templates);

  const requiredContextData = R.pluck('requiredContext', templates);

  const usedOrgContext = R.pipe(
    R.pluck('usedOrgContext'),
    R.flatten,
    R.uniq
  )(requiredContextData);

  const usedDomains = R.pipe(
    R.pluck('usedDomains'),
    R.flatten,
    R.uniq
  )(requiredContextData);

  return { usedDomains, usedOrgContext, activeTags, loading };
};
