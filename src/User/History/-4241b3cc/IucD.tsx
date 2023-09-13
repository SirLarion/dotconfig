import React, { FC, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { FormattedNumber } from 'react-intl';

import { palette } from '@hox/ui/styles/theme';
import { TabItem as BaseTabItem } from '@hox/ui/Tabs';
import { Tag } from '@hox/ui/Tags';

import { Header, HeaderContent } from '../Header';
import { TabNavigation } from '../TabNavigation';

const TableHeaderWithTabsStyled = styled(Header)`
  min-height: auto;
  padding-bottom: 0rem;
`;

const TabNavItem = styled(BaseTabItem)`
  display: flex;
  align-self: flex-start;
  align-items: center;

  > :last-child {
    margin-left: 0.25rem;
  }
`;

export type TTabItem = {
  name: React.ReactNode;
  itemCount?: number;
};

const TabNavigationStyled = styled(TabNavigation)<{ $hideLastTab: boolean }>`
  ${({ $hideLastTab }) =>
    $hideLastTab &&
    css`
      > div > span:last-of-type {
        display: none;
      }
    `}
`;

const TabItem: FC<TTabItem & { onClick: () => void; active: boolean }> = ({
  name,
  onClick,
  active,
  itemCount,
}) => {
  return (
    <TabNavItem onClick={onClick} $larger>
      {name}
      {itemCount !== undefined && (
        <Tag
          size="small"
          disableAnimations
          background={active ? palette(p => p.cta.primary) : ''}
        >
          <FormattedNumber notation="compact" value={itemCount} />
        </Tag>
      )}
    </TabNavItem>
  );
};

type TTableHeaderWithTabsProps = {
  mainHeading: React.ReactNode;
  tabs: TTabItem[];
  onTabChange?: (tabIndex: number) => void;
  tabIndex?: number;
  hideLastTab?: boolean;
};

export const TableHeaderWithTabs: FC<TTableHeaderWithTabsProps> = ({
  children,
  tabIndex,
  onTabChange,
  tabs,
  mainHeading,
  hideLastTab,
  ...restProps
}) => {
  const [tab, setTab] = useState(tabIndex || 0);

  useEffect(() => {
    tabIndex !== undefined && tabIndex !== tab && setTab(tabIndex);
  }, [tab, tabIndex]);

  return (
    <TableHeaderWithTabsStyled {...restProps}>
      <HeaderContent mainHeading={mainHeading}>
        {children}
        <TabNavigationStyled
          defaultIndex={tab}
          index={tab}
          onChange={() => {}}
          $hideLastTab={!!hideLastTab}
        >
          {tabs.map((thisTab, index) => (
            <TabItem
              name={thisTab.name}
              onClick={() => onTabChange && onTabChange(index)}
              key={index}
              active={index === tab}
              itemCount={thisTab.itemCount}
            />
          ))}
        </TabNavigationStyled>
      </HeaderContent>
    </TableHeaderWithTabsStyled>
  );
};
