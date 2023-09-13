import React, { FC } from 'react';
import styled from 'styled-components';

import { Card } from '@hox/ui/Card';
import { LineGraph } from '@hox/ui/LineGraph';

import { extractTimeseriesData } from './lib';
import { ITimeseriesCardProps } from './types';

const StyledTimeseriesCard = styled(Card)`
  width: 100%;
  height: 100%;
`;

export const TimeseriesCard: FC<ITimeseriesCardProps> = ({
  query,
  variables,
  ...restProps
}) => {
  const { data } = query({ variables });

  return (
    <StyledTimeseriesCard {...restProps}>
      <LineGraph data={extractTimeseriesData(data)} />
    </StyledTimeseriesCard>
  );
};
