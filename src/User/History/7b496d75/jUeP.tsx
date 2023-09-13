import React, { useCallback, useMemo } from 'react';
import { LineSvgProps, PointTooltip, Serie, SliceTooltip } from '@nivo/line';
import { mergeDeepRight } from 'ramda';
import { FormattedDate } from 'react-intl';

import { LineGraph } from '@hox/ui/LineGraph';

import { RiskTooltip } from './components/RiskTooltip';
import { StackedAreaLayer } from './components/StackedAreaLayer';

export interface IRiskGraphProps {
  data: Serie[];
  isBreakdown?: boolean;
  graphSettingOverrides?: Partial<LineSvgProps>;
}

const axisDateFormat = (date: Date) => (
  <FormattedDate value={date} day="2-digit" month="short" />
);

const RISK_GRAPH_PROPS = {
  margin: { top: 20, bottom: 45, left: 50 },
  axisBottom: {
    tickValues: 5,
    format: axisDateFormat,
  },
  enableArea: false,
  layers: [
    'grid',
    'markers',
    'axes',
    'areas',
    StackedAreaLayer,
    'crosshair',
    'lines',
    'points',
    'slices',
    'mesh',
  ],
};

// reverse the list of startScores because somewhy nivo does that to
// slice points as well
const startScoresFromSeries = (series: Serie[]) =>
  series.map(s => s.data[0].y).reverse() as number[];

export const RiskGraph: React.FC<IRiskGraphProps> = ({
  data,
  isBreakdown = false,
  graphSettingOverrides = {},
  ...restProps
}) => {
  const props = mergeDeepRight(RISK_GRAPH_PROPS, graphSettingOverrides) as Omit<
    LineSvgProps,
    'data'
  >;

  const startScores = useMemo(() => startScoresFromSeries(data), [data]);

  // PointTooltip and SliceTooltip are React.FC so this is not a very good implementation, however, no better
  // solution was found to pass both the point and the startScore to RiskTooltip
  //
  // TODO?: explore using a custom mesh layer for Nivo, may be overkill but would
  // give us more control over the tooltip
  const tooltip: PointTooltip = useCallback(
    ({ point }) => <RiskTooltip points={[point]} startScores={startScores} />,
    [startScores]
  );

  const sliceTooltip: SliceTooltip = useCallback(
    ({ slice }) => (
      <RiskTooltip
        isBreakdown={isBreakdown}
        points={slice.points}
        startScores={startScores}
      />
    ),
    [startScores, isBreakdown]
  );

  return (
    <LineGraph
      {...restProps}
      series={data}
      overrides={{
        ...props,
        enableArea: isBreakdown,
        areaOpacity: 0,
        tooltip,
        sliceTooltip,
        enableSlices: data.length > 1 ? 'x' : false,
      }}
    />
  );
};
