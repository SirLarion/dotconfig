import React, { FC, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { ResizeObserver } from '@juggle/resize-observer';
import { animated, useSpring } from 'react-spring/dist';
import useMeasure from 'react-use-measure';

import { Portal } from '../Portal';
import { palette, themeProp, WithTheme } from '../styles/theme';

import { TooltipPointer } from './components/TooltipPointer';

const StyledTooltip = styled.div`
  display: flex;
  position: relative;
`;

const TOOLTIP_GAP = 16;

export type TTooltipPos = 'above' | 'below' | 'left' | 'right';

export interface ITooltipProps {
  position?: TTooltipPos;
  disabled?: boolean;
  width?: number;
  zIndex?: number;
  backgroundColor?: string;
  children: React.ReactNode;
  tooltipBoxChildren: React.ReactNode;
}

interface ITooltipBoxProps {
  $width?: number;
  $backgroundColor?: string;
}

export const TooltipBox = styled(animated.div)<ITooltipBoxProps>`
  position: absolute;
  padding: 0.625rem 0.75rem;
  max-width: 20rem;
  border-radius: ${themeProp(t => t.borderRadius.default)};
  background-color: ${({ $backgroundColor }) =>
    $backgroundColor ||
    css`
      ${({ theme }: WithTheme) =>
        theme.name === 'light'
          ? palette(p => p.foreground.secondary)
          : palette(p => p.background.overlay)}
    `};

  ${({ $width }) =>
    $width &&
    css`
      width: ${$width}rem;
      word-wrap: break-word;
      white-space: break-spaces;
    `}
  > div {
    color: ${({ theme }: WithTheme) =>
      theme.name === 'light'
        ? palette(p => p.background.input)
        : palette(p => p.foreground.primary)};
  }
`;

interface ITooltipTransform {
  hover: string;
  idle: string;
}

export const Tooltip: FC<ITooltipProps> = ({
  width,
  position = 'above',
  disabled = false,
  zIndex = 0,
  backgroundColor,
  children,
  tooltipBoxChildren,
  ...restProps
}) => {
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const getTransform = (pos: TTooltipPos): ITooltipTransform => {
    switch (pos) {
      case 'above':
        return {
          hover: `translateY(0)`,
          idle: `translateY(-1rem)`,
        };
      case 'below':
        return {
          hover: `translateY(0)`,
          idle: `translateY(1rem)`,
        };

      case 'left':
        return {
          hover: `translateX(0)`,
          idle: `translateX(-1rem)`,
        };

      default:
      case 'right':
        return {
          hover: `translateX(0)`,
          idle: `translateX(1rem)`,
        };
    }
  };

  const { hover, idle } = getTransform(position);

  const spring = useSpring({
    opacity: hovering ? 1 : 0,
    pointerEvents: hovering ? 'all' : 'none',
    transform: hovering ? `${hover}` : `${idle}`,
  });

  const aRef = useRef<HTMLDivElement>(null);
  const [anchorRef, anchorRect] = useMeasure({
    polyfill: ResizeObserver,
    scroll: true,
  });
  const [tooltipBoxRef, tooltipBoxRect] = useMeasure({
    polyfill: ResizeObserver,
    scroll: true,
  });

  const HORIZONTAL_CENTER =
    anchorRect.left + anchorRect.width / 2 - tooltipBoxRect.width / 2;
  const VERTICAL_CENTER =
    anchorRect.bottom - anchorRect.height / 2 - tooltipBoxRect.height / 2;

  const aboveStyle = {
    top: anchorRect.top - tooltipBoxRect.height - 16,
    left: HORIZONTAL_CENTER,
  };

  const belowStyle = {
    top: anchorRect.bottom + TOOLTIP_GAP,
    left: HORIZONTAL_CENTER,
  };

  const leftStyle = {
    top: VERTICAL_CENTER,
    left: anchorRect.left - tooltipBoxRect.width - TOOLTIP_GAP,
  };

  const rightStyle = {
    top: VERTICAL_CENTER,
    left: anchorRect.left + anchorRect.width + TOOLTIP_GAP,
  };

  const getPosStyle = (pos: TTooltipPos) => {
    switch (pos) {
      case 'right':
        return rightStyle;
      case 'left':
        return leftStyle;
      case 'below':
        return belowStyle;
      case 'above':
      default:
        return aboveStyle;
    }
  };

  const posStyle = getPosStyle(position);

  return (
    <StyledTooltip
      {...restProps}
      onMouseEnter={() => {
        // useMeasure takes the element's position on first render
        // and does not update after animations complete etc.
        // force useMeasure by giving ref only when tooltip is shown
        anchorRef(aRef.current);
        setHovering(true);
        setVisible(true);
      }}
      onMouseLeave={() => {
        anchorRef(null);
        setHovering(false);

        // hide tooltip after fade animation complete
        // if hovering state has changed during timeout, do not override
        setTimeout(() => {
          setHovering(hovering => {
            setVisible(hovering);
            return hovering;
          });
        }, 500);
      }}
    >
      <div style={{ display: 'flex' }} ref={aRef}>
        {children}
      </div>
      {!disabled && visible && (
        <Portal
          name="wowtip"
          style={{ position: 'fixed', top: 0, right: 0, left: 0, zIndex }}
        >
          <TooltipBox
            ref={tooltipBoxRef}
            $width={width}
            $backgroundColor={backgroundColor}
            style={{ ...posStyle, ...spring }}
            {...restProps}
          >
            {tooltipBoxChildren}
            <TooltipPointer
              position={position}
              backgroundColor={backgroundColor}
            />
          </TooltipBox>
        </Portal>
      )}
    </StyledTooltip>
  );
};
