import React, {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { ResizeObserver } from '@juggle/resize-observer';
import { isNil, path } from 'ramda';
import mergeRefs from 'react-merge-refs';
import { animated, config, useSpring } from 'react-spring/dist';
import useMeasure from 'react-use-measure';

import { palette } from '../styles/theme';
import { SmallText } from '../Text';

// LINE_HEIGHT in px because rem is causing some weird visual artifacts
export const LINE_HEIGHT = '2px';

interface ITabsProps {
  defaultIndex?: number;
  index?: number;
  larger?: boolean;
  items: ReactNode[];
  onChange: (selectedIndex: number) => void;
}

const TabsStyled = styled.div`
  position: relative;
  display: flex;
  margin-bottom: ${LINE_HEIGHT}; /* space for AnimatedLine */
  align-items: center;
  box-sizing: border-box;

  > :not(:last-of-type) {
    margin-right: 2rem;
  }
`;

export const TabItem = styled(SmallText).attrs({ as: 'span' })<{
  $larger?: boolean;
}>`
  display: block;
  cursor: pointer;
  transition: color 100ms ease-in-out;
  line-height: 1.5;
  user-select: none;
  font-size: ${props => (props.$larger ? '14px' : '12px')};

  :active,
  :focus {
    outline: none;
  }
`;

export const AnimatedLine = styled(animated.div)<{ $larger?: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  height: ${LINE_HEIGHT};
  width: 1.25rem;
  width: ${props => (props.$larger ? '2rem' : '1.25rem')};
  background-color: ${palette(p => p.cta.primary)};
`;

const getLinePosition = (
  parent: HTMLDivElement | null,
  tabIndex: number
): number => path<number>(['children', tabIndex, 'offsetLeft'], parent) || 0;

export const Tabs: FC<ITabsProps> = ({
  defaultIndex = 0,
  items,
  larger,
  onChange,
  index,
  ...rootProps
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [measureRef, { width }] = useMeasure({ polyfill: ResizeObserver });

  const [currentIndex, setCurrentIndex] = useState(defaultIndex);

  const [lineProps, setLine] = useSpring(() => ({
    config: config.stiff,
    transform: 'translate3d(0px, 0, 0)',
    opacity: 0,
  }));

  const handleChange = useCallback(
    (tabIndex: number) => {
      if (tabIndex !== currentIndex) {
        setCurrentIndex(tabIndex);
        onChange(tabIndex);
      }
      const nextLinePosition = getLinePosition(ref.current, tabIndex);
      setLine({
        transform: `translate3d(${nextLinePosition}px, 0, 0)`,
      });
    },
    [onChange, setLine, currentIndex]
  );

  // Handle the initial line position
  useLayoutEffect(() => {
    const t = setTimeout(() => {
      setCurrentIndex(index => {
        setLine({ immediate: true });
        handleChange(index);
        setLine({
          opacity: 1,
          immediate: false,
        });

        return index;
      });
    }, 320);

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle index changes
  useEffect(() => {
    if (isNil(index) || index === currentIndex) {
      return;
    }
    handleChange(index);
  }, [currentIndex, handleChange, index]);

  // Handle parent width change (item spacing change)
  useEffect(() => {
    handleChange(currentIndex);
  }, [width, currentIndex, handleChange]);

  return (
    <TabsStyled ref={mergeRefs([ref, measureRef])} {...rootProps}>
      {items.map((item, i) => (
        <TabItem
          key={i}
          tabIndex={0}
          onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            e.preventDefault();
            handleChange(i);
          }}
          variant={i === currentIndex ? 'strong' : undefined}
          dimmed={i !== currentIndex}
          $larger={larger}
        >
          {item}
        </TabItem>
      ))}
      <AnimatedLine style={lineProps} $larger={larger} />
    </TabsStyled>
  );
};
