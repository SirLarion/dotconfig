import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { FormattedMessage, FormattedNumber } from 'react-intl';

import { LineGraph } from '../../../LineGraph';
import { TSerieProps } from '../../../LineGraph/types';
import { palette, themeProp } from '../../../styles/theme';
import { ButtonText, Heading2, Heading3, SmallText } from '../../../Text';
import { SkeletonLoader } from '../..';
import { AnalyticsBlocks } from '../AnalyticsBlocks';
import { IAnalyticsDeltaTagProps } from '../AnalyticsDeltaTag';
import { BaseAnalyticsCard } from '../BaseAnalyticsCard';
import { LineStyleDisplay } from '../LineStyleDisplay';

export type TDualMetricIndex = 'primary' | 'secondary';

export type TDualValue = Record<TDualMetricIndex, number>;
export type TDualGraphColor = Record<TDualMetricIndex, string>;

export interface IDualMetricAnalyticsCardProps {
  title: ReactNode;
  series?: TSerieProps[];
  latestValue: TDualValue;
  delta: IAnalyticsDeltaTagProps;
  secondaryValueLabel: ReactNode;
  vertical?: boolean;
  loading?: boolean;
  error?: { msg?: ReactNode };
}

const StyledBaseAnalyticsCard = styled(BaseAnalyticsCard)`
  width: 20rem;
  padding: 1rem;
  border-radius: ${themeProp(t => t.borderRadius.default)};
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

const PrimaryLatest = styled(Heading2)`
  line-height: 1;
`;

const SecondaryLatest = styled(Heading3)`
  line-height: 1;
`;

const GraphWrapper = styled.div`
  width: auto;
  height: 6rem;
`;

export const DualMetricAnalyticsCard: FC<IDualMetricAnalyticsCardProps> = ({
  title,
  series,
  latestValue,
  delta,
  secondaryValueLabel,
  vertical,
  loading,
  error,
  ...restProps
}) => {
  if (loading) {
    return <SkeletonLoader {...restProps} />;
  }

  if (error) {
    return (
      <StyledBaseAnalyticsCard {...restProps}>
        <AnalyticsBlocks.Heading>{title}</AnalyticsBlocks.Heading>
        <SmallText>
          {error.msg || (
            <FormattedMessage
              id="ui.analytics.card.error"
              defaultMessage="Failed to fetch data"
              description="Error message shown when data cannot be fetched"
            />
          )}
        </SmallText>
      </StyledBaseAnalyticsCard>
    );
  }

  const graphColor: TDualGraphColor = { primary: 'blue', secondary: 'teal' };

  return (
    <StyledBaseAnalyticsCard {...restProps}>
      <div>
        <CardLabel>{title}</CardLabel>
        <GraphMeta>
          <Legend>
            {graphColor && (
              <LineStyleDisplay $color={graphColor.primary} $style="solid" />
            )}
            <PrimaryLatest>
              <FormattedNumber style={'percent'} value={latestValue.primary}  />
            </PrimaryLatest>
          </Legend>
          <Legend>
            {graphColor && (
              <LineStyleDisplay $color={graphColor.secondary} $style="dashed" />
            )}
            <SecondaryLatest>
              <FormattedNumber style={'percent'} value={latestValue.secondary} />
            </SecondaryLatest>
          </Legend>
          <LegendText dimmed>
            <AnalyticsBlocks.DeltaTag {...delta} />
          </LegendText>
          <LegendText dimmed>{secondaryValueLabel}</LegendText>
        </GraphMeta>
      </div>
      {series && (
        <GraphWrapper>
          <LineGraph
            series={series}
            overrides={{
              yFormat: '>-.1%',
            }}
            plain
          />
        </GraphWrapper>
      )}
    </StyledBaseAnalyticsCard>
  );
};
