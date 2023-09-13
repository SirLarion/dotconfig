import React, { FC } from 'react';
import styled from 'styled-components';

import { LineGraph } from '@hox/ui/LineGraph';

export interface IAnalyticsGraphCardProps {}

const StyledAnalyticsGraphCard = styled.div``;

export const AnalyticsGraphCard: FC<IAnalyticsGraphCardProps> = ({
  ...restProps
}) => {
  return (
    <StyledAnalyticsGraphCard {...restProps}>heloo</StyledAnalyticsGraphCard>
  );
};
