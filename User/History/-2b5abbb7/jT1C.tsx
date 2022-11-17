import React from 'react';
import styled from 'styled-components';
import { Meta, Story } from '@storybook/react';

import { Exact } from '@hox/frontend-utils/types/graphql.generated';

import { IAnalyticsQueryBaseVariables, TAnalyticsQuery } from '../../types';

import { data } from './mock.json';
import {
  ITimeseriesCardProps,
  TimeseriesCard,
  TTimeseriesQueryResult,
} from '.';

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

Default.args = {
  query:  =>
    ({ data } as TTimeseriesQueryResult),
};
