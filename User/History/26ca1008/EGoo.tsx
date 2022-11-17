import React from 'react';
import styled from 'styled-components';
import { QueryResult } from '@apollo/client';
import { Meta, Story } from '@storybook/react';

import { Exact } from '@hox/frontend-utils/types/graphql.generated';

import { data } from './mock.json';
import { AnalyticsGraphCard, IAnalyticsGraphCardProps } from '.';
import { extractTimeseriesData } from '../lib';

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

Default.args = {};
