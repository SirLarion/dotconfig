import React from 'react';
import styled from 'styled-components';
import { Meta, Story } from '@storybook/react';

import { Exact } from '@hox/frontend-utils/types/graphql.generated';

import {
  ITimeseriesCardProps,
  TimeseriesCard,
  TTimeseriesQueryResult,
} from '.';
import { data } from './mock.json';
import { IAnalyticsQueryBaseVariables, TAnalyticsQuery } from '../../types';

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
  query: () =>
    ({ data } as TAnalyticsQuery<
      TTimeseriesQueryResult,
      Exact<IAnalyticsQueryBaseVariables>
    >),
};
