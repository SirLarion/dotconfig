import React from 'react';
import styled from 'styled-components';
import { Meta, Story } from '@storybook/react';

import { ITimeseriesCardProps, TimeseriesCard } from '.';
import mockData from './mock.json';

const Wrapper = styled.div`
  width: 60rem;
  height: 25rem;
`;

export default {
  title: 'ui/Components/AnalyticsCard/components/TimeseriesCard',
  component: TimeseriesCard,
} as Meta;

const Template: Story<ITimeseriesCardProps> = args => (
  <TimeseriesCard {...args} />
);
export const Default = Template.bind({});

Default.args = {};
