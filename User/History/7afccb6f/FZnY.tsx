import React from 'react';
import { Meta, Story } from '@storybook/react';

import { AnalyticsSection, IAnalyticsSectionProps } from '.';

export default {
  title: 'Components/AnalyticsSection',
  component: AnalyticsSection,
} as Meta;
const Template: Story<IAnalyticsSectionProps> = args => (
  <AnalyticsSection {...args} />
);
export const Default = Template.bind({});
AnalyticsSection.args = {};
