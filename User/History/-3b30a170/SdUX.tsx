import { Meta, Story } from '@storybook/react';
import React from 'react';
import { DualMetriCAnalyticsCard, IDualMetriCAnalyticsCardProps } from '.';

export default {
  title: 'Components/DualMetriCAnalyticsCard',
  component: DualMetriCAnalyticsCard,
} as Meta;
const Template: Story<IDualMetriCAnalyticsCardProps> = args => (
  <DualMetriCAnalyticsCard {...args} />
);
export const Default = Template.bind({});
DualMetriCAnalyticsCard.args = {};
