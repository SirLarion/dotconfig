import React from 'react';
import { Meta, Story } from '@storybook/react';

import { ITimeseriesCardProps, TimeseriesCard } from '.';

export default {
  title: 'ui/Components/AnalyticsCard/components/TimeseriesCard',
  component: TimeseriesCard,
} as Meta;
const Template: Story<ITimeseriesCardProps> = args => (
  <TimeseriesCard {...args} />
);
export const Default = Template.bind({});
TimeseriesCard.args = {};
