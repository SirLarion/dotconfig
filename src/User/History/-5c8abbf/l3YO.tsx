import React, { Dispatch, SetStateAction } from 'react';

import { ButtonText, SmallText } from '@hox/ui/Text';

import { SUPPORTED_LOCALE } from '../../../../../types/graphql.generated';
import {
  TUserLocaleDropdownItem,
  UserLocaleDropdown,
} from '../../../../UserLocaleDropdown';
import { SET_USER_PROPERTIES_INTL } from '../intl';
import { TEditableProperties } from '../types';

export const createSetUiLanguageFormBlock = (
  setProperties: Dispatch<SetStateAction<TEditableProperties>>,
  properties: TEditableProperties
) => {
  return (
    <>
      <ButtonText>
        {SET_USER_PROPERTIES_INTL.properties.uiLanguage.title}
      </ButtonText>
      <SmallText dimmed>
        {SET_USER_PROPERTIES_INTL.properties.uiLanguage.description}
      </SmallText>
      <UserLocaleDropdown
        selected={properties.uiLanguage || undefined}
        onChange={selected => {
          if (!selected) {
            return;
          }

          const selectedAsLocaleDropdownItem =
            selected as TUserLocaleDropdownItem;

          const uiLanguage =
            selectedAsLocaleDropdownItem.id as SUPPORTED_LOCALE;
          setProperties(current => ({ ...current, uiLanguage }));
        }}
      />
    </>
  );
};
