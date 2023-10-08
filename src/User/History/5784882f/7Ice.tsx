import React from 'react';
import styled from 'styled-components';
import { Meta, Story } from '@storybook/react';
import { groupBy, map, pipe, splitEvery, values } from 'ramda';

import { Card } from '@hox/ui/Card';

import exampleData from './exampleData.json';
import { TSerieProps } from './types';
import { ILineGraphProps, LineGraph } from '.';

export default {
  title: 'UI/Components/Charts/LineGraph',
  component: LineGraph,
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
  argTypes: {
    showTooltip: {
      control: { type: 'boolean' },
    },
    serie1Color: {
      control: { type: 'color' },
    },
    serie1Line: {
      options: ['dashed', 'solid'],
    },
    serie1Fill: {
      options: ['translucent', 'gradient', 'none'],
    },
    serie2Color: {
      control: { type: 'color' },
    },
    serie2Line: {
      options: ['dashed', 'solid'],
    },
    serie2Fill: {
      options: ['translucent', 'gradient', 'none'],
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
  map(
    (departmentData: IData[]) =>
      ({
        id: departmentData[0].organizationId,
        style: {
          fill: 'gradient',
        },
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

const Template: Story<ILineGraphProps> = args => (
  <LineGraph {...injectStyling(args)} />
);

export const Default = Template.bind({});

Default.args = {
  series: [
    ...MOCK_DATA,
    {
      id: 'Hoxhunt but better',
      style: {
        line: 'dashed',
      },
      data: MOCK_DATA[0].data.map(point => ({
        ...point,
        y: (point.y as number) * 1.2,
      })),
    },
  ],
  overrides: {
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