import * as R from 'ramda';
import { useGetDemoTemplatesQuery } from './__generated__/GetDemoTemplates.generated';

export const useDemoMode = (organizationId: string) => {
  const { data, loading } = useGetDemoTemplatesQuery({
    variables: { organizationId },
  });

  const organizationDemoMode = R.path<boolean>([
    'organizations',
    0,
    'game',
    'demoMode',
  ])(data);

  const [setOrganizationDemoMode, { loading: mutationLoading, error }] =
    useMutation<SetOrganizationDemoMode>(SET_ORGANIZATION_DEMO_MODE_MUTATION);

  const setDemoMode = (value: boolean) =>
    setOrganizationDemoMode({ variables: { organizationId, value } });

  return {
    loading: loading || mutationLoading,
    organizationDemoMode,
    setDemoMode,
    error,
  };
};
