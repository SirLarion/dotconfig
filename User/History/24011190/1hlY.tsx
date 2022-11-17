import React, { FC, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { NumberParam, useQueryParams, withDefault } from 'use-query-params';

import { useOnMount } from '@hox/frontend-utils/hooks/useOnMount';

import {
  TableHeaderWithTabs,
  TTabItem,
} from '../../../../components/TableHeaderWithTabs';
import {
  toGqlFilter,
  toActiveSearchFilter,
} from '../../../../views/TrainingManagementBeta/recoil/filters';
import { useTabQuestCount } from '../../hooks/useTabQuestCount';
import { TRAINING_MANAGEMENT_INTL as INTL } from '../../intl';
import { getActiveQuestTemplateListTabIndex, questListTabs } from '../../lib';
import { questListState } from '../../recoil';
import { TQuestList, TQuestListTab } from '../../types';

const getTabForId = (id: TQuestList) =>
  questListTabs.find(tab => tab.id === id) as TQuestListTab;

const useTabQuestCounts = () => {
  const [active, deactive, all] = ['active', 'deactivated', 'all'].map(tabId =>
    getTabForId(tabId as TQuestList)
  );

  const { questCount: activeQuestsCount } = useTabQuestCount({
    search: toActiveSearchFilter(active.filter?.active),
  });

  const { questCount: deactiveQuestsCount } = useTabQuestCount({
    search: toActiveSearchFilter(deactive.filter?.active),
  });

  const { questCount: allQuestsCount } = useTabQuestCount(
    toGqlFilter(all.filter)
  );

  return {
    active: activeQuestsCount || 0,
    deactivated: deactiveQuestsCount || 0,
    all: allQuestsCount || 0,
  };
};

export const TrainingManagementHeader: FC = ({ children, ...restProps }) => {
  const [{ p }, setQueryParams] = useQueryParams({
    p: withDefault(NumberParam, 0),
  });

  const [filters, setFilters] = useRecoilState(questListState.persistedFilters);
  const activeTabIndex = getActiveQuestTemplateListTabIndex(filters);

  const questCounts = useTabQuestCounts();

  const switchTabNew = (index: number) => {
    const filter = questListTabs[index].filter;

    if (filter !== undefined) {
      setFilters(filter);
    }
  };

  const [currentPageIndex, setCurrentPageIndex] = useRecoilState(
    questListState.currentPageIndex
  );

  useOnMount(() => {
    setCurrentPageIndex(p);
  });

  // persist recoil state to query params
  useEffect(() => {
    setQueryParams({
      p: currentPageIndex,
    });
  }, [activeTabIndex, currentPageIndex, setQueryParams]);

  const formattedTabs: TTabItem[] = questListTabs.map(tab => ({
    name: tab.name,
    itemCount: tab.id !== 'custom' ? questCounts[tab.id] : undefined,
  }));

  return (
    <TableHeaderWithTabs
      mainHeading={INTL.mainHeading}
      tabs={formattedTabs}
      onTabChange={index => switchTabNew(index)}
      tabIndex={activeTabIndex}
      {...restProps}
    >
      {children}
    </TableHeaderWithTabs>
  );
};
