import * as R from 'ramda';
import { useGetOrganizationDemoModeQuery } from './__generated__/GetOrganizationDemoMode.generated';
import { useSetOrganizationDemoModeMutation } from './__generated__/SetOrganizationDemoMode.generated';

export const useDemoMode = (organizationId: string) => {
  const { data, loading } = useGetOrganizationDemoModeQuery({
    variables: { organizationId },
  });

  const organizationDemoMode = R.path<boolean>([
    'organizations',
    0,
    'game',
    'demoMode',
  ])(data);

  const [setOrganizationDemoMode, { loading: mutationLoading, error }] =
    useSetOrganizationDemoModeMutation();

  const setDemoMode = (value: boolean) =>
    setOrganizationDemoMode({ variables: { organizationId, value } });

  return {
    loading: loading || mutationLoading,
    organizationDemoMode,
    setDemoMode,
    error,
  };
};
