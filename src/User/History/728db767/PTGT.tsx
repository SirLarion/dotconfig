import React from 'react';
import styled from 'styled-components';
import { Meta, Story } from '@storybook/react';

import { extractTimeseriesData } from '../../lib';

import { data } from './mock.json';
import { ITimeseriesGraphCardProps, TimeseriesGraphCard } from '.';

const Wrapper = styled.div`
  width: 60rem;
  height: 25rem;
`;

export default {
  title: 'Admin/Analytics/TimeseriesGraphCard',
  component: TimeseriesGraphCard,
} as Meta;

const Template: Story<ITimeseriesGraphCardProps> = args => (
  <Wrapper>
    <TimeseriesGraphCard {...args} />
  </Wrapper>
);
export const Default = Template.bind({});

Default.args = {
  title: 'Onboording deitta',
  graphColor: 'green',
  ...extractTimeseriesData(data),
};
