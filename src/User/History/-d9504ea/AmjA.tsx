import React, { Dispatch, SetStateAction } from 'react';

import {
  getDropdownItems,
  toDropdownItem,
} from '@hox/frontend-utils/jobFunctions/util';
import { Dropdown } from '@hox/ui/Dropdown';
import { ButtonText, SmallText } from '@hox/ui/Text';

import { JOB_FUNCTION } from '../../../../../types/graphql.generated';
import { SET_USER_PROPERTIES_INTL } from '../intl';
import { TEditableProperties } from '../types';

export const createJobFunctionFormBlock = (
  setProperties: Dispatch<SetStateAction<TEditableProperties>>,
  properties: TEditableProperties
) => {
  return (
    <>
      <ButtonText>
        {SET_USER_PROPERTIES_INTL.properties.jobFunction.title}
      </ButtonText>
      <SmallText dimmed>
        {SET_USER_PROPERTIES_INTL.properties.jobFunction.description}
      </SmallText>
      <Dropdown
        disableScrollToDropdown
        items={getDropdownItems()}
        onChange={selected => {
          if (Array.isArray(selected) || !selected || !selected.id) {
            return;
          }
          const jobFunction = selected.value as JOB_FUNCTION;
          setProperties(current => ({ ...current, jobFunction }));
        }}
        initialSelected={
          properties.jobFunction && toDropdownItem(properties.jobFunction)
        }
      />
    </>
  );
};
