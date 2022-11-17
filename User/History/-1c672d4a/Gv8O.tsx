import React, { FC, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { LineGraph } from '../../../LineGraph';
import { TSerieProps } from '../../../LineGraph/types';
import { ButtonText, Heading3, SmallText } from '../../../Text';
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

const CardLabel = styled(ButtonText)`
  margin-bottom: 1rem;
`;

const CardContent = styled.div``;

const StyledBaseAnalyticsCard = styled(BaseAnalyticsCard)<{
  $vertical?: boolean;
  $hasGraph?: boolean;
}>`
  > ${CardContent} {
    display: grid;
    ${({ $hasGraph }) =>
      $hasGraph &&
      css`
        grid-template-columns: 1.2fr 1fr;
      `}
    gap: 1rem;

    ${({ $vertical }) =>
      $vertical &&
      css`
        display: block;
      `};
  }

  section {
    display: flex;
    justify-content: space-between;

    ${({ $vertical, $hasGraph }) =>
      $vertical &&
      !$hasGraph &&
      css`
        display: block;
      `};
  }
`;

const Primary = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-end;
  margin: 0 1rem 1rem 0;

  > :not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

const Secondary = styled(Primary)`
  margin-right: 0;
`;

const LabelText = styled(SmallText)`
  display: flex;
  min-width: max-content;
`;

const SecondaryValue = styled(Heading3)``;

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
      <CardLabel>{title}</CardLabel>
      <CardContent>
        <section>
          <Primary>
            {graphColor && (
              <LineStyleDisplay $color={graphColor.primary} $style="solid" />
            )}
            <AnalyticsBlocks.MainValue>
              {getDisplayNumber(latestValue.primary, valueOptions)}
            </AnalyticsBlocks.MainValue>
            <LabelText dimmed>
              <AnalyticsBlocks.DeltaTag {...delta} />
            </LabelText>
          </Primary>
          <Secondary>
            {graphColor && (
              <LineStyleDisplay $color={graphColor.secondary} $style="dashed" />
            )}
            <SecondaryValue>
              {getDisplayNumber(latestValue.secondary, valueOptions)}
            </SecondaryValue>
            <LabelText dimmed>{secondaryValueLabel}</LabelText>
          </Secondary>
        </section>
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
      </CardContent>
    </StyledBaseAnalyticsCard>
  );
};
