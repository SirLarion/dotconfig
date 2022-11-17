import React from 'react';
import styled from 'styled-components';
import { ComponentMeta, Story } from '@storybook/react';
import { groupBy, map, pipe, splitEvery, values } from 'ramda';

import { Card } from '@hox/ui/Card';

import exampleData from './exampleData.json';
import { TLineFill, TLineStyle, TSerieProps } from './types';
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
    plain: {
      control: { type: 'boolean' },
    },
    color1: {
      control: { type: 'color' },
    },
    line1: {
      options: ['dashed', 'solid'],
      control: { type: 'select' },
    },
    fill1: {
      options: ['translucent', 'gradient', 'none'],
      control: { type: 'select' },
    },
    color2: {
      control: { type: 'color' },
    },
    line2: {
      options: ['dashed', 'solid'],
      control: { type: 'select' },
    },
    fill2: {
      options: ['translucent', 'gradient', 'none'],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof LineGraph>;

interface IData {
  date: string;
  organizationId: string;
  risk: string;
}

const Wrapper = styled(Card)`
  width: 70vw;
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

type StoryProps = ILineGraphProps & { [key: string]: string | undefined };

const injectStyling = (args: StoryProps): ILineGraphProps => {
  return {
    ...args,
    series: [
      ...args.series.map((serie, i) => ({
        ...serie,
        style: {
          color: args[`color${i + 1}`] as string,
          line: args[`line${i + 1}`] as TLineStyle,
          fill: args[`fill${i + 1}`] as TLineFill,
        },
      })),
    ],
  };
};

const Template: Story<StoryProps> = args => (
  <LineGraph {...injectStyling(args)} />
);

export const Default = Template.bind({});

//@ts-ignore
Default.args = {
  showTooltip: true,
  plain: false,

  line1: 'solid',
  fill1: 'gradient',
  color1: 'green',
  line2: 'dashed',
  fill2: 'none',
  color2: 'red',

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
