import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { ResizeObserver } from '@juggle/resize-observer';
import { mergeRight } from 'ramda';
import { useIntl } from 'react-intl';
import useMeasure from 'react-use-measure';

import { Card } from '@hox/ui/Card';
import { Checkbox } from '@hox/ui/Checkbox';
import { AbsolutelyCenteredLoadingIndicator } from '@hox/ui/LoadingIndicator';

import { LegendTags } from '../../../../components/LegendTags';
import { RiskAssessment } from '../../../../components/RiskAssessment';
import { RiskGraph } from '../../../../components/RiskGraph';
import { useGraphColors } from '../../../../hooks/useGraphColors';
import { useQueryState } from '../../../../hooks/useQueryState';
import { useRiskTimeseries } from '../../../../hooks/useRiskTimeseries';
import * as INTL from '../../../../intl/overviewIntl';
import {
  getGraphLatest,
  getGraphMaxFactor,
  getGraphMaxScore,
  GRAPH_MAX_COEFFICIENT,
} from '../../../../utils/graph';
import { useHistoryGraphState } from '../../hooks/useHistoryGraphState';

import { FilterButton } from './components/FilterButton';

export interface IHistoryGraphProps {
  toggleSidebar: () => void;
}

const StyledHistoryGraph = styled(Card)`
  height: 100%;
`;

const SideBar = styled.div`
  min-width: 20rem;
`;

const RiskGraphWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25rem;
`;

const TopRight = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-end;

  margin-left: 3rem;

  > :not(:last-child) {
    margin-bottom: 3rem;
  }
`;

const TopRow = styled.div<{ $columnLayout: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: stretch;

  ${p =>
    p.$columnLayout &&
    css`
      flex-direction: column;

      > :first-child {
        display: none;
      }
    `};
`;

const CheckboxWrapper = styled.div`
  height: 3rem;
  display: flex;
  align-items: flex-end;
`;

export const HistoryGraphCard: React.FC<IHistoryGraphProps> = ({
  toggleSidebar,
  ...restProps
}) => {
  const [showBreakdown, setShowBreakdown] = useState(false);

  const [ref, { width }] = useMeasure({ polyfill: ResizeObserver });
  const intl = useIntl();

  const { orgId, selection, removeItemFromSelection, group } = useQueryState();

  const { timeseriesGraphData: orgData } = useRiskTimeseries('org', orgId);
  console.log(orgData);

  const { cacheData, factors, loading, latestSelected } =
    useHistoryGraphState();
  console.log(cacheData);

  const { colorMap, factorsColorMap } = useGraphColors();

  const hasSelection = !!(group && selection);
  const hasOneSelected = !hasSelection || (selection && selection.length === 1);
  const isBreakdown = hasOneSelected && showBreakdown;

  const data = isBreakdown ? factors : hasSelection ? cacheData : orgData;

  const graphColors = isBreakdown ? factorsColorMap : colorMap;

  const graphMax =
    (isBreakdown ? getGraphMaxFactor(factors) : getGraphMaxScore(data)) *
    GRAPH_MAX_COEFFICIENT;

  const latest = getGraphLatest(hasSelection ? cacheData : orgData);

  useEffect(() => {
    if (selection?.length !== 1) {
      setShowBreakdown(false);
    }
  }, [selection]);

  return (
    <StyledHistoryGraph {...restProps} ref={ref}>
      <TopRow $columnLayout={width < 530}>
        <RiskAssessment {...mergeRight(latestSelected, latest)} />
        <TopRight>
          <FilterButton onClick={() => toggleSidebar()} />
          {group && selection && (
            <LegendTags
              // This is to remount everything if this changes, otherwise
              // the tooltip portal gets confused and everything is horrible
              // TODO? fix this so we can animate the tags :D (unnecessary mebe)
              key={JSON.stringify(selection)}
              values={selection}
              colorMap={colorMap}
              onRemove={removeItemFromSelection}
              group={group}
            />
          )}
        </TopRight>
      </TopRow>
      <CheckboxWrapper>
        {hasOneSelected && (
          <Checkbox
            label={intl.formatMessage(INTL.showBreakdown)}
            checked={showBreakdown}
            onChange={() => setShowBreakdown(!showBreakdown)}
          />
        )}
      </CheckboxWrapper>

      <RiskGraphWrapper>
        {loading && <AbsolutelyCenteredLoadingIndicator />}
        <RiskGraph
          data={data}
          isBreakdown={isBreakdown}
          graphSettingOverrides={{
            yScale: {
              type: 'linear',
              stacked: isBreakdown,
              min: 0,
              max: graphMax,
            },
            colors: ({ id }) => graphColors[id],
          }}
        />
      </RiskGraphWrapper>
      <SideBar />
    </StyledHistoryGraph>
  );
};
