import React, { FC } from 'react';
import styled from 'styled-components';

import { HoxIcon } from '@hox/ui/HoxIcon';
import { Radio } from '@hox/ui/Radio';
import { palette, themeProp } from '@hox/ui/styles/theme';
import { SmallTextStrong } from '@hox/ui/Text';

import { DeactivationReason } from '../../../../../../types/graphql.generated';
import { QUEST_TEMPLATE_DEACTIVATION_REASON_INTL } from '../../../components/QuestTemplateActivityLog/intl';

export interface IReasonSelectorProps {
  reason: DeactivationReason;
  onSelect: () => void;
  isSelected: boolean;
}

const StyledReasonSelector = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: ${palette(p => p.background.base)};
  border-radius: ${themeProp(t => t.borderRadius.input)};
  transition: background-color 500ms;
  cursor: pointer;

  > :first-child {
    margin-right: 0.5rem;
  }

  :hover {
    background-color: ${palette(p => p.foreground.secondary.ghosted)};
  }
`;

export const ReasonSelector: FC<IReasonSelectorProps> = ({
  reason,
  onSelect,
  isSelected,
}) => (
  <StyledReasonSelector onClick={onSelect}>
    {reason === DeactivationReason.OTHER ? (
      <HoxIcon.Plus />
    ) : (
      <Radio selected={isSelected} />
    )}
    <SmallTextStrong>
      {QUEST_TEMPLATE_DEACTIVATION_REASON_INTL[reason]}
    </SmallTextStrong>
  </StyledReasonSelector>
);
