import React from 'react';
import styled from 'styled-components';
import { Meta, Story } from '@storybook/react';
import { groupBy, map, pipe, splitEvery, values } from 'ramda';

import { Card } from '@hox/ui/Card';

import exampleData from './exampleData.json';
import { ILineGraphProps, LineGraph } from '.';
import { TSerieProps } from './types';

export default {
  title: 'UI/Components/Charts/LineGraph',
  component: LineGraph,
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
} as Meta;

interface IData {
  date: string;
  organizationId: string;
  risk: string;
}

const Wrapper = styled(Card)`
  width: 60rem;
  height: 25rem;
`;

const getAverageRiskScore = (timeSeriesData: IData[]) =>
  timeSeriesData.reduce((sum, curr) => sum + parseFloat(curr.risk), 0) /
  timeSeriesData.length;

const MOCK_DATA: TSerieProps[] = pipe(
  groupBy((data: IData) => data.organizationId),
  values,
  map((departmentData: IData[]) => ({
    id: departmentData[0].organizationId,
    data: pipe(
      splitEvery(30),
      map((monthData: IData[]) => ({
        x: monthData[0].date,
        y: getAverageRiskScore(monthData),
      }))
    )(departmentData),
  }))
)(exampleData);

const Template: Story<ILineGraphProps> = args => <LineGraph {...args} />;

export const Default = Template.bind({});

Default.args = {
  data: [
    ...MOCK_DATA,
    {
      id: 'data2',
      data: MOCK_DATA[0].data.map(point => ({
        ...point,
        y: (point.y as number) * 1.2,
      })),
    },
  ],
  graphSettingOverrides: {
    axisLeft: {
      legend: 'override individual settings with deep merge',
    },
    axisBottom: {
      legend: 'The docs at https://nivo.rocks/line/ are friggin amazing',
    },
  },
};
Default.decorators = [
  // eslint-disable-next-line react/display-name
  Story => (
    <Wrapper>
      <Story />
    </Wrapper>
  ),
];
