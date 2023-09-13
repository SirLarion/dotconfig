import * as R from 'ramda';

export const useDemoModeRequiredContext = () => {
  const { data, loading } = useQuery<GetDemoTemplates>(GET_DEMO_TEMPLATES);

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
