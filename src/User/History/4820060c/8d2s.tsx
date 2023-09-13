import React from 'react';
import styled, { css } from 'styled-components';

import { HoxIcon } from '@hox/ui/HoxIcon';
import { SmallText, SmallTextStrong } from '@hox/ui/Text';

import { palette } from '../styles/theme';

export const toDeltaString = (amount?: number) =>
  `${amount ? Math.abs(amount).toFixed(2) : '----'}`;

export interface IDeltaTagProps {
  delta?: number;
  type?: TTagType;
  unitMark?: React.ReactNode;
  changeTotal?: React.ReactNode;
  timeSpan?: React.ReactNode;
  renderAsPill?: boolean;
  small?: boolean;
}

const StyledDeltaTag = styled.div<{
  $color: string;
  $bgColor: string;
  $renderAsPill: boolean;
  $small: boolean;
}>`
  display: flex;
  align-items: center;

  > :first-child {
    > ${SmallTextStrong} {
      color: ${p => p.$color};
      text-overflow: unset;
      font-size: ${p => (p.$small ? 0.75 : 1)}rem;
    }
  }

  > :not(:last-child) {
    margin-right: 0.25rem;
  }

  ${p =>
    p.$renderAsPill &&
    css`
      > :first-child {
        min-width: 3rem;
        background-color: ${p.$bgColor};
        border-radius: 3.5rem;
        padding: 0 0.5rem;
      }
    `}
`;

const BubbleFilled = styled.div`
  display: flex;
  align-items: center;
`;

type TTagType = 'positive' | 'negative' | 'neutral';

const deltaProperties = {
  negative: {
    color: palette(p => p.accent.danger),
    bgColor: palette(p => p.accent.danger.ghosted),
  },
  positive: {
    color: palette(p => p.accent.positive),
    bgColor: palette(p => p.accent.positive.ghosted),
  },
  neutral: {
    color: palette(p => p.accent.boring),
    bgColor: palette(p => p.background.base),
  },
};

const deltaArrowDirection = {
  up: 0,
  down: 180,
  horizontal: 90,
};

const getDeltaRotation = (delta?: number) => {
  if (!delta || delta === 0) {
    return deltaArrowDirection.horizontal;
  }

  return delta > 0 ? deltaArrowDirection.up : deltaArrowDirection.down;
};

export const DeltaTag: React.FC<IDeltaTagProps> = ({
  delta,
  unitMark,
  changeTotal,
  timeSpan,
  type = 'positive',
  renderAsPill = false,
  small = false,
  ...restProps
}) => {
  const properties = delta ? deltaProperties[type] : deltaProperties.neutral;
  return (
    <StyledDeltaTag
      {...restProps}
      $color={properties.color}
      $bgColor={properties.bgColor}
      $renderAsPill={renderAsPill}
      $small={small}
    >
      <BubbleFilled>
        <HoxIcon.CaretUpFilled
          color={properties.color}
          rotation={getDeltaRotation(delta)}
          size={renderAsPill || small ? 1.25 : 1.5}
        />
        <SmallTextStrong>
          {`${toDeltaString(delta)}`}
          {unitMark}
        </SmallTextStrong>
      </BubbleFilled>
      <SmallTextStrong>{changeTotal}</SmallTextStrong>
      <SmallText dimmed>{timeSpan}</SmallText>
    </StyledDeltaTag>
  );
};
