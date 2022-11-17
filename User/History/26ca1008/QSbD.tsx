import { Meta, Story } from '@storybook/react';
import React from 'react';

import { AnalyticsGraphCard, IAnalyticsGraphCardProps } from '.';

export default {
  title: 'Admin/Analytics/AnalyticsGraphCard',
  component: AnalyticsGraphCard,
} as Meta;

const Template: Story<IAnalyticsGraphCardProps> = args => (
  <AnalyticsGraphCard {...args} />
);

export const Default = Template.bind({});
AnalyticsGraphCard.args = {};
