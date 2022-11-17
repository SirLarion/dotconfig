import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { Card } from '@hox/ui/Card';
import { DeltaTag } from '@hox/ui/DeltaTag';
import { LineGraph } from '@hox/ui/LineGraph';
import { palette } from '@hox/ui/styles/theme';
import { ButtonText, Heading2, Heading3, SmallText } from '@hox/ui/Text';

import { extractSeriesProperties } from '../../lib';
import { IAnalyticsCardProps, TAnalyticsComponent } from '../../types';

import { LineStyleDisplay } from './LineStyleDisplay';

const StyledTimeseriesGraphCard = styled(Card)`
  width: 20rem;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${palette(p => p.outline.secondary.dimmed)};
`;

const CardLabel = styled(ButtonText)`
  margin-bottom: 1rem;
`;

const GraphMeta = styled.section`
  display: grid;
  grid: auto auto / auto auto;
  grid-gap: 0.5rem;
`;

const Legend = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-end;

  > :first-child {
    margin-bottom: 0.5rem;
  }
`;

const LegendText = styled(SmallText)`
  display: flex;
  min-width: max-content;
`;

const OrgLatest = styled(Heading2)`
  line-height: 1;
`;

const IndustryLatest = styled(Heading3)`
  line-height: 1;
`;

const GraphWrapper = styled.div`
  width: auto;
  height: 6rem;
`;

export const TimeseriesGraphCard: TAnalyticsComponent = ({
  label,
  series,
  latestValue,
  latestComparison,
  ...restProps
}) => {
  return (
    <StyledTimeseriesGraphCard {...restProps}>
      <div>
        <CardLabel>{label}</CardLabel>
        <GraphMeta>
          <Legend>
            <LineStyleDisplay $color={base} $style="solid" />
            <OrgLatest>{orgLatest}</OrgLatest>
          </Legend>
          <Legend>
            <LineStyleDisplay $color={dimmed} $style="dashed" />
            <IndustryLatest>{industryLatest}</IndustryLatest>
          </Legend>
          <LegendText dimmed>
            <DeltaTag
              delta={orgDelta}
              type={orgDelta > 0 ? 'positive' : 'negative'}
              unitMark="%"
              renderAsPill
              small
            />
            <FormattedMessage
              id="app.admin.dashboard.analytics.timeseries.delta"
              defaultMessage=" in the last month"
              description="Specifier that follows a percentage value which indicates how much a metric changed since the last measurement indicated by 'timeframe'"
            />
          </LegendText>
          <LegendText dimmed>
            <FormattedMessage
              id="app.admin.dashboard.analytics.timeseries.yourIndustry"
              defaultMessage="Your industry"
              description="Timeseries graph legend label indicating which line displays industry data"
            />
          </LegendText>
        </GraphMeta>
      </div>
      <GraphWrapper>
        <LineGraph series={series} showTooltip={false} plain />
      </GraphWrapper>
    </StyledTimeseriesGraphCard>
  );
};
