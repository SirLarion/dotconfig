import { Meta, Story } from '@storybook/react';
import React from 'react';
import { DualMetricAnalyticsCard, IDualMetricAnalyticsCardProps } from '.';

import exampleData from './exampleData.json';

export default {
  title: 'Components/DualMetricAnalyticsCard',
  component: DualMetricAnalyticsCard,
} as Meta;

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

const Template: Story<IDualMetricAnalyticsCardProps> = args => (
  <DualMetricAnalyticsCard {...args} />
);

export const Default = Template.bind({});
DualMetricAnalyticsCard.args = {};
