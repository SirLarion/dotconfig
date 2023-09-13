import { isEmpty } from 'ramda';
 import { useCurrentUser } from '@hox/frontend-utils/hooks/useCurrentUser';
import { useUserListState } from './useUserListState';

  export const useUserListSelectorParams = () => {
    
    const {
      organization: { _id: organizationId },
    } = useCurrentUser();
    const { search, filter, selectedIds } = useUserListState();

    return ...(!isEmpty(selectedIds)
              ? {
                  organizationId,
                  // eslint-disable-next-line @typescript-eslint/naming-convention
                  filter: { _id_in: selectedIds },
                }
              : {
                  organizationId,
                  search,
                  filter,
                }

  }