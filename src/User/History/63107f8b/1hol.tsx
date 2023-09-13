import React, { FC, useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import { dissoc, isEmpty, without } from 'ramda';
import { useRecoilValue } from 'recoil';

import { AnimatedResizingContent } from '@hox/ui/AnimatedResizingContent';
import { palette } from '@hox/ui/styles/theme';
import { Tag } from '@hox/ui/Tags';
import { ButtonText, SmallText } from '@hox/ui/Text';

import { BUTTON_INTL } from '../../../../intl/generic';
import { userActionState } from '../../recoil';
import { Blocks } from '../Blocks';

import { SET_USER_PROPERTIES_INTL as INTL } from './intl';
import { allowedProperties } from './properties';
import { TEditableProperties, TEditablePropertyKey } from './types';
import { useSetProperties } from './useSetProperties';

const StyledSetUserProperties = styled.div`
  width: 40rem;

  > :not(:last-child) {
    margin-bottom: 1rem;
  }

  > :last-child {
    padding-top: 1rem;
  }
`;

const PropertySelect = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  > :first-child {
    flex-grow: 1;
    align-self: stretch;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.25rem;
  }
`;

const Content = styled(AnimatedResizingContent)`
  display: flex;
  flex-direction: column;
`;

const Properties = styled.div`
  > :first-child {
    border-top: 1px solid ${palette(p => p.outline.secondary.faded)};
  }

  > div {
    border-bottom: 1px solid ${palette(p => p.outline.secondary.faded)};
  }
`;

const RemovePropertyButton = styled(SmallText)`
  cursor: pointer;
  transition: color 180ms ease;
  color: ${palette(p => p.accent.danger)};

  :hover {
    color: ${palette(p => p.accent.danger.level(6))};
  }
`;

const Property = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0 0.5rem 0;
  position: relative;

  > ${RemovePropertyButton} {
    align-self: flex-end;
    margin-top: 0.25rem;
  }
`;

const PropertyField = styled.div`
  > :last-child {
    margin-top: 1rem;
  }
`;

const PropertyTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 28rem;
  margin-left: -0.25rem;

  > div {
    flex-shrink: 0;
    margin: 0.25rem;
  }
`;

const SetUserPropertiesHeader = styled.div`
  display: flex;
  flex-direction: column;

  > div {
    margin-bottom: 1rem;
  }
`;

const SelectedUsersCount = styled(ButtonText)`
  display: flex;

  > :first-child {
    font-weight: 600;
    margin-right: 0.3rem;
  }
`;

const StyledTag = styled(Tag)<{ $isSelected?: boolean }>`
  cursor: pointer;
  border: 1px solid ${palette(p => p.outline.secondary.faded)};
  background-color: ${palette(p => p.accent.boring)};
  transition-property: background-color, border-color, color;
  transition-duration: 160ms;
  transition-timing-function: ease-in-out;

  ${({ $isSelected }) =>
    !$isSelected &&
    css`
      border: 1px solid;
      border-color: ${palette(p => p.outline.secondary)};
      color: ${palette(p => p.foreground.input)};
      background-color: transparent;
    `}

  :hover {
    color: ${palette(p => p.foreground.cta)};
    border-color: ${palette(p => p.accent.boring)};
    background-color: ${palette(p => p.accent.boring)};
  }
`;

const Buttons = styled(Blocks.CTAButtons)`
  justify-content: flex-end;
`;

export interface ISetUserProperties {
  onActionCancel: () => void;
  onActionConfirm: () => void;
}

const selectableProperties = Object.entries(allowedProperties).map(
  ([key, value]) => ({
    key: key as TEditablePropertyKey,
    name: value.displayName,
  })
);

export const SetUserProperties: FC<ISetUserProperties> = ({
  onActionCancel,
}) => {
  const taskCount = useRecoilValue(userActionState.taskCount);
  const [selectedProperties, setSelectedProperties] = useState<
    TEditablePropertyKey[]
  >([]);

  const isSelectedProperty = useCallback(
    propertyName => {
      return selectedProperties.includes(propertyName);
    },
    [selectedProperties]
  );

  // variables for setUserProperties mutation
  const [mutationVariables, setMutationVariables] =
    useState<TEditableProperties>({});

  const { runSetProperties } = useSetProperties();

  const removeProperty = (propertyName: TEditablePropertyKey) => {
    setMutationVariables(old => dissoc(propertyName, old));
    setSelectedProperties(old => without([propertyName], old));
  };

  const selectProperty = (property: TEditablePropertyKey) => {
    setSelectedProperties(current => [...current, property]);
    setMutationVariables(current => ({
      [property]: allowedProperties[property].defaultValue,
      ...current,
    }));
  };

  return (
    <StyledSetUserProperties>
      <Content>
        <SetUserPropertiesHeader>
          <SelectedUsersCount>
            <ButtonText>{INTL.usersSelected(taskCount)}</ButtonText>
          </SelectedUsersCount>
          <PropertySelect>
            <ButtonText>{INTL.pickProperties}</ButtonText>
            <PropertyTags>
              {selectableProperties.map(property => {
                const isSelected = isSelectedProperty(property.key);
                return (
                  <div
                    key={property.key}
                    onClick={() =>
                      isSelected
                        ? removeProperty(property.key)
                        : selectProperty(property.key)
                    }
                  >
                    <StyledTag $isSelected={isSelected}>
                      {property.name}
                    </StyledTag>
                  </div>
                );
              })}
            </PropertyTags>
          </PropertySelect>
        </SetUserPropertiesHeader>
        <Properties>
          {selectedProperties.map(propertyName => (
            <Property key={propertyName}>
              <PropertyField>
                {allowedProperties[
                  propertyName as TEditablePropertyKey
                ].selectionView(setMutationVariables, mutationVariables)}
              </PropertyField>
              <RemovePropertyButton
                onClick={() => removeProperty(propertyName)}
                color={palette(p => p.accent.danger)}
              >
                {BUTTON_INTL.remove}
              </RemovePropertyButton>
            </Property>
          ))}
        </Properties>
      </Content>
      <Buttons
        confirmButtonDisabled={isEmpty(mutationVariables)}
        onActionConfirm={() => runSetProperties(mutationVariables)}
        onActionCancel={onActionCancel}
      />
    </StyledSetUserProperties>
  );
};
