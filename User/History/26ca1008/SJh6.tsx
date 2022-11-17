import React from 'react';
import styled from 'styled-components';
import { Meta, Story } from '@storybook/react';

import { extractTimeseriesData } from '../lib';

import { data } from './mock.json';
import { AnalyticsGraphCard, IAnalyticsGraphCardProps } from '.';

const Wrapper = styled.div`
  width: 60rem;
  height: 25rem;
`;

export default {
  title: 'Admin/Analytics/AnalyticsGraphCard',
  component: AnalyticsGraphCard,
} as Meta;

const Template: Story<IAnalyticsGraphCardProps> = args => (
  <Wrapper>
    <AnalyticsGraphCard {...args} />
  </Wrapper>
);
export const Default = Template.bind({});

Default.args = {
  title: 'deitta',
  graphColor: 'blue',
  timeseries: extractTimeseriesData(data),
};
