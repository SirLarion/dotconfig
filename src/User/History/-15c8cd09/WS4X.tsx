import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { MiniGraph } from '.';

export default {
  title: 'UI/Components/Charts/LineGraph/Mini',
  component: MiniGraph,
} as ComponentMeta<typeof MiniGraph>;

const Template: ComponentStory<typeof MiniGraph> = args => (
  <MiniGraph {...args} />
);
export const Default = Template.bind({});
Default.args = {
  overrides: {
    xScale: undefined,
    xFormat: undefined,
  },
  series: [
    {
      id: 'asd',
      data: [
        {
          x: '2022-09-03',
          y: 0,
        },
        {
          x: '2022-09-04',
          y: 10,
        },
        {
          x: '2022-09-05',
          y: 16,
        },
        {
          x: '2022-09-06',
          y: 24,
        },
      ],
    },
  ],
};
