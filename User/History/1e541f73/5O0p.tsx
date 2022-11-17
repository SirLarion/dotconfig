import React, { useState } from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';

import { Card } from '@hox/ui/Card';
import { Checkbox } from '@hox/ui/Checkbox';
import { LoadingContent } from '@hox/ui/LoadingContent';

import { RiskGraph } from '../../../../components/RiskGraph';
import { useGraphColors } from '../../../../hooks/useGraphColors';
import { useQueryState } from '../../../../hooks/useQueryState';
import { useRiskTimeseries } from '../../../../hooks/useRiskTimeseries';
import * as INTL from '../../../../intl/overviewIntl';
import {
  getGraphMaxFactor,
  GRAPH_MAX_COEFFICIENT,
} from '../../../../utils/graph';

export interface IRiskGraphCardProps {}

const StyledRiskGraphCard = styled(Card)`
  display: flex;
  height: 30rem;
  padding: 4rem 3rem 2rem 2rem;
`;

const CheckboxWrapper = styled.div`
  position: absolute;
  top: 2.5rem; //2 is too little and 3 too much :(
  left: 4rem;
`;

export const RiskGraphCard: React.FC<IRiskGraphCardProps> = ({
  ...restProps
}) => {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const { orgId } = useQueryState();

  const { maxScore, timeseriesGraphData, factorsGraphData, loading } =
    useRiskTimeseries('org', orgId);

  const intl = useIntl();

  const { colorMap, factorsColorMap } = useGraphColors();

  const data = showBreakdown ? factorsGraphData : timeseriesGraphData;

  const graphColors = showBreakdown ? factorsColorMap : colorMap;

  const graphMax =
    (showBreakdown ? getGraphMaxFactor(data) : maxScore) *
    GRAPH_MAX_COEFFICIENT;

  return (
    <StyledRiskGraphCard {...restProps}>
      <LoadingContent loading={loading}>
        <CheckboxWrapper>
          <Checkbox
            label={intl.formatMessage(INTL.showBreakdown)}
            checked={showBreakdown}
            onChange={() => setShowBreakdown(!showBreakdown)}
          />
        </CheckboxWrapper>
        <RiskGraph
          data={data}
          isBreakdown={showBreakdown}
          graphSettingOverrides={{
            yScale: {
              type: 'linear',
              stacked: true,
              min: 0,
              max: graphMax,
            },
            colors: ({ id }) => graphColors[id],
          }}
        />
      </LoadingContent>
    </StyledRiskGraphCard>
  );
};
