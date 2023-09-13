import React from 'react';
import styled from 'styled-components';
import { QueryResult } from '@apollo/client';
import { Meta, Story } from '@storybook/react';

import { Exact } from '@hox/frontend-utils/types/graphql.generated';

import { data } from './mock.json';
import {
  ITimeseriesCardProps,
  ITimeseriesQueryVariables,
  TTimeseriesQueryResult,
} from './types';

import { TimeseriesCard } from '.';

const Wrapper = styled.div`
  width: 60rem;
  height: 25rem;
`;

export default {
  title: 'ui/Components/AnalyticsCard/components/TimeseriesCard',
  component: TimeseriesCard,
} as Meta;

const Template: Story<ITimeseriesCardProps> = args => (
  <Wrapper>
    <TimeseriesCard {...args} />
  </Wrapper>
);
export const Default = Template.bind({});

Default.args = {
  query: () =>
    ({ data } as QueryResult<
      TTimeseriesQueryResult,
      Exact<ITimeseriesQueryVariables>
    >),
};
