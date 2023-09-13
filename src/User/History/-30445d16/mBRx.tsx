import React, { FC, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { Serie } from '@nivo/line';
import { FormattedMessage, FormattedNumber } from 'react-intl';

import { TTagType } from '../../../DeltaTag/index';
import { LineGraph } from '../../../LineGraph';
import { SmallText } from '../../../Text';
import { SkeletonLoader } from '../..';
import { TPaletteAccentColor } from '../../lib';
import { AnalyticsBlocks } from '../AnalyticsBlocks';
import { createAnalyticsGraphTooltip } from '../AnalyticsGraphTooltip';
import { BaseAnalyticsCard } from '../BaseAnalyticsCard';

import {
  isGraphDataPassed,
  useAnalyticsGraphData,
} from './hooks/useAnalyticsGraphData';

interface ISingleMetricAnalyticsMainValues {
  value: number;
  text?: ReactNode;
}

interface ISingleMetricAnalyticsDeltaValues {
  value?: number;
  text?: ReactNode;
  sentiment?: TTagType;
}

// hack to accept string or string literal with autocompletion for string literals
// eslint-disable-next-line @typescript-eslint/ban-types
type TGraphColorString = string & {};

export interface ISingleMetricAnalyticsCardGraphValues {
  value: number;
  serie: Serie;
  graphColor?: TPaletteAccentColor | TGraphColorString;
}

export interface ISingleMetricAnalyticsCardProps {
  title: ReactNode;
  data:
    | ISingleMetricAnalyticsMainValues
    | ISingleMetricAnalyticsCardGraphValues;
  vertical?: boolean;
  delta?: ISingleMetricAnalyticsDeltaValues;
  error?: boolean;
  loading?: boolean;
}

const BaseAnalyticsCardStyled = styled(BaseAnalyticsCard)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Content = styled.div<{ $vertical?: boolean }>`
  display: flex;
  justify-content: space-between;
  > * {
    flex: 1;
  }

  > :nth-child(2) {
    margin-left: 1rem;
  }

  ${({ $vertical }) =>
    $vertical &&
    css`
      flex-direction: column;
      > :last-child {
        margin-left: 0rem;
        margin-top: 1rem;
      }
    `}
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  > :first-child {
    margin-bottom: 0.5rem;
  }
  > :last-child {
    margin-top: 0.25rem;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  min-height: 4rem;
  margin-top: 0.5rem;
  > :first-child {
    max-height: 4rem;
  }
`;

export const SingleMetricAnalyticsCard: FC<ISingleMetricAnalyticsCardProps> = ({
  data,
  delta,
  loading,
  error,
  children,
  title,
  vertical,
  ...restProps
}) => {
  const graphData = useAnalyticsGraphData(data);

  if (loading) {
    return <SkeletonLoader {...restProps} />;
  }

  if (error) {
    return (
      <BaseAnalyticsCardStyled {...restProps}>
        <AnalyticsBlocks.Heading>{title}</AnalyticsBlocks.Heading>
        <SmallText>
          <FormattedMessage
            id="ui.analytics.card.error"
            defaultMessage="Failed to fetch data"
            description="Error message shown when data cannot be fetched"
          />
        </SmallText>
      </BaseAnalyticsCardStyled>
    );
  }

  return (
    <BaseAnalyticsCardStyled {...restProps}>
      <Content $vertical={vertical}>
        <LeftSection>
          <AnalyticsBlocks.Heading>{title}</AnalyticsBlocks.Heading>
          <AnalyticsBlocks.MainValue>
            <FormattedNumber value={data.value} />
            {!isGraphDataPassed(data) && data?.text && (
              <SmallText dimmed>{data.text}</SmallText>
            )}
          </AnalyticsBlocks.MainValue>
          {delta && <AnalyticsBlocks.DeltaTag {...delta} />}
        </LeftSection>
        {graphData && (
          <RightSection>
            <LineGraph
              series={[graphData.serieDataParsed]}
              showTooltip
              plain
              overrides={{
                tooltip: createAnalyticsGraphTooltip({
                  numberColor: graphData.color,
                }),
                margin: { top: 8, right: 0, bottom: 8, left: 0 },
                yScale: {
                  type: 'linear',
                  min: 0,
                  max: graphData.max,
                },
              }}
            />
          </RightSection>
        )}
      </Content>
    </BaseAnalyticsCardStyled>
  );
};
