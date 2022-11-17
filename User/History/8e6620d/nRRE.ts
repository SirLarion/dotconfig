import { useMemo } from 'react';
import { useQuery } from '@apollo/client';

import { useCurrentUser } from '@hox/frontend-utils/hooks/useCurrentUser';
import { getOr } from '@hox/frontend-utils/ramda';

import { useQueryState } from './useQueryState';
import { useGetOrganizationsQuery } from './__generated__/query.generated';

export const useGetOrgName = () => {
  const { orgId } = useQueryState();
  const { isSuperAdmin, organization } = useCurrentUser();

  // Only query for the current organization name if the user is super-admin
  // as that's the only situation where orgId != organization._id
  const { data, loading } = useGetOrganizationsQuery({
    variables: { id: orgId || '' },
    skip: !isSuperAdmin,
  });

  const orgName = useMemo(
    () => getOr(['organizations', 0, 'name'], organization.name, data),
    [data, organization]
  );

  return {
    orgName,
    loading,
  };
};
