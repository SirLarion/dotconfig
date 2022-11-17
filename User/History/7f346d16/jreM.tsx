import React from 'react';
import { Meta, Story } from '@storybook/react';
import { groupBy, last, map, pipe, splitEvery, values } from 'ramda';

import { TSerieProps } from '@hox/ui/LineGraph/types';

import exampleData from './exampleData.json';
import { DualMetricAnalyticsCard, IDualMetricAnalyticsCardProps } from '.';

interface IData {
  date: string;
  organizationId: string;
  risk: string;
}

export default {
  title: 'Components/DualMetricAnalyticsCard',
  component: DualMetricAnalyticsCard,
} as Meta;

const getAverageRiskScore = (timeSeriesData: IData[]) =>
  timeSeriesData.reduce((sum, curr) => sum + parseFloat(curr.risk), 0) /
  timeSeriesData.length;

const MOCK_DATA: TSerieProps[] = pipe(
  groupBy((data: IData) => data.organizationId),
  values,
  map(
    (departmentData: IData[]) =>
      ({
        id: departmentData[0].organizationId,
        data: pipe(
          splitEvery(30),
          map((monthData: IData[]) => ({
            x: monthData[0].date,
            y: getAverageRiskScore(monthData),
          }))
        )(departmentData),
      } as TSerieProps)
  )
)(exampleData);

const MOCK_LATEST = last(MOCK_DATA[0].data)?.y as number;

const Template: Story<IDualMetricAnalyticsCardProps> = args => (
  <DualMetricAnalyticsCard {...args} />
);

export const Default = Template.bind({});

Default.args = {
  title: 'This is what value looks like',
  latestValue: { primary: MOCK_LATEST, secondary: MOCK_LATEST * 1.2 }
  series: [
    ...MOCK_DATA,
    {
      id: 'Hoxhunt but better',
      data: MOCK_DATA[0].data.map(point => ({
        ...point,
        y: (point.y as number) * 1.2,
      })),
    },
  ],
};
