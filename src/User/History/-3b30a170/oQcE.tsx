import { ComponentMeta, Story } from '@storybook/react';
import React from 'react';
import { DualMetricAnalyticsCard, IDualMetricAnalyticsCardProps } from '.';

export default {
  title: 'Components/DualMetricAnalyticsCard',
  component: DualMetricAnalyticsCard,
} as ComponentMeta<typeof DualMetricAnalyticsCard>;

const Template: Story<IDualMetricAnalyticsCardProps> = args => (
  <DualMetricAnalyticsCard {...args} />
);

export const Default = Template.bind({});

Default.args = {} as IDualMetricAnalyticsCardProps;
