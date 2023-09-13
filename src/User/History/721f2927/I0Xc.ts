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

  const isCustomLayoutsObject = (x: unknown): x is Record<string, string[]> =>
    customLayouts !== null &&
    typeof customLayouts === 'object' &&
    Object.values(customLayouts).every(
      layout =>
        Array.isArray(layout) && layout.every(it => typeof it === 'string')
    );

  // Are custom layouts defined?
  if (!isCustomLayoutsObject(customLayouts)) {
    // Is a custom layout selected while being undefined?
    return !isCustomLayout(selected);
  }

  if (
    // Do all layouts have a valid amount of columns?
    !all(
      layout =>
        Array.isArray(layout) &&
        !isEmpty(layout) &&
        layout.length <= MAX_COLUMN_COUNT,
      Object.values(customLayouts)
    ) ||
    // Do all columns in layouts have valid ids?
    !all(
      colId => AVAILABLE_COLUMN_IDS.includes(colId as TColumnId),
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

const getLocalStorageColumnLayouts = (): TLocalStorageColumnLayouts => {
  const storedLayouts = getHoxLocalStorage().getItem(
    USER_MANAGEMENT_COLUMN_LAYOUTS_KEY
  );

  if (!storedLayouts) {
    return DEFAULT_LAYOUT_CONFIG;
  }

  try {
    const storedLayoutObj = JSON.parse(storedLayouts);

    if (!isValidLocalColumnStorage(storedLayoutObj)) {
      return DEFAULT_LAYOUT_CONFIG;
    }

    return storedLayoutObj as TLocalStorageColumnLayouts;
  } catch {
    return DEFAULT_LAYOUT_CONFIG;
  }
};

const saveLayoutToLocalStorage = (name: string, layout: TColumnId[]) => {
  if (!isCustomLayout(name)) {
    return;
  }
  const currentStoredLayoutData = getLocalStorageColumnLayouts();
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
  const currentStoredLayoutData = getLocalStorageColumnLayouts();
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
    return getLocalStorageColumnLayouts().customLayouts[name];
  }

  return PREDEFINED_COLUMN_LAYOUTS[name];
};

const saveAppliedLayout = (name: string) => {
  const currentStoredLayoutData = getLocalStorageColumnLayouts();

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
  getAppliedColumnLayoutName: () =>
    getLocalStorageColumnLayouts().selectedLayout,
  getAppliedColumnLayout: () =>
    getLayoutWithName(getLocalStorageColumnLayouts().selectedLayout),
  getLayoutWithName,
  getCustomLayouts: () => getLocalStorageColumnLayouts().customLayouts,
  saveLayout: saveLayoutToLocalStorage,
  deleteCustomLayout: removeCustomLayoutFromLocalStorage,
  saveAppliedLayout,
};
