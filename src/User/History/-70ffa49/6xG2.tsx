import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

import { Card } from '@hox/ui/Card';
import { Heading4 } from '@hox/ui/Text';

import { IAnalyticsQueryVariables } from '../../types';

export interface ICardGroupProps {
  title: ReactNode;
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
    flex: 1;
  }
`;

export const CardGroup: FC<ICardGroupProps> = ({
  title,
  children,
  ...restProps
}) => {
  return (
    <StyledCardGroup {...restProps}>
      <Heading4>{title}</Heading4>
      <CardContainer>{children}</CardContainer>
    </StyledCardGroup>
  );
};
