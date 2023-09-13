import React, { FC, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { LineGraph } from '../../../LineGraph';
import { TSerieProps } from '../../../LineGraph/types';
import { palette, themeProp } from '../../../styles/theme';
import { ButtonText, Heading2, Heading3, SmallText } from '../../../Text';
import { SkeletonLoader } from '../..';
import { extractGraphColorFromSeries, getDisplayNumber } from '../../lib';
import { TValueOptions } from '../../types';
import { AnalyticsBlocks } from '../AnalyticsBlocks';
import { IAnalyticsDeltaTagProps } from '../AnalyticsDeltaTag';
import { BaseAnalyticsCard } from '../BaseAnalyticsCard';
import { LineStyleDisplay } from '../LineStyleDisplay';

export type TDualMetricIndex = 'primary' | 'secondary';

export type TDualValue = Record<TDualMetricIndex, number | undefined>;
export type TDualGraphColor = Record<TDualMetricIndex, string>;

export interface IDualMetricAnalyticsCardProps {
  title: ReactNode;
  series?: TSerieProps[];
  latestValue: TDualValue;
  valueOptions?: TValueOptions;
  delta: IAnalyticsDeltaTagProps;
  secondaryValueLabel: ReactNode;
  vertical?: boolean;
  loading?: boolean;
  error?: { msg?: ReactNode };
}

const StyledBaseAnalyticsCard = styled(BaseAnalyticsCard)<{
  $vertical?: boolean;
  $hasGraph?: boolean;
}>`
  padding: 1rem;
  border-radius: ${themeProp(t => t.borderRadius.default)};
  border: 1px solid ${palette(p => p.outline.secondary.dimmed)};

  section {
    display: flex;
    justify-content: space-between;
    /* display: grid;
    grid: auto auto / auto auto;
    grid-gap: 0.5rem; */
    ${({ $vertical, $hasGraph }) =>
      $vertical &&
      !$hasGraph &&
      css`
        display: block;
      `};
  }
`;

const CardLabel = styled(ButtonText)`
  margin-bottom: 1rem;
`;

const Legend = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-end;
  margin-bottom: 1rem;

  > :not(:last-child) {
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
  valueOptions,
  delta,
  secondaryValueLabel,
  vertical = false,
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

  const graphColor: TDualGraphColor | undefined = series
    ? extractGraphColorFromSeries(series)
    : undefined;

  return (
    <StyledBaseAnalyticsCard
      $vertical={vertical}
      $hasGraph={!!series}
      {...restProps}
    >
      <div>
        <CardLabel>{title}</CardLabel>
        <section>
          <Legend>
            {graphColor && (
              <LineStyleDisplay $color={graphColor.primary} $style="solid" />
            )}
            <PrimaryLatest>
              {getDisplayNumber(latestValue.primary, valueOptions)}
            </PrimaryLatest>
            <LegendText dimmed>
              <AnalyticsBlocks.DeltaTag {...delta} />
            </LegendText>
          </Legend>
          <Legend>
            {graphColor && (
              <LineStyleDisplay $color={graphColor.secondary} $style="dashed" />
            )}
            <SecondaryLatest>
              {getDisplayNumber(latestValue.secondary, valueOptions)}
            </SecondaryLatest>
            <LegendText dimmed>{secondaryValueLabel}</LegendText>
          </Legend>
        </section>
      </div>
      {series && (
        <GraphWrapper>
          <LineGraph
            series={series}
            overrides={{
              yFormat: value =>
                typeof value === 'number'
                  ? getDisplayNumber(value)
                  : value.toString(),
            }}
            plain
          />
        </GraphWrapper>
      )}
    </StyledBaseAnalyticsCard>
  );
};
