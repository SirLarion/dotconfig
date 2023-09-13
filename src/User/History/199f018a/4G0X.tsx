import React, { FC } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { range } from 'ramda';
import { animated, config, useSprings } from 'react-spring/dist';

import { palette, WithTheme } from '../styles/theme';

const PULSE_TIME_MS = 2000;
const PULSE_INTERVAL_MS = 100;
const PULSE_ITEMS = Math.round(PULSE_TIME_MS / PULSE_INTERVAL_MS);

export interface ISkeletonLoader {
  rows?: number;
  balls?: number;
  reverseOrder?: boolean;
}

export const skeletonLoaderPulseAnimation = css`
  animation-name: ${keyframes`
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.25;
    }
  `};
  animation-duration: ${PULSE_TIME_MS}ms;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
`;

const SkeletonLoaderStyled = styled.div`
  > * {
    margin-bottom: 3rem;
    :last-child {
      margin-bottom: 0;
    }
  }

  /* Skeleton pulse animation */
  > * > * {
    ${skeletonLoaderPulseAnimation}
  }

  ${range(1, PULSE_ITEMS).map(
    i => css`
      > :nth-child(${PULSE_ITEMS}n + ${i}) > * {
        animation-delay: ${i * PULSE_INTERVAL_MS}ms;
      }
    `
  )}
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  ::after {
    content: ' ';
    flex: 1;
    display: block;
    height: 3rem;
    border-radius: 0.5rem;
    background-color: ${palette(p => p.background.primary.level(1))};

    background-color: ${({ theme }: WithTheme) =>
      theme.name === 'light'
        ? palette(p => p.foreground.secondary.ghosted)
        : palette(p => p.background.primary.level(1))};
  }
`;

const BallRow = styled(Row)`
  ::before {
    content: ' ';
    display: block;
    width: 3rem;
    height: 3rem;
    margin-right: 2rem;
    border-radius: 50%;
    background-color: ${palette(p => p.background.primary.level(1))};
  }
`;

export const SkeletonLoader: FC<ISkeletonLoader> = ({
  rows = 1,
  balls = 0,
  reverseOrder = false,
  ...restProps
}) => {
  const [springs] = useSprings(rows, i => ({
    from: {
      opacity: 0,
      transform: 'translate3d(0, 1rem, 0)',
    },
    to: {
      opacity: 1,
      transform: 'translate3d(0, 0rem, 0)',
    },
    config: config.stiff,
    delay: i * 60,
  }));

  const items = springs.map((spring, i) => (
    <animated.div key={i} style={spring}>
      {i < balls ? <BallRow /> : <Row />}
    </animated.div>
  ));

  if (reverseOrder) {
    items.reverse();
  }

  return <SkeletonLoaderStyled {...restProps}>{items}</SkeletonLoaderStyled>;
};
