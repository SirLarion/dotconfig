import { useRecoilValue } from 'recoil';
import { columnLayoutState } from '../../../../views/UserManagement/columnCustomization/recoil';

export const useTableColumns = () => {
  const layoutName = useRecoilValue(columnLayoutState.appliedColumnLayoutName);
};
