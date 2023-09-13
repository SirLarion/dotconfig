import { all, flatten, isEmpty, omit } from 'ramda';

import { getHoxLocalStorage } from '@hox/frontend-utils/localStorage';

import {
  AVAILABLE_COLUMN_IDS,
  isCustomLayout,
  MAX_COLUMN_COUNT,
  PREDEFINED_COLUMN_LAYOUTS,
} from '../columnCustomization/constants/columns';
import { TColumnId, TColumnLayoutId } from '../types';

type TLocalStorageColumnLayouts = {
  selectedLayout: TColumnLayoutId;
  customLayouts: Record<string, TColumnId[]>;
};

const USER_MANAGEMENT_COLUMN_LAYOUTS_KEY = 'userManagementColumnLayouts';

const DEFAULT_LAYOUT_CONFIG = {
  selectedLayout: 'default',
  customLayouts: {},
};

const isValidLocalColumnStorage = (obj: Record<string, unknown>) => {
  const selected = obj['selectedLayout'];

  // Is the name of the selected layout defined?
  if (typeof selected !== 'string') {
    return false;
  }

  const customLayouts = obj['customLayouts'];

  // Are custom layouts defined?
  if (!customLayouts || typeof customLayouts !== 'object') {
    // Is a custom layout selected while being undefined?
    if (isCustomLayout(selected)) {
      return false;
    }
  }

  if (
    // Do all layouts have a valid amount of columns?
    !all(
      layout => !isEmpty(layout) && layout.length <= MAX_COLUMN_COUNT,
      Object.values(customLayouts)
    ) &&
    // Do all columns in layouts have valid ids?
    !all(
      colId => AVAILABLE_COLUMN_IDS.includes(colId),
      flatten(Object.values(customLayouts))
    )
  ) {
    return false;
  }

  // Does a selected custom layout have defined columns?
  if (
    isCustomLayout(selected) &&
    !Object.keys(customLayouts).includes(selected)
  ) {
    return false;
  }

  return true;
};

const getFromLocalStorage = (): TLocalStorageColumnLayouts => {
  const storedLayouts = getHoxLocalStorage().getItem(
    USER_MANAGEMENT_COLUMN_LAYOUTS_KEY
  );

  if (!storedLayouts) {
    return DEFAULT_LAYOUT_CONFIG;
  }

  const storedLayoutObj = JSON.parse(storedLayouts);

  if (!isValidLocalColumnStorage(storedLayoutObj)) {
    return DEFAULT_LAYOUT_CONFIG;
  }

  return storedLayoutObj as TLocalStorageColumnLayouts;
};

const saveLayoutToLocalStorage = (name: string, layout: TColumnId[]) => {
  if (!isCustomLayout(name)) {
    return;
  }
  const currentStoredLayoutData = getFromLocalStorage();
  const currentLayouts = currentStoredLayoutData.customLayouts;
  const newCustomLayouts = { ...currentLayouts, [name]: layout };

  const newLayoutData = {
    ...currentStoredLayoutData,
    customLayouts: newCustomLayouts,
  };
  getHoxLocalStorage().setItem(
    USER_MANAGEMENT_COLUMN_LAYOUTS_KEY,
    JSON.stringify(newLayoutData)
  );
};

const removeCustomLayoutFromLocalStorage = (name: string) => {
  const currentStoredLayoutData = getFromLocalStorage();
  const currentLayouts = currentStoredLayoutData.customLayouts;

  const newLayoutData = {
    ...currentStoredLayoutData,
    ...(currentStoredLayoutData.selectedLayout === name && {
      selectedLayout: 'default',
    }),
    customLayouts: omit([name], currentLayouts),
  };
  getHoxLocalStorage().setItem(
    USER_MANAGEMENT_COLUMN_LAYOUTS_KEY,
    JSON.stringify(newLayoutData)
  );
};

const getLayoutWithName = (name: TColumnLayoutId): TColumnId[] => {
  if (!PREDEFINED_COLUMN_LAYOUTS[name]) {
    return getFromLocalStorage().customLayouts[name];
  }

  return PREDEFINED_COLUMN_LAYOUTS[name];
};

const saveAppliedLayout = (name: string) => {
  const currentStoredLayoutData = getFromLocalStorage();

  const newLayoutData = {
    ...currentStoredLayoutData,
    selectedLayout: name,
  };
  getHoxLocalStorage().setItem(
    USER_MANAGEMENT_COLUMN_LAYOUTS_KEY,
    JSON.stringify(newLayoutData)
  );
};

export const userColumnLocalStorage = {
  getAppliedColumnLayoutName: () => getFromLocalStorage().selectedLayout,
  getAppliedColumnLayout: () =>
    getLayoutWithName(getFromLocalStorage().selectedLayout),
  getLayoutWithName,
  getCustomLayouts: () => getFromLocalStorage().customLayouts,
  saveLayout: saveLayoutToLocalStorage,
  deleteCustomLayout: removeCustomLayoutFromLocalStorage,
  saveAppliedLayout,
};
