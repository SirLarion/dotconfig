import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

import { Card } from '@hox/ui/Card';
import { Heading4 } from '@hox/ui/Text';

import {
  IAnalyticsCardProps,
  IAnalyticsQueryVariables,
  TAnalyticsComponent,
} from '../../types';

export interface ICardGroupProps {
  title: ReactNode;
  cards: Array<
    { AnalyticsComponent: TAnalyticsComponent } & IAnalyticsCardProps
  >;
  queryVariables?: IAnalyticsQueryVariables;
}

const StyledCardGroup = styled(Card)`
  padding: 1.5rem;
  > :not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  > * {
    max-width: 30rem;
    flex: 1 1 20rem;
  }
`;

export const CardGroup: FC<ICardGroupProps> = ({
  title,
  cards,
  ...restProps
}) => {
  return (
    <StyledCardGroup {...restProps}>
      <Heading4>{title}</Heading4>
      <CardContainer>
        <Card>Cardo</Card>
        <Card>Bardo</Card>
        <Card>Bongi</Card>
        {/* {cards.map(({ AnalyticsComponent, ...props }, i) => (
          <AnalyticsComponent {...props} key={i} />
        ))} */}
      </CardContainer>
    </StyledCardGroup>
  );
};
